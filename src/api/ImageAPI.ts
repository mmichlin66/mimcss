import {Extended, CssPosition, CssAngle, CssLength} from "../styles/UtilTypes"
import {
    GradientStopOrHint, GradientColorAndLength, LinearGradAngle, CrossFadeParam, IImageProxy
} from "../styles/ImageTypes"
import {colorToString} from "../styles/ColorFuncs";
import {val2str, INumberBaseMathClass, CssAngleMath, pos2str, CssPercentMath, CssLengthMath} from "../styles/UtilFuncs";
import { ExtentKeyword } from "../styles/StyleTypes";



// /**
//  * The Gradient class implements the IGradient interface using property get accessor, whcih allows
//  * createing a new instance of the approprient gradient interface. We need new instances, because
//  * the functions implementing these callable interfaces keep optional parameters as properties of
//  * the fucntion objects themselves.
//  */
// class Gradient implements IGradient
// {
//     // public get linear(): ILinearGradient { return linearGradientFunc( "linear-gradient"); }
//     // public get repeatingLinear(): ILinearGradient { return linearGradientFunc( "repeating-linear-gradient"); }
//     // public get radial(): IRadialGradient { return radialGradientFunc( "radial-gradient"); }
//     // public get repeatingRadial(): IRadialGradient { return radialGradientFunc( "repeating-radial-gradient"); }
//     public get conic(): IConicGradient { return conicGradientFunc( "conic-gradient"); }
//     public get repeatingConic(): IConicGradient { return conicGradientFunc( "repeating-conic-gradient"); }
// }



// /**
//  * The gradient variable provides access to functions implementing the `<gradient>` CSS functions.
//  */
// export let gradient: IGradient = new Gradient();



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
export function linearGradient(...stopsOrHints: GradientStopOrHint[]): ILinearGradient
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
export function repeatingLinearGradient(...stopsOrHints: GradientStopOrHint[]): ILinearGradient
{
	return linearGradientFunc( "repeating-linear-gradient", stopsOrHints);
}

/**
 * Function returning the ILinearGradient interface for either `linear-gradient` or
 * `repeating-linear-gradient` CSS functions.
 */
function linearGradientFunc( name: string, stopsOrHints: GradientStopOrHint[]): ILinearGradient
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
export function radialGradient(...stopsOrHints: GradientStopOrHint[]): IRadialGradient
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
export function repeatingGradialGradient(...stopsOrHints: GradientStopOrHint[]): IRadialGradient
{
	return radialGradientFunc( "repeating-radial-gradient", stopsOrHints);
}

/**
 * Function returning the IRadialGradient interface for either `radial-gradient` or
 * `repeating-radial-gradient` CSS functions.
 */
function radialGradientFunc( name: string, stopsOrHints: GradientStopOrHint[]): IRadialGradient
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
export function conicGradient(...stopsOrHints: GradientStopOrHint[]): IConicGradient
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
export function repeatingConicGradient(...stopsOrHints: GradientStopOrHint[]): IConicGradient
{
	return conicGradientFunc( "repeating-conic-gradient", stopsOrHints);
}

/**
 * Function returning the IConicGradient interface for either `conic-gradient` or
 * `repeating-conic-gradient` CSS functions.
 */
function conicGradientFunc( name: string, stopsOrHints: GradientStopOrHint[]): IConicGradient
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



// function conicGradientToString( name: string, stopsOrHints: GradientStopOrHint[],
//     angle?: Extended<CssAngle>, pos?: Extended<CssPosition>): string
// {
//     let angleString = angle ? `from ${CssAngleMath.styleToString( angle)}` : "";
//     let posString = pos ? `at ${pos2str( pos)}` : "";
//     let whatAndWhere = angle || pos ? `${angleString} ${posString},` : "";
//     return `${name}(${whatAndWhere}${gradientStopsOrHintsToString( stopsOrHints, CssAngleMath)})`;
// }



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



