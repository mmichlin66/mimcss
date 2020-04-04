import {SelectorTokenType, SelectorType} from "./SelectorTypes"
import {IStringProxy} from "./UtilTypes";
import {StringProxyBase} from "./UtilFuncs";
import {RuleType, ITagRule, IClassRule, IIDRule} from "../rules/RuleTypes"
import {Rule} from "../rules/Rule"



/**
 * The SelectorProxy class implements the IStringProxy interface by encapsulating a selector
 * template string with optional placeholders (e.g. {0}), which will be replaced by names
 * of tags, classes and IDs and other possible types.
 */
class SelectorProxy extends StringProxyBase
{
    constructor( template: string, params: SelectorTokenType[])
    {
        super();
        this.template = template;
        this.params = params;
    }

    public valueToCssString(): string
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
					if (item.ruleType === RuleType.TAG)
						arr.push( (item as ITagRule).tag);
					else if (item.ruleType === RuleType.CLASS)
						arr.push( (item as IClassRule).cssName);
					else if (item.ruleType === RuleType.ID)
						arr.push( (item as IIDRule).cssName);
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

    // Name of the mathematical function.
    private template: string;

    // Array of Number_StyleType parameters to the mathematical function.
    private params: SelectorTokenType[];
}



/**
 * Returns a string representation of a selector using the given template string with optional
 * placeholders (e.g. {0}), which will be replaced by names of tags, classes and IDs and other
 * possible types.
 */
export function $selector( template: string, ...args: SelectorTokenType[]): string | IStringProxy
{
	return !template ? "" : args.length === 0 ? template : new SelectorProxy( template, args);
}



/**
 * Converts the selector object into full selector string.
 */
export function selectorToCssString( selector: SelectorType): string
{
	if (!selector)
		return "";
	else if (typeof selector === "string")
		return selector;
	else
		return selector.toString();
}



