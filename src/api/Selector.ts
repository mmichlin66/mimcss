import {IStyleRule, ITagRule, IClassRule, IIDRule} from "./rules"
import {TagRule} from "../rules/TagRule"
import {ClassRule} from "../rules/ClassRule"
import {IDRule} from "../rules/IDRule"



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

	/** Returns a list of all rules participating in the selector. */
	getRules(): IStyleRule[];

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



/**
 * Represents possible operations for attribute selector
 */
export type AttrSelectorOperationType = "=" | "~=" | "|=" | "^=" | "$=" | "*=";
export enum AttrSelectorOperation
{
	Match = "=",
	Word = "~=",
	SubCode = "|=",
	StartsWith = "^=",
	EndsWith = "$=",
	Contains = "*=",
}



/**
 * The selector class encapsulates all the functionality for building a CSS selector.
 */
export class Selector implements IEmptySelector, ISelector
{
	public constructor( raw?: string)
	{
		this.buf = [];

		if (raw)
			this.buf.push( raw);
	}



	// Selector combinators
	public get and(): IEmptySelector { this.buf.push( ", "); return this; }
	public get child(): IEmptySelector { this.buf.push( " > "); return this; }
	public get descendand(): IEmptySelector { this.buf.push( " "); return this; }
	public get sibling(): IEmptySelector { this.buf.push( " ~ "); return this; }
	public get adjacent(): IEmptySelector { this.buf.push( " + "); return this; }

	public all( ns?: string): ISelector { this.buf.push( ns == null ? "*" : `${ns}|*`); return this; }
	public tag( tag: string | ITagRule): ISelector
	{
		this.buf.push( tag);
		return this;
	}
	public class( cls: string | IClassRule): ISelector
	{
		this.buf.push( typeof cls === "string" ? "." + cls : cls);
		return this;
	}
	public id( id: string | IIDRule): ISelector
	{
		this.buf.push( typeof id === "string" ? "#" + id : id);
		return this;
	}
	public attr( attrName: string, op?: AttrSelectorOperation | AttrSelectorOperationType,
					value?: string, caseInsensitive?: boolean): ISelector
	{
		let opAndVal = op ? `${op}"${value}"` : "";
		this.buf.push( `[${attrName}${opAndVal}${caseInsensitive ? " i" : ""}]`);
		return this;
	}

	// pseudo classes
	public get active(): ISelector { this.buf.push( ":active"); return this; }
	public get anyLink(): ISelector { this.buf.push( ":any-link"); return this; }
	public get blank(): ISelector { this.buf.push( ":blank"); return this; }
	public get checked(): ISelector { this.buf.push( ":checked"); return this; }
	public get default(): ISelector { this.buf.push( ":default"); return this; }
	public get defined(): ISelector { this.buf.push( ":defined"); return this; }
	public dir( s: "rtl" | "ltr"): ISelector { this.buf.push( ":dir(${s})"); return this; }
	public get disabled(): ISelector { this.buf.push( ":disabled"); return this; }
	public get empty(): ISelector { this.buf.push( ":empty"); return this; }
	public get enabled(): ISelector { this.buf.push( ":enabled"); return this; }
	public get first(): ISelector { this.buf.push( ":first"); return this; }
	public get firstChild(): ISelector { this.buf.push( ":first-child"); return this; }
	public get firstOfType(): ISelector { this.buf.push( ":first-of-type"); return this; }
	public get fullscreen(): ISelector { this.buf.push( ":fullscreen"); return this; }
	public get focus(): ISelector { this.buf.push( ":focus"); return this; }
	public get focusVisible(): ISelector { this.buf.push( ":focus-visible"); return this; }
	public get focusWithin(): ISelector { this.buf.push( ":focus-within"); return this; }
	public has( s: string): ISelector { this.buf.push( `:has(${s})`); return this; }
	public host( s: string): ISelector { this.buf.push( `:host(${s})`); return this; }
	public hostContext( s: string): ISelector { this.buf.push( `:host-context(${s})`); return this; }
	public get hover(): ISelector { this.buf.push( ":hover"); return this; }
	public get indeterminate(): ISelector { this.buf.push( ":indeterminate"); return this; }
	public get inRange(): ISelector { this.buf.push( ":in-range"); return this; }
	public get invalid(): ISelector { this.buf.push( ":invalid"); return this; }
	public is( s: string): ISelector { this.buf.push( `:is(${s})`); return this; }
	public lang( s: string): ISelector { this.buf.push( `:lang(${s})`); return this; }
	public get lastChild(): ISelector { this.buf.push( ":last-child"); return this; }
	public get lastOfType(): ISelector { this.buf.push( ":last-of-type"); return this; }
	public get left(): ISelector { this.buf.push( ":left"); return this; }
	public get link(): ISelector { this.buf.push( ":link"); return this; }
	public not( s: string): ISelector { this.buf.push( `:not(${s})`); return this; }
	public nthChild( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-child(${this.nth( a, b)})`); return this; }
	public nthLastChild( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-last-child(${this.nth( a, b)})`); return this; }
	public nthLastOfType( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-last-of-type(${this.nth( a, b)})`); return this; }
	public nthOfType( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-of-type(${this.nth( a, b)})`); return this; }
	public get onlyChild(): ISelector { this.buf.push( ":only-child"); return this; }
	public get onlyOfType(): ISelector { this.buf.push( ":only-of-type"); return this; }
	public get optional(): ISelector { this.buf.push( ":optional"); return this; }
	public get outOfRange(): ISelector { this.buf.push( ":out-of-range"); return this; }
	public get placeholderShown(): ISelector { this.buf.push( ":placeholder-shown"); return this; }
	public get readOnly(): ISelector { this.buf.push( ":read-only"); return this; }
	public get readWrite(): ISelector { this.buf.push( ":read-write"); return this; }
	public get required(): ISelector { this.buf.push( ":required"); return this; }
	public get right(): ISelector { this.buf.push( ":right"); return this; }
	public get root(): ISelector { this.buf.push( ":root"); return this; }
	public get scope(): ISelector { this.buf.push( ":scope"); return this; }
	public get target(): ISelector { this.buf.push( ":target"); return this; }
	public get valid(): ISelector { this.buf.push( ":valid"); return this; }
	public get visited(): ISelector { this.buf.push( ":visited"); return this; }
	public where( s: string): ISelector { this.buf.push( `:where(${s})`); return this; }

	// pseudo elements
	public get after(): ISelector { this.buf.push( "::after"); return this; }
	public get backdrop(): ISelector { this.buf.push( "::backdrop"); return this; }
	public get before(): ISelector { this.buf.push( "::before"); return this; }
	public get cue(): ISelector { this.buf.push( "::cue"); return this; }
	public get firstLetter(): ISelector { this.buf.push( "::first-letter"); return this; }
	public get firstLine(): ISelector { this.buf.push( "::first-line"); return this; }
	public get grammarError(): ISelector { this.buf.push( "::grammar-error"); return this; }
	public get marker(): ISelector { this.buf.push( "::marker"); return this; }
	public part( s: string): ISelector { this.buf.push( `::part(${s})`); return this; }
	public get placeholder(): ISelector { this.buf.push( "::placeholder"); return this; }
	public get selection(): ISelector { this.buf.push( "::selection"); return this; }
	public slotted( s: string): ISelector { this.buf.push( `::slotted(${s})`); return this; }
	public get spellingError(): ISelector { this.buf.push( "::spelling-error"); return this; }



	// Returns the "nth" notation
	private nth( a: number | "odd" | "even", b?: number): string
	{
		return b == null ? a.toString() : `${a}n${b >= 0 ? `+${b}` : `-${-b}`}`;
	}



	/**
	 * Returns a list of all rules participating in the selector.
	 */
	public getRules(): IStyleRule[]
	{
		return this.buf.filter( (item) => typeof item !== "string") as IStyleRule[];
	}



	/**
	 * Converts the accumulated selector tokens into full selector string.
	 */
	public toCssString(): string
	{
		return this.buf.map( (token) =>
			token instanceof TagRule
				? token.tagName
				: token instanceof ClassRule
					? "." + token.className
					: token instanceof IDRule
						? "#" + token.idName
						: token
		).join("");
	}



	// Internal buffer, where selector tokens are accumulated.
	private buf: (string | ITagRule | IClassRule | IIDRule)[];
}



/**
 * Creates an empty selector from which selector building process starts.
 */
export function $selector(): IEmptySelector { return new Selector(); }



