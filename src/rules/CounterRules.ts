import {ExtendedCounterStyleset} from "../api/CounterTypes";
import {ICounterRule, ICounterStyleRule} from "../api/RuleTypes"
import {counterStyleset2s} from "../impl/MiscImpl";
import {IMimcssGroupingRule, IMimcssStyleElement, IRuleContainer, Rule, RuleLike} from "./Rule";



/**
 * The CounterRule class describes a named counter definition. Use this rule to create
 * counter objects that can be used in counter-increment, counter-reset and counter-set style
 * properties. No CSS rule is created for counters - they are needed only to provide type-safe
 * counter definitions.
 */
export class CounterRule extends RuleLike implements ICounterRule
{
	public constructor( nameOverride?: string | ICounterRule)
	{
        super();
		this.nameOverride = nameOverride;
	}


    // This function is used when the object is specified as a value of a style property.
    // We return the counter name.
    public toString(): string { return this.name; }


	// Processes the given rule.
	public process( container: IRuleContainer, ruleName: string | null): void
	{
        super.process( container, ruleName);
		this.name = container.getScopedName( ruleName, this.nameOverride);
	}



	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

    /** Name of the counter */
	public get counterName(): string { return this.name; }

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | ICounterRule;
}



/**
 * The CounterStyleRule class describes the CSS @nounter-style at-rule.
 */
export class CounterStyleRule extends Rule implements ICounterStyleRule
{
	public constructor( counterStyleset?: ExtendedCounterStyleset, nameOverride?: string | ICounterStyleRule)
	{
        super();
        this.counterStyleset = counterStyleset ?? {};
		this.nameOverride = nameOverride;
	}



    /** Name of the counter */
	public get counterStyleName(): string { return this.name; }



    // This function is used when the object is specified as a value in a style property or in
    // another counter style rule. We return the counter style name.
    public toString(): string { return this.name; }


	// Processes the given rule.
	public process( container: IRuleContainer, ruleName: string | null): void
	{
        super.process( container, ruleName);
		this.name = container.getScopedName( ruleName, this.nameOverride);
	}

	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: IMimcssStyleElement | IMimcssGroupingRule): void
	{
		let ruleText = `@counter-style ${this.name} {${counterStyleset2s( this.counterStyleset)}}`;
		this.cssRule = parent.addRule( ruleText)?.cssRule as CSSRule;
	}



	// Serializes this rule to a string.
    private toCss(): string
    {
		return `@counter-style ${this.name} {${counterStyleset2s( this.counterStyleset)}}`;
    }



	/** SOM counter-style rule */
	// public cssRule: CSSCounterStyleRule;
	public cssRule: CSSRule | null;

    /**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

    // Object defining the counter style rule features.
    private counterStyleset: ExtendedCounterStyleset;

    // Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | ICounterStyleRule;
}



