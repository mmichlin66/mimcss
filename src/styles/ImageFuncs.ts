import * as types from "./ImageTypes"
import {AngleMath, PercentMath, valueToString, positionToString} from "./UtilFuncs";
import {colorToString} from "./ColorFuncs";
import { CssPosition } from "./UtilTypes";



function gradientStopOrHintToString( val: types.GradientStopOrHint): string
{
    return valueToString( val, {
        fromNumber: colorToString,
        fromArray: v => v.length === 0 ? "" : v.length === 1 ? PercentMath.styleToString( v[0]) :
        gradientColorAndLengthToString( v as types.GradientColorAndLength)
    });
}



function gradientColorAndLengthToString( val: types.GradientColorAndLength): string
{
    let secondStop = val.length > 2 ? PercentMath.styleToString( val[1]) : "";
    return `${colorToString(val[0])} ${PercentMath.styleToString( val[1])} ${secondStop}`;
}



function linearGradientToString( name: string, angle: types.LinearGradAngle,
    stopsOrHints: types.GradientStopOrHint[]): string
{
    let angleString = angle ? AngleMath.styleToString( angle) + "," : "";
    let buf = stopsOrHints.map( stopOrHint => gradientStopOrHintToString( stopOrHint));
    return `${name}(${angleString}${buf.join(",")})`;
}



function radialGradientToString( name: string, shape: types.RadialGradientShape,
    extent: types.RadialGradientExtent, pos: CssPosition,
    stopsOrHints: types.GradientStopOrHint[]): string
{
    let shapeString = shape ? shape : "";
    let extentString = extent ? extent : "";
    let posString = pos ? positionToString( pos) : "";
    let whatAndWhere = shape || extentString || pos ? `${shapeString} ${extentString} at ${posString},` : "";
    let buf = stopsOrHints.map( stopOrHint => gradientStopOrHintToString( stopOrHint));
    return `${name}(${whatAndWhere}${buf.join(",")})`;
}



/**
 * The GradientProxy class is a base for IImageProxy-implemented classes that encapsulates
 * parameters common for linear and radial gradients.
 */
export abstract class GradientProxy implements types.IImageProxy
{
    /** Flag indicating that this object implements the IImageProxy interface */
    public get isImageProxy(): boolean { return true; }

    constructor( protected name: string, protected stopsOrHints: types.GradientStopOrHint[])
    {
        this.name = name;
        this.stopsOrHints = stopsOrHints;
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
    constructor( name: string, private angle: types.LinearGradAngle, stopsOrHints: types.GradientStopOrHint[])
    {
        super( name, stopsOrHints);
        this.angle = angle;
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
    constructor( name: string, private shape: types.RadialGradientShape,
        private extent: types.RadialGradientExtent, private pos: CssPosition,
        stopsOrHints: types.GradientStopOrHint[])
    {
        super( name, stopsOrHints);
        this.shape = shape;
        this.extent = extent;
        this.pos = pos;
    }

    /** Converts internally held value(s) to string */
    public valueToString(): string
    {
        return radialGradientToString( this.name, this.shape, this.extent, this.pos, this.stopsOrHints);
    }
}



