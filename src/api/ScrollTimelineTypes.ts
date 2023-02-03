import {RawExtended} from "./CoreTypes";
import { CssLength } from "./NumericTypes";
import {IIDRule} from "./RuleTypes";



/**
 * Type for specifying scroll-timeline {@link IScrollTimeline.source} descriptor.
 */
export type Source_ScrollTimelineType = "none" | "auto" | IIDRule;



/**
 * Type for specifying scroll-timeline {@link IScrollTimeline.orientation} descriptor.
 */
export type Orientation_ScrollTimelineType = "auto" | "block" | "inline" | "horizontal" | "vertical";



/**
 * Type for specifying element edges for the scroll-timeline {@link IScrollTimeline.scrollOffsets} descriptor.
 */
export type ScrollElementOffsetEdge = "start" | "end";

/**
 * Type for specifying an element offset in the scroll-timeline {@link IScrollTimeline.scrollOffsets} descriptor.
 */
export type ScrollElementOffset = IIDRule |
    [RawExtended<IIDRule>, ScrollElementOffsetEdge] |
    [RawExtended<IIDRule>, number] |
    [RawExtended<IIDRule>, ScrollElementOffsetEdge, number];

/**
 * Type for specifying scroll-timeline {@link IScrollTimeline.scrollOffsets} descriptor.
 */
export type ScrollOffsets_ScrollTimelineType = "none" | ("auto" | CssLength | ScrollElementOffset)[];



/**
 * Interface representing the descriptors of the `@scroll-timeline` CSS rule.
 *
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@scroll-timeline" target="mdn">MDN Page</a>
 */
export interface IScrollTimeline
{
    /**
     * The scrollable element whose scrolling position drives the progress of the timeline.
     *
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@scroll-timeline" target="mdn">MDN Page</a>
     */
    source?: Source_ScrollTimelineType;

    /**
     * The scroll timeline's orientation.
     *
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@scroll-timeline" target="mdn">MDN Page</a>
     */
    orientation?: Orientation_ScrollTimelineType;

    /**
     * Determines the scroll timeline's scroll offsets.
     *
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@scroll-timeline" target="mdn">MDN Page</a>
     */
    scrollOffsets?: ScrollOffsets_ScrollTimelineType;
}



/**
 * The ExtendedScrollTimeline type maps all `@scroll-timeline` properties defined in the {@link IScrollTimeline}
 * interface to the "extended" versions of their types. These extended types are defined using the
 * {@link CoreTypes!RawExtended} generic type, which adds {@link CoreTypes!IRawProxy} to the type that is defined in the
 * IScrollTimeline interface.
 */
export type ExtendedScrollTimeline = { [K in keyof IScrollTimeline]: RawExtended<IScrollTimeline[K]> }



