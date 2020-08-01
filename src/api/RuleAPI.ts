﻿import {
    CombinedStyleset, IStyleRule, IClassRule, IIDRule, AnimationFrame, IAnimationRule, IVarRule,
    ICounterRule, IGridLineRule, IGridAreaRule, IImportRule, IFontFaceRule, INamespaceRule,
    IPageRule, StyleDefinition, IStyleDefinitionClass, ISupportsRule, IMediaRule, IClassNameRule
} from "../rules/RuleTypes";
import {processInstanceOrClass, s_enableShortNames, serializeInstance} from "../rules/RuleContainer";
import {Extended} from "../styles/UtilTypes";
import {SupportsQuery, Styleset, VarTemplateName, VarValueType} from "../styles/StyleTypes";
import {CssSelector, PagePseudoClass} from "../styles/SelectorTypes";
import {MediaQuery} from "../styles/MediaTypes"
import {IFontFace} from "../styles/FontFaceTypes";
import {AbstractRule, ClassRule, IDRule, SelectorRule} from "../rules/StyleRules"
import {AnimationRule} from "../rules/AnimationRule"
import {VarRule} from "../rules/VarRule"
import {CounterRule} from "../rules/CounterRules";
import {GridLineRule, GridAreaRule} from "../rules/GridRules";
import {FontFaceRule, ImportRule, NamespaceRule, PageRule, ClassNameRule} from "../rules/MiscRules"
import {SupportsRule, MediaRule} from "../rules/GroupRules"
import {val2str} from "../styles/UtilFuncs";
import {IRuleSerializationContext} from "../rules/Rule";



/**
 * Creates new abstract rule, which defines a styleset that can be extended by other style
 * rules. Abstract rules don't have selectors and are not inserted into DOM.
 */
export function $abstract( style: CombinedStyleset): IStyleRule
{
	return new AbstractRule( style);
}

/**
 * Creates new class rule. The class name will be created when the rule is processed as part of
 * the style definition class. The name can be also overridden by providing either an explicit
 * name or another class rule. The function can be called without parameters just to "declare"
 * the class. Such class can be later used either in conditional grouping rules or in derived
 * style definition classes.
 */
export function $class( style?: CombinedStyleset,
    nameOverride?: string | IClassRule | IClassNameRule): IClassRule
{
	return new ClassRule( style, nameOverride);
}

/**
 * Creates new class name rule, which combines one or more other class names. This creates a
 * "synonym" that is easier to apply to an element's class attribute than an array of two or
 * more clas rules.
 */
export function $classname( ...classes: (IClassRule | IClassNameRule | string)[]): IClassNameRule
{
	return new ClassNameRule( classes);
}

/**
 * Creates new ID rule. The ID name will be created when the rule is processed as part of
 * the style definition class. The name can be also overridden by providing either an explicit
 * name or another ID rule. The function can be called without parameters just to "declare"
 * the ID. Such ID can be later used either in conditional grouping rules or in derived
 * style definition classes.
 */
export function $id( style?: CombinedStyleset, nameOverride?: string | IIDRule): IIDRule
{
	return new IDRule( style, nameOverride);
}

/**
 * Creates new selector rule. Selector can be specified as a string or via the selector function.
 */
export function $style( selector: CssSelector, style: CombinedStyleset): IStyleRule
{
	return new SelectorRule( selector, style);
}

/**
 * Creates new animation rule. The animation name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another animation rule. The function can be called without parameters just to
 * "declare" the animation. Such animation can be later used either in conditional grouping rules
 * or in derived style definition classes.
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
 */
export function $var<K extends VarTemplateName>( template: K, propVal?: VarValueType<K>,
				nameOverride?: string | IVarRule<K>): IVarRule<K>
{
	return new VarRule( template, propVal, nameOverride);
}

/**
 * Creates new counter object. The counter name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another counter rule.
 */
export function $counter( nameOverride?: string | ICounterRule): ICounterRule
{
	return new CounterRule( nameOverride);
}

/**
 * Creates new grid line object. The line name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another grid line rule.
 */
export function $gridline( nameOverride?: string | IGridLineRule,
    isStartEndOrNone?: boolean): IGridLineRule
{
	return new GridLineRule( nameOverride, isStartEndOrNone);
}

/**
 * Creates new grid area object. The area name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another grid area rule.
 */
export function $gridarea( nameOverride?: string | IGridAreaRule): IGridAreaRule
{
	return new GridAreaRule( nameOverride);
}

/**
 * Creates new import rule.
 */
export function $import( url: string, mediaQuery?: string | MediaQuery,
	supportsQuery?: string | SupportsQuery): IImportRule
{
	return new ImportRule( url, mediaQuery, supportsQuery);
}

/**
 * Creates new font-face rule.
 */
export function $fontface( fontface: IFontFace): IFontFaceRule
{
	return new FontFaceRule( fontface);
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
export function $page( pseudoClass?: PagePseudoClass, style?: Styleset): IPageRule
{
	return new PageRule( pseudoClass, style);
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
 * Concatenates the names of the given classes into a single string that can be assigned to a
 * `class` property of an HTML element.
 * @param classes
 */
export function classes( ...classes: (IClassRule | Extended<string>)[]): string
{
	return val2str( classes, {
		arrItemFunc: v => v instanceof ClassRule ? v.name : val2str(v)
	});
}



/**
 * The IStyleSerializationContext interface allows adding style definition classes and objects
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



