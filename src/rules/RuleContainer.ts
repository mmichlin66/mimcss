import {UnnamedRule, RuleDefinitionOptions, IRuleDefinitionClass} from "../api/rules"
import {Rule} from "./Rule"
import {TagRule} from "./TagRule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
import {SelectorRule} from "./SelectorRule"
import {AnimationRule} from "./AnimationRule"
import {CustomVar} from "./CustomVar"



/**
 * The IRuleContainerOwner interface represents a style scope that "owns" the rules under this
 * container. In particular, the owner's job is to generate "scoped" unique names.
 */
export interface IRuleContainerOwner
{
	/** Generates a name, which will be unique in this style scope */
	getScopedRuleNamed( ruleName: string): string;
}



/**
 * The RuleContainer class represents a parsed form of a rule definition class.
 */
export abstract class RuleContainer<T = any> extends Rule
{
	public constructor( definitionClass: IRuleDefinitionClass<T>)
	{
		super();
		this.RuleDefinitionClass = definitionClass;
	}



	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	protected processRules(): void
	{
		// check if the scope definition has already been processed
		if (this.isProcessed)
			return;

		this._allNames = {};
		this._classNames = {};
		this._idNames = {};
		this._animationNames = {};
		this._varNames = {};

		this._allRules = [];
		this._namedRules = {};
		this._unnamedRules = []
		this._styleRules = {};
		this._tagRules = {};
		this._classRules = {};
		this._idRules = {};
		this._selectorRules = {};
		this._animationRules = {};
		this._varRules = {};

		// insert our internal rule for custom CSS properties into the list of unnamed rules.
		this.customVarRule = new CustomVarRule();
		this.customVarRule.process( this, this.owner, null)
		this._allRules.push( this.customVarRule);

		// create instance of the rules definition class and then go over its properties,
		// which define CSS rules.
		let rulesDef: T;
		let options: RuleDefinitionOptions = {};
		try
		{
			// create instance of the style scope definition class and then go over its properties,
			// which define CSS rules.
			rulesDef = new this.RuleDefinitionClass( options);
		}
		catch( err)
		{
			console.error( `Error instantiating Group Rule Definition of type '${this.RuleDefinitionClass.name}'`);
			return;
		}

		this.processNamedRules( rulesDef);

		// if the definition class implements unnamedRules process them now
		if (options.unnamedRules)
			this.processUnnamedRules( options.unnamedRules);
	}



	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	private processNamedRules( rulesDef: T): void
	{
		// loop over the properties of the definition object and process those that are rules.
		for( let propName in rulesDef)
		{
			let propVal = rulesDef[propName];
			if (!(propVal instanceof Rule))
				continue;

			let ruleName = propName;
			let rule = propVal as Rule;

			// if the rule object is already assigned to a style scope, we create a clone of the
			// rule and assign it to our scope.
			if (rule.owner)
				rule = rule.clone();

			rule.process( this, this.owner, ruleName);

			if (rule.isRealCssRule)
			{
				this._allRules.push( rule);
				this._namedRules[ruleName] = rule;
			}

			if (rule instanceof TagRule)
			{
				this._styleRules[ruleName] = rule;
				this._tagRules[ruleName] = rule;
			}
			else if (rule instanceof ClassRule)
			{
				this._styleRules[ruleName] = rule;
				this._classRules[ruleName] = rule;
				this._allNames[ruleName] = rule.className;
				this._classNames[ruleName] = rule.className;
			}
			else if (rule instanceof IDRule)
			{
				this._styleRules[ruleName] = rule;
				this._idRules[ruleName] = rule;
				this._allNames[ruleName] = rule.idName;
				this._idNames[ruleName] = rule.idName;
			}
			else if (rule instanceof SelectorRule)
			{
				this._styleRules[ruleName] = rule;
				this._selectorRules[ruleName] = rule;
			}
			else if (rule instanceof AnimationRule)
			{
				this._allNames[ruleName] = rule.animationName;
				this._animationNames[ruleName] = rule.animationName;
				this._animationRules[ruleName] = rule;
			}
			else if (rule instanceof CustomVar)
			{
				this._allNames[ruleName] = rule.varName;
				this._varNames[ruleName] = rule.varName;
				this._varRules[ruleName] = rule;
			}
		}
	}



	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	private processUnnamedRules( unnamedRules: UnnamedRule[]): void
	{
		if (!unnamedRules)
			return;
		else if (!Array.isArray(unnamedRules))
		{
			console.error( `createUnnamedRules method of Style Scope Definition of type '${this.RuleDefinitionClass.name}' must return array`);
			return;
		}

		// loop over the properties of the definition object and process those that are rules.
		for( let unnamedRule of unnamedRules)
		{
			if (!(unnamedRule instanceof Rule))
				continue;

			let rule = unnamedRule as Rule;
			if (rule.nameIsRequired)
				continue;

			// if the rule object is already assigned to a style scope, we create a clone of the
			// rule and assign it to our scope.
			if (rule.owner)
				rule = rule.clone();

			rule.process( this, this.owner, null);

			this._allRules.push( rule);
			this._unnamedRules.push( rule);
		}
	}



	// Copies internal data from another rule object.
	protected copyFrom( src: RuleContainer): void
	{
	}



	// Inserts all rules defined in this container to either the style sheet or grouping rule.
	protected insertRules(): void
	{
		for( let rule of this._allRules)
			rule.insert( this.cssRule as CSSStyleSheet | CSSGroupingRule);
	}



	// Inserts the ":root" rule with custom variable definitions.
	public insertCustomVarRule( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		let varNames = Object.keys( this._varRules);
		if (varNames.length === 0)
			return;

		let s = `:root {${varNames.map( (varName) => this._varRules[varName].toCssString()).join(";")}}`;
		parent.insertRule( s, parent.cssRules.length);
	}


	
	// Helper properties
	public get isProcessed(): boolean { return !!this._allRules; }



	// Class that defined this style scope. This member is used for style scope derivation
	public readonly RuleDefinitionClass: IRuleDefinitionClass<T>;

	// Names of all classes, IDs, animations and custom properties defined in this container.
	protected _allNames: { [K: string]: string }

	// Names of classes, IDs, animations and custom properties defined in this container. The
	// keys are property names used in the style sheet definition; the values are the actual names
	// that will be inserted into the actual style sheet.
	protected _classNames: { [K: string]: string }
	protected _idNames: { [K: string]: string }
	protected _animationNames: { [K: string]: string }
	protected _varNames: { [K: string]: string }

	// List of all rules
	public _allRules: Rule[]

	// Map of all named rules
	public _namedRules: { [K: string]: Rule }

	// List of rules without names. This rules are inserted into DOM but cannot be accessed
	// and manipulated programmatically
	public _unnamedRules: Rule[];

	// Map of names of properties of the style definition to the Rule objects. This is used when
	// creating an actual style sheet.
	protected _styleRules: { [K: string]: Rule }
	protected _tagRules: { [K: string]: Rule }
	protected _classRules: { [K: string]: Rule }
	protected _idRules: { [K: string]: Rule }
	protected _selectorRules: { [K: string]: Rule }
	protected _animationRules: { [K: string]: Rule }
	protected _varRules:{ [K: string]: CustomVar<any> };

	// Artificial rule that combines all custom variables defined in this container.
	protected customVarRule: CustomVarRule;
}



/**
 * The CustomVarRule class represents a :root rule that is used for defining custom CSS properties.
 */
class CustomVarRule extends Rule
{
	// Creates a copy of the rule.
	public clone(): Rule { return null; }

	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void { return this.container.insertCustomVarRule( parent)}
}



