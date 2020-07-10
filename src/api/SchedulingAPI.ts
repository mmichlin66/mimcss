import {StyleDefinition, ActivatorType, IStyleDefinitionClass} from "../rules/RuleTypes";
import {activateInstance, deactivateInstance, processInstanceOrClass} from "../rules/RuleContainer";
import {
	s_registeredActivators, s_scheduleCall, s_getCurrentDefaultActivatorType,
	s_setCurrentDefaultActivatorType, IActivator, ScheduledStylePropValue
} from "../rules/Scheduling";



/**
 * Activates the given style definition class or instance and inserts all its rules into DOM. If
 * the input object is not an instance but a class, which is not yet associated with an instance,
 * the instance is first created and processed. Note that each style definition instance maintains
 * a reference counter of how many times it was activated and deactivated. The rules are inserted
 * into DOM only upon first activation.
 */
export function $activate<T extends StyleDefinition>(
	instanceOrClass: T | IStyleDefinitionClass<T>,
	activatorType?: number): T | null
{
	let instance = processInstanceOrClass( instanceOrClass) as T;
	if (instance)
		s_scheduleCall( (activator: IActivator) => activator.activate( instance), activatorType);

	return instance;
}



/**
 * Deactivates the given style definition instance by removing its rules from DOM. Note that each
 * style definition instance maintains a reference counter of how many times it was activated and
 * deactivated. The rules are removed from DOM only when this reference counter goes down to 0.
 */
export function $deactivate( instance: StyleDefinition, activatorType?: number): void
{
	s_scheduleCall( (activator: IActivator) => activator.deactivate( instance), activatorType);
}



/**
 * Writes to DOM all style changes caused by the calls to the $activate and $deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export function $forceActivation( activatorType?: number): void
{
	s_scheduleCall( (activator: IActivator) => activator.forceActivation(), activatorType);
}



/**
 * Removes all scheduled activations caused by the calls to the $activate and $deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export function $cancelActivation( activatorType?: number): void
{
	s_scheduleCall( (activator: IActivator) => activator.cancelActivation(), activatorType);
}



/**
 * Sets the default scheduling type that is used by $activate and $deactivate functions that are
 * called without explicitly providing value to the scheduling parameter. Returns the type of the
 * previous default activator or 0 if an error occurs (e.g. the given activator type ID is not
 * registered).
 */
export function setDefaultActivatorType( activatorType: number): number
{
	// check that the given number is in our map of registered activators
	if (!s_registeredActivators.has(activatorType))
		return 0;

	let prevActivatorType = s_getCurrentDefaultActivatorType();
	s_setCurrentDefaultActivatorType( activatorType);
	return prevActivatorType;
}



/**
 * Returns the default scheduling type that is used by $activate and $deactivate functions that are
 * called without explicitly providing value to the scheduling parameter.
 */
export function getDefaultActivatorType(): number
{
	return s_getCurrentDefaultActivatorType();
}



/**
 * Registers the given activator object and returns the identifier, which should be used when
 * calling $activate and $deactivate functions.
 */
export function registerActivator( activator: IActivator): number
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
		if (s_getCurrentDefaultActivatorType() === id)
			s_setCurrentDefaultActivatorType( ActivatorType.Sync);
	}
}



/**
 * The SchedulingActivator class keeps a map of StyleDefinition instances that are scheduled for
 * activation or deactivation. Each instance is mapped to a refernce count, which is incremented
 * upon the $activate calls and decremented upon the $deactivate calls. When the doActivation
 * method is called The style definition will be either activated or deactivated based on whether
 * the reference count is positive or negative.
 */
export abstract class SchedulingActivator implements IActivator
{
	private definitions = new Map<StyleDefinition,number>();

	private props: ScheduledStylePropValue[] = [];



	/**
	 * Instructs to activate the given style definition instance.
	 * @param definition
	 */
	public activate( definition: StyleDefinition): void
	{
		let refCount = this.definitions.get( definition) || 0;
		if (refCount === -1)
		{
			this.definitions.delete( definition);
			if (this.definitions.size === 0 && this.props.length === 0)
				this.onLastUnscheduled();
		}
		else
		{
			if (this.definitions.size === 0 && this.props.length === 0)
				this.onFirstScheduled();
				
			this.definitions.set( definition, ++refCount);
		}
	}



	/**
	 * Instructs to deactivate the given style definition instance.
	 * @param definition
	 */
	public deactivate( definition: StyleDefinition): void
	{
		let refCount = this.definitions.get( definition) || 0;
		if (refCount === 1)
		{
			this.definitions.delete( definition);
			if (this.definitions.size === 0 && this.props.length === 0)
				this.onLastUnscheduled();
		}
		else
		{
			if (this.definitions.size === 0 && this.props.length === 0)
				this.onFirstScheduled();
				
			this.definitions.set( definition, --refCount);
		}
	}



	/**
	 * Instructs to set the value of the property in the given CSS style rule.
	 */
	public setStyleProperty( rule: CSSStyleRule, name: string, value?: string | null, important?: boolean): void
	{
		if (this.definitions.size === 0 && this.props.length === 0)
			this.onFirstScheduled();

		this.props.push({ rule, name, value, important });
	}



	/**
	 * Performs activation/deactivation for all style definitions in our internal map.
	 */
	public forceActivation(): void
	{
		if (this.definitions.size > 0 || this.props.length > 0)
		{
			this.onSchedulingCleared();
			this.doActivation();
		}
	}



	/**
	 * Cancel activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation.
	 */
	public cancelActivation(): void
	{
		if (this.definitions.size > 0 || this.props.length > 0)
		{
			this.definitions.clear();
			this.props = [];
			this.onSchedulingCleared();
		}
	}



	/**
	 * Performs activation/deactivation for all style definitions in our internal map. This method
	 * should be used by the derived classes when scheduled activations should be performed.
	 */
	protected doActivation(): void
	{
		this.definitions.forEach( (refCount: number, definition: StyleDefinition) =>
		{
			if (refCount > 0)
				activateInstance( definition, refCount);
			else
				deactivateInstance( definition, -refCount);
		})

		this.definitions.clear();

		this.props.forEach( prop =>
		{
			if (prop.value == null)
				prop.rule.style.removeProperty( prop.name);
			else
				prop.rule.style.setProperty( prop.name, prop.value, prop.important ? "!important" : undefined);
		})

		this.props = [];
	}



	/**
	 * Is invoked when the first item is added to the map. Allows derived classes to schedule an
	 * action (e.g. to call requestAnimationFrame).
	 */
	protected onFirstScheduled(): void {}

	/**
	 * Is invoked when the last item is removed from the map. Allows derived classes to unschedule
	 * an action (e.g. to call cancelAnimationFrame).
	 */
	protected onLastUnscheduled(): void {}

	/**
	 * Is invoked when activation was either forced externally via the forceActivation call or was
	 * canceled via the cancelActivation call. Allows derived classes to unschedule an action (e.g.
	 * to call cancelAnimationFrame).
	 */
	protected onSchedulingCleared(): void {}
}



/**
 * The AnimationFrameActivator implements scheduling using animation frames.
 */
class AnimationFrameActivator extends SchedulingActivator
{
	private requestHandle = 0;



	/**
	 * Is invoked when the first item is added to the map. Allows derived classes to schedule an
	 * action (e.g. to call requestAnimationFrame).
	 */
	protected onFirstScheduled(): void
	{
		this.requestHandle = requestAnimationFrame( this.onAnimationFrame)
	}



	/**
	 * Is invoked when the last item is removed from the map. Allows derived classes to unschedule
	 * an action (e.g. to call cancelAnimationFrame).
	 */
	protected onLastUnscheduled(): void
	{
		cancelAnimationFrame( this.requestHandle);
		this.requestHandle = 0;
	}



	/**
	 * Is invoked when activation was either forced externally via the forceActivation call or was
	 * canceled via the cancelActivation call. Allows derived classes to unschedule an action (e.g.
	 * to call cancelAnimationFrame).
	 */
	protected onSchedulingCleared(): void
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
		this.doActivation();
	}
}



/**
 * The ManualActivator class accumulates calls to $activate and $deactivate functions until the
 * $forceActivation or $cancelActivation funtions are called.
 */
class ManualActivator extends SchedulingActivator
{
}



/**
 * The SynchronousActivator class represents the synchronous activation mechanism, which writes
 * style changes to the DOM when the $activate and $deactivate functions are called.
 */
class SynchronousActivator implements IActivator
{
	/**
	 * Instructs to activate the given style definition instance. This method is called when the
	 * $activate function is called for this activation mechanism.
	 * @param definition
	 */
	public activate( definition: StyleDefinition): void
	{
		activateInstance( definition, 1);
	}

	/**
	 * Instructs to deactivate the given style definition instance. This method is called when the
	 * $deactivate function is called for this activation mechanism.
	 * @param definition
	 */
	public deactivate( definition: StyleDefinition): void
	{
		deactivateInstance( definition, 1);
	}

	/**
	 * Instructs to set the value of the property in the given CSS style rule.
	 */
	public setStyleProperty( rule: CSSStyleRule, name: string, value?: string | null, important?: boolean): void
	{
		if (value == null)
			rule.style.removeProperty( name);
		else
			rule.style.setProperty( name, value, important ? "!important" : undefined);
	}

	/**
	 * Performs activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the $forceActivation function is called
	 * for this activation mechanism.
	 */
	public forceActivation(): void {}

	/**
	 * Cancel activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the $cancelActivation function is called
	 * for this activation mechanism.
	 */
	public cancelActivation(): void {}
}



/**
 * Activator type identifier to be assigned to the first custom activator to be registered.
 * All custom activator identifiers are greater or equal to this number.
 */
const s_firstCustomActivatorType: number = 1001;

/**
 * Activator type identifier to be assigned to the next custom activator to be registered.
 */
let s_nextCustomActivatorType: number = s_firstCustomActivatorType;



/**
 * Register built-in and custom activators.
 */
s_registeredActivators.set( ActivatorType.Sync, new SynchronousActivator());
s_registeredActivators.set( ActivatorType.AnimationFrame, new AnimationFrameActivator());
s_registeredActivators.set( ActivatorType.Manual, new ManualActivator());



