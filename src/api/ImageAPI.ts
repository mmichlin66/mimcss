import {Extended, CssPosition, SimpleCssPosition, CssAngle} from "../styles/UtilTypes"
import {ExtentKeyword} from "../styles/StyleTypes";
import {
    GradientStopOrHint, GradientColorAndLength, LinearGradAngle, RadialGradientShape,
    CrossFadeParam, ImageProxy
} from "../styles/ImageTypes"
import {colorToString} from "../styles/ColorFuncs";
import {valueToString, INumberMathClass, CssAngleMath, positionToString, CssPercentMath} from "../styles/UtilFuncs";



/**
 * Returns an ImageProxy function representing the `linear-gradient()` CSS function.
 */
export function linearGradient( angle?: LinearGradAngle,
    ...stopsOrHints: GradientStopOrHint[]): ImageProxy
{
    return () => linearGradientToString( "linear-gradient", angle, stopsOrHints);
}



/**
 * Returns an ImageProxy function representing the `repeating-linear-gradient()` CSS function.
 */
export function repeatingLinearGradient( angle?: LinearGradAngle,
    ...stopsOrHints: GradientStopOrHint[]): ImageProxy
{
    return () => linearGradientToString( "repeating-linear-gradient", angle, stopsOrHints);
}



/**
 * Returns an ImageProxy function representing the `radial-gradient()` CSS function.
 */
export function radialGradient( shape?: RadialGradientShape,
    extent?: ExtentKeyword, pos?: CssPosition,
    ...stopsOrHints: GradientStopOrHint[]): ImageProxy
{
    return () => radialGradientToString( "radial-gradient", shape, extent, pos, stopsOrHints);
}



/**
 * Returns an ImageProxy function representing the `repeating-radial-gradient()` CSS function.
 */
export function repeatingRadialGradient( shape?: RadialGradientShape,
    extent?: ExtentKeyword, pos?: CssPosition,
    ...stopsOrHints: GradientStopOrHint[]): ImageProxy
{
    return () => radialGradientToString( "repeating-radial-gradient", shape, extent, pos, stopsOrHints);
}



/**
 * Returns an ImageProxy function representing the`conic-gradient()`  CSS function.
 */
export function conicGradient( angle?: Extended<CssAngle>, pos?: SimpleCssPosition,
    ...stopsOrHints: GradientStopOrHint[]): (img?:"image") => string
{
    return () => conicGradientToString( angle, pos, stopsOrHints);
}



/**
 * Returns an ImageProxy function representing the `cross-fade()` CSS function.
 */
export function crossFade( ...args: CrossFadeParam[]): ImageProxy
{
    return () => crossFadeToString( args);
}



function gradientStopOrHintToString<T extends string>( val: GradientStopOrHint,
    mathClass: INumberMathClass<T>): string
{
    return valueToString( val, {
        fromNumber: colorToString,
        fromArray: v => v.length === 0 ? "" : v.length === 1 ? mathClass.styleToString( v[0]) :
                        gradientColorAndLengthToString( v as GradientColorAndLength, mathClass)
    });
}



function gradientColorAndLengthToString<T extends string>( val: GradientColorAndLength,
    mathClass: INumberMathClass<T>): string
{
    let secondStop = val.length > 2 ? mathClass.styleToString( val[2]) : "";
    return `${colorToString(val[0])} ${mathClass.styleToString( val[1])} ${secondStop}`;
}



function linearGradientToString( name: string, angle: LinearGradAngle,
    stopsOrHints: GradientStopOrHint[]): string
{
    let angleString = angle ? CssAngleMath.styleToString( angle) + "," : "";
    let buf = stopsOrHints.map( stopOrHint => gradientStopOrHintToString( stopOrHint, CssPercentMath));
    return `${name}(${angleString}${buf.join(",")})`;
}



function radialGradientToString( name: string, shape: RadialGradientShape,
    extent: Extended<ExtentKeyword>, pos: CssPosition,
    stopsOrHints: GradientStopOrHint[]): string
{
    let shapeString = shape ? shape : "";
    let extentString = extent ? extent : "";
    let posString = pos ? `at ${positionToString( pos)}` : "";
    let whatAndWhere = shape || extentString || pos ? `${shapeString} ${extentString} ${posString},` : "";
    let buf = stopsOrHints.map( stopOrHint => gradientStopOrHintToString( stopOrHint, CssPercentMath));
    return `${name}(${whatAndWhere}${buf.join(",")})`;
}



function conicGradientToString( angle: Extended<CssAngle>, pos: SimpleCssPosition,
    stopsOrHints: GradientStopOrHint[]): string
{
    let angleString = angle ? `from ${CssAngleMath.styleToString( angle)}` : "";
    let posString = pos ? `at ${positionToString( pos)}` : "";
    let whatAndWhere = angle || pos ? `${angleString} ${posString},` : "";
    let buf = stopsOrHints.map( stopOrHint => gradientStopOrHintToString( stopOrHint, CssAngleMath));
    return `conic-gradient(${whatAndWhere}${buf.join(",")})`;
}



function crossFadeParamToString( val: CrossFadeParam): string
{
    return valueToString( val, {
        fromArray: v => `${valueToString(v[0])},${CssPercentMath.styleToString(v[1])}`
    });
}



function crossFadeToString( args: CrossFadeParam[]): string
{
    let paramsString = valueToString( args, {
        arrayItemFunc: crossFadeParamToString,
        arraySeparator: ","
    })

    return `cross-fade(${paramsString})`;
}



