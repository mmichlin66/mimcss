import {IAnimationRule, AnimationFrame, AnimationWaypoint, AnimationStyleset, IAnimationFrameRule} from "./RuleTypes"
import {Rule, ITopLevelRuleContainer, createNames, IRuleContainer} from "./Rule"
import {StyleRule} from "./StyleRules";
import { val2str } from "../styles/UtilFuncs";



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



	// Processes the given rule.
	public process( container: IRuleContainer, ownerContainer: ITopLevelRuleContainer, ruleName: string)
	{
		super.process( container, ownerContainer, ruleName);

		[this.name, this.cssName] = createNames( ownerContainer, ruleName, this.nameOverride);

		for( let keyframeRule of this.frameRules)
			keyframeRule.process( container, ownerContainer, ruleName);
	}



	// Creates a copy of the rule.
	public clone(): AnimationRule
	{
		let newRule = new AnimationRule(undefined, this.nameOverride);
		if (this.frameRules)
			newRule.frameRules = this.frameRules.map( frameRule => frameRule.clone() as AnimationFrameRule);
		newRule.nameOverride = this.nameOverride;
		return newRule;
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


	// This function is called to convert an object to a string. Animation rule returns its name.
	public valueToString(): string
	{
		return this.name;
	}


	
	/** SOM keyframes rule */
	public cssRule: CSSKeyframesRule;

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

	// Creates a copy of the rule.
	public cloneObject(): AnimationFrameRule
	{
		return new AnimationFrameRule( this.waypoint);
	}

	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return val2str( this.waypoint, {
			fromNumber: v => v + "%",
			arrItemFunc: v => val2str( v, { fromNumber: v => v + "%" }),
			arrSep: ","
		})
	}

	/** Identifier of the waypoint */
	public waypoint: AnimationWaypoint;

	/** SOM keyframe rule */
	public cssKeyframeRule: CSSKeyframeRule;
}



