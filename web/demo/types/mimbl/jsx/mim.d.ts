import { ICommonProps, IComponent, ICustomWebElements } from "../api/CompTypes";
import { IHtmlIntrinsicElements } from "../api/HtmlTypes";
import { ISvgIntrinsicElements } from "../api/SvgTypes";
/**
 * Namespace defining interfaces used by TypeScript to type-check JSX expressions.
 */
export declare namespace JSX {
    type Element = any;
    interface ElementClass extends IComponent {
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
    interface IntrinsicClassAttributes<T> extends ICommonProps<T> {
    }
}
/**
 * JSX Factory function. In order for this function to be invoked by the TypeScript compiler, the
 * `tsconfig.json` file must have the following options:
 *
 * ```json
 * "compilerOptions":
 * {
 *     "jsx": "react",
 *     "jsxFactory": "mim.jsx"
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
 * An artificial `Fragment` component that is only used as a temporary collection of other items
 * in places where JSX only allows a single item. Our JSX factory function creates a virtual node
 * for each of its children and the function is never actually called.
 *
 * The `Fragment` component can be used directly; however, the better way is to set the
 * `jsxFragmentFactory` compiler option in the `tsconfig.json` file to `mim.Fragment` and use the
 * TypeScripts `<>...</> construct as in the following example:
 *
 * ```tsx
 *	import * as mim from "mimbl"
 *	.....
 *	render()
 *	{
 *		return <>
 *			<div1/>
 *			<div2/>
 *			<div3/>
 *		</>
 *	}
  ```

 * @param props
 */
export declare function Fragment(): any;
//# sourceMappingURL=mim.d.ts.map