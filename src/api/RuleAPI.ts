import * as RuleTypes from "../rules/RuleTypes";
import * as RuleContainerFuncs from "../rules/RuleContainer"
import {Extended} from "../styles/UtilTypes";
import {SupportsQuery, Styleset, VarTemplateName, VarValueType} from "../styles/StyleTypes";
import {CssSelector, PagePseudoClass} from "../styles/SelectorTypes";
import {MediaQuery} from "../styles/MediaTypes"
import {IFontFace} from "../styles/FontFaceTypes";
import {AbstractRule, ClassRule, IDRule, SelectorRule} from "../rules/StyleRules"
import {AnimationRule} from "../rules/AnimationRule"
import {VarRule} from "../rules/VarRule"
import {CounterRule} from "../rules/CounterRules";
import {FontFaceRule, ImportRule, NamespaceRule, PageRule} from "../rules/MiscRules"
import {SupportsRule, MediaRule} from "../rules/GroupRules"
import {valueToString} from "../styles/UtilFuncs";
import {SynchronousActivator, AnimationFrameActivator, ManualActivator} from "../rules/Scheduling";



/**
 * Creates new abstract rule, which defines a styleset that can be extended by other style
 * rules. Abstract rules don't have selectors and are not inserted into DOM.
 */
export function $abstract( style: RuleTypes.CombinedStyleset): RuleTypes.IStyleRule
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
export function $class( style?: RuleTypes.CombinedStyleset,
	nameOverride?: string | RuleTypes.IClassRule): RuleTypes.IClassRule
{
	return new ClassRule( style, nameOverride);
}

/**
 * Creates new ID rule. The ID name will be created when the rule is processed as part of
 * the style definition class. The name can be also overridden by providing either an explicit
 * name or another ID rule. The function can be called without parameters just to "declare"
 * the ID. Such ID can be later used either in conditional grouping rules or in derived
 * style definition classes.
 */
export function $id( style?: RuleTypes.CombinedStyleset,
	nameOverride?: string | RuleTypes.IIDRule): RuleTypes.IIDRule
{
	return new IDRule( style, nameOverride);
}

/**
 * Creates new selector rule. Selector can be specified as a string or via the selector function.
 */
export function $style( selector: CssSelector, style: RuleTypes.CombinedStyleset): RuleTypes.IStyleRule
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
export function $keyframes( frames?: RuleTypes.AnimationFrame[],
	nameOverride?: string | RuleTypes.IAnimationRule): RuleTypes.IAnimationRule
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
				nameOverride?: string | RuleTypes.IVarRule<K>): RuleTypes.IVarRule<K>
{
	return new VarRule( template, propVal, nameOverride);
}

/**
 * Creates new counter object. The counter name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another counter rule.
 */
export function $counter( nameOverride?: string | RuleTypes.ICounterRule): RuleTypes.ICounterRule
{
	return new CounterRule( nameOverride);
}

/**
 * Creates new import rule.
 */
export function $import( url: string, mediaQuery?: string | MediaQuery,
	supportsQuery?: string | SupportsQuery): RuleTypes.IImportRule
{
	return new ImportRule( url, mediaQuery, supportsQuery);
}

/**
 * Creates new font-face rule.
 */
export function $fontface( fontface: IFontFace): RuleTypes.IFontFaceRule
{
	return new FontFaceRule( fontface);
}

/**
 * Creates new namespace rule.
 */
export function $namespace( namespace: string, prefix?: string): RuleTypes.INamespaceRule
{
	return new NamespaceRule( namespace, prefix);
}

/**
 * Creates new page rule.
 */
export function $page( pseudoClass?: PagePseudoClass, style?: Styleset): RuleTypes.IPageRule
{
	return new PageRule( pseudoClass, style);
}

/**
 * Creates new supports rule.
 */
export function $supports<T extends RuleTypes.StyleDefinition<O>, O extends RuleTypes.StyleDefinition>(
	query: SupportsQuery, instanceOrClass: T | RuleTypes.IStyleDefinitionClass<T,O>): RuleTypes.ISupportsRule<T>
{
	return new SupportsRule( query, instanceOrClass);
}

/**
 * Creates new media rule.
 */
export function $media<T extends RuleTypes.StyleDefinition<O>, O extends RuleTypes.StyleDefinition>(
	query: string | MediaQuery, instanceOrClass: T | RuleTypes.IStyleDefinitionClass<T,O>): RuleTypes.IMediaRule<T>
{
	return new MediaRule( query, instanceOrClass);
}



/**
 * Processes the given style definition class or instance and creates unique names for all named
 * entities. For a given style definition class only a single instance is created, no matter how
 * many times this function is invoked. However, if an instance, which has not yet been processed,
 * is passed, then a new set of unique names will be created for it.
 */
export function $use<T extends RuleTypes.StyleDefinition>(
	instanceOrClass: T | RuleTypes.IStyleDefinitionClass<T>): T | null
{
	return RuleContainerFuncs.processInstanceOrClass( instanceOrClass) as T;
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
export function $embed<T extends RuleTypes.StyleDefinition>(
	instanceOrClass: T | RuleTypes.IStyleDefinitionClass<T>): T | null
{
	// return definition instance without processing it. This is the indication that the defintion
	// will be embedded into another definition.
	return instanceOrClass instanceof RuleTypes.StyleDefinition
		? instanceOrClass
		: new instanceOrClass();
}



/**
 * Activates the given style definition class or instance and inserts all its rules into DOM. If
 * the input object is not an instance but a class, which is not yet associated with an instance,
 * the instance is first created and processed. Note that each style definition instance maintains
 * a reference counter of how many times it was activated and deactivated. The rules are inserted
 * into DOM only upon first activation.
 */
export function $activate<T extends RuleTypes.StyleDefinition>(
	instanceOrClass: T | RuleTypes.IStyleDefinitionClass<T>,
	schedulingType?: number): T | null
{
	if (schedulingType == null)
		schedulingType = s_defaultActivatorType;

	let instance = RuleContainerFuncs.processInstanceOrClass( instanceOrClass) as T;
	if (instance)
	{
		let activator = s_registeredActivators.get( schedulingType);
		if (activator)
			activator.activate( instance);
	}

	return instance;
}



/**
 * Deactivates the given style definition instance by removing its rules from DOM. Note that each
 * style definition instance maintains a reference counter of how many times it was activated and
 * deactivated. The rules are removed from DOM only when this reference counter goes down to 0.
 */
export function $deactivate( instance: RuleTypes.StyleDefinition,
	schedulingType?: RuleTypes.ActivatorType): void
{
	if (schedulingType == null)
		schedulingType = s_defaultActivatorType;

	let activator = s_registeredActivators.get( schedulingType);
	if (activator)
		activator.deactivate( instance);
}



/**
 * Writes to DOM all style changes caused by the calls to the $activate and $deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export function $forceActivation( schedulingType?: number): void
{
	if (schedulingType == null)
		schedulingType = s_defaultActivatorType;

	let activator = s_registeredActivators.get( schedulingType);
	if (activator)
		activator.forceActivation();
}



/**
 * Removes all scheduled activations caused by the calls to the $activate and $deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export function $cancelActivation( schedulingType?: number): void
{
	if (schedulingType == null)
		schedulingType = s_defaultActivatorType;

	let activator = s_registeredActivators.get( schedulingType);
	if (activator)
		activator.cancelActivation();
}



/**
 * Sets the default scheduling type that is used by $activate and $deactivate functions that are
 * called without explicitly providing value to the scheduling parameter.
 */
export function setDefaultActivatorType( schedulingType: number): boolean
{
	// check that the given number is in our map of registered activators
	if (!s_registeredActivators.has(schedulingType))
		return false;

	s_defaultActivatorType = schedulingType;
	return true;
}



/**
 * Registers the given activator object and returns the identifier, which should be used when
 * calling $activate and $deactivate functions.
 */
export function registerActivator( activator: RuleTypes.IActivator): number
{
	// get the registration ID for this activator
	let id = s_nextCustomActivatorType++;
	s_registeredActivators.set( id, activator);
	return id;
}



/**
 * Registers the given activator object and returns the identifier, which should be used when
 * calling $activate and $deactivate functions.
 */
export function unregisterActivator( id: number): void
{
	if (id >= s_firstCustomActivatorType)
	{
		s_registeredActivators.delete( id);

		// if the deleted activator was our default one, we set the default to SYNC
		if (s_defaultActivatorType === id)
			s_defaultActivatorType = RuleTypes.ActivatorType.Sync;
	}
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
	return RuleContainerFuncs.enableShortNames( enable, prefix);
}



/**
 * Concatenates the names of the given classes into a single string that can be assigned to a
 * `class` property of an HTML element.
 * @param classes
 */
export function classes( ...classes: (RuleTypes.IClassRule | Extended<string>)[]): string
{
	return valueToString( classes, {
		arrayItemFunc: v => v instanceof ClassRule ? v.name : valueToString(v)
	});
}



/**
 * Map of registered built-in and custom activators.
 */
let s_registeredActivators = new Map<number,RuleTypes.IActivator>();
s_registeredActivators.set( RuleTypes.ActivatorType.Sync, new SynchronousActivator());
s_registeredActivators.set( RuleTypes.ActivatorType.AnimationFrame, new AnimationFrameActivator());
s_registeredActivators.set( RuleTypes.ActivatorType.Manual, new ManualActivator());



/**
 * Current default activator
 */
let s_defaultActivatorType: number = RuleTypes.ActivatorType.Sync;



/**
 * Activator type identifier to be assigned to the first custom activator to be registered.
 * All custom activator identifiers are greater or equal to this number.
 */
const s_firstCustomActivatorType: number = 1001;

/**
 * Activator type identifier to be assigned to the next custom activator to be registered.
 */
let s_nextCustomActivatorType: number = s_firstCustomActivatorType;



