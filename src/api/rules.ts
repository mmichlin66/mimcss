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
 * The IRule interface is a base interface that is implemented by all rules. Its only purpose is to
 * provide the reference to the style scope that owns it.
 */
export interface IRule
{
	/**
	 * Name of the property on the rule definition object to which this rule is assigned.
	 */
	readonly ruleName: string;

	/** Only needed to distinguish from other types */
	readonly isRule: boolean;
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
 * 
 * Note that although the meaning of style rules inheritance is always the same (application of all
 * style properties throughout the inheritance chain), the implementation is different for
 * different contexts. In particular, if it is a class rule and it only inherits from other class
 * rules, the resultant rule doesn't repeat the style properties from the parent rules; instead,
 * the class name becomes a combination of several class names.
 */
export interface IStyleRule extends IRule
{
	/** Only needed to distinguish from other types */
	readonly isStyleRule: boolean;
}



/**
 * The ITagRule interface represents a style rule that applies to elements identified by a tag name.
 */
export interface ITagRule extends IStyleRule
{
	/** Only needed to distinguish from other rules */
	readonly isTagRule: boolean;
}



/**
 * The IClassRule interface represents a style rule that applies to elements identified by a class.
 */
export interface IClassRule extends IStyleRule, INamedRule
{
	/** Only needed to distinguish from other rules */
	readonly isClassRule: boolean;
}



/**
 * The IIDRule interface representsa a style rule that applies to elements identified by an ID.
 */
export interface IIDRule extends IStyleRule, INamedRule
{
	/** Only needed to distinguish from other rules */
	readonly isIDRule: boolean;
}



/**
 * The ISelectorRule interface representsa a styleset that applies to elements identifies by the
 * given selector.
 */
export interface ISelectorRule extends IStyleRule
{
	/** Only needed to distinguish from other rules */
	readonly isSelectorRule: boolean;
}



/**
 * The IAnimationRule interface represents a @keyframes rule.
 */
export interface IAnimationRule extends INamedRule
{
	/** Only needed to distinguish from other rules */
	readonly isAnimationRule: boolean;
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
	/** Only needed to distinguish from other rules */
	readonly isGroupRule: boolean;
}



/**
 * The ISupportRule interface represents a CSS @supports rule.
 */
export interface ISupportRule<T = any> extends IGroupRule<T>
{
	/** Only needed to distinguish from other rules */
	readonly isSupportRule: boolean;
}



/**
 * The ISupportRule interface represents a CSS @media rule.
 */
export interface IMediaRule<T = any> extends IGroupRule<T>
{
	/** Only needed to distinguish from other rules */
	readonly isMediaRule: boolean;
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

	/** Only needed to distinguish from other types */
	readonly isCustomVar?: boolean;
}



/**
 * The ICustomVarRule interface represents a ":root" block with CSS custom property definitions.
 */
export interface ICustomVarRule<T = any> extends IRule
{
	/** Map of custom property names */
	readonly vars: PropsOfType<T,ICustomVar>;

	/** Only needed to distinguish from other types */
	readonly isCustomVarRule?: boolean;
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
	/** Class that defined this style scope. This member is used for style scope derivation. */
	readonly RuleDefinitionClass: IRuleDefinitionClass<T>;

	/** Names of all named rules. */
	readonly allNames: NamesOfPropsOfType<T,NamedRule>;

	/** Names of classes. */
	readonly classNames: NamesOfPropsOfType<T,IClassRule>;

	/** Names of element identifiers. */
	readonly idNames: NamesOfPropsOfType<T,IIDRule>;

	/** Names of animations. */
	readonly animationNames: NamesOfPropsOfType<T,IAnimationRule>;

	/** Names of custom CSS properties */
	readonly varNames: NamesOfPropsOfType<T,ICustomVar>;

	/** List of all rules. */
	readonly allRules: IRule[];

	/** Map of all named rules. */
	readonly namedRules: PropsOfType<T,NamedRule>;

	/** List of all unnamed rules. */
	readonly unnamedRules: UnnamedRule[];

	/** Map of all style (tag, class, ID and selector) rules. */
	readonly styleRules: PropsOfType<T,IStyleRule>;

	/** Map of all tag rules. */
	readonly tagRules: PropsOfType<T,ITagRule>;

	/** Map of all class rules. */
	readonly classRules: PropsOfType<T,IClassRule>;

	/** Map of all ID rules. */
	readonly idRules: PropsOfType<T,IIDRule>;

	/** Map of all selector rules. */
	readonly selectorRules: PropsOfType<T,ISelectorRule>;

	/** Map of all animation rules. */
	readonly animationRules: PropsOfType<T,IAnimationRule>;

	/** Map of all support rules. */
	readonly supportRules: PropsOfType<T,ISupportRule>;

	/** Rule that combines all custom variables defined in this container. */
	readonly customVarRule: ICustomVarRule<T>;
}



/**
 * Interface defining options passed to the constructor of rule definition classes
 */
export type RuleDefinitionOptions =
{
	/**
	 * Optional method within which rule definition classes can create rules not assigned
	 * to a member property. These rules cannot be those that require name, such as class, ID,
	 * animation or custom CSS property.
	 */
	unnamedRules?: UnnamedRule[];
}



/**
 * "Constructor" interface defining how rule definition classes can be created.
 */
export interface IRuleDefinitionClass<T>
{
	/** All rule definition classes should conform to this constructor */
	new( options?: RuleDefinitionOptions): T;
}



