/**
 * This module defines types and functions that allow building CSS style sheets using TypeScript.
 */


import {IRuleContainer, IRuleDefinitionClass, RuleDefinitionOptions} from "./rules";


/**
 * Interface defining how style scope definition classes can be created.
 */
export type StyleScopeDefinitionOptions = RuleDefinitionOptions;
// {
// 	/**
// 	 * Optional method within which style scope definition classes can create rules not assigned
// 	 * to a member property. These rules cannot be those that require name, such as class, ID,
// 	 * animation or custom CSS property.
// 	 */
// 	unnamedRules?: UnnamedRule[];
// }



/**
 * "Constructor" interface defining how style scope definition classes can be created.
 */
export interface IStyleScopeDefinitionClass<T> extends IRuleDefinitionClass<T>
{
	/** All style scope definition objects should conform to this constructor */
	new( options?: StyleScopeDefinitionOptions): T;

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
 * The IStyleScope interface represents the resultant style scope after the style scope definition
 * has been processed. The style scope object contains names of IDs, classes and animations, which
 * can be used in the application code. The interface also provides methods that are used to
 * manipulate the rules and their stylesets.
 */
export interface IStyleScope<T = any> extends IRuleContainer<T>
{
	/**
	 * Class that defined this style scope. This member is used for style scope derivation:
	 * ```typescript
	 * let scope1 = $scope( class {...});
	 * let scope2 = $scope( class extends scope1.Definition {...});
	 * ```
	 */
	readonly Definition: IStyleScopeDefinitionClass<T>;
}



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



