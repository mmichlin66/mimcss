/**
 * This module describes common types and functions used in Mimcss. These include:
 *
 * - basic types used for all style properties
 * - numeric types used for style properties of CSS types such as `<length>`, `<angle>`, etc.
 * - pseudo classes and pseudo elements
 * - selectors
 * - colors
 * - shapes
 * - filters
 * - transforms
 * - utility types
 */



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
export interface IGenericProxy<T extends string>
{
    (p?: T): string;
}



/**
 * The IStringProxy interface represents a function that returns a string. This function is part
 * of type definition for all CSS properties - even for those that don't have `string` as part of
 * their type.
 *
 * This function is returned from the [[raw]] function, which allows by-passing the property
 * typing rules and specifying a string directly. This might be useful, when a string value is
 * obtained from some external calculations.
 */
export interface IStringProxy extends IGenericProxy<"string"> {}



/**
 * The ICustomVar interface represents a CSS custom property object with values of the given type.
 * This interface is needed because every style property can accept value in the form of the
 * `var()` CSS function. This interface is extended by the [[IVarRule]] interface that is returned
 * from the [[$var]] function.
 */
export interface ICustomVar<T = any>
{
	/**
	 * Gets the value of the property.
	 */
	getValue(): ExtendedProp<T>;
}



/**
 * Type that extends the given type with the following types:
 * - ICustomVar interface that allows using a CSS custom property.
 * - IStringProxy interface that allows specifying raw string value.
 */
export type Extended<T> = T | ICustomVar<T> | IStringProxy | undefined;



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

/** Type for pair-like property that can have 1 to 2 values of the given type */
export type OneOrPair<T> = T | [Extended<T>, Extended<T>];

/** Type for box-like property that can have 1 to 4 values of the given type */
export type OneOrBox<T> = T | [Extended<T>, Extended<T>, Extended<T>?, Extended<T>?];

/** Type for a property that can have 1 or more values of the given type */
export type OneOrMany<T> = T | Extended<T>[];

/**
 * The IQuotedProxy function represents a string in quotation marks
 */
export interface IQuotedProxy extends IGenericProxy<"quoted"> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Numeric types as a basis for handling CSS <number>, <length>, <angle>, etc.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for single numeric style property */
export type NumberBase<T extends string> = number | string | IGenericProxy<T>;

/** Type for multi-part numeric style property */
export type MultiNumberBase<T extends string> = OneOrMany<NumberBase<T>>;



/**
 * The INumberBaseMath interface contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number type, they are converted
 * to strings using the `numberToString` method.
 */
export interface INumberBaseMath<T extends string>
{
    /** Creates property value using the CSS min() function. */
    min( ...params: Extended<NumberBase<T>>[]): IGenericProxy<T>;

    /** Creates property value using the CSS max() function. */
    max( ...params: Extended<NumberBase<T>>[]): IGenericProxy<T>;

    /** Creates property value using the CSS clamp() function. */
    clamp( min: Extended<NumberBase<T>>, pref: Extended<NumberBase<T>>, max: Extended<NumberBase<T>>): IGenericProxy<T>;

    /**
     * Creates property value using the CSS calc() function. This method is a tag function and must
     * be invoked with a template string without parentheses.
     */
    calc( formulaParts: TemplateStringsArray, ...params: Extended<NumberBase<T>>[]): IGenericProxy<T>;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<number>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Unique string literal that distinguishes the Number type from other numeric types */
export type NumberType = "Number";

/** Type for single style property of the `<number>` CSS type - note that it exludes `string` */
export type CssNumber = Exclude<NumberBase<NumberType>,string>;

/** Type for multi-part style property of the `<number>` CSS type */
export type CssMultiNumber = OneOrMany<CssNumber>;

/** Proxy interface that represents values of the `<percent>` CSS type */
export interface INumberProxy extends IGenericProxy<NumberType> {};

/**
 * The ICssNumberMath interface contains methods that implement CSS mathematic functions on the
 * `<number>` CSS types.
 */
export interface INumberMath extends INumberBaseMath<NumberType> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of percent */
export type PercentUnits = "%";

/** Unique string literal that distinguishes the Percent type from other numeric types */
export type PercentType = "Percent";

/** Type for single style property of the `<percent>` CSS type */
export type CssPercent = NumberBase<PercentType>;

/** Type for multi-part style property of the `<percent>` CSS type */
export type CssMultiPercent = OneOrMany<CssPercent>;

/** Proxy interface that represents values of the `<percent>` CSS type */
export interface IPercentProxy extends IGenericProxy<PercentType> {};

/**
 * The ICssPercentMath interface contains methods that implement CSS mathematic functions on the
 * `<percent>` CSS types.
 */
export interface IPercentMath extends INumberBaseMath<PercentType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<length>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of length */
export type LengthUnits = "Q" | "ch" | "cm" | "em" | "ex" | "ic" | "in" | "lh" | "mm" | "pc" |
                "pt" | "px" | "vb" | "vh" | "vi" | "vw" | "rem" | "rlh" | "vmax" | "vmin" | "fr";

/** Unique string literal that distinguishes the Length type from other numeric types */
export type LengthType = "Length" | PercentType;

/** Type for single style property of the `<length>` CSS type */
export type CssLength = NumberBase<LengthType>;

/** Type for multi-part style property of the `<length>` CSS type */
export type CssMultiLength = OneOrMany<CssLength>;

/** Type for 1-to-2-part style property of the `<length>` CSS type */
export type CssLengthPair = OneOrPair<CssLength>;

/** Type for 1-to-4-part style property of the `<length>` CSS type */
export type CssLengthBox = OneOrBox<CssLength>;

/** Proxy interface that represents values of the `<length>` CSS type */
export interface ILengthProxy extends IGenericProxy<LengthType> {};

/**
 * The ICssLengthMath interface contains methods that implement CSS mathematic functions on the
 * `<length>` CSS types.
 */
export interface ILengthMath extends INumberBaseMath<LengthType>
{
    /** Creates property value using the CSS minmax() function. */
    minmax( min: Extended<CssLength>, max: Extended<CssLength>): ILengthProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<angle>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of angle */
export type AngleUnits = "deg" | "rad" | "grad" | "turn";

/** Unique string literal that distinguishes the Angle type from other numeric types */
export type AngleType = "Angle" | PercentType;

/** Type for single style property of the `<angle>` CSS type */
export type CssAngle = NumberBase<AngleType>;

/** Type for multi-part style property of the `<angle>` CSS type */
export type CssMultiAngle = OneOrMany<CssAngle>;

/** Proxy interface that represents values of the `<angle>` CSS type */
export interface IAngleProxy extends IGenericProxy<AngleType> {};

/**
 * The ICssAngleMath interface contains methods that implement CSS mathematic functions on the
 * `<angle>` CSS types.
 */
export interface IAngleMath extends INumberBaseMath<AngleType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<time>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of time */
export type TimeUnits = "s" | "ms";

/** Unique string literal that distinguishes the Time type from other numeric types */
export type TimeType = "Time";

/** Type for single style property of the `<time>` CSS type */
export type CssTime = NumberBase<TimeType>;

/** Type for multi-part style property of the `<time>` CSS type */
export type CssMultiTime = OneOrMany<CssTime>;

/** Proxy interface that represents values of the `<time>` CSS type*/
export interface ITimeProxy extends IGenericProxy<TimeType> {};

/**
 * The ICssTimeMath interface contains methods that implement CSS mathematic functions on the
 * `<time>` CSS types.
 */
export interface ITimeMath extends INumberBaseMath<TimeType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<resolution>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of resolution */
export type ResolutionUnits = "dpi" | "dpcm" | "dppx" | "x";

/** Unique string literal that distinguishes the Resolution type from other numeric types */
export type ResolutionType = "Resolution";

/** Type for single style property of the `<resolution>` CSS type */
export type CssResolution = NumberBase<ResolutionType>;

/** Type for multi-part style property of the `<resolution>` CSS type */
export type CssMultiResolution = OneOrMany<CssResolution>;

/** Proxy interface that represents values of the `<resolution>` CSS type */
export interface IResolutionProxy extends IGenericProxy<ResolutionType> {};

/**
 * The ICssResolutionMath interface contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS types.
 */
export interface IResolutionMath extends INumberBaseMath<ResolutionType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<frequency>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of frequency */
export type FrequencyUnits = "Hz" | "kHz";

/** Unique string literal that distinguishes the Frequency type from other numeric types */
export type FrequencyType = "Frequency";

/** Type for single style property of the `<frequency>` CSS type */
export type CssFrequency = NumberBase<FrequencyType>;

/** Type for multi-part style property of the `<frequency>` CSS type */
export type CssMultiFrequency = OneOrMany<CssFrequency>;

/** Proxy interface that represents values of the `<frequency>` CSS type */
export interface IFrequencyProxy extends IGenericProxy<FrequencyType> {};

/**
 * The ICssFrequencyMath interface contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS types.
 */
export interface IFrequencyMath extends INumberBaseMath<FrequencyType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Point, Position, Radius
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type representing a point using x and y coordinates.
 */
export type CssPoint = [Extended<CssLength>, Extended<CssLength>];



/** Type describing the horizontal position */
export type HorizontalPositionKeyword = "left" | "center" | "right";

/** Type describing the horizontal position */
export type VerticalPositionKeyword = "top" | "center" | "bottom";

/** Type describing a simple 1 or two values `<position>` CSS type */
export type SimpleCssPosition = HorizontalPositionKeyword | VerticalPositionKeyword | Extended<CssLength> |
    [HorizontalPositionKeyword | Extended<CssLength>, VerticalPositionKeyword | Extended<CssLength>];

/** Type describing the full up to 4 values `<position>` CSS type */
export type CssPosition = SimpleCssPosition |
    [HorizontalPositionKeyword, Extended<CssLength>, VerticalPositionKeyword] |
    [HorizontalPositionKeyword, VerticalPositionKeyword, Extended<CssLength>] |
    [HorizontalPositionKeyword, Extended<CssLength>, VerticalPositionKeyword, Extended<CssLength>];

/** Type describing multiple `<position>` CSS types */
export type MultiCssPosition = Extended<CssPosition>[];



/** Type for a single corner radius */
export type CssRadius = OneOrPair<CssLength>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Selectors
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IRuleWithSelector interface represents an entity that has a selector string..
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
// Colors.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The INamedColors interface lists the names of standard Web colors. It is needed to allow developers
 * to add new named colors through module augmentation technique.
 */
export interface INamedColors
{
    readonly black:                  number;
    readonly silver:                 number;
    readonly gray:                   number;
    readonly white:                  number;
    readonly maroon:                 number;
    readonly red:                    number;
    readonly purple:                 number;
    readonly fuchsia:                number;
    readonly green:                  number;
    readonly lime:                   number;
    readonly olive:                  number;
    readonly yellow:                 number;
    readonly navy:                   number;
    readonly blue:                   number;
    readonly teal:                   number;
    readonly aqua:                   number;
    readonly orange:                 number;
    readonly aliceblue:              number;
    readonly antiquewhite:           number;
    readonly aquamarine:             number;
    readonly azure:                  number;
    readonly beige:                  number;
    readonly bisque:                 number;
    readonly blanchedalmond:         number;
    readonly blueviolet:             number;
    readonly brown:                  number;
    readonly burlywood:              number;
    readonly cadetblue:              number;
    readonly chartreuse:             number;
    readonly chocolate:              number;
    readonly coral:                  number;
    readonly cornflowerblue:         number;
    readonly cornsilk:               number;
    readonly crimson:                number;
    readonly cyan:                   number;
    readonly darkblue:               number;
    readonly darkcyan:               number;
    readonly darkgoldenrod:          number;
    readonly darkgray:               number;
    readonly darkgreen:              number;
    readonly darkgrey:               number;
    readonly darkkhaki:              number;
    readonly darkmagenta:            number;
    readonly darkolivegreen:         number;
    readonly darkorange:             number;
    readonly darkorchid:             number;
    readonly darkred:                number;
    readonly darksalmon:             number;
    readonly darkseagreen:           number;
    readonly darkslateblue:          number;
    readonly darkslategray:          number;
    readonly darkslategrey:          number;
    readonly darkturquoise:          number;
    readonly darkviolet:             number;
    readonly deeppink:               number;
    readonly deepskyblue:            number;
    readonly dimgray:                number;
    readonly dimgrey:                number;
    readonly dodgerblue:             number;
    readonly firebrick:              number;
    readonly floralwhite:            number;
    readonly forestgreen:            number;
    readonly gainsboro:              number;
    readonly ghostwhite:             number;
    readonly gold:                   number;
    readonly goldenrod:              number;
    readonly greenyellow:            number;
    readonly grey:                   number;
    readonly honeydew:               number;
    readonly hotpink:                number;
    readonly indianred:              number;
    readonly indigo:                 number;
    readonly ivory:                  number;
    readonly khaki:                  number;
    readonly lavender:               number;
    readonly lavenderblush:          number;
    readonly lawngreen:              number;
    readonly lemonchiffon:           number;
    readonly lightblue:              number;
    readonly lightcoral:             number;
    readonly lightcyan:              number;
    readonly lightgoldenrodyellow:   number;
    readonly lightgray:              number;
    readonly lightgreen:             number;
    readonly lightgrey:              number;
    readonly lightpink:              number;
    readonly lightsalmon:            number;
    readonly lightseagreen:          number;
    readonly lightskyblue:           number;
    readonly lightslategray:         number;
    readonly lightslategrey:         number;
    readonly lightsteelblue:         number;
    readonly lightyellow:            number;
    readonly limegreen:              number;
    readonly linen:                  number;
    readonly magenta:                number;
    readonly mediumaquamarine:       number;
    readonly mediumblue:             number;
    readonly mediumorchid:           number;
    readonly mediumpurple:           number;
    readonly mediumseagreen:         number;
    readonly mediumslateblue:        number;
    readonly mediumspringgreen:      number;
    readonly mediumturquoise:        number;
    readonly mediumvioletred:        number;
    readonly midnightblue:           number;
    readonly mintcream:              number;
    readonly mistyrose:              number;
    readonly moccasin:               number;
    readonly navajowhite:            number;
    readonly oldlace:                number;
    readonly olivedrab:              number;
    readonly orangered:              number;
    readonly orchid:                 number;
    readonly palegoldenrod:          number;
    readonly palegreen:              number;
    readonly paleturquoise:          number;
    readonly palevioletred:          number;
    readonly papayawhip:             number;
    readonly peachpuff:              number;
    readonly peru:                   number;
    readonly pink:                   number;
    readonly plum:                   number;
    readonly powderblue:             number;
    readonly rosybrown:              number;
    readonly royalblue:              number;
    readonly saddlebrown:            number;
    readonly salmon:                 number;
    readonly sandybrown:             number;
    readonly seagreen:               number;
    readonly seashell:               number;
    readonly sienna:                 number;
    readonly skyblue:                number;
    readonly slateblue:              number;
    readonly slategray:              number;
    readonly slategrey:              number;
    readonly snow:                   number;
    readonly springgreen:            number;
    readonly steelblue:              number;
    readonly tan:                    number;
    readonly thistle:                number;
    readonly tomato:                 number;
    readonly turquoise:              number;
    readonly violet:                 number;
    readonly wheat:                  number;
    readonly whitesmoke:             number;
    readonly yellowgreen:            number;
    readonly rebeccapurple:          number;
}



/**
 * The IColorProxy interface represents an invocation of one of CSS functions that are used for
 * specifying colors. This interface is returned from functions like: rgb(), alpha(), etc.
 */
export interface IColorProxy extends IGenericProxy<"color"> {};



/**
 * The SystemColors type defines keywords for system colors that are used in forced-color mode
 * (but can be also used in the regular mode).
 */
export type SystemColors = "ActiveText" | "ButtonFace" | "ButtonText" | "Canvas" | "CanvasText" |
    "Field" | "FieldText" | "GrayText" | "Highlight" | "HighlightText" | "LinkText" | "VisitedText";



/**
 * Type for CSS color. Color can be represented using the following types:
 * - keywords: any string that is a name of a property in the INamedColors interface.
 * - number:
 *   - negative numbers are treated as inverted colors.
 *   - integer part of the number must be less than or equal to 0xFFFFFF - everything else is
 *     ignored.
 *   - floating point part of the number is treated as percents of alpha channel. If there is no
 *     floating part, alpha is 1.
 * - functions: rgb(), hsl(), alpha() as well as any function that returns the IColorProxy type.
 */
export type CssColor = "transparent" | "currentcolor" | keyof INamedColors | number | IColorProxy | SystemColors;



/**
 * Object whose property names are names of well-known colors and values correspond to the hexadecimal
 * representartion of the RGB separations (without an alpha mask).
 */
export let Colors: INamedColors =
{
    black:                  0x000000,
    silver:                 0xc0c0c0,
    gray:                   0x808080,
    white:                  0xffffff,
    maroon:                 0x800000,
    red:                    0xff0000,
    purple:                 0x800080,
    fuchsia:                0xff00ff,
    green:                  0x008000,
    lime:                   0x00ff00,
    olive:                  0x808000,
    yellow:                 0xffff00,
    navy:                   0x000080,
    blue:                   0x0000ff,
    teal:                   0x008080,
    aqua:                   0x00ffff,
    orange:                 0xffa500,
    aliceblue:              0xf0f8ff,
    antiquewhite:           0xfaebd7,
    aquamarine:             0x7fffd4,
    azure:                  0xf0ffff,
    beige:                  0xf5f5dc,
    bisque:                 0xffe4c4,
    blanchedalmond:         0xffebcd,
    blueviolet:             0x8a2be2,
    brown:                  0xa52a2a,
    burlywood:              0xdeb887,
    cadetblue:              0x5f9ea0,
    chartreuse:             0x7fff00,
    chocolate:              0xd2691e,
    coral:                  0xff7f50,
    cornflowerblue:         0x6495ed,
    cornsilk:               0xfff8dc,
    crimson:                0xdc143c,
    cyan:                   0x00ffff,
    darkblue:               0x00008b,
    darkcyan:               0x008b8b,
    darkgoldenrod:          0xb8860b,
    darkgray:               0xa9a9a9,
    darkgreen:              0x006400,
    darkgrey:               0xa9a9a9,
    darkkhaki:              0xbdb76b,
    darkmagenta:            0x8b008b,
    darkolivegreen:         0x556b2f,
    darkorange:             0xff8c00,
    darkorchid:             0x9932cc,
    darkred:                0x8b0000,
    darksalmon:             0xe9967a,
    darkseagreen:           0x8fbc8f,
    darkslateblue:          0x483d8b,
    darkslategray:          0x2f4f4f,
    darkslategrey:          0x2f4f4f,
    darkturquoise:          0x00ced1,
    darkviolet:             0x9400d3,
    deeppink:               0xff1493,
    deepskyblue:            0x00bfff,
    dimgray:                0x696969,
    dimgrey:                0x696969,
    dodgerblue:             0x1e90ff,
    firebrick:              0xb22222,
    floralwhite:            0xfffaf0,
    forestgreen:            0x228b22,
    gainsboro:              0xdcdcdc,
    ghostwhite:             0xf8f8ff,
    gold:                   0xffd700,
    goldenrod:              0xdaa520,
    greenyellow:            0xadff2f,
    grey:                   0x808080,
    honeydew:               0xf0fff0,
    hotpink:                0xff69b4,
    indianred:              0xcd5c5c,
    indigo:                 0x4b0082,
    ivory:                  0xfffff0,
    khaki:                  0xf0e68c,
    lavender:               0xe6e6fa,
    lavenderblush:          0xfff0f5,
    lawngreen:              0x7cfc00,
    lemonchiffon:           0xfffacd,
    lightblue:              0xadd8e6,
    lightcoral:             0xf08080,
    lightcyan:              0xe0ffff,
    lightgoldenrodyellow:   0xfafad2,
    lightgray:              0xd3d3d3,
    lightgreen:             0x90ee90,
    lightgrey:              0xd3d3d3,
    lightpink:              0xffb6c1,
    lightsalmon:            0xffa07a,
    lightseagreen:          0x20b2aa,
    lightskyblue:           0x87cefa,
    lightslategray:         0x778899,
    lightslategrey:         0x778899,
    lightsteelblue:         0xb0c4de,
    lightyellow:            0xffffe0,
    limegreen:              0x32cd32,
    linen:                  0xfaf0e6,
    magenta:                0xff00ff,
    mediumaquamarine:       0x66cdaa,
    mediumblue:             0x0000cd,
    mediumorchid:           0xba55d3,
    mediumpurple:           0x9370db,
    mediumseagreen:         0x3cb371,
    mediumslateblue:        0x7b68ee,
    mediumspringgreen:      0x00fa9a,
    mediumturquoise:        0x48d1cc,
    mediumvioletred:        0xc71585,
    midnightblue:           0x191970,
    mintcream:              0xf5fffa,
    mistyrose:              0xffe4e1,
    moccasin:               0xffe4b5,
    navajowhite:            0xffdead,
    oldlace:                0xfdf5e6,
    olivedrab:              0x6b8e23,
    orangered:              0xff4500,
    orchid:                 0xda70d6,
    palegoldenrod:          0xeee8aa,
    palegreen:              0x98fb98,
    paleturquoise:          0xafeeee,
    palevioletred:          0xdb7093,
    papayawhip:             0xffefd5,
    peachpuff:              0xffdab9,
    peru:                   0xcd853f,
    pink:                   0xffc0cb,
    plum:                   0xdda0dd,
    powderblue:             0xb0e0e6,
    rosybrown:              0xbc8f8f,
    royalblue:              0x4169e1,
    saddlebrown:            0x8b4513,
    salmon:                 0xfa8072,
    sandybrown:             0xf4a460,
    seagreen:               0x2e8b57,
    seashell:               0xfff5ee,
    sienna:                 0xa0522d,
    skyblue:                0x87ceeb,
    slateblue:              0x6a5acd,
    slategray:              0x708090,
    slategrey:              0x708090,
    snow:                   0xfffafa,
    springgreen:            0x00ff7f,
    steelblue:              0x4682b4,
    tan:                    0xd2b48c,
    thistle:                0xd8bfd8,
    tomato:                 0xff6347,
    turquoise:              0x40e0d0,
    violet:                 0xee82ee,
    wheat:                  0xf5deb3,
    whitesmoke:             0xf5f5f5,
    yellowgreen:            0x9acd32,
    rebeccapurple:          0x663399,
};



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// URLs.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IUrlProxy function represents an invocation of the CSS url() function.
 */
export interface IUrlProxy extends IGenericProxy<"url"> {};



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Images, filters, transforms, shapes, grids
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The ImageProxy interface represents an invocation of one of CSS functions that are used for
 * specifying images. This interface is returned from functions like [[linearGradient]],
 * [[crossFade]] and others.
 */
export interface IImageProxy extends IGenericProxy<"image"> {};

/**
 * The CssImage type represents a type used for CSS properties that accept the `<image>` type.
 * Image can be specified either using the [[url]] function that returns the [[IUrlProxy]]
 * interface or any of the functions that return the [[IImageProxy]] interface such as
 * [[linearGradient]], [[crossFade]] and others.
 */
export type CssImage = IUrlProxy | IImageProxy;

/**
 * The IFilterProxy interface represents an invocation of one the CSS `<filter>` functions.
 */
export interface IFilterProxy extends IGenericProxy<"filter"> {};

/**
 * The IBasicShapeProxy interface represents an invocation of one the CSS `<basic-shape>` functions
 * except the `path()` function.
 */
export interface IBasicShapeProxy extends IGenericProxy<"basic-shape"> {};

/**
 * The BasicShapeType represents an invocation of one the CSS `<basic-shape>` functions including
 * the `path()` function.
 */
export type BasicShape = IBasicShapeProxy | IPathBuilder;

/**
 * The IRayProxy function represents an invocation of one the CSS `ray()` functions.
 */
export interface IRayProxy extends IGenericProxy<"ray"> {};

/**
 * The ITransformProxy interface represents an invocation of one the CSS `<basic-shape>` functions.
 * It is returned from the multiple functions such as [[scale]], [[skew]] and others.
 */
export interface ITransformProxy extends IGenericProxy<"transform"> {};

/**
 * The IMinMaxProxy interface represents an invocation of the minmax() function. It is returned from
 * the [[minmax]] function.
 */
export interface IMinMaxProxy extends IGenericProxy<"minmax"> {}

/**
 * The IFitContentProxy interface represents an invocation of the CSS `fit-content()` function. It
 * is returned from the [[fitContent]] function.
 */
export interface IFitContentProxy extends IGenericProxy<"fit-content"> {}

/**
 * The IRepeatProxy interface represents an invocation of the CSS `repeat()` function. It is
 * returned from the [[repeat]] function.
 */
export interface IRepeatProxy extends IGenericProxy<"repeat"> {}

/**
 * The ISpanProxy interface produces the span expression for grid layouts. It is returned from
 * the [[span]] function.
 */
export interface ISpanProxy extends IGenericProxy<"span"> {}



/**
 * The `IPathBuilder` interface represents the object that accumulates path commands that are then
 * converted to a string parameter of the CSS `path()` function. The `IPathBuilder` interface is
 * returned from the [[path]] function.
 */
export interface IPathBuilder
{
    // Move-to command with absolute coordinates.
    M( first: [number,number], ...next: [number,number][]): IPathBuilder;

    // Move-to command with relative coordinates.
    m( first: [number,number], ...next: [number,number][]): IPathBuilder;

    // Line-to command with absolute coordinates.
	L( first: [number,number], ...next: [number,number][]): IPathBuilder;

    // Line-to command with relative coordinates.
    l( first: [number,number], ...next: [number,number][]): IPathBuilder;

    // Horizontal line-to command with absolute coordinates.
	H( first: number, ...next: number[]): IPathBuilder;

    // Horizontal line-to command with relative coordinates.
    h( first: number, ...next: number[]): IPathBuilder;

    // Vertical line-to command with absolute coordinates.
	V( first: number, ...next: number[]): IPathBuilder;

    // Vertical line-to command with relative coordinates.
    v( first: number, ...next: number[]): IPathBuilder;

    // Cubic bezier curve command with absolute coordinates.
	C( first: [number,number,number,number,number,number],
		...next: [number,number,number,number,number,number][]): IPathBuilder;

    // Cubic bezier curve command with relative coordinates.
	c( first: [number,number,number,number,number,number],
		...next: [number,number,number,number,number,number][]): IPathBuilder;

    // Smooth cubic bezier curve command with absolute coordinates.
	S( first: [number,number,number,number], ...next: [number,number,number,number][]): IPathBuilder;

    // Smooth cubic bezier curve command with relative coordinates.
	s( first: [number,number,number,number], ...next: [number,number,number,number][]): IPathBuilder;

    // Quadratic bezier curve command with absolute coordinates.
	Q( first: [number,number,number,number], ...next: [number,number,number,number][]): IPathBuilder;

    // Quadratic bezier curve command with relative coordinates.
	q( first: [number,number,number,number], ...next: [number,number,number,number][]): IPathBuilder;

    // Smooth quadratic bezier curve command with absolute coordinates.
	T( first: [number,number], ...next: [number,number][]): IPathBuilder;

    // Smooth quadratic bezier curve command with relative coordinates.
	t( first: [number,number], ...next: [number,number][]): IPathBuilder;

    // Elliptical arc curve command with absolute coordinates.
	A( first: [number,number,number,0|1,0|1,number,number],
		...next: [number,number,number,0|1,0|1,number,number][]): IPathBuilder;

    // Elliptical arc curve command with relative coordinates.
	a( first: [number,number,number,0|1,0|1,number,number],
		...next: [number,number,number,0|1,0|1,number,number][]): IPathBuilder;

    // Close-path command.
    z(): IPathBuilder;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Types used in different style contexts
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type used for several properties */
export type GeometryBoxKeyword = "margin-box" | "border-box" | "padding-box" | "content-box" |
    "fill-box" | "stroke-box" | "view-box";



/**
 * Type representing extent for the `radial-gradient()` or `ray()` CSS function.
 */
export type ExtentKeyword = "closest-corner" | "closest-side" | "farthest-corner" | "farthest-side";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// attr() function support
//
///////////////////////////////////////////////////////////////////////////////////////////////////

export type AttrTypeKeyword = "string" | "color" | "url" | "integer" | "number" | "length" | "angle" | "time" | "frequency";

export type AttrUnitKeyword = PercentUnits | LengthUnits | TimeUnits | AngleUnits | ResolutionUnits | FrequencyUnits;



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



