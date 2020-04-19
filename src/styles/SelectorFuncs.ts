import * as SelectorTypes from "./SelectorTypes"
import {Rule} from "../rules/Rule";
import {TagRule} from "../rules/TagRule"
import {ClassRule} from "../rules/ClassRule"
import {IDRule} from "../rules/IDRule"
import {SelectorRule} from "../rules/SelectorRule"



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
export function formatSelector( template: string, params: SelectorTypes.SelectorTokenType[]): string
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
				if (item instanceof TagRule)
					arr.push( item.tag);
				else if (item instanceof ClassRule)
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



