import * as cssts from "./cssts"
import {Rule, TagRule, ClassRule} from "./Rules"



/**
 * The StyleSheet class represents a parsed form of a StyleSheetDefinition-derived class. This
 * class doesn't have a template parameter, but it conforms to the IStyleSheet<T> interface,
 * which provides names of classes, IDs and keyframes defined in the class T, which must be
 * derived from the StyleSheetDefinition class.
 */
class StyleSheet<T extends cssts.IStyleSheetDefinition> implements cssts.IStyleSheet<T>
{
	public constructor( ssDef: T)
	{
		this.ssDef = ssDef;

		this._classNames = {};
		this._idNames = {};
		this._animationNames = {};
		this._rules = {};

		this.process();
	}



	/** Names of classes defined in the style sheet */
	public get classNames(): cssts.ClassNames<T>
	{
		if (!this.domSS)
			this.activate();

		return this._classNames as cssts.ClassNames<T>
	}

	/** Names of classes defined in the style sheet */
	public get idNames(): cssts.IDNames<T>
	{
		if (!this.domSS)
			this.activate();

		return this._idNames as cssts.IDNames<T>;
	}

	/** Names of keyframes defined in the style sheet */
	public get animationNames(): cssts.AnimationNames<T>
	{
		if (!this.domSS)
			this.activate();

		return this._animationNames as cssts.AnimationNames<T>;
	}

	/**
	 * Map of names of properties of the style definition to the Rule objects. This is used when
	 * creating an actual style sheet.
	 */
	public get rules(): cssts.AllRules<T>
	{
		if (!this.domSS)
			this.activate();

		return this._rules as cssts.AllRules<T>
	}



	// Parses the style sheet definition and creates names for classes, IDs, keyframes.
	public process()
	{
		this.name = this.ssDef.constructor.name;

		for( let ruleName in this.ssDef)
		{
			let rule = this.ssDef[ruleName];
			if (!(rule instanceof Rule))
				continue;

			rule.process( this.name, ruleName);
			this._rules[ruleName] = rule;

			if (rule instanceof ClassRule)
				this._classNames[ruleName] = rule.combinedName;
		}
	}



	// Inserts this style sheet into DOM
	public activate(): void
	{
		if (this.domSS)
			return;

		// create <style> element and insert it into <head>
		this.styleElm = document.createElement( "style");
		this.styleElm.id = this.name;
		document.head.appendChild( this.styleElm);

		this.domSS = this.styleElm.sheet as CSSStyleSheet;

		// go over the rules, convert them to strings and insert them into the style sheet
		for( let ruleName in this._rules)
			this.domSS.insertRule( this._rules[ruleName].toString());
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



	// Reference to the style sheet definition, which we processed. This object will contain all
	// the rulsets belonging to this style sheet.
	private ssDef: T;

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



/**
 * Processes the given style sheet definition and returns the StyleSheet object that contains
 * names of IDs, classes and keyframes and allows style manipulations.
 * @param sheetDef 
 */
export function createStyleSheetImpl<T extends cssts.IStyleSheetDefinition>( ssDef: T): cssts.IStyleSheet<T>
{
	// check whether the style sheet definition object has already been processed
	if (!ssDef.styleSheet)
		ssDef.styleSheet = new StyleSheet<T>( ssDef);

	return ssDef.styleSheet as cssts.IStyleSheet<T>;
}



