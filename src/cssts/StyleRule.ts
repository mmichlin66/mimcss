import {IStyleRule, StyleSheetDefinition, ExtendedRuleset, Ruleset} from "./cssts";
import {Rule} from "./Rule";



/**
 * The StyleRule class is used as a base class for rules that have a single style rule.
 */
export abstract class StyleRule extends Rule implements IStyleRule
{
	public constructor( owner: StyleSheetDefinition, ruleset: ExtendedRuleset)
	{
		super( owner);

		this.ruleset = {};
		this.parents = [];
		this.important = new Set<string>();

		this.parseExtendedRuleset( ruleset);
	}

	private parseExtendedRuleset( ruleset: ExtendedRuleset): void
	{
		if (ruleset instanceof StyleRule)
		{
			// ruleset is a single IStyleRule object, which we add as our parent
			this.parents.push( ruleset);
		}
		else if (Array.isArray(ruleset))
		{
			// ruleset is an array of IStyleRule objects, which we add as our parents
			for( let rule of ruleset)
				this.parents.push( rule);
		}
		else
		{
			// ruleset is a set of style properties but can also include the $inherits and
			// $important properties
			for( let propName in ruleset)
			{
				let propVal = ruleset[propName];
				if (propName === "$inherits")
				{
					let inheritsPropVal = propVal as (IStyleRule | IStyleRule[]);
					if (Array.isArray(inheritsPropVal))
					{
						// this is is an array of IStyleRule objects, which we add as our parents
						for( let rule of inheritsPropVal)
							this.parents.push( rule);
					}
					else
					{
						// this is a single IStyleRule object, which we add as our parent
						this.parents.push( inheritsPropVal);
					}
				}
				else if (propName === "$important")
				{
					let importantPropVal = propVal as (string | string[]);
					if (Array.isArray(importantPropVal))
					{
						// this is is an array of strings
						for( let important of importantPropVal)
							this.important.add( important);
					}
					else
					{
						// this is a single string
						this.important.add( importantPropVal);
					}
				}
				else
				{
					// copy the property value to our internal ruleset
					this.ruleset[propName] = propVal;
				}
			}
		}
	}


	// Processes the rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		// go through all parents and if the parent belongs to a different style sheet
		// definition, make sure it is processed. We don't worry about circular dependencies
		// because the parent's owner cannot be our sheet definition if the parent doesn't belong
		// to our sheet.
		for( let parent of this.parents)
		{
			if (parent.owner !== this.owner)
				parent.owner.process();
		}
	}

	// Style rule defining style properties.
	public ruleset: Ruleset;

	// Style rule defining style properties.
	public parents: IStyleRule[];

	// Set of property names from this ruleset that should be !important.
	important: Set<string>;
}



