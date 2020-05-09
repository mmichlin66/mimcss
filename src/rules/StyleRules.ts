import {IStyleRule, ExtendedStyleset, IVarRule, IAbstractRule, IClassRule, IIDRule, ISelectorRule, DependentRules} from "./RuleTypes";
import {IStyleset, Styleset, VarTemplateName, VarValueType, CustomVarStyleType} from "../styles/StyleTypes"
import {CssSelector} from "../styles/SelectorTypes"
import {Rule, ITopLevelRuleContainer, createNames} from "./Rule";
import {mergeStylesets, stylesetToString, stylePropToString, mergeStylesetSpecialProps} from "../styles/StyleFuncs"
import {valueToString, camelToDash} from "../styles/UtilFuncs";
import {VarRule} from "./VarRule";
import {pseudoEntityToString, selectorToString} from "../styles/SelectorFuncs";



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

		this.styleset = {};
		this.dependentRules = {};

		if (styleset)
			this.parseInputStyleset( styleset as ExtendedStyleset);
	}



	/**
	 * Goes over properties in the given styleset and parses them into proper styleset, set of
	 * important properties and dependent rules.
	 */
	private parseInputStyleset( inputStyleset: ExtendedStyleset): void
	{
		// if we have parents, we first copy properties from them so that our own properties
		// can override them.
		if (inputStyleset["+"])
		{
			// the value is a single StyleRule or an array of StyleRules to copy properties from
			let extendsPropVal = inputStyleset["+"] as (StyleRule | StyleRule[]);
			let parentRules: StyleRule[];
			if (extendsPropVal instanceof StyleRule)
				parentRules = [extendsPropVal];
			else
				parentRules = extendsPropVal;

			// If we have parent rules, copy stylesets and dependent rules from them.
			if (parentRules && parentRules.length > 0)
			{
				parentRules.forEach( parent =>
				{
					this.styleset = mergeStylesets( this.styleset, parent.styleset);
					this.copyDependentRulesFrom( parent);
				});
			}
		}

		// merge custom and important properties
		mergeStylesetSpecialProps( this.styleset, inputStyleset);

		for( let propName in inputStyleset)
		{
			// skip over already processed parents, important and custom properties
			if (propName === "+" || propName === "!" || propName === "--")
				continue;

			let propVal = inputStyleset[propName];
			if (propName.startsWith(":"))
			{
				// if the value is an array, then this is an array of tuples representing
				// parameterised pseudo entities where the first element is the parameter value
				// (string) and the second the ExtendedStyleset. Otherwise, the value is just an
				// ExtendedStyleset.
				if (Array.isArray(propVal))
				{
					let tuples = propVal as [any, ExtendedStyleset][];
					if (tuples.length > 0)
					{
						this.dependentRules[propName] = tuples.map( tuple => new DependentRule(
							propName, tuple[0], tuple[1], this));
					}
				}
				else
					this.dependentRules[propName] = new DependentRule( "&" + propName, undefined,
						propVal as ExtendedStyleset, this);
			}
			else if (propName === "&")
			{
				// value is an array of two-element tuples with selector and styleset
				let tuples = propVal as [CssSelector, ExtendedStyleset][];
				if (tuples.length > 0)
				{
					this.dependentRules[propName] = tuples.map( tuple => new DependentRule(
						tuple[0], undefined, tuple[1], this));
				}
			}
			else if (propName.startsWith("&"))
			{
				// value is an array of two-element tuples with selector and styleset
				let tuples = propVal as [CssSelector, ExtendedStyleset][];
				if (tuples.length > 0)
				{
					this.dependentRules[propName] = tuples.map( tuple => new DependentRule(
						() => propName + selectorToString( tuple[0]), undefined, tuple[1], this));
				}
			}
			else if (propName.endsWith("&"))
			{
				// value is an array of two-element tuples with selector and styleset
				let tuples = propVal as [CssSelector, ExtendedStyleset][];
				if (tuples.length > 0)
				{
					this.dependentRules[propName] = tuples.map( tuple => new DependentRule(
						() => selectorToString( tuple[0]) + propName, undefined, tuple[1], this));
				}
			}
			else
			{
				// this is a regular CSS property: copy the property value to our internal styleset
				this.styleset[propName] = propVal;
			}
		}
	}



	// Processes the given rule.
	public process( owner: ITopLevelRuleContainer, ruleName: string | null): void
	{
		super.process( owner, ruleName);

		// if dependent rules exist, process them under the same container
		for( let propName in this.dependentRules)
		{
			let propVal = this.dependentRules[propName];
			if (Array.isArray(propVal) && propVal.length > 0)
				propVal.forEach( (depRule: DependentRule) => depRule.process( owner, null));
			else
				(propVal as DependentRule).process( owner, null);
		}
	}



	// Copies internal data from another rule object.
	protected copyFrom( src: StyleRule): void
	{
		// this method is called on a newly created object so we don't have any properties in
		// our own styleset yet
		this.styleset = mergeStylesets( this.styleset, src.styleset);
		this.copyDependentRulesFrom( src);
	}



	// Copies dependent rules from another style rule object.
	private copyDependentRulesFrom( src: StyleRule): void
	{
		for( let propName in src.dependentRules)
		{
			let propVal = src.dependentRules[propName];
			if (Array.isArray(propVal) && propVal.length > 0)
			{
				let arr = this.dependentRules[propName];
				if (!arr)
					this.dependentRules[propName] = arr = [];

				propVal.forEach( (srcDepRule: DependentRule) =>
				{
					let newDepRule = srcDepRule.clone();
					newDepRule.containingRule = this;
					arr.push( newDepRule);
				});
			}
			else
			{
				let newDepRule = (propVal as DependentRule).clone();
				newDepRule.containingRule = this;
				this.dependentRules[propName] = newDepRule;
			}
		}
	}



	// Converts the rule to CSS string representing the rule.
	public toCssString(): string
	{
		if (this.cachedSelectorString == null)
			this.cachedSelectorString = this.getSelectorString();
			
		return `${this.cachedSelectorString} {${stylesetToString( this.styleset)}}`;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (Object.keys(this.styleset).length > 0)
			this.cssRule = Rule.addRuleToDOM( this.toCssString(), parent) as CSSStyleRule;

		// if dependent rules exist, insert them under the same parent
		for( let propName in this.dependentRules)
		{
			let propVal = this.dependentRules[propName];
			if (Array.isArray(propVal) && propVal.length > 0)
				propVal.forEach( (depRule: DependentRule) => depRule.insert( parent));
			else
				(propVal as DependentRule).insert( parent);
		}
	}



	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

		// if dependent rules exist, clear them too
		for( let propName in this.dependentRules)
		{
			let propVal = this.dependentRules[propName];
			if (Array.isArray(propVal) && propVal.length > 0)
				propVal.forEach( (depRule: DependentRule) => depRule.clear());
			else
				(propVal as DependentRule).clear();
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
		this.setPropInternal( name, value, important);
	}



	/**
	 * Adds/replaces the value of the given custom CSS property in this rule.
	 * @param varObj IVarRule object defining a custom CSS property.
	 * @param varValue New value of the custom CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	public setCustomProp<K extends VarTemplateName>( varObj: IVarRule<K>, value: VarValueType<K>,
		important?: boolean): void
	{
		if (!varObj || !(varObj instanceof VarRule))
			return;

		return this.setCustomPropInternal( varObj, value, important);
	}



	/**
	 * Adds/replaces/removes the value of the given CSS property in this rule.
	 */
	private setPropInternal( name: string, value: any, important?: boolean): void
	{
		// first set/remove the value in our internal styleset object
		if (value == null)
			delete this.styleset[name];
		else
		{
			this.styleset[name] = value;
			this.setPropImportant( name, important);
		}

		// second, if CSSRule alredy exists, set/remove the property value there
		if (!this.cssRule)
			return;

		if (value == null)
			this.cssRule.style.removeProperty( camelToDash( name));
		else
			this.cssRule.style.setProperty( camelToDash( name),
				stylePropToString( name, value, true), important ? "!important" : null)
	}



	/**
	 * Sets or clears the important flag for the given property. This method is invoked only if
	 * the styleset is defined
	 */
	private setPropImportant( name: string, important?: boolean): void
	{
		// get the current important
		let currImportantProps = this.styleset["!"] as string[];
		if (!currImportantProps && !important)
			return;

		if (important)
		{
			if (!currImportantProps)
				this.styleset["!"] = [name as keyof IStyleset];
			else if (currImportantProps.indexOf( name) < 0)
				currImportantProps.push( name);
		}
		else
		{
			let index = currImportantProps.indexOf( name);
			if (index >= 0)
			{
				if (currImportantProps.length === 1)
					this.styleset["!"] = undefined;
				else
					currImportantProps.splice( index, 1);
			}
		}
	}



	/**
	 * Adds/replaces/removes the value of the given custmom cSS property in this rule.
	 */
	private setCustomPropInternal( varObj: VarRule, value: any, important?: boolean): void
	{
		// first set/remove the value in our internal styleset object
		let currCustomProps = this.styleset["--"] as CustomVarStyleType[];
		if (currCustomProps || value != null)
		{
			if (value == null)
			{
				if (currCustomProps.length > 0)
				{
					let index = currCustomProps.findIndex( item => item[0] === varObj);
					if (index >= 0)
					{
						if (currCustomProps.length === 1)
							this.styleset[""] = undefined;
						else
							currCustomProps.splice( index, 1);
					}
				}
			}
			else
			{
				if (!currCustomProps)
					this.styleset["--"] = currCustomProps = [[varObj, value]];
				else
				{
					let index = currCustomProps.findIndex( item => item[0] === varObj);
					if (index >= 0)
						currCustomProps[index][1] = value;
					else
						currCustomProps.push( [varObj, value]);
				}
			}
		}

		// second, if CSSRule alredy exists, set/remove the property value there
		if (!this.cssRule)
			return;

		if (value == null)
			this.cssRule.style.removeProperty( varObj.cssName);
		else
			this.cssRule.style.setProperty( varObj.cssName,
				stylePropToString( varObj.template, value, true), important ? "!important" : null)
	}



	/** SOM style rule */
	public cssRule: CSSStyleRule;

	/**
	 * Object containing dependent rules. Property names are taken from special properties
	 * of the ExtendedStyleset. This object allows callers to access dependent rules to change
	 * style property values programmatically.
	 */
	public dependentRules: DependentRules;

	// Resultant object defining properties to be inserted into DOM.
	private styleset: Styleset;

	// Selector string cached after it is first obtained. Needed to not invoke getSelectorString
	// multiple times in the presence of dependent rules.
	private cachedSelectorString: string | null = null;
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



