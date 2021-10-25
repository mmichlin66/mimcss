import * as css from "../../index"
import * as dom from "../utils/dom"


describe("activation:", () =>
{
	beforeEach(() =>
	{
		dom.removeAllStylesFromHead();
        css.configNameGeneration( css.NameGenerationMethod.Scoped);
	})



	it("should insert/remove <style> element to/from <head>", () =>
	{
		class MyStyles extends css.StyleDefinition
		{
			red = this.$class({ color: "red" })
		}

		let myStyles = css.activate( MyStyles);
		let elms = dom.getAllStylesFromHead();
		expect(elms.length).toEqual(1);
		expect(elms[0].id).toEqual("MyStyles");

		css.deactivate( myStyles!);
		dom.expectNoStylesInHead();
	})



	it("should reference-count multiple activations", () =>
	{
		class MyStyles extends css.StyleDefinition
		{
			red = this.$class({ color: "red" })
		}

		let myStyles1 = css.activate( MyStyles);
		let myStyles2 = css.activate( MyStyles);
		let myStyles3 = css.activate( MyStyles);

		let elms = dom.getAllStylesFromHead();
		expect(elms.length).toEqual(1);

		css.deactivate( myStyles1!);
		css.deactivate( myStyles2!);
		css.deactivate( myStyles3!);
		dom.expectNoStylesInHead();
	})



	it("should insert two <style> elements for $use", () =>
	{
		class A extends css.StyleDefinition
		{
			red = this.$class({ color: "red" })
		}

		class B extends css.StyleDefinition
		{
			a = this.$use(A)
			blue = this.$class({ color: "blue" })
		}

		let b = css.activate( B);
		let elms = dom.getAllStylesFromHead();
		expect(elms.length).toEqual(2);

		css.deactivate( b!);
		dom.expectNoStylesInHead();
	})



	it("should reference-count activations from multiple $use calls", () =>
	{
		class A extends css.StyleDefinition
		{
			red = this.$class({ color: "red" })
		}

		class B extends css.StyleDefinition
		{
			a = this.$use(A)
			blue = this.$class({ color: "blue" })
		}

		class C extends css.StyleDefinition
		{
			a = this.$use(A)
			green = this.$class({ color: "green" })
		}

		let b = css.activate( B);
		let c = css.activate( C);
		let elms = dom.getAllStylesFromHead();
		expect(elms.length).toEqual(3);

		css.deactivate( b!);
		css.deactivate( c!);
		dom.expectNoStylesInHead();
	})



	it("should insert one <style> elements for inherited style definition classes", () =>
	{
		class A extends css.StyleDefinition
		{
			red = this.$class({ color: "red" })
		}

		class B extends A
		{
			blue = this.$class({ color: "blue" })
		}

		let b = css.activate( B);
		let elms = dom.getAllStylesFromHead();
		expect(elms.length).toEqual(1);

		css.deactivate( b!);
		dom.expectNoStylesInHead();
	})



	it("should create single <style> element for multiple embedded definitions", () =>
	{
        @css.embedded("A")
		class EmbeddedStyles1 extends css.StyleDefinition
		{
			red = this.$class({ color: "red" })
		}

        @css.embedded("A")
		class EmbeddedStyles2 extends css.StyleDefinition
		{
			green = this.$class({ color: "green" })
		}

		let styles1 = css.activate( EmbeddedStyles1);
		let elms = dom.getAllStylesFromHead();
		expect(elms.length).toEqual(1);

		let styles2 = css.activate( EmbeddedStyles2);
		elms = dom.getAllStylesFromHead();
		expect(elms.length).toEqual(1);

        css.deactivate( styles1!);
		elms = dom.getAllStylesFromHead();
		expect(elms.length).toEqual(1);

        css.deactivate( styles2!);
		dom.expectNoStylesInHead();
	})



	it("should create different unique names for same-named rules for embedded definitions", () =>
	{
        @css.embedded("B")
		class EmbeddedStyles1 extends css.StyleDefinition
		{
			red = this.$class({ color: "red" })
		}

        @css.embedded("B")
		class EmbeddedStyles2 extends css.StyleDefinition
		{
			red = this.$class({ color: "red" })
		}

		let styles1 = css.activate( EmbeddedStyles1);
		let styles2 = css.activate( EmbeddedStyles2);

		let elms = dom.getAllStylesFromHead();
		let rules = (elms[0].sheet as CSSStyleSheet).cssRules;
		expect(rules.length).toEqual(2);
        expect(rules[0].cssText).not.toEqual(rules[1].cssText);

		css.deactivate( styles1!);
		css.deactivate( styles2!);
		dom.expectNoStylesInHead();
	})
})


