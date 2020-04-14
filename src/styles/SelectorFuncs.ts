import * as SelectorTypes from "./SelectorTypes"
import * as RuleTypes from "../rules/RuleTypes"
import {Rule} from "../rules/Rule";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS selector.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the selector object into full selector string.
 */
export function selectorToCssString( selector: SelectorTypes.CssSelector): string
{
	if (!selector)
		return "";
	else if (typeof selector === "string")
		return selector;
	else if (typeof selector.valueToString === "function")
		return selector.valueToString();
	else
		return selector.toString();
}



/**
 * The SelectorProxy class implements the IStringProxy interface by encapsulating a selector
 * template string with optional placeholders (e.g. {0}), which will be replaced by names
 * of tags, classes and IDs and other possible types.
 */
export class SelectorProxy implements SelectorTypes.ISelectorProxy
{
    /** Flag indicating that this object implements the ISelectorProxy interface */
    public get isSelectorProxy(): boolean { return true; }

    constructor( private template: string, private params: SelectorTypes.SelectorTokenType[])
    {
    }

    /** Converts internally held value(s) to string */
    public valueToString(): string
    {
		let tokens: string[] = this.template.split( /{(\d+)}/g);
		let tokenIsNumber = false;
		let arr: string[] = [];
		for (let token of tokens)
		{
			if (tokenIsNumber)
			{
				let index = parseInt( token, 10);
				if (index >= this.params.length)
					continue;

				let item = this.params[index];
				if (item == null)
					continue;
				else if (typeof item === "string")
					arr.push( item);
				else if (item instanceof Rule)
				{
					if (item.ruleType === RuleTypes.RuleType.TAG)
						arr.push( (item as any as RuleTypes.ITagRule).tag);
					else if (item.ruleType === RuleTypes.RuleType.CLASS)
						arr.push( (item as any as RuleTypes.IClassRule).cssName);
					else if (item.ruleType === RuleTypes.RuleType.ID)
						arr.push( (item as any as RuleTypes.IIDRule).cssName);
					else if (item.ruleType === RuleTypes.RuleType.SELECTOR)
						arr.push( (item as any as RuleTypes.ISelectorRule).selectorText);
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
}



