import { IIDRule, INamespaceRule } from "./RuleTypes";
/**
 * Style values that can be used for any CSS property.
 */
export declare type Global_StyleType = "inherit" | "initial" | "unset" | "revert";
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
export interface IGenericProxy<T extends string = any> {
    (p?: T): string;
}
/**
 * The ICssFuncObject interface is a base for all interfaces representing objects that describe
 * calls to a CSS function. Every such interface gives a unique value (or a unique set of values)
 * to the `fn` member.
 */
export interface ICssFuncObject {
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
export interface IRawProxy extends IGenericProxy<"raw"> {
}
/**
 * Represents a callable interface that is returned by functions that can be used in string
 * context, such as [[attr]] and [[counter]].
 */
export interface IStringProxy extends IGenericProxy<"string"> {
}
/**
 * Represents the `<string>` CSS type, which is either a quated string or functions that can be
 * used in string context, such as `attr()` and `counter()`
 */
export declare type CssString = string | IStringProxy;
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
export interface ICustomVar<T = any> {
    /**
     * Sets new value of this custom CSS property at the global level; that is, under `:root`. To
     * set a value of the CSS custom property under a certain CSS rule, use the
     * [[IStyleRule.setCustomProp]] method.
     * @param value New value for the CSS property.
     * @param schedulerType ID of a registered scheduler type that is used to write the property
     * value to the DOM. If undefined, the current default scheduler will be used.
     */
    setValue(value: ExtendedProp<T>, schedulerType?: number): void;
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
export interface IConstant<T = any> {
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
export declare type Extended<T> = T | ICustomVar<T> | IConstant<T> | IRawProxy;
/**
 * Type that encapsulates the type of property in an object with a single "!" property. This
 * type is used to indicate that the property value must be flagged as "!important".
 *
 * **Example**
 * ```typescript
 * class MyStyles extends StyleDefinition
 * {
 *     // produces CSS: .cls1 { color: red; background-color: beige !important; }
 *     cls1 = this.$class({
 *         color: "red",
 *         backgroundColor: { "!": "beige" }
 *     })
 * }
 * ```
 */
export declare type ImportantProp<T> = {
    "!": Extended<T> | Global_StyleType;
};
/**
 * Type that allows specifying multiple values of a given type using an object with a single "[]"
 * property. This type is used to include multiple occurrencies of the same style property in a
 * styleset. This is useful when targeting advanced features not yet supported in all browsers and
 * providing a fallback, which is supported everywhere.
 *
 * **Example**
 * ```typescript
 * class MyStyles extends StyleDefinition
 * {
 *     cls1 = this.$class({
 *         backgroundImage: {"[]": [
 *             // first, specify a static image (supported everywhere)
 *             url("image.png"),
 *             // second, use paint worklet (not supported everywhere yet)
 *             paint("myPaintWorklet"),
 *         ]}
 *     })
 * }
 * ```
 *
 * This will produce the following CSS:
 *
 * ```css
 * .cls1 {
 *     backgroundImage: url("image.png");
 *     backgroundImage: paint("myPaintWorklet");
 * }
 * ```
 *
 */
export declare type MultiProp<T> = {
    "[]": (Extended<T> | ImportantProp<T> | Global_StyleType)[];
};
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
export declare type ExtendedProp<T> = Extended<T> | ImportantProp<T> | MultiProp<T> | Global_StyleType;
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
export declare type OneOrPair<T> = T | [Extended<T>, Extended<T>?];
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
export declare type OneOrBox<T> = T | [Extended<T>, Extended<T>?, Extended<T>?, Extended<T>?];
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
export declare type OneOrMany<T> = T | Extended<T>[];
/**
 * Type that combines names of all HTML and SVG tags
 */
export declare type ElementTagName = (keyof HTMLElementTagNameMap) | (keyof SVGElementTagNameMap) | "*";
/**
* The `IRuleWithSelector` interface represents an entity that has a selector string. These include
* all style rules ([[IStyleRule]] interface) and class name rule ([[IClassNameRule]] interface).
*/
export interface IRuleWithSelector {
    /** CSS rule selector string */
    readonly selectorText: string;
}
/**
 * The `ISelectorProxy` function returns a CSS selector string. This type is returned from the
 * [[selector]] function.
 */
export interface ISelectorProxy extends IGenericProxy<"selector"> {
}
/**
 * Represents CSS selector combinators used when creating complex CSS selectors.
 */
export declare type SelectorCombinator = "," | " " | ">" | "+" | "~" | "||";
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
export declare type DependentRuleCombinator = "&" | "&," | "& " | "&>" | "&+" | "&~" | ",&" | " &" | ">&" | "+&" | "~&";
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
export declare type PagePseudoClass = ":blank" | ":first" | ":left" | ":right";
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
export declare type PseudoClass = PagePseudoClass | ":active" | ":any-link" | ":autofill" | ":blank" | ":checked" | ":default" | ":defined" | ":disabled" | ":empty" | ":enabled" | ":first-child" | ":first-of-type" | ":fullscreen" | ":focus" | ":focus-visible" | ":focus-within" | ":host" | ":hover" | ":indeterminate" | ":in-range" | ":invalid" | ":last-child" | ":last-of-type" | ":left" | ":link" | ":only-child" | ":only-of-type" | ":optional" | ":out-of-range" | ":paused" | ":placeholder-shown" | ":read-only" | ":read-write" | ":required" | ":right" | ":root" | ":scope" | ":target" | ":valid" | ":visited";
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
export declare type PseudoElement = "::after" | "::backdrop" | "::before" | "::cue" | "::first-letter" | "::first-line" | "::grammar-error" | "::marker" | "::placeholder" | "::selection" | "::spelling-error";
/** Combines names of non-parameterized pseudo classes and pseudo elements */
export declare type PseudoEntity = PseudoClass | PseudoElement;
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
 *
 *             // css: p:nth-of-type(2n-1)
 *             [[2,-1], { color: "orange" }],
 *         ],
 *     })
 * }
 * ```
 */
export declare type NthExpression = "odd" | "even" | number | [number, number?] | string | IRawProxy;
/**
 * Defines the type for the text direction used for the `":dir"` pseudo class
 */
export declare type Direction = "rtl" | "ltr";
/**
 * The `IParameterizedPseudoClass` interface maps names of pseudo classes that require parameters
 * to the types that are used to specify these parameters. When a parameterized pseudo class is
 * used as a property in the [[CombinedStyleset]] object, the value should be of the type from
 * this interface.
 */
export interface IParameterizedPseudoClass {
    ":dir": Direction;
    ":has": CssSelector | [SelectorCombinator, CssSelector];
    ":host": string;
    ":host-context": string;
    ":is": CssSelector;
    ":lang": string;
    ":not": CssSelector;
    ":nth-child": NthExpression;
    ":nth-of-type": NthExpression;
    ":nth-last-child": NthExpression;
    ":nth-last-of-type": NthExpression;
    ":where": CssSelector;
}
/**
 * The `IParameterizedPseudoElement` interface maps names of pseudo elements that require parameters
 * to the types that can be used to specify these parameters. When a parameterized pseudo element
 * is used as a property in the [[CombinedStyleset]] object, the value should be of the type from
 * this interface.
 */
export interface IParameterizedPseudoElement {
    "::part": string;
    "::slotted": CssSelector;
}
/**
 * The `IParameterizedPseudoEntity` interface combines [[IParameterizedPseudoClass]] and
 * [[IParameterizedPseudoElement]] interfaces.
 */
export interface IParameterizedPseudoEntity extends IParameterizedPseudoClass, IParameterizedPseudoElement {
}
/**
 * Represents a selector for one or more namespaced tags; that is, tags accompanied by a namespace
 * prefix. This interface is returned from the [[tagNS]] function.
 */
export interface INSTagFunc extends ICssFuncObject {
    fn: "nstag";
    /** Namespace prefix string or reference to a namespace rule */
    ns: string | INamespaceRule;
    /** One or more element tag names */
    tags: "*" | ElementTagName | ElementTagName[];
    /** Optional selector combinator if more than one tag is given. Default is `","`. */
    comb?: SelectorCombinator;
}
/**
 * Represents an invocation of a parameterized pseudo entity with corresponding parameter.
 */
export interface IParameterizedPseudoEntityFunc<T extends keyof IParameterizedPseudoEntity> extends ICssFuncObject {
    /** Pseudo entity name */
    fn: T;
    /** Parameter of the pseudo entity */
    p: IParameterizedPseudoEntity[T];
}
/**
 * Enumeration for operations defining the behavior of attribute selector.
 */
export declare type AttrComparisonOperation = "=" | "~=" | "|=" | "^=" | "$=" | "*=";
/**
 * Represents an attribute selector defining its name, value and comparison operation.
 */
export interface IAttrSelectorFunc extends ICssFuncObject {
    fn: "attr-sel";
    /**
     * Attribute name.
     */
    name: string;
    /**
     * Value to which the attribute value is compared. If not specified, the selector only looks
     * for the presence of the attribute.
     */
    val?: string | boolean | number;
    /** Namespace of the attribute */
    ns?: string | INamespaceRule;
    /**
     * Operation that defines the attribute value comparison behavior. The default value is
     * [[AttrSelectorOperation.Equal]].
     */
    op?: AttrComparisonOperation;
    /**
     * Case flag indicating whether or not attribute value comparison is case-sensitive. The
     * undefined value corresponds to the case-sensitive comparisons.
     */
    cf?: "i" | "s";
}
/**
 * Represents a compound selector as an array of selectors. This interface is extended by the
 * [[ISelectorBuilder]] interface, which allows building a compound selector using chain calls.
 */
export interface ISelectorFunc extends ICssFuncObject {
    fn: "sel";
    /** Array of selector items that are combined together to produce a compound selector */
    items: CssSelector[];
}
/**
 * Provides means to build complex selectors from multiple selector items of all possible kinds
 * including tags, classess, IDs, attributes, pseudo classes and pseudo elements combined with
 * CSS combinators. This interface is returned from the [[sel]] function.
 */
export interface ISelectorBuilder extends ISelectorFunc {
    /**
     * Adds one or more selector items to immediately follow the existing selector and each other.
     * All items are concatenated and attached to the existing selector without any combinator.
     * Calling this method without any arguments doesn't have any effect.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: section.c1.c2 {...}
     *     s1 = css.$style( css.sel("section").and( this.c1, this.c2), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    and(...items: CssSelector[]): this;
    /**
     * Adds one or more selector items to the existing selector as a list of selectors. All items
     * are  concatenated and attached to the existing selector using the `","` combinator. Calling
     * this method without any arguments inserts the `","` combinator.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: section, .c1, .c2 {...}
     *     s1 = css.$style( css.sel("section").or( this.c1, this.c2), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    or(...items: CssSelector[]): this;
    /**
     * Adds one or more selector items to the existing selector as consecutive immediate children.
     * All items are concatenated and attached to the existing selector using the `">"` combinator.
     * Calling this method without any arguments inserts the `">"` combinator.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: section > .c1 > .c2 {...}
     *     s1 = css.$style( css.sel("section").child( this.c1, this.c2), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    child(...items: CssSelector[]): this;
    /**
     * Adds one or more selector items to the existing selector as consecutive descendants.
     * All items are concatenated and attached to the existing selector using the `" "` combinator.
     * Calling this method without any arguments inserts the `" "` combinator.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: section .c1 .c2 {...}
     *     s1 = css.$style( css.sel("section").desc( this.c1, this.c2), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    desc(...items: CssSelector[]): this;
    /**
     * Adds one or more selector items to the existing selector as consecutive general siblings.
     * All items are concatenated and attached to the existing selector using the `"~"` combinator.
     * Calling this method without any arguments inserts the `"~"` combinator.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: section ~ .c1 ~ .c2 {...}
     *     s1 = css.$style( css.sel("section").sib( this.c1, this.c2), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    sib(...items: CssSelector[]): this;
    /**
     * Adds one or more selector items to the existing selector as consecutive adjacent siblings.
     * All items are concatenated and attached to the existing selector using the `"+"` combinator.
     * Calling this method without any arguments inserts the `"+"` combinator.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: section + .c1 + .c2 {...}
     *     s1 = css.$style( css.sel("section").adj( this.c1, this.c2), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    adj(...items: CssSelector[]): this;
    /**
     * Adds an attribute selector to immediately follow the existing selector. This variant doesn't
     * accept comparison operation and, therefore, performs regular equality comparison. It also
     * allows omitting the value, in which case, only the presence of the attribute is checked.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // produces css: div:[title] {...}
     *     s1 = css.$style( css.sel("div").attr( "title"), {...})
     *
     *     // produces css: a:[href="https://www.example.com"] {...}
     *     s2 = css.$style( css.sel("a").attr( "href", "https://www.example.com"), {...})
     * }
     * ```
     * @param name Attribute name.
     * @param val Attribute value - if omitted, only attribute presence is checked.
     * @param cf Flag indicating whether or not attribute comparison is case insensitive. Undefined
     * value means the comparison is case sensitive.
     * @param ns Attribute's namespace.
     */
    attr(name: string, val?: string | boolean | number, cf?: "i" | "s", ns?: string | INamespaceRule): this;
    /**
     * Adds an attribute selector to immediately follow the existing selector.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // produces css: a:[href^="https://"] {...}
     *     s1 = css.$style( css.sel("a").attr( "href", "^=", "https://"), {...})
     * }
     * ```
     * @param name Attribute name.
     * @param op Attrbute comparison operation.
     * @param val Attribute value - if omitted, only attribute presence is checked.
     * @param cf Flag indicating whether or not attribute comparison is case insensitive. Undefined
     * value means the comparison is case sensitive.
     * @param ns Attribute's namespace.
     */
    attr(name: string, op: AttrComparisonOperation, val: string | boolean | number, cf?: "i" | "s", ns?: string | INamespaceRule): this;
    /** Adds the `":active"` pseudo class to immediately follow the existing selector */
    readonly active: this;
    /** Adds the `":any-link"` pseudo class to immediately follow the existing selector */
    readonly anyLink: this;
    /** Adds the `":autofill"` pseudo class to immediately follow the existing selector */
    readonly autofill: this;
    /** Adds the `":blank"` pseudo class to immediately follow the existing selector */
    readonly blank: this;
    /** Adds the `":checked"` pseudo class to immediately follow the existing selector */
    readonly checked: this;
    /** Adds the `":default"` pseudo class to immediately follow the existing selector */
    readonly default: this;
    /** Adds the `":defined"` pseudo class to immediately follow the existing selector */
    readonly defined: this;
    /**
     * Adds the `":dir()"` pseudo class with the given direction to immediately follow the
     * existing selector.
     */
    dir(direction: Direction): this;
    /** Adds the `":disabled"` pseudo class to immediately follow the existing selector */
    readonly disabled: this;
    /** Adds the `":empty"` pseudo class to immediately follow the existing selector */
    readonly empty: this;
    /** Adds the `":enabled"` pseudo class to immediately follow the existing selector */
    readonly enabled: this;
    /** Adds the `":first-child"` pseudo class to immediately follow the existing selector */
    readonly firstChild: this;
    /** Adds the `":first-of-type"` pseudo class to immediately follow the existing selector */
    readonly firstOfType: this;
    /** Adds the `":first"` pseudo class to immediately follow the existing selector */
    readonly first: this;
    /** Adds the `":focus-visible"` pseudo class to immediately follow the existing selector */
    readonly focusVisible: this;
    /** Adds the `":focus-within"` pseudo class to immediately follow the existing selector */
    readonly focusWithin: this;
    /** Adds the `":focus"` pseudo class to immediately follow the existing selector */
    readonly focus: this;
    /** Adds the `":fullscreen"` pseudo class to immediately follow the existing selector */
    readonly fullscreen: this;
    /** Adds the `":host"` pseudo class to immediately follow the existing selector */
    readonly host: this;
    /**
     * Adds the `":host()"` parameterized pseudo class to immediately follow the existing selector.
     * The method has the dollar-sign in its name to differentiate it from the property [[host]].
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: :host(.c1, .c2) {...}
     *     s = css.$style( css.sel().host$( this.c1, this.c2), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    host$(...items: CssSelector[]): this;
    /**
     * Adds the `":host-context()"` pseudo class to immediately follow the existing selector. If
     * multiple items are specified, they are interpreted as a list; that is, they are combined
     * using the `","` combinator.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: :host-context(.c1, .c2) {...}
     *     s = css.$style( css.sel().hostContext( this.c1, this.c2), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    hostContext(...items: CssSelector[]): this;
    /** Adds the `":hover"` pseudo class to immediately follow the existing selector */
    readonly hover: this;
    /** Adds the `":in-range"` pseudo class to immediately follow the existing selector */
    readonly inRange: this;
    /** Adds the `":indeterminate"` pseudo class to immediately follow the existing selector */
    readonly indeterminate: this;
    /** Adds the `":invalid"` pseudo class to immediately follow the existing selector */
    readonly invalid: this;
    /**
     * Adds the `":is()"` pseudo class to immediately follow the existing selector. If multiple
     * items are specified, they are interpreted as a list; that is, they are combined using
     * the `","` combinator.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: :is(.c1, .c2) > p:hover {...}
     *     s1 = css.$style( css.sel().is( this.c1, this.c2).child"p:hover"), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    is(...items: CssSelector[]): this;
    /**
     * Adds the `":lang()"` pseudo class with the given direction.
     */
    lang(langCode: string): this;
    /** Adds the `":last-child"` pseudo class to immediately follow the existing selector */
    readonly lastChild: this;
    /** Adds the `":last-of-type"` pseudo class to immediately follow the existing selector */
    readonly lastOfType: this;
    /** Adds the `":left"` pseudo class to immediately follow the existing selector */
    readonly left: this;
    /** Adds the `":link"` pseudo class to immediately follow the existing selector */
    readonly link: this;
    /**
     * Adds the `":not()"` pseudo class to immediately follow the existing selector. If multiple
     * items are specified, they are interpreted as a list; that is, they are combined using
     * the `","` combinator.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     fancy = css.$class({...})
     *
     *     // produces css: th.fancy:not(:nth-of-type(1)) {...}
     *     s1 = css.$style( css.sel("th").and(this.fancy).not( ":nth-of-type(1)"), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    not(...items: CssSelector[]): this;
    /**
     * Adds the `":nth-child()"` pseudo class with the given parameters.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // produces css: p:nth-child("odd") {...}
     *     s1 = css.$style( css.sel("p").nthChild("odd"), {...})
     *
     *     // produces css: p:nth-child(3) {...}
     *     s2 = css.$style( css.sel("p").nthChild(3), {...})
     *
     *     // produces css: p:nth-child(3n) {...}
     *     s3 = css.$style( css.sel("p").nthChild([3]), {...})
     *
     *     // produces css: p:nth-child(3n+1) {...}
     *     s4 = css.$style( css.sel("p").nthChild([3,1]), {...})
     *
     *     // produces css: p:nth-child(3n-1) {...}
     *     s5 = css.$style( css.sel("p").nthChild([3,-1]), {...})
     * }
     * ```
     * @param nthExpr String, number or tuple providing the value for the `"nth"` expression
     */
    nthChild(nthExpr: NthExpression): this;
    /**
     * Adds the `":nth-child()"` pseudo class with the given parameters.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // produces css: p:nth-child(3n+1) {...}
     *     s1 = css.$style( css.sel("p").nthChild(3, 1), {...})
     *
     *     // produces css: p:nth-child(3n-1) {...}
     *     s2 = css.$style( css.sel("p").nthChild(3, -1), {...})
     * }
     * ```
     * @param a Number before the `"n"` in the `"An+B"` expression
     * @param b Number after the `"+"` in the `"An+B"` expression. Use negative value
     * to create a `"An-B"` expression.
     */
    nthChild(a: number, b: number): this;
    /**
     * Adds the `":nth-last-child()"` pseudo class with the given parameters.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // produces css: p:nth-last-child("odd") {...}
     *     s1 = css.$style( css.sel("p").nthLastChild("odd"), {...})
     *
     *     // produces css: p:nth-last-child(3) {...}
     *     s2 = css.$style( css.sel("p").nthLastChild(3), {...})
     *
     *     // produces css: p:nth-last-child(3n) {...}
     *     s3 = css.$style( css.sel("p").nthLastChild([3]), {...})
     *
     *     // produces css: p:nth-last-child(3n+1) {...}
     *     s4 = css.$style( css.sel("p").nthLastChild([3,1]), {...})
     *
     *     // produces css: p:nth-last-child(3n-1) {...}
     *     s5 = css.$style( css.sel("p").nthLastChild([3,-1]), {...})
     * }
     * ```
     * @param nthExpr String, number or tuple providing the value for the `"nth"` expression
     */
    nthLastChild(nthExpr: NthExpression): this;
    /**
     * Adds the `":nth-last-child()"` pseudo class with the given parameters.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // produces css: p:nth-last-child(3n+1) {...}
     *     s1 = css.$style( css.sel("p").nthLastChild(3, 1), {...})
     *
     *     // produces css: p:nth-last-child(3n-1) {...}
     *     s2 = css.$style( css.sel("p").nthLastChild(3, -1), {...})
     * }
     * ```
     * @param a Number before the `"n"` in the `"An+B"` expression
     * @param b Number after the `"+"` in the `"An+B"` expression. Use negative value
     * to create a `"An-B"` expression.
     */
    nthLastChild(a: number, b: number): this;
    /**
     * Adds the `":nth-of-type()"` pseudo class with the given parameters.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // produces css: p:nth-of-type("odd") {...}
     *     s1 = css.$style( css.sel("p").nthOfType("odd"), {...})
     *
     *     // produces css: p:nth-of-type(3) {...}
     *     s2 = css.$style( css.sel("p").nthOfType(3), {...})
     *
     *     // produces css: p:nth-of-type(3n) {...}
     *     s3 = css.$style( css.sel("p").nthOfType([3]), {...})
     *
     *     // produces css: p:nth-of-type(3n+1) {...}
     *     s4 = css.$style( css.sel("p").nthOfType([3,1]), {...})
     *
     *     // produces css: p:nth-of-type(3n-1) {...}
     *     s5 = css.$style( css.sel("p").nthOfType([3,-1]), {...})
     * }
     * ```
     * @param nthExpr String, number or tuple providing the value for the `"nth"` expression
     */
    nthOfType(nthExpr: NthExpression): this;
    /**
     * Adds the `":nth-of-type()"` pseudo class with the given parameters.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // produces css: p:nth-of-type(3n+1) {...}
     *     s1 = css.$style( css.sel("p").nthOfType(3, 1), {...})
     *
     *     // produces css: p:nth-of-type(3n-1) {...}
     *     s2 = css.$style( css.sel("p").nthOfType(3, -1), {...})
     * }
     * ```
     * @param a Number before the `"n"` in the `"An+B"` expression
     * @param b Number after the `"+"` in the `"An+B"` expression. Use negative value
     * to create a `"An-B"` expression.
     */
    nthOfType(a: number, b: number): this;
    /**
     * Adds the `":nth-last-of-type()"` pseudo class with the given parameters.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // produces css: p:nth-last-of-type("odd") {...}
     *     s1 = css.$style( css.sel("p").nthLastOfType("odd"), {...})
     *
     *     // produces css: p:nth-last-of-type(3) {...}
     *     s2 = css.$style( css.sel("p").nthLastOfType(3), {...})
     *
     *     // produces css: p:nth-last-of-type(3n) {...}
     *     s3 = css.$style( css.sel("p").nthLastOfType([3]), {...})
     *
     *     // produces css: p:nth-last-of-type(3n+1) {...}
     *     s4 = css.$style( css.sel("p").nthLastOfType([3,1]), {...})
     *
     *     // produces css: p:nth-last-of-type(3n-1) {...}
     *     s5 = css.$style( css.sel("p").nthLastOfType([3,-1]), {...})
     * }
     * ```
     * @param nthExpr String, number or tuple providing the value for the `"nth"` expression
     */
    nthLastOfType(nthExpr: NthExpression): this;
    /**
     * Adds the `":nth-last-of-type()"` pseudo class with the given parameters.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // produces css: p:nth-last-of-type(3n+1) {...}
     *     s1 = css.$style( css.sel("p").nthLastOfType(3, 1), {...})
     *
     *     // produces css: p:nth-last-of-type(3n-1) {...}
     *     s2 = css.$style( css.sel("p").nthLastOfType(3, -1), {...})
     * }
     * ```
     * @param a Number before the `"n"` in the `"An+B"` expression
     * @param b Number after the `"+"` in the `"An+B"` expression. Use negative value
     * to create a `"An-B"` expression.
     */
    nthLastOfType(a: number, b: number): this;
    /** Adds the `":only-child"` pseudo class to immediately follow the existing selector */
    readonly onlyChild: this;
    /** Adds the `":only-of-type"` pseudo class to immediately follow the existing selector */
    readonly onlyOfType: this;
    /** Adds the `":optional"` pseudo class to immediately follow the existing selector */
    readonly optional: this;
    /** Adds the `":out-of-range"` pseudo class to immediately follow the existing selector */
    readonly outOfRange: this;
    /** Adds the `":paused"` pseudo class to immediately follow the existing selector */
    readonly paused: this;
    /** Adds the `":picture-in-picture"` pseudo class to immediately follow the existing selector */
    readonly pictureInPicture: this;
    /** Adds the `":placeholder-shown"` pseudo class to immediately follow the existing selector */
    readonly placeholderShown: this;
    /** Adds the `":playing"` pseudo class to immediately follow the existing selector */
    readonly playing: this;
    /** Adds the `":read-only"` pseudo class to immediately follow the existing selector */
    readonly readOnly: this;
    /** Adds the `":read-write"` pseudo class to immediately follow the existing selector */
    readonly readWrite: this;
    /** Adds the `":required"` pseudo class to immediately follow the existing selector */
    readonly required: this;
    /** Adds the `":right"` pseudo class to immediately follow the existing selector */
    readonly right: this;
    /** Adds the `":root"` pseudo class to immediately follow the existing selector */
    readonly root: this;
    /** Adds the `":scope"` pseudo class to immediately follow the existing selector */
    readonly scope: this;
    /** Adds the `":target"` pseudo class to immediately follow the existing selector */
    readonly target: this;
    /** Adds the `":valid"` pseudo class to immediately follow the existing selector */
    readonly valid: this;
    /** Adds the `":visited"` pseudo class to immediately follow the existing selector */
    readonly visited: this;
    /** Adds the `":user-invalid"` pseudo class to immediately follow the existing selector */
    readonly userInvalid: this;
    /** Adds the `":user-valid"` pseudo class to immediately follow the existing selector */
    readonly userValid: this;
    /**
     * Adds the `":where()"` pseudo class to immediately follow the existing selector. If multiple
     * items are specified, they are interpreted as a list; that is, they are combined using
     * the `","` combinator.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: :where(.c1, .c2) > p:hover {...}
     *     s1 = css.$style( css.sel().where( this.c1, this.c2).child("p:hover"), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    where(...items: CssSelector[]): this;
    /** Adds the `"::after"` pseudo element to immediately follow the existing selector */
    readonly after: this;
    /** Adds the `"::backdrop"` pseudo element to immediately follow the existing selector */
    readonly backdrop: this;
    /** Adds the `"::before"` pseudo element to immediately follow the existing selector */
    readonly before: this;
    /** Adds the `"::cue-region"` pseudo element to immediately follow the existing selector */
    readonly cueRegion: this;
    /** Adds the `"::cue"` pseudo element to immediately follow the existing selector */
    readonly cue: this;
    /** Adds the `"::first-letter"` pseudo element to immediately follow the existing selector */
    readonly firstLetter: this;
    /** Adds the `"::first-line"` pseudo element to immediately follow the existing selector */
    readonly firstLine: this;
    /** Adds the `"::grammar-error"` pseudo element to immediately follow the existing selector */
    readonly grammarError: this;
    /** Adds the `"::marker"` pseudo element to immediately follow the existing selector */
    readonly marker: this;
    /**
     * Adds the `"::part()"` pseudo element with the given parameter.
     */
    part(partName: string): this;
    /** Adds the `"::placeholder"` pseudo element to immediately follow the existing selector */
    readonly placeholder: this;
    /** Adds the `"::selection"` pseudo element to immediately follow the existing selector */
    readonly selection: this;
    /**
     * Adds the `"::slotted()"` pseudo element to immediately follow the existing selector. If
     * multiple items are specified, they are interpreted as a list; that is, they are combined
     * using the `","` combinator.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     c1 = css.$class({...})
     *     c2 = css.$class({...})
     *
     *     // produces css: ::slotted(.c1, .c2) {...}
     *     s1 = css.$style( css.sel().slotted( this.c1, this.c2)), {...})
     * }
     * ```
     * @param items List of selectors to be added
     */
    slotted(...items: CssSelector[]): this;
    /** Adds the `"::spelling-error"` pseudo element to immediately follow the existing selector */
    readonly spellingError: this;
    /** Adds the `"::target-text"` pseudo element to immediately follow the existing selector */
    readonly targetText: this;
}
/**
 * Type for a CSS selector. This type is used to produce arbitrary complex selectors used by the
 * [[$style]] function. If array is specified, all items are converted to strings and concatenated.
 */
export declare type CssSelector = ElementTagName | INSTagFunc | PseudoEntity | IRuleWithSelector | ISelectorProxy | ISelectorFunc | IAttrSelectorFunc | IParameterizedPseudoEntityFunc<any> | SelectorCombinator | IRawProxy | string | CssSelector[];
/**
 * Type for simple animation timing functions - those that don't have parameters
 *
 */
export declare type TimingFunctionKeywords = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "step-start" | "step-end";
/** Type for step animation timing function jump-term */
export declare type TimingFunctionJumpTerm = "jump-start" | "jump-end" | "jump-none" | "jump-both" | "start" | "end";
/**
 * The IStepsFunc interface represents an invocation of the CSS `steps()` function. It is returned
 * from the [[steps]] function.
 * @category Transition and Animation
 */
export interface IStepsFunc extends ICssFuncObject {
    fn: "steps";
    /** Number of stops */
    n: Extended<number>;
    /** Jump term */
    j?: TimingFunctionJumpTerm;
}
/**
 * The ICubicBezierFunc interface represents an invocation of the CSS `cubic-bezier()` function.
 * It is returned from the [[cubicBezier]] function.
 * @category Transition and Animation
 */
export interface ICubicBezierFunc extends ICssFuncObject {
    fn: "cubic-bezier";
    n1: Extended<number>;
    n2: Extended<number>;
    n3: Extended<number>;
    n4: Extended<number>;
}
/**
 * Type for single animation timing function
 *
 */
export declare type TimingFunction = TimingFunctionKeywords | IStepsFunc | ICubicBezierFunc;
/**
 * The IUrlFunc interface represents an invocation of the CSS `url()` function. It is returned from
 * the [[url]] function.
 */
export interface IUrlFunc extends ICssFuncObject {
    fn: "url";
    /** URL or reference to the ID rule identifying an SVG element */
    p: Extended<string | IIDRule>;
}
/**
 * The ICursorFunc interface represents an invocation of the CSS `url()` function with two optional
 * numbers indicating the cursor's hotspot.
 */
export interface ICursorFunc extends ICssFuncObject {
    fn: "cursor";
    /** Cursor URL or reference to the ID rule identifying an SVG element */
    url: Extended<string | IIDRule>;
    /** X-coordinate of the cursor hotspot */
    x?: number;
    /** Y-coordinate of the cursor hotspot */
    y?: number;
}
/**
 * Type representing extent for the [[radialGradient]] or [[ray]] functions.
 */
export declare type ExtentKeyword = "closest-corner" | "closest-side" | "farthest-corner" | "farthest-side";
/**
 * Represents an object that produces one of CSS gradient function. It can be directly assigned to
 * a suitable style property (e.g. background-image). Objects implementing this interface can be
 * used whereever gradients are used.
 */
export interface ICssImageFunc extends ICssFuncObject {
    fn: "linear-gradient" | "radial-gradient" | "conic-gradient" | "cross-fade" | "image-set" | "paint";
}
/**
 * The CssImage type represents a type used for CSS properties that accept the `<image>` type.
 * Image can be specified either using the [[url]] function that returns the [[IUrlFunc]]
 * interface or any of the functions that return the [[IImageProxy]] or [[ICssImageFunc]]
 * interface such as [[linearGradient]] and [[crossFade]].
 */
export declare type CssImage = IUrlFunc | ICssImageFunc;
/**
 * The WebNamespaces enumeration provides identifiers for the known Web-related namespaces.
 */
export declare const enum WebNamespaces {
    HTML = "http://www.w3.org/1999/xhtml",
    SVG = "http://www.w3.org/2000/svg",
    XLink = "http://www.w3.org/1999/xlink",
    XML = "http://www.w3.org/XML/1998/namespace",
    XMLNS = "http://www.w3.org/2000/xmlns/",
    MathML = "http://www.w3.org/1998/Math/MathML"
}
//# sourceMappingURL=CoreTypes.d.ts.map