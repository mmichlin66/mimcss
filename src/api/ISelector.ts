import {IStyleRule, ITagRule, IClassRule, IIDRule} from "./rules";


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
 * Represents a point in selector building, which allows class, attribute, pseudo-class and pseudo element selectors
 */
interface ICompoundSelector
{
	class( cls: string | IClassRule): ISelector;
	id( id: string | IIDRule): ISelector;
	attr( attrName: string, op?: AttrSelectorOperation | AttrSelectorOperationType, value?: string, caseInsensitive?: boolean): ISelector;

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



