import {StringProxy} from "./UtilTypes"
import * as RuleTypes from "../rules/RuleTypes"



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Selector types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Represents pseudo classes */
export type PseudoClass = ":active" | ":any-link" | ":blank" | ":checked" | ":default" | ":defined" |
	":disabled" | ":empty" | ":enabled" | ":first-child" | ":first-of-type" | ":fullscreen" |
	":focus" | ":focus-visible" | ":focus-Within" | ":hover" | ":indeterminate" | ":in-range" | ":invalid" |
	":last-child" | ":last-of-type" | ":link" | ":only-child" | ":only-of-type" | ":optional" |
	":out-of-range" | ":placeholder-shown" | ":read-only" | ":read-write" | ":required" | ":root" |
	":scope" | ":target" | ":valid" | ":visited" | ":dir(rtl)" | ":dir(ltr)";



/** Represents print-related pseudo classes - those that can be specified with the @page CSS rule */
export type PagePseudoClass = ":blank" | ":first" | ":left" | ":right";



/** Represents possible pseudo elements */
export type PseudoElement = "::after" | "::backdrop" | "::before" | "::cue" | "::firstLetter" |
	"::firstLine" | "::grammarError" | "::marker" | "::placeholder" | "::selection" | "::spellingError";



/** Type for a single selector token that can be used as an argument to the $selector function */
export type SelectorTokenType = RuleTypes.ITagRule | RuleTypes.IClassRule | RuleTypes.IIDRule |
    RuleTypes.ISelectorRule | number | string | StringProxy;



/**
 * The SelectorProxy function returns a CSS selector string. This type is returned from the
 * `$selector` function.
 */
export type SelectorProxy = (p?: "selector") => string;



/** Type for a selector */
export type CssSelector = string | SelectorProxy;



