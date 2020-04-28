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



