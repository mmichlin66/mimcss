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
 * The IGenericProxy interface represents a callable interface implemented by functions that
 * accept an optional parameter of a generic type and return a string. This interface is used as a
 * base for proxy interfaces defining types acceptable by certain style properties. The type
 * parameter helps differentiate these interfaces so that functions that can be assigned to one
 * type of style properties (e.g. `transform`) cannot be assigned to an incompatible style property
 * (e.g. `filter`).
 *
 * Developers don't implement this interface directly; instead, the interfaces derived from this
 * interface are implemented by different Mimcss functions. For example, [[IStringProxy]] interface
 * is implemented by the [[raw]] function, [[ITransformProxy]] interface is implemented by the
 * [[scale]], [[translate]] and other functions, [[IFilterProxy]] interface is implemented by
 * [[opacity]], [[contrast]] and other functions, and so on.
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
 * All CSS properties should accept string as the type of their value even if normally
 * they accept other types (e.g a set of string literals as `"red" | "green" | ...` for the
 * color) property. This is because in addition to their normal values any property
 * can use custom CSS property in the form `var(--propname)`. However, if we add string type
 * to the set of string literals (e.g. `"red" | "green" | string`), this throws off the
 * Intellisense and it doesn't prompt developers for the possible values. The `IStringProxy`
 * interface is used instead of string and this solves the Intellisense issue.
 *
 * This function is returned from the [[raw]] function, which allows by-passing the property
 * typing rules and specifying a string directly. This might be useful, when a string value is
 * obtained from some external calculations.
 *
 * Developers can create their own functions that return this callable interface and then invoke
 * these functions to assign values to style properties. Just make sure that the returned string
 * is the correct CSS string. Mimcss will use the string returned from custom functions without
 * checking its correctness. If the string is invalid for the property it is assigned to, the
 * resulting CSS rule will not have that property.
 *
 * **Example**
 * ```typescript
 * class MyStyles extends StyleDefinition
 * {
 *     // using `raw` function
 *     cls1 = css.$class({ border: css.raw`1px solid brown` })
 *
 *     // using custom function
 *     cls2 = css.$class({ clip-path: randomCircle()})
 * }
 *
 * // create CSS circle function with random radius between 30 and 50 pixels
 * function randomCircle(): css.IStringProxy
 * {
 *     // returns a function that returns a string
 *     return () => `circle(${Math.floor(Math.random() * 21) + 30})`;
 * }
 * ```
 */
export interface IStringProxy extends IGenericProxy<"string"> {}



/**
 * The `ICustomVar` interface represents a custom property with values of the given type. Every
 * style property can accept a custom CSS property value in the form of the `var()` CSS
 * function. Mimcss also allows defining "constants", which are a more lightweight way to provide
 * values that are used in other rules and properties. See the [[IConstant]] interface.
 *
 * The `ICustomVar` interface is extended by the [[IVarRule]] interface that is returned
 * from the [[$var]] function.
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
	 * Gets the value of the constant.
	 */
	getValue(): ExtendedProp<T>;
}



/**
 * Type that extends the given type with the following types:
 * - [[ICustomVar]] interface that allows using a CSS custom property rule value.
 * - [[IConstant]] interface that allows using a constant rule value.
 * - [[IStringProxy]] interface that allows specifying raw string value.
 */
export type Extended<T> = T | ICustomVar<T> | IConstant<T> | IStringProxy | null | undefined;



/**
 * Type that encapsulates the type of property in an object with a single "!" property. This
 * type is used to indicate that the property value must be flagged as "!important".
 *
 * **Example**
 * ```typescript
 * class MyStyles extends StyleDefinition
 * {
 *     // Equivalent to CSS: .cls1 { color: red; background-color: beige !important; }
 *     cls1 = css.$class({
 *         color: "red",
 *         backgroundColor: { "!": "beige" }
 *     })
 * }
 * ```
 */
export type ImportantProp<T> = { "!": ExtendedProp<T> };



/**
 * The ExtendedProp extends the given generic type with the following elements:
 * - [[ICustomVar]] interface that allows using a CSS custom property rule value.
 * - [[IConstant]] interface that allows using a constant rule value.
 * - [[IStringProxy]] interface that allows specifying raw string value.
 * - Object with a single property "!", which is used to mark a property as "!important".
 * - [[Global_StyleType]], which allows any property to be assigned the global values such as
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



/**
 * The IQuotedProxy function represents a string that will be taken into quotation marks
 */
 export interface IQuotedProxy extends IGenericProxy<"quoted"> {}



 ///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Selectors
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The `IRuleWithSelector` interface represents an entity that has a selector string.
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

/**
 * Represents properties used in the [[CombinedStyleset]] which are used to define dependent rules
 */
export type SelectorCombinator = "," | " " | ">" | "+" | "~";

/** Represents properties used in the [[CombinedStyleset]] which are used to define dependent rules */
export type DependentRuleCombinator = "&" | "&," | "& " | "&>" | "&+" | "&~" | ",&" | " &" | ">&" | "+&" | "~&";



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
export interface IParameterizedPseudoEntity extends IParameterizedPseudoClass, IParameterizedPseudoElement {}



/** Type for a single selector token that can be used as an argument to the [[selector]] function */
export type SelectorItem = string | IRuleWithSelector | IStringProxy | ISelectorProxy;



/**
 * Type for a CSS selector.
 */
export type CssSelector = OneOrMany<SelectorItem>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Web Namespaces.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The WebNamespaces enumeration provides identifiers for the known Web-related namespaces.
 */
export const enum WebNamespaces
{
    HTML = "http://www.w3.org/1999/xhtml",
    SVG = "http://www.w3.org/2000/svg",
    XLink = "http://www.w3.org/1999/xlink",
    XML = "http://www.w3.org/XML/1998/namespace",
    XMLNS = "http://www.w3.org/2000/xmlns/",
    MathML = "http://www.w3.org/1998/Math/MathML",
}



