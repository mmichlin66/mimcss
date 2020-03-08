import {IIDRule, ExtendedStyleset} from "../api/rules"
import {StyleRule} from "./StyleRule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The IDRule type describes a styleset that applies to elements identified by an ID.
 */
export class IDRule extends StyleRule implements IIDRule
{
	public constructor( styleset?: ExtendedStyleset)
	{
		super( styleset);
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( container, owner, ruleName);

		this.idName = this.owner.getScopedRuleNamed( ruleName);

		// go through all parents; for those who are classes, add their name to the
		// combined name. For those who are not classes, copy style properties to the
		// class's own styleset.
		for( let parent of this.parents)
			Object.assign( this.styleset, parent.styleset);
	}



	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public get name(): string { return this.idName; }

	/**
	 * Rule's name - this is a name that has the prefix that is used when referring to classes (.),
	 * IDs (#) and custom CSS properties (--). For animations, this name is the same as in the
	 * `name` property.
	 */
	public get cssName(): string { return "#" + this.idName; }



	/**
	 * Determines whether this rule requires name - that is it will be ignored if created within
	 * the createUnnamedRules
	 */
	public get nameIsRequired(): boolean { return true; }



	// Creates a copy of the rule.
	public clone(): IDRule
	{
		let newRule = new IDRule();
		newRule.copyFrom( this);
		return newRule;
	}



	// Returns the selector part of the style rule.
	protected geSelectorString(): string
	{
		return "#" + this.idName;
	}



	/** Only needed to distinguish from other rules */
	public get isIDRule(): boolean { return true; }

	// Name of the element identifier for applying the styleset.
	public idName: string;
}



