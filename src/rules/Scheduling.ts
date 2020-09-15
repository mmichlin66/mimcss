import {SchedulerType, StyleDefinition, IScheduler} from "../api/RuleTypes";
import {activateInstance, deactivateInstance} from "./RuleContainer";
import {StringStyleset} from "../api/StyleTypes";



/**
 * The IActivator interface represents an object responsible for a certain type of activation
 * mechanism.
 */
export interface IActivator
{
	/**
	 * Instructs to activate the given style definition instance. This method is called when the
	 * activate function is called for this activation mechanism.
	 */
	activate( definition: StyleDefinition): void;

	/**
	 * Instructs to deactivate the given style definition instance. This method is called when the
	 * deactivate function is called for this activation mechanism.
	 */
	deactivate( definition: StyleDefinition): void;

	/**
	 * Instructs to set the value of either a single property or a set of properties in the given
     * CSS style object.
	 */
    setStyleProperty( ruleOrElm: CSSStyleRule | ElementCSSInlineStyle, name: string | null,
        value?: string | StringStyleset | null, important?: boolean): void;

	/**
	 * Performs activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the forceDOMUpdate function is called
	 * for this activation mechanism.
	 */
	forceDOMUpdate(): void;

	/**
	 * Cancel activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the cancelDOMUpdate function is called
	 * for this activation mechanism.
	 */
	cancelDOMUpdate(): void;
}



/**
 * Set the value of either a single property or a set of properties in the given
 * CSS style object.
 */
function updateStyleProperty( ruleOrElm: CSSStyleRule | ElementCSSInlineStyle, name: string | null,
    value?: string | StringStyleset | null, important?: boolean): void
{
    if (!name && value == null)
    {
        if (ruleOrElm instanceof CSSStyleRule)
            ruleOrElm.cssText = "";
        else
            (ruleOrElm as any as Element).removeAttribute( "style");
    }
    else if (name)
    {
        if (value == null)
            ruleOrElm.style.removeProperty( name);
        else
            ruleOrElm.style.setProperty( name, value as string, important ? "important" : undefined);
    }
    else
    {
        let styleset = value as StringStyleset;
        for( let propName in styleset)
            ruleOrElm.style[propName] = styleset[propName];
    }
}



/**
 * The SynchronousActivator class represents the synchronous activation mechanism, which writes
 * style changes to the DOM when the activate and deactivate functions are called.
 */
class SynchronousActivator implements IActivator
{
	/**
	 * Instructs to activate the given style definition instance. This method is called when the
	 * activate function is called for this activation mechanism.
	 * @param definition
	 */
	public activate( definition: StyleDefinition): void
	{
		activateInstance( definition, 1);
	}

	/**
	 * Instructs to deactivate the given style definition instance. This method is called when the
	 * deactivate function is called for this activation mechanism.
	 * @param definition
	 */
	public deactivate( definition: StyleDefinition): void
	{
		deactivateInstance( definition, 1);
	}

	/**
	 * Instructs to set the value of either a single property or a set of properties in the given
     * CSS style object.
	 */
    public setStyleProperty( ruleOrElm: CSSStyleRule | ElementCSSInlineStyle, name: string | null,
        value?: string | StringStyleset | null, important?: boolean): void
	{
        updateStyleProperty( ruleOrElm, name, value, important);
	}

	/**
	 * Performs activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the forceDOMUpdate function is called
	 * for this activation mechanism.
	 */
	public forceDOMUpdate(): void {}

	/**
	 * Cancel activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the cancelDOMUpdate function is called
	 * for this activation mechanism.
	 */
	public cancelDOMUpdate(): void {}
}



/**
 * Represents objects that are used by the SchedulingActivator class for setting property values.
 * When both name and value properties are null, the style will be set to an empty string
 * effectively removing all styles from the element or the rule.
 */
interface ScheduledStylePropValue
{
	/**
     * Style object in which to set the property value. The style object can belong to either a
     * style rulee or to an HTML element.
     */
	ruleOrElm: CSSStyleRule | ElementCSSInlineStyle;

	/**
     * Dashe-cased property name if setting a value of a single property or null if setting values
     * of multiple properties.
     */
	name: string | null;

	/**
     * Property value if setting a value of a single property or a StringStyleset object if setting
     * values of multiple properties. If the value is null or undefined, it is removed.
     */
	value?: string | StringStyleset | null;

	/**
     * Flag indicating whether the property should be marked "!important". This flag is ignored
     * when setting values of multiple properties.
     */
	important?: boolean;
}



/**
 * The SchedulingActivator class keeps a map of StyleDefinition instances that are scheduled for
 * activation or deactivation. Each instance is mapped to a refernce count, which is incremented
 * upon the activate calls and decremented upon the deactivate calls. When the doActivation
 * method is called The style definition will be either activated or deactivated based on whether
 * the reference count is positive or negative.
 */
export class SchedulingActivator implements IActivator
{
    // Map of style definition class instances to the reference count of activation/deactivation.
	private definitions = new Map<StyleDefinition,number>();

    // Array of style property values to be set/removed.
    private props: ScheduledStylePropValue[] = [];

    // optional scheduler object
    private scheduler?: IScheduler;



    constructor( scheduler?: IScheduler)
    {
        if (scheduler)
        {
            scheduler.init( () => this.doDOMUpdate());
            this.scheduler = scheduler;
        }
    }



	/**
	 * Instructs to activate the given style definition instance.
	 */
	public activate( definition: StyleDefinition): void
	{
		let refCount = this.definitions.get( definition) || 0;
		if (refCount === -1)
		{
			this.definitions.delete( definition);
			if (this.definitions.size === 0 && this.props.length === 0)
				this.scheduler && this.scheduler.cancelDOMUpdate();
		}
		else
		{
			if (this.definitions.size === 0 && this.props.length === 0)
                this.scheduler && this.scheduler.scheduleDOMUpdate();

			this.definitions.set( definition, ++refCount);
		}
	}



	/**
	 * Instructs to deactivate the given style definition instance.
	 */
	public deactivate( definition: StyleDefinition): void
	{
		let refCount = this.definitions.get( definition) || 0;
		if (refCount === 1)
		{
			this.definitions.delete( definition);
			if (this.definitions.size === 0 && this.props.length === 0)
                this.scheduler && this.scheduler.cancelDOMUpdate();
		}
		else
		{
			if (this.definitions.size === 0 && this.props.length === 0)
                this.scheduler && this.scheduler.scheduleDOMUpdate();

			this.definitions.set( definition, --refCount);
		}
	}



	/**
	 * Instructs to set the value of either a single property or a set of properties in the given
     * CSS style object.
	 */
    public setStyleProperty( ruleOrElm: CSSStyleRule | ElementCSSInlineStyle, name: string | null,
        value?: string | StringStyleset | null, important?: boolean): void
	{
		if (this.definitions.size === 0 && this.props.length === 0)
            this.scheduler && this.scheduler.scheduleDOMUpdate();

		this.props.push({ ruleOrElm, name, value, important });
	}



	/**
	 * Performs activation/deactivation for all style definitions in our internal map.
	 */
	public forceDOMUpdate(): void
	{
		if (this.definitions.size > 0 || this.props.length > 0)
		{
            this.doDOMUpdate();
            this.scheduler && this.scheduler.cancelDOMUpdate();
		}
	}



	/**
	 * Cancel activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation.
	 */
	public cancelDOMUpdate(): void
	{
		if (this.definitions.size > 0 || this.props.length > 0)
		{
			this.clearActivation();
            this.scheduler && this.scheduler.cancelDOMUpdate();
		}
	}



	/**
	 * Performs activation/deactivation and property set operations accumulated internally. This
     * method should be used by the derived classes when scheduled activations should be performed.
	 */
	private doDOMUpdate(): void
	{
        // activate/deactivate style definitions
		this.definitions.forEach( (refCount: number, definition: StyleDefinition) =>
		{
			if (refCount > 0)
				activateInstance( definition, refCount);
			else
				deactivateInstance( definition, -refCount);
		})

		this.definitions.clear();

        // update style properties
		this.props.forEach( prop => updateStyleProperty( prop.ruleOrElm, prop.name, prop.value, prop.important));
		this.props = [];
    }



	/**
	 * Clears all activation/deactivation data for all style definitions accumulated since the last
	 * activation/deactivation.
	 */
	private clearActivation(): void
	{
        this.definitions.clear();
        this.props = [];
	}
}



/**
 * The AnimationFrameScheduler implements scheduling using animation frames.
 */
class AnimationFrameScheduler implements IScheduler
{
    // Handle returned by requestAnimationFrame function.
	private requestHandle = 0;

    // Callback to call to write changes to the DOM.
	private doDOMUpdate: () => void;


    /**
     * Initializes the scheduler object and provides the callback that should be invoked when the
     * scheduler decides to make changes to the DOM.
     */
    public init( doDOMUpdate: () => void)
    {
        this.doDOMUpdate = doDOMUpdate;
    }

	/**
	 * Is invoked when the scheduler needs to schedule its callback or event.
	 */
    public scheduleDOMUpdate(): void
    {
		this.requestHandle = requestAnimationFrame( this.onAnimationFrame)
    }

	/**
	 * Is invoked when the scheduler needs to cancels its scheduled callback or event.
	 */
    public cancelDOMUpdate(): void
    {
		if (this.requestHandle > 0)
		{
			cancelAnimationFrame( this.requestHandle);
			this.requestHandle = 0;
		}
    }


	/**
	 * Is invoked when animation frame should be executed.
	 */
	private onAnimationFrame = (): void =>
	{
		this.requestHandle = 0;
		this.doDOMUpdate();
	}
}



/**
 * Schedules the update of the value of the given CSS property in the given rule.
 */
export function s_scheduleStylePropertyUpdate( ruleOrElm: CSSStyleRule | ElementCSSInlineStyle,
    name: string | null, value?: string | StringStyleset | null,
    important?: boolean, schedulerType?: number): void
{
	s_scheduleCall( (activator: IActivator) =>
		activator.setStyleProperty( ruleOrElm, name, value, important), schedulerType);
}



/**
 * Schedules calling of the given function using the given scheduler type.
 */
export function s_scheduleCall( func: (activator: IActivator) => void, schedulerType?: number): void
{
	let activator = schedulerType == null ? s_defaultActivator : s_registeredActivators.get( schedulerType);
    if (activator)
		func( activator);
}



/**
 * Returns the current default scheduler type.
 */
export function s_getDefaultSchedulerType(): number
{
	return s_defaultSchedulerType;
}



/**
 * Sets the default scheduling type that is used by activate and deactivate functions that are
 * called without explicitly providing value to the scheduling parameter. Returns the type of the
 * previous default activator or 0 if an error occurs (e.g. the given scheduler type ID is not
 * registered).
 */
export function s_setDefaultSchedulerType( schedulerType: number): number
{
    // check that the given number is in our map of registered activators
    let activator = s_registeredActivators.get( schedulerType);
	if (!activator)
		return 0;

	let prevSchedulerType = s_defaultSchedulerType;
    s_defaultSchedulerType = schedulerType;
    s_defaultActivator = activator;
	return prevSchedulerType;
}



/**
 * Registers the given scheduler object and returns the scheduler type identifier, which
 * should be used when calling activate and deactivate functions.
 */
export function s_registerScheduler( scheduler: IScheduler): number
{
	// get the registration ID for this scheduler
	let id = s_nextCustomSchedulerType++;
	s_registeredActivators.set( id, new SchedulingActivator( scheduler));
	return id;
}



/**
 * Unregisters a scheduler object with the given scheduler type identifier.
 */
export function s_unregisterScheduler( id: number): void
{
	if (id >= s_firstCustomSchedulerType)
	{
		s_registeredActivators.delete( id);

		// if the deleted scheduler was our default one, we set the default to SYNC
        if (s_defaultSchedulerType === id)
        {
            s_defaultSchedulerType = SchedulerType.Sync;
            s_defaultActivator = s_synchronousActivator;
        }
	}
}



/**
 * Current default scheduler. This scheduler will be used if scheduler type is not explicitly
 * specified in calls such as activate or IStyleRule.setProp.
 */
let s_defaultSchedulerType: number = SchedulerType.Sync;

/**
 * Synchronous activator instance.
 */
let s_synchronousActivator = new SynchronousActivator();

/**
 * Current default activator. This activator will be used if scheduler type is not explicitly
 * specified in calls such as activate or IStyleRule.setProp.
 */
let s_defaultActivator: IActivator = s_synchronousActivator;

/**
 * Scheduler type identifier to be assigned to the first custom scheduler to be registered.
 * All custom scheduler identifiers are greater or equal to this number.
 */
const s_firstCustomSchedulerType: number = 1001;

/**
 * Scheduler type identifier to be assigned to the next custom scheduler to be registered.
 */
let s_nextCustomSchedulerType: number = s_firstCustomSchedulerType;



/**
 * Map of registered built-in and custom activators.
 */
let s_registeredActivators = new Map<number,IActivator>();

/**
 * Register built-in and custom activators.
 */
s_registeredActivators.set( SchedulerType.Sync, s_synchronousActivator);
s_registeredActivators.set( SchedulerType.AnimationFrame, new SchedulingActivator( new AnimationFrameScheduler()));
s_registeredActivators.set( SchedulerType.Manual, new SchedulingActivator());



