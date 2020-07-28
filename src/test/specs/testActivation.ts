import * as css from "../../mimcssTypes"
import * as dom from "../utils/dom"


describe("activation:", () =>
{
	beforeEach(() =>
	{
		dom.removeAllStylesFromHead();
	})



	it("should insert/remove <style> element to/from <head>", () =>
	{
		class MyStyles extends css.StyleDefinition
		{
			red = css.$class({ color: "red" })
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
			red = css.$class({ color: "red" })
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
			red = css.$class({ color: "red" })
		}

		class B extends css.StyleDefinition
		{
			a = css.$use(A)
			blue = css.$class({ color: "blue" })
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
			red = css.$class({ color: "red" })
		}

		class B extends css.StyleDefinition
		{
			a = css.$use(A)
			blue = css.$class({ color: "blue" })
		}

		class C extends css.StyleDefinition
		{
			a = css.$use(A)
			green = css.$class({ color: "green" })
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
			red = css.$class({ color: "red" })
		}

		class B extends A
		{
			blue = css.$class({ color: "blue" })
		}

		let b = css.activate( B);
		let elms = dom.getAllStylesFromHead();
		expect(elms.length).toEqual(1);

		css.deactivate( b!);
		dom.expectNoStylesInHead();
	})



	it("should not create <style> elements for embedded definitions", () =>
	{
		class EmbeddedStyles1 extends css.StyleDefinition
		{
			red = css.$class({ color: "red" })
		}

		class EmbeddedStyles2 extends css.StyleDefinition
		{
			embedded = css.$embed( EmbeddedStyles1)
			green = css.$class({ color: "green" })
		}

		class MyStyles extends css.StyleDefinition
		{
			embedded = css.$embed( EmbeddedStyles2)
			blue = css.$class({ color: "blue" })
		}

		let myStyles1 = css.activate( MyStyles);

		let elms = dom.getAllStylesFromHead();
		expect(elms.length).toEqual(1);

		css.deactivate( myStyles1!);
		dom.expectNoStylesInHead();
	})



	it("should create different unique names for same-named rules for embedded definitions", () =>
	{
		class EmbeddedStyles extends css.StyleDefinition
		{
			red = css.$class({ color: "red" })
		}

		class MyStyles extends css.StyleDefinition
		{
			embedded = css.$embed( EmbeddedStyles)
			red = css.$class({ color: "darkred" })
		}

		let myStyles1 = css.activate( MyStyles);

		let elms = dom.getAllStylesFromHead();
		expect((elms[0].sheet as CSSStyleSheet).cssRules.length).toEqual(2);

		css.deactivate( myStyles1!);
		dom.expectNoStylesInHead();
	})
})


