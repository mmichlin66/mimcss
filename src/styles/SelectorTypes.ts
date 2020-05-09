import {StringProxy} from "./UtilTypes";
import {IClassRule, IIDRule, ISelectorRule} from "../rules/RuleTypes";



/**
 * The SelectorProxy function returns a CSS selector string. This type is returned from the
 * [[selector]] function.
 */
export type SelectorProxy = (p?: "selector") => string;



/** Type for a single selector token that can be used as an argument to the [[selector]] function */
export type SelectorItem = string | IClassRule | IIDRule | ISelectorRule | StringProxy | SelectorProxy;



/** Type for a selector */
export type CssSelector = SelectorItem | SelectorItem[];



/** Represents print-related pseudo classes - those that can be specified with the @page CSS rule */
export type PagePseudoClass = ":blank" | ":first" | ":left" | ":right";



/** Represents pseudo classes */
export type PseudoClass = PagePseudoClass |
	":active" | ":any-link" | ":blank" | ":checked" | ":default" | ":defined" | ":disabled" |
	":empty" | ":enabled" | ":first-child" | ":first-of-type" | ":fullscreen" | ":focus" |
	":focus-visible" | ":focus-Within" | ":hover" | ":indeterminate" | ":in-range" | ":invalid" |
	":last-child" | ":last-of-type" | ":link" | ":only-child" | ":only-of-type" | ":optional" |
	":out-of-range" | ":placeholder-shown" | ":read-only" | ":read-write" | ":required" | ":root" |
	":scope" | ":target" | ":valid" | ":visited" | ":dir(rtl)" | ":dir(ltr)";



/** Represents possible pseudo elements */
export type PseudoElement = "::after" | "::backdrop" | "::before" | "::cue" | "::firstLetter" |
	"::firstLine" | "::grammarError" | "::marker" | "::placeholder" | "::selection" | "::spellingError";



/**
 * Type for expression An+B, which is used for parameterized pseudo classes like `nth-child`. It
 * can be a string, a single number or a tuple with one or two numbers. If it is a single number,
 * the 'n' in An+B will not be used - as in `nth-child(2)`. If it is a tuple, the 'n' will be used
 * even if the first tuple's element is 0.
 */
export type NthChildExpression = "odd" | "even" | number | [number, number?] | StringProxy;



/**
 * The IParameterizedPseudoEntities interface maps names of pseudo classes and pseudo elements
 * that require parameters to the type that can be used to specify these parameters
 */
export interface IParameterizedPseudoEntity
{
	":has": string;
	":host": string;
	":host-context": string;
	":is": string;
	":lang": string;
	":not": string;
	":nth-child": NthChildExpression;
	":nth-of-type": NthChildExpression;
	":nth-last-child": NthChildExpression;
	":nth-last-of-type": NthChildExpression;
	":where": string;
	"::part": string;
	"::slotted": string;
}



