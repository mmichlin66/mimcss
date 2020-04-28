import {IStyleRule, ExtendedStyleset, IVarRule, IAbstractRule, IClassRule, IIDRule, ISelectorRule, ITagRule} from "./RuleTypes";
import {IStyleset, Styleset, VarTemplateName, VarValueType} from "../styles/StyleTypes"
import {CssSelector} from "../styles/SelectorTypes"
import {Rule, ITopLevelRuleContainer, createNames} from "./Rule";
import {mergeStylesets, stylesetToString, stylePropToString} from "../styles/StyleFuncs"
import {valueToString} from "../styles/UtilFuncs";
import {VarRule} from "./VarRule";
import { pseudoEntityToString } from "../styles/SelectorFuncs";



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
		let parentRules: StyleRule[] | null = null;
		let nestedRules: NestedRule[] | null = null;
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

				// if the value is an array, then this is a parameterised pseudo entity where the first element
				// is the parameter value (string) and the second the ExtendedStyleset. Otherwise, the value is
				// just the ExtendedStyleset.
				let nestedRule: NestedRule;
				if (Array.isArray(propVal))
					nestedRule = new NestedRule( propName, propVal[0], propVal[1] as ExtendedStyleset, this);
				else
					nestedRule = new NestedRule( "&" + propName, undefined, propVal as ExtendedStyleset, this);

				nestedRules.push( nestedRule);
			}
			else if (propName === "&")
			{
				// value is an array of two-element tuples with selector and styleset
				let tuples = propVal as [CssSelector, ExtendedStyleset][];
				if (tuples.length > 0)
				{
					if (!nestedRules)
						nestedRules = [];

					tuples.forEach( tuple => nestedRules!.push( new NestedRule( tuple[0], undefined, tuple[1], this)));
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
	public process( owner: ITopLevelRuleContainer, ruleName: string | null): void
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
			? `${this.getSelectorString()} ${stylesetToString( this.styleset)}`
			: "";
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (this.styleset)
			this.cssRule = Rule.addRuleToDOM( this.toCssString()!, parent) as CSSStyleRule;

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
			stylePropToString( name, value, true), important ? "!important" : null)
	}



	/**
	 * Adds/replaces the value of the given custmom cSS property in this rule.
	 * @param varObj IVarRule object defining a custom CSS property.
	 * @param varValue New value of the custom CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	public setCustomProp<K extends VarTemplateName>( varObj: IVarRule<K>, varValue: VarValueType<K>, important?: boolean): void
	{
		if (!varObj || !this.cssRule || !(varObj instanceof VarRule))
			return;

		this.cssRule.style.setProperty( varObj.cssName,
			stylePropToString( varObj.template, varValue, true), important ? "!important" : null)
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
	// for regular selectors, pseudo classes and pseudo elements, the selector already contains
	// the ampersand. For parameterized pseudo classes and asudo elements, the selector is just
	// the entity name.
	public constructor( selector: CssSelector, selectorParam?: any, style?: ExtendedStyleset, containingRule?: StyleRule)
	{
		super( style);
		this.selector = selector;
		this.selectorParam = selectorParam;
		this.containingRule = containingRule;
	}



	// Creates a copy of the rule.
	public clone(): NestedRule
	{
		let newRule = new NestedRule( this.selector);
		newRule.copyFrom( this);
		newRule.selector = this.selector;
		newRule.selectorParam = this.selectorParam;
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		let parentSelector = this.containingRule!.getSelectorString();
		if (this.selectorParam)
		{
			let selector = this.selector as string;
			return `${parentSelector}${selector}(${pseudoEntityToString( selector, this.selectorParam)})`;
		}
		else
		{
			// replace all occurrences of the ampersand symbol in the selector string with the
			// selector string of the parent rule.
			return valueToString( this.selector).replace( /&/g, parentSelector);
		}
	}



	// Partial selector that should be appended to the parent selector.
	private selector: CssSelector;

	// Optional parameters for the selector - used for parameterized pseudo classes and elements.
	private selectorParam?: any;

	// Parent style within which this rule is nested.
	public containingRule?: StyleRule;
}



/**
 * The AbstractRule class describes a styleset that can only be used as a base for other style
 * rules.
 */
export class AbstractRule extends StyleRule implements IAbstractRule
{
	public constructor( style?: ExtendedStyleset)
	{
		super( style);
	}



	// Creates a copy of the rule.
	public clone(): AbstractRule
	{
		let newRule = new AbstractRule();
		newRule.copyFrom( this);
		return newRule;
	}



	// Overrides the StyleRule's implementation to do nothing. No CSSStyleRule is created for
	// abstract rules.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
	}

	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return "";
	}



	/** Only needed to distinguish from other rules */
	public get isAbstractRule(): boolean { return true; }
}



/**
 * The ClassRule class describes a styleset that applies to elements identified by a CSS class.
 */
export class ClassRule extends StyleRule implements IClassRule
{
	public constructor( style?: ExtendedStyleset, nameOverride?: string | IClassRule)
	{
		super( style);

		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( owner: ITopLevelRuleContainer, ruleName: string): void
	{
		super.process( owner, ruleName);

		[this.name, this.cssName] = createNames( owner, ruleName, this.nameOverride, ".");
	}



	// Creates a copy of the rule.
	public clone(): ClassRule
	{
		let newRule = new ClassRule( undefined, this.nameOverride);
		newRule.copyFrom( this);
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return this.cssName;
	}



	/** Only needed to distinguish from other rules */
	public get isClassRule(): boolean { return true; }

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
	private nameOverride?: string | IClassRule;
}



/**
 * The IDRule class describes a styleset that applies to elements identified by an ID.
 */
export class IDRule extends StyleRule implements IIDRule
{
	public constructor( style?: ExtendedStyleset, nameOverride?: string | IIDRule)
	{
		super( style);

		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( owner: ITopLevelRuleContainer, ruleName: string): void
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



/**
 * The SelectorRule type describes a styleset that applies to elements identified by a CSS selector.
 */
export class SelectorRule extends StyleRule implements ISelectorRule
{
	public constructor( selector: CssSelector, style?: ExtendedStyleset)
	{
		super( style);

		this.selector = selector;
	}



	// Processes the given rule.
	public process( owner: ITopLevelRuleContainer, ruleName: string): void
	{
		super.process( owner, ruleName);

		this.selectorText = valueToString( this.selector);
	}



	// Creates a copy of the rule.
	public clone(): SelectorRule
	{
		let newRule = new SelectorRule( this.selector);
		newRule.copyFrom( this);
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return this.selectorText;
	}



	/** CSS rule selector string */
	public selectorText: string;

	// selector object for this rule.
	private selector: CssSelector;
}



/**
 * The TagRule class describes a styleset that applies to elements identified by a tag name.
 */
export class TagRule extends StyleRule implements ITagRule
{
	public constructor( tag: string, style?: ExtendedStyleset)
	{
		super( style);
		this.tag = tag;
	}



	// Creates a copy of the rule.
	public clone(): TagRule
	{
		let newRule = new TagRule( this.tag);
		newRule.copyFrom( this);
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return this.tag;
	}



	/** Name of the HTML tag */
	public tag: string;
}



