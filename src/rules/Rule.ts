import {IRule, INamedEntity, IStyleDefinition} from "../api/RuleTypes"



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
	insert( parent: IMimcssStyleElement | IMimcssGroupingRule): void;

	/** Clears all CSS rule objects defined in this container. */
	clear(): void;

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
	public abstract insert( parent: IMimcssStyleElement | IMimcssGroupingRule): void;

	// Clers the CSS rule object. This method is called when the style definition class, to which
	// this rule belongs, is deactivated.
	public clear(): void { this.cssRule = null; }



	// CSSRule-derived object corresponding to the actuall CSS rule inserted into
	// the styles sheet or the parent rule.
	public cssRule: CSSRule | null;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Client- and server-side rendering interfaces
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Represents the context in which style definitions are activated. Different implementations
 * exists for client-side and server-side rendering.
 */
export interface IActivationContext
{
    getThemePlaceholder(): IMimcssStyleElement;
    createStyleElm( id: string, insertBefore?: IMimcssStyleElement): IMimcssStyleElement;
}

/**
 * Represents an object to which rules can be added.
 */
export interface IMimcssRuleBag
{
    addRule( ruleText: string): IMimcssRule | null;
    addGroupingRule( selector: string): IMimcssGroupingRule | null;
    addKeyframesRule( name: string): IMimcssKeyframesRule | null;
}

/**
 * Represents a style element to which rules can be added. Different implementations
 * exists for client-side and server-side rendering.
 */
export interface IMimcssStyleElement extends IMimcssRuleBag
{
    readonly domElm: HTMLStyleElement | null;
    remove(): void;
}

/**
 * Represents a base interface for CSS rule. Different implementations exists for client-side
 * and server-side rendering.
 */
export interface IMimcssRule
{
    readonly cssRule: CSSRule | null;
}

/**
 * Represents a grouping rule to which rules can be added. Different implementations
 * exists for client-side and server-side rendering.
 */
export interface IMimcssGroupingRule extends IMimcssRule, IMimcssRuleBag
{
}

/**
 * Represents a keyframes rule to which frames can be added. Different implementations
 * exists for client-side and server-side rendering.
 */
export interface IMimcssKeyframesRule extends IMimcssRule
{
    addFrame( frameText: string): IMimcssRule | null;
}

/**
 * Represents the context in which style definitions are activated. Different implementations
 * exists for client-side and server-side rendering.
 */
export interface IServerActivationContext extends IActivationContext
{
    serialize(): string;
}



