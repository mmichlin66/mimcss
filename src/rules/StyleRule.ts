import {IStyleRule, ExtendedStyleset, IVarRule} from "./RuleTypes";
import {IStyleset, Styleset, VarTemplateName, VarValueType} from "../styles/StyleTypes"
import {CssSelector} from "../styles/SelectorTypes"
import {Rule, ITopLevelRuleContainer} from "./Rule";
import {mergeStylesets, stylesetToCssString, stylePropToCssString} from "../styles/StyleFuncs"
import {selectorToCssString} from "../styles/SelectorFuncs"



/**
 * The StyleRule class is used as a base class for rules that contain a style rule. This class
 * implements the parsing of the ExtendedStyleset object.
 */
export abstract class StyleRule extends Rule implements IStyleRule
{
	// The styleset can be an ExtendedStyleset for many rules; however, for some it is just
	// of the Styleset type.
	public constructor( styleset?: Styleset)
	{
		super();

		if (styleset)
			this.parseInputStyleset( styleset);
	}



	/**
	 * Goes over properties in the given styleset and parses them into proper styleset, set of
	 * important properties and nested rules.
	 */
	private parseInputStyleset( inputStyleset: Styleset): void
	{
		// prepare local variables to accumulate parsing results. We do it in local varibales
		// because in case there are parents, we want first copy properties from them so that
		// our own properties can override them.
		let parentRules: StyleRule[];
		let nestedRules: NestedRule[];
		let styleset: Styleset = {};

		for( let propName in inputStyleset)
		{
			let propVal = inputStyleset[propName];
			if (propName === "+")
			{
				// the value is a single or an array of StyleRules to copy properties from
				let extendsPropVal = propVal as (StyleRule | StyleRule[]);
				if (extendsPropVal instanceof StyleRule)
					parentRules = [extendsPropVal];
				else
					parentRules = extendsPropVal;
			}
			else if (propName.startsWith(":"))
			{
				// value is a styleset for a pseudo class or pseudo element
				if (!nestedRules)
					nestedRules = [];

				nestedRules.push( new NestedRule( this, "&" + propName, propVal as ExtendedStyleset));
			}
			else if (propName === "&")
			{
				// value is an array of two-element tuples with selector and styleset
				let tuples = propVal as [CssSelector, ExtendedStyleset][];
				if (tuples.length > 0)
				{
					if (!nestedRules)
						nestedRules = [];

					tuples.forEach( tuple => nestedRules.push( new NestedRule( this, tuple[0], tuple[1])));
				}
			}
			else
			{
				// copy the property value to our internal styleset
				styleset[propName] = propVal;
			}
		}

		// by now we went over all properties of the input styleset. If we have parent style
		// rules, copy styleset, important and nested rules data from them.
		if (parentRules && parentRules.length > 0)
		{
			parentRules.forEach( parent =>
			{
				if (parent.styleset)
					this.styleset = mergeStylesets( this.styleset, parent.styleset);

				if (parent.nestedRules && parent.nestedRules.length > 0)
				{
					if (!this.nestedRules)
						this.nestedRules = [];

					parent.nestedRules.forEach( nestedRule =>
					{
						let newNestedRule = nestedRule.clone();
						newNestedRule.containingRule = this;
						this.nestedRules.push( newNestedRule);
					});
				}
			});
		}

		// now that we copied data from the parents (if any) we need to copy over our own
		if (styleset && Object.keys( styleset).length > 0)
		{
			if (!this.styleset)
				this.styleset = styleset;
			else
				mergeStylesets( this.styleset, styleset);
		}

		if (nestedRules && nestedRules.length > 0)
		{
			if (!this.nestedRules)
				this.nestedRules = nestedRules;
			else
				nestedRules.forEach( nestedRule => this.nestedRules.push( nestedRule));
		}
	}



	// Processes the given rule.
	public process( owner: ITopLevelRuleContainer, ruleName: string): void
	{
		super.process( owner, ruleName);

		// if nested rules exist, process them under the same container
		if (this.nestedRules)
			this.nestedRules.forEach( nestedRule => nestedRule.process( owner, null));
	}



	// Copies internal data from another rule object.
	public copyFrom( src: StyleRule): void
	{
		this.styleset = src.styleset;

		// if nested rules exist, clone them
		if (src.nestedRules)
		{
			this.nestedRules = [];
			for( let srcNestedRule of src.nestedRules)
			{
				let newNestedRule = srcNestedRule.clone();
				newNestedRule.containingRule = this;
				this.nestedRules.push( newNestedRule);
			}
		}
	}



	// Converts the rule to CSS string representing the rule.
	public toCssString(): string
	{
		return this.styleset
			? `${this.getSelectorString()} ${stylesetToCssString( this.styleset)}`
			: null;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (this.styleset)
			this.cssRule = Rule.addRuleToDOM( this.toCssString(), parent) as CSSStyleRule;

		// if nested rules exist, insert them under the same parent
		if (this.nestedRules)
			this.nestedRules.forEach( nestedRule => nestedRule.insert( parent));
	}



	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

		// if nested rules exist, clear them too
		if (this.nestedRules)
			this.nestedRules.forEach( nestedRule => nestedRule.clear());
	}



	// Returns the selector part of the style rule.
	public abstract getSelectorString(): string;



	/**
	 * Adds/replaces the value of the given CSS property in this rule.
	 * @param name Name of the CSS property.
	 * @param value New value of the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	public setProp<K extends keyof IStyleset>( name: K, value: IStyleset[K], important?: boolean): void
	{
		if (!this.cssRule)
			return;

		this.cssRule.style.setProperty( name,
			stylePropToCssString( name, value, true), important ? "!important" : null)
	}



	/**
	 * Adds/replaces the value of the given custmom cSS property in this rule.
	 * @param varDef IVarRule object defining a custom CSS property.
	 * @param varValue New value of the custom CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	public setCustomProp<K extends VarTemplateName>( varDef: IVarRule<K>, varValue: VarValueType<K>, important?: boolean): void
	{
		if (!varDef || !this.cssRule)
			return;

		this.cssRule.style.setProperty( varDef.cssName,
			stylePropToCssString( varDef.template, varValue, true), important ? "!important" : null)
	}



	/** SOM style rule */
	public cssRule: CSSStyleRule;

	// Resultant Styleset object defining properties to be inserted into DOM.
	protected styleset: Styleset;

	// List of nested styles.
	private nestedRules: NestedRule[];
}



/**
 * The NestedRule class describes a styleset that is nested within another style rule.
 */
class NestedRule extends StyleRule
{
	public constructor( containingRule?: StyleRule, selector?: CssSelector, style?: ExtendedStyleset)
	{
		super( style);
		this.selector = selector;
		this.containingRule = containingRule;
	}



	// Creates a copy of the rule.
	public clone(): NestedRule
	{
		let newRule = new NestedRule();
		newRule.copyFrom( this);
		newRule.selector = this.selector;
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		// get selector string and replace all occurrences of the ampersand symbol with the
		// selector string of the parent rule.
		return selectorToCssString( this.selector).replace( "&", this.containingRule.getSelectorString());
	}



	// Partial selector that should be appended to the parent selector.
	private selector: CssSelector;

	// Parent style within which this rule is nested.
	public containingRule: StyleRule;
}



