/**
 * This module contains types used to define CSS `<image>` type and related functions.
 */

import {UrlProxy, Extended, CssNumber, CssAngle, NumberBase, CssLength, SimpleCssPosition, CssPosition} from "./UtilTypes"
import {CssColor} from "./ColorTypes";
import { ExtentKeyword } from "./StyleTypes";


/**
 * The ImageProxy type represents an invocation of one of CSS functions that are used for
 * secifying images. This interface is returned from functions like: linearGradient(), paint(),
 * element(), etc.
 */
export type ImageProxy = (img?:"image") => string;



/**
 * The CssImage type represents a type used for CSS properties that accept the `<image>` type.
 */
export type CssImage = UrlProxy | ImageProxy;



/**
 * Value of a hint for the `<gradient>` CSS functions is expressed as a CSS numeric value.
 */
export type GradientHintValue = Extended<NumberBase<any>>;

/**
 * Color hint for the `<gradient>` CSS functions is expressed as a single-item array that
 * contains a CSS numeric value.
 */
export type GradientHint = [GradientHintValue];

/**
 * Represents a color stop with indication of length for the `<gradient>` CSS functions. The first
 * item is the color value, the second item is the position of where the color starts and the
 * optional third item is the position where the color stops.
 */
export type GradientColorAndLength = [Extended<CssColor>, GradientHintValue, GradientHintValue?];

/**
 * Color stop for the `<gradient>` CSS functions is expressed as either a single color value
 * or an array of two or three items. In the latter case, the first item is the color value, the
 * second item is the position of where the color starts and the optional third item is the
 * position where the color stops.
 */
export type GradientStop = Extended<CssColor> | GradientColorAndLength;

/**
 * Type representing either color stop or color hint for the `<gradient>` CSS functions.
 */
export type GradientStopOrHint = GradientStop | GradientHint;



/**
 * Type that enumerates possible values of the side-or-corner for the `linear-gradient()` CSS function.
 */
export type LinearGradSideOrCorner = "bottom" | "left" | "top" | "right" |
    "top left" | "top right" | "bottom right" | "bottom left" |
    "left top" | "right top" | "left bottom" | "right bottom";

/**
 * Type that represents the angle of the `linear-gradient()` CSS function.
 */
export type LinearGradAngle = Extended<CssAngle> | LinearGradSideOrCorner;



/**
 * Type representing shape for the `radial-gradient()` CSS function.
 */
export type RadialGradientShape = "circle" | "ellipse";

/**
 * Type representing size for the `radial-gradient()` CSS function. It is a single Length value
 * for circle and two-element tuple of CssLength values for ellipse.
 */
export type RadialGradientSize = Extended<CssLength> | [Extended<CssLength>, Extended<CssLength>];



/**
 * Type representing parameters for the `cross-fade()` CSS function.
 */
export type CrossFadeParam = Extended<CssImage> | [Extended<CssImage>, Extended<CssNumber>];



/**
 * The IGradient interface represents properties that return interfaces representing `<gradient>`
 * CSS functions.
 */
export interface IGradient
{
    readonly linear: ILinearGradient;
    readonly repeatingLinear: ILinearGradient;
    readonly radial: IRadialGradient;
    readonly repeatingRadial: IRadialGradient;
    readonly conic: IConicGradient;
    readonly repeatingConic: IConicGradient;
}



/**
 * The ILinearGradient interface represents a function that produces either `liner-gradient` or
 * `repeating-liner-gradient` CSS function. The interface allows specifying an angle parameter
 * before invocation that accepts a list of color stops and hints.
 */
export interface ILinearGradient
{
    (...stopsOrHints: GradientStopOrHint[]): ImageProxy;
	to( angle: LinearGradAngle): ILinearGradient;
}



/**
 * The IRadialGradient interface represents a function that produces either `radial-gradient` or
 * `repeating-radial-gradient` CSS function. The interface allows specifying the shape, size and
 * extent parameters before invocation that accepts a list of color stops and hints.
 */
export interface IRadialGradient
{
    (...stopsOrHints: GradientStopOrHint[]): ImageProxy;
	circle( sizeOrExtent?: Extended<CssLength> | Extended<ExtentKeyword>): IRadialGradient;
	ellipse( sizeOrExtent?: [Extended<CssLength>, Extended<CssLength>] | Extended<ExtentKeyword>): IRadialGradient;
	extent( extent: Extended<ExtentKeyword>): IRadialGradient;
	at( pos: Extended<CssPosition>): IRadialGradient;
}



/**
 * The IConicGradient interface represents a function that produces either `conic-gradient` or
 * `repeating-conic-gradient` CSS function. The interface allows specifying the `from` and
 * `position` parameters before invocation that accepts a list of color stops and hints.
 */
export interface IConicGradient
{
    (...stopsOrHints: GradientStopOrHint[]): ImageProxy;
	from( angle: Extended<CssAngle>): IConicGradient;
	at( pos: Extended<SimpleCssPosition>): IConicGradient;
}



