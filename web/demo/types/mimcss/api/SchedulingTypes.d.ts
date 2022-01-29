/**
 * The SchedulerType enumeration provides values used to define how the calls to the
 * activate and deactivate functions schedule the writing of style changes to the DOM.
 */
export declare const enum SchedulerType {
    /**
     * Synchronous activation - style definitions are written to the DOM upon the activate
     * and deactivate calls.
     */
    Sync = 1,
    /**
     * Calls to activate and deactivate functions are accumulated until the next animation
     * frame and then executed alltogether.
     */
    AnimationFrame = 2,
    /**
     * Calls to activate and deactivate functions are accumulated until the call to the
     * forceDOMUpdate function and then executed alltogether.
     */
    Manual = 3
}
/**
 * The IScheduler interface should be implemented by custom schedulers. Its methods are invoked
 * by the activation infrastructure.
 */
export interface IScheduler {
    /**
     * Initializes the scheduler object and provides the callback that should be invoked when the
     * scheduler decides to make changes to the DOM.
     */
    init(doDOMUpdate: () => void): void;
    /**
     * Is invoked when the scheduler needs to schedule its callback or event.
     */
    scheduleDOMUpdate(): void;
    /**
     * Is invoked when the scheduler needs to cancel its scheduled callback or event.
     */
    cancelDOMUpdate(): void;
}
//# sourceMappingURL=SchedulingTypes.d.ts.map