import {IRule, INamedEntity, StyleDefinition} from "./RuleTypes"



/**
 * The IRuleSerializationContext interface keeps information during serialization of style
 * definition classes and instances.
 */
export interface IRuleSerializationContext
{
    // Adds rule text
    addRuleText( s: string, isTopLevelRule?: boolean): void;

    // Adds rule text
    addStyleDefinition( instance: StyleDefinition): void;
}



/**
 * The IRuleContainer interface represents an object that accompanies and is associated with
 * a style definition object.
 */
export interface IRuleContainer
{
	/** Returns the instance of the stylesheet definition class */
	getDefinitionInstance(): StyleDefinition;

	/** Inserts all rules defined in this container to either the style sheet or grouping rule. */
	insertRules( parent: CSSStyleSheet | CSSGroupingRule): void;

	/** Clears all CSS rule objects defined in this container. */
	clearRules(): void;

	/** Writes all rules recursively to the given string. */
	serializeRules( ctx: IRuleSerializationContext): void;

    /** Sets the given value for the custom CSS roperty with the given name. */
	setCustomVarValue( name: string, value: string | null, important?: boolean, schedulerType?: number): void;
}



/**
 * The ITopLevelRuleContainer interface represents a top-level style definition object that "owns"
 * the rules under this container. In particular, the owner's job is to generate "scoped" unique
 * names.
 */
export interface ITopLevelRuleContainer extends IRuleContainer
{
	/** Generates a name, which will be unique in this stylesheet */
	getScopedRuleName( ruleName: string): string;
}



/**
 * The RuleLike abstract class is a base for all "rules" defined in the style definition classes -
 * whether they correspond to real CssRules (and thus derive from the Rule class) or not (such as
 * counters, grid lines and grid areas).
 */
export abstract class RuleLike
{
	// Processes the rule.
	public process( container: IRuleContainer, ownerContainer: ITopLevelRuleContainer, ruleName: string | null): void
	{
        this.container = container;
		this.ownerContainer = ownerContainer;
		this.ruleName = ruleName;
	}

	// Creates a copy of the rule.
	public abstract clone(): RuleLike;

	// Container at the top of the chain of containers to which this rule belongs.
	public ownerContainer: ITopLevelRuleContainer;

	// Name of the property of the stylesheet definition to which this rule was assigned. This can
	// be null for rules not created via assignment to style definition properties.
	public ruleName: string | null;

	// Rule container to which this rule belongs.
	public container: IRuleContainer;
}



/**
 * The Rule class is used as a base class for all rules. As a parent of RuleContainer, the Rule
 * class is also an ancestor for Stylesheet; however, most of its the fields are undefined in
 * te Stylesheet instances.
 */
export abstract class Rule extends RuleLike implements IRule
{
	// Creates a copy of the rule.
	public abstract clone(): Rule;

	// Inserts this rule into the given parent rule or stylesheet. This method is called when the
	// style definition class, to which this rule belongs, is activated.
	public abstract insert( parent: CSSStyleSheet | CSSGroupingRule): void;

	// Clers the CSS rule object. This method is called when the style definition class, to which
	// this rule belongs, is deactivated.
	public clear(): void { this.cssRule = null; }

	// Serializes this rule to a string.
	public abstract serialize( ctx: IRuleSerializationContext): void;



	// Inserts the given rule into the given parent rule or stylesheet.
	public static addRuleToDOM( ruleText: string, parent: CSSStyleSheet | CSSGroupingRule): CSSRule | null
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
export function createNames( ownerContainer: ITopLevelRuleContainer, ruleName: string | null, nameOverride?: string | INamedEntity,
	cssPrefix?: string): [string,string]
{
	if (!ruleName && !nameOverride)
		return ["", ""];

	let name = !nameOverride
		? ownerContainer.getScopedRuleName( ruleName!)
		: typeof nameOverride === "string"
			? nameOverride
			: nameOverride.name;

	return !cssPrefix
		? [name,name]
		: name.startsWith( cssPrefix)
			? [name.substr( cssPrefix.length), name]
			: [name, cssPrefix + name];
}



