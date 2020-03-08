import {IClassRule, ExtendedStyleset} from "../api/rules"
import {StyleRule} from "./StyleRule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The ClassRule type describes a styleset that applies to elements identified by a class.
 */
export class ClassRule extends StyleRule implements IClassRule
{
	public constructor( styleset?: ExtendedStyleset)
	{
		super( styleset);
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( container, owner, ruleName);

		this.className = this.owner.getScopedRuleNamed( ruleName);

		// go through all parents and copy their style properties to our own styleset.
		for( let parent of this.parents)
			Object.assign( this.styleset, parent.styleset);
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



	/**
	 * Determines whether this rule requires name - that is it will be ignored if created within
	 * the createUnnamedRules
	 */
	public get nameIsRequired(): boolean { return true; }



	// Creates a copy of the rule.
	public clone(): ClassRule
	{
		let newRule = new ClassRule();
		newRule.copyFrom( this);
		return newRule;
	}



	// Returns the selector part of the style rule.
	protected geSelectorString(): string
	{
		return "." + this.className;
	}



	/** Only needed to distinguish from other rules */
	public get isClassRule(): boolean { return true; }

	// Name of the class under which the styleset will appear in the style sheet.
	public className: string;
}



