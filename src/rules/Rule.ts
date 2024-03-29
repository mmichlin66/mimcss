import {IRule, INamedEntity, IStyleDefinition, IStyleDefinitionClass} from "../api/RuleTypes"



/**
 * Symbol on the style definition instance pointing to the RuleContainer object that is
 * responsible for processing rules.
 */
export const symRC = Symbol("rc");



/**
 * Object that keeps information about adoption of rule containers and embedding containers for
 * a given documents and shadow roots object.
 */
 export interface IAdoptionRootInfo
{
    /**
     * Activates the given container and its related containers in this context.
     */
    add( container: IMimcssContainer): void;

    /**
     * Deactivates the given container and its related containers in this context;
     */
    remove( container: IMimcssContainer): void;

    /**
     * The root property is an object that implements the DocumentOrShadowRoot interface - that is,
     * it is either a document object or a shadow root of a custom Web element. Since the current
     * DOM library doesn't have the "adoptedStyleSheets" property on this interface yet, and that's
     * the property that we will be using, we define the type of the "root" property as an object
     * that has the "adoptedStyleSheets" property.
     */
    readonly root: { adoptedStyleSheets: CSSStyleSheet[] };
 }



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

    adopt( rootInfo: IAdoptionRootInfo): void;
    unadopt( rootInfo: IAdoptionRootInfo): void;
}



/**
 * The IRuleContainer interface represents an object that accompanies and is associated with
 * a style definition object.
 */
export interface IRuleContainer extends IMimcssContainer
{
	/** Generates a name, which will be unique in this stylesheet */
	getScopedName( ruleName: string | null, nameOverride?: string | INamedEntity, prefix?: string): string;

	/** Inserts all rules defined in this container to either the style sheet or grouping rule. */
	insert( ruleBag: IMimcssRuleBag): void;

	/** Clears all CSS rule objects defined in this container. */
	clear(): void;

    /** Retrieves the `:root` style rule where the container-level custom CSS properties are defined. */
	readonly varRootRule: CSSStyleRule | undefined;
}



/**
 * Represents an object that "embeds" references to several style definition classes and creates
 * a single stylesheet when activated.
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
 * The NamedRuleLike class describes a rule-like entity with a name that is either generated by
 * Mimcss or is provided in the constructor. No CSS rules are created for such entities - they are
 * needed only to provide type-safe name definitions.
 */
export abstract class NamedRuleLike extends RuleLike implements INamedEntity
{
	public constructor( sd: IStyleDefinition, nameOverride?: string | INamedEntity)
	{
        super(sd);
		this.nameOverride = nameOverride;
	}


    // This function is used when the object is specified as a value of a style property.
    // We return the counter name.
    public toString(): string { return this.name; }

	// Processes the given rule.
	public process( ruleName: string | null): void
	{
		this.name = this.rc.getScopedName( ruleName, this.nameOverride);
	}



	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	protected nameOverride?: string | INamedEntity;
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



