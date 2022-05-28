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
 * Type for specifying scroll-timeline [[orientation]] descriptor.
 */
export declare type ScrollElementOffsetEdge = "start" | "end";
/**
 * Type for specifying a single element offset in the scroll-timeline [[scroll-offsets]] descriptor.
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
 * Type for specifying scroll-timeline [[scroll-offsets]] descriptor.
 */
export declare type ScrollOffsets_ScrollTimelineType = "none" | ("auto" | CssLength | ScrollElementOffset)[];
/**
 * Interface representing the descriptors of the `@scroll-timeline` CSS rule.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@scroll-timeline
 */
export interface IScrollTimeline {
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/system
     */
    source?: Source_ScrollTimelineType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/negative
     */
    orientation?: Orientation_ScrollTimelineType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/prefix
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