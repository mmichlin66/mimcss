import {IRule} from "./cssts"
import {StyleScope} from "./StyleScope"



/**
 * The RuleWithStyle class is used as a base class for rules that have a single style rule.
 */
export abstract class Rule implements IRule
{
	// Processes the rule.
	public process( owner: StyleScope, ruleName: string): void
	{
		this.owner = owner;
		this.ruleName = ruleName;
	}

	// Creates a copy of the rule.
	public abstract clone(): Rule;

	// Copies internal data from another rule object.
	public abstract copyFrom( src: Rule): void;

	// Converts the rule to CSS string.
	public abstract toCssString(): string;

	// Determines whether this rule is a real CSS rule that should be inserted under the <style>
	// element. For the majority of Rule-derived classes this is true; however, for some classes,
	// e.g. for the CustomVar class, this is not so.
	public get isRealCssRule(): boolean { return true; }



	/** Only needed to distinguish from other types */
	public get isRule(): boolean { return true; }

	// Style scope to which this rule belongs.
	public owner: StyleScope;

	// Name of the property of the style scope definition to which this rule was assigned.
	public ruleName: string;

	/** Determines whether this rule hs already been processed */
	public get isProcessed(): boolean { return !!this.owner; }

	// Index of the rule in the DOM style sheet. The DOM style sheet object is held by the
	// owner StyleScope
	public index: number;
}



