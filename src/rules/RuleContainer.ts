import {NamesOfPropsOfType, PropsOfType, IRule, IClassRule, IIDRule, IAnimationRule, IVarRule,
	IGroupRuleDefinitionClass, IRuleContainer, RuleType, IStylesheet
		} from "./RuleTypes"
import {Rule} from "./Rule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
import {AnimationRule} from "./AnimationRule"
import {VarRule} from "./VarRule"
import {ImportRule} from "./ImportRule"
import {NamespaceRule} from "./NamespaceRule"



/**
 * The IRuleContainerOwner interface represents a stylesheet that "owns" the rules under this
 * container. In particular, the owner's job is to generate "scoped" unique names.
 */
export interface IRuleContainerOwner
{
	/** Returns the instance of the stylesheet definition class */
	getDefinitionInstance(): any;

	/** Adds an external stylesheet to this stylesheet */
	addExternalStylesheet( stylesheet: IStylesheet): void;

	/** Generates a name, which will be unique in this stylesheet */
	getScopedRuleName( ruleName: string): string;
}



/**
 * The RuleContainer class is a base for classes that contain CSS rules; that is, stylesheet and
 * grouping rules. The RuleContainer class implements parsing form of a rule definition class or
 * object.
 */
export abstract class RuleContainer<T extends {} = {}> extends Rule implements IRuleContainer<T>
{
	public constructor( type: number)
	{
		super( type);
	}



	/** Map of names of properties defining class rules to actual class names. */
	public get classes(): NamesOfPropsOfType<T,IClassRule> { return this._classes as NamesOfPropsOfType<T,IClassRule> }

	/** Map of names of properties defining ID rules to actual IDs. */
	public get ids(): NamesOfPropsOfType<T,IIDRule> { return this._ids as NamesOfPropsOfType<T,IIDRule>; }

	/** Map of names of properties defining animation rules to actual animation names. */
	public get animations(): NamesOfPropsOfType<T,IAnimationRule> { return this._animations as NamesOfPropsOfType<T,IAnimationRule>; }

	/** Map of names of properties defining custom property rules to the IVarRule objects. */
	public get vars(): PropsOfType<T,IVarRule> { return this._vars as PropsOfType<T,IVarRule>; }

	/** Map of property names to rule objects. */
	public get rules(): PropsOfType<T,IRule> { return this._rules as PropsOfType<T,IRule>; }

	/**  Map of property names to external stylesheets created using the $use function. */
	public get uses(): PropsOfType<T,IStylesheet> { return this._uses as PropsOfType<T,IStylesheet>; }


	// Creates the stylesheet definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	protected processRules(): void
	{
		// check if the definition has already been processed
		if (this.isProcessed)
			return;

		this.allRules = [];
		this.importRules = [];
		this.namespaceRules = [];
		this.allNames = {};

		this._classes = {};
		this._ids = {};
		this._animations = {};
		this._vars = {};
		this._rules = {};
		this._uses = {};

		// get the "rule definition" object whose properties are the rule objects
		let rulesDef = this.createDefinitionInstance();
		if (!rulesDef)
			return;

		// loop over the properties of the definition object and process those that are rules,
		// custom var definitions and arrays.
		for( let propName in rulesDef)
		{
			let propVal = rulesDef[propName];
			if (propVal instanceof VarRule)
				this.processVarRule( propName, propVal as VarRule)
			else if (propVal instanceof Rule)
				this.processNamedRule( propName, propVal as Rule);
			else if (Array.isArray(propVal))
				this.processUnnamedRules( propVal)
		}
	}



	// Returns an instance of the definition class or null if failure
	protected abstract createDefinitionInstance(): T | null;



	// Processes custom CSS property.
	private processVarRule( propName: string, varObj: VarRule): void
	{
		// if the object is already assigned to a stylesheet, we create a clone of the
		// rule and assign it to our stylesheet.
		if (varObj.container)
			varObj = varObj.clone();

		varObj.process( this, this.owner, propName);

		this.allNames[propName] = varObj.name;
		this._vars[propName] = varObj;
	}



	// Processes the given Rule-derived object.
	private processNamedRule( propName: string, rule: Rule): void
	{
		// Stylesheet derives from Rule (via RuleContainer); however, it is not a real rule.
		// We inform our owner stylesheet about the "imported" stylesheet so that when the owner
		// stylesheet is activated, the imported one is activated too.
		if (rule.ruleType === RuleType.SCOPE)
		{
			this._uses[propName] = rule as any as IStylesheet;
			this.owner.addExternalStylesheet( rule as any as IStylesheet);
			return;
		}

		// if the rule object is already assigned to a stylesheet, we create a clone of the
		// rule and assign it to our stylesheet.
		if (rule.owner)
			rule = rule.clone();

		rule.process( this, this.owner, propName);

		// remember the rule
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
		else if (rule instanceof ImportRule)
			this.importRules.push( rule);
		else if (rule instanceof NamespaceRule)
			this.namespaceRules.push( rule);
	}



	// Processes rules from the given array.
	private processUnnamedRules( propVals: any[]): void
	{
		if (!propVals || propVals.length === 0)
			return;

		// loop over the properties of the definition object and process those that are rules.
		for( let propVal of propVals)
		{
			if (!(propVal instanceof Rule))
				continue;

			let rule = propVal as Rule;

			// Stylesheet derives from Rule (via RuleContainer); however, it is not a real rule.
			// We inform our owner stylesheet about the "imported" stylesheet so that when the owner
			// stylesheet is activated, the imported one is activated too.
			if (rule.ruleType === RuleType.SCOPE)
			{
				this.owner.addExternalStylesheet( rule as any as IStylesheet);
				continue;
			}

			// if the rule object is already assigned to a stylesheet, we create a clone of the
			// rule and assign it to our stylesheet.
			if (rule.owner)
				rule = rule.clone();

			rule.process( this, this.owner, null);

			this.allRules.push( rule);
			if (rule instanceof ImportRule)
				this.importRules.push( rule);
			else if (rule instanceof NamespaceRule)
				this.namespaceRules.push( rule);
		}
	}



	// Inserts all rules defined in this container to either the style sheet or grouping rule.
	protected insertRules( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		// insert @import and @namespace rules as they must be before other rules. If the parent is a grouping
		// rule, don't insert @import rules at all
		if (parent instanceof CSSStyleSheet)
		{
			this.importRules && this.importRules.forEach( rule => rule.insert( parent))
			this.namespaceRules && this.namespaceRules.forEach( rule => rule.insert( parent))
		}

		// isert our custom variables in a ":root" rule
		let varNames = Object.keys( this._vars);
		if (varNames.length > 0)
		{
			this.cssCustomVarStyleRule = Rule.addRuleToDOM( `:root {${varNames.map( (varName) =>
				this._vars[varName].toCssString()).join(";")}}`, parent) as CSSStyleRule;
		}

		// insert all other rules
		for( let rule of this.allRules)
		{
			if (!(rule instanceof ImportRule || rule instanceof NamespaceRule))
				rule.insert( parent);
		}
	}



	// Clears all CSS rule objects defined in this container.
	protected clearRules(): void
	{
		this.cssCustomVarStyleRule = null

		// insert all other rules
		this.allRules.forEach( rule => rule.clear());
	}



	// Sets the given value for the property with the given name
	public setCustomVarValue( name: string, value: string, important?: boolean): void
	{
		if (this.cssCustomVarStyleRule)
			this.cssCustomVarStyleRule.style.setProperty( name, value, important ? "!important" : null);
	}



	// Helper properties
	public get isProcessed(): boolean { return !!this._rules; }



	// Names of all classes, IDs, animations and custom properties defined in this container.
	public allNames: { [K: string]: string };

	// List of all rules except @import
	public allRules: Rule[];

	// List of @import rules
	public importRules: ImportRule[];

	// List of @namespace rules
	public namespaceRules: NamespaceRule[];

	// Map of names of properties defining class rules to actual class names.
	private _classes: { [K: string]: string };

	// Map of names of properties defining ID rules to actual IDs.
	private _ids: { [K: string]: string };

	// Map of names of properties defining animation rules to actual animation names.
	private _animations: { [K: string]: string };

	// Map of names of properties defining custom property rules to the VarRule objects.
	private _vars: { [K: string]: VarRule };

	// Map of names of properties of the rule definitions to the Rule objects.
	private _rules: { [K: string]: IRule };

	//  Map of property names to external stylesheets created using the $use function.
	private _uses: { [K: string]: IStylesheet }

	// ":root" rule where all custom CSS properties defined in this container are defined.
	private cssCustomVarStyleRule: CSSStyleRule;
}



