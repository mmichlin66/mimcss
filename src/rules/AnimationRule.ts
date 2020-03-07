import {IAnimationRule, Keyframe} from "../api/rules"
import {tsh} from "../styles/tsh"
import {stylesetToCssString} from "../styles/StyleFuncs"
import {Rule} from "./Rule"
import {StyleRule} from "./StyleRule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



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
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string)
	{
		super.process( container, owner, ruleName);

		this.animationName = this.owner.getScopedRuleNamed( ruleName);

		for( let keyframeRule of this.keyframeRules)
			keyframeRule.process( container, owner, ruleName);
	}



	/**
	 * Determines whether this rule requires name - that is it will be ignored if created within
	 * the createUnnamedRules
	 */
	public get nameIsRequired(): boolean { return true; }



	// Creates a copy of the rule.
	public clone(): AnimationRule
	{
		let newRule = new AnimationRule();
		newRule.keyframeRules = this.keyframeRules.map( (keyframeRule) => keyframeRule.clone());
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		let index = parent.insertRule( `@keyframes ${this.animationName} {}`, parent.cssRules.length);
		this.cssRule = parent.cssRules[index];
		let cssKeyframesRule = this.cssRule as CSSKeyframesRule;
		
		for( let keyframeRule of this.keyframeRules)
		{
			cssKeyframesRule.appendRule( keyframeRule.toCssString())
		}
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
		super( keyframe ? keyframe[1] : undefined);

		if (keyframe)
			this.waypointString = this.parseWaypoint( keyframe[0]);
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
		newRule.waypointString = this.waypointString;
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public toCssString(): string
	{
		return `${this.waypointString} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	// Returns the selector part of the style rule.
	protected geSelectorString(): string
	{
		return this.waypointString;
	}



	/** Identifier of the waypoint as a string */
	public waypointString: string;
}



