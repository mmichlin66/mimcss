import {IAnimationRule, AnimationFrame, AnimationWaypoint, AnimationStyleset, IAnimationFrameRule} from "../api/RuleTypes"
import {Rule, ITopLevelRuleContainer, createName, IRuleContainer, IRuleSerializationContext} from "./Rule"
import {StyleRule} from "./StyleRules";
import {v2s} from "../impl/Utils";



/**
 * The AnimationRule class describes a @keyframes CSS rule.
 */
export class AnimationRule extends Rule implements IAnimationRule
{
	public constructor( frames?: AnimationFrame[], nameOverride?: string | IAnimationRule)
	{
		super();

		if (frames)
			this.frameRules = frames.map( frame => new AnimationFrameRule( frame[0], frame[1]));

		this.nameOverride = nameOverride;
	}


    // This function is called to convert an object to a string. Animation rule returns its name.
    public toString(): string { return this.name; }


	// Processes the given rule.
	public process( container: IRuleContainer, topLevelContainer: ITopLevelRuleContainer, ruleName: string)
	{
		super.process( container, topLevelContainer, ruleName);

		this.name = createName( topLevelContainer, ruleName, this.nameOverride);

		for( let keyframeRule of this.frameRules)
			keyframeRule.process( container, topLevelContainer, ruleName);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (!this.frameRules)
			return;

		this.cssRule = Rule.addRuleToDOM( `@keyframes ${this.name} {}`, parent) as CSSKeyframesRule;

		let cssKeyframesRule = this.cssRule as CSSKeyframesRule;
		for( let frameRule of this.frameRules)
		{
			try
			{
				cssKeyframesRule.appendRule( frameRule.toCssString())
				let cssRule = cssKeyframesRule.cssRules.item(  cssKeyframesRule.cssRules.length - 1);
				if (cssRule)
					frameRule.cssKeyframeRule = cssRule as CSSKeyframeRule;
			}
			catch(x)
			{
				console.error( "Cannot add CSS keyframe rule", x)
			}
		}
	}


	// Serializes this rule to a string.
    public serialize( ctx: IRuleSerializationContext): void
    {
		if (!this.frameRules)
			return;

		ctx.addRuleText( `@keyframes ${this.name} {`);

		for( let frameRule of this.frameRules)
			ctx.addRuleText( frameRule.toCssString())

		ctx.addRuleText( "}");
    }



	/** SOM keyframes rule */
	public cssRule: CSSKeyframesRule;

	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

	/** List of style rules representing animation frames */
	public frameRules: AnimationFrameRule[];

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | IAnimationRule;
}



/**
 * The AnimationFrameRule class represents a single keyframe clause in the animation rule.
 */
class AnimationFrameRule extends StyleRule implements IAnimationFrameRule
{
	public constructor( waypoint: AnimationWaypoint, styleset?: AnimationStyleset)
	{
		super( styleset);
		this.waypoint = waypoint;
	}

	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return v2s( this.waypoint, {
			num: v => v + "%",
			item: v => v2s( v, { num: v => v + "%" }),
			sep: ","
		})
	}

	/** Identifier of the waypoint */
	public waypoint: AnimationWaypoint;

	/** SOM keyframe rule */
	public cssKeyframeRule: CSSKeyframeRule;
}



