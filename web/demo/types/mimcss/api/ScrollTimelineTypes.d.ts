import { RawExtended } from "./CoreTypes";
import { CssLength } from "./NumericTypes";
import { IIDRule } from "./RuleTypes";
/**
 * Type for specifying scroll-timeline [[source]] descriptor.
 */
export declare type Source_ScrollTimelineType = "none" | "auto" | IIDRule;
/**
 * Type for specifying scroll-timeline [[orientation]] descriptor.
 */
export declare type Orientation_ScrollTimelineType = "auto" | "block" | "inline" | "horizontal" | "vertical";
/**
 * Type for specifying element edges for the scroll-timeline [[scrollOffsets]] descriptor.
 */
export declare type ScrollElementOffsetEdge = "start" | "end";
/**
 * Type for specifying an element offset in the scroll-timeline [[scrollOffsets]] descriptor.
 */
export declare type ScrollElementOffset = IIDRule | [
    RawExtended<IIDRule>,
    ScrollElementOffsetEdge
] | [
    RawExtended<IIDRule>,
    number
] | [
    RawExtended<IIDRule>,
    ScrollElementOffsetEdge,
    number
];
/**
 * Type for specifying scroll-timeline [[scrollOffsets]] descriptor.
 */
export declare type ScrollOffsets_ScrollTimelineType = "none" | ("auto" | CssLength | ScrollElementOffset)[];
/**
 * Interface representing the descriptors of the `@scroll-timeline` CSS rule.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@scroll-timeline
 */
export interface IScrollTimeline {
    /**
     * The scrollable element whose scrolling position drives the progress of the timeline.
     *
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@scroll-timeline
     */
    source?: Source_ScrollTimelineType;
    /**
     * The scroll timeline's orientation.
     *
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@scroll-timeline
     */
    orientation?: Orientation_ScrollTimelineType;
    /**
     * Determines the scroll timeline's scroll offsets.
     *
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@scroll-timeline
     */
    scrollOffsets?: ScrollOffsets_ScrollTimelineType;
}
/**
 * The ExtendedScrollTimeline type maps all `@scroll-timeline` properties defined in the [[IScrollTimeline]]
 * interface to the "extended" versions of their types. These extended types are defined using the
 * [[RawExtended]] generic type, which adds [[IRawProxy]] to the type that is defined in the
 * IScrollTimeline interface.
 */
export declare type ExtendedScrollTimeline = {
    [K in keyof IScrollTimeline]: RawExtended<IScrollTimeline[K]>;
};
//# sourceMappingURL=ScrollTimelineTypes.d.ts.map