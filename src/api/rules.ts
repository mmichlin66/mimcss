/**
 * This module defines types of object that represent CSS rules.
 */


import * as RuleTypes from "../rules/RuleTypes";
import * as StylesheetFuncs from "../rules/Stylesheet"
import {IStyleset, SupportsQuery, Styleset, ICssStyleset} from "../styles/StyleTypes";
import {CssSelector, PagePseudoClass, SelectorTokenType} from "../styles/SelectorTypes";
import {SelectorProxy} from "../styles/SelectorFuncs";
import {MediaQuery} from "../styles/MediaTypes"
import {Fontface} from "../styles/FontFaceTypes";
import {AbstractRule} from "../rules/AbstractRule"
import {TagRule} from "../rules/TagRule"
import {ClassRule} from "../rules/ClassRule"
import {IDRule} from "../rules/IDRule"
import {SelectorRule} from "../rules/SelectorRule"
import {AnimationRule} from "../rules/AnimationRule"
import {VarRule} from "../rules/VarRule"
import {ImportRule} from "../rules/ImportRule"
import {FontFaceRule} from "../rules/FontFaceRule"
import {NamespaceRule} from "../rules/NamespaceRule";
import {PageRule} from "../rules/PageRule";
import {SupportsRule} from "../rules/SupportsRule"
import {MediaRule} from "../rules/MediaRule"



/**
 * Creates new abstract rule, which defines a styleset that can be extended by other style
 * rules. Abstract rules don't have selectors and are not inserted into DOM.
 */
export function $abstract( style: RuleTypes.ExtendedStyleset): RuleTypes.IAbstractRule
	{ return new AbstractRule( style); }

/**
 * Creates new tag rule. The tag parameter can be any of the HTML or SVG tags.
 */
export function $tag( tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap, style: RuleTypes.ExtendedStyleset): RuleTypes.ITagRule
	{ return new TagRule( tag, style); }

/**
 * Creates new class rule. The class name will be created when the rule is processed as part of
 * the style definition class. The name can be also overridden by providing either an explicit
 * name or another class rule. The function can be called without parameters just to "declare"
 * the class. Such class can be later used either in conditional grouping rules or in derived
 * style definition classes.
 */
export function $class( style?: RuleTypes.ExtendedStyleset, nameOverride?: string | RuleTypes.IClassRule): RuleTypes.IClassRule
	{ return new ClassRule( style, nameOverride); }

/**
 * Creates new ID rule. The ID name will be created when the rule is processed as part of
 * the style definition class. The name can be also overridden by providing either an explicit
 * name or another ID rule. The function can be called without parameters just to "declare"
 * the ID. Such ID can be later used either in conditional grouping rules or in derived
 * style definition classes.
 */
export function $id( style?: RuleTypes.ExtendedStyleset, nameOverride?: string | RuleTypes.IIDRule): RuleTypes.IIDRule
	{ return new IDRule( style, nameOverride); }

/**
 * Creates new selector rule. Selector can be specified as a string or via the $selector function.
 */
export function $style( selector: CssSelector, style: RuleTypes.ExtendedStyleset): RuleTypes.ISelectorRule
	{ return new SelectorRule( selector, style); }

/**
 * Creates new animation rule. The animation name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another animation rule. The function can be called without parameters just to
 * "declare" the animation. Such animation can be later used either in conditional grouping rules
 * or in derived style definition classes.
 */
export function $keyframes( frames?: RuleTypes.AnimationFrame[], nameOverride?: string | RuleTypes.IAnimationRule): RuleTypes.IAnimationRule
	{ return new AnimationRule( frames, nameOverride); }

/**
 * Creates new custom variable object that defines a custom CSS property. The variable name will
 * be created when the rule is processed as part of the style definition class. The name can be
 * also overridden by providing either an explicit name or another custom variable rule. The
 * function can be called without specifying the value just to "declare" the variable. Such
 * variable can be later used either in conditional grouping rules or in derived style definition
 * classes.
 */
export function $var<K extends keyof ICssStyleset>( template: K, propVal?: IStyleset[K],
				nameOverride?: string | RuleTypes.IVarRule<K>): RuleTypes.IVarRule<K>
	{ return new VarRule( template, propVal, nameOverride); }

/**
 * Creates new import rule.
 */
export function $import( url: string, mediaQuery?: string | MediaQuery, supportsQuery?: string | SupportsQuery): RuleTypes.IImportRule
	{ return new ImportRule( url, mediaQuery, supportsQuery); }

/**
 * Creates new fon-face rule.
 */
export function $fontface( fontface: Fontface): RuleTypes.IFontFaceRule
	{ return new FontFaceRule( fontface); }

/**
 * Creates new namespace rule.
 */
export function $namespace( namespace: string, prefix?: string): RuleTypes.INamespaceRule
	{ return new NamespaceRule( namespace, prefix); }

/**
 * Creates new page rule.
 */
export function $page( style?: Styleset, pseudoClass?: PagePseudoClass): RuleTypes.IPageRule
	{ return new PageRule( style, pseudoClass); }

/**
 * Creates new supports rule.
 */
export function $supports<T extends RuleTypes.NestedGroup<O>, O extends {}>( query: SupportsQuery,
				definitionClass: RuleTypes.INestedGroupClass<T,O>): RuleTypes.ISupportsRule<T>
	{ return new SupportsRule( query, definitionClass); }

/**
 * Creates new media rule.
 */
export function $media<T extends RuleTypes.NestedGroup<O>, O extends {}>( query: string | MediaQuery,
	definitionClass: RuleTypes.INestedGroupClass<T,O>): RuleTypes.IMediaRule<T>
	{ return new MediaRule( query, definitionClass); }



/**
 * Returns a string representation of a selector using the given template string with optional
 * placeholders (e.g. {0}), which will be replaced by names of tags, classes and IDs and other
 * possible types.
 */
export function $selector( template: string, ...args: SelectorTokenType[]): CssSelector
{
	return !template ? "" : args.length === 0 ? template : new SelectorProxy( template, args);
}



/**
 * Processes the given stylesheet definition and returns the Stylesheet object that contains
 * names of IDs, classes and keyframes and allows style manipulations. For a given stylesheet
 * definition class there is a single stylesheet object, no matter how many times this function
 * is invoked.
 */
export function $use<T extends {}>( stylesheetDefinitionClass: RuleTypes.IStylesheetClass<T>): RuleTypes.IStylesheet<T>
{
	return StylesheetFuncs.use( stylesheetDefinitionClass);
}



/**
 * Activates the given stylesheet and inserts all its rules into DOM. If the input object is not
 * a stylesheet but a style definition class, obtain stylesheet by calling the $use function.
 * Note that each stylesheet object maintains a reference counter of how many times it was
 * activated and deactivated. The rules are inserted to DOM only when this reference counter goes
 * up to 1.
 */
export function $activate<T extends {}>( stylesheetOrDefinition: RuleTypes.IStylesheet<T> | RuleTypes.IStylesheetClass<T>): RuleTypes.IStylesheet<T>
{
	return StylesheetFuncs.activate( stylesheetOrDefinition);
}



/**
 * Deactivates the given stylesheet by removing its rules from DOM. Note that each stylesheet
 * object maintains a reference counter of how many times it was activated and deactivated. The
 * rules are removed from DOM only when this reference counter goes down to 0.
 */
export function $deactivate( stylesheet: RuleTypes.IStylesheet): void
{
	return StylesheetFuncs.deactivate( stylesheet);
}



/**
 * Sets the flag indicating whether to use optimized (short) rule names. If yes, the names
 * will be created by appending a unique number to the given prefix. If the prefix is not
 * specified, the standard prefix "n" will be used.
 * @param enable
 * @param prefix
 */
export function $enableOptimizedStyleNames( enable: boolean, prefix?: string): void
{
	return StylesheetFuncs.enableOptimizedStyleNames( enable, prefix);
}



