import * as css from "../../mimcssTypes"
import * as dom from "../utils/dom"


describe("style rules:", () =>
{
	beforeEach(() =>
	{
		dom.removeAllStylesFromHead();
	})



	it("should not create rules with no styles", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = css.$class()
			id = css.$id()
			tag = css.$style( "h1", {})
			selector = css.$style( "div > span", {})
		}

		let a = css.$activate( A);
		expect(a!.cls.cssRule).not.toBeDefined();
		expect(a!.id.cssRule).not.toBeDefined();
		expect(a!.tag.cssRule).not.toBeDefined();
		expect(a!.selector.cssRule).not.toBeDefined();

		css.$deactivate( a!);
	})



	it("should create rules upon activation, remove upon deactivation", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = css.$class({ color: "red" })
			id = css.$id({ color: "red" })
			tag = css.$style( "h1", { color: "red" })
			selector = css.$style( "div > span", { color: "red" })
		}

		let a = css.$activate( A);
		expect(a!.cls.cssRule).toBeTruthy();
		expect(a!.id.cssRule).toBeTruthy();
		expect(a!.tag.cssRule).toBeTruthy();
		expect(a!.selector.cssRule).toBeTruthy();

		css.$deactivate( a!);
		expect(a!.cls.cssRule).toBeFalsy();
		expect(a!.id.cssRule).toBeFalsy();
		expect(a!.tag.cssRule).toBeFalsy();
		expect(a!.selector.cssRule).toBeFalsy();
	})



	it("should create style rules with proper selectors", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = css.$class({ color: "red" })
			id = css.$id({ color: "red" })
			tag = css.$style( "h1", { color: "red" })
			selector = css.$style( "div > span", { color: "red" })
		}

		let a = css.$activate( A);
		expect(a!.cls.cssRule?.selectorText).toEqual(".A_cls");
		expect(a!.id.cssRule?.selectorText).toEqual("#A_id");
		expect(a!.tag.cssRule?.selectorText).toEqual("h1");
		expect(a!.selector.cssRule?.selectorText).toEqual("div > span");

		css.$deactivate( a!);
	})



	it("should create dependent style rules for pseudo classes", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = css.$class({
				color: "red",
				":hover": {
					color: "pink",
					":visited": { color: "blue" }
				},
			})
		}

		let a = css.$activate( A);
		let elm = dom.getStyleElementWithID( "A");
		expect(elm).toBeTruthy();
		let cssRules = (elm!.sheet as CSSStyleSheet).cssRules;
		expect(cssRules.length).toEqual(3);

		expect((cssRules[0] as CSSStyleRule).selectorText).toEqual(".A_cls");
		expect((cssRules[1] as CSSStyleRule).selectorText).toEqual(".A_cls:hover");
		expect((cssRules[2] as CSSStyleRule).selectorText).toEqual(".A_cls:hover:visited");

		css.$deactivate( a!);
	})



	it("should create dependent style rules for combinators", () =>
	{
		class A extends css.StyleDefinition
		{
			cls1 = css.$class({})
			cls2 = css.$class({
				"&>": [ [ this.cls1, { color: "pink" } ]],
				"+&": [ [ this.cls1, { color: "pink" } ]]
			})
		}

		let a = css.$activate( A);
		let elm = dom.getStyleElementWithID( "A");
		expect(elm).toBeTruthy();
		let cssRules = (elm!.sheet as CSSStyleSheet).cssRules;
		expect(cssRules.length).toEqual(2);

		expect((cssRules[0] as CSSStyleRule).selectorText).toEqual(".A_cls2 > .A_cls1");
		expect((cssRules[1] as CSSStyleRule).selectorText).toEqual(".A_cls1 + .A_cls2");

		css.$deactivate( a!);
	})



	it("should create dependent style rule for complex selector", () =>
	{
		class A extends css.StyleDefinition
		{
			cls1 = css.$class({ color: "black" })

			cls = css.$class({
				color: "red",
				"&": [
					[ "&.other, .other& div > span", { color: "brown" } ],
					[ css.selector`&${this.cls1}, ${this.cls1}& + ${"table"}`, { color: "brown" } ]
				]
			})
		}

		let a = css.$activate( A);
		let elm = dom.getStyleElementWithID( "A");
		expect(elm).toBeTruthy();
		let cssRules = (elm!.sheet as CSSStyleSheet).cssRules;
		expect(cssRules.length).toEqual(4);

		expect((cssRules[0] as CSSStyleRule).selectorText).toEqual(".A_cls1");
		expect((cssRules[1] as CSSStyleRule).selectorText).toEqual(".A_cls");
		expect((cssRules[2] as CSSStyleRule).selectorText).toEqual(".A_cls.other, .other.A_cls div > span");
		expect((cssRules[3] as CSSStyleRule).selectorText).toEqual(".A_cls.A_cls1, .A_cls1.A_cls + table");

		css.$deactivate( a!);
	})



	it("should copy all style properties, including pseudo and dependent, when extending another style rule", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = css.$class({
				color: "red",
				"&": [
					[ "&.other, .other& div > span", { color: "brown" } ],
					[ "& > table", { color: "brown" } ]
				]
			})

			clsCopy = css.$class({ "+": this.cls })
		}

		let a = css.$activate( A);
		let elm = dom.getStyleElementWithID( "A");
		expect(elm).toBeTruthy();
		let cssRules = (elm!.sheet as CSSStyleSheet).cssRules;
		expect(cssRules.length).toEqual(6);

		expect((cssRules[0] as CSSStyleRule).selectorText).toEqual(".A_cls");
		expect((cssRules[1] as CSSStyleRule).selectorText).toEqual(".A_cls.other, .other.A_cls div > span");
		expect((cssRules[2] as CSSStyleRule).selectorText).toEqual(".A_cls > table");

		expect((cssRules[3] as CSSStyleRule).selectorText).toEqual(".A_clsCopy");
		expect((cssRules[4] as CSSStyleRule).selectorText).toEqual(".A_clsCopy.other, .other.A_clsCopy div > span");
		expect((cssRules[5] as CSSStyleRule).selectorText).toEqual(".A_clsCopy > table");

		css.$deactivate( a!);
	})
})



