import {StyleScope} from "./StyleScope"
import {Rule} from "./Rule"



/**
 * The TssManager class is responsible for inserting CSS rules into the DOM.
 */
export class TssManager
{
	// This class has static members only.
	private constructor() {}



	/**
	 * Generates name to use for the given rule from the given style sheet.
	 * @param sheetName 
	 * @param ruleName 
	 */
	public static generateName( sheetName: string, ruleName: string): string
	{
		return `${sheetName}_${ruleName}`;
	}



	/**
	 * Generates a unique name, which can be used either for style element's ID or or class,
	 * identifier or animation name. Names are generated using a simple incrementing number.
	 */
	public static generateUniqueName( prefix?: string): string
	{
		return (prefix ? prefix : "n") + this.nextUniqueID++;
	}



	/** Inserts rules from the given style scope into DOM */
	public static addStyleScope( styleScope: StyleScope): void
	{
		this.ensureDOM();

		styleScope.setDOMInfo( this.domSS, this.domSS.rules.length);

		// go over the rules, convert them to strings and insert them into the style sheet
		for( let ruleName in styleScope.allRules)
		{
			let rule: Rule = styleScope.allRules[ruleName];
			rule.index = this.domSS.insertRule( rule.toCssString());
		}
	}



	/** Ensures that the <style> element is inserted into DOM */
	public static ensureDOM(): void
	{
		if (this.domSS)
			return;

		// create <style> element and insert it into <head>
		this.styleElm = document.createElement( "style");
		document.head.appendChild( this.styleElm);

		this.domSS = this.styleElm.sheet as CSSStyleSheet;
	}



	// Next number to use when generating unique identifiers.
	private static nextUniqueID: number = 1;

	// Style element DOM object where all rules from all StyleScope objects are creaed.
	private static styleElm?: HTMLStyleElement;

	// DOM style sheet object inserted into the <head> element.
	private static domSS?: CSSStyleSheet;
}



