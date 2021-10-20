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
 * interface are implemented by different Mimcss functions. For example, [[IRawProxy]] interface
 * is implemented by the [[raw]] function, [[IStringProxy]] interface is implemented by the
 * [[attr]], [[counter]] and [[counters]] functions, and so on.
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
 * The ICssFuncObject interface is a base for all interfaces representing objects that describe
 * calls to a CSS function. Every such interface gives a unique value (or a unique set of values)
 * to the `fn` member.
 */
export interface ICssFuncObject
{
    fn: string;
}



/**
 * The `IRawProxy` interface represents a function that returns a string, which is ready to be
 * used in CSS rules. This function is part of type definition for all CSS properties - even for
 * those that don't have `string` as part of their type.
 *
 * All CSS properties should accept string as the type of their value even if normally
 * they accept other types (e.g a set of string literals as `"red" | "green" | ...` for the
 * color) property. This is because in addition to their normal values any property
 * can use custom CSS property in the form `var(--propname)`. However, if we add string type
 * to the set of string literals (e.g. `"red" | "green" | string`), this throws off the
 * Intellisense and it doesn't prompt developers for the possible values. The `IRawProxy`
 * interface is used instead of string and this solves the Intellisense issue.
 *
 * In addition, sometimes it can be easier for the developers to specify an already pre-formatted
 * CSS string as property value - maybe because it is obtained from some external source. The
 * `IRawProxy` callabcle interface is returned from the [[raw]] function, which allows by-passing
 * the property typing rules and specifying a string directly.
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
 *     cls1 = this.$class({ border: css.raw`1px solid brown` })
 *
 *     // using custom function
 *     cls2 = this.$class({ clip-path: randomCircle()})
 * }
 *
 * // create CSS circle function with random radius between 30 and 50 pixels
 * function randomCircle(): css.IRawProxy
 * {
 *     // returns a function that returns a string
 *     return () => `circle(${Math.floor(Math.random() * 21) + 30})`;
 * }
 * ```
 */
export interface IRawProxy extends IGenericProxy<"raw"> {}



/**
 * Represents a callable interface that is returned by functions that can be used in string
 * context, such as [[attr]] and [[counter]].
 */
export interface IStringProxy extends IGenericProxy<"string"> {}



/**
 * Represents the `<string>` CSS type, which is either a quated string or functions that can be
 * used in string context, such as `attr()` and `counter()`
 */
export type CssString = string | IStringProxy;



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
 * - [[IRawProxy]] interface that allows specifying a function that returns a raw string value.
 *
 * Developers don't usually use this type directly - it is used by Mimcss to define style property
 * types as well as function parameter types.
 */
export type Extended<T> = T | ICustomVar<T> | IConstant<T> | IRawProxy | null | undefined;



/**
 * Type that encapsulates the type of property in an object with a single "!" property. This
 * type is used to indicate that the property value must be flagged as "!important".
 *
 * **Example**
 * ```typescript
 * class MyStyles extends StyleDefinition
 * {
 *     // Equivalent to CSS: .cls1 { color: red; background-color: beige !important; }
 *     cls1 = this.$class({
 *         color: "red",
 *         backgroundColor: { "!": "beige" }
 *     })
 * }
 * ```
 */
export type ImportantProp<T> = { "!": Extended<T> | Global_StyleType };



/**
 * The ExtendedProp extends the given generic type with the following elements:
 * - [[ICustomVar]] interface that allows using a CSS custom property rule value.
 * - [[IConstant]] interface that allows using a constant rule value.
 * - [[IRawProxy]] interface that allows specifying raw string value.
 * - Object with a single property "!", which is used to mark a property as "!important".
 * - [[Global_StyleType]], which allows any property to be assigned the global values such as
 *   "initial", "inherit", "unset" and "revert".
 *
 *  Developers don't usually use this type directly - it is used by Mimcss to define types
 * of properties in the [[Styleset]] interface.
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
 * single value, in which case it applies to both dimensions. For example, it is used by style
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
 *     cls1 = this.$class({ overflow: "auto" })

 *     // two values
 *     cls2 = this.$class({ overflow: ["scroll", "hidden"] })
 * }
 * ```
 */
export type OneOrPair<T> = T | [Extended<T>, Extended<T>?];

/**
 * Type for box-like properties that can have 1 to 4 values of the given type. This type is used
 * for style properties that specify values for the four sides of an element box and have rules how
 * specifying 1, 2 or 3 values determine the values applied to all four sides. For example, it is
 * used by style properties such as `margin`, `padding`, `border-color` and others.
 *
 * @typeparam T Type of the values
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // single value
 *     cls1 = this.$class({ margin: 4 })
 *
 *     // two values
 *     cls2 = this.$class({ margin: [0, 8] })
 *
 *     // three values
 *     cls3 = this.$class({ margin: [6, 6, 8] })
 *
 *     // four values
 *     cls4 = this.$class({ margin: [4, 6, 8, 12] })
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
 *     cls1 = this.$class({ transform: scale(0.5) })
 *
 *     // several values
 *     cls2 = this.$class({ transform: [scale(0.5, rotate(90), translateX(200))] })
 * }
 * ```
 */
export type OneOrMany<T> = T | Extended<T>[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Selectors
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The `IRuleWithSelector` interface represents an entity that has a selector string. These include
 * all style rules ([[IStyleRule]] interface) and class name rule ([[IClassNameRule]] interface).
 */
export interface IRuleWithSelector
{
    /** CSS rule selector string */
    readonly selectorText: string;
}



/**
 * The `ISelectorProxy` function returns a CSS selector string. This type is returned from the
 * [[selector]] function.
 */
export interface ISelectorProxy extends IGenericProxy<"selector"> {};

/**
 * Represents CSS selector combinators used when creating complex CSS selectors.
 */
export type SelectorCombinator = "," | " " | ">" | "+" | "~";

/**
 * Represents properties used in the [[CombinedStyleset]] which are used to define dependent rules.
 * Property values are defined as arrays of two-element tuples each defining a selector and a
 * styleset corresponding to this selector. Selectors can use the ampersand symbol to refer to the
 * parent style selector. If the ampersand symbol is not used, the selector will be simply appended
 * to the parent selector.
 *
 * The ampersand symbol can be either preceeded or folowed by a combinator character, which allows
 * easy-to-use combination of a parent selector with the specified selector using the given
 * combinator.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // class that doesn't define its own styles and is only used in combinations
 *     class1 = this.$class()
 *
 *     // "parent class"
 *     class2 = this.$class({
 *
 *         // css: .class2 { backgroundColor: white; }
 *         backgroundColor: "white",
 *
 *         // css: li .class2:hover { backgroundColor: yellow; }
 *         "&":  [ ["li &:hover", { backgroundColor: "yellow" }] ],
 *
 *         // css: .class2.class1 { backgroundColor: cyan; }
 *         "&":  [ [this.class1, { backgroundColor: "cyan" }] ],
 *
 *         // css: .class2 > .class1 { backgroundColor: green; }
 *         "&>": [ [this.class1, { backgroundColor: "green" }] ],
 *
 *         // css: .class1 + .class2 { backgroundColor: orange; }
 *         "+&": [ [this.class1, { backgroundColor: "orange" }] ],
 *     })
 * }
 * ```
 */
export type DependentRuleCombinator = "&" | "&," | "& " | "&>" | "&+" | "&~" | ",&" | " &" | ">&" | "+&" | "~&";



/**
 * Represents print-related pseudo classes - those that can be specified with the `@page` CSS rule
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     page = this.$page( ":first", { margin: "auto" })
 * }
 * ```
 */
export type PagePseudoClass = ":blank" | ":first" | ":left" | ":right";



/**
 * Represents pseudo classes that can be used as properties in the [[CombinedStyleset]] object to
 * define dependent rules. Note that this type only contains pseudo classes that don't require
 * parameters. For parameterized pseudo classes, see the [[IParameterizedPseudoClass]] interface.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     class1 = this.$class({
 *         backgroundColor: "blue",
 *         ":hover": { opacity: 0.7 },
 *     })
 * }
 * ```
 */
export type PseudoClass = PagePseudoClass |
	":active" | ":any-link" | ":blank" | ":checked" | ":default" | ":defined" | ":disabled" |
	":empty" | ":enabled" | ":first-child" | ":first-of-type" | ":fullscreen" | ":focus" |
	":focus-visible" | ":focus-within" | ":hover" | ":indeterminate" | ":in-range" | ":invalid" |
	":last-child" | ":last-of-type" | ":link" | ":only-child" | ":only-of-type" | ":optional" |
	":out-of-range" | ":placeholder-shown" | ":read-only" | ":read-write" | ":required" | ":root" |
	":scope" | ":target" | ":valid" | ":visited" | ":dir(rtl)" | ":dir(ltr)";



/**
 * Represents pseudo elements that can be used as properties in the [[CombinedStyleset]] object to
 * define dependent rules. Note that this type only contains pseudo elements that don't require
 * parameters. For parameterized pseudo elements, see the [[IParameterizedPseudoElement]] interface.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     exciting = this.$class({
 *         "::after": {
 *             content: " <- EXCITING!"
 *             color: "green"
 *         },
 *     })
 * }
 * ```
 */
export type PseudoElement = "::after" | "::backdrop" | "::before" | "::cue" | "::first-letter" |
	"::first-line" | "::grammar-error" | "::marker" | "::placeholder" | "::selection" | "::spelling-error";



/** Combines names of non-parameterized pseudo classes and pseudo elements */
export type PseudoEntity = PseudoClass | PseudoElement;



/**
 * Type for expression An+B, which is used for parameterized pseudo classes like `:nth-child`. It
 * can be a string, a single number or a tuple with one or two numbers. If it is a single number,
 * the 'n' in An+B will not be used - as in `nth-child(2)`. If it is a tuple, the 'n' will be used
 * even if the tuple's second element is not provided.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     p = this.$tag( "p", {
 *         ":nth-of-type": [
 *
 *             // css: p:nth-of-type(1)
 *             [1, { color: "red" }],
 *
 *             // css: p:nth-of-type(3n)
 *             [[3], { color: "green" }],
 *
 *             // css: p:nth-of-type(2n+1)
 *             [[2,1], { color: "blue" }],
 *
 *             // css: p:nth-of-type(odd)
 *             ["odd", { color: "yellow" }],
 *         ],
 *     })
 * }
 * ```
 */
export type NthChildExpression = "odd" | "even" | number | [number, number?] | string | IRawProxy;



/**
 * The `IParameterizedPseudoClass` interface maps names of pseudo classes that require parameters
 * to the types that are used to specify these parameters. When a parameterized pseudo class is
 * used as a property in the [[CombinedStyleset]] object, the value should be of the type from
 * this interface.
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
 * The `IParameterizedPseudoElement` interface maps names of pseudo elements that require parameters
 * to the types that can be used to specify these parameters. When a parameterized pseudo element
 * is used as a property in the [[CombinedStyleset]] object, the value should be of the type from
 * this interface.
 */
export interface IParameterizedPseudoElement
{
	"::part": string;
	"::slotted": string;
}



/**
 * The `IParameterizedPseudoEntity` interface combines [[IParameterizedPseudoClass]] and
 * [[IParameterizedPseudoElement]] interfaces.
 */
export interface IParameterizedPseudoEntity extends IParameterizedPseudoClass, IParameterizedPseudoElement {}



/**
 * Type for a single selector token that can be used as an argument to the [[selector]] function
 */
export type SelectorItem = string | SelectorCombinator | IRuleWithSelector | IRawProxy | ISelectorProxy;



/**
 * Type for a CSS selector. This type is used to produce arbitrary complex selectors used by the
 * [[$style]] function.
 */
export type CssSelector = OneOrMany<Extended<SelectorItem>>;



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



