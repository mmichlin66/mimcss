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



/**
 * The StyleSheet class represents a parsed form of a StyleSheetDefinition-derived class. This
 * class doesn't have a template parameter, but it conforms to the IStyleSheet<T> interface,
 * which provides names of classes, IDs and keyframes defined in the class T, which must be
 * derived from the StyleSheetDefinition class.
 */
class StyleScope<T> extends GroupRule implements IStyleScope<T>
{
	public constructor( styleScopeClass: IStyleScopeDefinitionClass<T>)
	{
		// style scope doesn't have owner
		super( null);

		this.ssDefClass = styleScopeClass;

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
	}



	/** Names of classes defined in the style sheet */
	public get classNames(): ClassNames<T> { this.activate(); return this._classNames as ClassNames<T> }

	/** Names of classes defined in the style sheet */
	public get idNames(): IDNames<T> { this.activate(); return this._idNames as IDNames<T>; }

	/** Names of keyframes defined in the style sheet */
	public get animationNames(): AnimationNames<T> { this.activate(); return this._animationNames as AnimationNames<T>; }

	/** Map of all rules. */
	public get allRules(): PropsOfType<T,IRule> { this.activate(); return this._allRules as any as Extract<T,IRule>; }

	/** Map of all style (tag, class, ID and selector) rules. */
	public get styleRules(): PropsOfType<T,IStyleRule> { this.activate(); return this._styleRules as any as Extract<T,IStyleRule>; }

	/** Map of all tag rules. */
	public get tagRules(): PropsOfType<T,ITagRule> { this.activate(); return this._tagRules as any as Extract<T,ITagRule>; }

	/** Map of all class rules. */
	public get classRules(): PropsOfType<T,IClassRule> { this.activate(); return this._classRules as any as PropsOfType<T,IClassRule>; }

	/** Map of all ID rules. */
	public get idRules(): PropsOfType<T,IIDRule> { this.activate(); return this._idRules as any as Extract<T,IIDRule>; }

	/** Map of all selector rules. */
	public get selectorRules(): PropsOfType<T,ISelectorRule> { this.activate(); return this._selectorRules as any as Extract<T,ISelectorRule>; }

	/** Map of all animation rules. */
	public get animationRules(): PropsOfType<T,IAnimationRule> { this.activate(); return this._animationRules as any as Extract<T,IAnimationRule>; }



	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	public process(): void
	{
		// check whether this object was already processed
		if (this.name)
			return;

		this.name = this.ssDefClass.name;

		// set the global reference to this scope, so that defineXXX functions called during
		// the definition class instantiation will know which scope to use.
		let prevStyleScope = g_CurrentStyleScope;
		g_CurrentStyleScope = this;

		try
		{
			// create instance of the style scope class
			let ssDef = new this.ssDefClass();

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
				}
			}
		}
		catch( err)
		{
			console.error( `Error instantiating Style Scope Definition of type '${this.ssDefClass.name}'`);
		}

		// revert to the previous scope
		g_CurrentStyleScope = prevStyleScope;
	}



	// Inserts this style sheet into DOM
	public activate(): void
	{
		if (this.domSS)
			return;

		// make sure this object is processed
		this.process();

		// create <style> element and insert it into <head>
		this.styleElm = document.createElement( "style");
		this.styleElm.id = this.name;
		document.head.appendChild( this.styleElm);

		this.domSS = this.styleElm.sheet as CSSStyleSheet;

		// go over the rules, convert them to strings and insert them into the style sheet
		for( let ruleName in this._allRules)
			this.domSS.insertRule( this._allRules[ruleName].toCssString());
	}



	// Removes this style sheet from DOM
	public deactivate(): void
	{
		if (!this.domSS)
			return;

		this.styleElm.remove();
		this.domSS = undefined;
		this.styleElm = undefined;
	}



	// Reference to the style scope definition class. We instantiate it within the process
	// method.
	private ssDefClass: IStyleScopeDefinitionClass<T>;

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

	// Style element DOM object. Is defined only when the object is activated.
	private styleElm?: HTMLStyleElement;

	// When activated, points to the DOM style sheet object inserted into the <head> element
	private domSS?: CSSStyleSheet;
}



let g_CurrentStyleScope: StyleScope<any> = null;

/**
 * Processes the given style sheet definition and returns the StyleSheet object that contains
 * names of IDs, classes and keyframes and allows style manipulations.
 * @param sheetDef 
 */
export function createStyleScope<T>( styleScopeDefinitionClass: IStyleScopeDefinitionClass<T>): IStyleScope<T>
{
	// check whether the style sheet definition object has already been processed. This is
	// indicated by the existence of the instance static property on the class.
	let styleScope = styleScopeDefinitionClass.styleScope as StyleScope<T>;
	if (!styleScope)
	{
		styleScope = new StyleScope( styleScopeDefinitionClass);
		styleScopeDefinitionClass.styleScope = styleScope;
	}

	return styleScope;
}



/** Creates new TagRule object  */
export function defineTagRule( styleset: ExtendedStyleset): ITagRule
{
	return new TagRule( g_CurrentStyleScope, styleset);
}

/** Returns new ClassRule object  */
export function defineClassRule( styleset: ExtendedStyleset): IClassRule
{
	return new ClassRule( g_CurrentStyleScope, styleset);
}

/** Returns new IDRule object  */
export function defineIDRule( styleset: ExtendedStyleset): IIDRule
{
	return new IDRule( g_CurrentStyleScope, styleset);
}

/** Creates new SelectorRule object  */
export function defineSelectorRule( selector: ISelector | string, styleset: ExtendedStyleset): ISelectorRule
{
	return new SelectorRule( g_CurrentStyleScope, selector, styleset);
}

/** Returns new AnimationRule object  */
export function defineAnimationRule( ...keyframes: Keyframe[]): IAnimationRule
{
	return new AnimationRule( g_CurrentStyleScope, keyframes);
}



