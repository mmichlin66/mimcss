import {IStyleRule, ExtendedStyleset, HierarchicalStyleset, RuleType, ICustomVar} from "./RuleTypes";
import {IStyleset, Styleset} from "../styles/StyleTypes"
import {stylesetToCssString, stylePropToCssString} from "../styles/StyleFuncs"
import {Rule} from "./Rule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The StyleRule class is used as a base class for rules that have a single style rule.
 */
export abstract class StyleRule extends Rule implements IStyleRule
{
	public constructor( type: RuleType, style?: ExtendedStyleset)
	{
		super( type);

		this.styleset = {};
		this.parents = [];
		this.important = new Set<string>();

		if (style)
			this.parseStyleset( style);
	}

	private parseStyleset( styleset: ExtendedStyleset): void
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
			// extendedStyleset is a set of style properties but can also include the $extends and
			// $important properties. Remember parents and important names and copy the rest of
			// style properties to our internal Styleset object.
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
					let importantPropVal = propVal as any as (string | string[]);
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



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( container, owner, ruleName);

		// if we have parents, we need to first copy their stylesets, so that our styleset can
		// override their values.
		if (this.parents.length > 0)
		{
			let tempStyleset = this.styleset;
			this.styleset = {};

			// go through all parents and copy their style properties to our own styleset.
			for( let parent of this.parents)
				Object.assign( this.styleset, parent.styleset);

			// copy our styles over those of the parents
			Object.assign( this.styleset, tempStyleset);
		}
	}



	// Copies internal data from another rule object.
	protected copyFrom( src: StyleRule): void
	{
		this.styleset = src.styleset;
		this.parents = src.parents;
		this.important = src.important;
	}



	// Converts the rule to CSS string representing the rule.
	public toCssString(): string
	{
		return `${this.geSelectorString()} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		let index = parent.insertRule( this.toCssString(), parent.cssRules.length);
		this.cssRule = parent.cssRules[index];
	}



	// Returns the selector part of the style rule.
	protected abstract geSelectorString(): string;



	/**
	 * Adds/replaces the value of the given CSS property in this rule.
	 * @param name Name of the CSS property.
	 * @param value New value of the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	public setProp<K extends keyof IStyleset>( name: K, value: IStyleset[K], important?: boolean): void
	{
		if (this.cssStyleRule)
		{
			this.cssStyleRule.style.setProperty( name,
				stylePropToCssString( name, value, true), important ? "!important" : null)
		}
	}



	/**
	 * Adds/replaces the value of the given custmom cSS property in this rule.
	 * @param customVar ICUstomVar object defining a custom CSS property.
	 * @param varValue New value of the custom CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	public setCustomProp<T>( varDef: ICustomVar<T>, varValue: T, important?: boolean): void
	{
		if (this.cssStyleRule)
		{
			this.cssStyleRule.style.setProperty( varDef.cssName,
				stylePropToCssString( varDef.template, varValue, true), important ? "!important" : null)
		}
	}



	/** SOM style rule */
	public get cssStyleRule(): CSSStyleRule { return this.cssRule as CSSStyleRule; }

	// Style rule defining style properties.
	public parents: StyleRule[];

	// Set of property names from this styleset that should be !important.
	private important: Set<string>;

	// Resultant Styleset object defining properties to be inserted into DOM.
	private styleset: Styleset;

	// // Styleset objects mapped to selectors for nested styles (e.g. .my-class:hover).
	// private nestedStylesets: Map<string,Styleset>;
}



