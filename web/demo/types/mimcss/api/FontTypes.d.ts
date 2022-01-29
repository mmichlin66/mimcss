import { IRawProxy } from "./CoreTypes";
import { CssAngle, CssLength, CssNumber, CssPercent } from "./NumericTypes";
/**
 * Type that extends the given type with the [[IRawProxy]] interface that allows specifying raw string value.
 */
export declare type FontFaceExtended<T> = T | IRawProxy;
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
    FontFaceExtended<FontStretch>,
    FontFaceExtended<FontStretch>
];
/** Type of [[IFontFace.fontStyle]] property */
export declare type FontStyle_FontFaceType = FontStyle | [
    FontFaceExtended<CssAngle>,
    FontFaceExtended<CssAngle>
];
/** Type of [[IFontFace.fontWeight]] property */
export declare type FontWeight_FontFaceType = FontWeight | [
    FontFaceExtended<FontWeight>,
    FontFaceExtended<FontWeight>
];
/** Possible named values for format part of the [[IFontFace.src]] property */
export declare type FontSrcFormat = "woff" | "woff2" | "truetype" | "opentype" | "embedded-opentype" | "svg";
/** Type of a single part of the [[IFontFace.src]] property */
export declare type FontSrc = string | {
    local: FontFaceExtended<string>;
} | {
    url: FontFaceExtended<string>;
    format?: FontFaceExtended<FontSrcFormat | FontSrcFormat[]>;
};
/** Type of [[IFontFace.src]] property */
export declare type FontSrc_FontFaceType = FontSrc | FontSrc[];
/**
 * Interface representing the properties of the `@font-face` CSS rule.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face
 */
export interface IFontFace {
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/ascent-override
     */
    ascentOverride?: FontFaceMetricOverride;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/descent-override
     */
    descentOverride?: FontFaceMetricOverride;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
     */
    fontDisplay?: FontDisplay_FontFaceType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-family
     */
    fontFamily?: string;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings
     */
    fontFeatureSettings?: string;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-stretch
     */
    fontStretch?: FontStretch_FontFaceType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-style
     */
    fontStyle?: FontStyle_FontFaceType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-variant
     */
    fontVariant?: string;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-variation-settings
     */
    fontVariationSettings?: string;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight
     */
    fontWeight?: FontWeight_FontFaceType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/line-gap-override
     */
    lineGapOverride?: FontFaceMetricOverride;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src
     */
    src?: FontSrc_FontFaceType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust
     */
    sizeAdjust?: CssPercent;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range
     */
    unicodeRange?: string;
}
/**
 * The `ExtendedFontFace` type maps all @font-face properties defined in the [[IFontFace]]
 * interface to the "extended" versions of their types. These extended types are defined using the
 * [[FontFaceExtended]] generic type, which adds [[IRawProxy]] to the type
 * that is defined in the [[IFontFace]] interface.
 */
export declare type ExtendedFontFace = {
    [K in keyof IFontFace]: FontFaceExtended<IFontFace[K]>;
};
//# sourceMappingURL=FontTypes.d.ts.map