/**
 * This module defines types of object that represent CSS rules.
 */


import {Styleset, PureStyleset, SupportsQuery} from "../styles/StyleTypes";
import {MediaQuery} from "../styles/MediaTypes"
import {Fontface} from "../styles/FontFaceTypes";


/** Utility type that represents all properties of type T that are of type U */
type PropsOfTypeOrNever<T,U> = { [K in keyof T]: T[K] extends U ? K : never };

/** Utility type that represents names of all properties of type T that are of type U */
type PropNamesOfType<T,U> = PropsOfTypeOrNever<T,U>[keyof T];

/** Utility type that represents string values mapped to names of properties of type T that are of type U. */
export type NamesOfPropsOfType<T,U> = { [K in PropNamesOfType<T,U>]: string };

/** Type that represents all properties of type T that are of type U */
export type PropsOfType<T,U> = { [K in PropNamesOfType<T,U>]: T[K] };



/**
 * The ExtendedStyleset type extends the Styleset type with certain properties that provide
 * additional meaning to the styleset:
 * - The `$extends` property specifies one or more parent style rules. This allows specifying
 *   parent rules using a convenient style-property-like notation. Parents can also be specified
 *   without a styleset.
 * - The `$important` property specifies one or more names of styleset properties that shuld be
 *   considered "important". When the rule is inserted into DOM, the "!important" attribute is
 *   added to the property value.
 */
export type ExtendedStyleset =
	(Styleset &
		{
			$extends?: IStyleRule | IStyleRule[],
			$important?: keyof PureStyleset | (keyof PureStyleset)[],
		}
	) | IStyleRule | IStyleRule[];





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

	// not real rules but derive from the Rule object
    VAR = 50,
    SCOPE = 51,
}



/**
 * The IRule interface is a base interface that is implemented by all rules. Its only purpose is to
 * provide the reference to the style scope that owns it.
 */
export interface IRule
{
	/**
	 * Name of the property on the rule definition object to which this rule is assigned.
	 */
	readonly ruleName: string;

	/** Type of the rule */
	readonly type: RuleType;

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
	/** Name of the CSS class */
	readonly class: string;
}



/**
 * The IIDRule interface representsa a style rule that applies to elements identified by an ID.
 */
export interface IIDRule extends IStyleRule, INamedRule
{
	/** ID of the HTML element */
	readonly id: string;
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
 * The Keyframe type defines a single keyframe within a @keyframes rule.
 */
export type Keyframe = ["from" | "to" | number, ExtendedStyleset];



/**
 * The IGroupRule interface represents a CSS grouping rule.
 */
export interface IGroupRule<T = any> extends IRuleContainer<T>
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
export interface ICustomVar<K extends keyof PureStyleset = any> extends INamedRule
{
	/**
	 * Name of a non-custom CSS property whose type determines the type of the custom property
	 * value.
	 */
	readonly templatePropName: K;

	/** Name of the CSS custom property */
	readonly varName: string;
}



/**
 * The ICustomVarRule interface represents a ":root" block with CSS custom property definitions.
 */
export interface ICustomVarRule<T = any> extends IRule
{
	/** Map of custom property names to property definitions */
	readonly vars: PropsOfType<T,ICustomVar>;

	/** SOM style rule */
	readonly cssStyleRule?: CSSStyleRule;
}



/**
 * Type that combines interfaces of rules that have names; auch rules have to be assigned to a
 * member property and cannot be be created by the addUnnamedRUles method.
 */
export type NamedRule = INamedRule;

/**
 * Type that combines interfaces of rules that don't have names; that is, they don't have to be
 * assigned to a member property and may be created by the addUnnamedRUles method.
 */
export type UnnamedRule = ITagRule | ISelectorRule | IGroupRule;



/**
 * The IRuleContainer interface represents an object that contains CSS rules.
 */
export interface IRuleContainer<T = IRuleDefinition> extends IRule
{
	/** Names of classes. */
	readonly classes: NamesOfPropsOfType<T,IClassRule>;

	/** Names of element identifiers. */
	readonly ids: NamesOfPropsOfType<T,IIDRule>;

	/** Names of animations. */
	readonly animations: NamesOfPropsOfType<T,IAnimationRule>;

	/** Names of custom CSS properties */
	readonly vars: NamesOfPropsOfType<T,ICustomVar>;

	/** Map of property names to rule objects. */
	readonly rules: PropsOfType<T,IRule>;

	/** Rule that combines all custom variables defined in this container. */
	readonly varRule: ICustomVarRule<T>;
}



/**
 * "Constructor" interface defining how rule definition classes can be created.
 */
export interface IRuleDefinition
{
	/** Array of unnamed rules */
	$unnamed?: IRule[];
}



/**
 * "Constructor" interface defining how rule definition classes can be created.
 */
export interface IRuleDefinitionClass<T extends IRuleDefinition>
{
	/** All rule definition classes should conform to this constructor */
	new(): T;
}



import {TagRule} from "./TagRule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
import {SelectorType} from "../helpers/SelectorTypes"
import {SelectorRule} from "./SelectorRule"
import {AnimationRule} from "./AnimationRule"
import {CustomVar} from "./CustomVar"
import {SupportsRule} from "./SupportsRule"
import {MediaRule} from "./MediaRule"
import {ImportRule} from "./ImportRule"
import {FontFaceRule} from "./FontFaceRule"



/** Creates new TagRule object  */
export function $tag( tagName: string, style: ExtendedStyleset): ITagRule
	{ return new TagRule( tagName, style); }

/** Returns new ClassRule object  */
export function $class( style: ExtendedStyleset, nameOverride?: string | INamedRule): IClassRule
	{ return new ClassRule( style, nameOverride); }

/** Returns new IDRule object  */
export function $id( style: ExtendedStyleset, nameOverride?: string | INamedRule): IIDRule
	{ return new IDRule( style, nameOverride); }

/** Creates new SelectorRule object  */
export function $rule( selector: SelectorType, style: ExtendedStyleset): ISelectorRule
	{ return new SelectorRule( selector, style); }

/** Returns new AnimationRule object  */
export function $animation( keyframes: Keyframe[], nameOverride?: string | INamedRule): IAnimationRule
	{ return new AnimationRule( keyframes, nameOverride); }

/** Returns new CustomVar object that defines a custom CSS property */
export function $custom<K extends keyof PureStyleset>( templatePropName: K, propVal: PureStyleset[K],
				nameOverride?: string | INamedRule): ICustomVar<K>
	{ return new CustomVar( templatePropName, propVal, nameOverride); }

/** Returns new SupportsRule object  */
export function $supports<T>( query: SupportsQuery, definition: T): ISupportsRule<T>
	{ return new SupportsRule( query, definition); }

/** Returns new MediaRule object  */
export function $media<T>( query: string | MediaQuery, definition: T): IMediaRule<T>
	{ return new MediaRule( query, definition); }

/** Returns new ImportRule object  */
export function $import( url: string, query?: string | MediaQuery): IImportRule
	{ return new ImportRule( url, query); }

/** Returns new FonFaceRule object  */
export function $fontface( fontface: Fontface): IFontFaceRule
	{ return new FontFaceRule( fontface); }



