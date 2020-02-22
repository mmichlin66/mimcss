import {IAnimationRule, Keyframe, generateName} from "./cssts"
import {stylesetToCssString} from "../styles/styles"
import {percentToCssString} from "../styles/utils"
import {Rule} from "./Rule"
import {StyleRule} from "./StyleRule";
import {StyleScope} from "./StyleScope"



/**
 * The TagRule type describes a styleset that applies to elements identified by a tag name.
 */
export class AnimationRule extends Rule implements IAnimationRule
{
	public constructor( owner: StyleScope, keyframes: Keyframe[])
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
	public constructor( owner: StyleScope, keyframe: Keyframe)
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
			return percentToCssString( waypoint);
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.waypointString} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	/** Only needed to distinguish from class and ID rules */
	public readonly waypointString: string;
}



