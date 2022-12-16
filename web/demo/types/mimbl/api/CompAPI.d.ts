import { CallbackWrappingOptions, ComponentShadowOptions, IComponent, ICustomAttributeHandlerClass, IRef, ITextVN, IVNode, PromiseProxyProps, RefFunc, RenderMethodType, DN, IComponentEx, ComponentProps } from "./CompTypes";
import { EventSlot } from "./EventSlotAPI";
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
 * class MyComponent extends mim.Component {...}
 *
 * // A `<div>` element will be created with shadow DOM in closed mode
 * @mim.withShadow( {mode: "closed"})
 * class MyComponent extends mim.Component {...}
 *
 * // A `<span>` element will be created with shadow DOM in closed mode
 * @mim.withShadow( ["span", {mode: "closed"}])
 * class MyComponent extends mim.Component {...}
 * ```
 */
export declare const withShadow: (options: Function | ComponentShadowOptions) => any;
/**
 * Wraps the given callback and returns a function with identical signature.
 * @param options
 */
export declare function wrapCallback<T extends Function>(func: T, options?: CallbackWrappingOptions): T;
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
 * @param attrName Name of the custom attribute
 * @param handlerClass Class handling the custom attribute functionality
 */
export declare function registerCustomAttribute<T>(attrName: string, handlerClass: ICustomAttributeHandlerClass<T>): void;
/**
 * Base class for components. Components that derive from this class must implement the render
 * method.
 *
 * @typeparam TProps type of the components properties object. By default, it contains an optional
 * `children` property of type `any`. This allows components that don't explicitly specify any
 * type, to accept children. Note that if a component provides its own type for the properties
 * object and wants to accept children, this type must have the `children` property of the desired
 * type. If not, the component will not be able to accept children (which, oftentimes, might be a
 * desired behavior)
 */
export declare abstract class Component<TProps extends {} = {
    children?: any;
}, TEvents extends {} = {}> extends EventTarget implements IComponent<TProps, TEvents>, IComponentEx<TEvents> {
    /**
     * Component properties passed to the constructor. This is normally used only by managed
     * components and is usually undefined for independent components.
     */
    props?: ComponentProps<TProps, TEvents>;
    constructor(props?: TProps);
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
    updateProps(newProps: TProps): void;
}
/**
 * The Component interface extends the IComponentEx class
 */
export interface Component<TProps extends {} = {
    children?: any;
}, TEvents extends {} = {}> extends IComponentEx<TEvents> {
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
 * Decorator function for tagging a component's render function (or other rendering functions)
 * so that it will not be wrapped in a watcher.
 */
export declare function noWatcher(target: any, name: string, propDescr: PropertyDescriptor): void;
/** Mimbl style scheduler as the default scheduler for style-related DOM-writing operations. */
export declare let mimblStyleSchedulerType: number;
//# sourceMappingURL=CompAPI.d.ts.map