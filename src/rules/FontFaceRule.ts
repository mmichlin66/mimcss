import {IFontFaceRule, RuleType} from "./RuleTypes";
import {Fontface} from "../styles/FontFaceTypes"
import {fontFaceToCssString} from "../styles/FontFaceFuncs"
import {Rule} from "./Rule";



/**
 * The FontFaceRule class describes a @font-face CSS rule.
 */
export class FontFaceRule extends Rule implements IFontFaceRule
{
	public constructor( fontface?: Fontface)
	{
		super( RuleType.FONTFACE);

		this.fontface = fontface;
	}

	// Creates a copy of the rule.
	public clone(): FontFaceRule
	{
		let newRule = new FontFaceRule();
		newRule.fontface = {};
		Object.assign( this.fontface, this.fontface);
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		this.cssRule = Rule.addRuleToDOM( `@font-face ${fontFaceToCssString( this.fontface)}`, parent);
	}



	/** SOM font-face rule */
	public get cssFontFaceRule(): CSSFontFaceRule { return this.cssRule as CSSFontFaceRule; }

	// Object defining font-face properties.
	public fontface: Fontface;
}



