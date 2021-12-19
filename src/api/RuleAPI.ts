import {CssSelector, PagePseudoClass, ElementTagName, ExtendedProp} from "./CoreTypes";
import {
    IStyleRule, IClassRule, IIDRule, AnimationFrame, IAnimationRule, IVarRule,
    ICounterRule, IGridLineRule, IGridAreaRule, IImportRule, IFontFaceRule, INamespaceRule, IPageRule,
    IStyleDefinitionClass, ISupportsRule, IMediaRule, IClassNameRule, IConstRule, ClassPropType,
    NameGenerationMethod, ICounterStyleRule, IStyleDefinition
} from "./RuleTypes";
import {MediaStatement, SupportsStatement} from "./MediaTypes"
import {ExtendedFontFace} from "./FontTypes";
import {ExtendedCounterStyleset} from "./CounterTypes";
import {
    Styleset, VarTemplateName, ExtendedVarValue, CombinedStyleset, CombinedClassStyleset,
    ISyntaxTypeStyleset
} from "./Stylesets";
import {symRC} from "../rules/Rule";
import {
    embeddedDecorator, getCurrentTheme, processSD, configNames, RuleContainer,
    s_startSSR, s_stopSSR, s_startHydration, s_stopHydration
} from "../rules/RuleContainer";
import {AbstractRule, ClassRule, IDRule, SelectorRule, PageRule} from "../rules/StyleRules"
import {AnimationRule} from "../rules/AnimationRule"
import {VarRule, ConstRule, PropertyRule} from "../rules/VarRule"
import {CounterRule, CounterStyleRule} from "../rules/CounterRules";
import {GridLineRule, GridAreaRule} from "../rules/GridRules";
import {FontFaceRule, ImportRule, NamespaceRule, ClassNameRule} from "../rules/MiscRules"
import {SupportsRule, MediaRule} from "../rules/GroupRules"
import {v2s} from "../impl/Utils";
import {getActivator} from "../impl/SchedulingImpl";



/**
 * The `StyleDefinition` class is a base for all classes that contain defininitions of CSS rules.
 * Style definition classes are regular TypeScript classes and as such can have any fields and
 * methods - both instance and static. Normally, however, they contain instance properties
 * initialized with functions returning style rules and at-rules, such as [[$class]],
 * [[$tag]], [[$media]], [[$counter]] and others.
 *
 * **Examples**
 *
 * ```typescript
 * // top-level style definition class
 * class MyStyles extends css.StyleDefinition
 * {
 *     cls = this.$class({ color: "red"})
 *
 *     // using style-definition class for @media rule
 *     ifNarrowScreen = this.$media( { maxWidth: 800 },
 *         class extends css.StyleDefinition<MyStyles>
 *         {
 *             cls = this.$class({ color: "pink"})
 *         }
 *     )
 * }
 * ```
 *
 * @typeparam P Parent style definition class. Parent of a top-level class is null.
 */
export abstract class StyleDefinition<P extends StyleDefinition = any> implements IStyleDefinition<P>
{
    /**
     * Refers to the instance of the style definition class which is the parent of this style
     * definition object in the chain of style definition classes. Through this member, all rules
     * and other members defined in the parent definition class can be accessed. For top-level
     * style definitions, this property is always undefined. This property can also be undefined
     * if it was not provided to the constructor when creating the style definition class manually.
     *
     * The `$parent` reference is used when there is a need to refer from grouping rules (created
     * by `$media()` or `$support()` methods) to the rules defined in the parent style definition
     * class. If there are multiple nested grouping rules, then the constuct `this.$parent.$parent...`
     * allows reaching to rules defined in any ancestor style definition class.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     defaultColor = this.$var( "color", "blue")
     *
     *     ifSmallScreen = this.$media( { maxWidth: 600 },
     *         class extends css.StyleDefinition<MyStyles>
     *         {
     *             p = this.$style( "p", { color: this.$parent.defaultColor })
     *         }
     *     )
     * }
     * ```
     */
    public readonly $parent?: P;



    /**
     * Style definition instances are created directly only by the *styled components* - that is,
     * components that use different styles for each instance. Otherwise, style definition
     * instances are created when either the [[$use]] method or [[activate]] function is called.
     * @param parent Reference to the parent style definition class
     */
    public constructor( parent?: P)
    {
        this.$parent = parent;

        // Style Definition instance points to rule container
        let rc = new RuleContainer( this);
        this[symRC] = rc;

        // instead of returning an instance of our class, the constructor returns a proxy. This
        // allows creating proxies for all properties defined in the class.
        return new Proxy<StyleDefinition<P>>( this, rc);
    }



    /**
     * Creates a new abstract rule, which defines a styleset that can be extended by other style rules.
     * Abstract rules don't have selectors and are not inserted into the DOM. Abstract rules can
     * themselves extend other rules - both abstract and non-abstract.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     colorBox = this.$abstract({
     *         backgroundColor: "orange",
     *         borderRadius: css.percent(10),
     *         border: [4, "solid", "red"],
     *         ":hover": {
     *             opacity: 0.7
     *         }
     *     })
     *
     *     box = this.$class({
     *         "+": this.colorBox,
     *         width: 200,
     *         height: 200,
     *     })
     *
     *     specialElm = this.$id({
     *         "+": this.colorBox,
     *         width: 600,
     *         height: 400,
     *     })
     * }
     * ```
     *
     * @param styleset One or more styleset objects that will be inherited by style rules that
     * extend this abstract rule.
     * @returns `IStyleRule` object that should be used by the derived rules in the `"+"` property.
     */
    public $abstract( styleset: CombinedStyleset | CombinedStyleset[]): IStyleRule
    {
        return new AbstractRule( this, styleset);
    }



    /**
     * Creates a new class rule. The class name will be created when the rule is processed as part of
     * the style definition class. The name can be also overridden by providing either an explicit
     * name or another class rule. The function can be called without parameters just to "declare"
     * the class. Such class can be later used either in conditional grouping rules or in derived
     * style definition classes.
     *
     * The returned [[IClassRule]] interface has the `name` property that should be used to assign
     * the class to an HTML element
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     vbox = this.$class({
     *         display: "flex",
     *         flexDirection: "column",
     *         alignItems: "center"
     *     })
     * }
     * ...
     * let styles = css.activate( MyClasses);
     * ...
     * render
     * {
     *     return <div class={styles.vbox.name}>
     *         <span>Hello</span>
     *         <span>World!</span>
     *     </div>
     * }
     * ```
     *
     * @param styleset One or more styleset objects that define style properties of the class.
     * @param nameOverride string or another `IClassRule` object that determines the name of the
     * class. If this optional parameter is defined, the name will override the Mimcss name
     * assignment mechanism. This might be useful if there is a need for the class to match a name
     * of another, probably external, class. If this parameter is defined as a string, it should
     * not have the `"."` prefix.
     * @returns `IClassRule` object that should be used for getting the class name and for accessing
     * the style properties if needed.
     */
    public $class( styleset?: CombinedClassStyleset | CombinedClassStyleset[],
        nameOverride?: string | IClassRule): IClassRule
    {
        return new ClassRule( this, styleset, nameOverride);
    }



    /**
     * Creates a new class name rule, which combines one or more other class names. This creates a
     * "synonym" that is easier to apply to an element's class attribute than an array of two or
     * more class rules.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // declare class - just to be used later
     *     spaced = css.class({gap: 8})
     *
     *     vbox = this.$class({
     *         display: "flex",
     *         flexDirection: "column"
     *     })
     *
     *     // use $classname rule to combine the names of classes vbox and spaced
     *     spacedVbox = this.$classname( this.vbox, this.spaced)
     * }
     * ...
     * let styles = css.activate( MyClasses);
     * ...
     * render
     * {
     *     // without spacedVbox, the class would be: {[styles.vbox.name, styles.spaced.name]}
     *     return <div class={styles.spacedVbox.name}>
     *         <span>Hello</span>
     *         <span>World!</span>
     *     </div>
     * }
     * ```
     *
     * @param ...classes List of class names specified either as a string or [[IClassRule]] or
     * [[IClassNameRule]] objects.
     * @returns `IClassNameRule` object whose `name` property contains the combined class name, e.g.
     * `"class1 class2"`. The `cssClassName` property contains the combined selector, e.g.
     * `".class1.class2"`.
     */
    public $classname( ...classes: (IClassRule | IClassNameRule | string)[]): IClassNameRule
    {
        return new ClassNameRule( this, classes);
    }



    /**
     * Creates a new ID rule. The ID name will be created when the rule is processed as part of
     * the style definition class. The name can be also overridden by providing either an explicit
     * name or another ID rule. The function can be called without parameters just to "declare"
     * the ID. Such ID can be later used either in conditional grouping rules or in derived
     * style definition classes.
     *
     * The returned [[IIDRule]] interface has the `name` property that should be used to assign
     * the ID to an HTML element.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     container = this.$id({
     *         display: "flex",
     *         flexDirection: "column",
     *         alignItems: "center"
     *     })
     * }
     * ...
     * let styles = css.activate( MyClasses);
     * ...
     * render
     * {
     *     return <div id={styles.container.name}>
     *         <span>Hello</span>
     *         <span>World!</span>
     *     </div>
     * }
     * ```
     *
     * @param styleset One or more styleset objects that define style properties of the element.
     * @param nameOverride string or another `IIDRule` object that determines the name of the ID.
     * If this optional parameter is defined, the name will override the Mimcss name assignment
     * mechanism. This might be useful if there is a need for the ID to match a name of another ID.
     * If this parameter is defined as a string, it should not have the `"."` prefix.
     * @returns `IIDRule` object that should be used for getting the ID name and for accessing
     * the style properties if needed.
     */
    public $id( styleset?: CombinedStyleset | CombinedStyleset[], nameOverride?: string | IIDRule): IIDRule
    {
        return new IDRule( this, styleset, nameOverride);
    }



    /**
     * Creates a new style rule for the given HTML or SVG element tags. The `tag` parameter specifies
     * either a single tag or an array of tags. In addition, an asterisk symbol (`"*"`) can be
     * specified to target all elements.
     *
     * When multiple tags are specified, they will be treated as a selector list; that is, they will
     * be separated by commas.
     *
     * **Examples:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // using string for selecting a single elemenet tag;
     *     // produces CSS "tr {}"
     *     tr = this.$tag( "tr", {})
     *
     *     // using array for selecting multiple elemenet tags;
     *     // produces CSS "h1, h2, h3 {}"
     *     header123 = this.$tag( ["h1", "h2", "h3"], {})
     *
     *     // using asterisk to address all elements
     *     // produces CSS "* {}"
     *     all = this.$tag( "*", {})
     * }
     * ```
     *
     * @param tag One or more element tags
     * @param styleset One or more styleset objects that define style properties for the tags.
     * @returns `IStyleRule` object representing the tag rule.
     */
    public $tag( tag: "*" | ElementTagName | ElementTagName[],
        styleset: CombinedStyleset | CombinedStyleset[]): IStyleRule
    {
        return new SelectorRule( this, Array.isArray(tag) ? tag.join(",") : tag, styleset);
    }



    /**
     * Creates a new style rule with an arbitrary complex selector. Selectors can be specified as
     * one or array of [[SelectorItem]] objects where each `SelectorItem` is one of the following
     * types:
     * - string - allows any content but lacks type-safety checks.
     * - any style rule, that is a rule that implements the [[IStyleRule]] interface. This allows
     *   using prevously defined tag, class, ID and other style rules as selector items
     * - [[selector]] function - a tag function that allows convenient mixing of free-format strings
     *   and strongly typed style rules.
     *
     * When multiple selector items are specified, they will be concatenated into a single string.
     *
     * Note that although style rules can be used for selecting element tags, the [[$tag]] function would
     * be more appropriate because it will catch misspellings of tag names.
     *
     * **Examples:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // using a string
     *     style1 = this.$style( "li::before", {})
     *
     *     id = this.$id()
     *     cls = this.$class()
     *
     *     // using an array of style rules. The selector will be "#id.cls"
     *     style2 = this.$style( [this.id, this.cls], {})
     *
     *     // using the selector function. The selector will be "#id > .cls"
     *     style3 = this.$style( css.selector`${this.id} > ${this.cls}`, {})
     *
     *     // using a string for selecting element tag.
     *     h1 = this.$style( "h1", {})
     * }
     * ```
     *
     * @param selector Style rule selector
     * @param styleset One or more styleset objects that define style properties for this selector.
     * @returns `IStyleRule` object representing the style rule.
     */
    public $style( selector: CssSelector, styleset: CombinedStyleset | CombinedStyleset[]): IStyleRule
    {
        return new SelectorRule( this, selector, styleset);
    }



    /**
     * Creates new animation rule. The animation name will be created when the rule is processed as
     * part of the style definition class. The name can be also overridden by providing either an
     * explicit name or another animation rule. The function can be called without parameters just to
     * "declare" the animation. Such animation can be later used either in conditional grouping rules
     * or in derived style definition classes.
     *
     * The returned [[IAnimationRule]] interface represents an object that should be used when
     * using the keyframes name in the `animation-name` or `animation` style properties.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     vanish = this.$keyframes([
     *         [0, { opacity: 100 }],
     *     	   [100, { opacity: 0 }],
     *     ])
     *
     *     vanishingBlock = this.$class({
     *         animation: { name: this.vanish, duration: 2000, count: "infinite", direction: "alternate" }
     *     })
     * }
     * ```
     *
     * @param frames Array of [[AnimationFrame]] objects. Each animation frame contains a waypoint
     * and a styleset.
     * @param nameOverride String or another `IAnimationRule` object that determines the name of the
     * animation. If this optional parameter is defined, the name will override the Mimcss name
     * assignment mechanism. This might be useful if there is a need for the name to match a name of
     * another animation.
     * @returns `IAnimationRule` object that should be used for getting the animation name.
     */
    public $keyframes( frames?: AnimationFrame[], nameOverride?: string | IAnimationRule): IAnimationRule
    {
        return new AnimationRule( this, frames, nameOverride);
    }



    /**
     * Creates new custom variable object that defines a custom CSS property. The variable name will
     * be created when the rule is processed as part of the style definition class. The name can be
     * also overridden by providing either an explicit name or another custom variable rule. The
     * function can be called without specifying the value just to "declare" the variable. Such
     * variable can be later used either in conditional grouping rules or in derived style definition
     * classes.
     *
     * Custom properties defined using the `$var` function are included into the `:root {}` block;
     * however, they can be redefined with different values under any style rule.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // define and use custom CSS property
     *     importantTextColor = this.$var( "color", "red")
     *     important = this.$class({
     *         color: this.importantTextColor
     *     })
     *
     *     // use different value for the custom property under another CSS class
     *     special = this.$class({
     *         "+": this.important,
     *         "--": [ [this.importantTextColor, "maroon"] ]
     *     })
     * }
     * ```
     *
     * @param template Either a name of a style property (in camel-case) or a name of the property from
     * the [[IVarTemplateStyleset]] interface. The type corresponding to this property defines the type
     * of the second parameter.
     * @param value The value assigned to the property.
     * @param nameOverride String or another `IVarRule` object that determines the name of the
     * custom property. If this optional parameter is defined, the name will override the Mimcss name
     * assignment mechanism. This might be useful if there is a need for the name to match a name of
     * existing property. If this parameter is defined as a string, it should not have the `"."` prefix.
     * @returns The `IVarRule` object that represents the custom property. Any usage of this object in
     * style properties or function parameters is substituted by the `var()` CSS function invocation.
     */
    public $var<K extends VarTemplateName>( template: K, value?: ExtendedVarValue<K>,
                    nameOverride?: string | IVarRule<K>): IVarRule<K>
    {
        return new VarRule( this, template, value, nameOverride);
    }



    /**
     * Creates new `@property` rule. The property name will be created when the rule is processed
     * as part of the style definition class. The name can be also overridden by providing either
     * an explicit name or another custom variable rule.
     *
     * This variant allows specifying syntax as one of predefined syntax items such as `<number>`
     * or `<color>` optionally accompanied with the multipliers `"#"` or `"+". The type of initial
     * value as well as the type that can be passed to the `setValue` method of the returned
     * [[IVarRule]] interface will be enforced according to the syntax specified.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // define and use custom CSS property
     *     importantTextColor = this.$property( "<color>", "red", false)
     *     important = this.$class({
     *         color: this.importantTextColor
     *     })
     *
     *     // use different value for the custom property under another CSS class
     *     special = this.$class({
     *         "+": this.important,
     *         "--": [ [this.importantTextColor, "maroon"] ]
     *     })
     * }
     * ```
     *
     * @param syntax Name of the property from the [[ISyntaxTypeStyleset]] interface. The type
     * corresponding to this property defines the type of the initial value parameter.
     * @param initValue The value to be used as initial value of the property.
     * @param inherits Flag indicating whether the custom property registration inherits by default.
     * @param nameOverride String or another `IVarRule` object that determines the name of the
     * custom property. If this optional parameter is defined, the name will override the Mimcss name
     * assignment mechanism. This might be useful if there is a need for the name to match a name of
     * existing property. If this parameter is defined as a string, it should not have the `"."` prefix.
     * @returns The `IVarRule` object that represents the `@property` rule. Any usage of this object in
     * style properties or function parameters is substituted by the `var()` CSS function invocation.
     */
    public $property<K extends keyof ISyntaxTypeStyleset>(
        syntax: K, initValue: ExtendedVarValue<K>, inherits: boolean,
        nameOverride?: string | IVarRule<K>): IVarRule<K>

    /**
     * Creates new `@property` rule. The property name will be created when the rule is processed
     * as part of the style definition class. The name can be also overridden by providing either
     * an explicit name or another custom variable rule.
     *
     * This variant allows specifying arbitrary syntax and the developers are responsible to
     * provide correct syntax. The type of initial value as well as the type that can be passed to
     * the `setValue` method of the returned [[IVarRule]] interface are limited to string. The
     * developers are responsible to pass values that conform to the specified syntax.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // define and use custom CSS property
     *     importantTextColor = this.$property( ["<color># | none"], "red", false)
     *     important = this.$class({
     *         color: this.importantTextColor
     *     })
     *
     *     // use different value for the custom property under another CSS class
     *     special = this.$class({
     *         "+": this.important,
     *         "--": [ [this.importantTextColor, "maroon"] ]
     *     })
     * }
     * ```
     *
     * @param syntax Single-element tuple containing the syntax string.
     * @param initValue The value to be used as initial value of the property.
     * @param inherits Flag indicating whether the custom property registration inherits by default.
     * @param nameOverride String or another `IVarRule` object that determines the name of the
     * custom property. If this optional parameter is defined, the name will override the Mimcss name
     * assignment mechanism. This might be useful if there is a need for the name to match a name of
     * existing property. If this parameter is defined as a string, it should not have the `"."` prefix.
     * @returns The `IVarRule` object that represents the `@property` rule. Any usage of this object in
     * style properties or function parameters is substituted by the `var()` CSS function invocation.
     */
    public $property( syntax: [string], initValue: ExtendedProp<string>, inherits: boolean,
        nameOverride?: string | IVarRule<"*">): IVarRule<"*">;

    // implementation
    $property<K extends keyof ISyntaxTypeStyleset = any, T extends K | [string] = any>(
        syntax: T, initValue: ExtendedVarValue<K>, inherits = true,
        nameOverride?: string | IVarRule<K>): IVarRule<K>
    {
        return new PropertyRule( this, syntax, initValue, inherits, nameOverride);
    }



    /**
     * Creates a "constant" that can be used anywhere the type defined by the `template` parameter can
     * be used. They are called constants, because they provide a convenient and lightweight way of
     * defining values that are unchanged during the application lifetime. Although constants are
     * defined very similarly to custom properties (see the [[$var]] function), they cannot participate
     * in the cascade and cannot be redefined under style rules. Constant can use any expression that
     * satisfies the type defined by the `template` parameter including other constants, custom
     * properties and functions.
     *
     * No CSS rules are created for constants and, due to this fact, constants are preferable to custom
     * properties unless the intention is to change the variable value at run-time or to redefine its
     * value under different style rules.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // defining and using custom CSS property
     *     defaultTextColor = this.$const( "color", "red")
     *     para = this.$style( "p", {
     *         color: this.defaultTextColor
     *     })
     * }
     * ```
     *
     * @param template Either a name of a style property (in camel-case) or a name of the property from
     * the [[IVarTemplateStyleset]] interface. The type corresponding to that property defines the type
     * of the second parameter.
     * @param value The value assigned to the constant.
     * @returns The `IConstRule` object that represents the value of the constant. The value is
     * computed once when the style definition is processed.
     */
    public $const<K extends VarTemplateName>( template: K, value?: ExtendedVarValue<K>): IConstRule
    {
        return new ConstRule( this, template, value);
    }



    /**
     * Creates new counter object. The counter name will be created when the rule is processed as
     * part of the style definition class. The name can be also overridden by providing either an
     * explicit name or another counter rule.
     *
     * Counter rules don't create any CSS rules, but they create unique names that can be used
     * for `counter-reset` and `counter-increment` style properties. Counter rules are usually used
     * in conjunction with the [[counter]] and [[counters]] functions.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     counter = this.$counter()
     *     ol = this.$style( "ol", { counterReset: this.counter, listStyleType: "none" })
     *     li = this.$style( "li", {
     *         counterIncrement: this.counter,
     *         "::before": { content: css.counters( this.counter) }
     *     })
     * }
     * ```
     *
     * @param nameOverride String or another `ICounterRule` object that determines the name of the
     * counter. If this optional parameter is defined, the name will override the Mimcss name
     * assignment mechanism. This might be useful if there is a need for the name to match a name of
     * existing counter.
     * @returns The `ICounterRule` object that represents the counter.
     */
    public $counter( nameOverride?: string | ICounterRule): ICounterRule
    {
        return new CounterRule( this, nameOverride);
    }

    /**
     * Creates new counter style rule. The counter style name will be created when the rule is
     * processed as part of the style definition class. The name can be also overridden by providing
     * either an explicit name or another counter style rule.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     counterStyle = this.$counterStyle({
     *         system: "cyclic",
     *         symbols: ["one", "two", "three"],
     *         suffix: " - "
     *     })
     * }
     * ```
     *
     * @param counterStyleset An object that defines counter style features.
     * @param nameOverride String or another `ICounterStyleRule` object that determines the name of the
     * counter style. If this optional parameter is defined, the name will override the Mimcss name
     * assignment mechanism. This might be useful if there is a need for the name to match a name of
     * existing counter style.
     * @returns The `ICounterStyleRule` object that represents the counter style.
     */
    public $counterStyle( counterStyleset?: ExtendedCounterStyleset,
        nameOverride?: string | ICounterStyleRule): ICounterStyleRule
    {
        return new CounterStyleRule( this, counterStyleset, nameOverride);
    }

    /**
     * Creates a new grid line rule. The line name will be created when the rule is processed as
     * part of the style definition class. The name can be also overridden by providing either an
     * explicit name or another grid line rule. The grid line rules are used to define values of
     * style properties `grid-row-start/end` and `grid-column-start/end`.
     *
     * No CSS rule is created for grid lines - these objects are solely used for creating names, which
     * can be type-safely referred to from style rules.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     gridLineFirst = this.$gridline()
     *     gridLineLast = this.$gridline()
     *
     *     grid = this.$class({
     *         display: "grid",
     *         gridTemplateColumns: [ [this.gridLineFirst], "1fr", "2fr", [this.gridLineLast] ],
     *         gridTemplateRows: css.repeat( 2, "1fr"),
     *     })
     *
     *     first = this.$class({
     *         gridColumnStart: this.gridLineFirst,
     *     })
     *
     *     last = this.$class({
     *         gridColumnEnd: this.gridLineLast,
     *     })
     * }
     * ```
     *
     * @param nameOverride String or another `IGridLineRule` object that determines the name of the
     * line. If this optional parameter is defined, the name will override the Mimcss name
     * assignment mechanism. This might be useful if there is a need for the name to match a name of
     * existing grid line.
     * @param isStartEndOrNone Flag indicating whether the `"-start"` or `"-end"` suffix should be
     * appended to the rule name. If the flag is true, `"-start"` is appended; if the flag is false,
     * `"-end"` is appended; if the flag is undefined, no suffix is appended to the rule name.
     * @returns The `IGridLineRule` object that represents the grid line.
     */
    public $gridline( nameOverride?: string | IGridLineRule,
        isStartEndOrNone?: boolean): IGridLineRule
    {
        return new GridLineRule( this, nameOverride, isStartEndOrNone);
    }



    /**
     * Creates a new grid area rule. The area name will be created when the rule is processed as
     * part of the style definition class. The name can be also overridden by providing either an
     * explicit name or another grid area rule. The grid area rules are used to define values of
     * style properties `grid-area`, `grid-row-start/end`, `grid-column-start/end` and
     * `grid-template-areas`.
     *
     * No CSS rule is created for grid areas - these objects are solely used for creating names, which
     * can be type-safely referred to from style rules.
     *
     * Every grid area defines two grid line rules in each direction, which can be accessed using the
     * [[IGridAreaRule.startLine]] and [[IGridAreaRule.endLine]] properties.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     headerArea = this.$gridarea();
     *     mainArea = this.$gridarea();
     *
     *     grid = this.$class({
     *         display: "grid",
     *         gridTemplateColumns: "1fr",
     *         gridTemplateRows: ["3em", "1fr"],
     *         gridTemplateAreas: [
     *             [this.headerArea, 1,1, 1,1],
     *             [this.mainArea, 2,1, 2,1],
     *         ],
     *     })
     *
     *     header = this.$class({
     *         gridArea: this.headerArea,
     *         backgroundColor: "blue"
     *     })
     *
     *     main = this.$class({
     *         gridArea: this.mainArea,
     *         backgroundColor: "lightgrey"
     *     })
     * }
     * ```
     *
     * @param nameOverride String or another `IGridAreaRule` object that determines the name of the
     * area. If this optional parameter is defined, the name will override the Mimcss name
     * assignment mechanism. This might be useful if there is a need for the name to match a name of
     * existing grid area.
     * @returns The `IGridAreaRule` object that represents the grid area.
     */
    public $gridarea( nameOverride?: string | IGridAreaRule): IGridAreaRule
    {
        return new GridAreaRule( this, nameOverride);
    }



    /**
     * Creates a new `@font-face` rule.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     font = this.$fontface({
     *         fontFamily: "Roboto",
     *         fontStyle: "italic",
     *         fontWeight: 700,
     *         src: {url: 'roboto.woff', format: 'woff'}
     *     });
     * }
     * ```
     *
     * @param fontface Object implementing the `IFontFace` interface defining the parameter of the
     * font to use.
     * @returns The `IFontFaceRule` object that represents the @font-face rule.
     */
    public $fontface( fontface: ExtendedFontFace): IFontFaceRule
    {
        return new FontFaceRule( this, fontface);
    }



    /**
     * Creates a new `@import` rule referencing the given CSS file.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     importedCssFiles = [
     *         this.$import( "common-3rdparty.css"),
     *         this.$import( "small-screen-3rdparty.css", {maxWidth: 600}),
     *     ]
     * }
     * ```
     *
     * @param url URL to the CSS file. Relative URLs are resolved relative to the base URL of the
     * page where the Mimcss library is invoked.
     * @returns The `IImportRule` object that represents the `@import` rule.
     */
    public $import( url: string, mediaQuery?: string | MediaStatement,
        supportsQuery?: string | SupportsStatement): IImportRule
    {
        return new ImportRule( this, url, mediaQuery, supportsQuery);
    }

    /**
     * Creates new `@namespace` rule.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     init = [
     *         this.$namespace( css.WebNamespaces.SVG, "svg")
     *     ]
     * }
     * ```
     *
     * @param namespace Namespace string - use the [[WebNamespaces]] for well-known namespaces.
     * @param prefix Prefix string to use for the namespace.
     * @returns The `INamespaceRule` object that represents the namespace rule.
     */
    public $namespace( namespace: string, prefix?: string): INamespaceRule
    {
        return new NamespaceRule( this, namespace, prefix);
    }

    /**
     * Creates new `@page` rule.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     init = [
     *         this.$page( ":first", { margin: "auto" })
     *     ]
     * }
     * ```
     *
     * @param pseudoClass Optional name of the page pseudo style.
     * @param styleset Styles to apply.
     * @returns The `IPageRule` object that represents the page rule.
     */
    public $page( pseudoClass?: PagePseudoClass, styleset?: Styleset): IPageRule
    {
        return new PageRule( this, pseudoClass, styleset);
    }

    /**
     * Creates a new `@supports` rule.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     cls = this.$class({ color: "red"})
     *
     *     ifGridSupported = this.$media( { display: "grid" },
     *         class extends css.StyleDefinition<MyStyles>
     *         {
     *             cls = this.$class({ color: "pink"})
     *         }
     *     )
     * }
     * ```
     *
     * @param statement Supports statement containing one or more supports queries.
     * @param instOrClass Either style definition class or an instance of a style defintion class.
     * @returns `ISupportsRule` object representing the supports rule
     */
    public $supports<T extends StyleDefinition<StyleDefinition<P>>>( statement: SupportsStatement,
        instOrClass: T | IStyleDefinitionClass<T>): ISupportsRule<T>
    {
        return new SupportsRule( this, statement, instOrClass);
    }

    /**
     * Creates new `@media` rule.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     cls = this.$class({ color: "red"})
     *
     *     ifNarrowScreen = this.$media( { maxWidth: 800 },
     *         class extends css.StyleDefinition<MyStyles>
     *         {
     *             cls = this.$class({ color: "pink"})
     *         }
     *     )
     * }
     * ```
     *
     * @param statement Media statement containing one or more media queries.
     * @param instOrClass Either style definition class or an instance of a style defintion class.
     * @returns `IMediaRule` object representing the media rule
     */
    public $media<T extends StyleDefinition<StyleDefinition<P>>>( statement: MediaStatement,
        instOrClass: T | IStyleDefinitionClass<T>): IMediaRule<T>
    {
        return new MediaRule( this, statement, instOrClass);
    }



    /**
     * Processes the given style definition class or instance and creates unique names for all named
     * entities. For a given style definition class only a single instance is created, no matter how
     * many times this function is invoked. However, if an instance, which has not yet been processed,
     * is passed, then a new set of unique names will be created for it.
     *
     * The `$use` method is used to reference a style definition from another style definition, for
     * example:
     *
     * ```typescript
     * class CommonStyles extends css.StyleDefinition
     * {
     *     error = this.$class({ color: "red"})
     * }
     *
     * class PageStyles extends css.StyleDefinition
     * {
     *     common = this.$use( CommonStyles)
     *
     *     erroMessage = this.$class({
     *         "+": this.common.error,
     *         fontWeight: "bold"
     *     })
     * }
     * ```
     *
     * When the `$use` method is called, the rules from the referenced style definition are not
     * inserted into the DOM; they will be inserted when the style definition class that contains
     * the `$use` call is activated. The same style definition class can be used from several
     * other style definitions: as long as there is at least one referencing style definition that
     * is activated, the rules will be in the DOM; as soon as all referencing style definitions are
     * deactivated, the rules from the referenced definition are removed from the DOM.
     *
     * @param instOrClass Either style definition class or an instance of a style definition class.
     * @returns An instance of the style definition class, which will be activated and deactivated
     * along with the enclosing style definition.
     */
    public $use<T extends StyleDefinition>( instOrClass: T | IStyleDefinitionClass<T>): T
    {
        return processSD( instOrClass) as T;
    }
}



/**
 * Decorator function for style definition classes that will be embedded into an embedding
 * container for the given category. All style definitions for a given category will be activated
 * and deactivated together and their rules will be inserted into a single `<style>` element.
 *
 * **Example:**
 * ```typescript
 * @css.embedded("widgets")
 * class FirstWidgetStyles extends css.StyleDefinition {...}
 *
 * @css.embedded("widgets")
 * class SecondWidgetStyles extends css.StyleDefinition {...}
 * ```
 */
export const embedded = (category: string): ClassDecorator =>
    // we return the function that is the actual decorator.
    embeddedDecorator.bind( undefined, category);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Name generation.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Sets the method uses to generate names of CSS entities. If yes, the names will be created by
 * appending a unique number to the given prefix. If the prefix is not specified, the standard
 * prefix "n" will be used.
 *
 * By default the development version of the library (mimcss.dev.js) uses the [[UniqueScoped]]
 * method and the production version (mimcss.js) uses the [[Optimized]] method. This function can
 * be called to switch to the alternative method of name generation in either the development or
 * the production builds.
 *
 * @param method Indicates what method to use.
 * @param prefix Optional string that will serve as a prefix to which unique numbers will be added
 * to generate optimized names. Ignored if the `method` parameter is anything other than
 * [[NameGenerationMethod.Optimized]].
 */
export const configNameGeneration = (method: NameGenerationMethod, prefix?: string): void =>
	configNames( method, prefix);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Helper functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Concatenates the names of the given classes into a single string that can be assigned to a
 * `class` property of an HTML element. This can be useful when an element should have multiple
 * classes assigned to it and some of these classes are specified as [[IClassRule]] or
 * [[IClassNameRule]] while others are specified as strings.
 *
 * @param classProps Variable argument list of either class names or class rule objects.
 * @returns The string that combines all class names (separated with space) from the input array.
 */
export const classes = (...classProps: ClassPropType[]): string =>
	v2s( classProps, {
		obj: (v: IClassRule | IClassNameRule) => v.name,
		item: classes
	});

/**
 * Chooses the first non-empty name from the given list of classes. This is useful when an element
 * should have a single class applied to it while the class can be chosen from an ordered list or
 * hierarchy of possible choices.
 *
 * @param classProps Variable argument list of either class names or class rule objects.
 * @returns The first non-empty class name from the input array or null if all inputs are empty.
 */
export const chooseClass = (...classProps: ClassPropType[]): string =>
{
    for( let classProp of classProps)
    {
        let name =
            typeof classProp === "string" ? classProp :
            Array.isArray(classProp) ? chooseClass( classProp) :
            classProp && classProp.name;

        // if non-null and non-empty name - return it
        if (name)
            return name;
    }

	return "";
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Rule virtualization and theming.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Decorator that should be applied to a rule if it is defined and used in the same style
 * definition class but then is overridden in a derived style definition class. The problem
 * this solves is this: when a rule is defined in a base class and then overridden in a derived
 * class, when an instance of the derived class is created, the rules that are created in the
 * base and derived classes see different values of the rule. Since our rules are defined as
 * part of the constructor, the base class constructor's code only sees the value assigned in that
 * code. If another rule in the base class uses this first rule, this value is remembered.
 *
 * The `@virtual` decorator creates a Proxy object for the rule with the handler that keeps the
 * most recent value set. Thus when a rule in the base class's constructor uses a virtualized
 * rule, the first rule will see the overridden value of the rule when accessed in the
 * post-constructor code.
 *
 * @deprecated This decorator is deprecated as all rules defined in style definition classes are
 * always virtualized.
 */
export const virtual = (target: any, name: string): void => {};



/**
 * The `ThemeDefinition` class is a base for all classes that define themes. In addition to
 * being a style definition class, themes provide some extra capabilities related to style
 * inheritance and theme activation.
 *
 * @typeparam P Parent style definition class. Parent of a top-level class is null.
 */
export abstract class ThemeDefinition<P extends StyleDefinition = any> extends StyleDefinition<P>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Activation.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Activates the given style definition class or instance and inserts all its rules into DOM. If
 * the class is not yet associated with an instance, the instance is first created and processed.
 * Note that each style definition instance maintains a reference counter of how many times it was
 * activated and deactivated. The rules are inserted into DOM only upon first activation.
 *
 * Activating a class (as opposed to activating a directly created instance) is intended for
 * "global" CSS entities - that is, entities that are used throughout the application or
 * application area. No matter how many times a class is activated or how many times it is used
 * from other style definitions, a single instance is created and used by Mimcss.
 *
 * **Example**
 * ```typescript
 * class CommonStyles extends css.StyleDefinition
 * {
 *     red = this.$class({ color: red })
 * }
 *
 * class MyComponent
 * {
 *     private styles: CommonStyles;
 *
 *     // Activate class
 *     willMount() { this.styles = css.activate( CommonStyles); }
 *     willUnmount() { css.deactivate( this.styles); }
 *     render() { return <div className={this.styles.red.name}</div> }
 * }
 * ```
 *
 * Activating an instance (as opposed to activating a class) is intended for "scoped" CSS entities -
 * that is, entities that apply to instances of certain components, a.k.a. *Styled Components*.
 * In this approach, every instance of a component creates its own instance of the style definition
 * class and Mimcss will create independent instances of CSS rules specific (*scoped*) to each
 * component instance.
 *
 * **Example**
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     red = this.$class({ color: red })
 * }
 *
 * class MyComponent
 * {
 *     // Create style definition directly
 *     private styles = new MyStyles();
 *
 *     // Activate instance
 *     willMount() { this.styles = css.activate( this.styles); }
 *     willUnmount() { css.deactivate( this.styles); }
 *     render() { return <div className={this.styles.red.name}</div> }
 * }
 * ```
 *
 * @typeparam T Type of the style definition class or instance passed to the function. This is
 * also the type, which is returned form the function.
 * @param instOrClass Style definition class or instance
 * @param schedulerType Identifier of a pre-defined or registered scheduler. If not specified, the
 * scheduler set as default will be used.
 * @returns Instance of the style definition class - either created (if this was the first
 * activation of the class) or already associated with the class. If the input parameter is an
 * instance (as opposed to a class), the return value is the same instance.
 */
export const activate = <T extends IStyleDefinition>( instOrClass: T | IStyleDefinitionClass<T>,
	schedulerType?: number): T =>
{
	let instance = processSD( instOrClass) as T;
	if (instance)
        getActivator(schedulerType).activate( instance);

	return instance;
}



/**
 * Deactivates the given style definition instance by removing its rules from DOM. Note that each
 * style definition instance maintains a counter of how many times it was activated and
 * deactivated. The rules are removed from DOM only when this counter goes down to 0.
 *
 * @param sd Instance of a style definition class to be deactivated.
 * @param schedulerType Identifier of a pre-defined or registered scheduler. If not specified, the
 * scheduler set as default will be used.
 */
export const deactivate = (sd: IStyleDefinition, schedulerType?: number): void =>
	getActivator(schedulerType).deactivate( sd);



/**
 * Returns the theme definition object, which is currently active for the given theme declaration
 * class.
 * @param themeClass Theme declaration class
 * @returns Theme instance, which is currently active for the given theme class or undefined
 * if no instance is currently active.
 */
export const getActiveTheme = (themeClass: IStyleDefinitionClass<ThemeDefinition>): ThemeDefinition | undefined =>
    getCurrentTheme( themeClass);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// SSR support.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Starts server-side activation functionality. Throws an error if non-default activation
 * context is already set. This function should be called before any style definitions that
 * are part of the application are activated.
 *
 * Calling this function causes all activated style definitions to be serialized to a string,
 * which can be retrieved by calling the [[stopSSR]] function.
 */
export const startSSR = (): void => s_startSSR();

/**
 * Stops server-side activation functionality and returns a string with serialized styles style
 * definitions that were activated during application rendering. The string should be added to
 * the `<head>` element of the HTML page using `insertAdjacentHTML()` method.
 *
 * Throws an error if SSR has not been started.
 * @returns String containing serialized styles.
 */
export const stopSSR = (): string => s_stopSSR();



/**
 * Starts hydration activation functionality. Throws an error if non-default activation context is
 * already set.
 *
 * Calling this function causes all activated style definitions to find appropriate `<style>`
 * elements instead of creating new ones. The functionality assumes that those elements were put
 * to the HTML during server-side page rendering. It also assumes that the style definitions and
 * the rules defined in these style definitions are exaclty the same, and the rules are in the same
 * order as they were during the server-side rendering. Otherwise the behavior is unpredictable.
 */
export const startHydration = (): void => s_startHydration();

/**
 * Stops hydration activation functionality and restore the default activation context. After this
 * function is called, all style activations will create new `<style>` elements in the HTML.
 *
 * Throws an error if SSR has not been started.
 */
export const stopHydration = (): void => s_stopHydration();



