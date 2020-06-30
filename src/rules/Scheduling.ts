import {StyleDefinition, IActivator} from "./RuleTypes";
import {activateInstance, deactivateInstance} from "./RuleContainer";



/**
 * The SynchronousActivator class represents the synchronous activation mechanism, which writes
 * style changes to the DOM when the $activate and $deactivate functions are called.
 */
export class SynchronousActivator implements IActivator
{
	/**
	 * Instructs to activate the given style definition instance.
	 * @param definition
	 */
	public activate( definition: StyleDefinition): void
	{
		activateInstance( definition, 1);
	}

	/**
	 * Instructs to deactivate the given style definition instance.
	 * @param definition
	 */
	public deactivate( definition: StyleDefinition): void
	{
		deactivateInstance( definition, 1);
	}

	/**
	 * Performs activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation.
	 */
	public forceActivation(): void {}

	/**
	 * Cancel activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation.
	 */
	public cancelActivation(): void {}
}



/**
 * The SchedulingActivator class keeps a map of StyleDefinition instances that are scheduled for
 * activation or deactivation. Each instance is mapped to a refernce count, which is incremented
 * upon the $activate calls and decremented upon the $deactivate calls. When the doActivation
 * method is called The style definition will be either activated or deactivated based on whether
 * the reference count is positive or negative.
 */
abstract class SchedulingActivator implements IActivator
{
	private definitions = new Map<StyleDefinition,number>();



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
			if (this.definitions.size === 0)
				this.onLastUnscheduled();
		}
		else
		{
			if (this.definitions.size === 0)
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
			if (this.definitions.size === 0)
				this.onLastUnscheduled();
		}
		else
		{
			if (this.definitions.size === 0)
				this.onFirstScheduled();
				
			this.definitions.set( definition, --refCount);
		}
	}



	/**
	 * Performs activation/deactivation for all style definitions in our internal map.
	 */
	public forceActivation(): void
	{
		if (this.definitions.size > 0)
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
		if (this.definitions.size > 0)
		{
			this.definitions.clear();
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
export class AnimationFrameActivator extends SchedulingActivator
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
		this.doActivation();
	}
}



/**
 * The ManualActivator class accumulates calls to $activate and $deactivate functions until the
 * $forceActivation or $cancelActivation funtions are called.
 */
export class ManualActivator extends SchedulingActivator
{
}



