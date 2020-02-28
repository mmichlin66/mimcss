import {IAnimationRule, Keyframe} from "../api/rules"
import {stylesetToCssString} from "../styles/styles"
import {tsh} from "../styles/tsh"
import {Rule} from "./Rule"
import {StyleRule} from "./StyleRule";
import {StyleScope} from "./StyleScope"



/**
 * The TagRule type describes a styleset that applies to elements identified by a tag name.
 */
export class AnimationRule extends Rule implements IAnimationRule
{
	public constructor( keyframes?: Keyframe[])
	{
		super();

		if (keyframes)
			this.keyframeRules = keyframes.map( (keyframe) => new KeyframeRule( keyframe));
	}



	// Processes the given rule.
	public process( owner: StyleScope, ruleName: string)
	{
		super.process( owner, ruleName);

		this.animationName = this.owner.generateScopedName( ruleName);

		for( let keyframeRule of this.keyframeRules)
			keyframeRule.process( owner, ruleName);
	}



	// Creates a copy of the rule.
	public clone(): AnimationRule
	{
		let newRule = new AnimationRule();
		newRule.copyFrom( this);
		return newRule;
	}



	// Copies internal data from another rule object.
	public copyFrom( src: AnimationRule): void
	{
		this.keyframeRules = src.keyframeRules.map( (keyframeRule) => keyframeRule.clone());
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
	public get isAnimationRule(): boolean { return true; }

	/** Only needed to distinguish from class and ID rules */
	public keyframeRules: KeyframeRule[];

	// Name of the animation to use in animation-name CSS property.
	public animationName: string;
}



/**
 * The KeyframeRule class represents a single keyframe clause in the animation rule.
 */
class KeyframeRule extends StyleRule
{
	public constructor( keyframe?: Keyframe)
	{
		super( keyframe ? keyframe.style : undefined);

		if (keyframe)
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
			return tsh.percent( waypoint);
	}



	// Creates a copy of the rule.
	public clone(): KeyframeRule
	{
		let newRule = new KeyframeRule();
		newRule.copyFrom( this);
		return newRule;
	}



	// Copies internal data from another rule object.
	public copyFrom( src: KeyframeRule): void
	{
		super.copyFrom( src);
		this.waypointString = src.waypointString;
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.waypointString} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	/** Identifier of the waypoint as a string */
	public waypointString: string;
}



