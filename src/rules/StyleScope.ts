import {NamesOfPropsOfType, PropsOfType, IRule, IStyleRule, ITagRule, IClassRule, IIDRule,
		ISelectorRule, IAnimationRule, ICustomVar} from "../api/rules"
import {IStyleScopeDefinitionClass, IStyleScope} from "../api/scope"
import {Rule} from "./Rule"
import {TssManager} from "./TssManager"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The StyleScope class represents a parsed form of a IStyleScopeDefinition-derived class.
 */
export class StyleScope<T = any> extends RuleContainer implements IStyleScope<T>, IRuleContainerOwner
{
	public constructor( defClass: IStyleScopeDefinitionClass<T>)
	{
		super( defClass)
		this.Definition = defClass;
	}



	/** Names of classes defined in the style sheet */
	public get classNames(): NamesOfPropsOfType<T,IClassRule> { this.activate(); return this._classNames as NamesOfPropsOfType<T,IClassRule> }

	/** Names of classes defined in the style sheet */
	public get idNames(): NamesOfPropsOfType<T,IIDRule> { this.activate(); return this._idNames as NamesOfPropsOfType<T,IIDRule>; }

	/** Names of keyframes defined in the style sheet */
	public get animationNames(): NamesOfPropsOfType<T,IAnimationRule> { this.activate(); return this._animationNames as NamesOfPropsOfType<T,IAnimationRule>; }

	/** Names of custom CSS properties defined in the style scope */
	public get varNames(): NamesOfPropsOfType<T,ICustomVar> { this.activate(); return this._varNames as NamesOfPropsOfType<T,ICustomVar>; }

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

	/** Map of all rules. */
	public get namedRules(): PropsOfType<T,IRule> { this.activate(); return this._namedRules as PropsOfType<T,IRule>; }

	/** Map of all rules. */
	public get unnamedRules(): IRule[] { this.activate(); return this._unnamedRules; }



	// Creates a copy of the rule.
	public clone(): Rule { return null; }



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		super.insertRules();
	}



	// Creates the style scope definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	private processScope(): void
	{
		// check if the scope definition has already been processed
		if (this.isProcessed)
			return;

		// the container and the owner properties of the Rule base class point to the StyleScope
		// object itself
		super.process( this, this, null);

		this.isMultiplex = !!this.Definition.isMultiplex;

		// in DEBUG, each class has a name unless it was created as an anonymous class. In RELEASE,
		// (as well as in the anonymous cases), the name is undefined and we generate a unique
		// name for the style scope.
		this.name = this.Definition.name;
		if (!this.name)
			this.name = TssManager.generateUniqueName( "s");

		// process sub-rules rules.
		this.processRules();
	}



	/** Generates a name, which will be unique in this style scope */
	public getScopedRuleNamed( ruleName: string): string
	{
		// check whether we already have this rule name: if yes, return the already assigned
		// unique scoped name
		if (ruleName in this._allNames)
			return this._allNames[ruleName];
		else
			return this.generateScopedName( ruleName);
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
		if (this.isActivated)
			return;

		this.processScope();
		TssManager.activate( this);
	}



	// Removes this style scope from DOM - only works for multiplex style scopes
	public deactivate(): void
	{
		if (!this.isActivated)
			return;

		TssManager.deactivate( this);
	}



	public setDOMInfo( styleSheet: CSSStyleSheet)
	{
		this.cssRule = styleSheet;
	}

	public clearDOMInfo()
	{
		this.cssRule = undefined;
	}



	// Helper properties
	private get isActivated(): boolean { return !!this.cssRule; }



	// Class that defined this style scope. This member is used for style scope derivation
	public readonly Definition: IStyleScopeDefinitionClass<T>;

	// Name of the style sheet - used to create scoped names of style rules
	public name: string;

	// Flag indicating whether this style scope object owns the <style> element. This is true only
	// for multiplex styles scopes - those that can be creaed multiple times.
	public isMultiplex: boolean;
}



