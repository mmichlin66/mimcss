import * as css from "../../index"
import * as dom from "../utils/dom"


describe("SSR and Hydration", () =>
{
    // switch to Scoped name generation method so that names are predictable
    css.configNameGeneration( css.NameGenerationMethod.Scoped);

    beforeEach(() =>
	{
		dom.removeAllStylesFromHead();
	})



	it("single style definition with single rule", () =>
	{
        class A extends css.StyleDefinition
        {
            cls = this.$class({ color: "red" })
        }

        doSSRandHydrate( [A], (sds) =>
            expect(sds[0].cls.cssRule?.selectorText).toEqual(".A_cls")
        );
    })



	it("single style definition with multiple rules", () =>
	{
        class A extends css.StyleDefinition
        {
            cls = this.$class({ color: "red" })
            id = this.$id({ color: "red" })
            tag = this.$tag( "span", { color: "red" })
        }

        doSSRandHydrate( [A], (sds) => {
            expect(sds[0].cls.cssRule?.selectorText).toEqual(".A_cls");
            expect(sds[0].id.cssRule?.selectorText).toEqual("#A_id");
            expect(sds[0].tag.cssRule?.selectorText).toEqual("span");
        });
    })



	it("One style definition with reference to another", () =>
	{
        class A extends css.StyleDefinition
        {
            cls = this.$class({ color: "red" })
        }

        class B extends css.StyleDefinition
        {
            a = this.$use(A)
            id = this.$id({ color: "red" })
        }

        doSSRandHydrate( [A, B], (sds) =>
            expect(sds[1].a.cls.cssRule?.selectorText).toEqual(".A_cls")
        );
    })
})



function doSSRandHydrate( classes: css.IStyleDefinitionClass[],
    testFunc: ( sds: any[]) => void): void
{
    css.startSSR();
    let sds = classes.map( cls => css.activate( cls));
    let s = css.stopSSR();
    sds.forEach( sd => css.deactivate( sd));

    document.head.insertAdjacentHTML( "beforeend", s);

    css.startHydration();
    sds = classes.map( cls => css.activate( cls));
    css.stopHydration();

    testFunc(sds);

    sds.forEach( sd => css.deactivate( sd));
}


