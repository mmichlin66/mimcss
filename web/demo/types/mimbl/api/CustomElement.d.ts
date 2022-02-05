import { CompProps, IComponent, IIndependentCompVN, RenderMethodType, ScheduledFuncType, TickSchedulingType, UpdateStrategy } from "./mim";
/**
 * Base class for custom Web elements.
 */
export declare abstract class CustomElement<TProps, TChildren> extends HTMLElement implements IComponent<TProps, TChildren> {
    /** Derived classes must implement the render() method */
    abstract render(): any;
    /**
     * Remembered virtual node object through which the component can request services. This
     * is undefined in the component's costructor but will be defined before the call to the
     * (optional) willMount method.
     */
    vn?: IIndependentCompVN;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    static get observedAttributes(): string[];
    displayName?: string;
    willMount?(): void;
    didMount?(): void;
    didReplace?(oldComp: IComponent<TProps, TChildren>): void;
    willUnmount?(): void;
    beforeUpdate?(): void;
    afterUpdate?(): void;
    shouldUpdate?(newProps: CompProps<TProps, TChildren>): boolean;
    handleError?(err: any): any;
    getUpdateStrategy?(): UpdateStrategy;
    /**
     * Determines whether the component is currently mounted. If a component has asynchronous
     * functionality (e.g. fetching data from a server), component's code may be executed after
     * it was alrady unmounted. This property allows the component to handle this situation.
     */
    get isMounted(): boolean;
    /**
     * This method is called by the component to request to be updated. If no arguments are
     * provided, the entire component is requested to be updated. If arguments are provided, they
     * indicate what rendering functions should be updated.
     * @param func Optional rendering function to invoke
     * @param funcThisArg Optional value to use as "this" when invoking the rendering function. If
     * undefined, the component's "this" will be used.
     * @param key Optional key which distinguishes between multiple uses of the same function. This
     * can be either the "arg" or the "key" property originally passed to the FunProxy component.
     */
    protected updateMe(func?: RenderMethodType, funcThisArg?: any, key?: any): void;
    /**
     * Schedules the given function to be called before any components scheduled to be updated in
     * the Mimbl tick are updated.
     * @param func Function to be called
     * @beforeUpdate Flag indicating whether the function will be called just before the Mimbl
     * tick (true) or right after (false)
     * @param funcThisArg Object that will be used as "this" value when the function is called. If this
     *   parameter is undefined, the component instance will be used (which allows scheduling
     *   regular unbound components' methods). This parameter will be ignored if the function
     *   is already bound or is an arrow function.
     */
    protected callMe(func: ScheduledFuncType, beforeUpdate: boolean, funcThisArg?: any): void;
    /**
     * Creates a wrapper function with the same signature as the given callback so that if the original
     * callback throws an exception, it is processed by the Mimbl error handling mechanism so that the
     * exception bubbles from this component up the hierarchy until a component that knows to
     * handle errors is found.
     *
     * Use this method before passing callbacks to document and window event handlers as well as
     * non-DOM objects that use callbacks, e.g. fetch, Promise, setTimeout, etc. For example:
     *
     * ```typescript
     *	class ResizeMonitor extends mim.Component
     *	{
     *		private onWindowResize(e: Event): void {};
     *
     * 		wrapper: (e: Event): void;
     *
     * 		public startResizeMonitoring()
     *		{
     *			this.wrapper = this.wrapCallback( this.onWindowResize);
     *			window.addEventListener( "resize", this.wrapper);
     *		}
     *
     * 		public stopResizeMonitoring()
     *		{
     *			window.removeEventListener( "resize", this.wrapper);
     *			this.wrapper = undefined;
     *		}
     *	}
     * ```
     *
     * @param func Method/function to be wrapped
     * @param funcThisArg Optional value of "this" to bind the callback to. If this parameter is
     * undefined, the component instance will be used. This parameter will be ignored if the the
     * function is already bound or is an arrow function.
     * @param schedulingType Type determining whether and how a Mimbl tick should be scheduled
     * after callback invocation.
     * @returns Function that has the same signature as the given callback and that should be used
     *     instead of the original callback
     */
    protected wrapCallback<T extends Function>(func: T, funcThisArg?: any, schedulingType?: TickSchedulingType): T;
}
