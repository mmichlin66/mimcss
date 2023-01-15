import {
    IStyleRule, IVarRule, DependentRules, INamedEntity, IClassRule, IIDRule, IStyleDefinition,
    IPageRule, IPrefixedNamedEntity, ClassMoniker
} from "../api/RuleTypes";
import {
    ExtendedIStyleset, Styleset, VarTemplateName, CustomVar_StyleType, ExtendedVarValue,
    CombinedStyleset, IStyleset, PageRuleStyleset
} from "../api/Stylesets"
import {CssSelector, IParameterizedPseudoEntityFunc, PageSelector} from "../api/CoreTypes"
import {Rule, IMimcssRuleBag} from "./Rule";
import {camelToDash, fdo2s, symV2S, v2s, WKF, wkf} from "../impl/Utils";
import {s2s, sp2elm, sp2s} from "../impl/StyleImpl"
import {scheduleAction} from "../impl/SchedulingImpl";
import {selector2s} from "../impl/CoreImpl";



/**
 * The StyleRule class is used as a base class for rules that contain a style rule. This class
 * implements the parsing of the CombinedStyleset object.
 */
export abstract class StyleRule<R extends CSSStyleRule | CSSPageRule = CSSStyleRule> extends Rule implements IStyleRule<R>
{
	// The styleset can be an CombinedStyleset for many rules; however, for some it is just
	// of the Styleset type.
	public constructor( sd: IStyleDefinition, inputStyleset?: Styleset | Styleset[])
	{
		super(sd);

        this.inputStyleset = inputStyleset;
		this.styleset = {};
		this.dependentRules = {};
	}


    /**
     * This function allows the object to particpate in "v2s" serialization. Whenever the
     * StyleRule-derived object is encountered by the `v2s` function, the rule's selector will be
     * used.
     */
    [symV2S](): string { return this.selectorText; }

    /**
     * The `toString()` method is used whenever there is the need to convert the object to string.
     * In `v2s` context, the `toString()` method has lower precedence than the `symV2S` property
     * and this allows the `toString()` to be overridden in derived classes without changing the
     * `symV2S` functionality. For example, the `toString()` for class and ID rules will return
     * the class and ID names (without the prefixes) respectively, while the basic (this)
     * implementation returns the selector text.
     */
    public toString(): string { return this.selectorText; }



	// Processes the given rule.
	public process( ruleName: string | null): void
	{
        let inputStyleset = this.inputStyleset;
		if (inputStyleset)
        {
            if (Array.isArray( inputStyleset))
                inputStyleset.forEach( v => this.parse( this.sd, v));
            else
			    this.parse( this.sd, inputStyleset);
        }

        this.forEachDepRule( (depRule: DepRule) => depRule.process( null));
	}



	/**
	 * Goes over properties in the given styleset and parses them into proper styleset, set of
	 * important properties and dependent rules.
	 */
	private parse( sd: IStyleDefinition, inputStyleset: Styleset): void
	{
		for( let propName in inputStyleset)
		{
			let propVal = inputStyleset[propName];
            if (propVal == null)
                continue;
            else if (propName === "+")
            {
                // the value is a single StyleRule or an array of StyleRules to copy properties from
                let parentRules = propVal instanceof StyleRule ? [propVal] : propVal as StyleRule[];
                for( let parent of parentRules)
                {
                    mergeStylesets( this.styleset, parent.styleset);
                    this.copyDepRules( parent);
                }
            }
            else if (propName === "--")
                mergeCustomProps( this.styleset, propVal as CustomVar_StyleType[]);
			else if (propName.startsWith(":"))
			{
				// if the value is an array, then this is an array of tuples representing
				// parameterised pseudo entities where the first element is the parameter value
				// (string) and the second the CombinedStyleset. Otherwise, the value is just a
				// CombinedStyleset.
				if (Array.isArray(propVal))
				{
					this.dependentRules[propName] = propVal.map(
                        (tuple: [any, CombinedStyleset | CombinedStyleset[]]) =>
                            new DepRule(sd, propName, tuple[0], tuple[1], this));
				}
				else
					this.dependentRules[propName] = new DepRule( sd, "&" + propName, undefined,
						propVal as CombinedStyleset, this);
			}
			else if (propName.includes("&"))
            {
                // value is an array of two-element tuples with selector and styleset
                let tuples = propVal as [CssSelector, CombinedStyleset | CombinedStyleset[]][];
                if (tuples.length > 0)
                {
                    this.dependentRules[propName] = tuples.map( tuple => {
                        let newSelector = propName === "&"
                            ? tuple[0]
                            : propName.startsWith("&")
                                ? [propName, tuple[0]]
                                : [tuple[0], propName];
                        return new DepRule( sd, newSelector, undefined, tuple[1], this)
                    });
                }
            }
			else if (!this.parseSP( propName, propVal))
			{
				// this is a regular CSS property: copy the property value to our internal styleset
                mergePropValues( this.styleset, propName, propVal)
			}
		}
	}



	// Converts the rule to CSS string representing the rule.
	public toCss(): string
	{
		return `${this.selectorText}{${s2s(this.styleset)}${this.getAux()}}`;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( ruleBag: IMimcssRuleBag): void
	{
		if (this.hasProps())
			this.cssRule = ruleBag.add( this.toCss())?.cssRule as R;

        // insert dependent rules under the same parent
        this.forEachDepRule( (depRule: DepRule) => depRule.insert( ruleBag));
	}

	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

        // clear dependent rules
        this.forEachDepRule( (depRule: DepRule) => depRule.clear());
	}

	// Invoke the given function for each of the dependent rules.
	private forEachDepRule( func: (depRule: DepRule) => void): void
	{
		for( let propName in this.dependentRules)
		{
			let propVal = this.dependentRules[propName] as DepRule | DepRule[];
			if (Array.isArray(propVal))
                for( let depRule of propVal) func( depRule);
			else
                func( propVal);
		}
	}



	/** CSS rule selector string */
	public get selectorText(): string
	{
		if (this._sel == null)
			this._sel = this.getSel();

		return this._sel;
	}



	// Copies dependent rules from another style rule object.
	protected copyDepRules( src: StyleRule<R>): void
	{
        let srsDepRules = src.dependentRules;
        let thisDepRules = this.dependentRules;
		for( let propName in srsDepRules)
		{
			let srcRuleOrArr = srsDepRules[propName] as DepRule<R> | DepRule<R>[];
			if (Array.isArray(srcRuleOrArr))
			{
                if (srcRuleOrArr.length > 0)
                {
                    let thisArr = thisDepRules[propName];
                    if (!thisArr)
                        thisDepRules[propName] = thisArr = [];

                    for( let srcDepRule of srcRuleOrArr)
                        thisArr.push( srcDepRule.clone( this));
                }
			}
			else
				thisDepRules[propName] = srcRuleOrArr.clone( this);
		}
	}



 	// Determines whether this style rule has style properties (that is, is not empty).
	protected hasProps(): boolean { return Object.keys(this.styleset).length > 0; }

	// Returns the selector part of the style rule.
	protected abstract getSel(): string;

 	// Returns the additional part of the style rule beyond the styleset. For majority of style
    // rules it is empty.
	protected getAux(): string { return ""; }

    // Allows the derived classes to process style properties that the StyleRule doesn't know
    // about. If true is returned, the property with the given name is considered processed and
    // will not be added to the styleset.
	protected parseSP( propName: string, propVal: any): boolean { return false; }



	/**
	 * Adds/replaces the value of the given CSS property in this rule.
	 * @param name Name of the CSS property.
	 * @param value New value of the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 * @param schedulerType ID of a registered scheduler type that is used to write the property
	 * value to the DOM. If undefined, the current default scheduler will be used.
	 */
    public setProp<K extends keyof IStyleset>( name: K, value: ExtendedIStyleset[K] | null,
        important?: boolean, schedulerType?: number): void
	{
		// first set/remove the value in our internal styleset object
		if (value == null)
			delete this.styleset[name];
		else
			this.styleset[name] = important ? { "!": value as any } : value as any;

		// second, if CSSRule alredy exists, set/remove the property value there
		if (this.cssRule)
        {
		    scheduleAction(() => sp2elm(this.cssRule, camelToDash(name),
                value == null ? null : sp2s( name, value), important), schedulerType);
        }
	}



	/**
	 * Adds/replaces the value of the given custom CSS property in this rule.
	 * @param varObj IVarRule object defining a custom CSS property.
	 * @param varValue New value of the custom CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 * @param schedulerType ID of a registered scheduler type that is used to write the property
	 * value to the DOM. If undefined, the current default scheduler will be used.
	 */
	public setCustomProp<K extends VarTemplateName>( varObj: IVarRule<K>, value: ExtendedVarValue<K> | null,
		important?: boolean, schedulerType?: number): void
	{
		if (!varObj)
			return;

		// first set/remove the value in our internal styleset object
		let currCustomProps = this.styleset["--"] as CustomVar_StyleType[];
		if (currCustomProps || value != null)
		{
			if (value == null)
			{
                let index = currCustomProps.findIndex( item => item[0] === varObj);
                if (index >= 0)
                    currCustomProps.splice( index, 1);
			}
			else if (!currCustomProps)
                this.styleset["--"] = [[varObj, value]];
            else
            {
                let index = currCustomProps.findIndex( item => item[0] === varObj);
                if (index >= 0)
                    currCustomProps[index][1] = value;
                else
                    currCustomProps.push( [varObj, value]);
            }
		}

		// second, if CSSRule alredy exists, set/remove the property value there
		if (this.cssRule)
        {
            scheduleAction(() => sp2elm(this.cssRule, varObj.cssName,
                value == null ? null : sp2s(varObj.template, value), important), schedulerType);
        }
	}



	/** SOM style rule */
	declare public cssRule: R;

	/**
	 * Object containing dependent rules. Property names are taken from special properties
	 * of the CombinedStyleset. This object allows callers to access dependent rules to change
	 * style property values programmatically.
	 */
	public dependentRules: DependentRules<R>;

	// Resultant object defining properties to be inserted into DOM.
	protected styleset: Styleset;

    private inputStyleset?: Styleset | Styleset[];

    // Selector string cached after it is first obtained. Needed to not invoke getSelectorString
	// multiple times in the presence of dependent rules.
	private _sel: string | null = null;
}



/**
 * The DependentRule class describes a styleset that depends on the containing style rule. This
 * is used for pseudo classes, pseudo elements, combinators and other selectors that combine the
 * containing rule's selector with additional selector items.
 */
class DepRule<R extends CSSStyleRule | CSSPageRule = CSSStyleRule> extends StyleRule<R>
{
	// for regular selectors, pseudo classes and pseudo elements, the selector already contains
	// the ampersand and the selectorParam is undefined. For parameterized pseudo classes, pseudo
	// elements and combinators, the selectorParam is defined and the selector is just the entity
	// name.
	public constructor( sd: IStyleDefinition, selector: CssSelector, param?: any, styleset?: CombinedStyleset | CombinedStyleset[],
		parent?: StyleRule<R>)
	{
		super( sd, styleset);
		this.selector = selector;
		this.parent = parent;
        this.param = param;
	}



	// Creates a copy of the rule but with new parent (containing rule).
	public clone( containingRule: StyleRule<R>): DepRule<R>
	{
		let newRule = new DepRule( this.sd, this.selector, this.param, undefined, containingRule);

        // this method is called on a newly created object so we don't have any properties in
		// our own styleset yet
		mergeStylesets( newRule.styleset, this.styleset);
		newRule.copyDepRules( this);

        return newRule;
	}



	// Returns the selector part of the style rule.
	protected getSel(): string
	{
		let parentSelector = this.parent!.selectorText;
		if (this.param)
        {
            // the "param" value is only set for parameterized pseudo entities, so we convert it to
            // the "func" object form. We also know that the selector is a string - name of the entity.
			return `${parentSelector}${fdo2s({fn: this.selector as string, p: this.param} as IParameterizedPseudoEntityFunc<any>)}`;
        }
        else
		{
			// convert selector to string.
			let selector = selector2s( this.selector);

			// if the selector string doesn't have any occurrences of the ampersand symbol, we
			// simply append the selector to the parent selector; otherwise, we replace all
			// occurrences of the ampersand symbol in the selector string with the selector
			// string of the parent rule.
			return selector.indexOf( "&") < 0
				? `${parentSelector}${selector}`
				: selector.replace( /&/g, parentSelector);
		}
	}



	// Parent style rule of which this rule is dependent.
	public parent?: StyleRule<R>;

	// Partial selector that should be appended to the parent selector.
	private selector: CssSelector;

	// Optional parameters for the selector - used for parameterized pseudo classes and elements.
	private param?: any;
}



/**
 * The AbstractRule class describes a styleset that can only be used as a base for other style
 * rules.
 */
export class AbstractRule extends StyleRule
{
	// Overrides the StyleRule's implementation to do nothing. No CSSStyleRule is created for
	// abstract rules.
	public insert( ruleBag: IMimcssRuleBag): void {}

	// Overrides the StyleRule's implementation to do nothing.
	public clear(): void {}

    // Returns the selector part of the style rule.
	protected getSel(): string { return ""; }
}



/**
 * The NamedStyleRule class is a base for style rule classes that are also named entities - such
 * as class rule and ID rule.
 */
abstract class NamedStyleRule extends StyleRule implements IPrefixedNamedEntity
{
	public constructor( sd: IStyleDefinition, styleset?: CombinedStyleset | CombinedStyleset[],
        nameOverride?: string | INamedEntity)
	{
		super( sd, styleset);
		this.nameOverride = nameOverride;
	}

	// Processes the given rule.
	public process( ruleName: string | null): void
	{
		super.process( ruleName);

		this.name = this.rc.getScopedName( ruleName, this.nameOverride);
        this.cssName = this.prefix + this.name;
	}

	// Returns the selector part of the style rule.
	protected getSel(): string
	{
		return this.cssName;
	}

	// Implementation of the toString method returns the name of the rule (without the CSS prefix).
	public toString(): string
	{
		return this.name;
	}

	// Returns prefix that is put before the entity name to create a CSS name used in style rule
	// selectors.
	public abstract get prefix(): "." | "#";

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
	protected nameOverride?: string | INamedEntity;
}



/**
 * The ClassRule class describes a styleset that applies to elements identified by a CSS class.
 */
export class ClassRule extends NamedStyleRule implements IClassRule
{
	// Prefix for CSS classes.
	public get prefix(): "." { return "."; }

	// Processes the given rule.
	public process( ruleName: string | null): void
	{
		super.process( ruleName);

        // by now our name and cssName properties have been set to reflect a single name. Now
        // look at the parent class rues defined using the "++" property and take names from the
        // referenced class rules and append them to the name.
        if (this.parents)
        {
            this.name += " " + this.parents.map( v => typeof v === "string" ? v : wkf[WKF.ClassMoniker](v)).join(" ");
            this.cssName = "." + this.name.replace( / /g, ".");
        }
	}

    // Allows the derived classes to process style properties that the StyleRule doesn't know about.
    // If returns false, the property with the given name will not be added to the styleset.
	protected parseSP( propName: string, propVal: any): boolean
    {
        if (propName == "++")
        {
            let rules = propVal as ClassMoniker;
            if (rules)
                this.parents = Array.isArray(rules) ? rules : [rules];

            return true;
        }

        return false;
    }

    // remembered value of the "++" property of the input styleset
    private parents?: ClassMoniker[];
}



/**
 * The IDRule class describes a styleset that applies to elements identified by an ID.
 */
export class IDRule extends NamedStyleRule implements IIDRule
{
	// Prefix for CSS element identifiers.
	public get prefix(): "#" { return "#"; }
}



/**
 * The SelectorRule type describes a styleset that applies to elements identified by a CSS selector.
 */
export class SelectorRule extends StyleRule
{
	public constructor( sd: IStyleDefinition, selector: CssSelector,
        styleset?: CombinedStyleset | CombinedStyleset[])
	{
		super( sd, styleset);
		this.selector = selector;
	}

	// Returns the selector part of the style rule.
	protected getSel(): string
	{
		return selector2s( this.selector);
	}

	// selector object for this rule.
	private selector: CssSelector;
}



/**
 * The PageRule class represents the CSS @page rule.
 */
export class PageRule extends StyleRule<CSSPageRule> implements IPageRule
{
    public constructor( sd: IStyleDefinition, pageSelector?: PageSelector, style?: PageRuleStyleset)
    {
        super( sd, style);
        this.pageSelector = pageSelector;
    }

    // Allows the derived classes to process style properties that the StyleRule doesn't know about.
    // If returns false, the property with the given name will not be added to the styleset.
	protected parseSP( propName: string, propVal: any): boolean
    {
        if (propName.startsWith("@"))
        {
            this.marginBoxes.set( propName, propVal)
            return true;
        }

        return false;
    }

 	// Returns the additional part of the style rule beyond the styleset. For majority of style
    // rules it is empty.
	protected hasProps(): boolean
    {
        return super.hasProps() || this.marginBoxes.size !== 0;
    }

    // Returns the CSS string representing the style rule's selector.
    protected getSel(): string
    {
        return `@page ${v2s( this.pageSelector, {sep: ""})}`;
    }

 	// Returns the additional part of the style rule beyond the styleset. This rule adds the
    // margin boxes.
	protected getAux(): string
    {
        let s = "";
        this.marginBoxes.forEach( (boxStyleset, boxName) => s += `${boxName}{${s2s(boxStyleset)}}`);
        return s;
    }

    /** SOM page rule */
    declare public cssRule: CSSPageRule;

    /** Optional page seclector name of the page pseudo style (e.g. "":first") */
    public pageSelector?: PageSelector;

    /**
     * Map of margin box names to their stylesets.
     */
    private marginBoxes = new Map<string,Styleset>();
}



/**
 * Merges properties from the source styleset to the target styleset. All regular properties are
 * replaced. The "--" property gets special treatment because it is an array.
 * @param target Target Styleset object - cannot be null or undefined;
 * @param source Source Styleset object - cannot be null or undefined.
 * @param source
 */
const mergeStylesets = (target: Styleset, source: Styleset): void =>
{
    // copy all other properties from the source
    if (Object.keys(target).length === 0)
        Object.assign( target, source);
    else
    {
        for( let propName in source)
        {
            if (propName === "--")
                mergeCustomProps( target, source[propName]!);
            else
                mergePropValues( target, propName, source[propName]);
        }
    }
}



/**
 * Merges "--" property from the source styleset to the target styleset.
 */
const mergeCustomProps = (target: Styleset, sourceVars: CustomVar_StyleType[]): void =>
{
    let targetVars = target["--"];
    target["--"] = !targetVars ? sourceVars.slice() : targetVars.concat( sourceVars);
}


/**
 * Merges values of the given property from the source styleset to the target styleset. Note that
 * both source or target value can be either single value or an object with the `"[]"` property
 * that contains multiple values.
 * @param target Target Styleset object - cannot be null or undefined.
 * @param propName Name of the property.
 * @param sourceVal Value from the source styleset to merge with the target value - cannot be null
 * or undefined.
 */
const mergePropValues = (target: Styleset, propName: string, sourceVal: any): void =>
{
    let targetVal = target[propName];
    if (targetVal == null)
    {
        // if property doesn't exist in the target or its value is null or undefined, just
        // take the source's value
        target[propName] = sourceVal;
    }
    else
    {
        let targetArray: any[] = targetVal["[]"];
        if (!targetArray)
            target[propName] = { "[]": targetArray = [targetVal] };

        let sourceArray: any[] = sourceVal["[]"];
        if (!sourceArray)
            targetArray.push( sourceVal);
        else
            targetArray.push( ...sourceArray);
    }
}


