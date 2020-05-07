import {IStyleRule, ExtendedStyleset, IVarRule, IAbstractRule, IClassRule, IIDRule, ISelectorRule} from "./RuleTypes";
import {IStyleset, Styleset, VarTemplateName, VarValueType} from "../styles/StyleTypes"
import {CssSelector} from "../styles/SelectorTypes"
import {Rule, ITopLevelRuleContainer, createNames} from "./Rule";
import {mergeStylesets, stylesetToString, stylePropToString} from "../styles/StyleFuncs"
import {valueToString, camelToDash} from "../styles/UtilFuncs";
import {VarRule} from "./VarRule";
import { pseudoEntityToString, selectorToString } from "../styles/SelectorFuncs";



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
	 * important properties and dependent rules.
	 */
	private parseInputStyleset( inputStyleset: Styleset): void
	{
		// prepare local variables to accumulate parsing results. We do it in local varibales
		// because in case there are parents, we want first copy properties from them so that
		// our own properties can override them.
		let parentRules: StyleRule[] | null = null;
		let dependentRules: DependentRule[] | null = null;
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
				if (!dependentRules)
					dependentRules = [];

				// if the value is an array, then this is a parameterised pseudo entity where the first element
				// is the parameter value (string) and the second the ExtendedStyleset. Otherwise, the value is
				// just the ExtendedStyleset.
				let dependentRule: DependentRule;
				if (Array.isArray(propVal))
					dependentRule = new DependentRule( propName, propVal[0], propVal[1] as ExtendedStyleset, this);
				else
					dependentRule = new DependentRule( "&" + propName, undefined, propVal as ExtendedStyleset, this);

				dependentRules.push( dependentRule);
			}
			else if (propName === "&")
			{
				// value is an array of two-element tuples with selector and styleset
				let tuples = propVal as [CssSelector, ExtendedStyleset][];
				if (tuples.length > 0)
				{
					if (!dependentRules)
						dependentRules = [];

					tuples.forEach( tuple => dependentRules!.push( new DependentRule( tuple[0],
						undefined, tuple[1], this)));
				}
			}
			else if (propName.startsWith("&"))
			{
				// value is an array of two-element tuples with selector and styleset
				let tuples = propVal as [CssSelector, ExtendedStyleset][];
				if (tuples.length > 0)
				{
					if (!dependentRules)
						dependentRules = [];

					tuples.forEach( tuple => dependentRules!.push( new DependentRule(
						() => propName + selectorToString( tuple[0]),
						undefined, tuple[1], this)));
				}
			}
			else if (propName.endsWith("&"))
			{
				// value is an array of two-element tuples with selector and styleset
				let tuples = propVal as [CssSelector, ExtendedStyleset][];
				if (tuples.length > 0)
				{
					if (!dependentRules)
						dependentRules = [];

					tuples.forEach( tuple => dependentRules!.push( new DependentRule(
						() => selectorToString( tuple[0]) + propName,
						undefined, tuple[1], this)));
				}
			}
			else
			{
				// copy the property value to our internal styleset
				styleset[propName] = propVal;
			}
		}

		// by now we went over all properties of the input styleset. If we have parent style
		// rules, copy styleset, important and dependent rules data from them.
		if (parentRules && parentRules.length > 0)
		{
			parentRules.forEach( parent =>
			{
				if (parent.styleset)
					this.styleset = mergeStylesets( this.styleset, parent.styleset);

				if (parent.dependentRules && parent.dependentRules.length > 0)
				{
					if (!this.dependentRules)
						this.dependentRules = [];

					parent.dependentRules.forEach( dependentRule =>
					{
						let newDependentRule = dependentRule.clone();
						newDependentRule.containingRule = this;
						this.dependentRules.push( newDependentRule);
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

		if (dependentRules && dependentRules.length > 0)
		{
			if (!this.dependentRules)
				this.dependentRules = dependentRules;
			else
				dependentRules.forEach( dependentRule => this.dependentRules.push( dependentRule));
		}
	}



	// Processes the given rule.
	public process( owner: ITopLevelRuleContainer, ruleName: string | null): void
	{
		super.process( owner, ruleName);

		// if dependent rules exist, process them under the same container
		if (this.dependentRules)
			this.dependentRules.forEach( dependentRule => dependentRule.process( owner, null));
	}



	// Copies internal data from another rule object.
	public copyFrom( src: StyleRule): void
	{
		this.styleset = src.styleset;

		// if dependent rules exist, clone them
		if (src.dependentRules)
		{
			this.dependentRules = [];
			for( let srcDependentRule of src.dependentRules)
			{
				let newDependentRule = srcDependentRule.clone();
				newDependentRule.containingRule = this;
				this.dependentRules.push( newDependentRule);
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

		// if dependent rules exist, insert them under the same parent
		if (this.dependentRules)
			this.dependentRules.forEach( dependentRule => dependentRule.insert( parent));
	}



	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

		// if dependent rules exist, clear them too
		if (this.dependentRules)
			this.dependentRules.forEach( dependentRule => dependentRule.clear());
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

		this.cssRule.style.setProperty( camelToDash( name),
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

	// List of dependent styles.
	private dependentRules: DependentRule[];
}



/**
 * The DependentRule class describes a styleset that depends on the containing style rule. This
 * is used for pseudo classes, pseudo elements, combinators and other selectors that combine the
 * containing rule's selector with additional selector items.
 */
class DependentRule extends StyleRule
{
	// for regular selectors, pseudo classes and pseudo elements, the selector already contains
	// the ampersand and the selectorParam is undefined. For parameterized pseudo classes, psudo
	// elements and combinators, the selectorParam is defined and the selector is just the entity
	// name.
	public constructor( selector: CssSelector, selectorParam?: any, style?: ExtendedStyleset,
		containingRule?: StyleRule)
	{
		super( style);
		this.selector = selector;
		this.selectorParam = selectorParam;
		this.containingRule = containingRule;
	}



	// Creates a copy of the rule.
	public clone(): DependentRule
	{
		let newRule = new DependentRule( this.selector);
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
			// convert selector to string.
			let selector = selectorToString( this.selector);

			// if the selector string doesn't have any occurrences of the ampersand symbol, we
			// simply append the selector to the parent selector; otherwise, we replace all
			// occurrences of the ampersand symbol in the selector string with the selector
			// string of the parent rule.
			return selector.indexOf( "&") < 0
				? `${parentSelector}${selector}`
				: selector.replace( /&/g, parentSelector);
		}
	}



	// Partial selector that should be appended to the parent selector.
	private selector: CssSelector;

	// Optional parameters for the selector - used for parameterized pseudo classes and elements.
	private selectorParam?: any;

	// Parent style rule of which this rule is dependent.
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



