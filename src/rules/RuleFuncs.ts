/**
 * This module defines types of object that represent CSS rules.
 */


import {
	ExtendedStyleset, IAbstractRule, INamedRule, ITagRule, IClassRule, IIDRule, ISelectorRule,
	IAnimationRule, Keyframe, ICustomVar, ISupportsRule, IMediaRule, IImportRule, IFontFaceRule,
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
import {CustomVar} from "./CustomVar"
import {SupportsRule} from "./SupportsRule"
import {MediaRule} from "./MediaRule"
import {ImportRule} from "./ImportRule"
import {FontFaceRule} from "./FontFaceRule"



/** Creates new AbstractRule object  */
export function $abstract( style: ExtendedStyleset): IAbstractRule
	{ return new AbstractRule( style); }

/** Creates new TagRule object  */
export function $tag( tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap, style: ExtendedStyleset): ITagRule
	{ return new TagRule( tag, style); }

/** Returns new ClassRule object  */
export function $class( style: ExtendedStyleset, nameOverride?: string | INamedRule): IClassRule
	{ return new ClassRule( style, nameOverride); }

/** Returns new IDRule object  */
export function $id( style: ExtendedStyleset, nameOverride?: string | INamedRule): IIDRule
	{ return new IDRule( style, nameOverride); }

/** Creates new SelectorRule object  */
export function $style( selector: SelectorType, style: ExtendedStyleset): ISelectorRule
	{ return new SelectorRule( selector, style); }

/** Returns new AnimationRule object  */
export function $animation( keyframes: Keyframe[], nameOverride?: string | INamedRule): IAnimationRule
	{ return new AnimationRule( keyframes, nameOverride); }

/** Returns new CustomVar object that defines a custom CSS property */
export function $custom<K extends keyof IStyleset>( template: K, propVal: IStyleset[K],
				nameOverride?: string | INamedRule): ICustomVar<IStyleset[K]>
	{ return new CustomVar( template, propVal, nameOverride); }

/** Returns new SupportsRule object  */
export function $supports<T>( query: SupportsQuery, definition: T): ISupportsRule<T>
	{ return new SupportsRule( query, definition); }

/** Returns new MediaRule object  */
export function $media<T>( query: string | MediaQuery, definition: T): IMediaRule<T>
	{ return new MediaRule( query, definition); }

/** Returns new ImportRule object  */
export function $import( url: string, mediaQuery?: string | MediaQuery, supportsQuery?: string | SupportsQuery): IImportRule
	{ return new ImportRule( url, mediaQuery, supportsQuery); }

/** Returns new FonFaceRule object  */
export function $fontface( fontface: Fontface): IFontFaceRule
	{ return new FontFaceRule( fontface); }



