/**
 * Represents options for the virtualization process, which define methods that determine what
 * kind of properties should be virtualized and what actions should be performed when properties
 * are added, removed or replaced.
 */
export interface IPropVirtController
{
    /**
     * Determines whether a virtual proxy should be created for the given value of a property. If
     * this function is not defined, all properties are virtualized
     * @param val Value to decide whether or not to virtualize.
     * @param path Array of property names leading from the root object to the property.
     * @return True if the value should be virtualized and false otherwise.
     */
    shouldVirtProp?: (val: any, path: PropertyKey[]) => boolean;

    /**
     * Performs an action on the given value when the value is set to a new property or when it
     * replaces a null/undefined value of an existing property.
     * @param val Value being assigned to the property
     * @param path Array of property names leading from the root object to the property.
     */
    addVirtProp?: (val: any, path: PropertyKey[]) => void;

    /**
     * Performs an action on the given value when the property value is replaced by null or
     * undefined value.
     * @param val Old value of the property being removed or being replaced by null or undefined.
     * @param path Array of property names leading from the root object to the property.
     */
    deleteVirtProp?: (val: any, path: PropertyKey[]) => void;

    /**
     * Updates the given old value of the property using the given new value. The function returns
     * true if the update was successful. In this case, the old value is not replaced the old one.
     * If this function is not defined or if it returns true, the new value is assigned to the
     * property and virtualized.
     * @param oldVal Current value of the property.
     * @param newVal New value being assigned to the property.
     * @param path Array of property names leading from the root object to the property.
     * @returns Flag indicating whether the update was successful.
     */
    updateVirtProp?: (oldVal: any, newVal: any, path: PropertyKey[]) => boolean;
}



// /**
//  * Dummy function used as a target for all virtualization proxies. We need a function and
//  * not an object to support proxies to functions (`apply` and `construct` handler methods).
//  */
// const fakeTarget = () => {}
const fakeTarget = {}



/**
 * Symbol that is used to retrieve the handler from the virtualization proxy.
 */
 const symHandler = Symbol("h");

 /**
  * Symbol that is used to ask the virtualization proxy to return the current value it works with.
  */
 const symValue = Symbol("v");



 /**
 * Retrieves the non-virtualized value from the given virtual proxy. If the given value `x` is NOT
 * a virtual proxy, the value itself is returned; otherwise, the value contained by the proxy is
 * returned.
 * @param x Virtual proxy whose underlying non-virtualized value is returned
 * @returns Non-virtualized value underlying the given virtual proxy
 */
export const getvv = (x: any): any | undefined => isProxy(x) ? getvv(x[symValue]) : x;

/**
 * Sets a new value to the given virtual proxy. If the given value `x` is NOT a
 * virtual proxy, undefined is returned; otherwise, the value contained by the proxy is returned.
 * @param x Virtual proxy whose underlying non-virtualized value is returned
 * @param v Value to set to the virtual proxy
 */
export const setvv = (x: any, v: any): void =>
{
    if (isProxy(x))
    {
        v = getvv(v);
        if (isProxyPossible(v))
            x[symValue] = v;
    }
}



// export const isProxy = (v: any): boolean => typeof v === "function" && !!v[symHandler];
export const isProxy = (v: any): boolean => v !== null && typeof v === "object" && !!v[symHandler];
export const isUndefined = (v: any): boolean => getvv(v) === undefined;
export const isNull = (v: any): boolean => getvv(v) === null;
export const isEmpty = (v: any): boolean => getvv(v) == null;

export const isObjectOrNull = (v: any): boolean => typeof getvv(v) === "object";
export const isObject = (v: any): boolean => { let vv = getvv(v); return !!vv && typeof vv === "object"; }
export const isPOJO = (v: any): boolean => { let vv = getvv(v); return vv?.constructor === Object; }
export const isArray = (v: any): boolean => { let vv = getvv(v); return vv?.constructor === Array; }
export const isFunction = (v: any): boolean => typeof getvv(v) === "function";



/** Virtualization is not possible for primitive types */
const isProxyPossibleForType = ( type: string): boolean => ["undefined", "object", "function"].includes( type);

/** Virtualization is not possible for primitive types */
const isProxyPossible = ( val: any): boolean => isProxyPossibleForType( typeof val);

/**
 * Helper function that determines whether the given value can be recursively virtualized
 */
const canVirtRecursively = (v: any) => v != null && (v.constructor === Object || v.constructor === Array);
// const canVirtRecursively = isPOJO;

/**
 * Helper function that virtualizes all suitable properties of the given object or array
 */
const virtAllProps = (obj: any, path: PropertyKey[], controller?: IPropVirtController): void =>
{
    for( let key in obj)
        virtProp( obj, key, obj[key], path.concat(key), controller);
}

/**
 * Helper function that goes over all suitable properties of the given object or array and informs
 * the controller that these proerties are being "deleted".
 */
const deleteAllProps = (val: any, path: PropertyKey[], controller?: IPropVirtController): void =>
{
    for( let key in val)
        virtProp( val, key, null, path.concat(key), controller);
}



/**
 * Returns a virtualization proxy for the given value if it can be virtualized. Primitive types
 * `number`, `string`, `boolean`, `symbol` and `bigint` cannot be virtualized. For these types, the
 * function returns the input value itself.
 * @param val Optional value to virtualize
 * @param recursive If the input value is a POJO or an array, this flag indicates whether to
 * recursively virtualize the value's properties.
 * @returns Virtual proxy initializes with the input value or the input value itself if it is of
 * a primitive type that cannot be virtualized.
 */
export const virt = (val?: any, recursive?: boolean): any =>
{
    if (!isProxyPossible(val))
        return val;

    // let x = new Proxy( fakeTarget, new VirtHandler(val));
    let x = new Proxy( {}, new VirtHandler(val));
    if (recursive && val != null && typeof val === "object")
        virtAllProps( val, []);

    return x;
}



/**
 * Virtualizes the property with the given name and value of the given object.
 * @param obj Object, whose property to virtualize.
 * @param key Name of the property to virtualize.
 * @param val Value to virtualize.
 * @param root Root object from which the property path leads to the property.
 * @param path Array of property names leading from the root object to the property.
 * @param controller Optional object further specifying virtualization behavior.
 */
export const virtProp = (obj: any, key: PropertyKey, val: any,
    path: PropertyKey[], controller?: IPropVirtController): void =>
{
    // if the value is a virtual proxy itself, get the underlying value from it
    val = getvv(val);

    // check whether we can just assign the value to the object's property without creating new
    // proxy and getter/setter. We do this in the following situations:
    // 1. The property is not virtualizable (e.g. of a primitive type), OR
    // 2. The property already exists in the object the value is already a virtual proxy, OR
    // 3. The property cannot be virtualized recursivley (not a POJO) AND the controll doesn't
    //    want it to be virtualized
    let propAlreadyExists = key in obj;
    let canRecurseIntoProp = canVirtRecursively(val);
    if (!isProxyPossible(val) || (propAlreadyExists && isProxy(obj[key])) ||
        (!canRecurseIntoProp && controller?.shouldVirtProp && !controller?.shouldVirtProp( val, path)))
    {
        obj[key] = val;
        return;
    }

    // check whether we can virtualize this value; if we can't virtualize it, just set it as the
    // property value. First, the value must not be a primitive. Second, it must either be
    // a POJO or an array or, the controller should indicate that it wants it virtualized.
    if (!isProxyPossible(val) || (!canRecurseIntoProp &&
            controller?.shouldVirtProp && !controller?.shouldVirtProp( val, path)))
    {
        obj[key] = val;
        return;
    }

    // create the proxy object
    let handler = new VirtHandler(val);
    let proxy = new Proxy( fakeTarget, handler);

    if (propAlreadyExists)
        delete obj[key];

    // define enumerable property with get and set
    Object.defineProperty( obj, key,
    {
        enumerable: true,

        get(): any { return proxy; },

        set( newVal: any): void
        {
            // if the value is a virtual proxy itself, get the underlying value from it
            newVal = getvv(newVal);

            // if the value is the same, do nothing
            let oldVal = getvv(handler.v);
            if (newVal == oldVal)
                return;

            // if the update function is defined and returns true (that is, it just updated
            // something in the old value with the new value), do nothing.
            if (controller?.updateVirtProp && controller.updateVirtProp( handler.v, newVal, path))
                return;

            // if virtualization of the new value is not possible, do nothing. This will leave
            // the property with the old value
            if (!isProxyPossible(newVal))
                return;

            let canOldRecurse = canVirtRecursively(oldVal);
            let canNewRecurse = canVirtRecursively(newVal);
            if (canOldRecurse && canNewRecurse)
            {
                // merge properties from the new object to the old object
                for( let key in newVal)
                    oldVal[key] = newVal[key];
                return;
            }

            // set the new value to the handler so that it will use it from now on.
            handler.v = newVal;

            // if the old value was defined and was not recursible, inform the controller to delete it
            if (canOldRecurse)
                deleteAllProps?.( oldVal, path);
            else if (oldVal != null)
                controller?.deleteVirtProp?.( oldVal, path);

            // if the new value is recursible, virtualize all its properties; otherwise, if the new
            // value is defined, inform the controller to add it
            if (canNewRecurse)
                virtAllProps( newVal, path, controller);
            else if (newVal != null)
                controller?.addVirtProp?.( newVal, path);
        }
    });

    // if the new value is defined and is not recursible, inform the controller to add it
    if (canRecurseIntoProp)
        virtAllProps( val, path, controller);
    else if (val != null)
        controller?.addVirtProp?.( val, path);
}



/**
 * Handler for the proxy created by the `virt` function. It keeps the current value of a
 * rule so that the most recent value is used whenever the proxy is accessed.
 */
class VirtHandler implements ProxyHandler<any>
{
    /** The latest value to use for all proxy handler operations */
    public v: any;

    constructor( v: any)
    {
        this.v = v;
    }

    get( t: any, p: PropertyKey, r: any): any
    {
        let v = this.v;
        if (p === symHandler)
            return this;
        if (p === symValue)
            return v;

        // else if (p === Symbol.toPrimitive)
        // {
        //     let type = typeof v;
        //     return v == null || type=== "function" ? undefined :
        //         type === "number" || type === "bigint" ? (hint: string) => hint === "string" ? "" + v : v :
        //         type === "object" ? v[p] :
        //         () => "" + v;
        // }
        // else if (p === "toString")
        //     return () => "" + v;
        // else if (p === "valueOf")
        //     return () => +v;

        // if (v == null)
        //     return undefined;

        // get the value of the request property; if "this.v" is null or undefined, an exception
        // will be thrown - which is expected.
        let ret = getvv( v[p]);

        // if the requested property is a function, bind the original method to the target object
        return typeof ret === "function" && p !== "constructor" ? ret.bind( v) : ret;
    }

    set( t: any, p: PropertyKey, v: any, r: any): boolean
    {
        if (p === symValue)
            this.v = v;
        else
            this.v[p] = v;

        return true;
    }

    // the rest of the methods mostly delegate the calls to the latest value instead of the
    // original target. In some cases, we check whether the target is null or undefined so that
    // we don't throw exceptions where we can avoid it.

    getPrototypeOf( t: any): object | null
        { return this.v == null ? null : Reflect.getPrototypeOf( this.v); }
    setPrototypeOf(t: any, v: any): boolean
        { return Reflect.setPrototypeOf( this.v, v); }
    isExtensible(t: any): boolean
        { return this.v == null ? false : Reflect.isExtensible( this.v); }
    preventExtensions(t: any): boolean
        { return this.v == null ? false : Reflect.preventExtensions( this.v); }
    getOwnPropertyDescriptor(t: any, p: PropertyKey): PropertyDescriptor | undefined
        { return Reflect.getOwnPropertyDescriptor( this.v, p); }
    has(t: any, p: PropertyKey): boolean
        { return this.v == null ? false : Reflect.has( this.v, p); }
    deleteProperty(t: any, p: PropertyKey): boolean
        { return Reflect.deleteProperty( this.v, p); }
    defineProperty(t: any, p: PropertyKey, attrs: PropertyDescriptor): boolean
        { return Reflect.defineProperty( this.v, p, attrs); }
    ownKeys(t: any): ArrayLike<string | symbol>
        { return Reflect.ownKeys( this.v); }
    // apply(t: any, thisArg: any, args?: any): any
    //     { return Reflect.apply( this.v, thisArg, args); }
    // construct(t: any, args: any, newTarget?: any): object
    //     { return Reflect.construct( this.v, args, newTarget); }
}



