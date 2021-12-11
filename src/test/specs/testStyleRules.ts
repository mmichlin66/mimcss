import * as css from "../../index"
import * as dom from "../utils/dom"


describe("style rules:", () =>
{
    // switch to Scoped name generation method so that names are predictable
    css.configNameGeneration( css.NameGenerationMethod.Scoped);

    beforeEach(() =>
	{
		dom.removeAllStylesFromHead();
	})



	it("should not create rules with no styles", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = this.$class()
			id = this.$id()
			tag = this.$tag( "h1", {})
			selector = this.$style( "div > span", {})
		}

		let a = css.activate( A);
		expect(a.cls.cssRule).not.toBeDefined();
		expect(a.id.cssRule).not.toBeDefined();
		expect(a.tag.cssRule).not.toBeDefined();
		expect(a.selector.cssRule).not.toBeDefined();

		css.deactivate( a);
	})



	it("should create rules upon activation, remove upon deactivation", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = this.$class({ color: "red" })
			id = this.$id({ color: "red" })
			tag = this.$style( "h1", { color: "red" })
			selector = this.$style( "div > span", { color: "red" })
		}

		let a = css.activate( A);
		expect(a.cls.cssRule).toBeTruthy();
		expect(a.id.cssRule).toBeTruthy();
		expect(a.tag.cssRule).toBeTruthy();
		expect(a.selector.cssRule).toBeTruthy();

		css.deactivate( a);
		expect(a.cls.cssRule).toBeFalsy();
		expect(a.id.cssRule).toBeFalsy();
		expect(a.tag.cssRule).toBeFalsy();
		expect(a.selector.cssRule).toBeFalsy();
	})



	it("should create style rules with proper selectors", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = this.$class({ color: "red" })
			id = this.$id({ color: "red" })
			tag = this.$tag( "h1", { color: "red" })
			selector = this.$style( "div > span", { color: "red" })
		}

		let a = css.activate( A);
		expect(a.cls.cssRule?.selectorText).toEqual(".A_cls");
		expect(a.id.cssRule?.selectorText).toEqual("#A_id");
		expect(a.tag.cssRule?.selectorText).toEqual("h1");
		expect(a.selector.cssRule?.selectorText).toEqual("div > span");

		css.deactivate( a);
	})



	it("should create dependent style rules for pseudo classes", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = this.$class({
				color: "red",
				":hover": {
					color: "pink",
					":visited": { color: "blue" }
				},
			})
		}

		let a = css.activate( A);
		let elm = dom.getStyleElementWithID( "A");
		expect(elm).toBeTruthy();
		let cssRules = (elm!.sheet as CSSStyleSheet).cssRules;
		expect(cssRules.length).toEqual(3);

		expect((cssRules[0] as CSSStyleRule).selectorText).toEqual(".A_cls");
		expect((cssRules[1] as CSSStyleRule).selectorText).toEqual(".A_cls:hover");
		expect((cssRules[2] as CSSStyleRule).selectorText).toEqual(".A_cls:hover:visited");

		css.deactivate( a);
	})



	it("should create dependent style rules for combinators", () =>
	{
		class A extends css.StyleDefinition
		{
			cls1 = this.$class({})
			cls2 = this.$class({
				"&>": [ [ this.cls1, { color: "pink" } ]],
				"+&": [ [ this.cls1, { color: "pink" } ]]
			})
		}

		let a = css.activate( A);
		let elm = dom.getStyleElementWithID( "A");
		expect(elm).toBeTruthy();
		let cssRules = (elm!.sheet as CSSStyleSheet).cssRules;
		expect(cssRules.length).toEqual(2);

		expect((cssRules[0] as CSSStyleRule).selectorText).toEqual(".A_cls2 > .A_cls1");
		expect((cssRules[1] as CSSStyleRule).selectorText).toEqual(".A_cls1 + .A_cls2");

		css.deactivate( a);
	})



	it("should create dependent style rules for nth pseudo class", () =>
	{
		class A extends css.StyleDefinition
		{
			cls1 = this.$class({
                ":nth-child": [
                    [ 4,  { color: "red" } ],
                    [ [4],  { color: "green" } ],
                    [ [4, 0],  { color: "blue" } ],
                    [ [2, 1],  { color: "yellow" } ],
                    [ "3n+4",  { color: "orange" } ],
                    [ "even",  { color: "violet" } ],
                    [ [3,-3],  { color: "azure" } ],
                ]
            })
		}

		let a = css.activate( A);
		let elm = dom.getStyleElementWithID( "A");
		expect(elm).toBeTruthy();
		let cssRules = (elm!.sheet as CSSStyleSheet).cssRules;
		expect(cssRules.length).toEqual(7);

		expect((cssRules[0] as CSSStyleRule).selectorText).toEqual(".A_cls1:nth-child(4)");
		expect((cssRules[1] as CSSStyleRule).selectorText).toEqual(".A_cls1:nth-child(4n)");
		expect((cssRules[2] as CSSStyleRule).selectorText).toEqual(".A_cls1:nth-child(4n)");
		expect((cssRules[3] as CSSStyleRule).selectorText).toEqual(".A_cls1:nth-child(2n+1)");
		expect((cssRules[4] as CSSStyleRule).selectorText).toEqual(".A_cls1:nth-child(3n+4)");
		expect((cssRules[5] as CSSStyleRule).selectorText).toEqual(".A_cls1:nth-child(2n)");
		expect((cssRules[6] as CSSStyleRule).selectorText).toEqual(".A_cls1:nth-child(3n-3)");

		css.deactivate( a);
	})



	it("should create dependent style rules for complex selectors", () =>
	{
		class A extends css.StyleDefinition
		{
			cls1 = this.$class({ color: "black" })

			cls = this.$class({
				color: "red",
				"&": [
					[ "&.other, .other& div > span", { color: "brown" } ],
					[ css.selector`&${this.cls1}, ${this.cls1}& + ${"table"}`, { color: "brown" } ]
				]
			})
		}

		let a = css.activate( A);
		let elm = dom.getStyleElementWithID( "A");
		expect(elm).toBeTruthy();
		let cssRules = (elm!.sheet as CSSStyleSheet).cssRules;
		expect(cssRules.length).toEqual(4);

		expect((cssRules[0] as CSSStyleRule).selectorText).toEqual(".A_cls1");
		expect((cssRules[1] as CSSStyleRule).selectorText).toEqual(".A_cls");
		expect((cssRules[2] as CSSStyleRule).selectorText).toEqual(".A_cls.other, .other.A_cls div > span");
		expect((cssRules[3] as CSSStyleRule).selectorText).toEqual(".A_cls.A_cls1, .A_cls1.A_cls + table");

		css.deactivate( a);
	})



	it("should copy all style properties, including dependent rules, when extending another style rule", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = this.$class({
				color: "red",
				"&": [
					[ "&.other, .other& div > span", { color: "brown" } ],
					[ "& > table", { color: "brown" } ]
				]
			})

			clsCopy = this.$class({ "+": this.cls })
		}

		let a = css.activate( A);
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

		css.deactivate( a);
	})



	it("should set !important flag", () =>
	{
		dom.testPropPriority( "paddingLeft", { "!": 8 }, true);
	})



	it("create multiple name:value pairs for the same property using \"[]\"", () =>
	{
        let s = css.stylesetToString( {color: {"[]": ["red", "blue"]} });
        expect(s).toEqual( "{color:red;color:blue;}");
    })



	it("create multiple name:value pairs for the same property using multiple stylesets", () =>
	{
		class A extends css.StyleDefinition
		{
			cls = this.$class([
                { color: "red" },
                { color: "blue" }
            ])
		}

        css.startSSR();
        css.activate( A);
        let s = css.stopSSR();
        expect(s).toEqual( "<style id=\"A\">.A_cls{color:red;color:blue;}</style>");
    })



	it("create multiple name:value pairs when extending style rule: single value and single value", () =>
	{
		class A extends css.StyleDefinition
		{
			abstr = this.$abstract({ color: "red" })
			cls = this.$class({ "+": this.abstr, color: "blue" })
		}

        css.startSSR();
        css.activate( A);
        let s = css.stopSSR();
		expect(s).toEqual("<style id=\"A\">.A_cls{color:red;color:blue;}</style>");
    })



	it("create multiple name:value pairs when extending style rule: single value and multi value", () =>
	{
		class A extends css.StyleDefinition
		{
			abstr = this.$abstract({ color: "red" })
			cls = this.$class({ "+": this.abstr, color: {"[]": ["blue", "green"]} })
		}

        css.startSSR();
        css.activate( A);
        let s = css.stopSSR();
		expect(s).toEqual("<style id=\"A\">.A_cls{color:red;color:blue;color:green;}</style>");
    })



	it("create multiple name:value pairs when extending style rule: multi value and single value", () =>
	{
		class A extends css.StyleDefinition
		{
			abstr = this.$abstract({ color: {"[]": ["red", "blue"]} })
			cls = this.$class({ "+": this.abstr, color: "green" })
		}

        css.startSSR();
        css.activate( A);
        let s = css.stopSSR();
		expect(s).toEqual("<style id=\"A\">.A_cls{color:red;color:blue;color:green;}</style>");
    })



	it("create multiple name:value pairs when extending style rule: multi value and multi value", () =>
	{
		class A extends css.StyleDefinition
		{
			abstr = this.$abstract({ color: {"[]": ["red", "blue"]} })
			cls = this.$class({ "+": this.abstr, color: {"[]": ["green", "yellow"]} })
		}

        css.startSSR();
        css.activate( A);
        let s = css.stopSSR();
		expect(s).toEqual("<style id=\"A\">.A_cls{color:red;color:blue;color:green;color:yellow;}</style>");
    })



	it("create multiple name:value pairs when extending multiple style rules", () =>
	{
		class A extends css.StyleDefinition
		{
			abstr1 = this.$abstract({ color: {"[]": ["red", "blue"]} })
			abstr2 = this.$abstract({ color: {"[]": ["green", "yellow"]} })
			cls = this.$class({
                color: {"[]": ["brown", "orange"]},
                "+": [this.abstr1, this.abstr2],
            })
		}

        css.startSSR();
        css.activate( A);
        let s = css.stopSSR();
		expect(s).toEqual("<style id=\"A\">.A_cls{color:brown;color:orange;color:red;color:blue;color:green;color:yellow;}</style>");
    })



	it("create multiple name:value pairs when extending multiple style rules: intermingled", () =>
	{
		class A extends css.StyleDefinition
		{
			abstr1 = this.$abstract({ color: {"[]": ["red", "blue"]} })
			abstr2 = this.$abstract({ color: {"[]": ["green", "yellow"]} })
			cls = this.$class([
                {"+": [this.abstr1]},
                {color: {"[]": ["brown", "orange"]}},
                {"+": [this.abstr2]},
            ])
		}

        css.startSSR();
        css.activate( A);
        let s = css.stopSSR();
		expect(s).toEqual("<style id=\"A\">.A_cls{color:red;color:blue;color:brown;color:orange;color:green;color:yellow;}</style>");
    })
})



