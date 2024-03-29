﻿import {
    ICustomVar, PseudoEntity, IParameterizedPseudoEntity,
    DependentRuleCombinator, IConstant, IRuleWithSelector, DashedIdent, DotIdent, PoundIdent, DotPrefix, PoundPrefix, DashedPrefix
} from "./CoreTypes";
import {MediaStatement, SupportsStatement} from "./MediaTypes";
import {ExtendedIStyleset, VarTemplateName, VarValue, ExtendedVarValue, AnimationStyleset, IStyleset} from "./Stylesets";



/**
 * The IRule interface is a base interface that is implemented by all rules.
 */
export interface IRule
{
	/** CSSOM rule */
	readonly cssRule: CSSRule | null;
}



/**
 * The INamedEntity interface is a base interface implemented by all rules that have a name; that is,
 * classes, IDs, keyframes, custom CSS properties, counters, grid lines and areas.
 */
export interface INamedEntity
{
	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastructure. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	readonly name: string;
}



/**
 * The IPrefixedNamedEntity interface is a base interface implemented by rules that use prefix to
 * refer to the rule name within CSS.
 */
export interface IPrefixedNamedEntity<P extends DotPrefix | PoundPrefix | DashedPrefix> extends INamedEntity
{
	/**
	 * Prefix used to create the CSS name.
	 */
	readonly prefix: P;

	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastructure. This name
	 * has the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	readonly cssName: `${P}${string}`;
}



/**
 * Type representing an object that contains dependent rules of a style rule
 */
export type DependentRules<R extends CSSStyleRule | CSSPageRule = CSSStyleRule> =
	{ [K in PseudoEntity]?: IStyleRule<R> } &
	{ [K in DependentRuleCombinator]?: IStyleRule<R>[] } &
	{ [K in keyof IParameterizedPseudoEntity]?: IStyleRule<R>[] };




 /**
 * The IStyleRule interface represents a styling rule in a style sheet. Style rules can be used
 * anywhere where style properties can be defined: class rules, ID rules, selector rules,
 * keyframes, etc. StyleRule defines a styleset and can optionally point to one or more style rules
 * from which it inherits. A styleset combines all the properties from its own property block as
 * well as from all of style rules it inherites from.
 */
export interface IStyleRule<R extends CSSStyleRule | CSSPageRule = CSSStyleRule> extends IRule, IRuleWithSelector
{
	/** CSSOM style rule */
	readonly cssRule: R | null;

	/**
	 * Object containing dependent rules. Property names are taken from special properties
	 * of the CombinedStyleset. This object allows callers to access dependent rules to change
	 * style property values programmatically.
	 */
	readonly dependentRules: DependentRules<R>;

	/**
	 * Adds/replaces/removes the value of the given CSS property in this rule.
	 * @param name Name of the CSS property.
	 * @param value New value of the CSS property. If this value is undefined or null, the property
	 * is removed from the rule's styleset.
	 * @param schedulerType ID of a registered scheduler type that is used to write the property
	 * value to the DOM. If undefined, the current default scheduler will be used.
	 */
	setProp<K extends keyof IStyleset>( name: K, value?: ExtendedIStyleset[K] | null,
		schedulerType?: number): void;

	/**
	 * Adds/replaces/removes the value of the given custom CSS property in this rule.
	 * @param customVar IVarRule object defining a custom CSS property.
	 * @param value New value of the custom CSS property. If this value is undefined or null, the property
	 * is removed from the rule's styleset.
	 * @param schedulerType ID of a registered scheduler type that is used to write the property
	 * value to the DOM. If undefined, the current default scheduler will be used.
	 */
	setCustomProp<K extends VarTemplateName>( customVar: IVarRule<K>, value: ExtendedVarValue<K>,
		schedulerType?: number): void;
}



/**
 * The `IClassRule` interface represents a style rule where the selector is a single class name.
 * This interface is returned from the {@link RuleAPI!StyleDefinition.$class} method.
 */
export interface IClassRule extends IStyleRule, IPrefixedNamedEntity<DotPrefix>
{
}



/**
 * The `IClassNameRule` interface represents a combination of two or more class names. It can be
 * used to make it easier to create elements with more than one CSS class. This interface is
 * returned from the {@link RuleAPI!StyleDefinition.$classname} method.
 *
 * Objects implementing the `IClassNameRule` interface have the `name` property that contains the
 * combined class name, e.g. `"class1 class2"`. The `cssClassName` property contains the combined
 * selector, e.g. `"".class1.class2"`.
 */
export interface IClassNameRule extends IPrefixedNamedEntity<DotPrefix>, IRuleWithSelector
{
}



/**
 * Type for specifying a CSS class, which can be used in the `class` property of HTML elements.
 * It can be expressed in one of the following ways:
 * - as a string.
 * - as a class rule returned form the {@link RuleAPI!StyleDefinition.$class} method.
 * - as a class name rule returned form the {@link RuleAPI!StyleDefinition.$classname} method.
 * - as an array of the above.
 */
export type ClassMoniker = string | IClassRule | IClassNameRule | ClassMoniker[];



/**
 * The `IIDRule` interface represents a style rule where the selector is a single element ID.
 * This interface is returned from the {@link RuleAPI!StyleDefinition.$id} method.
 */
export interface IIDRule extends IStyleRule, IPrefixedNamedEntity<PoundPrefix>
{
}



/**
 * The AnimationWaypoint type defines a type that can be used to define a waypoint in an
 * animation sequence. When a waypoint is specified as a number, it is treated as percents.
 */
export type AnimationWaypoint = "from" | "to" | number | ("from" | "to" | number)[];

/**
 * The AnimationFrame type defines a single keyframe within a `@keyframes` rule.
 * The waypoint can be specified as "from" or "to" strings or as a number 0 to 100, which will be
 * treated as percents.
 */
export type AnimationFrame = [AnimationWaypoint, AnimationStyleset | AnimationStyleset[]];

/**
 * The IKeyframesRule interface represents the `@keyframes` rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$keyframes} method.
 */
export interface IKeyframesRule extends IRule, INamedEntity
{
	/** CSSOM keyframes rule */
	readonly cssRule: CSSKeyframesRule | null;

	/** List of style rules representing animation frames */
	readonly frameRules: IKeyframeRule[];
}

/**
 * The IKeyrameRule interface represents a single frame in the `@keyframes` rule.
 */
export interface IKeyframeRule extends IStyleRule
{
	/** Identifier of the waypoint */
	readonly waypoint: AnimationWaypoint;

	/** CSSOM keyframe rule */
	readonly cssKeyframeRule: CSSKeyframeRule;
}



/**
 * The IVarRule interface represents a CSS custom property definition. Objects implementing this
 * interface are returned from the {@link RuleAPI!StyleDefinition.$var} and {@link RuleAPI!StyleDefinition.$property} methods.
 */
export interface IVarRule<K extends VarTemplateName = any> extends IPrefixedNamedEntity<DashedPrefix>, ICustomVar<VarValue<K>>
{
	/**
     * Name of a non-custom CSS property whose type determines the type of the custom property
     * value. This name is a property of {@link Stylesets!IVarTemplateStyleset} interface; that is, it is either
     * a name of a CSS style property (in camelCase) or a string corresponding to one of basic
     * Mimcss types such as `"CssLength"`, `"CssColor"`, etc.
     */
	readonly template: K;

    /**
	 * Gets the value of the property.
	 */
	getValue(): ExtendedVarValue<K>;

    /**
	 * Sets new value of this custom CSS property at the global level; that is, under `:root`. To
     * set a value of the CSS custom property under a certain CSS rule, use the
     * {@link IStyleRule.setCustomProp} method.
	 * @param value New value for the CSS property.
	 * @param schedulerType ID of a registered scheduler type that is used to write the property
	 * value to the DOM. If undefined, the current default scheduler will be used.
	 */
	setValue( value: ExtendedVarValue<K>, schedulerType?: number): void;
}



/**
 * The IConstRule interface represents a "constant" that can be used anywhere the type defined by
 * the `template` parameter can be used. These are called constants, because they provide the
 * convenient and lightweight way of defining values that are unchanged during the application
 * lifetime. Although constants are defined very similarly to custom properties (see the
 * {@link IVarRule} interface), they cannot participate in the cascade and cannot be redefined under
 * elements. Constant can, however, use any expression that satisfies the type defined by the
 * `template` parameter including other constants, custom properties and functions.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$const} method.
 */
export interface IConstRule<K extends VarTemplateName = any> extends IConstant<VarValue<K>>
{
	/**
     * Name of a non-custom CSS property or simple type whose type determines the type of the
     * custom property value.
     */
	readonly template: K;

    /**
	 * Gets the value of the property.
	 */
	getValue(): ExtendedVarValue<K>;
}



/**
 * The ICounterRule interface represents a named counter definition. Use this rule to create
 * counter objects that can be used in counter-increment, counter-reset and counter-set style
 * properties. No CSS rule is created for counters - they are needed only to provide type-safe
 * counter definitions.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$counter} method.
 */
export interface ICounterRule extends INamedEntity
{
	/**
     * Name of the counter - this property returns the same value as the `name` property
     * inherited from the {@link INamedEntity} interface. This property is only needed to distinguish
     * this interface from others.
     * @ignore
     */
	readonly counterName: string;
}



/**
 * The ICounterRule interface represents the `@counter-style` rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$counterStyle} method.
 */
export interface ICounterStyleRule extends IRule, INamedEntity
{
	/** CSSOM counter-style rule */
	readonly cssRule: CSSCounterStyleRule | null;
}



/**
 * The IImportRule interface represents the CSS `@import` rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$import} method.
 */
export interface IImportRule extends IRule
{
	/** CSSOM import rule */
	readonly cssRule: CSSImportRule | null;
}



/**
 * The IFontFaceRule interface represents the CSS `@font-face` rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$fontface} method.
 */
export interface IFontFaceRule extends IRule
{
	/** CSSOM font-face rule */
	readonly cssRule: CSSFontFaceRule | null;
}



/**
 * The INamespaceRule interface represents the CSS `@namespace` rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$namespace} method.
 */
export interface INamespaceRule extends IRule
{
	/** Namespace string for the rule */
	readonly namespace: string;

	/** Optional prefix for the rule */
	readonly prefix?: string | undefined;

	/** CSSOM namespace rule */
	readonly cssRule: CSSNamespaceRule | null;
}



/**
 * The IPageRule interface represents the CSS `@page` rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$page} method.
 */
export interface IPageRule extends IStyleRule
{
	/** CSSOM page rule */
	readonly cssRule: CSSPageRule | null;
}



/**
 * The IPageNameRule interface represents a definition of a named page that can be later used in
 * the CSS `@page` rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$pageName} method.
 */
export interface IPageNameRule extends INamedEntity
{
    /** Name of the page. */
    readonly pageName: string;
}



/**
 * The IGridLineRule interface represents a definition of a named grid line.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$gridline} method or created
 * when a grid area is defined using the {@link RuleAPI!StyleDefinition.$gridarea} method.
 */
export interface IGridLineRule extends INamedEntity
{
    /**
     * Flag indicating whether the line is a start or end line of a grid area. The value is true
     * if this is the start line; false if this is the end line; and undefined if the line is
     * not related to any area.
     */
    readonly isStartEndOrNone?: boolean;

    /**
     * Name of the grid area of which the line is either a start or an end line. It is defined
     * only if the line name ends with "-start" or "-end".
     */
    readonly areaName?: string;
}



/**
 * The IGridAreaRule interface represents a definition of a named grid are. Grid area rule
 * defines two line rules: for its start and end lines.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$gridarea} method.
 */
export interface IGridAreaRule extends INamedEntity
{
    /** Start line of the area. */
    readonly startLine: IGridLineRule;

    /** End line of the area. */
    readonly endLine: IGridLineRule;
}



/**
 * The IColorProfileRule interface represents a `@color-profile` at-rule. This rule generates a
 * color profile name, which can be later used in the {@link ColorAPI!color} function.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$colorProfile} method.
 */
export interface IColorProfileRule extends IRule, INamedEntity
{
    /** Name of the color profile rule that can be used in the {@link ColorAPI!color} function. */
    readonly profileName: DashedIdent;
}



/**
 * The IFontPaletteValuesRule interface represents a `@font-palette-values` at-rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$fontPaletteValues} method.
 */
export interface IFontPaletteValuesRule extends IRule, INamedEntity
{
    /** Name of the `@font-palette-values` rule that can be used in the {@link Stylesets!IStyleset.fontPalette} property. */
    readonly fontPaletteName: DashedIdent;
}



/**
 * The IScrollTimelineRule interface represents a `@scroll-timeline` at-rule. This rule generates a
 * timeline name, which can be later used in the {@link Stylesets!IStyleset.animationTimeline} style property.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$scrollTimeline} method.
 */
export interface IScrollTimelineRule extends IRule, INamedEntity
{
    /** Name of the scroll timeline rule that can be used in the {@link Stylesets!IStyleset.animationTimeline} style property. */
    readonly timelineName: string;

    // /** CSSOM scroll timeline rule rule (not defined yet) */
	// readonly cssRule: CSSScrollTimelineRule | null;
}



/**
 * The `IStyleDefinition` interface represents a class that contain defininitions of CSS rules.
 * This interface is implemented by the {@link RuleAPI!StyleDefinition} class and is not intended to be
 * implemented by developers
 *
 * @typeparam P Parent style definition class. Parent of a top-level class is null.
 */
export interface IStyleDefinition<P extends IStyleDefinition = any>
{
	/**
	 * Refers to the instance of the style definition class which is the parnt of this style
     * definition object in the chain of style definition classes. Through this member, all rules
     * and other members defined in the parent definition class can be accessed. For top-level
     * style definitions, this property is always undefined. It is defined for style definitions
     * used for grouping rules - those created with {@link RuleAPI!StyleDefinition.$supports} and
     * {@link RuleAPI!StyleDefinition.$media} methods of the {@link RuleAPI!StyleDefinition} class.
     * This property can also be undefined if it was not provided to the constructor when creating
     * the style definition class manually.
	 */
	readonly $parent?: P;
}



/**
 * "Constructor" interface defining how style definition classes can be created.
 */
export interface IStyleDefinitionClass<T extends IStyleDefinition<P> = any,
    P extends IStyleDefinition = any>
{
	/** Style definition classes can have constructors with arbitrary parameters */
	new( ...args: any[]): T;
}



/**
 * The IGroupRule interface represents a grouping CSS rule.
 */
export interface IGroupRule<T extends IStyleDefinition = any, R extends CSSGroupingRule = any> extends IRule
{
	/** Condition of this grouping rule. */
	readonly condition: string;

	/** Instance of the style definition class defining the rules under this grouping rule */
	readonly gsd: T;

	/** CSSOM grouping rule */
	readonly cssRule: R | null;
}



/**
 * The ISupportsRule interface represents the CSS @supports rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$supports} method.
 */
export interface ISupportsRule<T extends IStyleDefinition = any> extends IGroupRule<T,CSSSupportsRule>
{
	/** Flag indicated whether the browser supports this rule's query */
    readonly isSupported: boolean;
}



/**
 * The IMediaRule interface represents the CSS @media rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$media} method.
 */
export interface IMediaRule<T extends IStyleDefinition = any> extends IGroupRule<T,CSSMediaRule>
{
    /**
     * Returns `MediaQueryList` object that allows programmatic checking whether the document matches
     * the media statement and also allows listening to its `change` event
     */
    readonly queryList: MediaQueryList | undefined;
}



/**
 * The IContainerRule interface represents the CSS @container rule.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$container} method.
 */
export interface IContainerRule<T extends IStyleDefinition = any> extends IGroupRule<T,CSSContainerRule>, INamedEntity
{
    /**
     * Optional name of the container targeted by this container rule
     */
    readonly containerName: string | undefined;
}



/**
 * The ILayerNameRule interface represents a variant of the `@layer` at-rule, which just declares
 * a name of a layer. This rule generates a layer name, which can be later used in other variants
 * of the `@layer` at-rule or in the `@import` at-rules. Objects implementing this interface are
 * returned from the {@link RuleAPI!StyleDefinition.$layer} method.
 */
export interface ILayerNameRule extends IRule, INamedEntity
{
    /** Name of the layer. */
    readonly layerName: string;
}



/**
 * The ILayerRule interface represents the CSS `@layer` block at-rule. This rule generates a layer
 * name, which can be later used in other variants of the `@layer` at-rule or in the `@import`
 * at-rules. Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$layer} method.
 */
export interface ILayerBlockRule<T extends IStyleDefinition = any> extends INamedEntity,
    IGroupRule<T,CSSGroupingRule/*CSSLayerBlockRule*/>
{
    /** Name of the layer. */
    readonly layerName: string;
}



/**
 * The ILayerOrderRule interface contains a list of layer names representing their order. This
 * corresponds to the `@layer` statement at-rule as opposed to the `@layer` block at-rule, which
 * contains stylesheet definition and which is expressed in Mimcss by the {@link ILayerBlockRule} interface.
 * Objects implementing this interface are returned from the {@link RuleAPI!StyleDefinition.$layer} method.
 */
export interface ILayerOrderRule extends IRule
{
	/** CSSOM grouping rule */
	readonly cssRule: CSSRule /*CSSLayerStatementRule*/ | null;
}



/** Defines possible ways to define a layer name */
export type LayerMoniker = string | ILayerNameRule | ILayerBlockRule;



/** Defines options passed to the {@link RuleAPI!StyleDefinition.$import} method defining the `@import` at-rule */
export type ImportRuleOptions = {
    /** Optional media statement */
    media?: MediaStatement;

    /** Optional supports statement */
    supports?: SupportsStatement;

    /** Opional layer name */
    layer?: LayerMoniker;
};



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Name generation.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Provides values that identify the method used to generate names of CSS named entities (e.g.
 * classes, identifiers, counters, animations, custom properties, etc.). The development version
 * of the Mimcss library uses the `UniqueScoped` method while the production version uses the
 * `Optimized` method. The {@link RuleAPI!configNameGeneration} function can be called to change the default
 * method.
 */
export const enum NameGenerationMethod
{
    /**
     * Names are generated using the name of the style definition class concatenated with the
     * property name defining the CSS entity and concatenated with a unique number. The unique
     * number is needed to generate truly unique names even in the presence of identically named
     * style definition classes and properties. This method produces relatively long names and
     * should be used during development. Having the names of the class and property defining the
     * CSS entity allows developers to easily find the place where the entity is defined.
     *
     * This method is used by default in the development version of the Mimcss library.
     *
     * **Example:**
     * ```typescript
     * css.configNameGeneration( NameGenerationMethod.UniqueScoped);
     *
     * class MyStyles extends css.StyleDefinition
     * {
     *     // class name will be generated as "MyStyles_red_nnn", where 'nnn' is a unique number.
     *     red = this.$class({ color: "red"})
     * }
     * ```
     */
    UniqueScoped = 1,

    /**
     * Names are generated using a prefix concatenated with a unique number. The default prefix is
     * `"n"`, which can be changed using the {@link RuleAPI!configNameGeneration} function.
     *
     * This method is used by default in the production version of the Mimcss library.
     *
     * **Example:**
     * ```typescript
     * css.configNameGeneration( NameGenerationMethod.Optimized, "my_");
     *
     * class MyStyles extends css.StyleDefinition
     * {
     *     // class name will be generated as "my_nnn", where 'nnn' is a unique number.
     *     red = this.$class({ color: "red"})
     * }
     * ```
     */
    Optimized,

    /**
     * Names are generated using the name of the style definition class concatenated with the
     * property name defining the CSS entity. This method produces predicatable names (since no
     * unique numbers are involved) and thus is suitable for testing environments where CSS names
     * are used for identifying elements on the page. Note that if different JavaScript modules
     * have identically named classes with identically named properties, the generated names
     * will be identical.
     *
     * **Example:**
     * ```typescript
     * css.configNameGeneration( NameGenerationMethod.Scoped);
     *
     * class MyStyles extends css.StyleDefinition
     * {
     *     // class name will be generated as "MyStyles_red".
     *     red = this.$class({ color: "red"})
     * }
     * ```
     */
    Scoped,
}



