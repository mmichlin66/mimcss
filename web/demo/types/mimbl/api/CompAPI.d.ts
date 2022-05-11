import { CallbackWrappingParams, ComponentShadowOptions, CompProps, FuncProxyProps, IClassCompVN, IComponent, ICustomAttributeHandlerClass, IRef, ITextVN, PromiseProxyProps, RefFunc, RenderMethodType, ScheduledFuncType, UpdateStrategy } from "./CompTypes";
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
    constructor(props?: CompProps<TProps, TChildren>);
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
    props: CompProps<TProps, TChildren>;
    /**
     * Returns the component's content that will be ultimately placed into the DOM tree. This
     * method is abstract because it must be implemented by every component.
     */
    abstract render(): any;
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
     * @param funcThisArg Object that will be used as "this" value when the function is called. If this
     *   parameter is undefined, the component instance will be used (which allows scheduling
     *   regular unbound components' methods). This parameter will be ignored if the function
     *   is already bound or is an arrow function.
     */
    protected callMeBeforeUpdate(func: ScheduledFuncType, funcThisArg?: any): void;
    /**
     * Schedules the given function to be called after all components scheduled to be updated in
     * the Mimbl tick have already been updated.
     * @param func Function to be called
     * @param funcThisArg Object that will be used as "this" value when the function is called. If this
     *   parameter is undefined, the component instance will be used (which allows scheduling
     *   regular unbound components' methods). This parameter will be ignored if the the function
     *   is already bound or is an arrow function.
     */
    protected callMeAfterUpdate(func: ScheduledFuncType, funcThisArg?: any): void;
}
/**
 * The FuncProxy component wraps a function that produces content. Proxies can wrap instance
 * methods of classes that have access to "this" thus allowing a single class to "host" multiple
 * components that can be updated separately. The FuncProxy component is not intended to be
 * created by developers; instead it is only used in its JSX form as the following:
 *
 * ```tsx
 * <FuncProxy func={this.renderSomething} key={...} args={...} thisArg={...} />
 * ```
 *
 * There is a simpler method of specifying a rendering function in JSX, e.g.:
 *
 * ```tsx
 * <div>{this.renderSomething}</div>
 * ```
 *
 * The FuncProxy component is needed in the case where one (or more) of the following is true:
 * - There is a need to pass arguments to the function
 * - The same function is used multiple times and keys must be used to distinguish between the
 * invocations.
 * - The value of "this" inside the function is not the component that does the rendering. That
 * is, the function is not a method of this component.
 *
 * FuncProxy has a public static Update method that can be called to cause the rendering mechanism
 * to invoke the function wrapped by the FuncProxy.
 */
export declare class FuncProxy extends Component<FuncProxyProps, void> {
    /**
     * Instances of the FuncProxy component are never actually created; istead, the parameters
     * passed to it via JSX are used by an internal virtual node that handles function
     * invocation.
     */
    private constructor();
    /** The render method of the FuncProxy component is never actually called */
    render(): any;
}
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
export declare function mount(content: any, anchorDN?: Node): void;
/**
 * Removes the content that was originally generated by the mount function.
 * @param anchorDN DOM element under which the content was previously rendered.
 */
export declare function unmount(anchorDN?: Node): void;
/**
 * Decorator function for tagging a component's render function so that it will not be wrapped in
 * a watcher.
 */
export declare function noWatcher(target: any, name: string, propDescr: PropertyDescriptor): void;
/** Mimbl style scheduler as the default scheduler for style-related DOM-writing operations. */
export declare let mimblStyleSchedulerType: number;
//# sourceMappingURL=CompAPI.d.ts.map