/**
 * This module defines types of object that represent CSS rules.
 */


import {
	ExtendedStyleset, IAbstractRule, INamedEntity, ITagRule, IClassRule, IIDRule, ISelectorRule,
	IAnimationRule, AnimationFrame, IVarRule, ISupportsRule, IMediaRule, IImportRule, IFontFaceRule,
} from "./RuleTypes";
import {IStyleset, SupportsQuery} from "../styles/StyleTypes";
import {MediaQuery} from "../styles/MediaTypes"
import {Fontface} from "../styles/FontFaceTypes";


import {AbstractRule} from "./AbstractRule"
import {TagRule} from "./TagRule"
import {ClassRule} from "./ClassRule"
import {IDRule} from "./IDRule"
import {SelectorType} from "../styles/SelectorTypes"
import {SelectorRule} from "./SelectorRule"
import {AnimationRule} from "./AnimationRule"
import {VarRule} from "./VarRule"
import {SupportsRule} from "./SupportsRule"
import {MediaRule} from "./MediaRule"
import {ImportRule} from "./ImportRule"
import {FontFaceRule} from "./FontFaceRule"



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
				nameOverride?: string | IVarRule<IStyleset[K]>): IVarRule<IStyleset[K]>
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



