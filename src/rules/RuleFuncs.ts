/**
 * This module defines types of object that represent CSS rules.
 */


import {
	ExtendedStyleset, IAbstractRule, ITagRule, IClassRule, IIDRule, ISelectorRule,
	IAnimationRule, AnimationFrame, IVarRule, ISupportsRule, IMediaRule, IImportRule, IFontFaceRule,
	INamespaceRule, IPageRule, SelectorTokenType, RuleType
} from "./RuleTypes";
import {IStringProxy} from "../styles/UtilTypes";
import {IStyleset, SupportsQuery, SelectorType, PagePseudoClass, Styleset} from "../styles/StyleTypes";
import {MediaQuery} from "../styles/MediaTypes"
import {Fontface} from "../styles/FontFaceTypes";


import {Rule} from "../rules/Rule"
import {AbstractRule} from "./AbstractRule"
import {TagRule} from "./TagRule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
import {SelectorRule} from "./SelectorRule"
import {AnimationRule} from "./AnimationRule"
import {VarRule} from "./VarRule"
import {SupportsRule} from "./SupportsRule"
import {MediaRule} from "./MediaRule"
import {ImportRule} from "./ImportRule"
import {FontFaceRule} from "./FontFaceRule"
import {NamespaceRule} from "./NamespaceRule";
import {PageRule} from "./PageRule";



/**
 * Creates new abstract rule, which defines a styleset that can be extended by other style
 * rules. Abstract rules don't have selectors and are not inserted into DOM.
 */
export function $abstract( style: ExtendedStyleset): IAbstractRule
	{ return new AbstractRule( style); }

/**
 * Creates new tag rule. The tag parameter can be any of the HTML or SVG tags.
 */
export function $tag( tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap, style: ExtendedStyleset): ITagRule
	{ return new TagRule( tag, style); }

/**
 * Creates new class rule. The class name will be created when the rule is processed as part of
 * the style definition class. The name can be also overridden by providing either an explicit
 * name or another class rule. The function can be called without parameters just to "declare"
 * the class. Such class can be later used either in conditional grouping rules or in derived
 * style definition classes.
 */
export function $class( style?: ExtendedStyleset, nameOverride?: string | IClassRule): IClassRule
	{ return new ClassRule( style, nameOverride); }

/**
 * Creates new ID rule. The ID name will be created when the rule is processed as part of
 * the style definition class. The name can be also overridden by providing either an explicit
 * name or another ID rule. The function can be called without parameters just to "declare"
 * the ID. Such ID can be later used either in conditional grouping rules or in derived
 * style definition classes.
 */
export function $id( style?: ExtendedStyleset, nameOverride?: string | IIDRule): IIDRule
	{ return new IDRule( style, nameOverride); }

/**
 * Creates new selector rule. Selector can be specified as a string or via the $selector function.
 */
export function $style( selector: SelectorType, style: ExtendedStyleset): ISelectorRule
	{ return new SelectorRule( selector, style); }

/**
 * Creates new animation rule. The animation name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another animation rule. The function can be called without parameters just to
 * "declare" the animation. Such animation can be later used either in conditional grouping rules
 * or in derived style definition classes.
 */
export function $animation( frames?: AnimationFrame[], nameOverride?: string | IAnimationRule): IAnimationRule
	{ return new AnimationRule( frames, nameOverride); }

/**
 * Creates new custom variable object that defines a custom CSS property. The variable name will
 * be created when the rule is processed as part of the style definition class. The name can be
 * also overridden by providing either an explicit name or another custom variable rule. The
 * function can be called without parameters just to "declare" the variable. Such variable can be
 * later used either in conditional grouping rules or in derived style definition classes.
 */
export function $var<K extends keyof IStyleset>( template: K, propVal?: IStyleset[K],
				nameOverride?: string | IVarRule<K>): IVarRule<K>
	{ return new VarRule( template, propVal, nameOverride); }

/**
 * Creates new supports rule.
 */
export function $supports<T>( query: SupportsQuery, definition: T): ISupportsRule<T>
	{ return new SupportsRule( query, definition); }

/**
 * Creates new media rule.
 */
export function $media<T>( query: string | MediaQuery, definition: T): IMediaRule<T>
	{ return new MediaRule( query, definition); }

/**
 * Creates new import rule.
 */
export function $import( url: string, mediaQuery?: string | MediaQuery, supportsQuery?: string | SupportsQuery): IImportRule
	{ return new ImportRule( url, mediaQuery, supportsQuery); }

/**
 * Creates new fon-face rule.
 */
export function $fontface( fontface: Fontface): IFontFaceRule
	{ return new FontFaceRule( fontface); }

/**
 * Creates new namespace rule.
 */
export function $namespace( namespace: string, prefix?: string): INamespaceRule
	{ return new NamespaceRule( namespace, prefix); }

/**
 * Creates new page rule.
 */
export function $page( style?: Styleset, pseudoClass?: PagePseudoClass): IPageRule
	{ return new PageRule( style, pseudoClass); }



/**
 * The SelectorProxy class implements the IStringProxy interface by encapsulating a selector
 * template string with optional placeholders (e.g. {0}), which will be replaced by names
 * of tags, classes and IDs and other possible types.
 */
class SelectorProxy implements IStringProxy
{
    constructor( template: string, params: SelectorTokenType[])
    {
        this.template = template;
        this.params = params;
    }

    public valueToString(): string
    {
		let tokens: string[] = this.template.split( /{(\d+)}/g);
		let tokenIsNumber = false;
		let arr: string[] = [];
		for (let token of tokens)
		{
			if (tokenIsNumber)
			{
				let index = parseInt( token, 10);
				if (index >= this.params.length)
					continue;

				let item = this.params[index];
				if (item == null)
					continue;
				else if (typeof item === "string")
					arr.push( item);
				else if (item instanceof Rule)
				{
					if (item.ruleType === RuleType.TAG)
						arr.push( (item as ITagRule).tag);
					else if (item.ruleType === RuleType.CLASS)
						arr.push( (item as IClassRule).cssName);
					else if (item.ruleType === RuleType.ID)
						arr.push( (item as IIDRule).cssName);
					else if (item.ruleType === RuleType.SELECTOR)
						arr.push( (item as ISelectorRule).selectorText);
				}
				else 
					arr.push( item.toString());
			}
			else if (token)
				arr.push( token);
	
			tokenIsNumber = !tokenIsNumber;
		}
	
		return arr.join( "");
    }

    // Name of the mathematical function.
    private template: string;

    // Array of Number_StyleType parameters to the mathematical function.
    private params: SelectorTokenType[];
}



/**
 * Returns a string representation of a selector using the given template string with optional
 * placeholders (e.g. {0}), which will be replaced by names of tags, classes and IDs and other
 * possible types.
 */
export function $selector( template: string, ...args: SelectorTokenType[]): SelectorType
{
	return !template ? "" : args.length === 0 ? template : new SelectorProxy( template, args);
}



