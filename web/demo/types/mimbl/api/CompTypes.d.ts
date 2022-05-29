import { Styleset, IIDRule, ClassMoniker } from "mimcss";
import { ITrigger } from "./TriggerTypes";
import { IEventSlot } from "./EventSlotTypes";
export declare type DN = Node | null;
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
    new (props?: CompProps<TProps>): IComponent<TProps, TChildren>;
    render(): any;
}
/**
 * Type for the `shadow` property in the [[IComponent]] interface. This can be one of the following:
 * - boolean - if the value is true, a `<div>` element will be created and shadow root attached to
 *   it with mode "open".
 * - string - an element with this name will be created and shadow root attached to
 *   it with mode "open".
 * - ShadowRootInit - a `<div>` element will be created and shadow root attached to
 *   it with the given initialization prameters.
 * - two-item tuple - the first item is the name of the element to create and attach a shadow
 *   root to; the second item specifies the shadow root initialization prameters.
 */
export declare type ComponentShadowOptions = boolean | string | ShadowRootInit | [
    tag: string,
    init: ShadowRootInit
];
/**
 * Interface that must be implemented by all components. Although it has many methods that
 * components can implement, in practice, there is only one mandatory method - `render()`.
 * Components should be ready to have the `vn` property set, although they don't have to declare
 * it.
 *
 * Note that you normally don't need to implement this interface because your components will
 * usually derive from the [[Component]] class that implements it.
 *
 * @typeparam TProps Type defining properties that can be passed to this class-based component.
 *		Default type is an empty object (no properties).
 * @typeparam TChildren Type defining components, elements or other objects that can be used
 *		as children for this class-based component. Default is `any`.
 */
export interface IComponent<TProps = {}, TChildren = any> {
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
     * This method is only used by independent components.
     *
     * Notifies the component that it replaced the given component. This allows the new
     * component to copy whatever internal state it needs from the old component.
     */
    didReplace?(oldComp: IComponent<TProps, TChildren>): void;
    /**
     * Notifies that the component's content is going to be removed from the DOM tree. After
     * this method returns, a managed component is destroyed.
     */
    willUnmount?(): void;
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
     * This method is only used by managed components.
     *
     * Instructs the component to change the proprties object to the new one. This method is
     * invoked after [[shouldUpdate]] (if specified) and before [[render]]. This gives the
     * component the opportunity to save the new properties and also to do whatever processing
     * the component needs. If implemented, this method is invoked regardless of whether the
     * [[shouldUpdate]] method is implemented and whether it returned `true` or `false`.
     * @param newProps The new properties that the parent component provides to this component.
     */
    updateProps?(newProps: CompProps<TProps, TChildren>): void;
    /**
     * Handles an exception that occurred during the rendering of one of the component's children.
     * If this method is not implemented or if it throws an error, the error will be propagated up
     * the chain of components until it reaches a component that handles it. If none of the
     * components can handle the error, the entire tree will be unmounted.
     *
     * This method should only change the internal state of the component so that the [[render]]
     * method, which will be invoked right after the `handleError` method returns, will return
     * content reflecting the error.
     *
     * @param err An error object that was thrown during the component's own rendering or rendering
     * of one of its descendants.
     */
    handleError?(err: unknown): void;
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
     * old sub-nodes sequentially. Under certain circumstances this may speed up the reconciliation
     * process
     *
     * The flag's default value is false, that is keys are used for matching the nodes.
     */
    ignoreKeys?: boolean;
};
/** Type defining the options that can be supplied for a callback to be wrapped */
export declare type CallbackWrappingOptions = {
    /** Object that will be referenced by "this" within the callback function */
    thisArg?: any;
    /** Argument that is supplied to the callback as a last parameter. */
    arg?: any;
    /** Component that will be set as a current component when the callback is invoked. */
    comp?: IComponent | null;
    /** Type of scheduling the Mimbl tick after the callback function returns. */
    schedulingType?: TickSchedulingType;
};
/** Type defining the information that can be supplied for a callback to be wrapped */
export declare type CallbackWrappingParams<T extends Function = Function> = CallbackWrappingOptions & {
    /** Callback function */
    func: T;
};
/**
 * Type that can be passed as a callback to a component's property. It allows passing a callback
 * in one of the following forms:
 * - as a function object. Note that if the function is a method of another component (or just a
 *   class), then it should be wrapped (using the [[wrap]] method) so that the `this` parameter
 *   is properly set up when the callback is invoked.
 * - a two element tuple. The first element is the function to be called and the second element is
 *   the value to be used as the `this` parameter.
 * - an object with the properties `func` specifying the function to be called and `thisArg`
 *   specifying the value to be used as the `this` parameter.
 */
export declare type CallbackPropType<T extends Function = Function> = T | [func: T, thisArg?: any] | [func: T, thisArg?: any];
/**
 * Type of event handler function for DOM events of type T.
 * @typeparam T DOM event type, e.g. MouseEvent
 * @param e Event object
 * @param arg Optional parameter, which is defined only if it was passed when the callback was
 * wrapped - that is, in the `arg` property of the EventObjectType object or in the 2nd item of the
 * EventTupleType tuple.
 */
export declare type EventFuncType<T extends Event = Event> = (e: T, arg?: any) => void;
/**
 * Type defining a tuple that can be supplied for an event listener.
 * @typeparam T DOM event type, e.g. MouseEvent
 */
export declare type EventTupleType<T extends Event = Event> = [
    func: EventFuncType<T>,
    arg?: any,
    thisArg?: any
];
/**
 * Type defining an object that can be supplied for an event listener.
 * @typeparam T DOM event type, e.g. MouseEvent
 */
export interface EventObjectType<T extends Event> extends CallbackWrappingParams<EventFuncType<T>> {
    /**
     * Flag indicating whether this event should be used as Capturing or Bubbling. The default
     * value is `false`, that is, Bubbling.
     */
    useCapture?: boolean;
}
/**
 * Union type that can be passed to an Element's event.
 * @typeparam T DOM event type, e.g. MouseEvent
 */
export declare type EventPropType<T extends Event = Event> = EventFuncType<T> | EventTupleType<T> | EventObjectType<T>;
/**
 * Type for defining the id property of HTML elements
 */
export declare type IDPropType = string | number | IIDRule;
/**
 * The ICommonProps interface defines standard properties that can be used on all JSX elements -
 * intrinsic (HTML and SVG) as well as functional and class-based managed components.
 * @typeparam TRef Type of the element or component used as a reference type.
 */
export interface ICommonProps<TRef = any> {
    /** Unique key that distinguishes this JSX element from its siblings. The key can be of any type. */
    readonly key?: any;
    readonly ref?: RefPropType<TRef>;
}
/** Type for `crossorigin` attribute used for some HTML and SVG elements */
export declare type CrossoriginPropType = "anonymous" | "use-credentials";
/** Type for `formenctype` attribute used for some HTML and SVG elements */
export declare type FormenctypePropType = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
/** Type for `formmethod` attribute used for some HTML and SVG elements */
export declare type FormmethodPropType = "get" | "post" | "dialog";
/** Type for `formtarget` attribute used for some HTML and SVG elements */
export declare type FormtargetPropType = string | "_self" | "_blank" | "_parent" | "_top";
/** Type for `referrerpolicy` attribute used for some HTML and SVG elements */
export declare type ReferrerPolicyPropType = "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "unsafe-url";
/**
 * Type that allows defining attributes of HTML and SVG elements in terms of simple types (e.g.
 * `string`), but allowing to pass triggers of this type to them. This is used to optimize
 * re-rendering when the value of the attribute changes.
 */
export declare type ExtendedElementAttr<T> = T | ITrigger<T>;
/** Global events that are common to all kind of HTML entities */
export declare type IGlobalEvents = {
    [K in keyof GlobalEventHandlersEventMap]?: EventPropType<GlobalEventHandlersEventMap[K]>;
};
/** Events that are common to all kinds of elements */
export declare type IElementEvents = {
    [K in keyof ElementEventMap]?: EventPropType<ElementEventMap[K]>;
};
/** Events that are common to elements and documents */
export declare type IDocumentAndElementEvents = {
    [K in keyof DocumentAndElementEventHandlersEventMap]?: EventPropType<DocumentAndElementEventHandlersEventMap[K]>;
};
/**
 * The IElementProps interface defines standard properties (attributes and event listeners)
 * that can be used on all HTML and SVG elements.
 * @typeparam TRef Type of the element used as a reference type.
 * @typeparam TChildren Type of the children the element can have. By default, elements can have
 * any children.
 */
export interface IElementProps<TRef extends Element = Element, TChildren = any> extends ICommonProps<TRef>, IGlobalEvents, IElementEvents, IDocumentAndElementEvents {
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
    id?: ExtendedElementAttr<IDPropType>;
    lang?: ExtendedElementAttr<string>;
    class?: ExtendedElementAttr<ClassMoniker>;
    className?: ExtendedElementAttr<ClassMoniker>;
    style?: ExtendedElementAttr<string | Styleset>;
    tabindex?: ExtendedElementAttr<number>;
    tabIndex?: ExtendedElementAttr<number>;
    role?: ExtendedElementAttr<string>;
    draggable?: ExtendedElementAttr<"auto" | "true" | "false">;
}
/**
 * This interface is intended to be augmented in order to add to it names of custom Web elements
 * mapped to their corresponding property types.
 */
export interface ICustomWebElements {
}
/**
 * The IServiceDefinitions interface serves as a mapping between service names and service types.
 * This interface is intended to be augmented by modules that define and/or use specific services.
 * This allows performing service publishing and subscribing in type-safe manner.
 */
export interface IServiceDefinitions {
    /** Built-in error handling service. */
    "ErrorBoundary": IErrorBoundary;
}
/**
 * The IErrorBoundary interface represents a service that can be invoked when an error -
 * usually an exception - is encountered but cannot be handled locally. A component that implements
 * this service would normally remember the error and update itself, so that in its render method
 * it will present the error to the user.
 *
 * The IErrorBoundary is implemented by the Root Virtual Node as a last resort for error
 * handling.
 */
export interface IErrorBoundary {
    reportError(err: unknown): void;
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
 * Defines event handler that is invoked when reference value changes.
 */
export interface IRef<T = any> extends IEventSlot<RefFunc<T>> {
    r: T;
}
/**
 * Type of ref property that can be passed to JSX elements and components. This can be either the
 * [[IRef]] interface or [[RefFunc]] function.
 */
export declare type RefType<T = any> = IRef<T> | RefFunc<T>;
/**
 * Type of ref property value. This can be either the [[IRef]] interface or [[RefFunc]] function
 * or the type itself.
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
 * Represents a publication of a service.
 */
export interface IPublication<K extends keyof IServiceDefinitions> {
    /** Returns the current value of the service */
    value?: IServiceDefinitions[K];
    /** Deletes this publication */
    unpublish(): void;
}
/**
 * Represents a subscription to a service. This interface allows getting the current value of the
 * service and getting notifications on when the value is changed.
 */
export interface ISubscription<K extends keyof IServiceDefinitions> {
    /** Returns the current value of the service */
    readonly value?: IServiceDefinitions[K];
    /**
     * Attaches the given callback to the "change" event.
     * @param callback Function that will be called when the value of the service changes.
     */
    attach(callback: (value?: IServiceDefinitions[K]) => void): void;
    /**
     * Detaches the given callback from the "change" event.
     * @param callback Function that was attached to the "change" event by the [[aattach]] method.
     */
    detach(callback: (value?: IServiceDefinitions[K]) => void): void;
    /** Deletes this subscription */
    unsubscribe(): void;
}
/**
 * The IVNode interface represents a virtual node. Through this interface, callers can perform
 * most common actions that are available on every type of virtual node. Each type of virtual node
 * also implements a more specific interface through which the specific capabilities of the node
 * type are available.
 */
export interface IVNode {
    /** Gets node's parent. This is undefined for the top-level (root) nodes. */
    readonly parent?: IVNode | null;
    /** Level of nesting at which the node resides relative to the root node. */
    readonly depth?: number;
    /** Component that created this node in its render method (or undefined). */
    readonly creator?: IComponent | null;
    /**
     * Zero-based index of this node in the parent's list of sub-nodes. This is zero for the
     * root nodes that don't have parents.
     */
    readonly index: number;
    /** List of sub-nodes. */
    readonly subNodes?: IVNode[] | null;
    /**
     * Gets node's display name. This is used mostly for tracing and error reporting. The name
     * can change during the lifetime of the virtual node; for example, it can reflect an "id"
     * property of an element.
     */
    readonly name?: string;
    /**
     * Retrieves the value for a service with the given ID registered by a closest ancestor
     * component or the default value if none of the ancestor components registered a service with
     * this ID. This method doesn't establish a subscription and only reflects the current state.
     * @param id Unique service identifier
     * @param defaultValue Default value to return if no publish service is found.
     * @param useSelf Flag indicating whether the search for the service should start from the
     * virtual node that calls this method. The default value is `false` meaning the search starts
     * from the parent virtual node.
     * @returns Current value of the service or default value if no published service is found.
     */
    getService<K extends keyof IServiceDefinitions>(id: K, defaultValue?: IServiceDefinitions[K], useSelf?: boolean): IServiceDefinitions[K];
}
/**
 * The IClassCompVN interface represents a virtual node for a JSX-based component.
 */
export interface IClassCompVN extends IVNode {
    /** Gets the component instance. */
    readonly comp?: IComponent;
    /**
     * Object that is used mainly by the managed components. It keeps the properties first passed
     * to the componet's constructor and then changed when the component is updated through its
     * parent updates.
     */
    readonly props: any;
    /**
     * If the component specifies the [[shadow]] property, the `shadowRoot` property will be set
     * to the shadow root element under which the component's content returned from the `render()`
     * method will be placed. If the component doesn't specify the [[shadow]] property, the
     * `shadowRoot` property will be undefined. Components can access the shadow root via their
     * `vn.shadowRoot` property.
     */
    readonly shadowRoot?: ShadowRoot;
    /**
     * This method is called by the component to request to be updated. If no arguments are
     * provided, the entire component is requested to be updated. If arguments are provided, they
     * indicate what rendering functions should be updated.
     * @param func Optional rendering function to invoke
     * @param arg Optional argument to pass to the rendering function.
     */
    updateMe(func?: RenderMethodType, arg?: any): void;
    /**
     * Schedules the given function to be called either before any components scheduled to be
     * updated in the Mimbl tick are updated or after all components have been updated.
     * @param func Function to be called
     * @param beforeUpdate Flag indicating whether the function will be called just before the Mimbl
     * tick (true) or right after (false)
     * @param thisArg Object that will be used as "this" value when the function is called. If this
     *   parameter is undefined, the component instance will be used (which allows scheduling
     *   regular unbound components' methods). This parameter will be ignored if the function
     *   is already bound or is an arrow function.
     */
    callMe(func: ScheduledFuncType, beforeUpdate: boolean, thisArg?: any): void;
    /**
     * Returns a function that wraps the given callback so that when the return function is called
     * the original callback is invoked in a proper context.
     * @param func Callback function to be wrapped
     * @param thisArg Object to be used as `this` when calling the callback
     * @param arg Optional argument to be passed to the callback in addition to the original
     * callback arguments.
     * @param schedulingType Type of scheduling the Mimbl tick after the callback function returns.
     * @returns Wrapped callback that will run the original callback in the proper context.
     */
    wrap<T extends Function>(func: T, thisArg: any, arg?: any, schedulingType?: TickSchedulingType): T;
    /**
     * Registers the given value as a service with the given ID that will be available for
     * consumption by descendant components.
     * @param id Unique service identifier
     * @param value Current value of the service
     * @param depth Number of level to watch for changes. The default value is 1; that is, the
     * subscribers will be notified if the service's value or the values of its properties have
     * changed.
     * @returns Publication object, which allows setting a new value of the service or changing
     * values of its properties.
     */
    publishService<K extends keyof IServiceDefinitions>(id: K, value: IServiceDefinitions[K], depth?: number): IPublication<K>;
    /**
     * Subscribes to a service with the given ID. If the service with the given ID is registered
     * by this or one of the ancestor components, the returned subscription object's `value`
     * property will reference it; otherwise, the value will be set to the defaultValue (if
     * specified) or will remain undefined. Whenever the value of the service that is registered by
     * this or a closest ancestor component is changed, the subscription's `value` property will
     * receive the new value.
     *
     * If the subscription object's `value` property is used in a component's rendering code, the
     * component will be re-rendered every time the service value is changed.
     *
     * @param id Unique service identifier
     * @param defaultValue Optional default value that will be assigned if the service is not
     * published yet.
     * @param useSelf Flag indicating whether the search for the service should start from the
     * virtual node that calls this method. The default value is `false` meaning the search starts
     * from the parent virtual node.
     * @returns Subscription object, which provides the value of the service and allowes attaching
     * to the event fired when the value is changed.
     */
    subscribeService<K extends keyof IServiceDefinitions>(id: K, defaultValue?: IServiceDefinitions[K], useSelf?: boolean): ISubscription<K>;
}
/**
 * The IElmVN interface represents a virtual node for a DOM element.
 */
export interface IElmVN<T extends Element = Element> extends IVNode {
    /** Gets the DOM element name. */
    readonly elmName: string;
    /** Gets the DOM element object. */
    readonly elm: Element | null;
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
    readonly text: string | ITrigger<string>;
    /** Text DOM node. */
    readonly textNode: Text | null;
    /**
     * Requests update of the text.
     * @param text Text to set to the node.
     * @param schedulingType Type determining whether the operation is performed immediately or
     * is scheduled to a Mimbl tick.
     */
    setText(text: string | ITrigger<string>, schedulingType?: TickSchedulingType): void;
}
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
/** Type of properties that can be specified for an element. */
export declare const enum PropType {
    /**
     * Built-in attribute that is used internally by the Mimbl infrastructure and is not set
     * to the element.
     */
    Framework = 0,
    /** Regular attributes set using Element.setAttribute */
    Attr = 1,
    /** Event listeners set using Element.addEventListener */
    Event = 2,
    /**  Custom attributes for which handler factories are registered*/
    CustomAttr = 3
}
/**
 * The TickSchedulingType type defines possible ways of scheduling a Mimbl tick.
 */
export declare const enum TickSchedulingType {
    /**
     * The tick is executed right away in a synchronous manner. If this scheduled type is specified
     * for a callback, the tick is executed right after the callback returns.
     */
    Sync = 1,
    /** A microtask is scheduled for executing the tick */
    Microtask = 2,
    /** An animation frame is scheduled for executing the tick */
    AnimationFrame = 3
}
/**
 * Definition of type of method that renders content.
 */
export declare type RenderMethodType = (arg?: any) => any;
/**
 * Properties to be used with the PromiseProxy component.
 */
export interface PromiseProxyProps extends ICommonProps {
    /** Promise that will be watch by the waiting node. */
    promise: Promise<any>;
    /** Function that is called if the promise is rejected. */
    errorContentFunc?: (err: any) => any;
}
//# sourceMappingURL=CompTypes.d.ts.map