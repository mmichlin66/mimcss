import {SelectorItem, CssSelector} from "./SelectorTypes";
import {ClassRule, IDRule, SelectorRule} from "../rules/StyleRules"
import {valueToString} from "./UtilFuncs";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS selector.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a string representation of a selector using the given template string with optional
 * placeholders (e.g. {0}), which will be replaced by names of tags, classes and IDs and other
 * possible types.
 */
function selectorItemToString( val: SelectorItem): string
{
	return valueToString( val, {
		fromNull: v => "",
		fromObject: v => {
			if (v instanceof ClassRule)
				return v.cssName;
			else if (v instanceof IDRule)
				return v.cssName;
			else if (v instanceof SelectorRule)
				return v.selectorText;
			else
				return valueToString(v);
		}
	})
}



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
		fromAny: selectorItemToString,
		arraySeparator: ""
	})
}



/**
 * Returns a string representation of a selector using the given template string with optional
 * placeholders (e.g. {0}), which will be replaced by names of tags, classes and IDs and other
 * possible types.
 */
export function formatSelector( template: string, items: SelectorItem[]): string
{
	let tokens: string[] = template.split( /{(\d+)}/g);

	// the split method produces an array, whcih starts with a string and has strings and numbers
	// alternating. As we go over the list of tokens, the tokenIsNumber tells us whether the
	// current token is a string or is a number that we need to substitute with a parameter.
	let tokenIsNumber = false;
	let arr: string[] = [];
	for (let token of tokens)
	{
		if (tokenIsNumber)
		{
			// the token must be the number because it was selected as such by RegEx, so no need
			// in try/catch
			let index = parseInt( token, 10);
			if (index < items.length)
				arr.push( selectorItemToString( items[index]));
		}
		else if (token)
			arr.push( token);

		tokenIsNumber = !tokenIsNumber;
	}

	return arr.join( "");
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



