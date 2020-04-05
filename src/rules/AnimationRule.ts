import {IAnimationRule, AnimationFrame, RuleType, INamedEntity} from "./RuleTypes"
import {Rule, createNames} from "./Rule"
import {StyleRule} from "./StyleRule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The AnimationRule class describes a @keyframes CSS rule.
 */
export class AnimationRule extends Rule implements IAnimationRule
{
	public constructor( frames?: AnimationFrame[], nameOverride?: string | IAnimationRule)
	{
		super( RuleType.ANIMATION);

		if (frames)
			this.frameRules = frames.map( (keyframe) => new AnimationFrameRule( keyframe));

		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string)
	{
		super.process( container, owner, ruleName);

		[this.name, this.cssName] = createNames( owner, ruleName, this.nameOverride);

		for( let keyframeRule of this.frameRules)
			keyframeRule.process( container, owner, ruleName);
	}



	// Creates a copy of the rule.
	public clone(): AnimationRule
	{
		let newRule = new AnimationRule();
		if (this.frameRules)
			newRule.frameRules = this.frameRules.map( (keyframeRule) => keyframeRule.clone());
		newRule.nameOverride = this.nameOverride;
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (!this.frameRules)
			return;

		this.cssRule = Rule.addRuleToDOM( `@keyframes ${this.name} {}`, parent);

		let cssKeyframesRule = this.cssRule as CSSKeyframesRule;
		for( let keyframeRule of this.frameRules)
		{
			let ruleText = keyframeRule.toCssString();
			try
			{
				cssKeyframesRule.appendRule( ruleText)
			}
			catch(x)
			{
				console.error( `Cannot add CSS rule '${ruleText}'`, x)
			}
		}
	}



	/** SOM keyframes rule */
	public get cssKeyframesRule(): CSSKeyframesRule { return this.cssRule as CSSKeyframesRule; }

	/** Only needed to distinguish from class and ID rules */
	public frameRules: AnimationFrameRule[];

	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

	/**
	 * Rule's name - this is a name that has the prefix that is used when referring to classes (.),
	 * IDs (#) and custom CSS properties (--). For animations, this name is the same as in the
	 * `name` property.
	 */
	public cssName: string;

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | INamedEntity;
}



/**
 * The AnimationFrameRule class represents a single keyframe clause in the animation rule.
 */
class AnimationFrameRule extends StyleRule
{
	public constructor( frame?: AnimationFrame)
	{
		super( RuleType.KEYFRAME, frame ? frame[1] : undefined);

		if (frame)
			this.waypoint = typeof frame[0] === "string" ? frame[0] : frame[0] + "%";
	}



	// Creates a copy of the rule.
	public clone(): AnimationFrameRule
	{
		let newRule = new AnimationFrameRule();
		newRule.copyFrom( this);
		newRule.waypoint = this.waypoint;
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return this.waypoint;
	}



	/** Identifier of the waypoint as a string */
	public waypoint: string;
}



