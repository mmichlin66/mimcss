import {RawExtended} from "./CoreTypes";
import {CssAngle, CssLength, CssNumber, CssPercent} from "./NumericTypes";



/**
 * Type of the {@link ascentOverride}, {@link descentOverride} and {@link lineGapOverride} properties.
 */
export type FontFaceMetricOverride = "normal" | CssPercent;



/**
 * Type for specfying keywords {@link IStyleset.fontStretch} properties.
 */
export type FontStretchKeyword = "normal" | "ultra-condensed" | "extra-condensed" | "condensed" |
    "semi-condensed" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded";

/**
 * Type for specfying {@link IStyleset.fontStretch} properties.
 */
export type FontStretch = FontStretchKeyword | CssPercent;



/**
 * Type for specfying keywords {@link IStyleset.fontStyle} properties.
 */
export type FontStyleKeyword = "normal" | "italic" | "oblique";

/**
 * Type for specfying {@link IStyleset.fontStyle} properties.
 */
export type FontStyle = FontStyleKeyword | CssAngle;



/**
 * Type for specfying keywords {@link IStyleset.fontWeight} properties.
 */
export type FontWeightKeyword = "normal" | "bold";

/**
 * Type for specfying {@link IStyleset.fontWeight} properties.
 */
export type FontWeight = FontWeightKeyword | CssNumber;



/** Keywords specifying system fonts */
export type SystemFont = "caption" | "icon" | "menu" | "message-box" | "small-caption" | "status-bar";



/** Type for {@link IStyleset.fontKerning} style property */
export type FontKerning = "auto" | "normal" | "none";



/** Type for {@link IStyleset.fontOpticalSizing} style property */
export type FontOpticalSizing = "auto" | "none";



/**
 * Type for specfying keywords {@link IStyleset.fontSize} properties.
 */
export type FontSizeKeyword = "xx-small" | "x-small" | "small" | "medium" | "large" |
    "x-large" | "xx-large" | "xxx-large" | "larger" | "smaller";

/** Type for {@link IStyleset.fontSize} style property */
export type FontSize = FontSizeKeyword | CssLength;



/** Type for {@link IStyleset.fontSynthesis} style property */
export type FontSynthesis = "none" | "weight" | "style" | "weight style";



/** Type for {@link IStyleset.fontVariantCaps} style property */
export type FontVariantCaps = "normal" | "small-caps" | "all-small-caps" |
    "petite-caps" | "all-petite-caps" | "unicase" | "titling-caps";



/** Type for {@link IStyleset.fontVariantPosition} style property */
export type FontVariantPosition = "normal" | "sub" | "super";



/** Type of {@link IFontFace.fontDisplay} property */
export type FontDisplay_FontFaceType = "auto" | "block" | "swap" | "fallback" | "optional";



/** Type of {@link IFontFace.fontStretch} property */
export type FontStretch_FontFaceType = FontStretch |
    [RawExtended<FontStretch>, RawExtended<FontStretch>];



/** Type of {@link IFontFace.fontStyle} property */
export type FontStyle_FontFaceType = FontStyle |
    [RawExtended<CssAngle>, RawExtended<CssAngle>];



/** Type of {@link IFontFace.fontWeight} property */
export type FontWeight_FontFaceType = FontWeight |
    [RawExtended<FontWeight>, RawExtended<FontWeight>];



/** Possible named values for format part of the {@link IFontFace.src} property */
export type FontSrcFormat = "woff" | "woff2" | "truetype" | "opentype" | "embedded-opentype" | "svg";

/** Type of a single part of the {@link IFontFace.src} property */
export type FontSrc = string | { local: RawExtended<string> } |
    {
        url: RawExtended<string>,
        format?: RawExtended<FontSrcFormat | FontSrcFormat[]>
    };

/** Type of {@link IFontFace.src} property */
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
 * The `ExtendedFontFace` type maps all @font-face properties defined in the {@link IFontFace}
 * interface to the "extended" versions of their types. These extended types are defined using the
 * {@link RawExtended} generic type, which adds {@link IRawProxy} to the type
 * that is defined in the {@link IFontFace} interface.
 */
export type ExtendedFontFace = { [K in keyof IFontFace]: RawExtended<IFontFace[K]> }



