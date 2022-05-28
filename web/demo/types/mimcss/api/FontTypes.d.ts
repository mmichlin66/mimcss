import { RawExtended } from "./CoreTypes";
import { CssAngle, CssLength, CssNumber, CssPercent } from "./NumericTypes";
/**
 * Type of the [[ascentOverride]], [[descentOverride]] and [[lineGapOverride]] properties.
 */
export declare type FontFaceMetricOverride = "normal" | CssPercent;
/**
 * Type for specfying keywords [[IStyleset.fontStretch]] properties.
 */
export declare type FontStretchKeyword = "normal" | "ultra-condensed" | "extra-condensed" | "condensed" | "semi-condensed" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded";
/**
 * Type for specfying [[IStyleset.fontStretch]] properties.
 */
export declare type FontStretch = FontStretchKeyword | CssPercent;
/**
 * Type for specfying [[IStyleset.fontStyle]] properties.
 */
export declare type FontStyle = "normal" | "italic" | "oblique" | CssAngle;
/**
 * Type for specfying [[IStyleset.fontWeight]] properties.
 */
export declare type FontWeight = "normal" | "bold" | CssNumber;
/** Keywords specifying system fonts */
export declare type SystemFont = "caption" | "icon" | "menu" | "message-box" | "small-caption" | "status-bar";
/** Type for [[IStyleset.fontKerning]] style property */
export declare type FontKerning = "auto" | "normal" | "none";
/** Type for [[IStyleset.fontOpticalSizing]] style property */
export declare type FontOpticalSizing = "auto" | "none";
/** Type for [[IStyleset.fontSize]] style property */
export declare type FontSize = "xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large" | "xxx-large" | "larger" | "smaller" | CssLength;
/** Type for [[IStyleset.fontSynthesis]] style property */
export declare type FontSynthesis = "none" | "weight" | "style" | "weight style";
/** Type for [[IStyleset.fontVariantCaps]] style property */
export declare type FontVariantCaps = "normal" | "small-caps" | "all-small-caps" | "petite-caps" | "all-petite-caps" | "unicase" | "titling-caps";
/** Type for [[IStyleset.fontVariantPosition]] style property */
export declare type FontVariantPosition = "normal" | "sub" | "super";
/** Type of [[IFontFace.fontDisplay]] property */
export declare type FontDisplay_FontFaceType = "auto" | "block" | "swap" | "fallback" | "optional";
/** Type of [[IFontFace.fontStretch]] property */
export declare type FontStretch_FontFaceType = FontStretch | [
    RawExtended<FontStretch>,
    RawExtended<FontStretch>
];
/** Type of [[IFontFace.fontStyle]] property */
export declare type FontStyle_FontFaceType = FontStyle | [
    RawExtended<CssAngle>,
    RawExtended<CssAngle>
];
/** Type of [[IFontFace.fontWeight]] property */
export declare type FontWeight_FontFaceType = FontWeight | [
    RawExtended<FontWeight>,
    RawExtended<FontWeight>
];
/** Possible named values for format part of the [[IFontFace.src]] property */
export declare type FontSrcFormat = "woff" | "woff2" | "truetype" | "opentype" | "embedded-opentype" | "svg";
/** Type of a single part of the [[IFontFace.src]] property */
export declare type FontSrc = string | {
    local: RawExtended<string>;
} | {
    url: RawExtended<string>;
    format?: RawExtended<FontSrcFormat | FontSrcFormat[]>;
};
/** Type of [[IFontFace.src]] property */
export declare type FontSrc_FontFaceType = FontSrc | FontSrc[];
/**
 * Interface representing the properties of the `@font-face` CSS rule.
 *
 * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face" target="mdn">MDN Page</a>
 */
export interface IFontFace {
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/ascent-override" target="mdn">MDN Page</a>
     */
    ascentOverride?: FontFaceMetricOverride;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/descent-override" target="mdn">MDN Page</a>
     */
    descentOverride?: FontFaceMetricOverride;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display" target="mdn">MDN Page</a>
     */
    fontDisplay?: FontDisplay_FontFaceType;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-family" target="mdn">MDN Page</a>
     */
    fontFamily?: string;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings" target="mdn">MDN Page</a>
     */
    fontFeatureSettings?: string;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-stretch" target="mdn">MDN Page</a>
     */
    fontStretch?: FontStretch_FontFaceType;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-style" target="mdn">MDN Page</a>
     */
    fontStyle?: FontStyle_FontFaceType;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-variant" target="mdn">MDN Page</a>
     */
    fontVariant?: string;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-variation-settings" target="mdn">MDN Page</a>
     */
    fontVariationSettings?: string;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight" target="mdn">MDN Page</a>
     */
    fontWeight?: FontWeight_FontFaceType;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/line-gap-override" target="mdn">MDN Page</a>
     */
    lineGapOverride?: FontFaceMetricOverride;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src" target="mdn">MDN Page</a>
     */
    src?: FontSrc_FontFaceType;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust" target="mdn">MDN Page</a>
     */
    sizeAdjust?: CssPercent;
    /**
     * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range" target="mdn">MDN Page</a>
     */
    unicodeRange?: string;
}
/**
 * The `ExtendedFontFace` type maps all @font-face properties defined in the [[IFontFace]]
 * interface to the "extended" versions of their types. These extended types are defined using the
 * [[RawExtended]] generic type, which adds [[IRawProxy]] to the type
 * that is defined in the [[IFontFace]] interface.
 */
export declare type ExtendedFontFace = {
    [K in keyof IFontFace]: RawExtended<IFontFace[K]>;
};
//# sourceMappingURL=FontTypes.d.ts.map