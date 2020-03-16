/** Type of font-stretch property */
export type FontStretchType = "normal" | "ultra-condensed" | "extra-condensed" | "condensed" |
    "semi-condensed" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded" |
    number | [number, number];



/** Type of font-style property */
export type FontStyleType = "normal" | "italic" | "oblique" | number | [number | string, (number | string)?];



/** Type of font-weight property */
export type FontWeightType = "normal" | "bold" | number | [number, number];



/** Possible named values for format part of the src property */
export type FontSrcFormatType = "woff" | "woff2" | "truetype" | "opentype" | "embedded-opentype" | "svg";

/** Type of a single part of the src property */
export type FontSingleSrcType = string | { local: string } | { url: string, format?: FontSrcFormatType | FontSrcFormatType[] };

/** Type of src property */
export type FontSrcType = FontSingleSrcType | FontSingleSrcType[];



/**
 * Interface representing the properties of teh @font-face CSS rule.
 */
export interface Fontface
{
    fontFamily?: string;
    fontDisplay?: "auto" | "block" | "swap" | "fallback" | "optional";
    fontStretch?: FontStretchType;
    fontStyle?: FontStyleType;
    fontWeight?: FontWeightType;
    fontVariant?: string;
    fontFeatureSettings?: string;
    fontVariationSettings?: string;
    src?: FontSrcType;
    unicodeRange?: string;
}



