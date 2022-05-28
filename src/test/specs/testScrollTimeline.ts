import * as css from "../../index"
import {scrollTimeline2s} from "../../impl/MiscImpl"
import * as dom from "../utils/dom"


describe("@scroll-timeline at-rule", () =>
{
    it("source with selector()", () =>
    {
        class A extends css.StyleDefinition
        {
            id = this.$id()
        }

        let a = css.activate(A);
        css.deactivate(a);

        let s = scrollTimeline2s({
            source: a.id,
        });

        expect(s).toEqual( "source:selector(#A_id)");
    })

    it("scroll-offsets with lengths", () =>
    {
        let s = scrollTimeline2s({
            scrollOffsets: [0, 30, "1in"]
        });

        expect(s).toEqual( "scroll-offsets:0px,30px,1in");
    })

    it("scroll-offsets with element offsets", () =>
    {
        class A extends css.StyleDefinition
        {
            id = this.$id()
        }

        let a = css.activate(A);
        css.deactivate(a);

        let s = scrollTimeline2s({
            scrollOffsets: [[a.id, "start", 0.1], [a.id, "end", 0.2]]
        });

        expect(s).toEqual( "scroll-offsets:selector(#A_id) start 0.1,selector(#A_id) end 0.2");
    })

    it("scroll-offsets with mix of lengths and element offsets", () =>
    {
        class A extends css.StyleDefinition
        {
            id = this.$id()

            timeline = this.$scrollTimeline({
                scrollOffsets: [0, [this.id, 0.8]]
            })

            cls = this.$class({
                animationTimeline: this.timeline
            })
        }

		let s = dom.serialize( A);
        expect(s).toEqual( `<style id="A">@scroll-timeline {scroll-offsets:0px,selector(#A_id) 0.8}.A_cls{animation-timeline:A_timeline;}</style>`);
    })
})



