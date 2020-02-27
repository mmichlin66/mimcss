/**
 * This module defines types and functions that allow building CSS style sheets using TypeScript.
 */


import {NamesOfPropsOfType, PropsOfType, IRule, IStyleRule, ITagRule, IClassRule, IIDRule,
		ISelectorRule, IAnimationRule, ICustomVar} from "./rules";


/**
 * The StyleScope type defines the resultant style scope after the style scope definition has been
 * processed. The style scope object contains names of IDs, classes and animations, which can be
 * used in the application code. The interface also provides methods that are used to manipulate
 * the rules and their stylesets.
 */
export interface IStyleScope<T = any>
{
	/**
	 * Class that defined this style scope. This member is used for style scope derivation:
	 * ```typescript
	 * let scope1 = $scope( class ...);
	 * let scope2 = $scope( class extends scope1.Definition ...);
	 * ```
	 */
	readonly Definition: IStyleScopeDefinitionClass<T>;

	/** Names of classes defined in the style scope */
	readonly classNames: NamesOfPropsOfType<T,IClassRule>;

	/** Names of element identifiers defined in the style scope */
	readonly idNames: NamesOfPropsOfType<T,IIDRule>;

	/** Names of animations defined in the style scope */
	readonly animationNames: NamesOfPropsOfType<T,IAnimationRule>;

	/** Names of custom CSS properties defined in the style scope */
	readonly varNames: NamesOfPropsOfType<T,ICustomVar>;

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

 	/** Map of CSS custom property definitions. */
	readonly varRules?: PropsOfType<T,ICustomVar>;

	/** Map of all named rules. */
	readonly namedRules: PropsOfType<T,IRule>;

	/** List of all unnamed rules. */
	readonly unnamedRules: IRule[];
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



// ///////////////////////////////////////////////////////////////////////////////////////////////////
// //
// // Implementation of $elector
// //
// ///////////////////////////////////////////////////////////////////////////////////////////////////
// export {$selector} from "../rules/Selector";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions to configure TssManager options
//
///////////////////////////////////////////////////////////////////////////////////////////////////
import {TssManager} from "../rules/TssManager";

/**
 * Sets the flag indicating whether to use optimized (unique) style names. If yes, the names
 * will be created by appending a unique number to the given prefix. If the prefix is not
 * specified, the standard prefix "n" will be used.
 * @param optimize
 * @param prefix
 */
export function useOptimizedStyleNames( optimize: boolean, prefix?: string): void
	{ TssManager.useOptimizedStyleNames( optimize, prefix); }



