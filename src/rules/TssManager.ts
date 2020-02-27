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
	 * Sets the flag indicating whether to use optimized (unique) style names. If yes, the names
	 * will be created by appending a unique number to the given prefix. If the prefix is not
	 * specified, the standard prefix "n" will be used.
	 * @param optimize
	 * @param prefix
	 */
	public static useOptimizedStyleNames( optimize: boolean, prefix?: string): void
	{
		this.useUniqueStyleNames = optimize;
		this.uniqueStyleNamesPrefix = prefix;
	}



	/**
	 * Generates name to use for the given rule from the given style sheet.
	 * @param sheetName 
	 * @param ruleName 
	 */
	public static generateName( sheetName: string, ruleName: string): string
	{
		return this.useUniqueStyleNames
			? this.generateUniqueName( this.uniqueStyleNamesPrefix)
			: `${sheetName}_${ruleName}`;
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
	public static activate( styleScope: StyleScope): void
	{
		if (!styleScope)
			return;
			
		// depending on whether the given scope is multiplex, we either create a new <style> element
		// or reuse our "global" one
		let styleElm: HTMLStyleElement;
		let styleSheet: CSSStyleSheet;
		if (styleScope.Definition.isMultiplex)
		{
			styleElm = document.createElement( "style");
			document.head.appendChild( styleElm);
			styleSheet = styleElm.sheet as CSSStyleSheet;
			this.multiplexScopes.set( styleScope, styleElm);
		}
		else
		{
			this.ensureDOM();
			styleElm = this.styleElm;
			styleSheet = this.styleSheet;
		}

		styleScope.setDOMInfo( styleElm, styleSheet);

		// go over the named rules, convert them to strings and insert them into the style sheet
		for( let ruleName in styleScope._namedRules)
		{
			let rule: Rule = styleScope._namedRules[ruleName];
			rule.index = styleSheet.insertRule( rule.toCssString());
		}

		// do the same for the unnamed rules
		for( let unnamedRule of styleScope._unnamedRules)
		{
			let rule = unnamedRule as Rule;
			rule.index = styleSheet.insertRule( rule.toCssString());
		}
	}



	// Removes this style scope from DOM - only works for multiplex style scopes
	public static deactivate( styleScope: StyleScope): void
	{
		if (!styleScope)
			return;

		if (styleScope.Definition.isMultiplex)
		{
			styleScope.clearDOMInfo();
			
			// remove the <style> element from the document
			let styleElm = this.multiplexScopes.get( styleScope);
			if (styleElm)
				styleElm.remove();

			this.multiplexScopes.delete( styleScope);
		}
	}



	/** Ensures that the <style> element is inserted into DOM */
	private static ensureDOM(): void
	{
		if (this.styleSheet)
			return;

		// create <style> element and insert it into <head>
		this.styleElm = document.createElement( "style");
		document.head.appendChild( this.styleElm);

		this.styleSheet = this.styleElm.sheet as CSSStyleSheet;
	}



	// Flag indicating whether to use optimaized names for style elements (class names, animation
	// names, etc.)
	private static useUniqueStyleNames: boolean = false;

	// Prefix to use when generating unique style names. If undefined, a standard prefix "n" will
	// be used.
	private static uniqueStyleNamesPrefix: string = undefined;

	// Next number to use when generating unique identifiers.
	private static nextUniqueID: number = 1;

	// Style element DOM object where all rules from all StyleScope objects are creaed.
	private static styleElm?: HTMLStyleElement;

	// DOM style sheet object inserted into the <head> element.
	private static styleSheet?: CSSStyleSheet;

	// Map of StyleScope multiplex objects to their <style> element DOM objects.
	private static multiplexScopes = new Map<StyleScope,HTMLStyleElement>();
}



