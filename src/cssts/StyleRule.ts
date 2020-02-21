import {IStyleRule, IStyleScope, ExtendedStyleset} from "./cssts";
import {Styleset} from "../styles/styles";
import {Rule} from "./Rule";



/**
 * The StyleRule class is used as a base class for rules that have a single style rule.
 */
export abstract class StyleRule extends Rule implements IStyleRule
{
	public constructor( owner: IStyleScope, styleset: ExtendedStyleset)
	{
		super( owner);

		this.styleset = {};
		this.parents = [];
		this.important = new Set<string>();

		this.parseExtendedStyleset( styleset);
	}

	private parseExtendedStyleset( styleset: ExtendedStyleset): void
	{
		if (styleset instanceof StyleRule)
		{
			// styleset is a single IStyleRule object, which we add as our parent
			this.parents.push( styleset);
		}
		else if (Array.isArray(styleset))
		{
			// styleset is an array of IStyleRule objects, which we add as our parents
			for( let rule of styleset)
				this.parents.push( rule);
		}
		else
		{
			// styleset is a set of style properties but can also include the $inherits and
			// $important properties
			for( let propName in styleset)
			{
				let propVal = styleset[propName];
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
					// copy the property value to our internal styleset
					this.styleset[propName] = propVal;
				}
			}
		}
	}


	// Processes the rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		// // go through all parents and if the parent belongs to a different style sheet
		// // definition, make sure it is processed. We don't worry about circular dependencies
		// // because the parent's owner cannot be our sheet definition if the parent doesn't belong
		// // to our sheet.
		// for( let parent of this.parents)
		// {
		// 	if (parent.owner !== this.owner)
		// 		parent.owner.process();
		// }
	}

	// Style rule defining style properties.
	public styleset: Styleset;

	// Style rule defining style properties.
	public parents: IStyleRule[];

	// Set of property names from this styleset that should be !important.
	important: Set<string>;
}



