import {ExtendedStyleset, ITagRule, IClassRule, IIDRule, ISelectorRule, IAnimationRule,
		Keyframe, ICustomVar} from "../api/rules"
import {IStyleScopeDefinitionClass, IStyleScope} from "../api/scope"
import {ISelector} from "../api/ISelector"

import {Styleset, stylePropToCssString} from "../styles/styles"
import {TagRule} from "./TagRule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
import {SelectorRule} from "./SelectorRule"
import {AnimationRule} from "./AnimationRule"
import {CustomVar} from "./CustomVar"
import {StyleScope} from "./StyleScope"
import { StringProxy } from "../styles/utils"



/** Creates new TagRule object  */
export function $tag( styleset: ExtendedStyleset): ITagRule { return new TagRule( styleset); }

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



/**
 * Returns the string representation of the CSS var() function for the given custom property.
 * Example:
 * ```tsx
 * let myStyles = $scope( class
 * {
 *     defaultColor = $custom( "color", "blue");
 * 
 *     sidebar = $class( { color: $var( this.defaultColor, "black") })
 * });
 * ```
 */
export function $var<T>( customVar: ICustomVar<T>, fallbackValue?: T | ICustomVar<T> | StringProxy): StringProxy
{
	let s = `var(--${(customVar as CustomVar<T>).varName}`;
	if (fallbackValue)
	{
		if (fallbackValue instanceof CustomVar)
			s += $var( fallbackValue);
		else if (fallbackValue instanceof StringProxy)
			s += fallbackValue.toString();
		else
			s += stylePropToCssString( (customVar as CustomVar<T>).templatePropName, fallbackValue);
	}

	return new StringProxy( s + ")");
}



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



