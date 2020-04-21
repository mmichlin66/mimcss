import {Extended, CssPosition, SimpleCssPosition, CssAngle} from "../styles/UtilTypes"
import * as ImageTypes from "../styles/ImageTypes"
import * as ImageFuncs from "../styles/ImageFuncs"



/**
 * Returns an ImageProxy function representing the `linear-gradient()` CSS function.
 */
export function linearGradient( angle?: ImageTypes.LinearGradAngle,
    ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.ImageProxy
{
    return () => ImageFuncs.linearGradientToString( "linear-gradient", angle, stopsOrHints);
}



/**
 * Returns an ImageProxy function representing the `repeating-linear-gradient()` CSS function.
 */
export function repeatingLinearGradient( angle?: ImageTypes.LinearGradAngle,
    ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.ImageProxy
{
    return () => ImageFuncs.linearGradientToString( "repeating-linear-gradient", angle, stopsOrHints);
}



/**
 * Returns an ImageProxy function representing the `radial-gradient()` CSS function.
 */
export function radialGradient( shape?: ImageTypes.RadialGradientShape,
    extent?: ImageTypes.RadialGradientExtent, pos?: CssPosition,
    ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.ImageProxy
{
    return () => ImageFuncs.radialGradientToString( "radial-gradient", shape, extent, pos, stopsOrHints);
}



/**
 * Returns an ImageProxy function representing the `repeating-radial-gradient()` CSS function.
 */
export function repeatingRadialGradient( shape?: ImageTypes.RadialGradientShape,
    extent?: ImageTypes.RadialGradientExtent, pos?: CssPosition,
    ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.ImageProxy
{
    return () => ImageFuncs.radialGradientToString( "repeating-radial-gradient", shape, extent, pos, stopsOrHints);
}



/**
 * Returns an ImageProxy function representing the`conic-gradient()`  CSS function.
 */
export function conicGradient( angle?: Extended<CssAngle>, pos?: SimpleCssPosition,
    ...stopsOrHints: ImageTypes.GradientStopOrHint[]): (img?:"image") => string
{
    return () => ImageFuncs.conicGradientToString( angle, pos, stopsOrHints);
}



/**
 * Returns an ImageProxy function representing the `cross-fade()` CSS function.
 */
export function crossFade( ...args: ImageTypes.CrossFadeParam[]): ImageTypes.ImageProxy
{
    return () => ImageFuncs.crossFadeToString( args);
}



