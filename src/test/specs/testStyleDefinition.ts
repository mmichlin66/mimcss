import * as css from "../../index"
import { isEmpty } from "../../impl/Virt";


describe("style definition", () =>
{
	it("plain objects inheritance", () =>
    {
        interface IA
        {
            a1?: css.IVarRule<"color">;
            a2?: {
                a21?: css.IVarRule<"color">;
                a22?: css.IVarRule<"color">;
                a23?: css.IVarRule<"color">;
            }
        }

        class A extends css.StyleDefinition
        {
            a: IA = {
                a1: this.$var("color", "red"),
                a2: {
                    a21: this.$var("color", "green"),
                    a22: this.$var("color", "blue"),
                    a23: this.$var("color", "cyan"),
                }
            }
        }


        class B extends A
        {
            a: IA = {
                a1: this.$var("color", "orange"),
                a2: {
                    a22: this.$var("color", "black"),
                    a23: undefined,
                }
            }
        }

        let b = new B();

        // expect(b.a.a1?.getValue()).toEqual("orange");
        // expect(b.a.a2?.a21?.getValue()).toEqual("green");
        // expect(b.a.a2?.a22?.getValue()).toEqual("black");
        expect(isEmpty(b.a.a2?.a23)).toBeTrue();
    })
})



