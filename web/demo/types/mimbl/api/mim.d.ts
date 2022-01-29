import { Styleset, IIDRule, ClassPropType } from "mimcss";
import { IHtmlIntrinsicElements } from "./HtmlTypes";
import { ISvgIntrinsicElements } from "./SvgTypes";
/**
 * Type used to define properties that can be passed to a manged component.
 *
 * @typeparam TProps Type defining properties that can be passed to the functional or class-based
 * component with these properties. Default type is an empty object (no properties).
 * @typeparam TChildren Type defining components, elements or other objects that can be used as
 * children for the component with these properties. Default is `any`.
 */
export declare type CompProps<TProps = {}, TChildren = any> = Readonly<TProps> & {
    readonly children?: TChildren;
};
/**
 * Interface that defines constructor signature for components.
 *
 * @typeparam TProps Type defining properties that can be passed to the class-based component
 *		of this type. Default type is an empty object (no properties).
 * @typeparam TChildren Type defining components, elements or other objects that can be used
 *		as children for the class-based component of this type. Default is `any`.
 */
export interface IComponentClass<TProps = {}, TChildren = any> {
    new (props?: TProps): Component<TProps, TChildren>;
    render(): any;
}
/**
 * Interface that must be implemented by all components.
 *
 * @typeparam TProps Type defining properties that can be passed to this class-based component.
 *		Default type is an empty object (no properties).
 * @typeparam TChildren Type defining components, elements or other objects that can be used
 *		as children for this class-based component. Default is `any`.
 */
export interface IComponent<TProps = {}, TChildren = any> {
    /**
     * Component properties passed to the constructor. For managed components, the properties
     * are updated when the component's parent is updated.
     */
    readonly props?: CompProps<TProps, TChildren>;
    /**
     * Components can define display name for tracing purposes; if they don't the default name
     * used is the component's class constructor name. Note that this method can be called before
     * the virtual node is attached to the component.
     */
    readonly displayName?: string;
    /**
     * Sets, gets or clears the virtual node object of the component. This property is set twice:
     *  1. Before the component is rendered for the first time: the component must remember the
     *    passed object.
     *  2. Before the component is destroyed: null is passed as a parameter and the component must
     *    release the remembered object.
     */
    vn?: IClassCompVN;
    /** Returns the component's content that will be ultimately placed into the DOM tree. */
    render(): any;
    /**
     * Notifies that the component is about to render its content for the first time. This method
     * is called when the virtual node has already been set so the component can request services
     * from it.
     */
    willMount?(): void;
    /**
     * Notifies the component that it was successfully mounted. This method is called after the
     * component is rendered for the first time and the content of all its sub-nodes is added to
     * the DOM tree.
     */
    didMount?(): void;
    /**
     * Notifies the component that it replaced the given old component. This allows the new
     * component to copy whatever internal state it needs from the old component.
     */
    didReplace?(oldComp: IComponent<TProps, TChildren>): void;
    /**
     * Notifies that the component's content is going to be removed from the DOM tree. After
     * this method returns the component is destroyed.
     */
    willUnmount?(): void;
    /**
     * Optional method that is called before any components that are scheduled to be updated in
     * a Mimbl tick, are updated. If implemented, this method will be called every time the
     * component is scheduled to be updated. This method can read DOM layout information (e.g.
     * element measurements) without the risk of causing forced layouts.
     */
    beforeUpdate?(): void;
    /**
     * Optional method that is called after all components that are scheduled to be updated in
     * a Mimbl tick, are updated. If implemented, this method will be called every time the
     * component is scheduled to be updated. This method is called after all modifications to
     * DOM resulting from updaing components have been already done.
     */
    afterUpdate?(): void;
    /**
     * This method is only used by managed components.
     *
     * Informs the component that new properties have been specified. At the time of the call
     * this.props refers to the "old" properties. If the component returns true, then its render
     * method will be called. At that time,the original props object that was passed into the
     * component's constructor will have these new properties. If the component doesn't implement
     * the shouldUpdate method it is as though true is returned. If the component returns
     * false, the render method is not called and the DOM tree of the component remains unchanged.
     * The properties of the component, however, still change.
     * @param newProps The new properties that the parent component provides to this component.
     * @returns True if the component should have its render method called and false otherwise.
     */
    shouldUpdate?(newProps: CompProps<TProps, TChildren>): boolean;
    /**
     * Handles an exception that occurred during the rendering of one of the component's children.
     * If this method is not implemented or if it throws an error, the error will be propagated up
     * the chain of components until it reaches a component that handles it. If none of the
     * components can handle the error, the entire tree will be unmounted.
     * @param err An exception that was thrown during the component's own rendering or rendering
     * of one of its descendants.
     * @returns New content to be displayed for the component.
     */
    handleError?(err: any): any;
    /**
     * Retrieves update strategy object that determines different aspects of component behavior
     * during updates.
     */
    getUpdateStrategy?(): UpdateStrategy;
}
/**
 * The UpdateStrategy object specifies different aspects of update behavior of components and
 * elements.
 */
export declare type UpdateStrategy = {
    /**
     * Flag determining whether or not non-matching new keyed sub-nodes are allowed to recycle non-
     * matching old keyed sub-nodes. Here "non-matching" means those new or old nodes with keys
     * for which no old or new sub-nodes with the same key were found. If this flag is true, then
     * non-matching old sub-nodes will be removed and non-matching new sub-nodes will be inserted.
     * If this flag is false, then non-matching old sub-nodes will be updated by the non-matching
     * new sub-nodes - provided that the types of sub-nodes are the same.
     *
     * If keyed sub-nodes recycling is enabled it can speed up an update process because
     * less DOM nodes get removed and inserted, which is more expensive than updating. However,
     * this can have some adverse effects under cirtain circumstances if certain data is bound
     * to the particular instances of DOM nodes.
     *
     * The flag's default value is false, that is recycling is enabled.
     */
    disableKeyedNodeRecycling?: boolean;
    /**
     * Flag determining whether the reconciliation procedure should not pay attention to the keys.
     * This flag is complimentary to the disableKeyedNodeRecycling flag and take effect only if the
     * latter is false (or undefined). When the ignoreKeys flag is false (default) we try to match
     * new sub-nodes to old ones using keys. Setting the ignoreKeys flag to true completely
     * ignores keys and the matching is done by going through the lists of the new and
     * old sub-nodes sequentially. Under certain circumstance this may speed up the reconciliation
     * process
     *
     * The flag's default value is false, that is keys are used for matching the nodes.
     */
    ignoreKeys?: boolean;
};
/** Type defining the information that can be supplied for a callback to be wrapped */
export interface CallbackWrappingParams<T extends Function = Function> {
    func: T;
    funcThisArg?: any;
    arg?: any;
    schedulingType?: TickSchedulingType;
    creator?: any;
}
/**
 * Wraps the given callback and returns a function with identical signature.
 * @param params
 */
export declare function wrapCallback<T extends Function>(params?: CallbackWrappingParams<T>): T;
/**
 * Retrieves the argumnet that was passed when a callback was wrapped. This function can only be
 * called from the callback itself while it is executing.
 */
export declare function getCallbackArg(): any;
/**
 * Type of event handler function for DOM events of type T.
 * @typeparam T DOM event type, e.g. MouseEvent
 */
export declare type EventFuncType<T extends Event = Event> = (e: T) => void;
/** Type defining the information that can be supplied for an event listener */
export interface EventObjectType<T extends Event> extends CallbackWrappingParams<EventFuncType<T>> {
    useCapture?: boolean;
}
/**
 * Union type that can be passed to an Element's event.
 * @typeparam T DOM event type, e.g. MouseEvent
 */
export declare type EventPropType<T extends Event = Event> = EventFuncType<T> | EventObjectType<T>;
/**
 * Type for defining the id property of HTML elements
 */
export declare type IDPropType = string | number | IIDRule;
/**
 * The ICommonProps interface defines standard properties that can be used on all JSX elements -
 * intrinsic (HTML and SVG) as well as functional and class-based components.
 */
export interface ICommonProps {
    /** Unique key that distinguishes this JSX element from its siblings. The key can be of any type. */
    key?: any;
}
/**
 * The IManagedCompProps interface adds to the ICommonProps the ability to obtain reference to
 * the managed components via the ref property.
 */
export interface IManagedCompProps<T = any> extends ICommonProps {
    readonly ref?: RefPropType<T>;
}
export declare type CrossoriginPropType = "anonymous" | "use-credentials";
export declare type FormenctypePropType = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
export declare type FormmethodPropType = "get" | "post" | "dialog";
export declare type FormtargetPropType = string | "_self" | "_blank" | "_parent" | "_top";
export declare type ReferrerPolicyPropType = "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "unsafe-url";
export declare type DropzonePropType = "copy" | "move" | "link";
/**
 * The IElementProps interface defines standard properties (attributes and event listeners)
 * that can be used on all HTML and SVG elements.
 */
export interface IElementProps<TRef extends Element = Element, TChildren = any> extends ICommonProps {
    /**
     * Reference that will be set to the instance of the element after it is created (mounted). The
     * reference will be set to undefined after the element is unmounted.
     */
    ref?: RefPropType<TRef>;
    /**
     * Reference that will be set to the element's virtual node after it is created (mounted). The
     * reference will be set to undefined after the element is unmounted.
     */
    vnref?: ElmRefPropType<TRef>;
    /**
     * Update strategy object that determines different aspects of element behavior during updates.
     */
    updateStrategy?: UpdateStrategy;
    /** Children that can be supplied to the element */
    children?: TChildren;
    xmlns?: string;
    class?: ClassPropType;
    draggable?: boolean;
    dropzone?: DropzonePropType;
    id?: IDPropType;
    lang?: string;
    role?: string;
    style?: string | Styleset;
    tabindex?: number;
    abort?: EventPropType<UIEvent>;
    animationcancel?: EventPropType<AnimationEvent>;
    animationend?: EventPropType<AnimationEvent>;
    animationiteration?: EventPropType<AnimationEvent>;
    animationstart?: EventPropType<AnimationEvent>;
    auxclick?: EventPropType<Event>;
    blur?: EventPropType<FocusEvent>;
    cancel?: EventPropType<Event>;
    canplay?: EventPropType<Event>;
    canplaythrough?: EventPropType<Event>;
    change?: EventPropType<Event>;
    click?: EventPropType<MouseEvent>;
    close?: EventPropType<Event>;
    contextmenu?: EventPropType<MouseEvent>;
    cuechange?: EventPropType<Event>;
    dblclick?: EventPropType<MouseEvent>;
    durationchange?: EventPropType<Event>;
    emptied?: EventPropType<Event>;
    ended?: EventPropType<Event>;
    error?: EventPropType<ErrorEvent>;
    focus?: EventPropType<FocusEvent>;
    gotpointercapture?: EventPropType<PointerEvent>;
    input?: EventPropType<Event>;
    invalid?: EventPropType<Event>;
    keydown?: EventPropType<KeyboardEvent>;
    keypress?: EventPropType<KeyboardEvent>;
    keyup?: EventPropType<KeyboardEvent>;
    load?: EventPropType<Event>;
    loadeddata?: EventPropType<Event>;
    loadedmetadata?: EventPropType<Event>;
    loadend?: EventPropType<ProgressEvent>;
    loadstart?: EventPropType<Event>;
    lostpointercapture?: EventPropType<PointerEvent>;
    mousedown?: EventPropType<MouseEvent>;
    mouseenter?: EventPropType<MouseEvent>;
    mouseleave?: EventPropType<MouseEvent>;
    mousemove?: EventPropType<MouseEvent>;
    mouseout?: EventPropType<MouseEvent>;
    mouseover?: EventPropType<MouseEvent>;
    mouseup?: EventPropType<MouseEvent>;
    pause?: EventPropType<Event>;
    play?: EventPropType<Event>;
    playing?: EventPropType<Event>;
    pointercancel?: EventPropType<PointerEvent>;
    pointerdown?: EventPropType<PointerEvent>;
    pointerenter?: EventPropType<PointerEvent>;
    pointerleave?: EventPropType<PointerEvent>;
    pointermove?: EventPropType<PointerEvent>;
    pointerout?: EventPropType<PointerEvent>;
    pointerover?: EventPropType<PointerEvent>;
    pointerup?: EventPropType<PointerEvent>;
    progress?: EventPropType<ProgressEvent>;
    ratechange?: EventPropType<Event>;
    reset?: EventPropType<Event>;
    resize?: EventPropType<UIEvent>;
    scroll?: EventPropType<UIEvent>;
    seeked?: EventPropType<Event>;
    seeking?: EventPropType<Event>;
    select?: EventPropType<UIEvent>;
    stalled?: EventPropType<Event>;
    submit?: EventPropType<Event>;
    suspend?: EventPropType<Event>;
    timeupdate?: EventPropType<Event>;
    toggle?: EventPropType<Event>;
    touchcancel?: EventPropType<TouchEvent>;
    touchend?: EventPropType<TouchEvent>;
    touchenter?: EventPropType<TouchEvent>;
    touchleave?: EventPropType<TouchEvent>;
    touchmove?: EventPropType<TouchEvent>;
    touchstart?: EventPropType<TouchEvent>;
    transitioncancel?: EventPropType<TransitionEvent>;
    transitionend?: EventPropType<TransitionEvent>;
    transitionrun?: EventPropType<TransitionEvent>;
    transitionstart?: EventPropType<TransitionEvent>;
    volumechange?: EventPropType<Event>;
    waiting?: EventPropType<Event>;
    wheel?: EventPropType<WheelEvent>;
    fullscreenchange?: EventPropType<Event>;
    fullscreenerror?: EventPropType<Event>;
    copy?: EventPropType<ClipboardEvent>;
    cut?: EventPropType<ClipboardEvent>;
    paste?: EventPropType<ClipboardEvent>;
}
/**
 * This interface is intended to be augmented in order to add to it names of custom Web elements
 * mapped to their corresponding property types.
 */
export interface ICustomWebElements {
}
/**
 * Namespace defining interfaces used by TypeScript to type-check JSX expressions.
 */
export declare namespace JSX {
    type Element = any;
    interface ElementClass extends Component {
    }
    interface ElementAttributesProperty {
        props: {};
    }
    interface ElementChildrenAttribute {
        children: any;
    }
    interface IntrinsicElements extends IHtmlIntrinsicElements, ISvgIntrinsicElements, ICustomWebElements {
    }
    interface IntrinsicAttributes extends ICommonProps {
    }
    interface IntrinsicClassAttributes<T> extends IManagedCompProps<T> {
    }
}
/**
 * JSX Factory function. In order for this function to be invoked by the TypeScript compiler, the
 * tsconfig.json must have the following option:
 *
 * ```json
 * "compilerOptions":
 * {
 *     "jsx": "react",
 *     "jsxFactory": "jsx"
 * }
 * ```
 *
 * The .tsx files must import the mimbl module as mim: import * as mim from "mimbl"
 * @param tag
 * @param props
 * @param children
 */
export declare function jsx(tag: any, props: any, ...children: any[]): any;
/**
 * The IServiceDefinitions interface serves as a mapping between service names and service types.
 * This interface is intended to be augmented by modules that define and/or use specific services.
 * This allows performing service publishing and subscribing in type-safe manner.
 */
export interface IServiceDefinitions {
    /** Built-in error handling service. */
    "StdErrorHandling": IErrorHandlingService;
    /**
     * Built-in service for lazy people - can be used for quick prototypes without the need to
     * augment the interface.
     */
    "any": any;
}
/**
 * The IErrorHandlingService interface represents a service that can be invoked when an error -
 * usually an exception - is encountered but cannot be handled locally. A component that implements
 * this service would normally remember the error and request to update itself, so that in its
 * render method it will present the error to the user.
 *
 * The IErrorHandlingService is implemented by the Root Virtual Node as a last resort for error
 * handling. The Root VN will display a simple UI showing the error and will allow the user to
 * restart - in the hope that the error will not repeat itself.
 */
export interface IErrorHandlingService {
    reportError(err: any): void;
}
/**
 * Type of functions scheduled to be called either before or after the update cycle.
 */
export declare type ScheduledFuncType = () => void;
/**
 * Defines event handler that is invoked when reference value changes.
 */
export declare type RefFunc<T = any> = (newRef: T) => void;
/**
 * Reference class to use whenever a reference to an object is needed - for example, with JSX `ref`
 * attributes and services.
 */
export declare class Ref<T = any> {
    /** Event that is fired when the referenced value changes */
    private changedEvent;
    constructor(listener?: RefFunc<T>, initialReferene?: T);
    /** Adds a callback that will be invoked when the value of the reference changes. */
    addListener(listener: RefFunc<T>): void;
    /** Removes a callback that was added with addListener. */
    removeListener(listener: RefFunc<T>): void;
    /** Get accessor for the reference value */
    get r(): T;
    /** Set accessor for the reference value */
    set r(v: T);
}
/**
 * The ElmRef class represents a reference to the element virtual node. Such objects
 * can be created and passed to the `ref` property of an element. After the element is rendered
 * the object can be used to schedule updates to the element directly - that is, without updating
 * the component that rendered the element. This, for example, can be used to update properties
 * of the element without causing re-rendering of its children.
 */
export declare class ElmRef<T extends Element = Element> extends Ref<IElmVN<T>> {
}
/**
 * Defines event handler that is invoked when reference value changes.
 */
export declare type ElmRefFunc<T extends Element = Element> = RefFunc<IElmVN<T>>;
/**
 * Type of ref property that can be passed to JSX elements and components. This can be either the
 * [[Ref]] class or [[RefFunc]] function.
 */
export declare type RefType<T = any> = Ref<T> | RefFunc<T>;
/**
 * Type of ref property value. This can be either the [[Ref]] class or [[RefFunc]] function or the
 * type itself.
 */
export declare type RefPropType<T = any> = T | RefType<T>;
/**
 * Type of the vnref property value.
 */
export declare type ElmRefType<T extends Element = Element> = RefType<IElmVN<T>>;
/**
 * Type of vnref property that can be passed to JSX elements.
 */
export declare type ElmRefPropType<T extends Element = Element> = RefPropType<IElmVN<T>>;
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
 * Helper function to set the value of the reference that takes care of the different types of
 * references. The optional `onlyIf` parameter may specify a value so that only if the reference
 * currently has the same value it will be replaced. This might be needed to not clear a
 * reference if it already points to a different object.
 * @param ref [[Ref]] object to which the new value will be set
 * @param val Reference value to set to the Ref object
 * @param onlyIf An optional value to which to compare the current (old) value of the reference.
 * The new value will be set only if the old value equals the `onlyIf` value.
 */
export declare function setRef<T>(ref: RefType<T>, val: T, onlyIf?: T): void;
/**
 * The IVNode interface represents a virtual node. Through this interface, callers can perform
 * most common actions that are available on every type of virtual node. Each type of virtual node
 * also implements a more specific interface through which the specific capabilities of the node
 * type are available.
 */
export interface IVNode {
    /** Gets node's parent. This is undefined for the top-level (root) nodes. */
    readonly parent?: IVNode;
    /** Level of nesting at which the node resides relative to the root node. */
    readonly depth?: number;
    /** Component that created this node in its render method (or undefined). */
    readonly creator?: IComponent;
    /**
     * Zero-based index of this node in the parent's list of sub-nodes. This is zero for the
     * root nodes that don't have parents.
     */
    readonly index?: number;
    /** List of sub-nodes. */
    readonly subNodes?: IVNode[];
    /**
     * Gets node's display name. This is used mostly for tracing and error reporting. The name
     * can change during the lifetime of the virtual node; for example, it can reflect an "id"
     * property of an element.
     */
    readonly name?: string;
    /**
     * Registers an object of any type as a service with the given ID that will be available for
     * consumption by descendant components.
     */
    publishService<K extends keyof IServiceDefinitions>(id: K, service: IServiceDefinitions[K]): void;
    /** Unregisters a service with the given ID. */
    unpublishService<K extends keyof IServiceDefinitions>(id: K): void;
    /**
     * Subscribes to a service with the given ID. If the service with the given ID is registered
     * by this or one of the ancestor components, the passed Ref object will reference it;
     * otherwise, the Ref object will be set to the defaultValue (if specified) or will remain
     * undefined. Whenever the value of the service that is registered by this or a closest
     * ancestor component is changed,the Ref object will receive the new value.
     * The useSelf optional parameter determines whether the component can subscribe to the
     * service published by itself. The default is false.
     * @param id
     * @param ref
     * @param defaultService
     * @param useSelf
     */
    subscribeService<K extends keyof IServiceDefinitions>(id: K, ref: RefPropType<IServiceDefinitions[K]>, defaultService?: IServiceDefinitions[K], useSelf?: boolean): void;
    /**
     * Unsubscribes from a service with the given ID. The Ref object that was used to subscribe
     * will be set to undefined.
     * @param id
     */
    unsubscribeService<K extends keyof IServiceDefinitions>(id: K): void;
    /**
     * Retrieves the value for a service with the given ID registered by a closest ancestor
     * component or the default value if none of the ancestor components registered a service with
     * this ID. This method doesn't establish a subscription and only reflects the current state.
     * @param id
     * @param defaultService
     * @param useSelf
     */
    getService<K extends keyof IServiceDefinitions>(id: K, defaultService?: IServiceDefinitions[K], useSelf?: boolean): IServiceDefinitions[K];
}
/**
 * The IClassCompVN interface represents a virtual node for a JSX-based component.
 */
export interface IClassCompVN extends IVNode {
    /** Gets the component instance. */
    readonly comp: IComponent;
    /** This method is called by the component when it needs to be updated. */
    updateMe(func?: RenderMethodType, funcThisArg?: any, key?: any): void;
    /**
     * Schedules the given function to be called before any components scheduled to be updated in
     * the Mimbl tick are updated.
     * @param func Function to be called
     * @param funcThisArg Object that will be used as "this" value when the function is called. If this
     *   parameter is undefined, the component instance will be used (which allows scheduling
     *   regular unbound components' methods). This parameter will be ignored if the function
     *   is already bound or is an arrow function.
     */
    callMe(func: ScheduledFuncType, beforeUpdate: boolean, funcThisArg?: any): void;
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
    wrapCallback<T extends Function>(func: T, funcThisArg?: any, schedulingType?: TickSchedulingType): T;
}
/**
 * The IManagedCompVN interface represents a virtual node for a JSX-based component.
 */
export interface IManagedCompVN extends IClassCompVN {
    /** Gets the component class. */
    readonly compClass: IComponentClass;
}
/**
 * The IIndependentCompVN interface represents a virtual node for an independent component.
 */
export interface IIndependentCompVN extends IClassCompVN {
}
/**
 *  The IElmVN interface represents a virtual node for a DOM element.
 */
export interface IElmVN<T extends Element = Element> extends IVNode {
    /** Gets the DOM element name. */
    readonly elmName: string;
    /** Gets the DOM element object. */
    readonly elm: Element;
    /**
     * Requests update of the element properties without re-rendering of its children.
     * @param props
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    setProps(props: IElementProps<T>, schedulingType?: TickSchedulingType): void;
    /**
     * Replaces the given range of sub-nodes with the new content. The update parameter determines
     * whether the old sub-nodes are simply removed and the new added or the new content is used
     * to update the old sub-nodes.
     * @param content New content to replace the range of old sub-nodes.
     * @param startIndex Index of the first sub-node in the range to be replaced by the new content.
     * If undefined, the default value is 0.
     * @param endIndex Index after the last sub-node in the range to be replaced by the new content.
     * If undefined, the range includes all sub-nodes from startIndex to the end.
     * @param update If false, the old sub-nodes are removed and the new ones are inserted. If true,
     * the reconciliation process is used to update the old sub-nodes with the new ones. The default
     * value is false.
     * @param updateStrategy If the reconciliation process is used (that is, the update parameter
     * is true), determines the update strategy. If undefined, the update strategy of the node
     * itself is used.
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    setChildren(content?: any, startIndex?: number, endIndex?: number, update?: boolean, updateStrategy?: UpdateStrategy, schedulingType?: TickSchedulingType): void;
    /**
     * At the given index, removes a given number of sub-nodes and then inserts the new content.
     * @param index
     * @param countToDelete
     * @param contentToInsert
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    spliceChildren(index: number, countToDelete?: number, contentToInsert?: any, schedulingType?: TickSchedulingType): void;
    /**
     * Moves a range of sub-nodes to a new location.
     * @param index Starting index of the range.
     * @param count Number of sub-nodes in the range.
     * @param shift Positive or negative number of positions the range will be moved.
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    moveChildren(index: number, count: number, shift: number, schedulingType?: TickSchedulingType): void;
    /**
     * Swaps two ranges of the element's sub-nodes. The ranges cannot intersect.
     * @param index1
     * @param count1
     * @param index2
     * @param count2
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    swapChildren(index1: number, count1: number, index2: number, count2: number, schedulingType?: TickSchedulingType): void;
    /**
     * Retains the given range of the sub-nodes unmounting the sub-nodes outside this range. This
     * method operates similar to the Array.prototype.slice method.
     * @param startIndex Index of the first sub-node in the range. If undefined, the array of
     * sub-nodes starts at index 0.
     * @param endIndex Index of the sub-node after the last sub-node in the range. If
     * this parameter is zero or undefined or greater than the length of the sub-nodes array, the
     * range will include all sub-nodes from the startIndex to the end of the array.
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    sliceChildren(startIndex: number, endIndex?: number, schedulingType?: TickSchedulingType): void;
    /**
     * Removes the given number of nodes from the start and/or the end of the list of sub-nodes.
     * @param startCount
     * @param endCount
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    trimChildren(startCount: number, endCount: number, schedulingType?: TickSchedulingType): void;
    /**
     * Adds the given content at the start and/or at the end of the existing children.
     * @param startContent
     * @param endContent
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    growChildren(startContent?: any, endContent?: any, schedulingType?: TickSchedulingType): void;
    /**
     * Reverses sub-nodes within the given range.
     * @param startIndex Index of the first sub-node in the range. If undefined, the array of
     * sub-nodes starts at index 0.
     * @param endIndex Index of the sub-node after the last sub-node in the range. If
     * this parameter is zero or undefined or greater than the length of the sub-nodes array, the
     * range will include all sub-nodes from the startIndex to the end of the array.
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    reverseChildren(startIndex?: number, endIndex?: number, schedulingType?: TickSchedulingType): void;
}
/**
 * The ITextVN interface represents a virtual node for a text DOM node.
 */
export interface ITextVN extends IVNode {
    /** Text of the node. */
    readonly text: string;
    /** Text DOM node. */
    readonly textNode: Text;
    /**
     * Requests update of the text.
     * @param text Text to set to the node.
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    setText(text: string, schedulingType?: TickSchedulingType): void;
}
/**
 * Creates text virtual node, which can be used to update the text without re-rendering parent
 * element.
 * @param text Text to initialize the text node
 */
export declare function createTextVN(text: string): ITextVN;
/**
 * The ICustomAttributeHandlerClass interface represents a class of handlers of custom attributes
 * that can be applied to intrinsic (HTML or SVG) elements. The requirements on such classes are:
 * 1. Implement a constructor accepting IElmVN, attribute value and attribute name (this allows
 *   the same handler to serve different attributes).
 * 2. Implement the ICustomAttributeHandler interface
 */
export interface ICustomAttributeHandlerClass<T> {
    /**
     * Constructs a new custom attribute handler that will act on the given element and provides
     * the initial value of the attribute. Attribute name is also provided in case the handler
     * supports different attributes. By the time this constructor is called, the DOM element had
     * already been created and standard attributes and event listeners had been applied.
     * @param elmVN Virtual node for this element. The handler can retrieve the DOM element from
     *   this interface and also use other methods (e.g. subscribe to services).
     * @param attrVal Initial value of the custom attribute
     * @param attrName Name of the custom attribute
     */
    new (elmVN: IElmVN, attrVal: T, attrName?: string): ICustomAttributeHandler<T>;
}
/**
 * The ICustomAttributeHandler interface represents an ability to handle custom properties that can
 * be applied to intrinsic (HTML or SVG) elements.
 */
export interface ICustomAttributeHandler<T = any> {
    /**
     * Updates an existing custom attribute with the new value.
     * @param newPropVal New value of the custom attribute.
     * @returns True if changes were made and false otherwise.
     */
    update(newPropVal: T): boolean;
    /**
     * Terminates the functioning of the custom attribute handler. This method is invoked either
     * when a new rendering of the element doesn't have the attribute anymore or if the element
     * is removed. Although this method is optional, most handlers will need to implement it to
     * properly cleanup any resources (e.g. event handlers) to avoid leaks.
     * @param isRemoval True if the element is being removed and false if the element is being
     *   updated and the attribute is no longer provided. If the handler adds any event
     *   listeners to the element, then it has to remove them on update but doen't have to do it
     *   on element removal.
     */
    terminate?(isRemoval: boolean): void;
}
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
export declare const enum TickSchedulingType {
    /** No tick is scheduled */
    None = 1,
    /** The tick is executed right away in a synchronous manner */
    Sync = 2,
    /** A microtask is scheduled for executing the tick */
    Microtask = 3,
    /** An animation frame is scheduled for executing the tick */
    AnimationFrame = 4
}
/**
 * Base class for components. Components that derive from this class must implement the render
 * method.
 */
export declare abstract class Component<TProps = {}, TChildren = any> implements IComponent<TProps, TChildren> {
    /**
     * Component properties passed to the constructor. This is normally used only by managed
     * components and is usually undefined for independent coponents.
     */
    props: CompProps<TProps, TChildren>;
    /**
     * Remembered virtual node object through which the component can request services. This
     * is undefined in the component's costructor but will be defined before the call to the
     * (optional) willMount method.
     */
    vn: IClassCompVN;
    constructor(props?: CompProps<TProps, TChildren>);
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
/**
 * An artificial "Fragment" component that is only used as a temporary collection of other items
 * in places where JSX only allows a single item. Our JSX factory function creates a virtual node
 * for each of its children and the function is never actually called. This function is only needed
 * because currently TypeScript doesn't allow the `<>` fragment notation if a custom JSX factory
 * function is used.
 *
 * Use it as follows:
 * ```tsx
 *	import * as mim from "mimbl"
 *	.....
 *	render()
 *	{
 *		return <Fragment>
 *			<div1/>
 *			<div2/>
 *			<div3/>
 *		</Fragment>
 *	}
  ```

 * @param props
 */
export declare function Fragment(props: CompProps<{}>): any;
/**
 * Definition of type of  method that renders content.
 */
export declare type RenderMethodType = (arg: any) => any;
/**
 * Properties to be used with the FuncProxy component. FuncProxy component cannot have children.
 * A key property can be used to distinguish between multiple uses of the same function. If the
 * function is used only once within a component, the key is not necessary; however, if the
 * function is used multiple times, key is mandatory - otherwise, the behavior is undetermined.
 */
export interface FuncProxyProps extends ICommonProps {
    /** Function that renders content. */
    func: RenderMethodType;
    /**
     * Value to be used as "this" when invoking the function. If this value is undefined, the
     * class based component that rendered the FuncProxy component will be used (which is the
     * most common case).
     */
    funcThisArg?: any;
    /**
     * Arguments to be passed to the function. Whenever the FuncProxy component is rendered, this
     * parameter is used when calling the wrapped function.
     */
    arg?: any;
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
 * Properties to be used with the PromiseProxy component.
 */
export interface PromiseProxyProps extends ICommonProps {
    /** Promise that will be watch by the waiting node. */
    promise: Promise<any>;
    /** Function that is called if the promise is rejected. */
    errorContentFunc?: (err: any) => any;
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
// asynchronously.
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
 * Symbol that is attached to a render function to indicate that it should not be wrapped in a
 * watcher.
 */
export declare let symRenderNoWatcher: symbol;
/**
 * Decorator function for tagging a component's render function so that it will not be wrapped in
 * a watcher.
 */
export declare function noWatcher(target: any, name: string, propDescr: PropertyDescriptor): void;
/**
 * @deprecated - use `@trigger`
 */
export declare function updatable(target: any, name: string): void;
