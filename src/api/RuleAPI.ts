/**
 * This module describes functions used to create rules within style definition classes andsome
 * helper types and functions
 */



import {CssSelector, PagePseudoClass} from "../api/BasicTypes";
import {
    CombinedStyleset, IStyleRule, IClassRule, IIDRule, AnimationFrame, IAnimationRule, IVarRule,
    ICounterRule, IGridLineRule, IGridAreaRule, IImportRule, IFontFaceRule, INamespaceRule,
    IPageRule, StyleDefinition, IStyleDefinitionClass, ISupportsRule, IMediaRule, IClassNameRule, IConstRule
} from "./RuleTypes";
import {SupportsQuery, Styleset, VarTemplateName, ExtendedVarValue} from "./StyleTypes";
import {processInstanceOrClass, s_enableShortNames, serializeInstance} from "../rules/RuleContainer";
import {MediaQuery} from "./MediaAPI"
import {IFontFace} from "./FontFaceAPI";
import {AbstractRule, ClassRule, IDRule, SelectorRule} from "../rules/StyleRules"
import {AnimationRule} from "../rules/AnimationRule"
import {VarRule, ConstRule} from "../rules/VarRule"
import {CounterRule} from "../rules/CounterRules";
import {GridLineRule, GridAreaRule} from "../rules/GridRules";
import {FontFaceRule, ImportRule, NamespaceRule, PageRule, ClassNameRule} from "../rules/MiscRules"
import {SupportsRule, MediaRule} from "../rules/GroupRules"
import {val2str} from "../impl/UtilFuncs";
import {IRuleSerializationContext} from "../rules/Rule";



/**
 * Creates a new abstract rule, which defines a styleset that can be extended by other style rules.
 * Abstract rules don't have selectors and are not inserted into the DOM. Abstract rules can
 * themselves extend other rules - both abstract and non-abstract.
 *
 * @param styleset Styleset that will be inherited by style rules that extend this abstract rule.
 * @returns `IStyleRule` object that should be used by the derived rules in the `"+"` property.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     colorBox = css.$abstract({
 *         backgroundColor: "orange",
 *         borderRadius: "10%",
 *         border: [4, "solid", "red"],
 *         ":hover": {
 *             opacity: 0.7
 *         }
 *     })
 *
 *     box1 = css.$class({
 *         "+": this.colorBox,
 *         width: 200,
 *         height: 200,
 *     })
 *
 *     box2 = css.$class({
 *         "+": this.colorBox,
 *         width: 600,
 *         height: 400,
 *     })
 * }
 * ```
 */
export function $abstract( styleset: CombinedStyleset): IStyleRule
{
	return new AbstractRule( styleset);
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
 * @param styleset Styleset that defines style properties of the class.
 * @param nameOverride string or another `IClassRule` object that determines the name of the class.
 * If this optional parameter is defined, the name will override the Mimcss name assignment
 * mechanism. This might be useful if there is a need for the class to match a name of another,
 * probably external, class.
 * @returns `IClassRule` object that should be used for getting the class name and for accessing
 * the style properties if needed.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     vbox = css.$class({
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
*/
export function $class( styleset?: CombinedStyleset, nameOverride?: string | IClassRule): IClassRule
{
	return new ClassRule( styleset, nameOverride);
}



/**
 * Creates a new class name rule, which combines one or more other class names. This creates a
 * "synonym" that is easier to apply to an element's class attribute than an array of two or
 * more class rules.
 *
 * @param ...classes List of class names specified either as a string or `IClassRule` objects.
 * @returns `IClassNameRule` object whose `name` property contains the combined class name. The
 * `cssClassName` property contains the combined selector, e.g. `.class1.class2`.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // declare class - just to be used later
 *     spaced = css.class()
 *
 *     vbox = css.$class({
 *         display: "flex",
 *         flexDirection: "column",
 *         alignItems: "center",
 *         "&": [
 *             [this.spaced, {
 *                 gap: 8
 *             }
 *         ]
 *     })
 *
 *     // use $classname rule to combine the names of classes vbox and spaced
 *     spacedVbox = css.$classname( this.vbox, this.spaced)
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
 *
 * ```
 */
export function $classname( ...classes: (IClassRule | IClassNameRule | string)[]): IClassNameRule
{
	return new ClassNameRule( classes);
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
 * @param styleset Styleset that defines style properties of the element.
 * @param nameOverride string or another `IIDRule` object that determines the name of the ID.
 * If this optional parameter is defined, the name will override the Mimcss name assignment
 * mechanism. This might be useful if there is a need for the ID to match a name of another ID.
 * @returns `IIDRule` object that should be used for getting the ID name and for accessing
 * the style properties if needed.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     container = css.$id({
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
 */
export function $id( styleset?: CombinedStyleset, nameOverride?: string | IIDRule): IIDRule
{
	return new IDRule( styleset, nameOverride);
}



/**
 * Creates a new style rule with an arbitrary complex selector. Selectors can be specified as
 * one or array of [[SelectorItem]] objects where each `SelectorItem` is one of the following
 * types:
 * - string - allows any content but lacks type-safety checks.
 * - any style rule, that is a rule that implements the [[IStyleRule]] interface. This allows
 *   using prevously defined class, ID and other style rules as selector items
 * - [[selector]] function - a tag function that allows convenient mixing of free-format strings
 *   and strongly typed style rules.
 *
 * When multiple selector items are specified, they will be treated as the selector list; that is,
 * they will be separated by commas.
 *
 * @param selector One or more [[SelectorItem]] objects
 * @param styleset Styleset that defines style properties for this selector.
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // using string for selecting elemnet type
 *     h1 = css.$style( "h1", {})
 *
 *     // using string for a slightly more complex selector
 *     style1 = css.$style( "*, ::after, ::before", {})
 *
 *     id = css.$id()
 *     cls = css.$class()
 *
 *     // using an array of style rules. The selector will be "#id, .cls"
 *     style1 = css.$style( [this.id, this.cls], {})
 *
 *     // using the selector function. The selector will be "#id > .cls"
 *     style1 = css.$style( css.selector`[this.id] > [this.cls]`, {})
 * }
 */
export function $style( selector: CssSelector, styleset: CombinedStyleset): IStyleRule
{
	return new SelectorRule( selector, styleset);
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
 * @param frames Array of [[AnimationFrame]] objects. Each animation frame contains a waypoint
 * and a styleset.
 * @param nameOverride Atring or another `IAnimationRule` object that determines the name of the
 * animation. If this optional parameter is defined, the name will override the Mimcss name
 * assignment mechanism. This might be useful if there is a need for the name to match a name of
 * another animation.
 * @returns `IAnimationRule` object that should be used for getting the animation name.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     vanish = css.$keyframes([
 *         [0, { opacity: 100 }],
 *     	   [100, { opacity: 0 }],
 *     ])
 *
 *     vanishingBlock = css.$class({
 *         animation: { name: this.vanish, duration: 2000, count: "infinite", direction: "alternate" }
 *     })
 * }
 */
export function $keyframes( frames?: AnimationFrame[],
	nameOverride?: string | IAnimationRule): IAnimationRule
{
	return new AnimationRule( frames, nameOverride);
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
 * @param template Either a name of a style property (in camel-case) or a name of the property from
 * the [[ICssVarTemplates]] interface. The type corresponding to that property defines the type
 * of the second parameter.
 * @param value The value assigned to the property.
 * @param nameOverride String or another `IVarRule` object that determines the name of the
 * custom property. If this optional parameter is defined, the name will override the Mimcss name
 * assignment mechanism. This might be useful if there is a need for the name to match a name of
 * existing property.
 * @returns The `IVarRule` object that represents the custom property. Any usage of this object in
 * style properties or function parameters is substituted by the `var()` CSS function invocation.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // defining and using custom CSS property
 *     importantTextColor = css.$var( "color", "red")
 *     important = css.$class({
 *         color: this.importantTextColor
 *     })
 *
 *     // use different value for the custom property under another CSS class
 *     special = css.$class({
 *         "+": this.important,
 *         "--": [ [this.importantTextColor, "maroon"]]
 *     })
 * }
 */
export function $var<K extends VarTemplateName>( template: K, value?: ExtendedVarValue<K>,
				nameOverride?: string | IVarRule<K>): IVarRule<K>
{
	return new VarRule( template, value, nameOverride);
}



/**
 * Creates a "constant" that can be used anywhere the type defined by the `template` parameter can
 * be used. They are called constants, because they provide a convenient and lightweight way of
 * defining values that are unchanged during the application lifetime. Although constants are
 * defined very similarly to custom properties (see the [[var]] function), they cannot participate
 * in the cascade and cannot be redefined under style rules. Constant can use any expression that
 * satisfies the type defined by the `template` parameter including other constants, custom
 * properties and functions.
 *
 * No CSS rules are created for costants and due to this fact constants are preferable to custom
 * properties unless the intention is to change the variable value at run-time or to redefine its
 * value under different style rules.
 *
 * @param template Either a name of a style property (in camel-case) or a name of the property from
 * the [[ICssVarTemplates]] interface. The type corresponding to that property defines the type
 * of the second parameter.
 * @param value The value assigned to the constant.
 * @returns The `IConstRule` object that represents the value of the constant. The value is
 * computed once when the style definition is processed.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // defining and using custom CSS property
 *     defaultTextColor = css.$const( "color", "red")
 *     para = css.$style( "p", {
 *         color: this.defaultTextColor
 *     })
 * }
 */
export function $const<K extends VarTemplateName>( template: K, value?: ExtendedVarValue<K>): IConstRule
{
	return new ConstRule( template, value);
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
 * @param nameOverride String or another `ICounterRule` object that determines the name of the
 * counter. If this optional parameter is defined, the name will override the Mimcss name
 * assignment mechanism. This might be useful if there is a need for the name to match a name of
 * existing counter.
 * @returns The `ICounterRule` object that represents the counter.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     counter = css.$counter()
 *     ol = css.$style( "ol", { counterReset: this.counter, listStyleType: "none" })
 *     li = css.$style( "li", {
 *         counterIncrement: this.counter,
 *         "::before": { content: css.counters( this.counter) }
 *     })
 * }
 */
export function $counter( nameOverride?: string | ICounterRule): ICounterRule
{
	return new CounterRule( nameOverride);
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
 * @param nameOverride String or another `IGridLineRule` object that determines the name of the
 * line. If this optional parameter is defined, the name will override the Mimcss name
 * assignment mechanism. This might be useful if there is a need for the name to match a name of
 * existing grid line.
 * @param isStartEndOrNone Flag indicating whether the `"-start"` or `"-end"` suffix should be
 * appended to the rule name. If the flag is true, `"-start"` is appended; if the flag is false,
 * `"-end"` is appended; if the flag is undefined, no suffix is appended to the rule name.
 * @returns The `IGridLineRule` object that represents the grid line.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     gridLineFirst = css.$gridline()
 *     gridLineLast = css.$gridline()
 *
 *     grid = css.$class({
 *         display: "grid",
 *         gridTemplateColumns: [ [this.gridLineFirst], "1fr", "2fr", [this.gridLineLast] ],
 *         gridTemplateRows: css.repeat( 2, "1fr"),
 *     })
 *
 *     first = css.$class({
 *         gridColumnStart: this.gridLineFirst,
 *     })
 *
 *     last = css.$class({
 *         gridColumnEnd: this.gridLineLast,
 *     })
 * }
 */
export function $gridline( nameOverride?: string | IGridLineRule,
    isStartEndOrNone?: boolean): IGridLineRule
{
	return new GridLineRule( nameOverride, isStartEndOrNone);
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
 * @param nameOverride String or another `IGridAreaRule` object that determines the name of the
 * area. If this optional parameter is defined, the name will override the Mimcss name
 * assignment mechanism. This might be useful if there is a need for the name to match a name of
 * existing grid area.
 * @returns The `IGridAreaRule` object that represents the grid area.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     headerArea = css.$gridarea();
 *     mainArea = css.$gridarea();
 *
 *     grid = css.$class({
 *         display: "grid",
 *         gridTemplateColumns: "1fr",
 *         gridTemplateRows: ["3em", "1fr"],
 *         gridTemplateAreas: [
 *             [this.headerArea, 1,1, 1,1],
 *             [this.mainArea, 2,1, 2,1],
 *         ],
 *     })
 *
 *     header = css.$class({
 *         gridArea: this.headerArea,
 *         backgroundColor: "blue"
 *     })
 *
 *     main = css.$class({
 *         gridArea: this.mainArea,
 *         backgroundColor: "lightgrey"
 *     })
 * }
 */
export function $gridarea( nameOverride?: string | IGridAreaRule): IGridAreaRule
{
	return new GridAreaRule( nameOverride);
}



/**
 * Creates a new `@font-face` rule.
 *
 * @param fontface Object implementing the `IFontFace` interface defining the parameter of the
 * font to use.
 * @returns The `IFontFaceRule` object that represents the font-face rule.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     font = css.$fontface({
 *         fontFamily: "Roboto",
 *         fontStyle: "italic",
 *         fontWeight: 700,
 *         src: {url: 'roboto.woff', format: 'woff'}
 *     });
 * }
 */
export function $fontface( fontface: IFontFace): IFontFaceRule
{
	return new FontFaceRule( fontface);
}



/**
 * Creates a new `@import` rule referencing the given CSS file.
 */
export function $import( url: string, mediaQuery?: string | MediaQuery,
	supportsQuery?: string | SupportsQuery): IImportRule
{
	return new ImportRule( url, mediaQuery, supportsQuery);
}

/**
 * Creates new namespace rule.
 */
export function $namespace( namespace: string, prefix?: string): INamespaceRule
{
	return new NamespaceRule( namespace, prefix);
}

/**
 * Creates new page rule.
 */
export function $page( pseudoClass?: PagePseudoClass, styleset?: Styleset): IPageRule
{
	return new PageRule( pseudoClass, styleset);
}

/**
 * Creates new supports rule.
 */
export function $supports<T extends StyleDefinition>( query: SupportsQuery,
    instOrClass: T | IStyleDefinitionClass<T>): ISupportsRule<T>
{
	return new SupportsRule( query, instOrClass);
}

/**
 * Creates new media rule.
 */
export function $media<T extends StyleDefinition>( query: string | MediaQuery,
    instOrClass: T | IStyleDefinitionClass<T>): IMediaRule<T>
{
	return new MediaRule( query, instOrClass);
}



/**
 * Processes the given style definition class or instance and creates unique names for all named
 * entities. For a given style definition class only a single instance is created, no matter how
 * many times this function is invoked. However, if an instance, which has not yet been processed,
 * is passed, then a new set of unique names will be created for it.
 */
export function $use<T extends StyleDefinition>( instOrClass: T | IStyleDefinitionClass<T>): T | null
{
	return processInstanceOrClass( instOrClass) as T;
}



/**
 * Embeds the given style definition class into another style definition object. When activated,
 * the embedded object doesn't create its own `<style>` element but uses that of its owner. This
 * allows creating many small style definition classes instead of one huge one without incurring
 * the overhead of many `<style>` elements.
 *
 * Note that as opposed to the $use function, the $embed function always creates a new instance of
 * the given class and doesn't associate the class with the created instance. That means that if
 * a class is embedded into more than one "owner", two separate instances of each CSS rule will be
 * created with different unique names.
 */
export function $embed<T extends StyleDefinition>( instOrClass: T | IStyleDefinitionClass<T>): T | null
{
	// return definition instance without processing it. This is the indication that the defintion
	// will be embedded into another definition.
	return instOrClass instanceof StyleDefinition ? instOrClass : new instOrClass();
}



/**
 * Sets the flag indicating whether to use optimized (short) rule names. If yes, the names
 * will be created by appending a unique number to the given prefix. If the prefix is not
 * specified, the standard prefix "n" will be used.
 * @param enable
 * @param prefix
 */
export function enableShortNames( enable: boolean, prefix?: string): void
{
	return s_enableShortNames( enable, prefix);
}



/**
 * Type for defining the class property of HTML elements.
 */
export type ClassPropType = string | IClassRule | IClassNameRule | ClassPropType[];

/**
 * Concatenates the names of the given classes into a single string that can be assigned to a
 * `class` property of an HTML element.
 * @param classProps
 */
export function classes( ...classProps: ClassPropType[]): string
{
	return val2str( classProps, {
		arrItemFunc: v => v instanceof ClassRule ? v.name : classes(v)
	});
}

/**
 * Chooses the first non-null name from the given list of classes.
 * @param classProps
 */
export function chooseClass( ...classProps: ClassPropType[]): string | null
{
    for( let cls of classProps)
    {
        if (!cls)
            continue;
        else if (typeof cls === "string")
            return cls;
        else if (Array.isArray(cls))
        {
            let name = chooseClass( cls);
            if (name)
                return name;
        }
        else if (cls.name)
            return cls.name;
    }

	return null;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Style definition serialization.
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The ICssSerializer interface allows adding style definition classes and objects
 * and serializing them to a single string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
export interface ICssSerializer
{
    /**
     * Adds style definition class or instance.
     */
    add( instOrClass: StyleDefinition | IStyleDefinitionClass): void;

    /**
     * Returns concatenated string representation of all CSS rules added to the context.
     */
    serialize(): string;
}



/**
 * Creates a new ICssSerializer object that allows adding style definition classes
 * and instances and serializing them to a string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
export function createCssSerializer(): ICssSerializer
{
    return new CssSerializer();
}



/**
 * Serializes one or more style definition classes and instances and returns their CSS string
 * representation. This can be used for server-side rendering when the resultant string can be
 * set as the content of a `<style>` element.
 */
export function serializeToCSS( arg1: StyleDefinition | IStyleDefinitionClass,
    ...args: (StyleDefinition | IStyleDefinitionClass)[]): string
{
    let serializer = new CssSerializer();
    serializer.add( arg1);
    if (args.length > 0)
        args.forEach( instOrClass => serializer.add( instOrClass));

    return serializer.serialize();
}



/**
 * The StyleSerializer class allows adding style definition classes and objects
 * and serializing them to a single string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
class CssSerializer implements ICssSerializer
{
    /**
     * Adds style definition class or instance.
     */
    public add( instOrClass: StyleDefinition | IStyleDefinitionClass): void
    {
        let instance = processInstanceOrClass( instOrClass);
        if (!instance || this.instances.has(instance))
            return;

        this.instances.add( instance);
    }

    /**
     * Returns concatenated string representation of all CSS rules added to the context.
     */
    public serialize(): string
    {
        let ctx = new RuleSerializationContext();
        this.instances.forEach( instance => ctx.addStyleDefinition( instance));
        return ctx.topLevelBuf + ctx.nonTopLevelBuf;
    }

    // Set of style definition instances. This is needed to not add style definitions more than once
    instances = new Set<StyleDefinition>();
}



/**
 * The StyleSerializer class allows adding style definition classes and objects
 * and serializing them to a single string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
class RuleSerializationContext implements IRuleSerializationContext
{
    // Adds rule text
    public addRuleText( s: string, isTopLevelRule?: boolean): void
    {
        if (isTopLevelRule)
            this.topLevelBuf += s + "\n";
        else
            this.nonTopLevelBuf += s + "\n";
    }

    // Adds rule text
    public addStyleDefinition( instance: StyleDefinition): void
    {
        if (!this.instances.has( instance))
        {
            this.instances.add( instance);
            serializeInstance( instance, this);
        }
    }

    // String buffer that accumulates top-level rule texts.
    public topLevelBuf = "";

    // String buffer that accumulates non-top-level rule texts.
    public nonTopLevelBuf = "";

    // Set of style definition instances that were already serialized in this context.
    private instances = new Set<StyleDefinition>();
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Rule virtualization.
//
///////////////////////////////////////////////////////////////////////////////////////////////

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
 */
export function virtual( target: any, name: string)
{
    // symbol to keep the proxy handler value
    let sym = Symbol(name + "_proxy_handler");

    Object.defineProperty( target, name, {
        enumerable: true,
        get()
        {
            // check whether we already have the handler and create it if we don't. In this
            // case we also create a proxy for an empty object
            let handler = this[sym] as VirtHandler;
            if (!handler)
            {
                this[sym] = handler = new VirtHandler();
                handler.proxy = new Proxy( {}, handler);
            }

            return handler.proxy;
        },

        set(v)
        {
            // depending on the object type we may have a different object to pass to the proxy;
            // also we need to know whether the object is a special (internal to JavaScript) one
            // and the handler will have to treat it specially
            let [newTarget, isSpecial] = getProxiableObject(v);

            // check whether we already have the handler and create it if we don't
            let handler = this[sym] as VirtHandler;
            if (!handler)
            {
                this[sym] = handler = new VirtHandler();
                handler.proxy = newTarget == null ? {} : new Proxy( newTarget, handler);
            }

            // set the new vaules to the handler so that it will use it from now on
            handler.target = newTarget;
            handler.isSpecial = isSpecial;
        }
    });
}



/**
 * For the given value returns a two-element tuple:
 * - the first element is the value that should be passed to a proxy. For objects, it is the input
 *   value. For primitive types it is the boxed object (e.g. Number for numbers). For null and
 *   undefined it is null and undefined respectively
 * - the second element is the "special" flag, which is true if the proxy handler will have to have
 *   a special treatment the objects' methods; that is, it will have to bind them to the target
 *   object before returning them from the get method. This is true for "internal" JavaScript
 *   classes like boxed primitive types, Map, Set, Promise and some others.
 */
function getProxiableObject( v: any): [any, boolean]
{
    if (v == null)
        return [v, false];
    else if (typeof v === "string")
        return [new String(v), true];
    else if (typeof v === "number")
        return [new Number(v), true];
    else if (typeof v === "boolean")
        return [new Boolean(v), true];
    else if (typeof v === "symbol")
        return [new Object(v), true];
    else if (typeof v === "object" && (v instanceof Map || v instanceof Set))
        return [v, true];
    else
        return [v, false];
}



/**
 * Handler for the proxy created by the `@virtual` decorator. It keeps the current value of a
 * rule so that the most recent value is used whenever the proxy is accessed.
 */
class VirtHandler implements ProxyHandler<any>
{
    public proxy: any;
    public target: any;
    public isSpecial: boolean;

    // interesting things happen in the get method
    get( t: any, p: PropertyKey, r: any): any
    {
        // if our value is null or undefined and the requested property is a well-known symbol
        // toPrimitive we return a function that returns either null or undefined. This will help
        // if our proxy either participate in an arithmetic expression or or is combined with a
        // string.
        if (this.target == null && p === Symbol.toPrimitive)
            return () => this.target;

        // get the value of the request property; if the value is null or undefined, an exception
        // will be thrown - which is expected.
        let pv = Reflect.get( this.target, p, r);

        // if the requested property is a function of a boxed primitive, bind the original method
        // to the target object
        return this.isSpecial && typeof pv === "function" ? pv.bind( this.target) : pv;
    }

    // the rest of the methods mostly delegate the calls to the latest target instead of the
    // original target. In some cases, we check whether the target is null or undefined so that
    // we don'tthrow exceptions wher we can avoid it.

    getPrototypeOf( t: any): object | null
        { return this.target == null ? null : Reflect.getPrototypeOf( this.target); }
    setPrototypeOf(t: any, v: any): boolean
        { return Reflect.setPrototypeOf( this.target, v); }
    isExtensible(t: any): boolean
        { return this.target == null ? false : Reflect.isExtensible( this.target); }
    preventExtensions(t: any): boolean
        { return this.target == null ? false : Reflect.preventExtensions( this.target); }
    getOwnPropertyDescriptor(t: any, p: PropertyKey): PropertyDescriptor | undefined
        { return Reflect.getOwnPropertyDescriptor( this.target, p); }
    has(t: any, p: PropertyKey): boolean
        { return this.target == null ? false : Reflect.has( this.target, p); }
    set( t: any, p: PropertyKey, v: any, r: any): boolean
        { return Reflect.set( this.target, p, v, r); }
    deleteProperty(t: any, p: PropertyKey): boolean
        { return Reflect.deleteProperty( this.target, p); }
    defineProperty(t: any, p: PropertyKey, attrs: PropertyDescriptor): boolean
        { return Reflect.defineProperty( this.target, p, attrs); }
    enumerate(t: any): PropertyKey[]
        { return Array.from( Reflect.enumerate( this.target)); }
    ownKeys(t: any): PropertyKey[]
        { return Reflect.ownKeys( this.target); }
    apply(t: any, thisArg: any, args?: any): any
        { return this.target.apply( this, args); }
    construct(t: any, args: any, newTarget?: any): object
        { return Reflect.construct( this.target, args, newTarget); }
}



