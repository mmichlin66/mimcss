/**
 * This module contains types used to define CSS `<image>` type and related functions.
 */

import {IValueProxy, IUrlProxy, Extended, CssNumber} from "./UtilTypes"
import {CssColor} from "./ColorTypes";


/**
 * The IImageProxy interface represents an invocation of one of CSS functions that are used for
 * secifying images. This interface is returned from functions like: linearGradient(), paint(),
 * element(), etc.
 */
export interface IImageProxy extends IValueProxy
{
    /** Flag indicating that this object implements the IImageProxy interface */
    readonly isImageProxy: boolean;
}



/**
 * The CssImage type represents a type used for CSS properties that accept the `<image>` type.
 */
export type CssImage = string | IUrlProxy | IImageProxy;



/**
 * Color hint for the `gradient` CSS functions is expressed as a single-item array that
 * contains a CSS numeric value.
 */
export type GradientHint = [Extended<CssNumber>];

/**
 * Represents a color stop with indication of length for the `gradient` CSS functions. The first
 * item is the color value, the second item is the position of where the color starts and the
 * optional third item is the position where the color stops.
 */
export type GradientColorAndLength = [Extended<CssColor>, Extended<CssNumber>, Extended<CssNumber>?];

/**
 * Color stop for the `gradient` CSS functions is expressed as either a single color value
 * or an array of two or three items. In the latter case, the first item is the color value, the
 * second item is the position of where the color starts and the optional third item is the
 * position where the color stops.
 */
export type GradientStop = Extended<CssColor> | GradientColorAndLength;



/**
 * Type that enumerates possible values of the side-or-corner for the `linear-gradient()` CSS function.
 */
export type LinearGradSideOrCorner = Extended<"to bottom" | "to left" | "to top" | "to right" |
    "to top left" | "to top right" | "to bottom right" | "to bottom left">;

/**
 * Type that represents the angle of the `linear-gradient()` CSS function.
 */
export type LinearGradAngle = Extended<CssNumber> | LinearGradSideOrCorner;



/**
 * Type representing either color stop or color hint.
 */
export type GradientStopOrHint = GradientStop | GradientHint;



/**
 * Type representing shape for the `radial-gradient()` CSS function.
 */
export type RadialGradientShape = Extended<"circle" | "ellipse">;

/**
 * Type representing extent for the `radial-gradient()` CSS function.
 */
export type RadialGradientExtent = Extended<"closest-corner" | "closest-side" | "farthest-corner" | "farthest-side">;



