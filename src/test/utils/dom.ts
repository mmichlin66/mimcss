import * as css from "../../index"
import {Styleset} from "../../api/Stylesets";
import {camelToDash} from "../../impl/Utils";



// Retrieves all <style> elements from the <head>
export function getAllStylesFromHead(): HTMLStyleElement[]
{
	return Array.from( document.head.getElementsByTagName("style"));
}



// Returns <style> element with the given ID
export function getStyleElementWithID( id: string): HTMLStyleElement | null
{
	return document.getElementById( id) as HTMLStyleElement;
}



// Remove all <style> elements from the <hed>
export function removeAllStylesFromHead()
{
	let styleElms = getAllStylesFromHead();
	for( let styleElm of styleElms)
		styleElm.remove();
}



// Fails the test if there are any <style> elements in the <head>
export function expectNoStylesInHead()
{
	let styleElms = document.head.getElementsByTagName("style");
	expect(styleElms.length).toEqual(0);
}



// Verifies that the CSS rule for the given style rule has the given value of the given property.
export function verifyPropValue( rule: css.IStyleRule, propName: string, ...expected: string[])
{
	expect(expected).toContain(rule.cssRule?.style[camelToDash( propName)]);
}



// Verifies that the CSS rule for the given style rule has the given value of the given property.
export function verifyPropPriority( rule: css.IStyleRule, propName: string, expectedPrioriy: boolean)
{
	expect(rule.cssRule?.style.getPropertyPriority( camelToDash( propName))).toEqual( expectedPrioriy ? "important" : "");
}



// Verifies that the CSS rule for the given style rule and the given dependent property has the
// given value of the given property.
export function verifyDependentPropValue( rule: css.IStyleRule, dependentProp: string,
	propName: string, ...expected: string[])
{
	expect(expected).toContain(rule.dependentRules[dependentProp].cssRule?.style[camelToDash( propName)]);
}



// Verifies that the CSS rule for the given style rule has the given values of the given properties.
export function verifyMultiPropValues( rule: css.IStyleRule, expected: {[K: string]: string})
{
	let style = rule.cssRule?.style!;
	for( let propName in expected)
		expect(style[camelToDash( propName)]).toEqual( expected[propName]);
}



// Runs a test on a single longhand style property.
export function testLonghandProp<K extends keyof Styleset>( propName: K, propVal: Styleset[K], ...expected: string[])
{
	class A extends css.StyleDefinition
	{
		c = this.$class( { [propName]: propVal })
	}

	let a = css.activate( A);
	verifyPropValue( a.c, propName, ...expected);

	css.deactivate( a);
}



// Runs a test on a single longhand style property.
export function testShorthandProp<K extends keyof Styleset>( propName: K, propVal: Styleset[K],
	expected: { [K: string]: string })
{
	class A extends css.StyleDefinition
	{
		c = this.$class( { [propName]: propVal })
	}

	let a = css.activate( A);
	verifyMultiPropValues( a.c, expected);

	css.deactivate( a);
}



// Runs a test on a single longhand style property.
export function testPropPriority<K extends keyof Styleset>( propName: K, propVal: Styleset[K], expectedPriority: boolean)
{
	class A extends css.StyleDefinition
	{
		c = this.$class( { [propName]: propVal })
	}

	let a = css.activate( A);
	verifyPropPriority( a.c, propName, expectedPriority);

	css.deactivate( a);
}



