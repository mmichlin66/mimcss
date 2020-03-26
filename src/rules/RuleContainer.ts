import {NamesOfPropsOfType, PropsOfType, IRule, IClassRule, IIDRule, IAnimationRule, ICustomVar,
		IRuleDefinition, IRuleDefinitionClass, IRuleContainer, RuleType
		} from "./RuleTypes"
import {IStyleScope} from "../scope/ScopeTypes"
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
	/** Adds an external style scope to this style scope */
	addExternalScope( scope: IStyleScope): void;

	/** Generates a name, which will be unique in this style scope */
	getScopedRuleNamed( ruleName: string): string;
}



/**
 * The RuleContainer class represents a parsed form of a rule definition class.
 */
export abstract class RuleContainer<T = IRuleDefinition> extends Rule implements IRuleContainer<T>
{
	public constructor( type: number, definition: T | IRuleDefinitionClass<T>)
	{
		super( type);
		this.definitionClass = definition;
	}



	/** Map of names of properties defining class rules to actual class names. */
	public get classes(): NamesOfPropsOfType<T,IClassRule> { return this._classes as NamesOfPropsOfType<T,IClassRule> }

	/** Map of names of properties defining ID rules to actual IDs. */
	public get ids(): NamesOfPropsOfType<T,IIDRule> { return this._ids as NamesOfPropsOfType<T,IIDRule>; }

	/** Map of names of properties defining animation rules to actual animation names. */
	public get animations(): NamesOfPropsOfType<T,IAnimationRule> { return this._animations as NamesOfPropsOfType<T,IAnimationRule>; }

	/** Map of names of properties defining custom property rules to the ICustomVar objects. */
	public get vars(): PropsOfType<T,ICustomVar> { return this._vars as PropsOfType<T,ICustomVar>; }

	/** Map of property names to rule objects. */
	public get rules(): PropsOfType<T,IRule> { return this._rules as PropsOfType<T,IRule>; }

	/**  Map of property names to external style scopes created using the $use function. */
	public get uses(): PropsOfType<T,IStyleScope> { return this._uses as PropsOfType<T,IStyleScope>; }


	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	protected processRules(): void
	{
		// check if the definition has already been processed
		if (this.isProcessed)
			return;

		this.allNames = {};
		this._classes = {};
		this._ids = {};
		this._animations = {};
		this._vars = {};

		this._rules = {};
		this._uses = {};
		this.allRules = [];

		// get the "rule definition" object whose properties are the rule objects
		let rulesDef: IRuleDefinition;
		if (typeof this.definitionClass === "function")
		{
			// if the "definition" is a class then create an instance of it
			try
			{
				rulesDef = new (this.definitionClass as IRuleDefinitionClass<IRuleDefinition>)();
			}
			catch( err)
			{
				console.error( `Error instantiating Rule Definition of type '${this.definitionClass.name}'`);
				return;
			}
		}
		else
		{
			// if the "definition" is an object (not a class) then use it directly
			rulesDef = this.definitionClass;
		}

		// process rules that are assigned to the properties of the definition class
		this.processNamedRules( rulesDef);
	}



	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	private processNamedRules( rulesDef: IRuleDefinition): void
	{
		// loop over the properties of the definition object and process those that are rules.
		for( let propName in rulesDef)
		{
			if (propName === "$unnamed")
			{
				let propVal = rulesDef.$unnamed;
				this.processUnnamedRules( propVal as Rule[])
				continue;
			}

			let propVal = rulesDef[propName];
			if (propVal instanceof CustomVar)
				this.processCustomVar( propName, propVal as CustomVar)
			else if (propVal instanceof Rule)
				this.processNamedRule( propName, propVal as Rule);
		}
	}



	// Processes custom CSS property.
	private processCustomVar( propName: string, varObj: CustomVar): void
	{
		// if the object is already assigned to a style scope, we create a clone of the
		// rule and assign it to our scope.
		if (varObj.container)
			varObj = varObj.clone();

		varObj.process( this, this.owner, propName);

		this.allNames[propName] = varObj.name;
		this._vars[propName] = varObj;
	}



	// Processes the given Rule-derived object.
	private processNamedRule( propName: string, rule: Rule): void
	{
		// ScopeStyle derives from Rule (via RuleContainer); however, it is not a real rule.
		// We inform our owner style scope about the "imported" scope so that when the owner
		// scope is activated, the imported one is activated too.
		if (rule.ruleType === RuleType.SCOPE)
		{
			this._uses[propName] = rule as any as IStyleScope;
			this.owner.addExternalScope( rule as any as IStyleScope);
			return;
		}

		// if the rule object is already assigned to a style scope, we create a clone of the
		// rule and assign it to our scope.
		if (rule.owner)
			rule = rule.clone();

		rule.process( this, this.owner, propName);

		// remember rules
		this._rules[propName] = rule;
		this.allRules.push( rule);

		// put rules and their names into buckets
		if (rule instanceof ClassRule)
		{
			this.allNames[propName] = rule.name;
			this._classes[propName] = rule.name;
		}
		else if (rule instanceof IDRule)
		{
			this.allNames[propName] = rule.name;
			this._ids[propName] = rule.name;
		}
		else if (rule instanceof AnimationRule)
		{
			this.allNames[propName] = rule.name;
			this._animations[propName] = rule.name;
		}
	}



	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	private processUnnamedRules( rules: Rule[]): void
	{
		if (!rules || rules.length === 0)
			return;

		// loop over the properties of the definition object and process those that are rules.
		for( let rule of rules)
		{
			// ScopeStyle derives from Rule (via RuleContainer); however, it is not a real rule.
			// We inform our owner style scope about the "imported" scope so that when the owner
			// scope is activated, the imported one is activated too.
			if (rule.ruleType === RuleType.SCOPE)
			{
				this.owner.addExternalScope( rule as any as IStyleScope);
				continue;
			}

			// if the rule object is already assigned to a style scope, we create a clone of the
			// rule and assign it to our scope.
			if (rule.owner)
				rule = rule.clone();

			rule.process( this, this.owner, null);

			this.allRules.push( rule);
		}
	}



	// Inserts all rules defined in this container to either the style sheet or grouping rule.
	protected insertRules( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		for( let rule of this.allRules)
			rule.insert( parent);

		// isert our custom variables in a ":root" rule
		let varNames = Object.keys( this._vars);
		if (varNames.length === 0)
			return;

		let s = `:root {${varNames.map( (varName) => this._vars[varName].toCssString()).join(";")}}`;
		let index = parent.insertRule( s, parent.cssRules.length);
		this.customVarStyleRule = parent.cssRules[index] as CSSStyleRule;
	}



	// Helper properties
	public setCustomVarValue( name: string, value: string): void
	{
		this.customVarStyleRule && this.customVarStyleRule.style.setProperty( name, value);
	}



	// Helper properties
	public get isProcessed(): boolean { return !!this._rules; }



	// Class that defined this style scope. This member is used for style scope derivation
	public readonly definitionClass: IRuleDefinitionClass<T> | T;

	// Names of all classes, IDs, animations and custom properties defined in this container.
	public allNames: { [K: string]: string };

	// List of all rules
	public allRules: Rule[];

	// Map of names of properties defining class rules to actual class names.
	private _classes: { [K: string]: string };

	// Map of names of properties defining ID rules to actual IDs.
	private _ids: { [K: string]: string };

	// Map of names of properties defining animation rules to actual animation names.
	private _animations: { [K: string]: string };

	// Map of names of properties defining custom property rules to the CustomVar objects.
	private _vars: { [K: string]: CustomVar };

	// Map of names of properties of the rule definitions to the Rule objects.
	private _rules: { [K: string]: IRule };

	//  Map of property names to external style scopes created using the $use function.
	private _uses: { [K: string]: IStyleScope }

	// ":root" rule where all custom CSS properties defined in this container are defined.
	private customVarStyleRule: CSSStyleRule;
}



