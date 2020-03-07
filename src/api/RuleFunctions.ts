import {ExtendedStyleset, ITagRule, IClassRule, IIDRule, ISelectorRule, IAnimationRule,
		Keyframe, ICustomVar, ISupportRule,
		IRuleDefinitionClass} from "./rules"
import {IStyleScopeDefinitionClass, IStyleScope} from "./scope"
import {ISelector} from "./Selector"

import {Styleset} from "../styles/StyleTypes"
import {TagRule} from "../rules/TagRule"
import {ClassRule} from "../rules/ClassRule"
import {IDRule} from "../rules/IDRule"
import {SelectorRule} from "../rules/SelectorRule"
import {AnimationRule} from "../rules/AnimationRule"
import {CustomVar} from "../rules/CustomVar"
import {SupportRule} from "../rules/SupportRule"
import {StyleScope} from "../rules/StyleScope"



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

/** Returns new CustomProp object that defines a custom CSS property */
export function $custom<K extends keyof Styleset>( templatePropName: K, propVal: Styleset[K]): ICustomVar<Styleset[K]>
	{ return new CustomVar( templatePropName, propVal); }

/** Returns new SupportRule object  */
export function $support<T>( query: string, definitionClass: IRuleDefinitionClass<T>): ISupportRule
	{ return new SupportRule( query, definitionClass); }



/**
 * Processes the given style scope definition and returns the StyleScope object that contains
 * names of IDs, classes and keyframes and allows style manipulations. For a given style scope
 * definition class there is a single style scope object, no matter how many times this function
 * is invoked.
 * @param sheetDef 
 */
export function $scope<T>( styleScopeDefinitionClass: IStyleScopeDefinitionClass<T>): IStyleScope<T>
{
	// if the style scope definition is multiplex, create new StyleScope object every time;
	// otherwise, check whether the style sheet definition object has already been processed. This
	// is indicated by the existence of the instance static property on the class.
	if (styleScopeDefinitionClass.isMultiplex)
		return new StyleScope( styleScopeDefinitionClass);
	else
	{
		let styleScope = styleScopeDefinitionClass.styleScope as StyleScope<T>;
		if (!styleScope)
		{
			styleScope = new StyleScope( styleScopeDefinitionClass);
			styleScopeDefinitionClass.styleScope = styleScope;
		}

		return styleScope;
	}
}



