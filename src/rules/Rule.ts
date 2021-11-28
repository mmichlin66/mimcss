import {IRule, INamedEntity, IStyleDefinition} from "../api/RuleTypes"



/**
 * The IRuleSerializationContext interface keeps information during serialization of style
 * definition classes and instances.
 */
export interface IRuleSerializationContext
{
    // Adds rule text
    addRule( s: string, isTopLevelRule?: boolean): void;

    // Adds StyleDefinition instance
    addSD( instance: IStyleDefinition): void;
}



/**
 * The IRuleContainer interface represents an object that accompanies and is associated with
 * a style definition object.
 */
export interface IRuleContainer
{
	/** Returns the instance of the stylesheet definition class */
	getDef(): IStyleDefinition;

	/** Generates a name, which will be unique in this stylesheet */
	getScopedName( ruleName: string | null, nameOverride?: string | INamedEntity): string;

	/** Inserts all rules defined in this container to either the style sheet or grouping rule. */
	insert( parent: CSSStyleSheet | CSSGroupingRule): void;

	/** Clears all CSS rule objects defined in this container. */
	clear(): void;

	/** Writes all rules recursively to the given string. */
	serialize( ctx: IRuleSerializationContext): void;

    /** Sets the given value for the custom CSS roperty with the given name. */
	setVarValue( name: string, value: string | null, important?: boolean, schedulerType?: number): void;
}



/**
 * The RuleLike abstract class is a base for all "rules" defined in the style definition classes -
 * whether they correspond to real CSS rules (and thus derive from the Rule class) or not (such as
 * counters, grid lines and grid areas).
 */
export abstract class RuleLike
{
	// Processes the rule.
	public process( c: IRuleContainer, ruleName: string | null): void
	{
        this.c = c;
		this.ruleName = ruleName;
	}



	// Rule container to which this rule belongs.
	public c: IRuleContainer;

	// Name of the property of the stylesheet definition to which this rule was assigned. This can
	// be null for rules not created via assignment to style definition properties.
	public ruleName: string | null;
}



/**
 * The Rule class is used as a base class for all rules.
 */
export abstract class Rule extends RuleLike implements IRule
{
	// Inserts this rule into the given parent rule or stylesheet. This method is called when the
	// style definition class, to which this rule belongs, is activated.
	public abstract insert( parent: CSSStyleSheet | CSSGroupingRule): void;

	// Clers the CSS rule object. This method is called when the style definition class, to which
	// this rule belongs, is deactivated.
	public clear(): void { this.cssRule = null; }

	// Serializes this rule to a string.
	public abstract serialize( ctx: IRuleSerializationContext): void;



	// Inserts the given rule into the given parent grouping rule or stylesheet.
	public static toDOM( ruleText: string, parent: CSSStyleSheet | CSSGroupingRule): CSSRule | null
	{
		try
		{
			let index = parent.insertRule( ruleText, parent.cssRules.length);
			return parent.cssRules[index];
		}
		catch( x)
		{
			console.error( `Cannot add CSS rule '${ruleText}'`, x)
			return null;
		}
	}



	// CSSRule-derived object corresponding to the actuall CSS rule inserted into
	// the styles sheet or the parent rule.
	public cssRule: CSSRule | null;
}



