import * as css from "../../index"
import * as dom from "../utils/dom"


describe("selectors:", () =>
{
    // switch to Scoped name generation method so that names are predictable
    css.configNameGeneration( css.NameGenerationMethod.Scoped);

    beforeEach(() =>
	{
		dom.removeAllStylesFromHead();
	})



    describe("array of selector items", () =>
    {
        it("tag and ID and class", () =>
        {
            class A extends css.StyleDefinition
            {
                cls1 = this.$class()
                id1 = this.$id()

                s1 = this.$style(
                   ["p", this.id1, this.cls1],
                    { color: "red" },
                )
            }

            let a = css.activate( A);

            expect(a.s1.cssRule!.selectorText).toEqual("p#A_id1.A_cls1");

            css.deactivate( a);
        })

        it("array within array", () =>
        {
            class A extends css.StyleDefinition
            {
                cls1 = this.$class()
                id1 = this.$id()

                s1 = this.$style(
                   ["p >", [this.id1, this.cls1]],
                    { color: "red" },
                )
            }

            let a = css.activate( A);

            expect(a.s1.cssRule!.selectorText).toEqual("p > #A_id1.A_cls1");

            css.deactivate( a);
        })
    })



    describe("css.selectors`` tag function", () =>
    {
        it("tag, ID, class", () =>
        {
            class A extends css.StyleDefinition
            {
                cls1 = this.$class()
                id1 = this.$id()

                s1 = this.$style(
                    css.selector`p, ${this.id1}, ${this.cls1}`,
                    { color: "red" },
                )
            }

            let a = css.activate( A);

            expect(a.s1.cssRule!.selectorText).toEqual("p, #A_id1, .A_cls1");

            css.deactivate( a);
        })
    })



    describe("css.sel() function", () =>
    {
        it('css.sel() with and, or, child, desc, sib and adj', () =>
        {
            class A extends css.StyleDefinition
            {
                id1 = this.$id()
                id2 = this.$id()
                id3 = this.$id()
                cls1 = this.$class()
                cls2 = this.$class()
                cls3 = this.$class()

                s1 = this.$style(
                    css.sel("p").and(this.id1, this.cls1),
                    { color: "red" },
                )

                s2 = this.$style(
                    css.sel("p").and(this.id1).and(this.cls1),
                    { color: "green" },
                )

                s3 = this.$style(
                    css.sel("p").and(this.id1).or(this.cls1).child(this.id2, this.cls2),
                    { color: "blue" },
                )

                s4 = this.$style(
                    css.sel("p").and(this.id1).or(this.cls1).child(this.id2).sib(this.cls2).adj(this.id3).desc(this.cls3),
                    { color: "yellow" },
                )

                s5 = this.$style(
                    css.sel("p").or().and(this.id1),
                    { color: "orange" },
                )
            }

            let a = css.activate( A);

            expect(a.s1.cssRule!.selectorText).toEqual("p#A_id1.A_cls1");
            expect(a.s2.cssRule!.selectorText).toEqual("p#A_id1.A_cls1");
            expect(a.s3.cssRule!.selectorText).toEqual("p#A_id1, .A_cls1 > #A_id2 > .A_cls2");
            expect(a.s4.cssRule!.selectorText).toEqual("p#A_id1, .A_cls1 > #A_id2 ~ .A_cls2 + #A_id3 .A_cls3");
            expect(a.s5.cssRule!.selectorText).toEqual("p, #A_id1");

            css.deactivate( a);
        })

        it('css.sel() with nth-xxx pseudo classes', () =>
        {
            class A extends css.StyleDefinition
            {
                s1 = this.$style(
                    css.sel("p").nthChild(4).nthLastChild([4]).nthOfType([4,0]).nthLastOfType(2,1)
                        .nthChild("odd").nthLastChild(3,-3),
                    { color: "red" },
                )
            }

            let a = css.activate( A);

            expect(a.s1.selectorText).toEqual("p:nth-child(4):nth-last-child(4n):nth-of-type(4n)" +
                ":nth-last-of-type(2n+1):nth-child(odd):nth-last-child(3n-3)");

            css.deactivate( a);
        })

        it('css.sel() with attributes', () =>
        {
            class A extends css.StyleDefinition
            {
                s1 = this.$style(
                    css.sel("p").attr("title"),
                    { color: "red" },
                )

                s2 = this.$style(
                    css.sel("p").attr("title", "https://www.example.com"),
                    { color: "red" },
                )

                s3 = this.$style(
                    css.sel("p").attr("title", "^=", "https://"),
                    { color: "red" },
                )

                s4 = this.$style(
                    css.sel("p").attr("title", "https://www.example.com", "i"),
                    { color: "red" },
                )

                // mathML = this.$namespace( css.WebNamespaces.MathML, "mml")
                // s5 = this.$style(
                //     css.sel("p").attr("title", "https://www.example.com", "i", this.mathML),
                //     { color: "red" },
                // )
            }

            let a = css.activate( A);

            expect(a.s1.cssRule!.selectorText).toEqual("p[title]");
            expect(a.s2.cssRule!.selectorText).toEqual('p[title="https://www.example.com"]');
            expect(a.s3.cssRule!.selectorText).toEqual('p[title^="https://"]');
            expect(a.s4.cssRule!.selectorText).toEqual('p[title="https://www.example.com" i]');
            // expect(a.s5.cssRule!.selectorText).toEqual('p[mml|title="https://www.example.com" i]');

            css.deactivate( a);
        })

        it('css.sel() with is, where and not', () =>
        {
            class A extends css.StyleDefinition
            {
                id1 = this.$id()
                id2 = this.$id()
                id3 = this.$id()
                cls1 = this.$class()
                cls2 = this.$class()
                cls3 = this.$class()

                s1 = this.$style(
                    css.sel().is(this.id1, this.cls1).desc().is( css.sel().where(this.id2, this.cls2).not(this.id3, this.cls3)),
                    { color: "red" },
                )
            }

            let a = css.activate( A);

            expect(a.s1.cssRule!.selectorText).toEqual(":is(#A_id1, .A_cls1) :is(:where(#A_id2, .A_cls2):not(#A_id3, .A_cls3))");

            css.deactivate( a);
        })

        // it('css.sel() with host$ and slotted', () =>
        // {
        //     class A extends css.StyleDefinition
        //     {
        //         id1 = this.$id()
        //         id2 = this.$id()
        //         id3 = this.$id()
        //         cls1 = this.$class()
        //         cls2 = this.$class()
        //         cls3 = this.$class()

        //         s1 = this.$style(
        //             css.sel().host$(this.id1, this.id2, this.id3).desc().slotted( this.cls1, this.cls2, this.cls3),
        //             { color: "red" },
        //         )
        //     }

        //     let a = css.activate( A);

        //     expect(a.s1.selectorText).toEqual(":host(#A_id1,#A_id2,#A_id3) ::slotted(.A_cls1,.A_cls2,.A_cls3)");

        //     css.deactivate( a);
        // })

        it('css.sel() with hoover and after', () =>
        {
            class A extends css.StyleDefinition
            {
                cls1 = this.$class()

                s1 = this.$style(
                    css.sel(this.cls1).hover.child().after,
                    { color: "red" },
                )
            }

            let a = css.activate( A);

            expect(a.s1.cssRule!.selectorText).toEqual(".A_cls1:hover > ::after");

            css.deactivate( a);
        })
   })
})



