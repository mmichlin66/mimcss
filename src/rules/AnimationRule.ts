import {IAnimationRule, AnimationFrame, AnimationWaypoint, IAnimationFrameRule} from "../api/RuleTypes"
import {AnimationStyleset} from "../api/Stylesets";
import {Rule, IRuleContainer, IMimcssGroupingRule, IMimcssStyleElement} from "./Rule"
import {StyleRule} from "./StyleRules";
import {v2s, WKF} from "../impl/Utils";



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
	public process( container: IRuleContainer, ruleName: string | null)
	{
		super.process( container, ruleName);

		this.name = container.getScopedName( ruleName, this.nameOverride);

		for( let keyframeRule of this.frameRules)
			keyframeRule.process( container, ruleName);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: IMimcssStyleElement | IMimcssGroupingRule): void
	{
		if (!this.frameRules)
			return;

		let mimcssRule = parent.addKeyframesRule( this.name);
        if (mimcssRule)
        {
            this.cssRule = mimcssRule?.cssRule as CSSKeyframesRule;
            for( let frameRule of this.frameRules)
            {
                // although the cssRule in the frame is typed as CSSStyleRule, we know that in
                // practice, it is of the CSSKeyframeRule type.
                frameRule.cssRule = mimcssRule.addFrame( frameRule.toCss())?.cssRule as CSSStyleRule;
            }
        }
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
	public constructor( waypoint: AnimationWaypoint, styleset?: AnimationStyleset | AnimationStyleset[])
	{
		super( styleset);
		this.waypoint = waypoint;
	}

	// Returns the selector part of the style rule.
	public getSel(): string
	{
		return v2s( this.waypoint, { any: WKF.Percent, sep: "," });
	}

	/** Identifier of the waypoint */
	public waypoint: AnimationWaypoint;

	/**
     * SOM keyframe rule. Although the cssRule in the frame is typed as CSSStyleRule, we know that
     * in practice, it is of the CSSKeyframeRule type.
     */
	public get cssKeyframeRule(): CSSKeyframeRule { return this.cssRule as any as CSSKeyframeRule; };
}



