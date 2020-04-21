import {Extended, CssLength, FilterProxy, CssPercent, CssAngle} from "../styles/UtilTypes"
import {CssColor} from "../styles/ColorTypes";
import {CssLengthMath, CssPercentMath} from "../styles/UtilFuncs";
import {singleBoxShadow_fromObject} from "../styles/StyleFuncs";



/**
 * Returns an FilterProxy function representing the `brightness()` CSS function.
 */
function percentFilter( name: string, amount: Extended<CssPercent>): FilterProxy
{
    return () => `${name}(${CssPercentMath.styleToString( amount)})`;
}



/**
 * Returns an FilterProxy function representing the `brightness()` CSS function.
 */
export function brightness( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "brightness", amount);
}



/**
 * Returns an FilterProxy function representing the `contrast()` CSS function.
 */
export function contrast( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "contrast", amount);
}



/**
 * Returns an FilterProxy function representing the `grayscale()` CSS function.
 */
export function grayscale( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "grayscale", amount);
}



/**
 * Returns an FilterProxy function representing the `invert()` CSS function.
 */
export function invert( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "invert", amount);
}



/**
 * Returns an FilterProxy function representing the `opacity()` CSS function.
 */
export function opacity( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "opacity", amount);
}



/**
 * Returns an FilterProxy function representing the `saturate()` CSS function.
 */
export function saturate( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "saturate", amount);
}



/**
 * Returns an FilterProxy function representing the `sepia()` CSS function.
 */
export function sepia( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "sepia", amount);
}



/**
 * Returns an FilterProxy function representing the `blur()` CSS function.
 */
export function blur( radius: Extended<CssLength>): FilterProxy
{
    return () => `blur(${CssLengthMath.styleToString( radius)})`;
}



/**
 * Returns an FilterProxy function representing the `dropShadow()` CSS function.
 * @param x Horizontal offset of the shadow.
 * @param y Vertical offset of the shadow.
 * @param color Color of the shadow.
 * @param blur Value of the shadow's blurring. The default value is 1 pixel.
 * @param spread Value of the shadow's spreading. The default value is 0.
 * @param inset Flag indicating whether the shadow goes inside the shape. The default value is false.
 */
export function dropShadow(
    x: Extended<CssLength>,
    y: Extended<CssLength>,
    color?: Extended<CssColor>,
    blur: Extended<CssLength> = 1,
    spread: Extended<CssLength> = 0): FilterProxy
{
return () => singleBoxShadow_fromObject( { x, y, color, blur, spread});
}



/**
 * Returns an FilterProxy function representing the `hue-rotate()` CSS function.
 */
export function hueRotate( amount: Extended<CssAngle>): FilterProxy
{
    return () => `hue-rotate(${CssPercentMath.styleToString( amount)})`;
}



