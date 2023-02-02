import * as css from "../../index"
import * as dom from "../utils/dom"


describe("Conditional group rules:", () =>
{
    // switch to Scoped name generation method so that names are predictable
    css.configNameGeneration( css.NameGenerationMethod.Scoped);

	describe("@container rules", () =>
    {
        it("@container w/o name with media", () =>
        {
            class A extends css.StyleDefinition
            {
                c = this.$container({minBlockSize: 600},
                    class C extends css.StyleDefinition<A>
                    {
                        h1 = this.$class({color: "red"})
                    }
                )
            }

            let s = dom.serialize( A);

            // double space is on purpose when there is no name
            expect(s).toEqual(
                "<style id=\"A\">@container  (min-block-size:600px){.A_h1{color:red;}}</style>"
            );
        })

        it("@container with name and with media", () =>
        {
            class A extends css.StyleDefinition
            {
                c = this.$container({minBlockSize: 600},
                    class C extends css.StyleDefinition<A>
                    {
                        h1 = this.$class({color: "red"})
                    },
                    "name"
                )
            }

            let s = dom.serialize( A);

            expect(s).toEqual(
                "<style id=\"A\">@container name (min-block-size:600px){.A_h1{color:red;}}</style>"
            );
        })

        it("@container w/o name with styles", () =>
        {
            class A extends css.StyleDefinition
            {
                c = this.$container(css.style({color: "blue"}),
                    class C extends css.StyleDefinition<A>
                    {
                        h1 = this.$class({color: "red"})
                    }
                )
            }

            let s = dom.serialize( A);

            // double space is on purpose when there is no name
            expect(s).toEqual(
                "<style id=\"A\">@container  style(color:blue){.A_h1{color:red;}}</style>"
            );
        })

        it("@container with name with media and styles", () =>
        {
            class A extends css.StyleDefinition
            {
                c = this.$container(css.container`not ${css.style({color: "blue"})} and not ${{minBlockSize: 600}}`,
                    class C extends css.StyleDefinition<A>
                    {
                        h1 = this.$class({color: "red"})
                    },
                    "name"
                )
            }

            let s = dom.serialize( A);

            // double space is on purpose when there is no name
            expect(s).toEqual(
                "<style id=\"A\">@container name not style(color:blue) and not (min-block-size:600px){.A_h1{color:red;}}</style>"
            );
        })

	})
})



