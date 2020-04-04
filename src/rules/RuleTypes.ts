/**
 * This module defines types of object that represent CSS rules.
 */


import {Styleset, IStyleset} from "../styles/StyleTypes";
import {PseudoClass, PseudoElement} from "../styles/SelectorTypes";
import {SelectorType} from "../styles/SelectorTypes"


/** Utility type that represents all properties of type T that are of type U */
type PropsOfTypeOrNever<T,U> = { [K in keyof T]: T[K] extends U ? K : never };

/** Utility type that represents names of all properties of type T that are of type U */
type PropNamesOfType<T,U> = PropsOfTypeOrNever<T,U>[keyof T];

/** Utility type that represents string values mapped to names of properties of type T that are of type U. */
export type NamesOfPropsOfType<T,U> = { readonly [K in PropNamesOfType<T,U>]: string };

/** Type that represents all properties of type T that are of type U */
export type PropsOfType<T,U> = { readonly [K in PropNamesOfType<T,U>]: T[K] };



/**
 * The ExtendedStyleset type extends the Styleset type with certain properties that provide
 * additional meaning to the styleset and allow building nested styles:
 * - The `+` property specifies one or more parent style rules. This allows specifying
 *   parent rules using a convenient style-property-like notation.
 * - The `!` property specifies one or more names of styleset properties that shuld be
 *   considered "important". When the rule is inserted into DOM, the "!important" attribute is
 *   added to the property value.
 * - Properties with pseudo class names (e.g. ":hover") or pseudo element names (e.g. "::after").
 *   These properties define a styleset that will be assigned to the selector obtained by using
 *   the original styleset's owner followed by the given pseudo class or pseudo element.
 * - The "&" property that contains array of two-element tuples each defining a selector and a
 *   style corresponding to this selector. Selectors can use the ampersand symbol ('&') to refer
 *   to the parent style selector.
 * 
 * An ExtendedStyleset may not include a Styleset at all and only indicate one or more style
 * rule objects, which are treated as parents from which this styleset should inherit all
 * style properties.
 * 
 * Functions that return style rules (e.g. $class) accept the ExtendedStyleset as a parameter,
 * for example:
 * 
 * ```typescript
 * class MyStyles
 * {
 *     myClass = $class( {
 *         backgroundColor: "white",
 *         ":hover" : {
 *             backgroundColor: "gray"
 *         },
 *         "&": { selector: "li > &", style: {
 *            backgroundColor: "yellow"
 *         }}
 *     })
 * }
 * ```
 * 
 * This will translate to the following CSS (class name is auto-generated):
 * 
 * ```css
 * .m123 { backgroundColor: white; }
 * .m123:hover { backgroundColor: gray; }
 * li > .m123 { backgroundColor: yellow; }
 * ```
 */
export type ExtendedStyleset = IStyleRule | IStyleRule[] |
	(Styleset &
		{
			"+"?: IStyleRule | IStyleRule[],
			"!"?: keyof IStyleset | (keyof IStyleset)[],
			"&"?: [SelectorType, ExtendedStyleset][],
		} &
		{ [K in PseudoClass | PseudoElement]?: ExtendedStyleset }
	);



/**
 * The RuleType enumeration lists types of rules that Mimcss library works with.
 */
export const enum RuleType
{
    TAG = 1,
    CLASS,
    ID,
    SELECTOR,
    ANIMATION,
    KEYFRAME,
    SUPPORTS,
    MEDIA,
    FONTFACE,
    IMPORT,
    NAMESPACE,
    PAGE,
	VIEWPORT,
	DOCUMENT,

	// not real rules but derive from the Rule object
    SCOPE = 50,
	ABSTRACT,
	NESTED,
}



/**
 * The IRule interface is a base interface that is implemented by all rules.
 */
export interface IRule
{
	/** Name of the property on the rule definition object to which this rule is assigned. */
	readonly ruleName: string;

	/** Type of the rule */
	readonly ruleType: RuleType;

	/** SOM rule */
	readonly cssRule: CSSRule;
}



/**
 * The INamedRule interface is a base interface implemented by all rules that have a name; that is,
 * class, ID, animation and custom CSS property.
 */
export interface INamedRule extends IRule
{
	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	readonly name: string;

	/**
	 * Rule's name - this is a name that has the prefix that is used when referring to classes (.),
	 * IDs (#) and custom CSS properties (--). For animations, this name is the same as in the
	 * `name` property.
	 */
	readonly cssName: string;
}



/**
 * The IStyleRule interface represents a styling rule in a style sheet. Style rules can be used
 * anywhere where style properties can be defined: class rules, ID rules, selector rules,
 * keyframes, etc. StyleRule defines a styleset and can optionally point to one or more style rules
 * from which it inherits. A styleset combines all the properties from its own property block as
 * well as from all of style rules it inherites from.
 */
export interface IStyleRule extends IRule
{
	/** SOM style rule */
	readonly cssStyleRule: CSSStyleRule;

	/**
	 * Adds/replaces the value of the given CSS property in this rule.
	 * @param name Name of the CSS property.
	 * @param value New value of the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	setProp<K extends keyof IStyleset>( name: K, value: IStyleset[K], important?: boolean): void;

	/**
	 * Adds/replaces the value of the given custmom cSS property in this rule.
	 * @param customVar ICUstomVar object defining a custom CSS property.
	 * @param value New value of the custom CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	setCustomProp<T>( customVar: ICustomVar<T>, value: T, important?: boolean): void;
}



/**
 * The IAbstractRule interface represents a style rule that can only be used as a base for other
 * style rules. No CSSStyleRule objects are created for the abstract rules.
 */
export interface IAbstractRule extends IStyleRule
{
	/** Flag, which is always true, that is needed to distinguish abstract rules from other rules */
	readonly isAbstractRule: boolean;
}



/**
 * The ITagRule interface represents a style rule that applies to elements identified by a tag name.
 */
export interface ITagRule extends IStyleRule
{
	/** Name of the HTML tag */
	readonly tag: string;
}



/**
 * The IClassRule interface represents a style rule that applies to elements identified by a class.
 */
export interface IClassRule extends IStyleRule, INamedRule
{
	/** Flag, which is always true, that is needed to distinguish class rules from other rules */
	readonly isClassRule: boolean;
}



/**
 * The IIDRule interface representsa a style rule that applies to elements identified by an ID.
 */
export interface IIDRule extends IStyleRule, INamedRule
{
	/** Flag, which is always true, that is needed to distinguish ID rules from other rules */
	readonly isIDRule: boolean;
}



/**
 * The ISelectorRule interface representsa a styleset that applies to elements identifies by the
 * given selector.
 */
export interface ISelectorRule extends IStyleRule
{
	/** CSS rule selector string */
	readonly selectorText: string;
}



/**
 * The IAnimationRule interface represents a @keyframes rule.
 */
export interface IAnimationRule extends INamedRule
{
	/** SOM keyframes rule */
	readonly cssKeyframesRule: CSSKeyframesRule;
}

/**
 * The AnimationFrame type defines a single keyframe within a @keyframes rule.
 * The waypoint can be specified as "from" or "to" strings or as a number 0 to 100, which will be
 * used as a percent.
 */
export type AnimationFrame = ["from" | "to" | number, ExtendedStyleset];



/**
 * The IGroupRule interface represents a CSS grouping rule.
 */
export interface IGroupRule<T = any> extends IRuleContainer<T>, IRule
{
	/** SOM grouping rule */
	readonly cssGroupRule: CSSGroupingRule;
}



/**
 * The ISupportRule interface represents a CSS @supports rule.
 */
export interface ISupportsRule<T = any> extends IGroupRule<T>
{
	/** SOM supports rule */
	readonly cssSupportsRule: CSSSupportsRule;
}



/**
 * The IMediaRule interface represents a CSS @media rule.
 */
export interface IMediaRule<T = any> extends IGroupRule<T>
{
	/** SOM media rule */
	readonly cssMediaRule: CSSMediaRule;
}



/**
 * The IImportRule interface represents a CSS @import rule.
 */
export interface IImportRule extends IRule
{
	/** SOM import rule */
	readonly cssImportRule: CSSImportRule;
}



/**
 * The IFontFaceRule interface represents a CSS @font-face rule.
 */
export interface IFontFaceRule extends IRule
{
	/** SOM font-face rule */
	readonly cssFontFaceRule: CSSFontFaceRule;
}



/**
 * The ICustomVar interface represents a CSS custom property definition.
 */
export interface ICustomVar<T = any>
{
	/**
	 * Name of the property on the rule definition object to which this rule is assigned.
	 */
	readonly ruleName: string;

	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	readonly name: string;

	/**
	 * Rule's name - this is a name that has the prefix that is used when referring to classes (.),
	 * IDs (#) and custom CSS properties (--). For animations, this name is the same as in the
	 * `name` property.
	 */
	readonly cssName: string;

	/** Name of a non-custom CSS property whose type determines the type of the custom property value. */
	readonly template: string;

	/** Sets new value of this custom CSS property. */

	/**
	 * Sets new value of this custom CSS property.
	 * @param value New value for the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	setValue( value: T, important?: boolean): void;
}



/**
 * Interface for rule definition objects. The interface doesn't define any properties or methods
 * but it allows defining the IRuleDefinitionClass "constructor" interface.
 */
export interface IRuleDefinition
{
}



/**
 * "Constructor" interface defining how rule definition classes can be created.
 */
export interface IRuleDefinitionClass<T extends IRuleDefinition>
{
	/** All rule definition classes should conform to this constructor */
	new(): T;
}



/**
 * The IRuleContainer interface represents an object that contains CSS rules.
 */
export interface IRuleContainer<T = IRuleDefinition>
{
	/** Map of names of properties defining class rules to actual class names. */
	readonly classes: NamesOfPropsOfType<T,IClassRule>;

	/** Map of names of properties defining ID rules to actual IDs. */
	readonly ids: NamesOfPropsOfType<T,IIDRule>;

	/** Map of names of properties defining animation rules to actual animation names. */
	readonly animations: NamesOfPropsOfType<T,IAnimationRule>;

	/** Map of names of properties defining custom property rules to the ICustomVar objects. */
	readonly vars: PropsOfType<T,ICustomVar>;

	/** Map of property names to rule objects. */
	readonly rules: PropsOfType<T,IRule>;

	/**  Map of property names to external stylesheets created using the $use function. */
	readonly uses: PropsOfType<T,IStylesheet>;
}



/**
 * "Constructor" interface defining how stylesheet definition classes can be created.
 */
export interface IStylesheetDefinitionClass<T> extends IRuleDefinitionClass<T>
{
	/** All stylesheet definition objects should conform to this constructor */
	new(): T;

	/**
	 * Flag inidicating that multiple stylesheets can be created for this stylesheet definition -
	 * each time with unique rule IDs. This is useful for styles created for a control - e.g. tree
	 * or accordeon - which can be used multiple times on the same page but with different styles.
	 * By default, stylesheet definitions are singular, that is a single instance of a stylesheet
	 * object is created for them and inserted into DOM.
	 */
	isMultiplex?: boolean;
}



/**
 * The IStylesheet interface represents the resultant stylesheet after the stylesheet definition
 * has been processed. The stylesheet object contains names of IDs, classes and animations, which
 * can be used in the application code. The interface also provides methods that are used to
 * manipulate the rules and their stylesets.
 */
export interface IStylesheet<T = any> extends IRuleContainer<T>
{
	/** DOM style element that contains CSS style sheet that contains rules defined by this stylesheet*/
	readonly domStyleElm: HTMLStyleElement;
}



