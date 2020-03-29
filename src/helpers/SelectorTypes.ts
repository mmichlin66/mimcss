import {ITagRule, IClassRule, IIDRule} from "../rules/RuleTypes"
import {StringProxy} from "../styles/UtilFuncs";



/**
 * Represents a complete CSS selector that can be either used as is or can be combined with other selectors.
 */
export interface ISelector extends ICompoundSelector
{
	readonly and: IEmptySelector;
	readonly child: IEmptySelector;
	readonly descendand: IEmptySelector;
	readonly sibling: IEmptySelector;
	readonly adjacent: IEmptySelector;

	/** Returns the string representation of the selector */
	toCssString(): string;
}



/**
 * Represents a starting point in the selector building process. This selector cannot be used as
 * is because it doesn't contain any selection content yet.
 */
export interface IEmptySelector extends ICompoundSelector
{
	all( ns?: string): ISelector;
	tag( tag: string | ITagRule): ISelector;
}



/**
 * Represents a point in selector building, which allows class, ID, attribute, pseudo-class and
 * pseudo element selectors.
 */
export interface ICompoundSelector
{
	class( cls: string | IClassRule): ISelector;
	id( id: string | IIDRule): ISelector;
	attr( attrName: string, op?: AttrSelectorOperation | AttrSelectorOperationType,
					value?: string, caseInsensitive?: boolean): ISelector;

	// pseudo classes
	readonly active: ISelector;
	readonly anyLink: ISelector;
	readonly blank: ISelector;
	readonly checked: ISelector;
	readonly default: ISelector;
	readonly defined: ISelector;
	dir( s: "rtl" | "ltr"): ISelector;
	readonly disabled: ISelector;
	readonly empty: ISelector;
	readonly enabled: ISelector;
	readonly first: ISelector;
	readonly firstChild: ISelector;
	readonly firstOfType: ISelector;
	readonly fullscreen: ISelector;
	readonly focus: ISelector;
	readonly focusVisible: ISelector;
	readonly focusWithin: ISelector;
	has( s: string): ISelector;
	host( s: string): ISelector;
	hostContext( s: string): ISelector;
	readonly hover: ISelector;
	readonly indeterminate: ISelector;
	readonly inRange: ISelector;
	readonly invalid: ISelector;
	is( s: string): ISelector;
	lang( s: string): ISelector;
	readonly lastChild: ISelector;
	readonly lastOfType: ISelector;
	readonly left: ISelector;
	readonly link: ISelector;
	not( s: string): ISelector;
	nthChild( a: number | "odd" | "even", b?: number): ISelector;
	nthLastChild( a: number | "odd" | "even", b?: number): ISelector;
	nthLastOfType( a: number | "odd" | "even", b?: number): ISelector;
	nthOfType( a: number | "odd" | "even", b?: number): ISelector;
	readonly onlyChild: ISelector;
	readonly onlyOfType: ISelector;
	readonly optional: ISelector;
	readonly outOfRange: ISelector;
	readonly placeholderShown: ISelector;
	readonly readOnly: ISelector;
	readonly readWrite: ISelector;
	readonly required: ISelector;
	readonly right: ISelector;
	readonly root: ISelector;
	readonly scope: ISelector;
	readonly target: ISelector;
	readonly valid: ISelector;
	readonly visited: ISelector;
	where( s: string): ISelector;

	// pseudo elements
	readonly after: ISelector;
	readonly backdrop: ISelector;
	readonly before: ISelector;
	readonly cue: ISelector;
	readonly firstLetter: ISelector;
	readonly firstLine: ISelector;
	readonly grammarError: ISelector;
	readonly marker: ISelector;
	part( s: string): ISelector;
	readonly placeholder: ISelector;
	readonly selection: ISelector;
	slotted( s: string): ISelector;
	readonly spellingError: ISelector;
}



/** Represents possible selector combinators */
export type SelectorCombinatorType = "," | " > " | " " | " ~ " | " + ";

/** Represents possible selector combinators */
export const enum SelectorCombinator
{
	And = ", ",
	Child = " > ",
	Descendand = " ",
	Sibling = " ~ ",
	Adjacent = " + ",
}



/** Represents possible operations for attribute selector */
export type AttrSelectorOperationType = "=" | "~=" | "|=" | "^=" | "$=" | "*=";

/** Represents possible operations for attribute selector */
export const enum AttrSelectorOperation
{
	Match = "=",
	Word = "~=",
	SubCode = "|=",
	StartsWith = "^=",
	EndsWith = "$=",
	Contains = "*=",
}



/** Represents possible pseudo classes */
export type PseudoClass = ":active" | ":any-link" | ":blank" | ":checked" | ":default" | ":defined" |
	":disabled" | ":empty" | ":enabled" | ":first" | ":first-child" | ":first-of-type" | ":fullscreen" |
	":focus" | ":focus-visible" | ":focus-Within" | ":hover" | ":indeterminate" | ":in-range" | ":invalid" |
	":last-child" | ":last-of-type" | ":left" | ":link" | ":only-child" | ":only-of-type" | ":optional" |
	":out-of-range" | ":placeholder-shown" | ":read-only" | ":read-write" | ":required" | ":right" |
	":root" | ":scope" | ":target" | ":valid" | ":visited";



/** Represents possible pseudo elements */
export type PseudoElement = "::after" | "::backdrop" | "::before" | "::cue" | "::firstLetter" |
	"::firstLine" | "::grammarError" | "::marker" | "::placeholder" | "::selection" | "::spellingError";



/** Type for a single selector token */
export type SelectorTokenType = ITagRule | IClassRule | IIDRule |
	SelectorCombinator | SelectorCombinatorType |
	PseudoClass | PseudoElement |
	StringProxy;



/** Type for a selector */
export type SelectorType = string | ISelector | SelectorTokenType | SelectorTokenType[];



import {Selector, nth, attr} from "./SelectorFuncs"

/**
 * Helper class for creating elements of a selector (selector tokens).
 */
export abstract class SelectorHelper
{
	public static raw( raw?: string) { return new StringProxy( raw); }
	public static all( ns?: string) { return ns == null ? "*" : `${ns}|*`; }
	public static attr( attrName: string, op?: AttrSelectorOperation | AttrSelectorOperationType,
					value?: string, caseInsensitive?: boolean, caseSensitive?: boolean)
		{ return new StringProxy( attr( attrName, op, value, caseInsensitive, caseSensitive)); }
	public static tag( s: string) { return new StringProxy( s); }
	public static rtl() { return new StringProxy( ":dir(rtl)"); }
	public static ltr() { return new StringProxy( ":dir(ltr)"); }
	public static has( s: string) { return new StringProxy( `:has(${s})`); }
	public static host( s: string) { return new StringProxy( `:host(${s})`); }
	public static hostContext( s: string) { return new StringProxy( `:host-context(${s})`); }
	public static is( s: string) { return new StringProxy( `:is(${s})`); }
	public static lang( s: string) { return new StringProxy( `:lang(${s})`); }
	public static not( s: string) { return new StringProxy( `:not(${s})`); }
	public static nthChild( a: number | "odd" | "even", b?: number) { return new StringProxy( `:nth-child(${nth( a, b)})`); }
	public static nthLastChild( a: number | "odd" | "even", b?: number) { return new StringProxy( `:nth-last-child(${nth( a, b)})`); }
	public static nthLastOfType( a: number | "odd" | "even", b?: number) { return new StringProxy( `:nth-last-of-type(${nth( a, b)})`); }
	public static nthOfType( a: number | "odd" | "even", b?: number) { return new StringProxy( `:nth-of-type(${nth( a, b)})`); }
	public static where( s: string) { return new StringProxy( `:where(${s})`); }
	public static part( s: string) { return new StringProxy( `::part(${s})`); }
	public static slotted( s: string) { return new StringProxy( `::slotted(${s})`); }
}



/**
 * Creates an empty selector from which selector building process starts.
 */
export function $selector(): IEmptySelector { return new Selector(); }



