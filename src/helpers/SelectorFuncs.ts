import {ISelector, IEmptySelector, SelectorType, SelectorTokenType, AttrSelectorOperation, AttrSelectorOperationType, SelectorCombinator} from "./SelectorTypes"
import {ITagRule, IClassRule, IIDRule} from "../rules/RuleTypes"
import {TagRule} from "../rules/TagRule"
import {ClassRule} from "../rules/ClassRule"
import {IDRule} from "../rules/IDRule"
import {StringProxy} from "../styles/UtilTypes";



/** Represents possible pseudo classes */
export type xPseudoClass =
	// "dir( s: "rtl" | "ltr")" |
	// "has( s: string): ISelector { this.buf.push( `:has(${s})`); return this; }
	// "host( s: string): ISelector { this.buf.push( `:host(${s})`); return this; }
	// "hostContext( s: string): ISelector { this.buf.push( `:host-context(${s})`); return this; }
	":hover" |
	":indeterminate" |
	":in-range" |
	":invalid" |
	// "is( s: string): ISelector { this.buf.push( `:is(${s})`); return this; }
	// "lang( s: string): ISelector { this.buf.push( `:lang(${s})`); return this; }
	// "not( s: string): ISelector { this.buf.push( `:not(${s})`); return this; }
	// "nthChild( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-child(${this.nth( a, b)})`); return this; }
	// "nthLastChild( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-last-child(${this.nth( a, b)})`); return this; }
	// "nthLastOfType( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-last-of-type(${this.nth( a, b)})`); return this; }
	// "nthOfType( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-of-type(${this.nth( a, b)})`); return this; }
	// "where( s: string): ISelector { this.buf.push( `:where(${s})`); return this; }
	"";



/** Represents possible pseudo elements */
export type xPseudoElement =
	// part( s: string): ISelector { this.buf.push( `::part(${s})`); return this; }
	// slotted( s: string): ISelector { this.buf.push( `::slotted(${s})`); return this; }
	"";



/**
 * The selector class encapsulates all the functionality for building a CSS selector.
 */
export class Selector implements IEmptySelector, ISelector
{
	public constructor( initData?: SelectorType)
	{
		if (Array.isArray(initData))
			this.buf = initData.slice();
		else
			this.buf = [initData];
	}



	// Selector combinators
	public get and(): IEmptySelector { this.buf.push( SelectorCombinator.And); return this; }
	public get child(): IEmptySelector { this.buf.push( SelectorCombinator.Child); return this; }
	public get descendand(): IEmptySelector { this.buf.push( SelectorCombinator.Descendand); return this; }
	public get sibling(): IEmptySelector { this.buf.push( SelectorCombinator.Sibling); return this; }
	public get adjacent(): IEmptySelector { this.buf.push( SelectorCombinator.And); return this; }

	public raw( raw?: string): ISelector
	{
		this.buf.push( raw);
		return this;
	}
	public all( ns?: string): ISelector
	{
		this.buf.push( ns == null ? "*" : `${ns}|*`);
		return this;
	}
	public tag( tag: string | ITagRule): ISelector
	{
		this.buf.push( tag);
		return this;
	}
	public class( cls: string | IClassRule): ISelector
	{
		this.buf.push( typeof cls === "string" && !cls.startsWith(".") ? "." + cls : cls);
		return this;
	}
	public id( id: string | IIDRule): ISelector
	{
		this.buf.push( typeof id === "string" && !id.startsWith("#") ? "#" + id : id);
		return this;
	}
	public attr( attrName: string, op?: AttrSelectorOperation | AttrSelectorOperationType,
					value?: string, caseInsensitive?: boolean, caseSensitive?: boolean): ISelector
	{
		this.buf.push( attr( attrName, op, value, caseInsensitive, caseSensitive));
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
	public nthChild( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-child(${nth( a, b)})`); return this; }
	public nthLastChild( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-last-child(${nth( a, b)})`); return this; }
	public nthLastOfType( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-last-of-type(${nth( a, b)})`); return this; }
	public nthOfType( a: number | "odd" | "even", b?: number): ISelector { this.buf.push( `:nth-of-type(${nth( a, b)})`); return this; }
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



	/**
	 * Converts the accumulated selector tokens into full selector string.
	 */
	public toCssString(): string
	{
		return this.buf.map( (token) =>
			{
				if (token instanceof TagRule)
					return token.tagName;
				else if (token instanceof ClassRule)
					return "." + token.name;
				else if (token instanceof IDRule)
					return "#" + token.name;
				else if (token instanceof StringProxy)
					return token.toString();
				else if (token instanceof Selector)
					return token.toCssString();
				else
					return token;
			}
		).join("");
	}



	// Internal buffer, where selector tokens are accumulated.
	private buf: (string | ISelector | SelectorTokenType)[];
}



/** Returns the "nth" notation */
export function nth( a: number | "odd" | "even", b?: number): string
{
	return b == null ? a.toString() : `${a}n${b >= 0 ? `+${b}` : `-${-b}`}`;
}



/** Returns the attribute selector token */
export function attr( attrName: string, op?: AttrSelectorOperation | AttrSelectorOperationType,
				value?: string, caseInsensitive?: boolean, caseSensitive?: boolean): string
{
	let opAndVal = op ? `${op}"${value}"` : "";
	let caseSign = caseInsensitive ? " i" : caseSensitive ? " s" : "";
	return `[${attrName}${opAndVal}${caseSign}]`;
}

