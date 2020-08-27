import {Extended, CssPosition, CssAngle, CssLength, CssNumber} from "../styles/UtilTypes"
import {IImageProxy, CssImage, ExtentKeyword} from "../styles/StyleTypes"
import {CssColor} from "../styles/ColorTypes";
import {colorToString} from "../styles/ColorFuncs";
import {val2str, INumberBaseMathClass, CssAngleMath, pos2str, CssPercentMath, CssLengthMath} from "../styles/UtilFuncs";



/**
 * Type representing either color stop or color hint for the `<gradient>` CSS functions. Color
 * stop is represented by either a simple color value or a two-to-three element tuple. In this
 * tuple, the first item is the color value, the second item is the distance/angle of where the
 * color starts and the optional third item is the distance/angle where the color stops.
 *
 * Hint value is expressed as a single-item array that contains a single CSS numeric value.
 * Although hint is a single number, it must be enclosedin an array to distinguish it from color
 * values because any numeric values in the gradient functions are interpreted as colors.
 *
 * For linear and radial gradients numeric values are of type [[CssLength]]; for conic gradients,
 * these are of type [[CssAngle]]. Percents can be used for all types of gradients.
 *
 * **Examples:**
 *
 * ```typescript
 * // linear gradient with 50px hint
 * linearGradient( Colors.red, [50], Colors.blue)
 *
 * // radial gradient with a second color starting at 20%
 * radialGradient( "red", ["blue", "20%"], "yellow")
 *
 * // conic gradient with a second color starting at 0.4turn and stopping at 0.6turn
 * conicGradient( "red", ["blue", 0.4, 0.6], "yellow")
 * ```
 * @typeparam T Type of numeric values used for hints and color stops.
 */
export type GradientStopOrHint<T extends (CssLength | CssAngle)> =
    Extended<CssColor> | [Extended<CssColor>, Extended<T>, Extended<T>?] | [Extended<T>];



/**
 * Type that enumerates possible values of the side-or-corner for the [[linearGradient]] function.
 * These values can be specified in lieu of the angle in the [[ILinearGradient.to|to]] method of
 * the [[ILinearGradient]] interface.
 *
 * **Examples:**
 *
 * ```typescript
 * linearGradient( Colors.red, Colors.blue).to( "bottom right")
 * ```
 */
export type LinearGradSideOrCorner = "bottom" | "left" | "top" | "right" |
    "top left" | "top right" | "bottom right" | "bottom left" |
    "left top" | "right top" | "left bottom" | "right bottom";

/**
 * Type that represents the angle of the [[linearGradient]] CSS function. These values can be
 * specified in lieu of the angle in the [[ILinearGradient.to|to]] method of the
 * [[ILinearGradient]] interface.
 *
 * **Examples:**
 *
 * ```typescript
 * // linear gradient directed at the bottom corner of the element
 * linearGradient( Colors.red, Colors.blue).to( "bottom right")
 *
 * // linear gradient at 45deg angle
 * linearGradient( Colors.red, Colors.blue).to( 45)
 * ```
 */
export type LinearGradAngle = Extended<CssAngle> | LinearGradSideOrCorner;



/**
 * The ILinearGradient interface represents a function that produces either `linear-gradient` or
 * `repeating-linear-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `to` method that can be called to
 * specify the angle of the gradiant.
 */
export interface ILinearGradient extends IImageProxy
{
	to( angle: LinearGradAngle): IImageProxy;
}

/**
 * Function returning the ILinearGradient interface representing the `linear-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: linearGradient( "red", "blue")
 *
 * backgroundImage: linearGradient( "red", "blue").to( 45)
 * ```
 */
export function linearGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): ILinearGradient
{
	return linearGradientFunc( "linear-gradient", stopsOrHints);
}

/**
 * Function returning the ILinearGradient interface representing the `repeating-linear-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: linearGradient( "red", "blue")
 *
 * backgroundImage: linearGradient( "red", "blue").to( 45)
 * ```
 */
export function repeatingLinearGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): ILinearGradient
{
	return linearGradientFunc( "repeating-linear-gradient", stopsOrHints);
}

/**
 * Function returning the ILinearGradient interface for either `linear-gradient` or
 * `repeating-linear-gradient` CSS functions.
 */
function linearGradientFunc( name: string, stopsOrHints: GradientStopOrHint<CssLength>[]): ILinearGradient
{
    let f: any = () => {
        let angleString = "";
        if (f.angle)
        {
            angleString = val2str( f.angle, {
                fromNumber: CssAngleMath.convertFunc,
                fromString: v => /\d+.*/.test(v) ? v : "to " + v
            }) + ",";
        }

        return `${name}(${angleString}${gradientStopsOrHintsToString( stopsOrHints, CssPercentMath)})`;
    }

	f.to = (angle: LinearGradAngle) => {
        f.angle = angle;
        return f;
    }

	return f;
}



/**
 * The IRadialGradient interface represents a function that produces either `radial-gradient` or
 * `repeating-radial-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `circle`, `ellipse`, `extent` and `at`
 * methods that can be called to specify parameters of the gradiant.
 */
export interface IRadialGradient extends IImageProxy
{
	circle( sizeOrExtent?: Extended<CssLength> | Extended<ExtentKeyword>): IRadialGradient;
	ellipse( sizeOrExtent?: [Extended<CssLength>, Extended<CssLength>] | Extended<ExtentKeyword>): IRadialGradient;
	extent( extent: Extended<ExtentKeyword>): IRadialGradient;
	at( pos: Extended<CssPosition>): IRadialGradient;
}

/**
 * Function returning the IRadialGradient interface representing the `radial-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: radialGradient( "red", "blue")
 *
 * backgroundImage: radialGradient( "red", "blue").circle( "30%").at( ["center", "65%"])
 *
 * backgroundImage: radialGradient( "red", "blue").ellipse( "closest-side")
 * ```
 */
export function radialGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): IRadialGradient
{
	return radialGradientFunc( "radial-gradient", stopsOrHints);
}

/**
 * Function returning the IRadialGradient interface representing the `radial-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: repeatinGradialGradient( "red", "blue")
 *
 * backgroundImage: repeatinGradialGradient( "red", "blue").circle( "30%").at( ["center", "65%"])
 *
 * backgroundImage: repeatinGradialGradient( "red", "blue").ellipse( "closest-side")
 * ```
 */
export function repeatingGradialGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): IRadialGradient
{
	return radialGradientFunc( "repeating-radial-gradient", stopsOrHints);
}

/**
 * Function returning the IRadialGradient interface for either `radial-gradient` or
 * `repeating-radial-gradient` CSS functions.
 */
function radialGradientFunc( name: string, stopsOrHints: GradientStopOrHint<CssLength>[]): IRadialGradient
{
    let f: any = () =>
    {
        let shapeString = f.shape ? f.shape : "";
        let sizeOrExtentString = f.sizeOrExtent ? CssLengthMath.multiStyleToString( f.sizeOrExtent, " ") : "";
        let posString = f.pos ? `at ${pos2str( f.pos)}` : "";
        let whatAndWhere = f.shape || sizeOrExtentString || f.pos ? `${shapeString} ${sizeOrExtentString} ${posString},` : "";
        return `${name}(${whatAndWhere}${gradientStopsOrHintsToString( stopsOrHints, CssPercentMath)})`;
    }

    f.circle = (sizeOrExtent?: Extended<CssLength> | Extended<ExtentKeyword>) => {
        f.shape = "circle";
        f.sizeOrExtent = sizeOrExtent;
        return f;
    }

	f.ellipse = (sizeOrExtent?: [Extended<CssLength>, Extended<CssLength>] | Extended<ExtentKeyword>) => {
        f.shape = "ellipse";
        f.sizeOrExtent = sizeOrExtent;
        return f;
    }

	f.extent = (extent: Extended<ExtentKeyword>) => { f.sizeOrExtent = extent; return f; }

	f.at = (pos: Extended<CssPosition>) => { f.pos = pos; return f; }

	return f;
}



/**
 * The IConicGradient interface represents a function that produces either `conic-gradient` or
 * `repeating-conic-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `from` and `at` methods that can be
 * called to specify the parameters of the gradiant.
 */
export interface IConicGradient extends IImageProxy
{
	from( angle: Extended<CssAngle>): IConicGradient;
	at( pos: Extended<CssPosition>): IConicGradient;
}

/**
 * Function returning the IConicGradient interface representing the `radial-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: conicGradient( "red", "blue")
 *
 * backgroundImage: conicGradient( "red", "blue").from( 0.25).at( ["center", "65%"])
 * ```
 */
export function conicGradient(...stopsOrHints: GradientStopOrHint<CssAngle>[]): IConicGradient
{
	return conicGradientFunc( "conic-gradient", stopsOrHints);
}

/**
 * Function returning the IConicGradient interface representing the `radial-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: repeatingConicGradient( "red", "blue")
 *
 * backgroundImage: repeatingConicGradient( "red", "blue").from( 0.25).at( ["center", "65%"])
 * ```
 */
export function repeatingConicGradient(...stopsOrHints: GradientStopOrHint<CssAngle>[]): IConicGradient
{
	return conicGradientFunc( "repeating-conic-gradient", stopsOrHints);
}

/**
 * Function returning the IConicGradient interface for either `conic-gradient` or
 * `repeating-conic-gradient` CSS functions.
 */
function conicGradientFunc( name: string, stopsOrHints: GradientStopOrHint<CssAngle>[]): IConicGradient
{
    let f: any = () =>
    {
        let angleString = f.angle ? `from ${CssAngleMath.styleToString( f.angle)}` : "";
        let posString = f.pos ? `at ${pos2str( f.pos)}` : "";
        let whatAndWhere = f.angle || f.pos ? `${angleString} ${posString},` : "";
        return `${name}(${whatAndWhere}${gradientStopsOrHintsToString( stopsOrHints, CssAngleMath)})`;
    }
        // () => conicGradientToString( name, stopsOrHints, f.angleParam, f.posParam);

	f.from = (angle: LinearGradAngle) => { f.angle = angle; return f; }

	f.at = (pos: Extended<CssPosition>) => { f.pos = pos; return f; }

	return f;
}



function gradientStopsOrHintsToString( val: GradientStopOrHint<any>[],
    mathClass: INumberBaseMathClass): string
{
    return val.map( v => gradientStopOrHintToString( v, mathClass)).join(",");
}



function gradientStopOrHintToString( val: GradientStopOrHint<any>, mathClass: INumberBaseMathClass): string
{
    return val2str( val, {
        fromNumber: colorToString,
        fromArray: v => {
            if (v.length === 0)
                return "";
            else if (v.length === 1)
                return mathClass.styleToString( v[0]);
            else
            {
                let secondStop = v.length > 2 ? mathClass.styleToString( v[2]) : "";
                return `${colorToString(v[0])} ${mathClass.styleToString( v[1])} ${secondStop}`;
            }
        }
    });
}



/**
 * Type representing parameters for the [[crossFade]] function.
 */
export type CrossFadeParam = Extended<CssImage> | [Extended<CssImage>, Extended<CssNumber>];



/**
 * Returns an ImageProxy function representing the `cross-fade()` CSS function.
 */
export function crossFade( ...args: CrossFadeParam[]): IImageProxy
{
    return () => crossFadeToString( args);
}

function crossFadeToString( args: CrossFadeParam[]): string
{
    let paramsString = val2str( args, {
        arrItemFunc: crossFadeParamToString,
        arrSep: ","
    })

    return `cross-fade(${paramsString})`;
}

function crossFadeParamToString( val: CrossFadeParam): string
{
    return val2str( val, {
        fromArray: v => `${val2str(v[0])},${CssPercentMath.styleToString(v[1])}`
    });
}



