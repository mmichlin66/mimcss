import {
    GradientStopOrHint, GradientColorAndLength, LinearGradAngle, RadialGradientShape,
    RadialGradientExtent, ImageProxy, CrossFadeParam, CssImage
} from "./ImageTypes"
import {colorToString} from "./ColorFuncs";
import {CssPosition, Extended, SimpleCssPosition, CssAngle} from "./UtilTypes";
import {valueToString, INumberMathClass, CssAngleMath, positionToString, CssPercentMath} from "./UtilFuncs";



function gradientStopOrHintToString( val: GradientStopOrHint, mathClass: INumberMathClass): string
{
    return valueToString( val, {
        fromNumber: colorToString,
        fromArray: v => v.length === 0 ? "" : v.length === 1 ? mathClass.styleToString( v[0]) :
                        gradientColorAndLengthToString( v as GradientColorAndLength, mathClass)
    });
}



function gradientColorAndLengthToString( val: GradientColorAndLength,
    mathClass: INumberMathClass): string
{
    let secondStop = val.length > 2 ? mathClass.styleToString( val[1]) : "";
    return `${colorToString(val[0])} ${mathClass.styleToString( val[1])} ${secondStop}`;
}



export function linearGradientToString( name: string, angle: LinearGradAngle,
    stopsOrHints: GradientStopOrHint[]): string
{
    let angleString = angle ? CssAngleMath.styleToString( angle) + "," : "";
    let buf = stopsOrHints.map( stopOrHint => gradientStopOrHintToString( stopOrHint, CssPercentMath));
    return `${name}(${angleString}${buf.join(",")})`;
}



export function radialGradientToString( name: string, shape: RadialGradientShape,
    extent: RadialGradientExtent, pos: CssPosition,
    stopsOrHints: GradientStopOrHint[]): string
{
    let shapeString = shape ? shape : "";
    let extentString = extent ? extent : "";
    let posString = pos ? `at ${positionToString( pos)}` : "";
    let whatAndWhere = shape || extentString || pos ? `${shapeString} ${extentString} ${posString},` : "";
    let buf = stopsOrHints.map( stopOrHint => gradientStopOrHintToString( stopOrHint, CssPercentMath));
    return `${name}(${whatAndWhere}${buf.join(",")})`;
}



export function conicGradientToString( angle: Extended<CssAngle>, pos: SimpleCssPosition,
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



export function crossFadeToString( args: CrossFadeParam[]): string
{
    let paramsString = valueToString( args, {
        arrayItemFunc: crossFadeParamToString,
        arraySeparator: ","
    })

    return `cross-fade(${paramsString})`;
}



