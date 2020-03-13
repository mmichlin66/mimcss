import {NamesOfPropsOfType, PropsOfType, IRule, IClassRule, IIDRule, IAnimationRule, ICustomVar,
		ICustomVarRule, NamedRule, UnnamedRule,
		RuleDefinitionOptions, IRuleDefinitionClass, IRuleContainer
		} from "../api/rules"
import {Rule} from "./Rule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
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
export abstract class RuleContainer<T = any> extends Rule implements IRuleContainer
{
	public constructor( type: number, definitionClass: IRuleDefinitionClass<T>)
	{
		super( type);
		this.definitionClass = definitionClass;
	}



	// /** Names of all named rules defined in the style sheet */
	// public get allNames(): NamesOfPropsOfType<T,NamedRule> { this.activate(); return this._allNames as NamesOfPropsOfType<T,NamedRule> }

	/** Names of classes defined in the style sheet */
	public get classes(): NamesOfPropsOfType<T,IClassRule> { this.activate(); return this._classes as NamesOfPropsOfType<T,IClassRule> }

	/** Names of classes defined in the style sheet */
	public get ids(): NamesOfPropsOfType<T,IIDRule> { this.activate(); return this._ids as NamesOfPropsOfType<T,IIDRule>; }

	/** Names of keyframes defined in the style sheet */
	public get animations(): NamesOfPropsOfType<T,IAnimationRule> { this.activate(); return this._animations as NamesOfPropsOfType<T,IAnimationRule>; }

	/** Names of custom CSS properties defined in the style scope */
	public get vars(): NamesOfPropsOfType<T,ICustomVar> { this.activate(); return this._vars as NamesOfPropsOfType<T,ICustomVar>; }

	/** Map of all tag rules. */
	public get rules(): PropsOfType<T,IRule> { this.activate(); return this._rules as PropsOfType<T,IRule>; }

	// /** Map of all rules. */
	// public get allRules(): IRule[] { this.activate(); return this._allRules as IRule[]; }

 	/** The ":root" block with CSS custom property definitions. */
	public get customVarRule(): ICustomVarRule { this.activate(); return this._customVarRule; }



	// Performs whatever actions necessary to insert the rules defined i the container to DOM.
	protected activate(): void {}



	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	protected processRules(): void
	{
		// check if the definition has already been processed
		if (this.isProcessed)
			return;

		this._allNames = {};
		this._classes = {};
		this._ids = {};
		this._animations = {};
		this._vars = {};

		this._rules = {};
		this._allRules = [];

		// create our internal rule for custom CSS properties
		this._customVarRule = new CustomVarRule<T>();
		this._customVarRule.process( this, this.owner, null)
		this._allRules.push( this._customVarRule);

		// create instance of the rules definition class and then go over its properties,
		// which define CSS rules.
		let rulesDef: T;
		let options: RuleDefinitionOptions = {};
		try
		{
			// create instance of the style scope definition class and then go over its properties,
			// which define CSS rules.
			rulesDef = new this.definitionClass( options);
		}
		catch( err)
		{
			console.error( `Error instantiating Group Rule Definition of type '${this.definitionClass.name}'`);
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
				this._rules[ruleName] = rule;
				this._allRules.push( rule);
			}

			if (rule instanceof ClassRule)
			{
				this._allNames[ruleName] = rule.className;
				this._classes[ruleName] = rule.className;
			}
			else if (rule instanceof IDRule)
			{
				this._allNames[ruleName] = rule.idName;
				this._ids[ruleName] = rule.idName;
			}
			else if (rule instanceof AnimationRule)
			{
				this._allNames[ruleName] = rule.animationName;
				this._animations[ruleName] = rule.animationName;
			}
			else if (rule instanceof CustomVar)
			{
				this._allNames[ruleName] = rule.varName;
				this._vars[ruleName] = rule.varName;
				this._customVarRule._vars[ruleName] = rule;
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
			console.error( `createUnnamedRules method of Style Scope Definition of type '${this.definitionClass.name}' must return array`);
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



	// Helper properties
	public get isProcessed(): boolean { return !!this._allNames; }



	// Class that defined this style scope. This member is used for style scope derivation
	protected readonly definitionClass: IRuleDefinitionClass<T>;

	// Names of all classes, IDs, animations and custom properties defined in this container.
	protected _allNames: { [K: string]: string };

	// Names of classes, IDs, animations and custom properties defined in this container. The
	// keys are property names used in the rule definition; the values are the actual names
	// that will be inserted into the actual style sheet.
	protected _classes: { [K: string]: string };
	protected _ids: { [K: string]: string };
	protected _animations: { [K: string]: string };
	protected _vars: { [K: string]: string };

	// Map of names of properties of the rule definitions to the Rule objects.
	protected _rules: { [K: string]: IRule };

	// Rule that combines all custom variables defined in this container.
	protected _customVarRule: CustomVarRule;

	// List of all rules
	public _allRules: Rule[];
}



/**
 * The CustomVarRule class represents a :root rule that is used for defining custom CSS properties.
 */
class CustomVarRule<T = any> extends Rule implements ICustomVarRule<T>
{
	constructor()
	{
		super( CSSRule.STYLE_RULE);
	}



 	/** The ":root" block with CSS custom property definitions. */
	public get vars(): PropsOfType<T,ICustomVar> { return this._vars as PropsOfType<T,ICustomVar>; }

	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( container, owner, ruleName);
		this._vars = {};
	}



	// Creates a copy of the rule.
	public clone(): Rule
	{
		return null;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		let varNames = Object.keys( this._vars);
		if (varNames.length === 0)
			return;

		let s = `:root {${varNames.map( (varName) => this._vars[varName].toCssString()).join(";")}}`;
		let index = parent.insertRule( s, parent.cssRules.length);
		this.cssRule = parent.cssRules[index];
	}



	public _vars:{ [K: string]: CustomVar<any> };
}



