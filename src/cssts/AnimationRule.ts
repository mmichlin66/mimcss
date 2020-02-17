import {IAnimationRule, Keyframe, StyleSheetDefinition, generateName, rulesetToCssString} from "./cssts"
import * as utils from "../styles/utils"
import {Rule} from "./Rule"
import {StyleRule} from "./StyleRule";



/**
 * The TagRule type describes a ruleset that applies to elements identified by a tag name.
 */
export class AnimationRule extends Rule implements IAnimationRule
{
	public constructor( owner: StyleSheetDefinition, keyframes: Keyframe[])
	{
		super( owner);

		this.keyframeRules = keyframes.map( (keyframe) =>new KeyframeRule( owner, keyframe));
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string)
	{
		this.animationName = generateName( styleSheetName, ruleName);

		for( let keyframeRule of this.keyframeRules)
			keyframeRule.process( styleSheetName, ruleName);
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		let s = `@keyframes ${this.animationName}{ `;
		for( let keyframeRule of this.keyframeRules)
			s += keyframeRule.toCssString();
		return s + "}";
	}



	/** Only needed to distinguish from other rules */
	public readonly isAnimationRule: boolean = true;

	/** Only needed to distinguish from class and ID rules */
	public readonly keyframeRules: KeyframeRule[];

	// Name of the animation to use in animation-name CSS property.
	public animationName: string;
}



class KeyframeRule extends StyleRule
{
	public constructor( owner: StyleSheetDefinition, keyframe: Keyframe)
	{
		super( owner, keyframe.style);

		this.waypointString = this.parseWaypoint( keyframe.waypoint);
	}



	// Processes the given rule.
	public parseWaypoint( waypoint: "from" | "to" | number): string
	{
		if (typeof waypoint === "string")
			return waypoint;
		else if (Number.isInteger( waypoint))
			return waypoint + "%";
		else
			return utils.percentToCssString( waypoint);
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.waypointString} ${rulesetToCssString( this.ruleset, this.important)}`;
	}



	/** Only needed to distinguish from class and ID rules */
	public readonly waypointString: string;
}



/** Returns new AnimationRule object as belonging to the given style sheet definition  */
export function defineAnimationRule( ssDef: StyleSheetDefinition, keyframes: Keyframe[]): IAnimationRule
{
	return new AnimationRule( ssDef, keyframes);
}



