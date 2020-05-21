import {CssSelector} from "./SelectorTypes";
import {valueToString} from "./UtilFuncs";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS selector.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given two-number tuple to a string in the form An+B.
 */
function nthTupleToString( val: [number, number?]): string
{
	let v0 = valueToString( val[0]);
	let v1n = val[1];

	// the '!v1n' expression covers null, undefined and 0.
	let v1 = !v1n ? "" : v1n > 0 ? "+" + valueToString( v1n) : "-" + valueToString( -v1n);

	return `${v0}n${v1}`;
}



/**
 * Returns a string representation of a selector.
 */
export function selectorToString( val: CssSelector): string
{
	return valueToString( val, {
		arraySeparator: ""
	})
}



/**
 * Returns a string representation of a parameterized pseudo entity.
 */
export function pseudoEntityToString( entityName: string, val: any): string
{
	if (!entityName)
		return "";

	if (entityName.startsWith( ":nth"))
		return valueToString( val, { fromArray: nthTupleToString });
	else
		return valueToString(val);
}



