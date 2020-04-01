import {SelectorType, SelectorTokenType, AttrSelectorOperation, AttrSelectorOperationType} from "./SelectorTypes"
import {TagRule} from "../rules/TagRule"
import {ClassRule} from "../rules/ClassRule"
import {IDRule} from "../rules/IDRule"
import {StringProxyBase, StringProxy} from "./UtilFuncs";



/**
 * Converts the selector object into full selector string.
 */
export function selectorToCssString( selector: SelectorType): string
{
	if (!selector)
		return "";
	else if (typeof selector === "string")
		return selector;
	else if (selector instanceof TagRule)
		return selector.tagName;
	else if (selector instanceof ClassRule)
		return "." + selector.name;
	else if (selector instanceof IDRule)
		return "#" + selector.name;
	else if (Array.isArray( selector))
	{
		return selector.map( (token: SelectorTokenType) =>
			{
				if (token instanceof TagRule)
					return token.tagName;
				else if (token instanceof ClassRule)
					return "." + token.name;
				else if (token instanceof IDRule)
					return "#" + token.name;
				else if (token instanceof StringProxyBase)
					return token.toString();
				else
					return token;
			}
		).join("");
	}
	else
		return selector.toString();
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



/**
 * Helper class for creating elements of a selector (selector tokens).
 */
export abstract class sh
{
	public static raw( raw?: string) { return new StringProxy( raw); }
	public static all( ns?: string) { return ns == null ? "*" : `${ns}|*`; }
	public static attr( attrName: string, op?: AttrSelectorOperation | AttrSelectorOperationType,
					value?: string, caseInsensitive?: boolean, caseSensitive?: boolean)
		{ return new StringProxy( attr( attrName, op, value, caseInsensitive, caseSensitive)); }
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



