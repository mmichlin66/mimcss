import {IRule, INamedEntity, IStyleDefinition} from "../api/RuleTypes"



/**
 * The IRuleSerializationContext interface keeps information during serialization of style
 * definition classes and instances.
 */
export interface IRuleSerializationContext
{
    // Adds rule text
    addRule( s: string, isTopLevelRule?: boolean): void;

    // Adds rule text
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
 * The ITopLevelRuleContainer interface represents a top-level style definition object that "owns"
 * the rules under this container. In particular, the owner's job is to generate "scoped" unique
 * names.
 */
export interface ITopLevelRuleContainer extends IRuleContainer
{
	/** Generates a name, which will be unique in this stylesheet */
	getScopedName( ruleName: string): string;
}



/**
 * The RuleLike abstract class is a base for all "rules" defined in the style definition classes -
 * whether they correspond to real CssRules (and thus derive from the Rule class) or not (such as
 * counters, grid lines and grid areas).
 */
export abstract class RuleLike
{
	// Processes the rule.
	public process( c: IRuleContainer, tlc: ITopLevelRuleContainer, ruleName: string | null): void
	{
        this.c = c;
		this.tlc = tlc;
		this.ruleName = ruleName;
	}

	// Ppost-processes the rule. This method is invoked after all rules in the style definition
    // have been processed. This allows rules depend on other rules within the same style
    // definition file irregardless of the rules order. By the time this method is invoked, the
    // process method has been invoked for all rules and all the named rules have been assigned
    // their names.
	public postProcess(): void {}



	// Rule container to which this rule belongs.
	public c: IRuleContainer;

	// Container at the top of the chain of containers to which this rule belongs.
	public tlc: ITopLevelRuleContainer;

	// Name of the property of the stylesheet definition to which this rule was assigned. This can
	// be null for rules not created via assignment to style definition properties.
	public ruleName: string | null;
}



/**
 * The Rule class is used as a base class for all rules. As a parent of RuleContainer, the Rule
 * class is also an ancestor for Stylesheet; however, most of its the fields are undefined in
 * te Stylesheet instances.
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



	// Inserts the given rule into the given parent rule or stylesheet.
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
	// the styles sheet or the parent rule. This is undefined for Stylesheet objects.
	public cssRule: CSSRule | null;
}



/** Creates scoped names based on the given parameters */
export const createName = (topLevelContainer: ITopLevelRuleContainer, ruleName: string | null,
        nameOverride?: string | INamedEntity): string =>
	(!ruleName && !nameOverride) ? "" :
    !nameOverride ? topLevelContainer.getScopedName( ruleName!) :
    typeof nameOverride === "string" ? nameOverride :
    nameOverride.name;



