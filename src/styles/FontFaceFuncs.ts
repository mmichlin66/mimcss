import * as FontFaceTypes from "./FontFaceTypes"
import * as UtilFuncs from "./UtilFuncs"



/**
 * Converts the given font face definition object to the CSS string
 */
export function fontFaceToCssString( fontface: FontFaceTypes.Fontface): string | null
{
    if (!fontface || !fontface.fontFamily)
        return null;

    let s = "{";

    for( let propName in fontface)
    {
        s += `${UtilFuncs.camelToDash( propName)}:`;
        let propVal = fontface[propName];
        if (propName === "fontStretch")
            s += fontStretchToCssString( propVal);
        else if (propName === "fontStyle")
            s += fontStyleToCssString( propVal);
        else if (propName === "fontWeight")
            s += fontWeightToCssString( propVal);
        else if (propName === "src")
            s += fontSrcToCssString( propVal);
        else
            s += propVal;

        s += ";"
    }

    return s + "}";
}



export function fontStretchToCssString( val: FontFaceTypes.FontStretchType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val + "%";
    else
        return `${val[0]}% ${val[1]}%`;
}



export function fontStyleToCssString( val: FontFaceTypes.FontStretchType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return `oblique ${val}deg`;
    else
    {
        let s = "oblique ";
        if (typeof val[0] === "string")
            s += val[0];
        else
            s += `${val[0]}deg`;

        if (val[1])
        {
            s += " ";
            if (typeof val[1] === "string")
                s += val[1];
            else
                s += `${val[1]}deg`;
        }

        return s;
    }
}



export function fontWeightToCssString( val: FontFaceTypes.FontWeightType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val.toString();
    else
        return `${val[0].toString()} ${val[1].toString()}`;
}



export function fontSrcToCssString( val: FontFaceTypes.FontSrcType): string
{
    if (typeof val === "string" || !Array.isArray(val))
        return fontSingleSrcToCssString( val as FontFaceTypes.FontSingleSrcType);
    else
        return val.map( (singleVal) => fontSingleSrcToCssString( singleVal)).join(",");
}



export function fontSingleSrcToCssString( val: FontFaceTypes.FontSingleSrcType): string
{
    if (typeof val === "string")
    {
        if (val.startsWith("local(") || val.startsWith("url("))
            return val;
        else
            return `url(${val})`;
    }
    else if ( "local" in val)
        return `local(${val.local})`;
    else
    {
        let s = `url(${val.url})`;
        if (val.format)
        {
            s += " format(";
            if (typeof val.format === "string")
                s += `\"${val.format}\"`;
            else
                s += val.format.map( (v) => `\"${v}\"`).join( ",");

            s += ")";
        }

        return s;
    }
}



