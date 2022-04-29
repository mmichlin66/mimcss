import {IRawProxy} from "./CoreTypes";
import {CssAngle, CssLength, CssNumber, CssPercent} from "./NumericTypes";



/**
 * Type that extends the given type with the [[IRawProxy]] interface that allows specifying raw string value.
 */
export type FontFaceExtended<T> = T | IRawProxy;



/**
 * Type of the [[ascentOverride]], [[descentOverride]] and [[lineGapOverride]] properties.
 */
export type FontFaceMetricOverride = "normal" | CssPercent;



/**
 * Type for specfying keywords [[IStyleset.fontStretch]] properties.
 */
export type FontStretchKeyword = "normal" | "ultra-condensed" | "extra-condensed" | "condensed" |
    "semi-condensed" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded";

/**
 * Type for specfying [[IStyleset.fontStretch]] properties.
 */
export type FontStretch = FontStretchKeyword | CssPercent;



/**
 * Type for specfying [[IStyleset.fontStyle]] properties.
 */
export type FontStyle = "normal" | "italic" | "oblique" | CssAngle;



/**
 * Type for specfying [[IStyleset.fontWeight]] properties.
 */
export type FontWeight = "normal" | "bold" | CssNumber;



/** Keywords specifying system fonts */
export type SystemFont = "caption" | "icon" | "menu" | "message-box" | "small-caption" | "status-bar";



/** Type for [[IStyleset.fontKerning]] style property */
export type FontKerning = "auto" | "normal" | "none";



/** Type for [[IStyleset.fontOpticalSizing]] style property */
export type FontOpticalSizing = "auto" | "none";



/** Type for [[IStyleset.fontSize]] style property */
export type FontSize = "xx-small" | "x-small" | "small" | "medium" | "large" |
    "x-large" | "xx-large" | "xxx-large" | "larger" | "smaller" | CssLength;



/** Type for [[IStyleset.fontSynthesis]] style property */
export type FontSynthesis = "none" | "weight" | "style" | "weight style";



/** Type for [[IStyleset.fontVariantCaps]] style property */
export type FontVariantCaps = "normal" | "small-caps" | "all-small-caps" |
    "petite-caps" | "all-petite-caps" | "unicase" | "titling-caps";



/** Type for [[IStyleset.fontVariantPosition]] style property */
export type FontVariantPosition = "normal" | "sub" | "super";



/** Type of [[IFontFace.fontDisplay]] property */
export type FontDisplay_FontFaceType = "auto" | "block" | "swap" | "fallback" | "optional";



/** Type of [[IFontFace.fontStretch]] property */
export type FontStretch_FontFaceType = FontStretch |
    [FontFaceExtended<FontStretch>, FontFaceExtended<FontStretch>];



/** Type of [[IFontFace.fontStyle]] property */
export type FontStyle_FontFaceType = FontStyle |
    [FontFaceExtended<CssAngle>, FontFaceExtended<CssAngle>];



/** Type of [[IFontFace.fontWeight]] property */
export type FontWeight_FontFaceType = FontWeight |
    [FontFaceExtended<FontWeight>, FontFaceExtended<FontWeight>];



/** Possible named values for format part of the [[IFontFace.src]] property */
export type FontSrcFormat = "woff" | "woff2" | "truetype" | "opentype" | "embedded-opentype" | "svg";

/** Type of a single part of the [[IFontFace.src]] property */
export type FontSrc = string | { local: FontFaceExtended<string> } |
    {
        url: FontFaceExtended<string>,
        format?: FontFaceExtended<FontSrcFormat | FontSrcFormat[]>
    };

/** Type of [[IFontFace.src]] property */
export type FontSrc_FontFaceType = FontSrc | FontSrc[];



/**
 * Interface representing the properties of the `@font-face` CSS rule.
 *
 * <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face" target="mdn">MDN Page</a>
 */
export interface IFontFace
{
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
 * [[FontFaceExtended]] generic type, which adds [[IRawProxy]] to the type
 * that is defined in the [[IFontFace]] interface.
 */
export type ExtendedFontFace = { [K in keyof IFontFace]: FontFaceExtended<IFontFace[K]> }



