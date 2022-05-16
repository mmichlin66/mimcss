import { CallbackWrappingParams, ComponentShadowOptions, CompProps, IClassCompVN, IComponent, ICustomAttributeHandlerClass, IRef, ITextVN, IVNode, PromiseProxyProps, RefFunc, RenderMethodType, ScheduledFuncType, TickSchedulingType, UpdateStrategy } from "./CompTypes";
import { EventSlot } from "./EventSlotAPI";
import { DN } from "../core/VNTypes";
/**
 * Decorator function for components that allows them to use shadow DOM.
 *
 * **Examples:**
 *
 * ```typescript
 * // A `<div>` element will be created with shadow DOM in open mode
 * @mim.withShadow
 * class MyComponent extends mim.Component {...}
 *
 * // A `<span>` element will be created with shadow DOM in open mode
 * @mim.withShadow("span")
 * class SecondWidgetStyles extends css.StyleDefinition {...}
 *
 * // A `<span>` element will be created with shadow DOM in closed mode
 * @mim.withShadow( {tag: "span", init: {mode: "closed"} })
 * class SecondWidgetStyles extends css.StyleDefinition {...}
 * ```
 */
export declare const withShadow: (options: Function | ComponentShadowOptions) => any;
/**
 * Wraps the given callback and returns a function with identical signature.
 * @param params
 */
export declare function wrapCallback<T extends Function>(params?: CallbackWrappingParams<T>): T;
/**
 * Reference class to use whenever a reference to an object is needed - for example, with JSX `ref`
 * attributes and services.
 */
export declare class Ref<T = any> extends EventSlot<RefFunc<T>> implements IRef<T> {
    constructor(listener?: RefFunc<T>, initialReference?: T);
    /** Get accessor for the reference value */
    get r(): T;
    /** Set accessor for the reference value */
    set r(v: T);
    /** Current referenced value */
    private v;
}
/**
 * Decorator function for creating reference properties without the need to manually create Ref<>
 * instances. This allows for the following code pattern:
 *
 * ```typescript
 * class A extends Component
 * {
 *     @ref myDiv: HTMLDivElement;
 *     render() { return <div ref={this.myDiv}>Hello</div>; }
 * }
 * ```
 *
 * In the above example, the myDiv property will be set to point to the HTML div element.
 */
export declare function ref(target: any, name: string): void;
/**
 * Creates text virtual node, which can be used to update the text without re-rendering parent
 * element.
 * @param text Text to initialize the text node
 */
export declare function createTextVN(text: string): ITextVN;
/**
 * Registers custom attribute handler class for the given property name.
 * @param propName name of the custom attribute
 * @param factory custom attribute class
 */
export declare function registerCustomAttribute<T>(attrName: string, handlerClass: ICustomAttributeHandlerClass<T>): void;
/**
 * Registers custom event for the given property name.
 * @param propName name of the custom event
 */
export declare function registerCustomEvent(eventName: string): void;
/**
 * Base class for components. Components that derive from this class must implement the render
 * method.
 */
export declare abstract class Component<TProps = {}, TChildren = any> implements IComponent<TProps, TChildren> {
    /**
     * Remembered virtual node object through which the component can request services. This
     * is undefined in the component's costructor but will be defined before the call to the
     * (optional) willMount method.
     */
    vn: IClassCompVN;
    /**
     * Component properties passed to the constructor. This is normally used only by managed
     * components and is usually undefined for independent components.
     */
    props?: CompProps<TProps, TChildren>;
    constructor(props?: CompProps<TProps, TChildren>);
    /**
     * Returns the component's content that will be ultimately placed into the DOM tree. This
     * method is abstract because it must be implemented by every component.
     */
    abstract render(): any;
    /**
     * Stores the new properties in the [[props]] field. If the component overrides this method
     * it must call the parent's implementation.
     * @param newProps
     */
    updateProps(newProps: CompProps<TProps, TChildren>): void;
    displayName?: string;
    willMount?(): void;
    didMount?(): void;
    didReplace?(oldComp: IComponent<TProps, TChildren>): void;
    willUnmount?(): void;
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
     * @param arg Optional argument to pass to the rendering function.
     */
    protected updateMe(func?: RenderMethodType, arg?: any): void;
    /**
     * Schedules the given function to be called before any components scheduled to be updated in
     * the Mimbl tick are updated.
     * @param func Function to be called
     * @param thisArg Object that will be used as "this" value when the function is called. If this
     *   parameter is undefined, the component instance will be used (which allows scheduling
     *   regular unbound components' methods). This parameter will be ignored if the function
     *   is already bound or is an arrow function.
     */
    protected callMeBeforeUpdate(func: ScheduledFuncType, thisArg?: any): void;
    /**
     * Schedules the given function to be called after all components scheduled to be updated in
     * the Mimbl tick have already been updated.
     * @param func Function to be called
     * @param thisArg Object that will be used as "this" value when the function is called. If this
     *   parameter is undefined, the component instance will be used (which allows scheduling
     *   regular unbound components' methods). This parameter will be ignored if the the function
     *   is already bound or is an arrow function.
     */
    protected callMeAfterUpdate(func: ScheduledFuncType, thisArg?: any): void;
    /**
     *
     * @param func Callback function to be wrapped
     * @param arg Optional argument to be passed to the callback in addition to the original
     * callback arguments.
     * @param thisArg Optional object to be used as `this` when calling the callback. If this
     * parameter is not defined, the component instance is used, which allows wrapping regular
     * unbound components' methods. This parameter will be ignored if the the function
     *   is already bound or is an arrow function.
     * @param schedulingType Type of scheduling the Mimbl tick after the callback function returns.
     * @returns Wrapped callback that will run the original callback in the proper context.
     */
    wrap<T extends Function>(func: T, arg?: any, thisArg?: any, schedulingType?: TickSchedulingType): T;
}
/**
 * Creates a Function Proxy virtual node that wraps the given function with the given argument.
 * This allows using the same component method with different arguments, for example:
 *
 * ```typescript
 * class ToDoList extends mim.Component
 * {
 *     // array of objects of some externally defined ToDo type
 *     todos: ToDo[] = [];
 *
 *     render(): any
 *     {
 *         return <main>
 *             {this.todos.map( todo => FuncProxy(renderTodo, todo))}
 *         </main>
 *     }
 *
 *     renderToDo( todo: ToDo): any
 *     {
 *         return <div>{todo.description}</div>
 *     }
 * }
 * ```
 *
 * @param func Function (usually a component method) to be wrapped in a virtual node
 * @param arg Argument distinguishing one function invocation from another
 * @param thisArg Optional object to be used as `this` when invoking the function. If omitted,
 * the component instance will be used.
 * @returns
 */
export declare const FuncProxy: (func: RenderMethodType, arg?: any, thisArg?: any) => IVNode;
/**
 * The PromiseProxy component wraps a Promise and replaces its content when the promise is settled.
 * Before the promise is settled, the component displays an optional "in-progress" content
 * specified as children of the component. If the promise is rejected, the component will either
 * display the "error" content obtained by calling a functions specified in the properties or, if
 * such function is not specified, display nothing.
 */
export declare class PromiseProxy extends Component<PromiseProxyProps> {
    /**
     * Instances of the FuncProxy component are never actually created; istead, the parameters
     * passed to it via JSX are used by an internal virtual node that handles function
     * invocation.
     */
    private constructor();
    /** The render method of the PromiseProxy component is never actually called */
    render(): any;
}
/**
 * Renders the given content (usually result of JSX expression) under the given HTML element
 * asynchronously.
 * @param content Content to render.
 * @param anchorDN DOM element under which to render the content. If null or undefined,then
 *				render under the document.body tag.
 */
export declare function mount(content: any, anchorDN?: DN): void;
/**
 * Removes the content that was originally generated by the mount function.
 * @param anchorDN DOM element under which the content was previously rendered.
 */
export declare function unmount(anchorDN?: DN): void;
/**
 * Decorator function for tagging a component's render function so that it will not be wrapped in
 * a watcher.
 */
export declare function noWatcher(target: any, name: string, propDescr: PropertyDescriptor): void;
/** Mimbl style scheduler as the default scheduler for style-related DOM-writing operations. */
export declare let mimblStyleSchedulerType: number;
//# sourceMappingURL=CompAPI.d.ts.map