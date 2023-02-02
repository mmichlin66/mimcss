import {ExtendedFontFace, ExtendedFontPaletteValues, IFontFace, IFontPaletteValues, OverrideColors_FontPaletteValuesType} from "../api/FontTypes"
import {IContainerFeatureset, IMediaFeatureset, MediaQuery, MediaStatement, SupportsQuery, SupportsStatement} from "../api/MediaTypes";
import {sp2s} from "./StyleImpl";
import {camelToDash, v2s, a2s, WKF, V2SOptions, wkf, propSet2s} from "./Utils";
import {ExtendedCounterStyleset, ICounterStyleset} from "../api/CounterTypes";
import { ExtendedScrollTimeline, IScrollTimeline } from "../api/ScrollTimelineTypes";
import { IIDRule } from "../api/RuleTypes";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @media rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given media statement object to the CSS media query string
 */
export const media2s = (statement?: MediaStatement): string =>
    v2s( statement, {
        any: mediaQuery2s,
        sep: ","
    })

/**
 * Converts the given media query object to the CSS media query string
 */
const mediaQuery2s = (query?: MediaQuery): string =>
    propSet2s( query, mediaFeatureInfos, {
        separator: " and ",
        propFunc: mediaFeature2s,
    });

/**
 * Converts the given media feature to the CSS media query string
 */
const mediaFeature2s = (dashName: string, camelName: string, val: any, options: V2SOptions): string =>
{
    if (val == null)
        return "";

    // if defaultValue is defined and the property value is equal to it, no value should be returned.
    let defaultValue = mediaFeatureDefaultValues.get(camelName);
    if (defaultValue !== undefined && val === defaultValue)
        return dashName;

    let isRange = rangeMediaFeatures.has( camelName);
    if (isRange && Array.isArray( val))
    {
        return `(${"min-" + dashName}:${v2s( val[0], options)}) and (${"max-" + dashName}:${v2s( val[1], options)})`;

        // this syntax is not widely supported yet
        // return `${s1} <= ${dashName} <= ${s2}`;
    }
    else
        return `(${dashName}:${v2s( val, options)})`;
}



const mediaFeatureInfos: { [K in keyof (IMediaFeatureset & IContainerFeatureset)]?: V2SOptions } =
{
    aspectRatio: {
        num: (v: number) => v + "/1"
    },
    height: WKF.Length,
    minHeight: WKF.Length,
    maxHeight: WKF.Length,
    resolution: WKF.Resolution,
    minResolution: WKF.Resolution,
    maxResolution: WKF.Resolution,
    width: WKF.Length,
    minWidth: WKF.Length,
    maxWidth: WKF.Length,
    blockSize: WKF.Length,
    minBlockSize: WKF.Length,
    maxBlockSize: WKF.Length,
    inlineSize: WKF.Length,
    minInlineSize: WKF.Length,
    maxInlineSize: WKF.Length,
};

// Set of media features that allow range of values
const rangeMediaFeatures = new Set<string>(["aspectRatio", "color", "colorIndex", "height", "monochrome", "resolution", "width"]);

// Map of media features to default values
const mediaFeatureDefaultValues = new Map<string,any>([
    ["color", 0],
    ["colorIndex", 0],
    ["monochrome", 0]
]);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @supports rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Converts the given supports statement to its string representation */
export const supports2s = (statement?: SupportsStatement): string =>
    v2s( statement, {
        any: supportsQuery2s,
        sep: " or "
    });

/** Converts the given supports query to its string representation */
const supportsQuery2s = (query?: SupportsQuery): string =>
    v2s( query, {
        obj: (v: Exclude<SupportsQuery,string>) => {
            let propNames = Object.keys( v);
            if (propNames.length === 0)
                return "";

            return `(${propNames.map( (propName) =>
                `${camelToDash(propName)}:${sp2s( propName, query?.[propName])}`).join( ") and (")})`;
        }
    });



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @font-face rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given font face object to the CSS style string.
 */
export const fontFace2s = (fontface: ExtendedFontFace): string => propSet2s( fontface, fontFacePropertyInfos);

wkf[WKF.FontStyle] = v => v2s( v, {
    num: v => `oblique ${wkf[WKF.Angle](v)}`,
    arr: v => `oblique ${a2s( v, WKF.Angle)}`
});



/**
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const fontFacePropertyInfos: { [K in keyof IFontFace]?: V2SOptions } =
{
    ascentOverride: WKF.Percent,
    descentOverride: WKF.Percent,
    fontStretch: { any: WKF.Percent },
    fontStyle: WKF.FontStyle,
    fontWeight: { any: WKF.Number },
    lineGapOverride: WKF.Percent,
    src: {
        any: {
            obj: [
                ["local", v => `local(${v})`],
                ["url", v => `url(${v})`],
                ["format", {
                    any: v => `format(\"${v}\")`,
                    sep: ","
                }],
                ["tech", {
                    any: v => `tech(${v})`,
                    sep: ","
                }]
            ]
        },
        sep: ","
    },
    sizeAdjust: WKF.Percent,
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @font-palette-values rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given font face object to the CSS style string.
 */
export const fontPaletteValues2s = (fontPaletteValues: ExtendedFontPaletteValues): string =>
    propSet2s( fontPaletteValues, fontPaletteValuesPropertyInfos);



/**
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const fontPaletteValuesPropertyInfos: { [K in keyof IFontPaletteValues]?: V2SOptions } =
{
    overrideColors: (v: OverrideColors_FontPaletteValuesType) =>
        Object.entries(v).map(entry => `${entry[0]} ${wkf[WKF.Color](entry[1])}`).join(",")
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @counter-style rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given counter styleset object to the CSS string
 */
export const counterStyleset2s = (counterStyleset: ExtendedCounterStyleset): string => propSet2s( counterStyleset, counterStylePropertyInfos)



 /**
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const counterStylePropertyInfos: { [K in keyof ICounterStyleset]?: V2SOptions } =
{
    system: {
        num: v => "fixed " + v,
        arr: v => "extends " + v2s(v[0])
    },
    negative: {
        any: WKF.Quoted
    },
    prefix: WKF.Quoted,
    suffix: WKF.Quoted,
    range: {
        arr2: { sep: "," }
    },
    pad: {
        item: WKF.Quoted
    },
    symbols: {
        item: WKF.Quoted
    },
    additiveSymbols: {
        arr2: { item: { item: WKF.Quoted }, sep: "," },
        any: WKF.Quoted
    },
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @scroll-timeline rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given scroll timeline object to the CSS string
 */
export const scrollTimeline2s = (scrollTimeline: ExtendedScrollTimeline): string =>
    propSet2s( scrollTimeline, scrollTimelinePropertyInfos)



/** Converts IIDRule object to selector(#id) string */
const idRuleSelector2s = (v: IIDRule) => `selector(${v.cssName})`;



/**
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const scrollTimelinePropertyInfos: { [K in keyof IScrollTimeline]?: V2SOptions } =
{
    source: {
        obj2: idRuleSelector2s,
    },
    scrollOffsets: {
        item: {
            obj2: idRuleSelector2s,
            num: WKF.Length,
            item: {
                obj2: idRuleSelector2s,
            },
        },
        sep: ","
    },
}



