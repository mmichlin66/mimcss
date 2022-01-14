import {IRule, INamedEntity, IStyleDefinition, IStyleDefinitionClass} from "../api/RuleTypes"



/**
 * Symbol on the style definition instance pointing to the RuleContainer object that is
 * responsible for processing rules.
 */
export const symRC = Symbol("rc");



/**
 * Represents an object that contains rules and which corresponds to a single stylesheet.
 */
export interface IMimcssContainer
{
	/**
     * Name of this container, which, depending on the mode, is either taken from the class
     * definition name or generated uniquely.
     */
    readonly name: string;

	/** Activation context in which this object has been created. */
	ctx: IMimcssActivationContext;

	// /** Activation reference count. */
	// actCount: number;

	/** DOM style elemnt */
	elm?: IMimcssStyleElement;

    activate( insertBefore?: IMimcssStyleElement): void;
    deactivate(): void;
}



/**
 * The IRuleContainer interface represents an object that accompanies and is associated with
 * a style definition object.
 */
export interface IRuleContainer extends IMimcssContainer
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
 * Represents an object that accompanies and is associated with
 * a style definition object.
 */
export interface IEmbeddingContainer extends IMimcssContainer
{
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
 * exists for client-side and server-side rendering. Activation context are respponsible for:
 * - mapping style definition class to style definition instance (that is, the same class will
 *   have different instances in different contexts).
 * - creating and removing elements including the theme placeholder element.
 */
export interface IMimcssActivationContext
{
    /** Retrieves style definition instance associated with the given class in this context. */
    getClassSD( sdc: IStyleDefinitionClass): IStyleDefinition | undefined;

    /** Associates style definition instance with the given class in this context. */
    setClassSD( sdc: IStyleDefinitionClass, sd: IStyleDefinition): void;

    /**
     * Activates the given container and its related containers in this context.
     */
    activate( container: IMimcssContainer, insertBefore?: IMimcssStyleElement): void;

    /**
     * Deactivates the given container and its related containers in this context;
     */
    deactivate( container: IMimcssContainer): void;

    /** Creates theme placeholder style element */
    getThemeElm(): IMimcssStyleElement;

    /** Creates style element with the given ID */
    createElm( container: IMimcssContainer, insertBefore?: IMimcssStyleElement): IMimcssStyleElement;

    /** Removes the given style element */
    removeElm( elm: IMimcssStyleElement): void;
}

/**
 * Represents an object to which rules can be added.
 */
export interface IMimcssRuleBag
{
    /** Adds a simple CSS rule */
    add( ruleText: string): IMimcssRule;

    /** Adds a grouping CSS rule */
    addGroup( selector: string): IMimcssGroupingRule;

    /** Adds a keyframes CSS rule */
    addKeyframes( name: string): IMimcssKeyframesRule;
}

/**
 * Represents a style element to which rules can be added. Different implementations
 * exists for client-side and server-side rendering.
 */
export interface IMimcssStyleElement extends IMimcssRuleBag
{
}

/**
 * Represents a base interface for CSS rule. Different implementations exists for client-side
 * and server-side rendering.
 */
export interface IMimcssRule
{
    /** CSSOM object for the rule - may be null in some contexts */
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
    /** Adds a frame to this keyframes rule */
    addFrame( frameText: string): IMimcssRule;
}



