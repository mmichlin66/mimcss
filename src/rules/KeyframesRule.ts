import {IKeyframesRule, AnimationFrame, AnimationWaypoint, IKeyframeRule, IStyleDefinition} from "../api/RuleTypes"
import {AnimationStyleset} from "../api/Stylesets";
import {Rule, IMimcssRuleBag} from "./Rule"
import {StyleRule} from "./StyleRules";
import {v2s, WKF} from "../impl/Utils";



/**
 * The IKeyframesRule class describes a @keyframes CSS rule.
 */
export class KeyframesRule extends Rule implements IKeyframesRule
{
	public constructor( sd: IStyleDefinition, frames?: AnimationFrame[],
        nameOverride?: string | IKeyframesRule)
	{
		super(sd);

		if (frames)
			this.frameRules = frames.map( frame => new KeyframeRule( sd, frame[0], frame[1]));

		this.nameOverride = nameOverride;
	}


    // This function is called to convert an object to a string. Animation rule returns its name.
    public toString(): string { return this.name; }


	// Processes the given rule.
	public process( ruleName: string | null)
	{
		this.name = this.rc.getScopedName( ruleName, this.nameOverride);

        if (this.frameRules)
        {
            for( let keyframeRule of this.frameRules)
                keyframeRule.process( null);
        }
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( ruleBag: IMimcssRuleBag): void
	{
		if (!this.frameRules)
			return;

		let mimcssRule = ruleBag.addKeyframes( this.name);
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
	declare public cssRule: CSSKeyframesRule;

	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

	/** List of style rules representing animation frames */
	public frameRules: KeyframeRule[];

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | IKeyframesRule;
}



/**
 * The AnimationFrameRule class represents a single keyframe clause in the animation rule.
 */
class KeyframeRule extends StyleRule implements IKeyframeRule
{
	public constructor( sd: IStyleDefinition, waypoint: AnimationWaypoint,
        styleset?: AnimationStyleset | AnimationStyleset[])
	{
		super( sd, styleset);
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



