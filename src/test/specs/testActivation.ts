import * as css from "../../index"
import * as dom from "../utils/dom"


describe("activation", () =>
{
    const isAdoptionSupported = "adoptedStyleSheets" in document;

	beforeEach(() =>
	{
		dom.removeAllStylesFromHead();
        css.configNameGeneration( css.NameGenerationMethod.Scoped);
	})



    describe("style element creation", () =>
    {
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

            css.deactivate( myStyles);
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

            css.deactivate( myStyles1);
            css.deactivate( myStyles2);
            css.deactivate( myStyles3);
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

            css.deactivate( b);
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

            css.deactivate( b);
            css.deactivate( c);
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

            css.deactivate( b);
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

            css.deactivate( styles1);
            elms = dom.getAllStylesFromHead();
            expect(elms.length).toEqual(1);

            css.deactivate( styles2);
            dom.expectNoStylesInHead();
        })
    })



    describe("name generation", () =>
    {
        it("should create the same name for overridden properties in two classes derived from the same base", () =>
        {
            class Base extends css.StyleDefinition
            {
                colored = this.$class({ color: "red" })
            }

            class A extends Base
            {
                colored = this.$class({ color: "green" })
            }

            class B extends Base
            {
                colored = this.$class({ color: "blue" })
            }

            let a = css.activate(A);
            let b = css.activate(B);
            expect(a.colored.name).toEqual(b.colored.name);

            css.deactivate(a);
            css.deactivate(b);
        })

        it("should create different names for same-named not-overridden properties in two classes derived from the same base", () =>
        {
            class Base extends css.StyleDefinition
            {
                red = this.$class({ color: "red" })
            }

            class A extends Base
            {
                bold = this.$class({ fontWeight: 700 })
            }

            class B extends Base
            {
                bold = this.$class({ fontWeight: 900 })
            }

            let a = css.activate(A);
            let b = css.activate(B);
            expect(a.bold.name).not.toEqual(b.bold.name);

            css.deactivate(a);
            css.deactivate(b);
        })

        it("should ignore name override on overridden rule in derived class", () =>
        {
            class Base extends css.StyleDefinition
            {
                red = this.$class()
            }

            class Derived extends Base
            {
                red = this.$class({ fontWeight: 700 }, ".name_override")
            }

            let sd = css.activate(Derived);
            expect(sd.red.name).not.toEqual("name_override");

            css.deactivate(sd);
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

            css.deactivate( styles1);
            css.deactivate( styles2);
            dom.expectNoStylesInHead();
        })

        it("should create same name for rules from the same class in different contexts", () =>
        {
            class A extends css.StyleDefinition
            {
                red = this.$class({ color: "red" })
            }

            let a1 = css.activate(A);

            css.pushRootContext(document);
            let a2 = css.activate( A);
            css.popRootContext(document);
            expect(a1.red.name).toEqual(a2.red.name);

            css.deactivate(a1);
            css.pushRootContext(document);
            css.deactivate( a2);
            css.popRootContext(document);
        })

        it("should use top-level class name as prefix for property under grouping rule", () =>
        {
            class A extends css.StyleDefinition
            {
                ifNarrow = this.$media( {maxWidth: 400},
                    class extends css.StyleDefinition{
                        colored = this.$class({ color: "orange" })
                    }
                )
            }

            let a = css.activate(A);

            expect(a.ifNarrow.gsd.colored.name).toEqual("A_colored");

            css.deactivate(a);
        })

        it("should create same name for same-named property in top-level class and under grouping rule", () =>
        {
            class A extends css.StyleDefinition
            {
                colored = this.$class({ color: "red" })
                ifNarrow = this.$media( {maxWidth: 400},
                    class extends css.StyleDefinition{
                        colored = this.$class({ color: "orange" })
                    }
                )
            }

            let a = css.activate(A);

            expect(a.colored.name).toEqual(a.ifNarrow.gsd.colored.name);

            css.deactivate(a);
        })

        it("should create same name for same-named property in two grouping rules", () =>
        {
            class A extends css.StyleDefinition
            {
                ifNarrow = this.$media( {maxWidth: 400},
                    class extends css.StyleDefinition{
                        colored = this.$class({ color: "orange" })
                    }
                )
                ifWide = this.$media( {minWidth: 1000},
                    class extends css.StyleDefinition{
                        colored = this.$class({ color: "brown" })
                    }
                )
            }

            let a = css.activate(A);

            expect(a.ifWide.gsd.colored.name).toEqual(a.ifNarrow.gsd.colored.name);

            css.deactivate(a);
        })
	})



    describe("adoption by documents and shadow roots", () =>
    {
        it("adopting one class", () =>
        {
            class A extends css.StyleDefinition
            {
                red = this.$class({ color: "red" })
            }

            css.pushRootContext(document);
            let a = css.activate( A);
            css.popRootContext(document);
            if (isAdoptionSupported)
                expect((document as any).adoptedStyleSheets.length).toEqual(1);
            else
                expect(dom.getAllStylesFromHead().length).toEqual(1);

            css.pushRootContext(document);
            css.deactivate( a);
            css.popRootContext(document);
            if (isAdoptionSupported)
                expect((document as any).adoptedStyleSheets.length).toEqual(0);
            else
                dom.expectNoStylesInHead();
        })

        it("adopting two classes with $use", () =>
        {
            class A extends css.StyleDefinition
            {
                red = this.$class({ color: "red" })
            }

            class B extends css.StyleDefinition
            {
                a = this.$use(A);
                blue = this.$class({ color: "blue" })
            }

            css.pushRootContext(document);
            let b = css.activate( B);
            css.popRootContext(document);
            if (isAdoptionSupported)
                expect((document as any).adoptedStyleSheets.length).toEqual(2);
            else
                expect(dom.getAllStylesFromHead().length).toEqual(2);

            css.pushRootContext(document);
            css.deactivate( b);
            css.popRootContext(document);
            if (isAdoptionSupported)
                expect((document as any).adoptedStyleSheets.length).toEqual(0);
            else
                dom.expectNoStylesInHead();
        })

        it("adopting an instance", () =>
        {
            class A extends css.StyleDefinition
            {
                red = this.$class({ color: "red" })
            }

            css.pushRootContext(document);
            let a = new A();
            css.activate( a);
            css.popRootContext(document);
            if (isAdoptionSupported)
                expect((document as any).adoptedStyleSheets.length).toEqual(1);
            else
                expect(dom.getAllStylesFromHead().length).toEqual(1);

            css.pushRootContext(document);
            css.deactivate( a);
            css.popRootContext(document);
            if (isAdoptionSupported)
                expect((document as any).adoptedStyleSheets.length).toEqual(0);
            else
                dom.expectNoStylesInHead();
        })

        it("adopting an instance with referenced instance", () =>
        {
            class A extends css.StyleDefinition
            {
                red = this.$class({ color: "red" })
            }

            class B extends css.StyleDefinition
            {
                a = new A;
                blue = this.$class({ color: "blue" })
            }

            css.pushRootContext(document);
            let b = css.activate( new B());
            css.popRootContext(document);
            if (isAdoptionSupported)
                expect((document as any).adoptedStyleSheets.length).toEqual(2);
            else
                expect(dom.getAllStylesFromHead().length).toEqual(2);

            css.pushRootContext(document);
            css.deactivate( b);
            css.popRootContext(document);
            if (isAdoptionSupported)
                expect((document as any).adoptedStyleSheets.length).toEqual(0);
            else
                dom.expectNoStylesInHead();
        })
    })
})


