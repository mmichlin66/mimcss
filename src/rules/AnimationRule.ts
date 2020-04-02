import {IAnimationRule, Keyframe, RuleType, INamedRule} from "./RuleTypes"
import {Percent} from "../styles/UtilFuncs"
import {Rule} from "./Rule"
import {StyleRule} from "./StyleRule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The TagRule type describes a styleset that applies to elements identified by a tag name.
 */
export class AnimationRule extends Rule implements IAnimationRule
{
	public constructor( keyframes?: Keyframe[], nameOverride?: string | INamedRule)
	{
		super( RuleType.ANIMATION);

		if (keyframes)
			this.keyframeRules = keyframes.map( (keyframe) => new KeyframeRule( keyframe));

		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string)
	{
		super.process( container, owner, ruleName);

		if (!this.nameOverride)
			this.name = this.owner.getScopedRuleName( ruleName);
		else if (typeof this.nameOverride === "string")
			this.name = this.nameOverride;
		else
			this.name = this.nameOverride.name;

		this.cssName = this.name;

		for( let keyframeRule of this.keyframeRules)
			keyframeRule.process( container, owner, ruleName);
	}



	// Creates a copy of the rule.
	public clone(): AnimationRule
	{
		let newRule = new AnimationRule();
		newRule.keyframeRules = this.keyframeRules.map( (keyframeRule) => keyframeRule.clone());
		newRule.nameOverride = this.nameOverride;
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		this.cssRule = Rule.addRuleToDOM( `@keyframes ${this.name} {}`, parent);

		let cssKeyframesRule = this.cssRule as CSSKeyframesRule;
		for( let keyframeRule of this.keyframeRules)
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
	public keyframeRules: KeyframeRule[];

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
	private nameOverride?: string | INamedRule;
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
			return Percent.styleToString( waypoint);
	}



	// Creates a copy of the rule.
	public clone(): KeyframeRule
	{
		let newRule = new KeyframeRule();
		newRule.copyFrom( this);
		newRule.waypointString = this.waypointString;
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return this.waypointString;
	}



	/** Identifier of the waypoint as a string */
	public waypointString: string;
}



