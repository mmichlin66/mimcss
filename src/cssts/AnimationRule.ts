import * as cssts from "./cssts"
import {Rule} from "./Rule"



/**
 * The TagRule type describes a ruleset that applies to elements identified by a tag name.
 */
export class AnimationRule extends Rule implements cssts.IAnimationRule
{
	public constructor( owner: cssts.StyleSheetDefinition, keyframes: cssts.Keyframe[])
	{
		super( owner);

		this.keyframes = keyframes;
	}

	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string)
	{
		// // go through all parentsand copy style properties to our own ruleset.
		// for( let parent of this.parents)
		// 	Object.assign( this.ruleset, parent.ruleset);
	}

	// Creates string representation of the 
	public toString(): string
	{
		// return `${this.tagName} ${cssts.rulesetToString( this.ruleset, this.important)}`;
		return "";
	}



	/** Only needed to distinguish from class and ID rules */
	public readonly keyframes: cssts.Keyframe[];
}



/** Returns new AnimationRule object as belonging to the given style sheet definition  */
export function defineAnimationRule( ssDef: cssts.StyleSheetDefinition, keyframes: cssts.Keyframe[]): cssts.IAnimationRule
{
	return {} as cssts.IAnimationRule;
}



