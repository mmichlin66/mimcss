import {IStyleRule, IVarRule, DependentRules, INamedEntity, IClassRule, IIDRule} from "../api/RuleTypes";
import {
    ExtendedBaseStyleset, Styleset, VarTemplateName, CustomVar_StyleType, ExtendedVarValue,
    CombinedStyleset, ParentClassType
} from "../api/Stylesets"
import {CssSelector, IParameterizedPseudoEntityFunc} from "../api/CoreTypes"
import {Rule, ITopLevelRuleContainer, createName, IRuleContainer, IRuleSerializationContext} from "./Rule";
import {camelToDash, fdo2s, symV2S} from "../impl/Utils";
import {styleset2s, sp2s} from "../impl/StyleImpl"
import {VarRule} from "./VarRule";
import {scheduleStyleUpdate} from "../impl/SchedulingImpl";
import {selector2s} from "../impl/CoreImpl";



/**
 * The StyleRule class is used as a base class for rules that contain a style rule. This class
 * implements the parsing of the CombinedStyleset object.
 */
export abstract class StyleRule extends Rule implements IStyleRule
{
	// The styleset can be an CombinedStyleset for many rules; however, for some it is just
	// of the Styleset type.
	public constructor( inputStyleset?: Styleset)
	{
		super();

		this.styleset = {};
		this.dependentRules = {};

		if (inputStyleset)
			this.parse( inputStyleset as CombinedStyleset);
	}


    /**
     * This function allows the object to particpate in "v2s" serialization. Whenever the
     * StyleRule-derived object is encountered by the `v2s` function, the rule's selector will be
     * used.
     */
    [symV2S](): string { return this.selectorText; }


	/**
	 * Goes over properties in the given styleset and parses them into proper styleset, set of
	 * important properties and dependent rules.
	 */
	private parse( inputStyleset: CombinedStyleset): void
	{
		for( let propName in inputStyleset)
		{
			let propVal = inputStyleset[propName];
            if (propName === "+")
            {
                let extendsPropVal = propVal as (StyleRule | StyleRule[]);
                if (extendsPropVal)
                {
                    // the value is a single StyleRule or an array of StyleRules to copy properties from
                    let parentRules = extendsPropVal instanceof StyleRule ? [extendsPropVal] : extendsPropVal;
                    for( let parent of parentRules)
                    {
                        this.styleset = mergeStylesets( this.styleset, parent.styleset);
                        this.copyDepRules( parent);
                    }
                }
            }
            else if (propName === "--")
            {
                if (propVal)
                    mergeCustomProps( this.styleset, propVal as CustomVar_StyleType[]);
            }
			else if (propName.startsWith(":"))
			{
				// if the value is an array, then this is an array of tuples representing
				// parameterised pseudo entities where the first element is the parameter value
				// (string) and the second the CombinedStyleset. Otherwise, the value is just an
				// CombinedStyleset.
				if (Array.isArray(propVal))
				{
					let tuples = propVal as [any, CombinedStyleset][];
					if (tuples.length > 0)
					{
						this.dependentRules[propName] = tuples.map( tuple => new DepRule(
							propName, tuple[0], tuple[1], this));
					}
				}
				else
					this.dependentRules[propName] = new DepRule( "&" + propName, undefined,
						propVal as CombinedStyleset, this);
			}
			else if (propName.includes("&"))
            {
                // value is an array of two-element tuples with selector and styleset
                let tuples = propVal as [CssSelector, CombinedStyleset][];
                if (tuples.length > 0)
                {
                    this.dependentRules[propName] = tuples.map( tuple => {
                        let newSelector = propName === "&"
                            ? tuple[0]
                            : propName.startsWith("&")
                                ? [propName, tuple[0]]
                                : [tuple[0], propName];
                        return new DepRule( newSelector, undefined, tuple[1], this)
                    });
                }
            }
			else if (this.parseSP( propName, propVal))
			{
				// this is a regular CSS property: copy the property value to our internal styleset
				this.styleset[propName] = propVal;
			}
		}
	}



	// Processes the given rule.
	public process( container: IRuleContainer, topLevelContainer: ITopLevelRuleContainer, ruleName: string | null): void
	{
		super.process( container, topLevelContainer, ruleName);
        this.forEachDepRule( (depRule: DepRule) => depRule.process( container, topLevelContainer, null));
	}



	// Converts the rule to CSS string representing the rule.
	public toCss(): string
	{
		return this.selectorText + styleset2s( this.styleset);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (Object.keys(this.styleset).length > 0)
			this.cssRule = Rule.toDOM( this.toCss(), parent) as CSSStyleRule;

        // insert dependent rules under the same parent
        this.forEachDepRule( (depRule: DepRule) => depRule.insert( parent));
	}

	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

        // clear dependent rules
        this.forEachDepRule( (depRule: DepRule) => depRule.clear());
	}

	// Serializes this rule to a string.
    public serialize( ctx: IRuleSerializationContext): void
    {
		if (Object.keys(this.styleset).length > 0)
			ctx.addRule( this.toCss());

        // insert dependent rules under the same parent
        this.forEachDepRule( (depRule: DepRule) => depRule.serialize( ctx));

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
	protected copyDepRules( src: StyleRule): void
	{
        let srsDepRules = src.dependentRules;
        let thisDepRules = this.dependentRules;
		for( let propName in srsDepRules)
		{
			let srcRuleOrArr = srsDepRules[propName] as DepRule | DepRule[];
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



	// Returns the selector part of the style rule.
	protected abstract getSel(): string;

    // Allows the derived classes to process style properties that the StyleRule doesn't know about.
    // If false is returned, the property with the given name will not be added to the styleset.
	protected parseSP( propName: string, propVal: any): boolean { return true; }



	/**
	 * Adds/replaces the value of the given CSS property in this rule.
	 * @param name Name of the CSS property.
	 * @param value New value of the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 * @param schedulerType ID of a registered scheduler type that is used to write the property
	 * value to the DOM. If undefined, the current default scheduler will be used.
	 */
    public setProp<K extends keyof ExtendedBaseStyleset>( name: K, value: ExtendedBaseStyleset[K],
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
		    scheduleStyleUpdate( this.cssRule, camelToDash( name),
                value == null ? null : sp2s( name, value), important, schedulerType);
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
	public setCustomProp<K extends VarTemplateName>( varObj: IVarRule<K>, value: ExtendedVarValue<K>,
		important?: boolean, schedulerType?: number): void
	{
		if (!varObj || !(varObj instanceof VarRule))
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
            scheduleStyleUpdate( this.cssRule, varObj.cssVarName,
                value == null ? null : sp2s( varObj.template, value),
                important, schedulerType);
        }
	}



	/** SOM style rule */
	public cssRule: CSSStyleRule;

	/**
	 * Object containing dependent rules. Property names are taken from special properties
	 * of the CombinedStyleset. This object allows callers to access dependent rules to change
	 * style property values programmatically.
	 */
	public dependentRules: DependentRules;

	// Resultant object defining properties to be inserted into DOM.
	protected styleset: Styleset;

	// Selector string cached after it is first obtained. Needed to not invoke getSelectorString
	// multiple times in the presence of dependent rules.
	private _sel: string | null = null;
}



/**
 * The DependentRule class describes a styleset that depends on the containing style rule. This
 * is used for pseudo classes, pseudo elements, combinators and other selectors that combine the
 * containing rule's selector with additional selector items.
 */
class DepRule extends StyleRule
{
	// for regular selectors, pseudo classes and pseudo elements, the selector already contains
	// the ampersand and the selectorParam is undefined. For parameterized pseudo classes, pseudo
	// elements and combinators, the selectorParam is defined and the selector is just the entity
	// name.
	public constructor( selector: CssSelector, param?: any, style?: CombinedStyleset,
		parent?: StyleRule)
	{
		super( style);
		this.selector = selector;
		this.parent = parent;
        this.param = param;
	}



	// Creates a copy of the rule but with new parent (containing rule).
	public clone( containingRule: StyleRule): DepRule
	{
		let newRule = new DepRule( this.selector, this.param, undefined, containingRule);

        // this method is called on a newly created object so we don't have any properties in
		// our own styleset yet
		newRule.styleset = mergeStylesets( newRule.styleset, this.styleset);
		newRule.copyDepRules( this);

        return newRule;
	}



	// Returns the selector part of the style rule.
	public getSel(): string
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
	public parent?: StyleRule;

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
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void {}

	// Overrides the StyleRule's implementation to do nothing.
	public clear(): void {}

	// Overrides the StyleRule's implementation to do nothing.
    public serialize( ctx: IRuleSerializationContext): void {}

    // Returns the selector part of the style rule.
	public getSel(): string { return ""; }
}



/**
 * The NamedStyleRule class is a base for style rule classes that are also named entities - such
 * as class rule and ID rule.
 */
abstract class NamedStyleRule extends StyleRule implements INamedEntity
{
	public constructor( style?: CombinedStyleset, nameOverride?: string | INamedEntity)
	{
		super( style);
		this.nameOverride = nameOverride;
	}

	// Processes the given rule.
	public process( container: IRuleContainer, topLevelContainer: ITopLevelRuleContainer, ruleName: string): void
	{
		super.process( container, topLevelContainer, ruleName);

		this.name = createName( topLevelContainer, ruleName, this.nameOverride);
        this.cssName = this.cssPrefix + this.name.replace( / /g, this.cssPrefix);
	}

	// Returns the selector part of the style rule.
	public getSel(): string
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
	protected abstract get cssPrefix(): string;

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
    // Allows the derived classes to process style properties that the StyleRule doesn't know about.
    // If returns false, the property with the given name will not be added to the styleset.
	protected parseSP( propName: string, propVal: any): boolean
    {
        if (propName == "++")
        {
            let rules = propVal as ParentClassType | ParentClassType[];
            if (rules)
                this.parents = Array.isArray(rules) ? rules : [rules];

            return false;
        }

        return super.parseSP( propName, propVal);
    }

	// Post-processes the given rule.
	public postProcess(): void
	{
        // by now our name and cssName properties have been set to reflect a single name. Now
        // look at the "++" property and if defined, take names from the referenced class rules
        // and append them to the name.
        if (this.parents)
        {
            this.name += " " + this.parents.map( cls => typeof cls === "string" ? cls : cls.name).join(" ");
            this.cssName = "." + this.name.replace( / /g, ".");
        }
	}

	/** Name of the class prefixed with "." */
	public get cssClassName(): string { return this.cssName; }

	// Returns prefix that is put before the entity name to create a CSS name used in style rule
	// selectors.
	protected get cssPrefix(): string { return "."; }

    // remembered value of the "++" property of the input styleset
    private parents?: ParentClassType[];
}



/**
 * The IDRule class describes a styleset that applies to elements identified by an ID.
 */
export class IDRule extends NamedStyleRule implements IIDRule
{
	/** Name of the element ID prefixed with "#" */
	public get cssIDName(): string { return this.cssName; }

	// Returns prefix that is put before the entity name to create a CSS name used in style rule
	// selectors.
	protected get cssPrefix(): string { return "#"; }
}



/**
 * The SelectorRule type describes a styleset that applies to elements identified by a CSS selector.
 */
export class SelectorRule extends StyleRule
{
	public constructor( selector: CssSelector, styleset?: CombinedStyleset)
	{
		super( styleset);
		this.selector = selector;
	}

	// Returns the selector part of the style rule.
	public getSel(): string
	{
		return selector2s( this.selector);
	}

	// selector object for this rule.
	private selector: CssSelector;
}



/**
 * Merges properties from the source styleset to the target styleset. All regular properties are
 * replaced. The "--" property gets special treatment because it is an array.
 * @param target
 * @param source
 * @returns Reference to the target styleset if not null or a new styleset otherwise.
 */
const mergeStylesets = (target: Styleset | undefined | null, source: Styleset): Styleset =>
{
    if (!source)
        return target ? target : {};

    // if target is not defined, create it as an empty object. This object will be returned after
    // properties from the source are copied to it.
    if (!target)
    {
        target = {};
        Object.assign( target, source);
        return target;
    }

    // copy all other properties from the source
	for( let propName in source)
	{
        if (propName === "--")
            mergeCustomProps( target, source[propName]!);
        else
            target[propName] = source[propName];
	}

    return target;
}



/**
 * Merges "--" property from the source styleset to the target styleset.
 */
const mergeCustomProps = (target: Styleset, sourceVars: CustomVar_StyleType[]): void =>
{
    let targetVars = target["--"];
    target["--"] = !targetVars ? sourceVars.slice() : targetVars.concat( sourceVars);
}



