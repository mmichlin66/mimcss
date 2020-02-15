/**
 * This module defines types and functions that allow building CSS style sheets using TypeScript
 */



/**
 * The Ruleset type defines a style property block (a.k.a. CSS ruleset) and allows specifying the
 * "!important" modifier.
 */
export type StyleRuleset = { [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K] | [CSSStyleDeclaration[K], boolean?] }



/**
 * The ClassRule type describes a ruleset that defines style properties and can also inherit from
 * other classes.
 */
export type ClassRule = StyleRuleset | { inherits?: ClassRule[], ruleset?: StyleRuleset };



/**
 * The Keyframe type defines a single keyframe within a @keyframe rule
 */
export type Keyframe = { selector: "from" | "to" | number, ruleset: StyleRuleset }



/**
 * The KeyframeRule type describe a @keyframe rule as an array of keyframes
 */
export type KeyframeRule = Keyframe[];



/**
 * The StyleSheetDef type defines a style sheet (that becomes a <style> element in HTML). Style
 * sheet definitions consist of rules that define classes, keyframes, media conditions etc.
 */
export type StyleSheetDef = { [K: string]: ClassRule | KeyframeRule; };



/**
 * 
 * @param ruleset
 * @param inherits 
 */
export function defineClass( ruleset?: StyleRuleset, ...inherits: ClassRule[]): ClassRule
{
	return { inherits, ruleset };
}


/**
 * Utility type that represents names of all properties of type T that are of type U
 */
type PropNamesOfType<T,U> = { [K in keyof T]: T[K] extends U ? K : never}[keyof T];

/**
 * Type that represents names of all properties of type T that are class rules
 */
type ClassNames<T> = PropNamesOfType<T,ClassRule>;

/**
 * Type that represents names of all properties of type T that are keyframe rules
 */
type KeyframeNames<T> = PropNamesOfType<T,KeyframeRule>;



/**
 * The StyleSheet type defines the resultant style sheet after the style sheet definition has been
 * processed. The style sheet object contains names of IDs, classes and keyframes, which can be
 * used in the application code. The interface also provides methods that are used to manipulate
 * the style sheet and its rulesets.
 */
export type StyleSheet<T> =
{
	/** Names of classes defined in the style sheet */
	classes: { [K in ClassNames<T>]: string; };

	/** Names of keyframes defined in the style sheet */
	keyframes: { [K in KeyframeNames<T>]: string; };
}



/**
 * Processes the given style sheet definition and returns the StyleSheet object that contains
 * names of IDs, classes and keyframes and allows style manipulations.
 * @param sheetDef 
 */
export function createSheet<T>( sheetDef: T): StyleSheet<T>
{
	return {} as StyleSheet<T>;
}



class MySheetDef
{
	s: string;

	red = defineClass( { color: ["#f00", true] });
	grey = { colr: "#ccc" };
	bold = defineClass( { fontWeight: "bold" });
	exciting = defineClass( { border: "1"}, this.red, this.bold);
	move: KeyframeRule = [ { selector: "from", ruleset: { top: "0px"} } ];
}

let mySheetDef = new MySheetDef();


export let Sheet = createSheet<MySheetDef>( mySheetDef);

let x = Sheet.classes.bold;
let y = Sheet.keyframes.move;



class OtherClasses 
{
	boring = defineClass( { border: "1"}, mySheetDef.grey);
}

let otherClasses = new OtherClasses();

export let AnotherSheet = createSheet<OtherClasses>( otherClasses);


let z = AnotherSheet.classes.boring;





