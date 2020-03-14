/**
 * This module defines types od CSS rules.
 */


import {Styleset, PureStyleset} from "../styles/StyleTypes";


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
			$important?: keyof Styleset | (keyof Styleset)[],
		}
	) | IStyleRule | IStyleRule[];





/**
 * The Rule class is used as a base class for all rules. As a parent of RuleContainer, the Rule
 * class is also an ancestor for StyleScope; however, most of its the fields are undefined in
 * te StyleScope instances.
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

	// not real rules but derive from Rule object
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
export type Keyframe = [ "from" | "to" | number, ExtendedStyleset ];



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
 * The ICustomVar interface represents a CSS custom property definitions.
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
 * The ICustomVal interface represents a custom CSS property name and value that can be used to
 * define custom properties in the Styleset.
 */
export interface ICustomVal<K extends keyof PureStyleset = any>
{
	/**
	 * Either name of a custom CSS property or a ICustomVar object representing a custom CSS
	 * property.
	 */
	readonly varDef: string | ICustomVar<K>;

	/**
	 * Name of a non-custom CSS property whose type determines the type of the custom property
	 * value. This property may be undefined if the `varDef` property points to the ICustomVar
	 * object, since the latter already has the template property name defined.
	 */
	readonly templatePropName?: K;

	/** Value of the custom CSS property. */
	readonly varValue: PureStyleset[K];
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
export interface IRuleContainer<T = any>
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
 * Interface defining options passed to the constructor of rule definition classes
 */
export type RuleDefinitionOptions =
{
	/**
	 * Method that rule definition classes can call to create rules not assigned to a member
	 * property. These rules cannot be those that require names, such as class, ID, animation
	 * or custom CSS property.
	 */
	addRules: ( ...rules: UnnamedRule[]) => void;
}



/**
 * "Constructor" interface defining how rule definition classes can be created.
 */
export interface IRuleDefinitionClass<T>
{
	/** All rule definition classes should conform to this constructor */
	new( options?: RuleDefinitionOptions): T;
}



import {ISelector} from "../helpers/Selector"
import {TagRule} from "./TagRule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
import {SelectorRule} from "./SelectorRule"
import {AnimationRule} from "./AnimationRule"
import {CustomVar} from "./CustomVar"
import {SupportsRule} from "./SupportsRule"
import {MediaQuery} from "../styles/MediaTypes"
import {MediaRule} from "./MediaRule"



/** Creates new TagRule object  */
export function $tag( tagName: string, styleset: ExtendedStyleset): ITagRule { return new TagRule( tagName, styleset); }

/** Returns new ClassRule object  */
export function $class( styleset: ExtendedStyleset): IClassRule { return new ClassRule( styleset); }

/** Returns new IDRule object  */
export function $id( styleset: ExtendedStyleset): IIDRule { return new IDRule( styleset); }

/** Creates new SelectorRule object  */
export function $rule( selector: ISelector | string, styleset: ExtendedStyleset): ISelectorRule
	{ return new SelectorRule( selector, styleset); }

/** Returns new AnimationRule object  */
export function $animation( ...keyframes: Keyframe[]): IAnimationRule { return new AnimationRule( keyframes); }

/** Returns new CustomVar object that defines a custom CSS property */
export function $custom<K extends keyof PureStyleset>( templatePropName: K, propVal: PureStyleset[K]): ICustomVar<K>
	{ return new CustomVar( templatePropName, propVal); }

/** Returns new SupportsRule object  */
export function $supports<T>( query: string, definitionClass: IRuleDefinitionClass<T>): ISupportsRule<T>
	{ return new SupportsRule( query, definitionClass); }

/** Returns new MediaRule object  */
export function $media<T>( query: string | MediaQuery, definitionClass: IRuleDefinitionClass<T>): IMediaRule<T>
	{ return new MediaRule( query, definitionClass); }



