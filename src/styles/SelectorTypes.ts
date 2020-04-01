import {ITagRule, IClassRule, IIDRule} from "../rules/RuleTypes"
import {StringProxy} from "./UtilFuncs";



/** Represents possible pseudo classes */
export type PseudoClass = ":active" | ":any-link" | ":blank" | ":checked" | ":default" | ":defined" |
	":disabled" | ":empty" | ":enabled" | ":first" | ":first-child" | ":first-of-type" | ":fullscreen" |
	":focus" | ":focus-visible" | ":focus-Within" | ":hover" | ":indeterminate" | ":in-range" | ":invalid" |
	":last-child" | ":last-of-type" | ":left" | ":link" | ":only-child" | ":only-of-type" | ":optional" |
	":out-of-range" | ":placeholder-shown" | ":read-only" | ":read-write" | ":required" | ":right" |
	":root" | ":scope" | ":target" | ":valid" | ":visited" | ":dir(rtl)" | ":dir(ltr)";



/** Represents possible pseudo elements */
export type PseudoElement = "::after" | "::backdrop" | "::before" | "::cue" | "::firstLetter" |
	"::firstLine" | "::grammarError" | "::marker" | "::placeholder" | "::selection" | "::spellingError";



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



/** Type for a single selector token */
export type SelectorTokenType = ITagRule | IClassRule | IIDRule |
	keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap |
	SelectorCombinator | SelectorCombinatorType |
	PseudoClass | PseudoElement |
	StringProxy;



/** Type for a selector */
export type SelectorType = string | SelectorTokenType | SelectorTokenType[];



