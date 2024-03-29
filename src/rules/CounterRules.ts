import {ExtendedCounterStyleset} from "../api/CounterTypes";
import {ICounterRule, ICounterStyleRule, IStyleDefinition} from "../api/RuleTypes"
import {counterStyleset2s} from "../impl/MiscImpl";
import {IMimcssRuleBag, NamedRuleLike, Rule} from "./Rule";



/**
 * The CounterRule class describes a named counter definition. Use this rule to create
 * counter objects that can be used in counter-increment, counter-reset and counter-set style
 * properties. No CSS rule is created for counters - they are needed only to provide type-safe
 * counter definitions.
 */
export class CounterRule extends NamedRuleLike implements ICounterRule
{
	public constructor( sd: IStyleDefinition, nameOverride?: string | ICounterRule)
	{
        super( sd, nameOverride);
	}

    /** Name of the counter */
	public get counterName(): string { return this.name; }
}



/**
 * The CounterStyleRule class describes the CSS @nounter-style at-rule.
 */
export class CounterStyleRule extends Rule implements ICounterStyleRule
{
	public constructor( sd: IStyleDefinition, counterStyleset?: ExtendedCounterStyleset,
        nameOverride?: string | ICounterStyleRule)
	{
        super(sd);
        this.counterStyleset = counterStyleset ?? {};
		this.nameOverride = nameOverride;
	}



    // This function is used when the object is specified as a value in a style property or in
    // another counter style rule. We return the counter style name.
    public toString(): string { return this.name; }



    // Processes the given rule.
	public process( ruleName: string | null): void
	{
		this.name = this.rc.getScopedName( ruleName, this.nameOverride);
	}

	// Inserts this rule into the given parent rule or stylesheet.
	public insert( ruleBag: IMimcssRuleBag): void
	{
		let ruleText = `@counter-style ${this.name} {${counterStyleset2s( this.counterStyleset)}}`;
		this.cssRule = ruleBag.add( ruleText)?.cssRule as CSSCounterStyleRule;
	}



	/** SOM counter-style rule */
	declare public cssRule: CSSCounterStyleRule;

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



