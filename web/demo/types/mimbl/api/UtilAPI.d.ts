/**
 * Determines whether the given element is one of the elements from the SVG spec; that is, <svg>
 * or any other from SVG.
 * @param elm Element to test
 */
export declare function isSvg(elm: Element): boolean;
/**
 * Determines whether the given element is the <svg> element.
 * @param elm  Element to test
 */
export declare function isSvgSvg(elm: Element): boolean;
/**
 * Type that extends the Promise class with the resolve and reject methods so that the promise can
 * be created in one place and resolved or rejected in a different place.
 */
export declare type PromiseEx<T = any> = Promise<T> & {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
};
/**
 * Creates Promise objects that can be resolved or rejected externally. The returned PromiseEx
 * object has resolve and reject methods.
 */
export declare function createPromiseEx<T = any>(): PromiseEx<T>;
/**
 * function to create Promise objects that can be resolved or rejected externally. The returned
 * Promise object has resolve and reject methods.
 */
export declare class Defer<T = any> extends Promise<T> {
    constructor();
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}
