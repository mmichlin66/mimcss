/**
 * Represents a complete CSS selector that can be either used as is or can be combined with other selectors.
 */
export interface ISelector extends IAllowCompoundSelector
{
	/** Returns the string representation of the selector */
	readonly selectorString: string;

	readonly and: IEmptySelector;
	readonly child: IEmptySelector;
	readonly descendand: IEmptySelector;
	readonly sibling: IEmptySelector;
	readonly adjacent: IEmptySelector;
}



/**
 * Represents a starting point in the selector building process. This selector cannot be used as
 * is because it doesn't contain any selection content yet.
 */
export interface IEmptySelector extends IAllowCompoundSelector
{
	readonly all: ISelector;
	id( tagName: string): ISelector;
	tag( tagName: string): ISelector;
}



/**
 * Represents a point in selector building, which allows class, attribute, pseudo-class and pseudo element selectors
 */
interface IAllowCompoundSelector
{
	class( className: string): ISelector;
	attr( attrName: string, op?: AttrSelectorOperation, value?: string, caseInsensitive?: boolean): ISelector;

	// pseudo classes
	readonly hover: ISelector;
	nthChild( a: number | "odd" | "even", b?: number): ISelector;

	// pseudo elements
	readonly after: ISelector;
}



/**
 * Represents possible operations for attribute selector
 */
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
class Selector implements IEmptySelector, ISelector
{
	// Internal buffer, where selector string is accumulated
	private s: string = "";

	public get selectorString(): string { return this.s; }

	public get and(): IEmptySelector { this.s += ",\r\n"; return this; }
	public get child(): IEmptySelector { this.s += " > "; return this; }
	public get descendand(): IEmptySelector { this.s += " "; return this; }
	public get sibling(): IEmptySelector { this.s += " ~ "; return this; }
	public get adjacent(): IEmptySelector { this.s += " + "; return this; }

	public get all(): ISelector { this.s += "*"; return this; }
	public id( tagName: string): ISelector { this.s += "*"; return this; }
	public tag( tagName: string): ISelector { this.s += "*"; return this; }
	public class( className: string): ISelector { this.s += "." + className; return this; }
	public attr( attrName: string, op?: AttrSelectorOperation, value?: string, caseInsensitive?: boolean): ISelector
	{
		this.s += "[" + attrName;
		if (op)
			this.s += op + value;
		if (caseInsensitive)
			this.s += " i";
		this.s += "]";
		return this;
	}

	// pseudo classes
	public get hover(): ISelector { this.s += ":hover"; return this; }
	public nthChild( a: number | "odd" | "even", b?: number): ISelector { this.s += `:nth-child(${this.nth( a, b)})`; return this; }

	// pseudo elements
	public get after(): ISelector { this.s += "::after"; return this; }


	// Returns the "nth" notation
	private nth( a: number | "odd" | "even", b?: number): string
	{
		return b == null ? a.toString() : `${a}n${b >= 0 ? `+${b}` : `-${-b}`}`;
	}
}



/**
 * Global function that returns an empty selector from which selector building process starts.
 */
export function cssSelector(): IEmptySelector { return new Selector(); }



