import * as mim from "mimbl";
import * as css from "mimcss"


// Define styles for our component
class MyStyles extends css.StyleDefinition
{
    cls1 = this.$class({
    })
}

// activate our styles
let styles = css.activate( MyStyles);

// Define component
class MyComponent extends mim.Component
{
	public render()
	{
		return <div class={styles.cls1}>
            Hello
        </div>
	}
}

// Mount our component under the body element.
mim.mount( new MyComponent());


