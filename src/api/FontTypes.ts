import {IStringProxy} from "./CoreTypes";
import { CssPercent } from "./NumericTypes";



/**
 * Type that extends the given type with the IStringProxy interface that allows specifying raw string value.
 */
export type FontFaceExtended<T> = T | IStringProxy;



/**
 * Type of the ascent-override and descent-override properties.
 */
export type FontFaceMetricOverride = "normal" | CssPercent;



/** Type of font-display property */
export type FontDisplay_FontFaceType = "auto" | "block" | "swap" | "fallback" | "optional";



export type FontStretch_Single = "normal" | "ultra-condensed" | "extra-condensed" | "condensed" |
    "semi-condensed" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded" | CssPercent;

/** Type of font-stretch property */
export type FontStretch_FontFaceType = FontStretch_Single | [FontStretch_Single, FontStretch_Single];



/** Type of font-style property */
export type FontStyle_FontFaceType = "normal" | "italic" | "oblique" | number |
    [FontFaceExtended<number>, FontFaceExtended<number>];



/** Type of font-weight property */
export type FontWeight_FontFaceType = "normal" | "bold" | number |
    [FontFaceExtended<number>, FontFaceExtended<number>];



/** Possible named values for format part of the src property */
export type FontSrcFormat_Keyword = "woff" | "woff2" | "truetype" | "opentype" | "embedded-opentype" | "svg";

/** Type of a single part of the src property */
export type FontSrc_Single = string | { local: FontFaceExtended<string> } |
    {
        url: FontFaceExtended<string>,
        format?: FontFaceExtended<FontSrcFormat_Keyword | FontSrcFormat_Keyword[]>
    };

/** Type of src property */
export type FontSrc_FontFaceType = FontSrc_Single | FontSrc_Single[];



/**
 * Interface representing the properties of the @font-face CSS rule.
 */
export interface IBaseFontFace
{
    ascentOverride?: FontFaceMetricOverride;
    descentOverride?: FontFaceMetricOverride;
    fontDisplay?: FontDisplay_FontFaceType;
    fontFamily?: string;
    fontFeatureSettings?: string;
    fontStretch?: FontStretch_FontFaceType;
    fontStyle?: FontStyle_FontFaceType;
    fontVariant?: string;
    fontVariationSettings?: string;
    fontWeight?: FontWeight_FontFaceType;
    lineGapOverride?: FontFaceMetricOverride;
    src?: FontSrc_FontFaceType;
    sizeAdjust?: CssPercent;
    unicodeRange?: string;
}



/**
 * The IFontFace type maps all @font-face properties defined in the [[ICssFontFace]] interface to
 * the "extended" versions of their types. These extended types are defined using the
 * [[FontFaceExtended]] generic type, which adds [[StringProxy]] and [[ICustomVar]] to the type
 * that is defined in the ICssFontFace interface.
 */
export type ExtendedFontFace = { [K in keyof IBaseFontFace]: FontFaceExtended<IBaseFontFace[K]> }



