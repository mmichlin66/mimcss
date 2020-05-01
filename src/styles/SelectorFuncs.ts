import {SelectorTokenType} from "../rules/RuleTypes";
import {ClassRule, IDRule, SelectorRule} from "../rules/StyleRules"
import {Rule} from "../rules/Rule";
import { valueToString } from "./UtilFuncs";



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
export function formatSelector( template: string, params: SelectorTokenType[]): string
{
	let tokens: string[] = template.split( /{(\d+)}/g);
	let tokenIsNumber = false;
	let arr: string[] = [];
	for (let token of tokens)
	{
		if (tokenIsNumber)
		{
			let index = parseInt( token, 10);
			if (index >= params.length)
				continue;

			let item = params[index];
			if (item == null)
				continue;
			else if (typeof item === "string")
				arr.push( item);
			else if (item instanceof Rule)
			{
				if (item instanceof ClassRule)
					arr.push( item.cssName);
				else if (item instanceof IDRule)
					arr.push( item.cssName);
				else if (item instanceof SelectorRule)
					arr.push( item.selectorText);
			}
			else 
				arr.push( item.toString());
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
		return valueToString( val, { fromArray: v => `${v[0]}n+${v[1]}` });
	else
		return valueToString(val);
}



