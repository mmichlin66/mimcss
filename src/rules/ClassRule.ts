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
			this.className = this.owner.getScopedRuleNamed( ruleName);
		else if (typeof this.nameOverride === "string")
			this.className = this.nameOverride;
		else
			this.className = this.nameOverride.name;
	}



	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public get name(): string { return this.className; }

	/**
	 * Rule's name - this is a name that has the prefix that is used when referring to classes (.),
	 * IDs (#) and custom CSS properties (--). For animations, this name is the same as in the
	 * `name` property.
	 */
	public get cssName(): string { return "." + this.className; }



	// Creates a copy of the rule.
	public clone(): ClassRule
	{
		let newRule = new ClassRule();
		newRule.copyFrom( this);
		newRule.nameOverride = this.nameOverride;
		return newRule;
	}



	// Returns the selector part of the style rule.
	protected geSelectorString(): string
	{
		return "." + this.className;
	}



	/** Only needed to distinguish from other rules */
	public get class(): string { return this.className; }

	// Name of the class under which the styleset will appear in the style sheet.
	public className: string;

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | INamedRule;
}



