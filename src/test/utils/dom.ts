import * as css from "../../mimcssTypes"



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
export function verifyPropValue( rule: css.IStyleRule, propName: string, expected: string)
{
	expect(rule.cssRule?.style[propName]).toEqual( expected);
}



// Verifies that the CSS rule for the given style rule has the given values of the given properties.
export function verifyMultiPropValues( rule: css.IStyleRule, expected: {[K: string]: string})
{
	let style = rule.cssRule?.style!;
	for( let propName in expected)
	{
		expect(style[propName]).toEqual( expected[propName]);
	}
}



