import {IStyleRule, ExtendedStyleset, RuleType} from "./RuleTypes";
import {Styleset} from "../styles/StyleTypes"
import {stylesetToCssString} from "../styles/StyleFuncs"
import {Rule} from "./Rule";



/**
 * The StyleRule class is used as a base class for rules that have a single style rule.
 */
export abstract class StyleRule extends Rule implements IStyleRule
{
	public constructor( type: RuleType, styleset?: ExtendedStyleset)
	{
		super( type);

		this.styleset = {};
		this.parents = [];
		this.important = new Set<string>();

		if (styleset)
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
				this.parents.push( rule as StyleRule);
		}
		else
		{
			// styleset is a set of style properties but can also include the $extends and
			// $important properties
			for( let propName in styleset)
			{
				let propVal = styleset[propName];
				if (propName === "$extends")
				{
					let inheritsPropVal = propVal as (IStyleRule | IStyleRule[]);
					if (Array.isArray(inheritsPropVal))
					{
						// this is is an array of IStyleRule objects, which we add as our parents
						for( let rule of inheritsPropVal)
							this.parents.push( rule as StyleRule);
					}
					else
					{
						// this is a single IStyleRule object, which we add as our parent
						this.parents.push( inheritsPropVal as StyleRule);
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



	// Copies internal data from another rule object.
	protected copyFrom( src: StyleRule): void
	{
		this.styleset = src.styleset;
		this.parents = src.parents;
		this.important = src.important;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		let index = parent.insertRule(
			`${this.geSelectorString()} ${stylesetToCssString( this.styleset, this.important)}`,
			parent.cssRules.length);

		this.cssRule = parent.cssRules[index];
	}



	// Returns the selector part of the style rule.
	protected abstract geSelectorString(): string;



	/** SOM style rule */
	public get cssStyleRule(): CSSStyleRule { return this.cssRule as CSSStyleRule; }

	// Style rule defining style properties.
	public styleset: Styleset;

	// Style rule defining style properties.
	public parents: StyleRule[];

	// Set of property names from this styleset that should be !important.
	important: Set<string>;
}



