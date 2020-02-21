import {ExtendedStyleset, IStyleScopeDefinitionClass, IStyleScope, ClassNames, IDNames, AnimationNames, AllRules,
		IStyleRule, ITagRule, IClassRule, IIDRule, ISelectorRule, ISelector, IAnimationRule, Keyframe} from "./cssts"
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
		this._rules = {};
	}



	/** Names of classes defined in the style sheet */
	public get classNames(): ClassNames<T>
	{
		if (!this.domSS)
			this.activate();

		return this._classNames as ClassNames<T>
	}

	/** Names of classes defined in the style sheet */
	public get idNames(): IDNames<T>
	{
		if (!this.domSS)
			this.activate();

		return this._idNames as IDNames<T>;
	}

	/** Names of keyframes defined in the style sheet */
	public get animationNames(): AnimationNames<T>
	{
		if (!this.domSS)
			this.activate();

		return this._animationNames as AnimationNames<T>;
	}

	/**
	 * Map of names of properties of the style definition to the Rule objects. This is used when
	 * creating an actual style sheet.
	 */
	public get rules(): AllRules<T>
	{
		if (!this.domSS)
			this.activate();

		return this._rules as AllRules<T>
	}



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
			this._rules[ruleName] = rule;

			if (rule instanceof ClassRule)
				this._classNames[ruleName] = rule.combinedName;
			else if (rule instanceof IDRule)
				this._idNames[ruleName] = rule.idName;
			else if (rule instanceof AnimationRule)
				this._animationNames[ruleName] = rule.animationName;
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
		for( let ruleName in this._rules)
			this.domSS.insertRule( this._rules[ruleName].toCssString());
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



	// Reference to the style sheet definition class. We will instantiate it within the process
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
	private readonly _rules: { [K: string]: Rule }

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



