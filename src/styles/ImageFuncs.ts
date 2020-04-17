import {
    GradientStopOrHint, GradientColorAndLength, LinearGradAngle, RadialGradientShape,
    RadialGradientExtent, IImageProxy, CrossFadeParam
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



function linearGradientToString( name: string, angle: LinearGradAngle,
    stopsOrHints: GradientStopOrHint[]): string
{
    let angleString = angle ? CssAngleMath.styleToString( angle) + "," : "";
    let buf = stopsOrHints.map( stopOrHint => gradientStopOrHintToString( stopOrHint, CssPercentMath));
    return `${name}(${angleString}${buf.join(",")})`;
}



function radialGradientToString( name: string, shape: RadialGradientShape,
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



/**
 * The GradientProxy class is a base for IImageProxy-implemented classes that encapsulates
 * parameters common for linear and radial gradients.
 */
export abstract class GradientProxy implements IImageProxy
{
    /** Flag indicating that this object implements the IImageProxy interface */
    public get isImageProxy(): boolean { return true; }

    constructor( protected name: string, protected stopsOrHints: GradientStopOrHint[])
    {
    }

    /** Converts internally held value(s) to string */
    abstract valueToString(): string;
}



/**
 * The LinearGradientProxy class implements the IImageProxy interface by encapsulating parameters
 * of the `linear-gradient()` or `repeating-linear-gradient()` CSS functions.
 */
export class LinearGradientProxy extends GradientProxy
{
    constructor( name: string, private angle: LinearGradAngle, stopsOrHints: GradientStopOrHint[])
    {
        super( name, stopsOrHints);
    }

    /** Converts internally held value(s) to string */
    public valueToString(): string
    {
        return linearGradientToString( this.name, this.angle, this.stopsOrHints);
    }
}



/**
 * The LinearGradientProxy class implements the IImageProxy interface by encapsulating parameters
 * of the `radial-gradient()` or `repeating-radial-gradient()` CSS functions.
 */
export class RadialGradientProxy extends GradientProxy
{
    constructor( name: string, private shape: RadialGradientShape,
        private extent: RadialGradientExtent, private pos: CssPosition,
        stopsOrHints: GradientStopOrHint[])
    {
        super( name, stopsOrHints);
    }

    /** Converts internally held value(s) to string */
    public valueToString(): string
    {
        return radialGradientToString( this.name, this.shape, this.extent, this.pos, this.stopsOrHints);
    }
}



/**
 * The ConicGradientProxy class implements the IImageProxy interface by encapsulating parameters
 * of the `conic-gradient()` CSS function.
 */
export class ConicGradientProxy extends GradientProxy
{
    constructor( private angle: Extended<CssAngle>, private pos: SimpleCssPosition,
        stopsOrHints: GradientStopOrHint[])
    {
        super( "", stopsOrHints);
    }

    /** Converts internally held value(s) to string */
    public valueToString(): string
    {
        return conicGradientToString( this.angle, this.pos, this.stopsOrHints);
    }
}



/**
 * The CrossFadeProxy class implements the IImageProxy interface by encapsulating parameters
 * of the `conic-gradient()` CSS function.
 */
export class CrossFadeProxy implements IImageProxy
{
    /** Flag indicating that this object implements the IImageProxy interface */
    public get isImageProxy(): boolean { return true; }

    constructor( private args: CrossFadeParam[])
    {
    }

    /** Converts internally held value(s) to string */
    public valueToString(): string
    {
        return crossFadeToString( this.args);
    }
}



