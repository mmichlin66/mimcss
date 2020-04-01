import {IClassRule, ExtendedStyleset, RuleType, INamedRule} from "./RuleTypes"
import {StyleRule} from "./StyleRule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The ClassRule type describes a styleset that applies to elements identified by a class.
 */
export class ClassRule extends StyleRule implements IClassRule
{
	public constructor( style?: ExtendedStyleset, nameOverride?: string | INamedRule)
	{
		super( RuleType.CLASS, style);

		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( container, owner, ruleName);

		if (!this.nameOverride)
			this.name = this.owner.getScopedRuleName( ruleName);
		else if (typeof this.nameOverride === "string")
			this.name = this.nameOverride;
		else
			this.name = this.nameOverride.name;

		this.cssName = this.name.startsWith(".") ? this.name : "." + this.name;
	}



	// Creates a copy of the rule.
	public clone(): ClassRule
	{
		let newRule = new ClassRule();
		newRule.copyFrom( this);
		newRule.nameOverride = this.nameOverride;
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return this.cssName;
	}



	/** Only needed to distinguish from other rules */
	public get isClassRule(): boolean { return true; }

	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

	/**
	 * Rule's name - this is a name that has the prefix that is used when referring to classes (.),
	 * IDs (#) and custom CSS properties (--). For animations, this name is the same as in the
	 * `name` property.
	 */
	public cssName: string;

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | INamedRule;
}



