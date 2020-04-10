import {IIDRule, ExtendedStyleset, RuleType, INamedEntity} from "./RuleTypes"
import {StyleRule} from "./StyleRule";
import {createNames, IRuleContainerOwner} from "./Rule";



/**
 * The IDRule class describes a styleset that applies to elements identified by an ID.
 */
export class IDRule extends StyleRule implements IIDRule
{
	public constructor( style?: ExtendedStyleset, nameOverride?: string | IIDRule)
	{
		super( RuleType.ID, style);

		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( owner, ruleName);

		[this.name, this.cssName] = createNames( owner, ruleName, this.nameOverride, "#");
	}



	// Creates a copy of the rule.
	public clone(): IDRule
	{
		let newRule = new IDRule( undefined, this.nameOverride);
		newRule.copyFrom( this);
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return this.cssName;
	}



	/** Only needed to distinguish from other rules */
	public get isIDRule(): boolean { return true; }

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
	private nameOverride?: string | IIDRule;
}



