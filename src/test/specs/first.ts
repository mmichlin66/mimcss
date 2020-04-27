import * as css from "../../mimcssTypes"

describe("activation", () =>
{
	it("should inserts <style> element", () =>
	{
		class MyStyles extends css.StyleDefinition
		{
			red = css.$class({ color: "red" })
		}

		let myStyles = css.$activate( MyStyles);
		let elm = document.getElementById( "MyStyles");
		expect(elm).not.toBeNull();
		expect(elm!.tagName.toLowerCase()).toEqual("style");

		css.$deactivate( myStyles!);
		elm = document.getElementById( "MyStyles");
		expect(elm).toBeNull();
	})
})


