﻿import {ICustomVar, OneOrMany} from "../styles/UtilTypes";
import {IStyleset, Styleset, VarTemplateName, VarValueType} from "../styles/StyleTypes";
import {
	PseudoEntity, CssSelector, PagePseudoClass, IParameterizedPseudoEntity
} from "../styles/SelectorTypes";



/** Represents properties used in the [[ExtendedStyleset]] which are used to define dependent rules */
export type SelectorCombinator = "&" | "&," | "& " | "&>" | "&+" | "&~" | ",&" | " &" | ">&" | "+&" | "~&";



/**
 * The ExtendedStyleset type extends the Styleset type with certain properties that provide
 * additional meaning to the styleset and allow building nested styles:
 * - The `+` property specifies one or more parent style rules. This allows specifying
 *   parent rules using a convenient style-property-like notation.
 * - Properties with pseudo class names (e.g. ":hover") or pseudo element names (e.g. "::after").
 *   These properties define a styleset that will be assigned to the selector obtained by using
 *   the original styleset's owner followed by the given pseudo class or pseudo element.
 * - Properties with names of parameterized pseudo classes (e.g. ":nth-child") or parameterized
 *   pseudo elements (e.g. "::slotted"). These properties contain a tuple, where the first
 *   element is the parameter for the selector and the second element is the stylset.
 *   These properties define a styleset that will be assigned to the selector obtained by using
 *   the original styleset's owner followed by the given pseudo class or pseudo element.
 * - Properties with the ampersand symbol ('&') that contain arrays of two-element tuples each
 *   defining a selector and a style corresponding to this selector. Selectors can use the
 *   ampersand symbol to refer to the parent style selector. If the ampersand symbol is not used,
 *   the selector will be simply appended to the parent selector.
 * 
 * Functions that return style rules (e.g. $class) accept the ExtendedStyleset as a parameter,
 * for example:
 * 
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     class1 = css.$class({})
 *     class2 = css.$class({
 *         backgroundColor: "white",
 *         ":hover" : { backgroundColor: "grey" },
 *         "&": [
 *             [ "li > &", { backgroundColor: "yellow" } ],
 *             [ this.class1, { backgroundColor: "orange" } ]
 *         ]
 *     })
 * }
 * ```
 * 
 * This will translate to the following CSS (class name is auto-generated):
 * 
 * ```css
 * .m123 { backgroundColor: white; }
 * .m123:hover { backgroundColor: grey; }
 * li > .m123 { backgroundColor: yellow; }
 * .m123.m122 { backgroundColor: orange; }
 * ```
 */
export type ExtendedStyleset = Styleset &
	{ "+"?: IStyleRule | IStyleRule[] } &
	{ [K in PseudoEntity]?: ExtendedStyleset } &
	{ [K in keyof IParameterizedPseudoEntity]?: [IParameterizedPseudoEntity[K], ExtendedStyleset][] } &
	{ [K in SelectorCombinator]?: [CssSelector, ExtendedStyleset][] };




/**
 * The IRule interface is a base interface that is implemented by all rules.
 */
export interface IRule
{
	/** SOM rule */
	readonly cssRule: CSSRule | null;
}



/**
 * The INamedRule interface is a base interface implemented by all rules that have a name; that is,
 * class, ID, keyframes and custom CSS property.
 */
export interface INamedEntity
{
	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	readonly name: string;
}



/**
 * Type representing an object that contains dependent rules of a style rule
 */
export type DependentRules =
	{ [K in PseudoEntity]?: IStyleRule } &
	{ [K in SelectorCombinator]?: IStyleRule[] } &
	{ [K in keyof IParameterizedPseudoEntity]?: IStyleRule[] };




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
	readonly cssRule: CSSStyleRule | null;

	/** CSS rule selector string */
	readonly selectorText: string;

	/**
	 * Object containing dependent rules. Property names are taken from special properties
	 * of the ExtendedStyleset. This object allows callers to access dependent rules to change
	 * style property values programmatically.
	 */
	readonly dependentRules: DependentRules;

	/**
	 * Adds/replaces/removes the value of the given CSS property in this rule.
	 * @param name Name of the CSS property.
	 * @param value New value of the CSS property. If this value is undefined or null, the property
	 * is removed from the rule's styleset.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	setProp<K extends keyof IStyleset>( name: K, value: IStyleset[K], important?: boolean): void;

	/**
	 * Adds/replaces/removes the value of the given custmom CSS property in this rule.
	 * @param customVar IVarRule object defining a custom CSS property.
	 * @param value New value of the custom CSS property. If this value is undefined or null, the property
	 * is removed from the rule's styleset.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	setCustomProp<K extends VarTemplateName>( customVar: IVarRule<K>, value: VarValueType<K>, important?: boolean): void;
}



/**
 * The INamedStyleRule interface combines IStyleRule and INamedEntity interfaces. This is used
 * for class and ID rules.
 */
export interface INamedStyleRule extends IStyleRule, INamedEntity
{
}



/**
 * The IClassRule interface represents a style rule where the selector is a single class name.
 */
export interface IClassRule extends INamedStyleRule
{
	/** Name of the class prefixed with "." */
	readonly cssClassName: string;
}



/**
 * The IIDRule interface represents a style rule where the selector is a single element ID.
 */
export interface IIDRule extends INamedStyleRule
{
	/** Name of the element ID prefixed with "#" */
	readonly cssIDName: string;
}



/**
 * The AnimationWaypoint type defines a type that can be used to define a waypoint in an
 * animation sequence.
 */
export type AnimationWaypoint = OneOrMany<"from" | "to" | number>;

/**
 * The AnimationStyles type defines a object containing style proprties for an animation frame.
 * Stylesets for keyframes allow custom properties (via "--") but do not allow the !important
 * flag ("!"). Animation styleset can extend other style rules; however, any dependent rules
 * will be ignored.
 */
export type AnimationStyleset = Omit<Styleset,"!"> & { "+"?: IStyleRule | IStyleRule[] };

/**
 * The AnimationFrame type defines a single keyframe within a @keyframes rule.
 * The waypoint can be specified as "from" or "to" strings or as a number 0 to 100, which will be
 * used as a percent. Styleset for a keyframe allows custom properties (via "--") but do not
 * allow the !important flag ("!").
 */
export type AnimationFrame = [AnimationWaypoint, AnimationStyleset];

/**
 * The IAnimationRule interface represents the @keyframes rule.
 * Objects implementing this interface are returned from the [[$keyframes]] function.
 */
export interface IAnimationRule extends IRule, INamedEntity
{
	/** SOM keyframes rule */
	readonly cssRule: CSSKeyframesRule | null;

	/** List of style rules representing animation frames */
	readonly frameRules: IAnimationFrameRule[];
}

/**
 * The IAnimationFrameRule interface represents a single frame in the @keyframes rule.
 */
export interface IAnimationFrameRule extends IStyleRule
{
	/** Identifier of the waypoint */
	readonly waypoint: AnimationWaypoint;

	/** SOM keyframe rule */
	readonly cssKeyframeRule: CSSKeyframeRule;
}



/**
 * The IVarRule interface represents a CSS custom property definition.
 * Objects implementing this interface are returned from the [[$var]] function.
 */
export interface IVarRule<K extends VarTemplateName = any> extends INamedEntity, ICustomVar<VarValueType<K>>
{
	/** Name of a non-custom CSS property whose type determines the type of the custom property value. */
	readonly template: K;
}



/**
 * The ICounterRule interface represents a named counter definition. Use this rule to create
 * counter objects that can be used in counter-increment, counter-reset and counter-set style
 * properties. No CSS rule is created for counters - they are needed only to provide type-safe
 * counter definitions.
 * Objects implementing this interface are returned from the [[$counter]] function.
 */
export interface ICounterRule extends INamedEntity
{
	/** Name of the counter */
	readonly counterName: string;
}



// /**
//  * The ICounterRule interface represents the @counter-style rule.
//  * Objects implementing this interface are returned from the [[$counterStyle]] function.
//  */
// export interface ICounterStyleRule extends IRule, INamedEntity
// {
// 	/** SOM counter-style rule */
// 	readonly cssRule: CSSCounterStyleRule | null;
// }



/**
 * The IImportRule interface represents the CSS @import rule.
 * Objects implementing this interface are returned from the [[$import]] function.
 */
export interface IImportRule extends IRule
{
	/** SOM import rule */
	readonly cssRule: CSSImportRule | null;
}



/**
 * The IFontFaceRule interface represents the CSS @font-face rule.
 * Objects implementing this interface are returned from the [[$fontface]] function.
 */
export interface IFontFaceRule extends IRule
{
	/** SOM font-face rule */
	readonly cssRule: CSSFontFaceRule | null;
}



/**
 * The INamespaceRule interface represents the CSS @namespace rule.
 * Objects implementing this interface are returned from the [[$namespace]] function.
 */
export interface INamespaceRule extends IRule
{
	/** Namespace string for the rule */
	readonly namespace: string;

	/** Optional prefix for the rule */
	readonly prefix: string | undefined;

	/** SOM namespace rule */
	readonly cssRule: CSSNamespaceRule | null;
}



/**
 * The IPageRule interface represents the CSS @page rule.
 * Objects implementing this interface are returned from the [[$page]] function.
 */
export interface IPageRule extends IStyleRule
{
	/** Optional name of the page pseudo style (e.g. "":first") */
	readonly pseudoClass: PagePseudoClass | undefined;

	/** SOM namespace rule */
	readonly cssRule: CSSPageRule | null;
}



/**
 * Symbol that is used for the property in the StyleDefinition class that keeps reference to the
 * top-level style definition class. Developers can use this property to access rules in the
 * chain of nested grouping rules. We need to avoid enumerating this property when processing
 * the rules in the style definition object.
 */
export const symOwner = Symbol("owner");



/**
 * The StyleDefinition class is a base for all classes that contain defininitions of CSS rules.
 * Use it the following way:
 * 
 * ```typescript
 * class MyStyles extend StyleDefinition
 * {
 *     // 8px padding on regular devices
 *     defaultPadding = $var( "padding", 8)
 * 
 *     ifNarrowDevice = $media( {maxWidth: 600 },
 *         class extends StyleDefinition<MyStyles>
 *         {
 *             // 4px padding on narrow devices
 *             defaultPadding = $var( "padding", Len.calc( "{0} / 2", this.owner.defaultPadding))
 *         }
 *     )
 * }
 * ```
 * @typeparam O Top-level style definition class, which is the owner of this class.
 */
export abstract class StyleDefinition<O extends StyleDefinition = any>
{
	/**
	 * Style definition classes are created directly only by the *styled components* - that is,
	 * components that use different styles for each instance. Otherwise, style definition
	 * class instances are created when either the [[$use]] or [[$activate]] function is called.
	 * @param owner Reference to the top-level style definition class
	 */
	public constructor( owner: O | null = null)
	{
		this[symOwner] = owner;
	}

	/**
	 * Refers to the singleton instance of the style definition class which is the *owner* of
	 * this style definition object. The owner is the top-level class in the chain of style
	 * definition classes. Through this memeber, all rules and other memebers defined in the owner
	 * definition class can be accessed.
	 */
	public get owner(): O | null { return this[symOwner]; }
}



/**
 * "Constructor" interface defining how style definition classes can be created.
 */
export interface IStyleDefinitionClass<T extends StyleDefinition<O> = any, O extends StyleDefinition = any>
{
	/** All style definition classes should conform to this constructor */
	new( owner?: O): T;
}



/**
 * The ISupportRule interface represents the CSS @supports rule.
 * Objects implementing this interface are returned from the [[$supports]] function.
 */
export interface IGroupRule<T extends StyleDefinition = any> extends IRule
{
	// Instance of the style definition class defining the rules under this grouping rule
	readonly rules: T;

	/** SOM supports rule */
	readonly cssRule: CSSGroupingRule | null;
}



/**
 * The ISupportRule interface represents the CSS @supports rule.
 * Objects implementing this interface are returned from the [[$supports]] function.
 */
export interface ISupportsRule<T extends StyleDefinition = any> extends IGroupRule<T>
{
	/** SOM supports rule */
	readonly cssRule: CSSSupportsRule | null;
}



/**
 * The IMediaRule interface represents the CSS @media rule.
 * Objects implementing this interface are returned from the [[$media]] function.
 */
export interface IMediaRule<T extends StyleDefinition = any> extends IGroupRule<T>
{
	/** SOM media rule */
	readonly cssRule: CSSMediaRule | null;
}



