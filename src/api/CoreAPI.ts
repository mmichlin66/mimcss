import {
    INumberMath, ILengthMath, IAngleMath, ITimeMath, IResolutionMath, IFrequencyMath,
    IPercentMath, Extended, IStringProxy, AttrTypeKeyword, AttrUnitKeyword, ILengthProxy,
    IPercentProxy, IAngleProxy, ITimeProxy, IResolutionProxy, IFrequencyProxy, IQuotedProxy,
    CssLength, IFitContentProxy, CssNumber, IAspectRatioProxy, SelectorItem, ISelectorProxy
} from "./CoreTypes"
import {
	NumberMath, LengthMath, AngleMath, TimeMath, ResolutionMath, FrequencyMath, PercentMath, v2s,
    templateStringToString, AnyToStringFunc, v2sByFuncID
} from "../impl/CoreFuncs"



/**
 * The Num object contains methods that implement CSS mathematic functions on the `<number>`
 * CSS type.
 */
export let Num: INumberMath = new NumberMath();



/**
 * The Percent object contains methods that implement CSS mathematic functions on the
 * `<percentage>` CSS type by appending a "%" unit suffix.
 */
export let Percent: IPercentMath = new PercentMath();



/**
 * Creates percent value by appenfing the `"%"` sign to the given number. This function should be
 * used whenever a `<percentage>` CSS type is used for a style property or value.
 */
export function percent( n: number): IPercentProxy { return () => n + "%"; }



/**
 * The Len object contains methods that implement CSS mathematic functions on the `<length>`
 * CSS type by appending a length unit suffix.
 * Integer numbers use "px"; floating point numbers use "em".
 */
export let Len: ILengthMath = new LengthMath();



/** Creates length value in quarters of an inch */
export function Q( n: number): ILengthProxy { return () => n + "Q"; }

/** Creates length value in ch units */
export function ch( n: number): ILengthProxy { return () => n + "ch"; }

/** Creates length value in cantimeters */
export function cm( n: number): ILengthProxy { return () => n + "cm"; }

/** Creates length value in calculated font-sizes of the element */
export function em( n: number): ILengthProxy { return () => n + "em"; }

/** Creates length value in heights of lowercase letter 'x' in the font */
export function ex( n: number): ILengthProxy { return () => n + "ex"; }

/** Creates length value in ic units */
export function ic( n: number): ILengthProxy { return () => n + "ic"; }

/** Creates length value in inches */
export function inch( n: number): ILengthProxy { return () => n + "in"; }

/** Creates length value in line-heights of the element */
export function lh( n: number): ILengthProxy { return () => n + "lh"; }

/** Creates length value in millimeters */
export function mm( n: number): ILengthProxy { return () => n + "mm"; }

/** Creates length value in picas */
export function pc( n: number): ILengthProxy { return () => n + "pc"; }

/** Creates length value in points */
export function pt( n: number): ILengthProxy { return () => n + "pt"; }

/** Creates length value in pixels */
export function px( n: number): ILengthProxy { return () => n + "px"; }

/** Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s block axis */
export function vb( n: number): ILengthProxy { return () => n + "vb"; }

/** Creates length value in 1% of the height of the viewport's initial containing block */
export function vh( n: number): ILengthProxy { return () => n + "vh"; }

/** Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s inline axis */
export function vi( n: number): ILengthProxy { return () => n + "vi"; }

/** Creates length value in 1% of the width of the viewport's initial containing block */
export function vw( n: number): ILengthProxy { return () => n + "vw"; }

/** Creates length value in fontsizes of the root element (<html>) */
export function rem( n: number): ILengthProxy { return () => n + "rem"; }

/** Creates length value in line-heights of the root element (<html>) */
export function rlh( n: number): ILengthProxy { return () => n + "rlh"; }

/** Creates length value in the units which are a smaller value between vw and vh */
export function vmin( n: number): ILengthProxy { return () => n + "vmin"; }

/** Creates length value in the units which are a larger value between vw and vh */
export function vmax( n: number): ILengthProxy { return () => n + "vmax"; }

/** Creates length value for flex */
export function fr( n: number): ILengthProxy { return () => n + "fr"; }


/**
 * The Angle object contains methods that implement CSS mathematic functions on the `<angle>`
 * CSS type by appending an angle unit suffix.
 * Integer numbers use "deg"; floating point numbers use "turn".
 */
export let Angle: IAngleMath = new AngleMath();



/** Creates angle value in degrees */
export function deg( n: number): IAngleProxy { return () => n + "deg"; }

/** Creates angle value in radians */
export function rad( n: number): IAngleProxy { return () => n + "rad"; }

/** Creates angle value in gradians */
export function grad( n: number): IAngleProxy { return () => n + "grad"; }

/** Creates angle value in turns */
export function turn( n: number): IAngleProxy { return () => n + "turn"; }



/**
 * The Time object contains methods that implement CSS mathematic functions on the `<time>`
 * CSS type by appending a time unit suffix.
 * Integer numbers use "ms"; floating point numbers use "s".
 */
export let Time: ITimeMath = new TimeMath();



/** Creates time value in milliseconds */
export function ms( n: number): ITimeProxy { return () => n + "ms"; }

/** Creates time value in seconds */
export function s( n: number): ITimeProxy { return () => n + "s"; }


/**
 * The Resolution object contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS type by appending a resolution unit suffix.
 * Integer numbers use "dpi"; floating point numbers use "dpcm".
 */
export let Resolution: IResolutionMath = new ResolutionMath();



/** Creates resolution value in DPI */
export function dpi( n: number): IResolutionProxy { return () => n + "dpi"; }

/** Creates resolution value in DPCM */
export function dpcm( n: number): IResolutionProxy { return () => n + "dpcm"; }

/** Creates resolution value in DPPX */
export function dppx( n: number): IResolutionProxy { return () => n + "dppx"; }

/** Creates resolution value in X */
export function x( n: number): IResolutionProxy { return () => n + "x"; }



/**
 * The Frequency object contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS type by appending a frequency unit suffix.
 * Integer numbers use "Hz"; floating point numbers use "kHz".
 */
export let Frequency: IFrequencyMath = new FrequencyMath();



/** Creates frequency value in Hertz */
export function hz( n: number): IFrequencyProxy { return () => n + "hz"; }

/** Creates frequency value in Kilo-Hertz */
export function khz( n: number): IFrequencyProxy { return () => n + "khz"; }



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a string representation of a selector. This function is a tag function and must be
 * invoked with the template string without parentheses.
 */
 export function selector( parts: TemplateStringsArray, ...params: SelectorItem[]): ISelectorProxy
 {
     return () => templateStringToString( parts, params);
 }



/**
 * The `raw` function allows specifying arbitrary text for properties whose type normally doesn't
 * allow strings.This function is a tag function and must be invoked with the template string
 * without parentheses. The `raw` function can be used for any style property. Note, however, that
 * no validation checks are performed on the structure of the template. If the resulting string
 * isn't valid for the style property, the property will not be come part of the style rule
 * inserted into the DOM.
 *
 * **Example**
 *
 * ```typescript
 * clip-path: raw`polygon(50% 20%, 90% 80%, 10% 80%)`
 * ```
 */
export function raw( parts: TemplateStringsArray, ...params: any[]): IStringProxy
{
    return () => templateStringToString( parts, params);
}



/**
 * Returns an IFitContentProxy function representing the `fit-content()` CSS function.
 */
export function fitContent( size: Extended<CssLength>): IFitContentProxy
{
    return () => `fit-content(${LengthMath.s2s(size)})`;
}



/**
 * Returns an IAspectRatioProxy function representing the `<ratio>` CSS type.
 */
export function ratio( w: CssNumber, h?: CssNumber): IAspectRatioProxy
{
    return () => NumberMath.s2s(w) + (h ? "/" + NumberMath.s2s(h) : "");
}



/**
 * Returns a function representing the `attr()` CSS function. It returns IStringProxy
 * and theoretically can be used in any style property; however, its use by browsers is currently
 * limited to the `content` property. Also no browser currently support type, units or fallback
 * values.
 */
export function attr( attrName: Extended<string>, typeOrUnit?: Extended<AttrTypeKeyword | AttrUnitKeyword>,
	fallback?: Extended<string>): IStringProxy
{
    return () => `attr(${attrName}${typeOrUnit ? " " + typeOrUnit : ""}${fallback ? "," + fallback : ""})`;
}



/**
 * Returns a function representing a string in quotation marks.
 */
export function quoted( val: any): IQuotedProxy
{
    return () => `"${v2s(val)}"`;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Base class for CSS function invocations.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Defines type containing array of either property names or tuples where the first element is
 * the name of a property and the second element is either the ID of registered function or the
 * function converting the value of the property to string. Each property is converted according
 * to the following rules:
 * - If the array item is just a string, the corresponding value's property is converted using
 *   the v2s function.
 * - If the tuple's second element is null or undefined, the corresponding value's property is
 *   converted using the v2s function.
 * - If the tuple's second element is a number it is treated as an index of a well-known
 *   conversion function.
 * - If the tuple's second element is a function, it is used to convert the value's property.
 */
type V2PDef = (string | [string, number | AnyToStringFunc])[];



/**
 * Symbol that can be used on class objects of function invocation classes to specify the delimiter
 * to separate function arguments. This is optional and is only needed if the delimiter is not a
 * comma.
 */
const symCssFuncName: unique symbol = Symbol();

/**
 * Symbol used on class objects of function invocation classes to specify how instances of the
 * class should be converted to strings. The value must be of type V2PDef, which is an array of
 * property names along with indications how they are converted to strings.
 */
const symCssFuncParamInfo: unique symbol = Symbol();

/**
 * Symbol that can be used on class objects of function invocation classes to specify the delimiter
 * to separate function arguments. This is optional and is only needed if the delimiter is not a
 * comma.
 */
const symCssFuncParamDelimiter: unique symbol = Symbol();



/**
 * Base class for classes that serve as representations of CSS function invocations.
 */
export abstract class CssFunc
{
    /**
     * CSS function name
     */
    static [symCssFuncName]?: string;

    /**
     * Optional information about function parameters and how they shold be converted to strings
     */
    static [symCssFuncParamInfo]?: V2PDef;

    /**
     * Optional delimiter to separate function parameters. The default is comma.
     */
    static [symCssFuncParamDelimiter]?: string;

    public toString(): string
    {
        return `${this.name}(${this.params})`;
    }

    /**
     * Returns CSS function name. This implementation returns the value of the static
     * symbol symCssFuncName. It can be overridden in the derived classes.
     */
    public get name(): string { return this.constructor[symCssFuncName]; }

    /**
     * Returns the string containing all the CSS function parameters. This implementation
     * uses parameter information and delimiter optionally set as values of the static
     * symbols symCssFuncParamInfo and symCssFuncParamDelimiter. It can be overridden in the
     * derived classes.
     */
    public get params(): string
    {
        let info: V2PDef | undefined = this.constructor[symCssFuncParamInfo];
        if (info == null)
            return "";

        let params: string[] = [];
        for( let nameOrTuple of info)
        {
            // get the name of the property in the value to be converted and the corresponding value;
            // if the properties value is not defined, skip it.
            let propName = typeof nameOrTuple === "string" ? nameOrTuple : nameOrTuple[0];
            let propVal = this[propName];
            if (propVal == null)
                continue;

            let convertor = typeof nameOrTuple === "string" ? undefined : nameOrTuple[1];
            if (!convertor)
                params.push( v2s( propVal));
            else if (typeof convertor === "number")
                params.push( v2sByFuncID( propVal, convertor));
            else
                params.push( convertor( propVal));
        }

        return params.join(this.constructor[symCssFuncParamDelimiter] ?? ",");
    }

    /**
     * Sets up the CssFunc-derived class by specifying how the function parameters are
     * converted to strings, what function name to use and what delimiter to use to separate
     * function parameters.
     * @param paramInfo Information about how class properties should be converted to strings
     * representing function parameters.
     * @param name Name of the function. This can be left undefined if the class overrides the
     * `name` property getter. This is usually the case for classes that serve multiple functions.
     * @param delimiter Optional delimiter string used to separate function parameters. This can
     * be left undefined if comma should be used.
     */
    public static setup<T extends CssFunc>( this: { new (...args: any[]): T },
        paramInfo: (keyof T | [keyof T, number | AnyToStringFunc])[],
        name?: string, delimiter?: string): void
    {
        if (paramInfo) this[symCssFuncParamInfo] = paramInfo;
        if (name) this[symCssFuncName] = name;
        if (delimiter) this[symCssFuncParamDelimiter] = delimiter;
    }
}



