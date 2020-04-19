import {IFontFaceRule} from "./RuleTypes";
import {Fontface} from "../styles/FontFaceTypes"
import {fontFaceToString} from "../styles/FontFaceFuncs"
import {Rule} from "./Rule";



/**
 * The FontFaceRule class describes a @font-face CSS rule.
 */
export class FontFaceRule extends Rule implements IFontFaceRule
{
	public constructor( fontface: Fontface)
	{
		super();

		this.fontface = fontface;
	}

	// Creates a copy of the rule.
	public clone(): FontFaceRule
	{
		return new FontFaceRule( this.fontface);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		this.cssRule = Rule.addRuleToDOM( `@font-face ${fontFaceToString( this.fontface)}`,
			parent) as CSSFontFaceRule;
	}



	/** SOM font-face rule */
	public cssRule: CSSFontFaceRule;

	// Object defining font-face properties.
	public fontface: Fontface;
}



