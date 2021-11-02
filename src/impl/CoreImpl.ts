import {CssSelector, IAttrSelectorFunc} from "../api/CoreTypes";
import {fdo, v2s} from "./Utils";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS selector.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a string representation of a selector.
 */
export const selector2s = (val: CssSelector): string => v2s( val, { sep: "", recursive: true });



// Converting attribute selector definition to string
fdo["attr-sel"] = (v: IAttrSelectorFunc) => `[${v.ns ? v.ns + "|" : ""}${v.name}` +
    (v.val == null ? "]" : `${v.op ?? "="}"${v.val}"${v.cf ? " " + v.cf : ""}]`)



// Converting "nth" pseudo classes to string
fdo[":nth-child"] = fdo[":nth-last-child"] = fdo[":nth-of-type"] = fdo[":nth-last-of-type"] = [
    ["p", {arr: [
        v => v + "n",
        v => !v ? "" : v > 0 ? "+" + v : "-" + -v
    ]}]
]



// Converting pseudo entities that accept CssSelector to string
fdo[":is"] = fdo[":where"] = fdo[":not"] = fdo[":has"] = fdo["::slotted"] = [
    ["p", selector2s]
    // ["p", {sep: ",", recursive: true}]
]



