/**
 * This module defines types od CSS rules.
 */


import {Styleset} from "../styles/styles";


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
	/** Only needed to distinguish from other types */
	readonly isRule: boolean;
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
export interface IClassRule extends IStyleRule
{
	/** Only needed to distinguish from other rules */
	readonly isClassRule: boolean;
}

/**
 * The IIDRule interface representsa a style rule that applies to elements identified by an ID.
 */
export interface IIDRule extends IStyleRule
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
export interface IAnimationRule extends IRule
{
	/** Only needed to distinguish from other rules */
	readonly isAnimationRule: boolean;
}

/**
 * The Keyframe type defines a single keyframe within a @keyframes rule.
 */
export type Keyframe = { waypoint: "from" | "to" | number, style: ExtendedStyleset }

/**
 * The ICustomVar interface represents a CSS custom property definitions.
 */
export interface ICustomVar<T = any>
{
	/** Only needed to distinguish from other types */
	readonly isCustomVar?: boolean;
}

// /**
//  * The IGroupRule interface represents a rule that can have other rules nested within it.
//  */
// export interface IGroupRule extends IRule
// {
// 	/** Array of nested rules */
// 	readonly subRules: IRule[];
// }

// /**
//  * The ICustomVarRule interface represents a ":root" block with CSS custom property definitions.
//  */
// export interface ICustomVarRule extends IRule
// {
// }





/** Utility type that represents all properties of type T that are of type U */
type PropsOfTypeOrNever<T,U> = { [K in keyof T]: T[K] extends U ? K : never };

/** Utility type that represents names of all properties of type T that are of type U */
type PropNamesOfType<T,U> = PropsOfTypeOrNever<T,U>[keyof T];

/** Utility type that represents string values mapped to names of properties of type T that are of type U. */
export type NamesOfPropsOfType<T,U> = { [K in PropNamesOfType<T,U>]: string };

/** Type that represents all properties of type T that are of type U */
export type PropsOfType<T,U> = { [K in PropNamesOfType<T,U>]: T[K] };



