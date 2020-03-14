import {IAnimationRule, Keyframe, RuleType} from "../api/rules"
import {tsh} from "../api/tsh"
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
		super( RuleType.ANIMATION);

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
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public get name(): string { return this.animationName; }

	/**
	 * Rule's name - this is a name that has the prefix that is used when referring to classes (.),
	 * IDs (#) and custom CSS properties (--). For animations, this name is the same as in the
	 * `name` property.
	 */
	public get cssName(): string { return this.animationName; }



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
			cssKeyframesRule.appendRule( keyframeRule.toCssString())
	}



	/** SOM keyframes rule */
	public get cssKeyframesRule(): CSSKeyframesRule { return this.cssRule as CSSKeyframesRule; }

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
		super( RuleType.KEYFRAME, keyframe ? keyframe[1] : undefined);

		if (keyframe)
			this.waypointString = this.parseWaypoint( keyframe[0]);
	}



	// Processes the given rule.
	private parseWaypoint( waypoint: "from" | "to" | number): string
	{
		if (typeof waypoint === "string")
			return waypoint;
		else if (Number.isInteger( waypoint))
			return waypoint + "%";
		else
			return tsh.percent( waypoint);
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( container, owner, ruleName);

		// go through all parents and copy their style properties to our own styleset.
		for( let parent of this.parents)
			Object.assign( this.styleset, parent.styleset);
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



