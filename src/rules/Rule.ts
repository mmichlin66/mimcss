import {IRule, INamedEntity, IStyleDefinition, IActivationContext} from "../api/RuleTypes"



/**
 * Symbol on the style definition instance pointing to the RuleContainer object that is
 * responsible for processing rules.
 */
 export const symRC = Symbol("rc");



 /**
 * The IRuleContainer interface represents an object that accompanies and is associated with
 * a style definition object.
 */
export interface IRuleContainer
{
	/** Generates a name, which will be unique in this stylesheet */
	getScopedName( ruleName: string | null, nameOverride?: string | INamedEntity): string;

	/** Inserts all rules defined in this container to either the style sheet or grouping rule. */
	insert( ruleBag: IMimcssRuleBag): void;

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
    constructor( sd: IStyleDefinition)
    {
        this.sd = sd;
        this.rc = sd[symRC] as IRuleContainer;
    }

	/**
     * Processes the rule assigned to the property with the given name. Property name can be null
     * for rules not assigned to a property; e.g. dependent rules defined in the CombinedStyleset.
     */
	public process( propName: string | null): void {}



	/** Style Definition object to which this rule belongs. */
	public sd: IStyleDefinition;

	/** Rule Container corresponding to the style definition object to which this rule belongs. */
	public rc: IRuleContainer;
}



/**
 * The Rule class is used as a base class for all rules.
 */
export abstract class Rule extends RuleLike implements IRule
{
	// Inserts this rule into the given parent rule or stylesheet. This method is called when the
	// style definition class, to which this rule belongs, is activated.
	public abstract insert( ruleBag: IMimcssRuleBag): void;

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
export interface IMimcssActivationContext extends IActivationContext
{
    getThemePlaceholder(): IMimcssStyleElement;
    createStyleElm( id: string, insertBefore?: IMimcssStyleElement): IMimcssStyleElement;
    addRef( obj: any): number;
    delRef( obj: any): number;
}

/**
 * Represents an object to which rules can be added.
 */
export interface IMimcssRuleBag
{
    add( ruleText: string): IMimcssRule | null;
    addGroup( selector: string): IMimcssGroupingRule | null;
    addKeyframes( name: string): IMimcssKeyframesRule | null;
}

/**
 * Represents a style element to which rules can be added. Different implementations
 * exists for client-side and server-side rendering.
 */
export interface IMimcssStyleElement extends IMimcssRuleBag
{
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

// /**
//  * Represents the activation context for adoting style definitions.
//  */
// export interface IAdoptionActivationContext extends IMimcssActivationContext
// {
//     adopt(): void;
// }

// /**
//  * Represents the activation context for server-side rendering.
//  */
// export interface IServerActivationContext extends IMimcssActivationContext
// {
//     serialize(): string;
// }



