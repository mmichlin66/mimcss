/**
 * Represents options for the virtualization process, which define methods that determine what
 * kind of properties should be virtualized and what actions should be performed when properties
 * are added, removed or replaced.
 */
export interface IPropVirtController {
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
/**
* Retrieves the non-virtualized value from the given virtual proxy. If the given value `x` is NOT
* a virtual proxy, the value itself is returned; otherwise, the value contained by the proxy is
* returned.
* @param x Virtual proxy whose underlying non-virtualized value is returned
* @returns Non-virtualized value underlying the given virtual proxy
*/
export declare const getvv: (x: any) => any | undefined;
/**
 * Sets a new value to the given virtual proxy. If the given value `x` is NOT a
 * virtual proxy, undefined is returned; otherwise, the value contained by the proxy is returned.
 * @param x Virtual proxy whose underlying non-virtualized value is returned
 * @param v Value to set to the virtual proxy
 */
export declare const setvv: (x: any, v: any) => void;
export declare const isProxy: (v: any) => boolean;
export declare const isUndefined: (v: any) => boolean;
export declare const isNull: (v: any) => boolean;
export declare const isEmpty: (v: any) => boolean;
export declare const isObjectOrNull: (v: any) => boolean;
export declare const isObject: (v: any) => boolean;
export declare const isPOJO: (v: any) => boolean;
export declare const isArray: (v: any) => boolean;
export declare const isFunction: (v: any) => boolean;
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
export declare const virt: (val?: any, recursive?: boolean | undefined) => any;
/**
 * Virtualizes the property with the given name and value of the given object.
 * @param obj Object, whose property to virtualize.
 * @param key Name of the property to virtualize.
 * @param val Value to virtualize.
 * @param root Root object from which the property path leads to the property.
 * @param path Array of property names leading from the root object to the property.
 * @param controller Optional object further specifying virtualization behavior.
 */
export declare const virtProp: (obj: any, key: PropertyKey, val: any, path: PropertyKey[], controller?: IPropVirtController | undefined) => void;
/**
 * Recursively merges properties of the given list of objects to the given target. If the target
 * is not specified a POJO is created and returned; otherwise, the input target object is returned.
 * @param target Object to merge properties to. If undefined or null, a plain object is created as
 * target.
 * @param objects List of objects to merge properties from
 * @returns The target object with merged properties.
 */
export declare const virtMerge: (target: any, ...objects: any[]) => any;
//# sourceMappingURL=Virt.d.ts.map