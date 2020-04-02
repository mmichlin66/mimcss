import {IStyleRule, ExtendedStyleset, RuleType, ICustomVar, NestedStyleType} from "./RuleTypes";
import {IStyleset, Styleset} from "../styles/StyleTypes"
import {SelectorType} from "../styles/SelectorTypes"
import {Rule} from "./Rule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"
import {stylesetToCssString, stylePropToCssString} from "../styles/StyleFuncs"
import {selectorToCssString} from "../styles/SelectorFuncs";



/**
 * The StyleRule class is used as a base class for rules that contain a style rule. This class
 * implements the parsing of the ExtendedStyleset object.
 */
export abstract class StyleRule extends Rule implements IStyleRule
{
	public constructor( type: RuleType, styleset?: ExtendedStyleset)
	{
		super( type);

		if (styleset)
			this.parseInputStyleset( styleset);
	}



	/**
	 * Goes over properties in the given styleset and parses them into proper styleset, set of
	 * important properties and nested rules.
	 */
	private parseInputStyleset( inputStyleset: ExtendedStyleset): void
	{
		// prepare local variables to accumulate parsing results. We do it in local varibales
		// because in case there are parents, we want first copy properties from them so that
		// our own properties can override them.
		let parents: StyleRule[];
		let styleset: Styleset;
		let impProps: Set<string>;
		let nestedRules: NestedRule[];

		if (inputStyleset instanceof StyleRule)
		{
			// styleset is a single IStyleRule object, which we add as our parent
			parents = [inputStyleset];
		}
		else if (Array.isArray(inputStyleset))
		{
			// styleset is an array of IStyleRule objects, which we add as our parents
			parents = inputStyleset as StyleRule[];
		}
		else
		{
			// extendedStyleset is a set of style properties but can also include the $extends and
			// $important properties. Remember parents and important names and copy the rest of
			// style properties to our internal Styleset object.
			styleset = {};

			for( let propName in inputStyleset)
			{
				let propVal = inputStyleset[propName];
				if (propName === "+")
				{
					let extendsPropVal = propVal as (StyleRule | StyleRule[]);
					if (extendsPropVal instanceof StyleRule)
						parents = [extendsPropVal];
					else
						parents = extendsPropVal;
				}
				else if (propName === "!")
				{
					impProps = new Set<string>();
					let impPropVal = propVal as (string | string[]);
					if (typeof impPropVal === "string")
						impProps.add( impPropVal);
					else
						impPropVal.forEach( v => impProps.add( v));
				}
				else if (propName.startsWith(":"))
				{
					if (!nestedRules)
						nestedRules = [];

					nestedRules.push( new NestedRule( this, "&" + propName, propVal as ExtendedStyleset));
				}
				else if (propName === "&")
				{
					if (!nestedRules)
						nestedRules = [];

					if (Array.isArray(propVal))
					{
						propVal.forEach( (item: NestedStyleType) => 
							nestedRules.push( new NestedRule( this, item.selector, item.style))
						);
					}
					else
					{
						let nestedStyle = propVal as NestedStyleType;
						nestedRules.push( new NestedRule( this, nestedStyle.selector, nestedStyle.style));
					}
				}
				else
				{
					// copy the property value to our internal styleset
					styleset[propName] = propVal;
				}
			}
		}

		// by now we went over all properties of the input styleset. If we have parent style
		// rules, copy styleset, important and nested rules data from them.
		if (parents && parents.length > 0)
		{
			parents.forEach( parent =>
			{
				if (parent.styleset && Object.keys( parent.styleset).length > 0)
				{
					if (!this.styleset)
						this.styleset = {};

					Object.assign( this.styleset, parent.styleset);
				}

				if (parent.impProps && parent.impProps.size > 0)
				{
					if (!this.impProps)
						this.impProps = new Set<string>();

					parent.impProps.forEach( impProp => this.impProps.add( impProp));
				}

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
				Object.assign( this.styleset, styleset);
		}

		if (impProps && impProps.size > 0)
		{
			if (!this.impProps)
				this.impProps = impProps;
			else
				impProps.forEach( impProp => this.impProps.add( impProp));
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
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( container, owner, ruleName);

		// if nested rules exist, process them under the same container
		if (this.nestedRules)
			this.nestedRules.forEach( nestedRule => nestedRule.process( container, owner, null));
	}



	// Copies internal data from another rule object.
	public copyFrom( src: StyleRule): void
	{
		this.styleset = src.styleset;
		this.impProps = src.impProps;

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
			? `${this.getSelectorString()} ${stylesetToCssString( this.styleset, this.impProps)}`
			: null;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (this.styleset)
			this.cssRule = Rule.addRuleToDOM( this.toCssString(), parent);

		// if nested rules exist, insert them under the same parent
		if (this.nestedRules)
		{
			for( let nestedRule of this.nestedRules)
				nestedRule.insert( parent);
		}
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
		if (!this.cssStyleRule)
			return;

		this.cssStyleRule.style.setProperty( name,
			stylePropToCssString( name, value, true), important ? "!important" : null)
	}



	/**
	 * Adds/replaces the value of the given custmom cSS property in this rule.
	 * @param customVar ICUstomVar object defining a custom CSS property.
	 * @param varValue New value of the custom CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	public setCustomProp<T>( varDef: ICustomVar<T>, varValue: T, important?: boolean): void
	{
		if (!varDef || !this.cssStyleRule)
			return;

		this.cssStyleRule.style.setProperty( varDef.cssName,
			stylePropToCssString( varDef.template, varValue, true), important ? "!important" : null)
	}



	/** SOM style rule */
	public get cssStyleRule(): CSSStyleRule { return this.cssRule as CSSStyleRule; }

	// Set of property names from this styleset that should be !important.
	private impProps: Set<string>;

	// Resultant Styleset object defining properties to be inserted into DOM.
	private styleset: Styleset;

	// List of nested styles.
	private nestedRules: NestedRule[];
}



/**
 * The NestedRule class describes a styleset that is nested within another style rule.
 */
class NestedRule extends StyleRule
{
	public constructor( containingRule?: StyleRule, selector?: SelectorType, style?: ExtendedStyleset)
	{
		super( RuleType.NESTED, style);
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
	private selector: SelectorType;

	// Parent style within which this rule is nested.
	public containingRule: StyleRule;
}



