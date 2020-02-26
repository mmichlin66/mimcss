import {IStyleScopeDefinitionClass, IStyleScope, NamesOfPropsOfType, PropsOfType, IRule,
		IStyleRule, ITagRule, IClassRule, IIDRule, ISelectorRule, IAnimationRule, ICustomVar}
		from "./cssts"

import {Rule} from "./Rule"
import {TagRule} from "./TagRule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
import {SelectorRule} from "./SelectorRule"
import {AnimationRule} from "./AnimationRule"
import {CustomVar} from "./CustomVar"
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
		this._varNames = {};
		this._allRules = {};
		this._styleRules = {};
		this._tagRules = {};
		this._classRules = {};
		this._idRules = {};
		this._selectorRules = {};
		this._animationRules = {};
		this._varRules = {};
		this.unnamedRules = []

		this.process( ssDefClass);
	}



	/** Names of classes defined in the style sheet */
	public get classNames(): NamesOfPropsOfType<T,IClassRule> { this.activate(); return this._classNames as NamesOfPropsOfType<T,IClassRule> }

	/** Names of classes defined in the style sheet */
	public get idNames(): NamesOfPropsOfType<T,IIDRule> { this.activate(); return this._idNames as NamesOfPropsOfType<T,IIDRule>; }

	/** Names of keyframes defined in the style sheet */
	public get animationNames(): NamesOfPropsOfType<T,IAnimationRule> { this.activate(); return this._animationNames as NamesOfPropsOfType<T,IAnimationRule>; }

	/** Names of custom CSS properties defined in the style scope */
	public get varNames(): NamesOfPropsOfType<T,ICustomVar> { this.activate(); return this._varNames as NamesOfPropsOfType<T,ICustomVar>; }

	/** Map of all rules. */
	public get allRules(): PropsOfType<T,IRule> { this.activate(); return this._allRules as PropsOfType<T,IRule>; }

	/** Map of all style (tag, class, ID and selector) rules. */
	public get styleRules(): PropsOfType<T,IStyleRule> { this.activate(); return this._styleRules as PropsOfType<T,IStyleRule>; }

	/** Map of all tag rules. */
	public get tagRules(): PropsOfType<T,ITagRule> { this.activate(); return this._tagRules as PropsOfType<T,ITagRule>; }

	/** Map of all class rules. */
	public get classRules(): PropsOfType<T,IClassRule> { this.activate(); return this._classRules as PropsOfType<T,IClassRule>; }

	/** Map of all ID rules. */
	public get idRules(): PropsOfType<T,IIDRule> { this.activate(); return this._idRules as PropsOfType<T,IIDRule>; }

	/** Map of all selector rules. */
	public get selectorRules(): PropsOfType<T,ISelectorRule> { this.activate(); return this._selectorRules as PropsOfType<T,ISelectorRule>; }

	/** Map of all animation rules. */
	public get animationRules(): PropsOfType<T,IAnimationRule> { this.activate(); return this._animationRules as PropsOfType<T,IAnimationRule>; }

 	/** The ":root" block with CSS custom property definitions. */
	public get varRules(): PropsOfType<T,ICustomVar> { this.activate(); return this._varRules as PropsOfType<T,ICustomVar>; }


	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	private process( ssDefClass: IStyleScopeDefinitionClass<T>): void
	{
		this.isMultiplex = !!ssDefClass.isMultiplex;

		// in DEBUG, each class has a name unless it was created as an anonymous class. In RELEASE,
		// (as well as in the anonymous cases), the name is undefined and we generate a unique
		// name for the style scope.
		this.name = ssDefClass.name;
		if (!this.name)
			this.name = TssManager.generateUniqueName( "s");

		// insert our internal rule for custom CSS properties into the list of unnamed rules.
		this.unnamedRules.push( new CustomVarRule(this));

		// create instance of the style scope definition class and then go over its properties,
		// which define CSS rules.
		let ssDef: T;
		try
		{
			// create instance of the style scope definition class and then go over its properties,
			// which define CSS rules.
			ssDef = new ssDefClass();
		}
		catch( err)
		{
			console.error( `Error instantiating Style Scope Definition of type '${ssDefClass.name}'`);
			return;
		}

		// loop over the properties of the definition object and process those that are rules.
		for( let propName in ssDef)
		{
			let propVal = ssDef[propName];
			if (!(propVal instanceof Rule))
				continue;

			let ruleName = propName;
			let rule = propVal as Rule;

			// if the rule object is already assigned to a style scope, we create a clone of the
			// rule and assign it to our scope.
			if (rule.owner)
				rule = rule.clone();

			rule.process( this, ruleName);

			if (rule.isRealCssRule)
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
			else if (rule instanceof CustomVar)
			{
				this._varNames[ruleName] = rule.varName;
				this._varRules[ruleName] = rule;
			}
		}
	}



	// Generates a name, which will be unique in this style scope
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
			this.setDOMInfo( this.styleElm.sheet as CSSStyleSheet);

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



	public setDOMInfo( domSS: CSSStyleSheet)
	{
		this.domSS = domSS;
	}

	public clearDOMInfo()
	{
		this.domSS = undefined;
	}



	// Returns CSS string representatin of the :root rule with custom CSS properties. This is
	// invoked by the "fake" CustomVarRule.
	public customVarsToCssString(): string
	{
		let s = ":root {";
		for( let varName in this._varRules)
			s += this._varRules[varName].toCssString() + ";";

		return s + "}";
	}



	// Name of the style sheet - used to create scoped names of style rules
	public name: string;

	// Names of classes, IDs, animations and custom properties defined in the style sheet. The
	// keys are property names used in the style sheet definition; the values are the actual names
	// that will be inserted into the actual style sheet.
	private readonly _classNames: { [K: string]: string }
	private readonly _idNames: { [K: string]: string }
	private readonly _animationNames: { [K: string]: string }
	private readonly _varNames: { [K: string]: string }

	// Map of names of properties of the style definition to the Rule objects. This is used when
	// creating an actual style sheet.
	private readonly _allRules: { [K: string]: Rule }
	private readonly _styleRules: { [K: string]: Rule }
	private readonly _tagRules: { [K: string]: Rule }
	private readonly _classRules: { [K: string]: Rule }
	private readonly _idRules: { [K: string]: Rule }
	private readonly _selectorRules: { [K: string]: Rule }
	private readonly _animationRules: { [K: string]: Rule }
	private readonly _varRules:{ [K: string]: CustomVar<any> };

	// List of rules without names. This rules are inserted into DOM but cannot be accessed
	// and manipulated programmatically
	private readonly unnamedRules: Rule[];

	// Flag indicating whether this style scope object owns the <style> element. This is true only
	// for multiplex styles scopes - those that can be creaed multiple times.
	private isMultiplex: boolean;

	// Style element DOM object which is only relevant for multiplex style scopes, which own their
	// <style> element.
	private styleElm?: HTMLStyleElement;

	// When activated, points to the DOM style sheet object inserted into the <head> element
	private domSS?: CSSStyleSheet;
}



/**
 * The CustomVarRule class represents a :root rule that is used for defining custom CSS properties.
 */
class CustomVarRule extends Rule
{
	constructor( owner: StyleScope)
	{
		super();
		this.owner = owner;
		this.ruleName = ":root";
	}

	// Creates a copy of the rule.
	public clone(): Rule { return null; }

	// Copies internal data from another rule object.
	public copyFrom( src: Rule): void {}

	// Converts the rule to CSS string.
	public toCssString(): string { return this.owner.customVarsToCssString(); }
}



