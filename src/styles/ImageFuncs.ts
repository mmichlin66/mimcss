import * as types from "./ImageTypes"
import {Angle, valueToString, Percent, positionToString} from "./UtilFuncs";
import {colorToString} from "./ColorFuncs";
import { CssPosition } from "./UtilTypes";



function gradientStopOrHintToString( val: types.GradientStopOrHint): string
{
    return valueToString( val, {
        fromNumber: colorToString,
        fromArray: v => v.length === 0 ? "" : v.length === 1 ? Percent.styleToString( v[0]) :
        gradientColorAndLengthToString( v as types.GradientColorAndLength)
    });
}



function gradientColorAndLengthToString( val: types.GradientColorAndLength): string
{
    let secondStop = val.length > 2 ? Percent.styleToString( val[1]) : "";
    return `${colorToString(val[0])} ${Percent.styleToString( val[1])} ${secondStop}`;
}



function linearGradientToString( name: string, angle: types.LinearGradAngle,
    stopsOrHints: types.GradientStopOrHint[]): string
{
    let angleString = angle ? Angle.styleToString( angle) + "," : "";
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
 * The LinearGradientProxy class implements the IImageProxy interface by encapsulating parameters of a
 * `linear-gradient()` or `repeating-linear-gradient()` CSS functions.
 */
export abstract class GradientProxy implements types.IImageProxy
{
    /** Flag indicating that this object implements the IImageProxy interface */
    public get isImageProxy(): boolean { return true; }

    constructor( name: string, stopsOrHints: types.GradientStopOrHint[])
    {
        this.name = name;
        this.stopsOrHints = stopsOrHints;
    }

    /** Converts internally held value(s) to string */
    abstract valueToString(): string;

    // CSS function name
    protected name: string;

    // Color stops
    protected stopsOrHints: types.GradientStopOrHint[];
}



/**
 * The LinearGradientProxy class implements the IImageProxy interface by encapsulating parameters of a
 * `linear-gradient()` or `repeating-linear-gradient()` CSS functions.
 */
export class LinearGradientProxy extends GradientProxy
{
    constructor( name: string, angle: types.LinearGradAngle, stopsOrHints: types.GradientStopOrHint[])
    {
        super( name, stopsOrHints);
        this.angle = angle;
    }

    /** Converts internally held value(s) to string */
    public valueToString(): string
    {
        return linearGradientToString( this.name, this.angle, this.stopsOrHints);
    }

    // Gradient angle
    private angle: types.LinearGradAngle;
}



/**
 * The LinearGradientProxy class implements the IImageProxy interface by encapsulating parameters of a
 * `linear-gradient()` or `repeating-linear-gradient()` CSS functions.
 */
export class RadialGradientProxy extends GradientProxy
{
    constructor( name: string, shape: types.RadialGradientShape, extent: types.RadialGradientExtent,
        pos: CssPosition, stopsOrHints: types.GradientStopOrHint[])
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

    // Gradient shape
    private shape: types.RadialGradientShape;

    // Gradient extent
    private extent: types.RadialGradientExtent;

    // Gradient position
    private pos: CssPosition;
}



