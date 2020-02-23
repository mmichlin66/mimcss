import {ExtendedStyleset, IStyleScopeDefinitionClass, IStyleScope, ClassNames, IDNames, AnimationNames,
		IRule, IStyleRule, ITagRule, IClassRule, IIDRule, ISelectorRule, ISelector, IAnimationRule,
		Keyframe, PropsOfType} from "./cssts"
import {Rule} from "./Rule"
import {TagRule} from "./TagRule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
import {SelectorRule} from "./SelectorRule"
import {AnimationRule} from "./AnimationRule"
import {GroupRule} from "./GroupRule"
import {TssManager} from "./TssManager"



/**
 * The StyleSheet class represents a parsed form of a StyleSheetDefinition-derived class. This
 * class doesn't have a template parameter, but it conforms to the IStyleSheet<T> interface,
 * which provides names of classes, IDs and keyframes defined in the class T, which must be
 * derived from the StyleSheetDefinition class.
 */
export class StyleScope<T = any> implements IStyleScope<T>
{
	public constructor( ssDefClass: IStyleScopeDefinitionClass<T>)
	{
		this._classNames = {};
		this._idNames = {};
		this._animationNames = {};
		this._allRules = {};
		this._styleRules = {};
		this._tagRules = {};
		this._classRules = {};
		this._idRules = {};
		this._selectorRules = {};
		this._animationRules = {};

		this.process( ssDefClass);
	}



	/** Names of classes defined in the style sheet */
	public get classNames(): ClassNames<T> { this.activate(); return this._classNames as ClassNames<T> }

	/** Names of classes defined in the style sheet */
	public get idNames(): IDNames<T> { this.activate(); return this._idNames as IDNames<T>; }

	/** Names of keyframes defined in the style sheet */
	public get animationNames(): AnimationNames<T> { this.activate(); return this._animationNames as AnimationNames<T>; }

	/** Map of all rules. */
	public get allRules(): PropsOfType<T,IRule> { this.activate(); return this._allRules as any as PropsOfType<T,IRule>; }

	/** Map of all style (tag, class, ID and selector) rules. */
	public get styleRules(): PropsOfType<T,IStyleRule> { this.activate(); return this._styleRules as any as PropsOfType<T,IStyleRule>; }

	/** Map of all tag rules. */
	public get tagRules(): PropsOfType<T,ITagRule> { this.activate(); return this._tagRules as any as PropsOfType<T,ITagRule>; }

	/** Map of all class rules. */
	public get classRules(): PropsOfType<T,IClassRule> { this.activate(); return this._classRules as any as PropsOfType<T,IClassRule>; }

	/** Map of all ID rules. */
	public get idRules(): PropsOfType<T,IIDRule> { this.activate(); return this._idRules as any as PropsOfType<T,IIDRule>; }

	/** Map of all selector rules. */
	public get selectorRules(): PropsOfType<T,ISelectorRule> { this.activate(); return this._selectorRules as any as PropsOfType<T,ISelectorRule>; }

	/** Map of all animation rules. */
	public get animationRules(): PropsOfType<T,IAnimationRule> { this.activate(); return this._animationRules as any as PropsOfType<T,IAnimationRule>; }



	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	private process( ssDefClass: IStyleScopeDefinitionClass<T>): void
	{
		this.isMultiplex = !!ssDefClass.isMultiplex;

		this.name = ssDefClass.name;

		// set the global reference to this scope, so that defineXXX functions called during
		// the definition class instantiation will know which scope to use.
		let prevStyleScope = g_CurrentStyleScope;
		g_CurrentStyleScope = this;

		try
		{
			// create instance of the style scope definition class and then go over its properties,
			// which define CSS rules.
			let ssDef = new ssDefClass();
			for( let ruleName in ssDef)
			{
				let rule = ssDef[ruleName];
				if (!(rule instanceof Rule))
					continue;

				rule.process( this.name, ruleName);
				this._allRules[ruleName] = rule;

				if (rule instanceof TagRule)
				{
					this._styleRules[ruleName] = rule;
					this._tagRules[ruleName] = rule;
				}
				else if (rule instanceof ClassRule)
				{
					this._styleRules[ruleName] = rule;
					this._classRules[ruleName] = rule;
					this._classNames[ruleName] = rule.combinedName;
				}
				else if (rule instanceof IDRule)
				{
					this._styleRules[ruleName] = rule;
					this._idRules[ruleName] = rule;
					this._idNames[ruleName] = rule.idName;
				}
				else if (rule instanceof SelectorRule)
				{
					this._styleRules[ruleName] = rule;
					this._selectorRules[ruleName] = rule;
				}
				else if (rule instanceof AnimationRule)
				{
					this._animationNames[ruleName] = rule.animationName;
					this._animationRules[ruleName] = rule;
				}
			}
		}
		catch( err)
		{
			console.error( `Error instantiating Style Scope Definition of type '${ssDefClass.name}'`);
		}

		// revert to the previous scope
		g_CurrentStyleScope = prevStyleScope;
	}



	// Generates a name, whcih will be unique in this style scope
	public generateScopedName( ruleName: string): string
	{
		if (this.isMultiplex)
			return TssManager.generateUniqueName();
		else
			return TssManager.generateName( this.name, ruleName);
	}



	// Inserts this style sheet into DOM
	public activate(): void
	{
		if (this.domSS)
			return;

		if (this.isMultiplex)
		{
			// create <style> element and insert it into <head>
			this.styleElm = document.createElement( "style");
			document.head.appendChild( this.styleElm);
			this.setDOMInfo( this.styleElm.sheet as CSSStyleSheet, 0);

			// go over the rules, convert them to strings and insert them into the style sheet
			for( let ruleName in this.allRules)
			{
				let rule: Rule = this.allRules[ruleName];
				rule.index = this.domSS.insertRule( rule.toCssString());
			}
		}
		else
			TssManager.addStyleScope( this);
	}



	// Removes this style scope from DOM - only works for multiplex style scopes
	public deactivate(): void
	{
		if (!this.isMultiplex || !this.domSS)
			return;

		this.styleElm.remove();
		this.styleElm = undefined;
	}



	public setDOMInfo( domSS: CSSStyleSheet, firstRuleIndex: number)
	{
		this.domSS = domSS;
		this.firstRuleIndex = firstRuleIndex;
	}

	public clearDOMInfo()
	{
		this.domSS = undefined;
		this.firstRuleIndex = undefined;
	}



	// Name of the style sheet - used to create scoped names of style rules
	public name: string;

	// Names of classes, IDs and keyframes defined in the style sheet. The keys are property names
	// used in the style sheet definition; the values are the actual names that will be inserted
	// into the actual style sheet.
	private readonly _classNames: { [K: string]: string }
	private readonly _idNames: { [K: string]: string }
	private readonly _animationNames: { [K: string]: string }

	// Map of names of properties of the style definition to the Rule objects. This is used when
	// creating an actual style sheet.
	private readonly _allRules: { [K: string]: Rule }
	private readonly _styleRules: { [K: string]: Rule }
	private readonly _tagRules: { [K: string]: Rule }
	private readonly _classRules: { [K: string]: Rule }
	private readonly _idRules: { [K: string]: Rule }
	private readonly _selectorRules: { [K: string]: Rule }
	private readonly _animationRules: { [K: string]: Rule }

	// Flag indicating whether this style scope object owns the <style> element. This is true only
	// for multiplex styles scopes - those that can be creaed multiple times.
	private isMultiplex: boolean;

	// Style element DOM object which is only relevant for multiplex style scopes, which own their
	// <style> element.
	private styleElm?: HTMLStyleElement;

	// When activated, points to the DOM style sheet object inserted into the <head> element
	private domSS?: CSSStyleSheet;

	// Index of the first rule of this scope in its DOM style sheet object
	private firstRuleIndex?: number;
}



/**
 * Processes the given style scope definition and returns the StyleScope object that contains
 * names of IDs, classes and keyframes and allows style manipulations. For a given style scope
 * definition class there is a single style scope object, no matter how many times this function
 * is invoked.
 * @param sheetDef 
 */
export function getStyleScope<T>( styleScopeDefinitionClass: IStyleScopeDefinitionClass<T>): IStyleScope<T>
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



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for creating rules. These functions return undefined if called not from a constructor
// of an object that is used as a style scope definition (that is, an object that is passed to the
// getStyleScope function). This is because we need to tie the objects to the StyleScope object to
// which the rules will belong.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

// Reference to the StyleScope object currently being processed. This is needed when the defineXXX
// functions are executed in order to put rules into the proper owner StyleScope.
let g_CurrentStyleScope: StyleScope<any> = null;



/** Creates new TagRule object  */
export function $tag( styleset: ExtendedStyleset): ITagRule
{
	return g_CurrentStyleScope ? new TagRule( g_CurrentStyleScope, styleset) : undefined;
}

/** Returns new ClassRule object  */
export function $class( styleset: ExtendedStyleset): IClassRule
{
	return g_CurrentStyleScope ? new ClassRule( g_CurrentStyleScope, styleset) : undefined;
}

/** Returns new IDRule object  */
export function $id( styleset: ExtendedStyleset): IIDRule
{
	return g_CurrentStyleScope ? new IDRule( g_CurrentStyleScope, styleset) : undefined;
}

/** Creates new SelectorRule object  */
export function $selector( selector: ISelector | string, styleset: ExtendedStyleset): ISelectorRule
{
	return g_CurrentStyleScope ? new SelectorRule( g_CurrentStyleScope, selector, styleset) : undefined;
}

/** Returns new AnimationRule object  */
export function $animation( ...keyframes: Keyframe[]): IAnimationRule
{
	return g_CurrentStyleScope ? new AnimationRule( g_CurrentStyleScope, keyframes) : undefined;
}



