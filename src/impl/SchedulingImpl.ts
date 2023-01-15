import {SchedulerType, IScheduler} from "../api/SchedulingTypes";



/**
 * The IActivator interface represents an object responsible for a certain type of activation
 * mechanism.
 */
export interface IStyleActivator
{
    /**
     * Performs or schedules the given action (a simple function).
     */
    doAction(action: () => void): void;

	/**
	 * Performs activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the forceDOMUpdate function is called
	 * for this activation mechanism.
	 */
	forceDOMUpdate(): void;

	/**
	 * Cancels activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the cancelDOMUpdate function is called
	 * for this activation mechanism.
	 */
	cancelDOMUpdate(): void;
}



/**
 * The SynchronousActivator class represents the synchronous activation mechanism, which writes
 * style changes to the DOM when the activate and deactivate functions are called.
 */
class SynchronousActivator implements IStyleActivator
{
    /**
     * Executes the given action right away.
     */
    doAction(action: () => void): void
    {
        action();
    }

	/**
	 * Performs activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the forceDOMUpdate function is called
	 * for this activation mechanism.
	 */
	public forceDOMUpdate(): void {}

	/**
	 * Cancels activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the cancelDOMUpdate function is called
	 * for this activation mechanism.
	 */
	public cancelDOMUpdate(): void {}
}



/**
 * The SchedulingActivator class keeps a map of StyleDefinition instances that are scheduled for
 * activation or deactivation. Each instance is mapped to a refernce count, which is incremented
 * upon the activate calls and decremented upon the deactivate calls. When the doActivation
 * method is called The style definition will be either activated or deactivated based on whether
 * the reference count is positive or negative.
 */
class SchedulingActivator implements IStyleActivator
{
    // Array of functions that will be invoked when the scheduled update runs.
    private actions: (()=>void)[] = [];

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
     * Schedules the given action to be execeuted by the scheduler.
     */
    doAction(action: () => void): void
    {
		if (this.isSchedulingNeeded)
            this.scheduler!.scheduleDOMUpdate();

		this.actions.push(action);
    }

    /**
	 * Performs activation/deactivation for all style definitions in our internal map.
	 */
	public forceDOMUpdate(): void
	{
		if (this.actions.length > 0)
		{
            this.doDOMUpdate();

            // since we were forced to perform update now, we need to cancel a scheduled
            // update (if any).
            this.scheduler?.cancelDOMUpdate();
		}
	}

	/**
	 * Cancels activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation.
	 */
	public cancelDOMUpdate(): void
	{
		if (this.actions.length > 0)
		{
			this.actions = [];
            this.scheduler?.cancelDOMUpdate();
		}
	}

	private get isSchedulingNeeded(): boolean
    {
		return !!this.scheduler && !this.actions.length;
    }

    /**
	 * Performs activation/deactivation and property set operations accumulated internally. This
     * method should be used by the derived classes when scheduled activations should be performed.
	 */
	private doDOMUpdate(): void
	{
        // update style properties
        for( let action of this.actions)
    		action();

		this.actions = [];
    }
}



/**
 * The AnimationFrameScheduler implements scheduling using animation frames.
 */
class AnimationFrameScheduler implements IScheduler
{
    // Handle returned by requestAnimationFrame function.
	private h = 0;

    // Callback to call to write changes to the DOM.
	private cb: () => void;

    /**
     * Initializes the scheduler object and provides the callback that should be invoked when the
     * scheduler decides to make changes to the DOM.
     */
    public init( doDOMUpdate: () => void)
    {
        this.cb = doDOMUpdate;
    }

	/**
	 * Is invoked when the scheduler needs to schedule its callback or event.
	 */
    public scheduleDOMUpdate(): void
    {
		this.h = requestAnimationFrame( this.onFrame)
    }

	/**
	 * Is invoked when the scheduler needs to cancels its scheduled callback or event.
	 */
    public cancelDOMUpdate(): void
    {
		if (this.h > 0)
		{
			cancelAnimationFrame( this.h);
			this.h = 0;
		}
    }

	/**
	 * Is invoked when animation frame should be executed.
	 */
	private onFrame = (): void =>
	{
		this.h = 0;
		this.cb();
	}
}



/**
 * Returns the activator for the given scheduler type. If scheduler type is not specified returns
 * the activator currently set as default. If, for some reason, the default activator is not set,
 * returns the synchronous activator.
 */
export const getActivator = (schedulerType?: number): IStyleActivator =>
	(schedulerType == null ? s_defaultActivator : s_registeredActivators.get( schedulerType)) ?? s_synchronousActivator;



/**
 * Sets the default scheduling type that is used by activate and deactivate functions that are
 * called without explicitly providing value to the scheduling parameter. Returns the type of the
 * previous default activator or 0 if an error occurs (e.g. the given scheduler type ID is not
 * registered).
 */
export const setDefaultScheduler = (schedulerType: number): number =>
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
export const registerScheduler = (scheduler: IScheduler): number =>
{
	// get the registration ID for this scheduler
	let id = s_nextCustomSchedulerType++;
	s_registeredActivators.set( id, new SchedulingActivator( scheduler));
	return id;
}



/**
 * Current default scheduler. This scheduler will be used if scheduler type is not explicitly
 * specified in calls such as activate or IStyleRule.setProp.
 */
let s_defaultSchedulerType: number = SchedulerType.Sync;

/**
 * Synchronous activator instance.
 */
const s_synchronousActivator = new SynchronousActivator();

/**
 * Current default activator. This activator will be used if scheduler type is not explicitly
 * specified in calls such as activate or IStyleRule.setProp.
 */
let s_defaultActivator: IStyleActivator = s_synchronousActivator;

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
const s_registeredActivators = new Map<number,IStyleActivator>();

/**
 * Register built-in and custom activators.
 */
s_registeredActivators.set( SchedulerType.Sync, s_synchronousActivator);
s_registeredActivators.set( SchedulerType.AnimationFrame, new SchedulingActivator( new AnimationFrameScheduler()));
s_registeredActivators.set( SchedulerType.Manual, new SchedulingActivator());



