import * as css from "../../index"
import * as dom from "../utils/dom"


describe("counters", () =>
{
	beforeEach(() => { dom.removeAllStylesFromHead(); })



	describe("counter- properties", () =>
	{
		it("counter-reset with CounterRule", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter();
				c = css.$class( { counterReset: this.counter })
			}
		
			let a = css.activate( A);
			dom.verifyPropValue( a!.c, "counterReset", "A_counter 0");
		
			css.deactivate( a!);
		})

		it("counter-reset with CounterRule and number", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter();
				c = css.$class( { counterReset: [this.counter, 2] })
			}
		
			let a = css.activate( A);
			dom.verifyPropValue( a!.c, "counterReset", "A_counter 2");
		
			css.deactivate( a!);
		})

		it("counter-increment with CounterRule with name override and number", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter( "cntr");
				c = css.$class( { counterIncrement: ["cntr", 1] })
			}
		
			let a = css.activate( A);
			dom.verifyPropValue( a!.c, "counterIncrement", "cntr 1");
		
			css.deactivate( a!);
		})

		it("counter-increment with two CounterRules with and without number", () =>
		{
			class A extends css.StyleDefinition
			{
				counter1 = css.$counter();
				counter2 = css.$counter();
				c = css.$class( { counterIncrement: [ this.counter1, [this.counter2, 2]] })
			}
		
			let a = css.activate( A);
			dom.verifyPropValue( a!.c, "counterIncrement", "A_counter1 1 A_counter2 2");
		
			css.deactivate( a!);
		})
	})



	describe("counter() function", () =>
	{
		it("counter() with CounterRule", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter();
				c = css.$class( { "::before": { content: css.counter( this.counter) } })
			}
		
			let a = css.activate( A);
			dom.verifyDependentPropValue( a!.c, "::before", "content", "counter(A_counter)");
		
			css.deactivate( a!);
		})

		it("counter() with CounterRule and style", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter();
				c = css.$class( { "::before": { content: css.counter( this.counter, "circle") } })
			}
		
			let a = css.activate( A);
			dom.verifyDependentPropValue( a!.c, "::before", "content", "counter(A_counter, circle)");
		
			css.deactivate( a!);
		})

		it("counter() with CounterRule and 'after' string", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter();
				c = css.$class( { "::before": { content: css.counter( this.counter, undefined, " - ") } })
			}
		
			let a = css.activate( A);
			dom.verifyDependentPropValue( a!.c, "::before", "content", "counter(A_counter) \" - \"");
		
			css.deactivate( a!);
		})

		it("counter() with CounterRule, style, 'after' and 'before' strings", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter();
				c = css.$class( { "::before": { content: css.counter( this.counter, "disc", " - ", "...") } })
			}
		
			let a = css.activate( A);
			dom.verifyDependentPropValue( a!.c, "::before", "content", "\"...\" counter(A_counter, disc) \" - \"");
		
			css.deactivate( a!);
		})
	})



	describe("counters() function", () =>
	{
		it("counters() with CounterRule and separator", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter();
				c = css.$class( { "::before": { content: css.counters( this.counter, ".") } })
			}
		
			let a = css.activate( A);
			dom.verifyDependentPropValue( a!.c, "::before", "content", "counters(A_counter, \".\")");
		
			css.deactivate( a!);
		})

		it("counters() with CounterRule, separator and style", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter();
				c = css.$class( { "::before": { content: css.counters( this.counter, ".", "circle") } })
			}
		
			let a = css.activate( A);
			dom.verifyDependentPropValue( a!.c, "::before", "content", "counters(A_counter, \".\", circle)");
		
			css.deactivate( a!);
		})

		it("counters() with CounterRule, separator and 'after' string", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter();
				c = css.$class( { "::before": { content: css.counters( this.counter, ".", undefined, " - ") } })
			}
		
			let a = css.activate( A);
			dom.verifyDependentPropValue( a!.c, "::before", "content", "counters(A_counter, \".\") \" - \"");
		
			css.deactivate( a!);
		})

		it("counters() with CounterRule, separator, style, 'after' and 'before' strings", () =>
		{
			class A extends css.StyleDefinition
			{
				counter = css.$counter();
				c = css.$class( { "::before": { content: css.counters( this.counter, ".", "disc", " - ", "...") } })
			}
		
			let a = css.activate( A);
			dom.verifyDependentPropValue( a!.c, "::before", "content", "\"...\" counters(A_counter, \".\", disc) \" - \"");
		
			css.deactivate( a!);
		})
	})



})



