import { Extended } from "./CoreTypes";
import { CssAngle, CssPercent } from "./NumericTypes";
import { CssColor, CssColorSeparation, IAlphaFunc, IColorContrastFunc, IColorMixBuilder, IHslFunc, ILabFunc, ILchFunc, INamedColors, IRgbFunc } from "./ColorTypes";
/**
 * Object whose property names are the well-known Web color names while values correspond to the
 * hexadecimal representation of the RGB separations (without an alpha mask). The properties of
 * this object can be used wherever the [[CssColor]] type can be used. Since the properties are
 * of the `number` type, they can be used for manipulating the color value.
*/
export declare const Colors: INamedColors;
/**
 * Registers a new custom color or changes the value of the existing custom color. The name of the
 * custom color should have been already added to the [[INamedColors]] interface using the module
 * augmentation technique. Note that values of standard Web colors cannot be changed.
 *
 * @param name Color name. This name cannot be a name of the standard Web color.
 * @param value Color value to assign to the given named color.
 * @returns Flag indicating whether the operation was successful.
 */
export declare const registerColor: (name: keyof INamedColors, value: number) => boolean;
/**
 * Converts the color specified as red, green, blue separation values and an optional alpha
 * mask to a CSS color representation. Each color separation can be represented as a number with
 * the following meaning:
 *   - Integer number -255 to 255. Numbers beyond this range will be clamped. Negative numbers
 *     will be inverted.
 *   - Floating number -1.0 to 1.0 non-inclusive, which is multiplied by 100 treated as percentage.
 *     Floating numbers beyond this range will be rounded and treated as integer numbers. Negative
 *     numbers will be inverted.
 *
 * The alpha mask can be one of the following:
 *   - Floating number 0 to 1 inclusive.
 *   - Integer or floating number 1 to 100, which is divided by 100. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped.
 *   - The sign of alpha is ignored; that is, only the absolute value is considered.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb()
 *
 * @param r Red separation value.
 * @param g Green separation value.
 * @param b Blue separation value.
 * @param a Optional alpha mask as a percentage value.
 * @return The `IRgbFunc` object representing the invocation of the `rgb()` CSS function
 */
export declare const rgb: (r: Extended<CssColorSeparation>, g: Extended<CssColorSeparation>, b: Extended<CssColorSeparation>, a?: Extended<CssPercent> | undefined) => IRgbFunc;
/**
 * Converts the color specified as hue-saturation-lightness components and an optional alpha
 * mask to a CSS color representation. This method should be used when defining CSS color
 * values in styleset properties.
 *
 * The Hue component is treated as the CSS `<angle>` type. Numbers are considered degrees.
 *
 * The Saturation and Lightness components are treated as percentages:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Floating number 0 to 1 inclusive are multiplied by 100 and treated as percentage.
 *   - Integer or floating number 1 to 100 are treated as percentage. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped to 100.
 *
 * The alpha mask can be one of the following:
 *   - Floating number 0 to 1 inclusive.
 *   - Integer or floating number 1 to 100, which is divided by 100. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped.
 *   - The sign of alpha is ignored; that is, only the absolute value is considered.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl()
 *
 * @param h Hue component as an angle value.
 * @param s Saturation component as a percentage value.
 * @param l Lightness component as a percentage value.
 * @param a Optional alpha mask as a percentage value.
 * @return The `IHslFunc` object representing the invocation of the `hsl()` CSS function
 */
export declare const hsl: (h: Extended<CssAngle>, s: Extended<CssPercent>, l: Extended<CssPercent>, a?: Extended<CssPercent> | undefined) => IHslFunc;
/**
 * Converts the color specified as L\*a\*b\* components and an optional alpha
 * mask to a CSS color representation. This method should be used when defining CSS color
 * values in styleset properties.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab()
 *
 * @param l CIE Lightness component
 * @param da Distance along the a axis in the Lab colorspace
 * @param db Distance along the b axis in the Lab colorspace
 * @param a Optional alpha mask as a percentage value.
 * @returns The `ILabFunc` object representing the invocation of the `lab()` CSS function
 */
export declare const lab: (l: Extended<CssPercent>, da: Extended<number>, db: Extended<number>, a?: Extended<CssPercent> | undefined) => ILabFunc;
/**
 * Converts the color specified as lightness-chroma-hue components and an optional alpha
 * mask to a CSS color representation. This method should be used when defining CSS color
 * values in styleset properties.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch()
 *
 * @param l CIE Lightness component
 * @param c Chroma component
 * @param h Hue component as an angle value.
 * @param a Optional alpha mask as a percentage value.
 * @returns The `ILchFunc` object representing the invocation of the `lch()` CSS function
 */
export declare const lch: (l: Extended<CssPercent>, c: Extended<number>, h: Extended<CssAngle>, a?: Extended<CssPercent> | undefined) => ILchFunc;
/**
 * Implements the `color-contrast()` CSS property.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-contrast()
 *
 * @param c Color to which the list of colors in the `vs` property will be compared
 * @param vs List of colors from which to select the most contrasting to the base color.
 * @returns The `IColorContrastFunc` object representing the invocation of the `color-contrast()`
 * CSS function
 */
export declare const colorContrast: (c: Extended<CssColor>, ...vs: Extended<CssColor>[]) => IColorContrastFunc;
/**
 * Implements the `color-mix()` CSS property.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-nix()
 *
 * **Examples**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefnition
 * {
 *     // color-mix( "blue", "red")
 *     cls1 = this.$class({
 *         color: css.colorMix("blue").with("red");
 *     })
 *
 *     // color-mix( in srgb, "blue 30%", "red" 60%)
 *     cls2 = this.$class({
 *         color: css.colorMix("blue", 30).with("red", 60).in("srgb");
 *     })
 * }
 * ```
 *
 * @param cs Color space. Default is "lch".
 * @returns The `IColorMixBuilder` object that allows adding colors and optional percentages to mix
 */
export declare const colorMix: (c: Extended<CssColor>, p?: Extended<CssPercent> | undefined) => IColorMixBuilder;
/**
 * Converts the given color and the alpha mask to the CSS Color representation. This
 * method should be used when defining CSS color values in styleset properties.
 *
 * The color can be specified as a numeric value or as a color name from the [[INamedColors]]
 * interface - including colors added using the module augmentation technique.
 *
 * The alpha mask is specified as a number:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Number 0 to 1 inclusive, which is treated as percentage.
 *   - Number 1 to 100 inclusive, which is treated as percentage.
 *   - Numbers greater than 100 are clamped to 100;
 *
 * **Examples**
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // applying alpha to a numeric color
 *     cls1 = this.$class({ color: css.alpha( 0xAA00AA, 0.5) })
 *
 *     // applying alpha to a named color
 *     cls1 = this.$class({ color: css.alpha( "darkolivegreen", 0.5) })
 * }
 * ```
 * @param c Color value as either a number or a named color
 * @param a Alpha channel value
 */
export declare const alpha: (c: number | keyof INamedColors, a: number) => IAlphaFunc;
//# sourceMappingURL=ColorAPI.d.ts.map