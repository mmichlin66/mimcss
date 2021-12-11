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

        let sds = doSSRandHydrate( A);

        expect(sds[0].cls.cssRule?.selectorText).toEqual(".A_cls");

        sds.forEach( sd => css.deactivate( sd));
    })



	it("single style definition with multiple rules", () =>
	{
        class A extends css.StyleDefinition
        {
            cls = this.$class({ color: "red" })
            id = this.$id({ color: "red" })
            tag = this.$tag( "span", { color: "red" })
        }

        let sds = doSSRandHydrate( A);

        expect(sds[0].cls.cssRule?.selectorText).toEqual(".A_cls");
        expect(sds[0].id.cssRule?.selectorText).toEqual("#A_id");
        expect(sds[0].tag.cssRule?.selectorText).toEqual("span");

        sds.forEach( sd => css.deactivate( sd));
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

        let sds = doSSRandHydrate( A, B);

        expect(sds[1].a.cls.cssRule?.selectorText).toEqual(".A_cls");

        sds.forEach( sd => css.deactivate( sd));
    })
})



function doSSRandHydrate( ...classes: css.IStyleDefinitionClass[]): any[]
{
    css.startSSR();
    let sds = classes.map( cls => css.activate( cls));
    let s = css.stopSSR();
    sds.forEach( sd => css.deactivate( sd));

    document.head.insertAdjacentHTML( "beforeend", s);

    css.startHydration();
    sds = classes.map( cls => css.activate( cls));
    css.stopHydration();

    return sds;
}


