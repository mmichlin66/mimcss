/**
 * This module defines types of object that represent CSS rules.
 */


import {Styleset, IStyleset, SupportsQuery} from "../styles/StyleTypes";
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
			$important?: keyof IStyleset | (keyof IStyleset)[],
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
    SCOPE = 50,
	ABSTRACT,
}



/**
 * The IRule interface is a base interface that is implemented by all rules.
 */
export interface IRule
{
	/** Name of the property on the rule definition object to which this rule is assigned. */
	readonly ruleName: string;

	/** Type of the rule */
	readonly ruleType: RuleType;

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

	/**
	 * Adds/replaces the value of the given CSS property in this rule.
	 * @param name Name of the CSS property.
	 * @param value New value of the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	setProp<K extends keyof IStyleset>( name: K, value: IStyleset[K], important?: boolean): void;

	/**
	 * Adds/replaces the value of the given custmom cSS property in this rule.
	 * @param customVar ICUstomVar object defining a custom CSS property.
	 * @param value New value of the custom CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	setCustomProp<T>( customVar: ICustomVar<T>, value: T, important?: boolean): void;
}



/**
 * The IAbstractRule interface represents a style rule that can only be used as a base for other
 * style rules. No CSSStyleRule objects are created for the abstract rules.
 */
export interface IAbstractRule extends IStyleRule
{
	/** Flag, which is always true, that is needed to distinguish abstract rules from other rules */
	readonly isAbstractRule: boolean;
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
	/** Flag, which is always true, that is needed to distinguish class rules from other rules */
	readonly isClassRule: boolean;
}



/**
 * The IIDRule interface representsa a style rule that applies to elements identified by an ID.
 */
export interface IIDRule extends IStyleRule, INamedRule
{
	/** Flag, which is always true, that is needed to distinguish ID rules from other rules */
	readonly isIDRule: boolean;
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
export interface IGroupRule<T = any> extends IRuleContainer<T>, IRule
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
export interface ICustomVar<T = any>
{
	/**
	 * Name of the property on the rule definition object to which this rule is assigned.
	 */
	readonly ruleName: string;

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

	/** Name of a non-custom CSS property whose type determines the type of the custom property value. */
	readonly template: string;

	/** Sets new value of this custom CSS property. */

	/**
	 * Sets new value of this custom CSS property.
	 * @param value New value for the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	setValue( value: T, important?: boolean): void;
}



/**
 * Interface for rule definition objects.
 */
export interface IRuleDefinition
{
}



/**
 * The IRuleContainer interface represents an object that contains CSS rules.
 */
export interface IRuleContainer<T = IRuleDefinition>
{
	/** Map of names of properties defining class rules to actual class names. */
	readonly classes: NamesOfPropsOfType<T,IClassRule>;

	/** Map of names of properties defining ID rules to actual IDs. */
	readonly ids: NamesOfPropsOfType<T,IIDRule>;

	/** Map of names of properties defining animation rules to actual animation names. */
	readonly animations: NamesOfPropsOfType<T,IAnimationRule>;

	/** Map of names of properties defining custom property rules to the ICustomVar objects. */
	readonly vars: PropsOfType<T,ICustomVar>;

	/** Map of property names to rule objects. */
	readonly rules: PropsOfType<T,IRule>;

	/**  Map of property names to external style scopes created using the $use function. */
	readonly uses: PropsOfType<T,IStyleScope>;
}



/**
 * "Constructor" interface defining how rule definition classes can be created.
 */
export interface IRuleDefinitionClass<T extends IRuleDefinition>
{
	/** All rule definition classes should conform to this constructor */
	new(): T;
}



/**
 * "Constructor" interface defining how style scope definition classes can be created.
 */
export interface IStyleScopeDefinitionClass<T> extends IRuleDefinitionClass<T>
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
}



/**
 * The IStyleScope interface represents the resultant style scope after the style scope definition
 * has been processed. The style scope object contains names of IDs, classes and animations, which
 * can be used in the application code. The interface also provides methods that are used to
 * manipulate the rules and their stylesets.
 */
export interface IStyleScope<T = any> extends IRuleContainer<T>
{
	/** DOM style element that contains CSS style sheet that contains rules defined by this scope*/
	readonly domStyleElm: HTMLStyleElement;

	// /** Inserts this style scope into DOM. */
	// activate(): void;

	// /** Removes this style scope from DOM - only works for multiplex style scopes. */
	// deactivate(): void;
}



import {AbstractRule} from "./AbstractRule"
import {TagRule} from "./TagRule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
import {SelectorType} from "../styles/SelectorTypes"
import {SelectorRule} from "./SelectorRule"
import {AnimationRule} from "./AnimationRule"
import {CustomVar} from "./CustomVar"
import {SupportsRule} from "./SupportsRule"
import {MediaRule} from "./MediaRule"
import {ImportRule} from "./ImportRule"
import {FontFaceRule} from "./FontFaceRule"



/** Creates new AbstractRule object  */
export function $abstract( style: ExtendedStyleset): IAbstractRule
	{ return new AbstractRule( style); }

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
export function $style( selector: SelectorType, style: ExtendedStyleset): ISelectorRule
	{ return new SelectorRule( selector, style); }

/** Returns new AnimationRule object  */
export function $animation( keyframes: Keyframe[], nameOverride?: string | INamedRule): IAnimationRule
	{ return new AnimationRule( keyframes, nameOverride); }

/** Returns new CustomVar object that defines a custom CSS property */
export function $custom<K extends keyof IStyleset>( template: K, propVal: IStyleset[K],
				nameOverride?: string | INamedRule): ICustomVar<IStyleset[K]>
	{ return new CustomVar( template, propVal, nameOverride); }

/** Returns new SupportsRule object  */
export function $supports<T>( query: SupportsQuery, definition: T): ISupportsRule<T>
	{ return new SupportsRule( query, definition); }

/** Returns new MediaRule object  */
export function $media<T>( query: string | MediaQuery, definition: T): IMediaRule<T>
	{ return new MediaRule( query, definition); }

/** Returns new ImportRule object  */
export function $import( url: string, mediaQuery?: string | MediaQuery, supportsQuery?: string | SupportsQuery): IImportRule
	{ return new ImportRule( url, mediaQuery, supportsQuery); }

/** Returns new FonFaceRule object  */
export function $fontface( fontface: Fontface): IFontFaceRule
	{ return new FontFaceRule( fontface); }



import {StyleScope} from "./StyleScope"

/**
 * Processes the given style scope definition and returns the StyleScope object that contains
 * names of IDs, classes and keyframes and allows style manipulations. For a given style scope
 * definition class there is a single style scope object, no matter how many times this function
 * is invoked.
 */
export function $use<T = IRuleDefinition>( styleScopeDefinitionClass: IStyleScopeDefinitionClass<T>): IStyleScope<T>
{
	// if the style scope definition is multiplex, create new StyleScope object every time;
	// otherwise, check whether the style sheet definition object has already been processed. This
	// is indicated by the existence of the instance static property on the class.
	if (styleScopeDefinitionClass.isMultiplex)
		return new StyleScope( styleScopeDefinitionClass);
	else
	{
		// we don't want the class styleScope property to be exposed on the publicly available
		// interface; therefore, we access it via "as any".
		let styleScope = (styleScopeDefinitionClass as any).styleScope as StyleScope<T>;
		if (!styleScope)
		{
			styleScope = new StyleScope( styleScopeDefinitionClass);
			(styleScopeDefinitionClass as any).styleScope = styleScope;
		}

		return styleScope;
	}
}



/**
 * Activates the given style scope and inserts all its rules into DOM. If the input object is not
 * a style scope but a style definition class, obtain style scope by calling the $use function.
 * Note that each style scope object maintains a reference counter of how many times it was
 * activated and deactivated. The rules are inserted to DOM only when this reference counter goes
 * up to 1.
 */
export function $activate<T = IRuleDefinition>( scopeOrDefinition: IStyleScope<T> | IStyleScopeDefinitionClass<T>): IStyleScope<T>
{
	if (!scopeOrDefinition)
		return null;

	if (scopeOrDefinition instanceof StyleScope)
	{
		scopeOrDefinition.activate();
		return scopeOrDefinition;
	}
	else
	{
		let scope = $use( scopeOrDefinition as IStyleScopeDefinitionClass<T>);
		(scope as StyleScope<T>).activate();
		return scope;
	}
}



/**
 * Deactivates the given style scope by removing its rules from DOM. Note that each style scope
 * object maintains a reference counter of how many times it was activated and deactivated. The
 * rules are removed from DOM only when this reference counter goes down to 0.
 */
export function $deactivate( scope: IStyleScope): void
{
	if (scope)
		(scope as StyleScope).deactivate();
}



