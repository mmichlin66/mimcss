///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Style values that can be used for any CSS property.
 */
export type Global_StyleType = "inherit" | "initial" | "unset" | "revert";



/**
 * The IGenericProxy interface represents a callable interface implemented using functions that
 * accept an optional parameter of a generic type and return a string. This interface is used as a
 * base for proxy interfaces defining types acceptable by certain style properties. The type
 * parameter helps differentiate these interfaces so that functions that can be assigned to one
 * type of style properties (e.g. `transform`) cannot be assigned to an incompatible style property
 * (e.g. `filter`).
 *
 * All CSS properties should accept string as the type of their value even if normally
 * they accept other types (e.g a set of string literals as `"red" | "green" | ...` for the
 * color) property. This is because in addition to their normal values any property
 * can use custom CSS property in the form `var(--propname)`. However, if we add string type
 * to the set of string literals (e.g. `"red" | "green" | string`), this throws off the
 * Intellisense and it doesn't prompt developers for the possible values. The `IGenericProxy`
 * can be used instead of string and this solves the Intellisense issue.
 *
 * Another benefit of using functions is that they are
 * constructed at one time but the string generation occurs at another time. This allows
 * using these objects in the style definition classes. They can reference objects like
 * `IVarRule` that are not fully initialized yet. However, when the styles should be inserted
 * into DOM the initialization will have already occurred and the function will
 * return a correct string.
 *
 * @typeParam T String constant that is used to differentiate between proxies used for different
 * purposes. The parameter `p` of this callable interface is of type T but it is not used
 * in any way.
 */
export interface IGenericProxy<T extends string = any>
{
    (p?: T): string;
}



/**
 * The `IStringProxy` interface represents a function that returns a string. This function is part
 * of type definition for all CSS properties - even for those that don't have `string` as part of
 * their type.
 *
 * This function is returned from the [[raw]] function, which allows by-passing the property
 * typing rules and specifying a string directly. This might be useful, when a string value is
 * obtained from some external calculations.
 */
export interface IStringProxy extends IGenericProxy<"string"> {}



/**
 * The `ICustomVar` interface represents a custom property or a constant with values of the given
 * type. Every style property can accept a custom CSS property value in the form of the `var()` CSS
 * function. Mimcss also allows defining "constants", which are a more lightweight way to provide
 * values that are used in other rules and properties.
 *
 * The `ICustomVar` interface is extended by the [[IVarRule]] interface that is returned
 * from the [[$var]] function and by the [[IConstRule]] interface that is returned from the
 * [[$const]] function.
 *
 * @typeparam T Basic type of the value of the custom CSS variable.
 */
export interface ICustomVar<T = any>
{
    /**
	 * Sets new value of this custom CSS property at the global level; that is, under `:root`. To
     * set a value of the CSS custom property under a certain CSS rule, use the
     * [[IStyleRule.setCustomProp]] method.
	 * @param value New value for the CSS property.
	 * @param schedulerType ID of a registered scheduler type that is used to write the property
	 * value to the DOM. If undefined, the current default scheduler will be used.
	 */
	setValue( value: ExtendedProp<T>, schedulerType?: number): void;
}



/**
 * The `IConstant` interface represents a constant with values of the given type. Mimcss allows
 * defining "constants", which are a lightweight way (compared to custom CSS properties) to provide
 * values that are used in other rules and properties. Every style property can accept a constant
 * value.
 *
 * The `IConstant` interface is extended by the [[IConstRule]] interface that is returned from the
 * [[$const]] function.
 *
 * @typeparam T Basic type of the value of the constant.
 */
export interface IConstant<T = any>
{
	/**
	 * Gets the value of the property.
	 */
	getValue(): ExtendedProp<T>;
}



/**
 * Type that extends the given type with the following types:
 * - ICustomVar interface that allows using a CSS custom property rule value.
 * - IConstant interface that allows using a constant rule value.
 * - IStringProxy interface that allows specifying raw string value.
 */
export type Extended<T> = T | ICustomVar<T> | IConstant<T> | IStringProxy | null | undefined;



/**
 * Type that encapsulates the type of property in an object with a single "!" property. This
 * type is used to indicate that the property value must be flagged as "!important".
 */
export type ImportantProp<T> = { "!": ExtendedProp<T> };



/**
 * The ExtendedProp extends the given generic type with the following elements:
 * - Object with a single property "!", which is used to mark a property as "!important".
 * - Global_StyleType, which allows any property to be assigned the global values such as
 *   "initial", "inherit", "unset" and "revert".
 */
export type ExtendedProp<T> = Extended<T> | ImportantProp<T> | Global_StyleType;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type for pair-like properties that can have 1 or 2 values of the given type. This type is used
 * for style properties that can specify values for two dimensions (x and y), but also allow for a
 * single value, in which case it applies to both dimensions. For example, it used by style
 * properties such as `overflow`, `border-radius`, `background-repeat` and others.
 *
 * @typeparam T Type of the values
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // single value
 *     cls1 = css.$class({ overflow: "auto" })

 *     // two values
 *     cls2 = css.$class({ overflow: ["scroll", "hidden"] })
 * }
 * ```
 */
export type OneOrPair<T> = T | [Extended<T>, Extended<T>?];

/**
 * Type for box-like properties that can have 1 to 4 values of the given type. This type is used
 * for style properties that specify values for the four sides of an element box and have rules how
 * specifying 1, 2 or 3 values determine the values applied to all four sides. For example, it used
 * by style properties such as `margin`, `padding`, `border-color` and others.
 *
 * @typeparam T Type of the values
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // single value
 *     cls1 = css.$class({ margin: "auto" })
 *
 *     // two values
 *     cls2 = css.$class({ margin: [0, 8] })
 *
 *     // three values
 *     cls3 = css.$class({ margin: [6, 6, 8] })
 *
 *     // four values
 *     cls4 = css.$class({ margin: [4, 6, 8, 12] })
 * }
 * ```
 */
export type OneOrBox<T> = T | [Extended<T>, Extended<T>?, Extended<T>?, Extended<T>?];

/**
 * Type for properties that can have 1 or more values of the given type. It is used by many style
 * properties such as `animation` and all its longhands, `background` and all its longhands,
 * `transition` and all its longhands, `box-shadow`, `transform`, `filter` and others.
 *
 * @typeparam T Type of the values
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // single value
 *     cls1 = css.$class({ transform: scale(0.5) })
 *
 *     // several values
 *     cls2 = css.$class({ transform: [scale(0.5, rotate(90), translateX(200))] })
 * }
 * ```
 */
export type OneOrMany<T> = T | Extended<T>[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Numeric types as a basis for handling CSS <number>, <length>, <angle>, etc.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The INumberBaseMath interface contains methods that implement CSS mathematical functions on the
 * numeric CSS types. This interface is extended by dimension-specific interfaces such as
 * [[INumberMath]], [[ILengthMath]], [[IAngleMath]], etc.
 *
 * @typeparam T Type of values participating in the mathematical functions. For example, the
 * [[ILengthMath]] interface specifies it as [[CssLength]].
 * @typeparam U Type that contains string literals defining units available for the given numeric
 * type.
 * @typeparam P String literal type that distinguishes one numeric type from another. This
 * parameter is passed to the [[IGenericProxy]] interface, which is used as a return value from the
 * interface methods.
 */
export interface INumberBaseMath<T, U extends string, P extends string>
{
    /**
     * Creates value from the given number and unit. This method can be used to dynamically
     * construct the needed dimension.
     *
     * @param n Numeric value.
     * @param unit Unit to append to the numeric value.
     * @returns Function implementing the `IGenericProxy<P>` callable interface. This allows the
     * result of the `units` method to be assigned only to the properties of compatible numeric
     * type.
     */
    units( n: number, unit: U): IGenericProxy<P>;

    /**
     * Creates property value using the CSS `min()` function. Parameters are of the type
     * `Extended<T>`; that is, they can be either of the generic type `T`, or a CSS custom variable
     * or constant of type `T`.
     *
     * @param params One or more values to choose the minimum from.
     * @returns Function implementing the `IGenericProxy<P>` callable interface. This allows the
     * result of the `min` method to be assigned only to the properties of a compatible numeric
     * type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // min( 200px, 25.5em, 45%)
     *     cls1 = css.$class({
     *         width: css.min( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    min( ...params: Extended<T>[]): IGenericProxy<P>;

    /**
     * Creates property value using the CSS `max()` function. Parameters are of the type
     * `Extended<T>`; that is, they can be either of the generic type `T`, or a CSS custom variable
     * or constant of type `T`.
     *
     * @param params One or more values to choose the maximum from.
     * @returns Function implementing the `IGenericProxy<P>` callable interface. This allows the
     * result of the `max` method to be assigned only to the properties of a compatible numeric
     * type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // max( 200px, 25.5em, 45%)
     *     cls1 = css.$class({
     *         width: css.max( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    max( ...params: Extended<T>[]): IGenericProxy<P>;

    /**
     * Creates property value using the CSS `clamp()` function. Parameters are of the type
     * `Extended<T>`; that is, they can be either of the generic type `T`, or a CSS custom variable
     * or constant of type `T`.
     *
     * @param min Lower bound for the return value.
     * @param pref Preferred value.
     * @param min Upper bound for the return value.
     * @returns Function implementing the `IGenericProxy<P>` callable interface. This allows the
     * result of the `clamp` method to be assigned only to the properties of a compatible numeric
     * type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // clamp( 200px, 25.5em, 45%)
     *     cls1 = css.$class({
     *         width: css.clamp( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    clamp( min: Extended<T>, pref: Extended<T>, max: Extended<T>): IGenericProxy<P>;

    /**
     * Creates property value using the CSS `calc()` function. This method is a tag function and must
     * be invoked with a template string without parentheses. Parameters in the template string
     * are of the type `Extended<T>`; that is, they can be either of the generic type `T`, or a
     * CSS custom variable or constant of type `T`.
     *
     * @param formularParts Array of strings, whcih are part of the template string and which are
     * not parameters.
     * @param params Array of parameters from the template string.
     * @returns Function implementing the `IGenericProxy<P>` callable interface. This allows the
     * result of the `calc` method to be assigned only to the properties of a compatible numeric
     * type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     defaultPadding = css.var( "CssLength", 8)
     *
     *     // calc( 200px - (2 * var(--defaultPadding)))
     *     cls1 = css.$class({
     *         width: css.calc` 200px - (2 * ${this.defaultPadding})`
     *     })
     * }
     * ```
     */
    calc( formulaParts: TemplateStringsArray, ...params: Extended<T>[]): IGenericProxy<P>;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<number>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Unique string literal that distinguishes the Number type from other numeric types */
export type NumberType = "Number";

/** Proxy interface that represents values of the `<percent>` CSS type */
export interface INumberProxy extends IGenericProxy<NumberType> {};

/** Type for a value of the `<number>` CSS type */
export type CssNumber = number | INumberProxy;

/**
 * The ICssNumberMath interface contains methods that implement CSS mathematic functions on the
 * `<number>` CSS types. This interface is implemented by the [[Num]] object.
 */
export interface INumberMath extends INumberBaseMath<CssNumber, "", NumberType> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Unique string literal that distinguishes the Percent type from other numeric types */
export type PercentType = "Percent";

/** Units of percent */
export type PercentUnits = "%";

/** Proxy interface that represents values of the `<percent>` CSS type */
export interface IPercentProxy extends IGenericProxy<PercentType> {};

/** Type for single style property of the `<percent>` CSS type */
export type CssPercent = number | IPercentProxy |
    "5%" | "10%" | "15%" | "20%" | "25%" | "30%" | "35%" | "40%" | "45%" | "50%" |
    "55%" | "60%" | "65%" | "70%" | "75%" | "80%" | "85%" | "90%" | "95%" | "100%";

/**
 * The ICssPercentMath interface contains methods that implement CSS mathematic functions on the
 * `<percent>` CSS types. This interface is implemented by the [[Percent]] object.
 */
export interface IPercentMath extends INumberBaseMath<CssPercent, PercentUnits, PercentType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<length>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Unique string literal that distinguishes the Length type from other numeric types */
export type LengthType = "Length" | PercentType;

/** Units of length */
export type LengthUnits = "Q" | "ch" | "cm" | "em" | "ex" | "ic" | "in" | "lh" | "mm" | "pc" |
                "pt" | "px" | "vb" | "vh" | "vi" | "vw" | "rem" | "rlh" | "vmax" | "vmin" | "fr";

/** Proxy interface that represents values of the `<length>` CSS type */
export interface ILengthProxy extends IGenericProxy<LengthType> {};

/**
 * Type for single style property of the `<length>` CSS type. Integer numbers are interpreted as
 * having the `"px"` units and floating point numbers are interpreted as having the `"em"` units.
 * In addition to numbers and the [[ILengthProxy]] interface it also allows several string
 * literals, such as `"1fr"` and `"100%"`. This is in order to make it more convenient for
 * developers to write these frequently used values. Other `<length>` units should be specified
 * using the functions such as [[rem]], [[vh]], [[vmin]], etc.
 */
export type CssLength = CssPercent |
    "100vh" | "100vw" |
    "1fr" | "2fr" | "3fr" | "4fr" | "5fr" | "6fr" | "7fr" | "8fr" | "9fr" | "10fr" | "11fr" | "12fr";

/**
 * The ICssLengthMath interface contains methods that implement CSS mathematic functions on the
 * `<length>` CSS types. This interface is implemented by the [[Len]] object.
 */
export interface ILengthMath extends INumberBaseMath<CssLength, LengthUnits | PercentUnits, LengthType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<angle>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Unique string literal that distinguishes the Angle type from other numeric types */
export type AngleType = "Angle";

/** Units of angle */
export type AngleUnits = "deg" | "rad" | "grad" | "turn";

/** Proxy interface that represents values of the `<angle>` CSS type */
export interface IAngleProxy extends IGenericProxy<AngleType> {};

/** Type for single style property of the `<angle>` CSS type */
export type CssAngle = number | IAngleProxy;

/**
 * The ICssAngleMath interface contains methods that implement CSS mathematic functions on the
 * `<angle>` CSS types. This interface is implemented by the [[Angle]] object.
 */
export interface IAngleMath extends INumberBaseMath<CssAngle, AngleUnits | PercentUnits, AngleType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<time>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Unique string literal that distinguishes the Time type from other numeric types */
export type TimeType = "Time";

/** Units of time */
export type TimeUnits = "s" | "ms";

/** Proxy interface that represents values of the `<time>` CSS type*/
export interface ITimeProxy extends IGenericProxy<TimeType> {};

/** Type for single style property of the `<time>` CSS type */
export type CssTime = number | ITimeProxy;

/**
 * The ICssTimeMath interface contains methods that implement CSS mathematic functions on the
 * `<time>` CSS types. This interface is implemented by the [[Time]] object.
 */
export interface ITimeMath extends INumberBaseMath<CssTime, TimeUnits, TimeType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<resolution>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Unique string literal that distinguishes the Resolution type from other numeric types */
export type ResolutionType = "Resolution";

/** Units of resolution */
export type ResolutionUnits = "dpi" | "dpcm" | "dppx" | "x";

/** Proxy interface that represents values of the `<resolution>` CSS type */
export interface IResolutionProxy extends IGenericProxy<ResolutionType> {};

/** Type for single style property of the `<resolution>` CSS type */
export type CssResolution = number | IResolutionProxy |
    "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x" |
    "1dppx" | "2dppx" | "3dppx" | "4dppx" | "5dppx" | "6dppx" | "7dppx" | "8dppx" | "9dppx" | "10dppx";

/**
 * The ICssResolutionMath interface contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS types. This interface is implemented by the [[Resolution]] object.
 */
export interface IResolutionMath extends INumberBaseMath<CssResolution, ResolutionUnits, ResolutionType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<frequency>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Unique string literal that distinguishes the Frequency type from other numeric types */
export type FrequencyType = "Frequency";

/** Units of frequency */
export type FrequencyUnits = "Hz" | "kHz";

/** Proxy interface that represents values of the `<frequency>` CSS type */
export interface IFrequencyProxy extends IGenericProxy<FrequencyType> {};

/** Type for single style property of the `<frequency>` CSS type */
export type CssFrequency = number | IFrequencyProxy;

/**
 * The ICssFrequencyMath interface contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS types. This interface is implemented by the [[Frequency]] object.
 */
export interface IFrequencyMath extends INumberBaseMath<CssFrequency, FrequencyUnits, FrequencyType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Size, Point, Position, Radius
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for `width`, `height`, `block-size` and `inline-size` style properties */
export type CssSize = CssLength | "auto" | "max-content" | "min-content" | IFitContentProxy;

/**
 * The IFitContentProxy interface represents an invocation of the CSS `fit-content()` function. It
 * is returned from the [[fitContent]] function.
 */
export interface IFitContentProxy extends IGenericProxy<"fit-content"> {}



/**
 * Type representing a point as a two element tuple where x and y coordinates are specified using
 * the [[CssLength]] type.
 */
export type CssPoint = [Extended<CssLength>, Extended<CssLength>];



/** Horizontal position keywords */
export type HorizontalPositionKeyword = "left" | "center" | "right";

/** Type of a value specifying the horizontal position */
export type HorizontalPosition = HorizontalPositionKeyword | CssLength;

/** Vertical position keywords */
export type VerticalPositionKeyword = "top" | "center" | "bottom";

/** Type of a value specifying the vertical position */
export type VerticalPosition = VerticalPositionKeyword | CssLength;

/** Type describing a simple 1 or two values `<position>` CSS type */
export type SimpleCssPosition = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength |
    [Extended<HorizontalPosition>, Extended<VerticalPosition>] |
    [Extended<VerticalPosition>, Extended<HorizontalPosition>];

/** Type describing the full up to 4 values `<position>` CSS type */
export type CssPosition = SimpleCssPosition |
    [Extended<HorizontalPositionKeyword>, Extended<VerticalPositionKeyword>, Extended<CssLength>] |
    [Extended<HorizontalPositionKeyword>, Extended<CssLength>, Extended<VerticalPositionKeyword>, Extended<CssLength>?] |
    [Extended<VerticalPositionKeyword>, Extended<HorizontalPositionKeyword>, Extended<CssLength>] |
    [Extended<VerticalPositionKeyword>, Extended<CssLength>, Extended<HorizontalPositionKeyword>, Extended<CssLength>?];



/** Type for a single corner radius */
export type CssRadius = OneOrPair<CssLength>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Aspect Ratio
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The CssAspectRatio interface represents the CSS `<ratio>` type. This type can be used for the
 * `aspect-ratio` CSS property although this property is not implemented yet by most of the
 * browsers. More frequently though this type is used by the `aspect-ratio` media feature in a
 * `@media` rule.
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // using string value
 *     mediaRule1 = css.$media( {aspectRatio: "4/3"}, ...)
 *
 *     // using the `ratio()` function
 *     mediaRule2 = css.$media( {aspectRatio: css.ratio( 4, 3)}, ...)
 *
 *     // using a single number (not widely supported yet)
 *     mediaRule3 = css.$media( {aspectRatio: 1.33}, ...)
 *
 *     // using a tuple to specify range; this will result in the following media condition:
 *     // (min-aspect-ratio: 4/3) and (max-aspect-ratio:16/9)
 *     mediaRule4 = css.$media( {aspectRatio: ["4/3","16/9"]}, ...)
 * }
 * ```
 */
export type CssAspectRatio = CssNumber | IAspectRatioProxy |
    "1/1" | "4/3" | "16/9" | "185/100" | "239/100";

/**
 * The IAspectRatioProxy interface represents an invocation of the [[ratio]] function.
 */
export interface IAspectRatioProxy extends IGenericProxy<"aspect-ratio"> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Selectors
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IRuleWithSelector interface represents an entity that has a selector string.
 */
export interface IRuleWithSelector
{
	/** CSS rule selector string */
	readonly selectorText: string;
}



/**
 * The ISelectorProxy function returns a CSS selector string. This type is returned from the
 * [[selector]] function.
 */
export interface ISelectorProxy extends IGenericProxy<"selector"> {};



/** Type for a single selector token that can be used as an argument to the [[selector]] function */
export type SelectorItem = string | IRuleWithSelector | IStringProxy | ISelectorProxy;



/** Type for a selector */
export type CssSelector = SelectorItem | SelectorItem[];



/** Represents print-related pseudo classes - those that can be specified with the @page CSS rule */
export type PagePseudoClass = ":blank" | ":first" | ":left" | ":right";



/** Represents pseudo classes */
export type PseudoClass = PagePseudoClass |
	":active" | ":any-link" | ":blank" | ":checked" | ":default" | ":defined" | ":disabled" |
	":empty" | ":enabled" | ":first-child" | ":first-of-type" | ":fullscreen" | ":focus" |
	":focus-visible" | ":focus-Within" | ":hover" | ":indeterminate" | ":in-range" | ":invalid" |
	":last-child" | ":last-of-type" | ":link" | ":only-child" | ":only-of-type" | ":optional" |
	":out-of-range" | ":placeholder-shown" | ":read-only" | ":read-write" | ":required" | ":root" |
	":scope" | ":target" | ":valid" | ":visited" | ":dir(rtl)" | ":dir(ltr)";



/** Represents pseudo elements */
export type PseudoElement = "::after" | "::backdrop" | "::before" | "::cue" | "::firstLetter" |
	"::firstLine" | "::grammarError" | "::marker" | "::placeholder" | "::selection" | "::spellingError";



/** Combines names of non-parameterized pseudo classes and pseudo elements */
export type PseudoEntity = PseudoClass | PseudoElement;



/**
 * Type for expression An+B, which is used for parameterized pseudo classes like `nth-child`. It
 * can be a string, a single number or a tuple with one or two numbers. If it is a single number,
 * the 'n' in An+B will not be used - as in `nth-child(2)`. If it is a tuple, the 'n' will be used
 * even if the second tuple's element is not provided.
 */
export type NthChildExpression = "odd" | "even" | number | [number, number?] | string | IStringProxy;



/**
 * The IParameterizedPseudoClass interface maps names of pseudo classes that require parameters
 * to the type that can be used to specify these parameters.
 */
export interface IParameterizedPseudoClass
{
	":has": string;
	":host": string;
	":host-context": string;
	":is": string;
	":lang": string;
	":not": string;
	":nth-child": NthChildExpression;
	":nth-of-type": NthChildExpression;
	":nth-last-child": NthChildExpression;
	":nth-last-of-type": NthChildExpression;
	":where": string;
}



/**
 * The IParameterizedPseudoElement interface maps names of pseudo elements that require parameters
 * to the type that can be used to specify these parameters.
 */
export interface IParameterizedPseudoElement
{
	"::part": string;
	"::slotted": string;
}



/**
 * The IParameterizedPseudoEntity interface combines IParameterizedPseudoClass and
 * IParameterizedPseudoElement interfaces.
 */
export interface IParameterizedPseudoEntity extends IParameterizedPseudoClass, IParameterizedPseudoElement
{
}



/** Represents properties used in the [[CombinedStyleset]] which are used to define dependent rules */
export type SelectorCombinator = "&" | "&," | "& " | "&>" | "&+" | "&~" | ",&" | " &" | ">&" | "+&" | "~&";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Types used in different style contexts
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type representing the boundaries of a box
 */
export type GeometryBoxKeyword = "margin-box" | "border-box" | "padding-box" | "content-box" |
    "fill-box" | "stroke-box" | "view-box";



/**
 * Type representing extent for the [[radialGradient]] or [[ray]] functions.
 */
export type ExtentKeyword = "closest-corner" | "closest-side" | "farthest-corner" | "farthest-side";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// attr() function support
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type representing keywords used to define a type used in the CSS `attr()` function.
 */
export type AttrTypeKeyword = "string" | "color" | "url" | "integer" | "number" | "length" | "angle" | "time" | "frequency";

/**
 * Type representing keywords used to define a unit used in the CSS `attr()` function.
 */
export type AttrUnitKeyword = PercentUnits | LengthUnits | TimeUnits | AngleUnits | ResolutionUnits | FrequencyUnits;

/**
 * The IQuotedProxy function represents a string that will be taken into quotation marks
 */
export interface IQuotedProxy extends IGenericProxy<"quoted"> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Web Namespaces.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The WebNamespaces class contains identifiers for the known Web-related namespaces.
 */
export abstract class WebNamespaces
{
	static readonly HTML = "http://www.w3.org/1999/xhtml";
	static readonly SVG = "http://www.w3.org/2000/svg";
	static readonly XLink = "http://www.w3.org/1999/xlink";
	static readonly XML = "http://www.w3.org/XML/1998/namespace";
	static readonly XMLNS = "http://www.w3.org/2000/xmlns/";
	static readonly MathML = "http://www.w3.org/1998/Math/MathML";
}



