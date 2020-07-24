import {Extended, CssPosition, CssAngle, CssLength} from "../styles/UtilTypes"
import {
    GradientStopOrHint, GradientColorAndLength, LinearGradAngle,
    CrossFadeParam, IImageProxy, RadialGradientShape, RadialGradientSize, 
    IGradient, ILinearGradient, IRadialGradient, IConicGradient
} from "../styles/ImageTypes"
import {colorToString} from "../styles/ColorFuncs";
import {val2str, INumberBaseMathClass, CssAngleMath, pos2str, CssPercentMath, CssLengthMath} from "../styles/UtilFuncs";
import { ExtentKeyword } from "../styles/StyleTypes";



/**
 * The Gradient class implements the IGradient interface using property get accessor, whcih allows
 * createing a new instance of the approprient gradient interface. We need new instances, because
 * the functions implementing these callable interfaces keep optional parameters as properties of
 * the fucntion objects themselves.
 */
class Gradient implements IGradient
{
    public get linear(): ILinearGradient { return linearGradientFunc( "linear-gradient"); }
    public get repeatingLinear(): ILinearGradient { return linearGradientFunc( "repeating-linear-gradient"); }
    public get radial(): IRadialGradient { return radialGradientFunc( "radial-gradient"); }
    public get repeatingRadial(): IRadialGradient { return radialGradientFunc( "repeating-radial-gradient"); }
    public get conic(): IConicGradient { return conicGradientFunc( "conic-gradient"); }
    public get repeatingConic(): IConicGradient { return conicGradientFunc( "repeating-conic-gradient"); }
}



/**
 * The gradient variable provides access to functions implementing the `<gradient>` CSS functions.
 */
export let gradient: IGradient = new Gradient();



/**
 * Returns an ImageProxy function representing the `cross-fade()` CSS function.
 */
export function crossFade( ...args: CrossFadeParam[]): IImageProxy
{
    return () => crossFadeToString( args);
}



/**
 * Function returning the ILinearGradient interface for either `liner-gradient` or
 * `repeating-liner-gradient` CSS functions.
 */
function linearGradientFunc( name: string): ILinearGradient
{
    let f: any = (...stopsOrHints: GradientStopOrHint[]): IImageProxy =>
        () => linearGradientToString( name, stopsOrHints, f.angleParam);

	f.to = (angle: LinearGradAngle) => {
        f.angleParam = angle;
        return f;
    }
    
	return f;
}



/**
 * Function returning the IRadialGradient interface for either `radial-gradient` or
 * `repeating-radial-gradient` CSS functions.
 */
function radialGradientFunc( name: string): IRadialGradient
{
    let f: any = (...stopsOrHints: GradientStopOrHint[]): IImageProxy =>
        () => radialGradientToString( name, stopsOrHints, f.shapeParam, f.sizeParam, f.posParam);

    f.circle = (sizeOrExtent?: Extended<CssLength> | Extended<ExtentKeyword>) => {
        f.shapeParam = "circle";
        f.sizeParam = sizeOrExtent;
        return f;
    }

	f.ellipse = (sizeOrExtent?: [Extended<CssLength>, Extended<CssLength>] | Extended<ExtentKeyword>) => {
        f.shapeParam = "ellipse";
        f.sizeParam = sizeOrExtent;
        return f;
    }

	f.extent = (extent: Extended<ExtentKeyword>) => {
        f.sizeParam = extent;
        return f;
    }

	f.at = (pos: Extended<CssPosition>) => {
        f.posParam = pos; return f;
    }

	return f;
}



/**
 * Function returning the IConicGradient interface for either `conic-gradient` or
 * `repeating-conic-gradient` CSS functions.
 */
function conicGradientFunc( name: string): IConicGradient
{
    let f: any = (...stopsOrHints: GradientStopOrHint[]): IImageProxy =>
        () => conicGradientToString( name, stopsOrHints, f.angleParam, f.posParam);

	f.from = (angle: LinearGradAngle) => {
        f.angleParam = angle;
        return f;
    }

	f.at = (pos: Extended<CssPosition>) => {
        f.posParam = pos;
        return f;
    }

	return f;
}



function linearGradientToString( name: string, stopsOrHints: GradientStopOrHint[],
    angle?: LinearGradAngle): string
{
    let angleString = "";
    if (angle)
    {
        angleString = val2str( angle, {
            fromNumber: CssAngleMath.convertFunc,
            fromString: v => /\d+.*/.test(v) ? v : "to " + v
        }) + ",";
    }

    return `${name}(${angleString}${gradientStopsOrHintsToString( stopsOrHints, CssPercentMath)})`;
}



function radialGradientToString( name: string, stopsOrHints: GradientStopOrHint[],
    shape: RadialGradientShape, sizeOrExtent: RadialGradientSize | Extended<ExtentKeyword>,
    pos: CssPosition): string
{
    let shapeString = shape ? shape : "";
    let sizeOrExtentString = sizeOrExtent ? CssLengthMath.multiStyleToString( sizeOrExtent, " ") : "";
    let posString = pos ? `at ${pos2str( pos)}` : "";
    let whatAndWhere = shape || sizeOrExtentString || pos ? `${shapeString} ${sizeOrExtentString} ${posString},` : "";
    return `${name}(${whatAndWhere}${gradientStopsOrHintsToString( stopsOrHints, CssPercentMath)})`;
}



function conicGradientToString( name: string, stopsOrHints: GradientStopOrHint[],
    angle?: Extended<CssAngle>, pos?: Extended<CssPosition>): string
{
    let angleString = angle ? `from ${CssAngleMath.styleToString( angle)}` : "";
    let posString = pos ? `at ${pos2str( pos)}` : "";
    let whatAndWhere = angle || pos ? `${angleString} ${posString},` : "";
    return `${name}(${whatAndWhere}${gradientStopsOrHintsToString( stopsOrHints, CssAngleMath)})`;
}



function crossFadeToString( args: CrossFadeParam[]): string
{
    let paramsString = val2str( args, {
        arrFunc: crossFadeParamToString,
        arrSep: ","
    })

    return `cross-fade(${paramsString})`;
}



function gradientStopsOrHintsToString<T extends string>( val: GradientStopOrHint[],
    mathClass: INumberBaseMathClass<T>): string
{
    return val.map( v => gradientStopOrHintToString( v, mathClass)).join(",");
}



function gradientStopOrHintToString<T extends string>( val: GradientStopOrHint,
    mathClass: INumberBaseMathClass<T>): string
{
    return val2str( val, {
        fromNumber: colorToString,
        fromArray: v => v.length === 0 ? "" : v.length === 1 ? mathClass.styleToString( v[0]) :
                        gradientColorAndLengthToString( v as GradientColorAndLength, mathClass)
    });
}



function gradientColorAndLengthToString<T extends string>( val: GradientColorAndLength,
    mathClass: INumberBaseMathClass<T>): string
{
    let secondStop = val.length > 2 ? mathClass.styleToString( val[2]) : "";
    return `${colorToString(val[0])} ${mathClass.styleToString( val[1])} ${secondStop}`;
}



function crossFadeParamToString( val: CrossFadeParam): string
{
    return val2str( val, {
        fromArray: v => `${val2str(v[0])},${CssPercentMath.styleToString(v[1])}`
    });
}



