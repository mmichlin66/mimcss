/**
 * This module defines types and functions that allow building CSS style sheets using TypeScript.
 */


import {Styleset} from "../styles/styles";


/**
 * The ExtendedStyleset type extends the Styleset type with certain properties that provide
 * additional meaning to the styleset:
 * - The `$inherits` property specifies one or more parent style rules. This allows specifying
 *   parent rules using a convenient style-property-like notation. Parents can also be specified
 *   without a styleset.
 * - The `$important` property specifies one or more names of styleset properties that shuld be
 *   considered "important". When the rule is inserted into DOM, the "!important" attribute is
 *   added to the property value.
 */
export type ExtendedStyleset =
	(Styleset &
		{
			$inherits?: IStyleRule | IStyleRule[],
			$important?: string | string[],
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
	readonly isRule: boolean;
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

// /**
//  * The IGroupRule interface represents a rule that can have other rules nested within it.
//  */
// export interface IGroupRule extends IRule
// {
// 	/** Array of nested rules */
// 	readonly subRules: IRule[];
// }



/** Utility type that represents all properties of type T that are of type U */
type PropsOfTypeOrNever<T,U> = { [K in keyof T]: T[K] extends U ? K : never };

/** Utility type that represents names of all properties of type T that are of type U */
type PropNamesOfType<T,U> = PropsOfTypeOrNever<T,U>[keyof T];

/** Utility type that represents string values mapped to names of properties of type T that are of type U. */
type NamesOfPropsOfType<T,U> = { [K in PropNamesOfType<T,U>]: string };

/** Type that represents all properties of type T that are of type U */
export type PropsOfType<T,U> = { [K in PropNamesOfType<T,U>]: T[K] };

/** Type that represents names of all properties of type T that are class rules */
export type ClassNames<T> = NamesOfPropsOfType<T,IClassRule>;

/** Type that represents names of all properties of type T that are class rules */
export type IDNames<T> = NamesOfPropsOfType<T,IIDRule>;

/** Type that represents names of all properties of type T that are keyframe rules */
export type AnimationNames<T> = NamesOfPropsOfType<T,IAnimationRule>;



/**
 * The StyleScope type defines the resultant style scope after the style scope definition has been
 * processed. The style scope object contains names of IDs, classes and animations, which can be
 * used in the application code. The interface also provides methods that are used to manipulate
 * the rules and their stylesets.
 */
export interface IStyleScope<T = any>
{
	/** Names of classes defined in the style scope */
	readonly classNames: ClassNames<T>;

	/** Names of element identifiers defined in the style scope */
	readonly idNames: IDNames<T>;

	/** Names of animations defined in the style scope */
	readonly animationNames: AnimationNames<T>;

	/** Map of all rules. */
	readonly allRules: PropsOfType<T,IRule>;

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
}



/**
 * "Constructor" interface defining how style scope definition classes can be created.
 */
export interface IStyleScopeDefinitionClass<T>
{
	/** All style scope definition objects should conform to this constructor */
	new(): T;

	/**
	 * Flag inidicating that multiple style scopes can be created for this style scope definition -
	 * each time with unique rule IDs. This is useful for styles created for a control - e.g. tree
	 * or accordeon - which can be used multiple times on the same page but with different styles.
	 * By default, style scope definitions are singular, that is a single instance of a style scope
	 * object is created for them and inserted into DOM.
	 */
	isMultiplex?: boolean;

	/**
	 * Singleton instance of the Style Scope class created from this definition. This is used only
	 * for singular style scopes.
	 */
	styleScope?: IStyleScope<T>;
}



/**
 * Represents a complete CSS selector that can be either used as is or can be combined with other selectors.
 */
export interface ISelector extends ICompoundSelector
{
	readonly and: IEmptySelector;
	readonly child: IEmptySelector;
	readonly descendand: IEmptySelector;
	readonly sibling: IEmptySelector;
	readonly adjacent: IEmptySelector;

	/** Returns a list of all rules participating in the selector. */
	getRules(): IStyleRule[];

	/** Returns the string representation of the selector */
	toCssString(): string;
}



/**
 * Represents a starting point in the selector building process. This selector cannot be used as
 * is because it doesn't contain any selection content yet.
 */
export interface IEmptySelector extends ICompoundSelector
{
	all( ns?: string): ISelector;
	tag( tag: string | ITagRule): ISelector;
}



/**
 * Represents a point in selector building, which allows class, attribute, pseudo-class and pseudo element selectors
 */
interface ICompoundSelector
{
	class( cls: string | IClassRule): ISelector;
	id( id: string | IIDRule): ISelector;
	attr( attrName: string, op?: AttrSelectorOperation | AttrSelectorOperationType, value?: string, caseInsensitive?: boolean): ISelector;

	// pseudo classes
	readonly active: ISelector;
	readonly anyLink: ISelector;
	readonly blank: ISelector;
	readonly checked: ISelector;
	readonly default: ISelector;
	readonly defined: ISelector;
	dir( s: "rtl" | "ltr"): ISelector;
	readonly disabled: ISelector;
	readonly empty: ISelector;
	readonly enabled: ISelector;
	readonly first: ISelector;
	readonly firstChild: ISelector;
	readonly firstOfType: ISelector;
	readonly fullscreen: ISelector;
	readonly focus: ISelector;
	readonly focusVisible: ISelector;
	readonly focusWithin: ISelector;
	has( s: string): ISelector;
	host( s: string): ISelector;
	hostContext( s: string): ISelector;
	readonly hover: ISelector;
	readonly indeterminate: ISelector;
	readonly inRange: ISelector;
	readonly invalid: ISelector;
	is( s: string): ISelector;
	lang( s: string): ISelector;
	readonly lastChild: ISelector;
	readonly lastOfType: ISelector;
	readonly left: ISelector;
	readonly link: ISelector;
	not( s: string): ISelector;
	nthChild( a: number | "odd" | "even", b?: number): ISelector;
	nthLastChild( a: number | "odd" | "even", b?: number): ISelector;
	nthLastOfType( a: number | "odd" | "even", b?: number): ISelector;
	nthOfType( a: number | "odd" | "even", b?: number): ISelector;
	readonly onlyChild: ISelector;
	readonly onlyOfType: ISelector;
	readonly optional: ISelector;
	readonly outOfRange: ISelector;
	readonly placeholderShown: ISelector;
	readonly readOnly: ISelector;
	readonly readWrite: ISelector;
	readonly required: ISelector;
	readonly right: ISelector;
	readonly root: ISelector;
	readonly scope: ISelector;
	readonly target: ISelector;
	readonly valid: ISelector;
	readonly visited: ISelector;
	where( s: string): ISelector;

	// pseudo elements
	readonly after: ISelector;
	readonly backdrop: ISelector;
	readonly before: ISelector;
	readonly cue: ISelector;
	readonly firstLetter: ISelector;
	readonly firstLine: ISelector;
	readonly grammarError: ISelector;
	readonly marker: ISelector;
	part( s: string): ISelector;
	readonly placeholder: ISelector;
	readonly selection: ISelector;
	slotted( s: string): ISelector;
	readonly spellingError: ISelector;
}



/**
 * Represents possible operations for attribute selector
 */
export type AttrSelectorOperationType = "=" | "~=" | "|=" | "^=" | "$=" | "*=";
export enum AttrSelectorOperation
{
	Match = "=",
	Word = "~=",
	SubCode = "|=",
	StartsWith = "^=",
	EndsWith = "$=",
	Contains = "*=",
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for defining rules
//
///////////////////////////////////////////////////////////////////////////////////////////////////
export {$tag} from "./StyleScope";
export {$class} from "./StyleScope";
export {$id} from "./StyleScope";
export {$rule} from "./StyleScope";
export {$animation} from "./StyleScope";

export {getStyleScope} from "./StyleScope";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Implementation of createSelector
//
///////////////////////////////////////////////////////////////////////////////////////////////////
export {$selector} from "./Selector";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions to configure TssManager options
//
///////////////////////////////////////////////////////////////////////////////////////////////////
import {TssManager} from "./TssManager";

/**
 * Sets the flag indicating whether to use optimized (unique) style names. If yes, the names
 * will be created by appending a unique number to the given prefix. If the prefix is not
 * specified, the standard prefix "n" will be used.
 * @param optimize
 * @param prefix
 */
export function useOptimizedStyleNames( optimize: boolean, prefix?: string): void
	{ TssManager.useOptimizedStyleNames( optimize, prefix); }



