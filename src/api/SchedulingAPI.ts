/**
 * @module
 */



import {ICssSerializer, IScheduler} from "../api/SchedulingTypes";
import {IStyleDefinitionClass, StyleDefinition} from "./RuleTypes";
import * as impl from "../impl/SchedulingImpl";
import {IRuleSerializationContext} from "../rules/Rule";
import {processInstanceOrClass, serializeInstance} from "../rules/RuleContainer";



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Scheduling.
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Activates the given style definition class or instance and inserts all its rules into DOM. If
 * the input object is not an instance but a class, which is not yet associated with an instance,
 * the instance is first created and processed. Note that each style definition instance maintains
 * a reference counter of how many times it was activated and deactivated. The rules are inserted
 * into DOM only upon first activation.
 */
 export function activate<T extends StyleDefinition>(
	instanceOrClass: T | IStyleDefinitionClass<T>,
	schedulerType?: number): T | null
{
	let instance = processInstanceOrClass( instanceOrClass) as T;
	if (instance)
        impl.getActivator(schedulerType).activate( instance);

	return instance;
}



/**
 * Deactivates the given style definition instance by removing its rules from DOM. Note that each
 * style definition instance maintains a reference counter of how many times it was activated and
 * deactivated. The rules are removed from DOM only when this reference counter goes down to 0.
 */
export function deactivate( instance: StyleDefinition, schedulerType?: number): void
{
	impl.getActivator(schedulerType).deactivate( instance);
}



/**
 * Writes to DOM all style changes caused by the calls to the activate and deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export function forceDOMUpdate( schedulerType?: number): void
{
	impl.getActivator(schedulerType).forceDOMUpdate();
}



/**
 * Removes all scheduled activations caused by the calls to the activate and deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export function cancelDOMUpdate( schedulerType?: number): void
{
	impl.getActivator(schedulerType).cancelDOMUpdate();
}



/**
 * Returns the current default scheduler type.
 */
 export function getDefaultScheduler(): number
 {
     return impl.getDefaultScheduler();
 }



 /**
  * Sets the default scheduling type that is used by activate and deactivate functions that are
  * called without explicitly providing value to the scheduling parameter. Returns the type of the
  * previous default activator or 0 if an error occurs (e.g. the given scheduler type ID is not
  * registered).
  */
 export function setDefaultScheduler( schedulerType: number): number
 {
     return impl.setDefaultScheduler( schedulerType);
 }



 /**
  * Registers the given scheduler object and returns the scheduler type identifier, which
  * should be used when calling activate and deactivate functions.
  */
 export function registerScheduler( scheduler: IScheduler): number
 {
     return impl.registerScheduler( scheduler);
 }



 /**
  * Unregisters a scheduler object with the given scheduler type identifier.
  */
 export function unregisterScheduler( schedulerType: number): void
 {
     return unregisterScheduler( schedulerType);
 }



 ///////////////////////////////////////////////////////////////////////////////////////////////
//
// Style definition serialization.
//
///////////////////////////////////////////////////////////////////////////////////////////////

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
export function serializeToCSS( ...args: (StyleDefinition | IStyleDefinitionClass)[]): string
{
    if (!args || args.length === 0)
        return "";

    let serializer = new CssSerializer();
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
        if (this.instances.size === 0)
            return "";

        let ctx = new RuleSerializationContext();
        this.instances.forEach( instance => ctx.addStyleDefinition( instance));
        return ctx.topLevelBuf + ctx.nonTopLevelBuf;
    }

    // Set of style definition instances. This is needed to not add style definitions more than once
    instances = new Set<StyleDefinition>();
}



/**
 * The RuleSerializationContext class implements the IRuleSerializationContext interface and
 * accumulates text of serialized CSS rules.
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



