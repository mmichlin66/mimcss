# Mimcss: Style Authoring in TypeScript

Mimcss is a TypeScript library that allows authoring CSS styles without creating CSS files. Instead, the styles are created via TypeScript programming. You code your styling rules including CSS classes, selectors, animations (keyframes), media etc., by creating TypeScript classes. The Mimcss library processes these classes and creates the rules that are inserted into a `<style>` element in the `<head>` of you HTML document. As a result, your application or library bundle is self contained and doesn't require a separate CSS bundle. There are more benefits to this way of creating styles, but first let's talk about the motivation for creating Mimcss.

### Quick Start
Let's assume that we need to create several simple styles for a couple of classes and an ID. With CSS you would create a CSS file and then, in your component's TypeScript code, you would refer to the CSS classes using their names as string literals:

```css
/* MyStyles.css */
.vbox {
    display: flex;
    flex-direction: column;
}

.hbox {
    display: flex;
    flex-direction: row;
}

#important-element {
    background-color: #FFCC88;
    font-weight: bold;
}
```

```tsx
/* MyComponent.tsx */
import "./MyStyles.css"

render()
{
    return <div className="vbox">
        <div id="important_element"/>
        <div className="hbox"/>
   </div>
}
```

With Mimcss, you create a TypeScript class and then, in your component's TypeScript code, you refer to the CSS classes using their names as properties:

```tsx
/* MyStyles.ts */
import {$class, $id} from "mimcss"

class MyStyles
{
    vbox = $class({
        display: "flex",
        flexDirection: "column",
    });

    hbox = $class({
        display: "flex",
        flexDirection: "row",
    });

    importantElement = $id({
        color: "blue",
        fontWeight: bold,
    });
}

/* MyComponent.tsx */
import {$activate} from "mimcss"
import {myStyles} from "./MyStyles"

export let myStyles = $activate( MyStyles);

render()
{
    return <div className={myStyles.classes.vbox}>
        <p id={myStyles.ids.importantElement}>Hello!</p>
        <div className={myStyles.classNaes.hbox}/>Hello!</div>
   </div>
}
```

The TypeScript variant is obviously more verbose; however, let's see what we get in return. As we define our classes and IDs as properties of the MyStyles class, they automatically become properties of the `MyStyles.classes` and `MyStyles.ids` objects. This immediately brings us the following advantages:

- The Intellisense mechanism of our IDE will prompt us with the list of defined names. As soon as we type `MyStyles.classes` the IDE will present the list of all the classes defined in our style definition object. Note that Mimcss puts names of classes and IDs (as well as animations and custom properties) into different objects, so that the chances that you use an ID name instead of a class name are lower.
- If we change the name of or remove the property in the MyStylesDefinition class and forget to change it in our component's `render` method, the project will not build. Thus a compile time error will prevent a much-harder-to-find run-time error.
- Don't know if you noticed but there was a misspelling of the identifier name in the CSS-based `render` method above: we "accidentally" used the underscore instead of the dash. Such errors would only manifest themselves at run-time and they are notoriously difficult to find. In Mimcss-based code, such run-time errors are simply not possible because they will be detected at compile time.
- The names we are using in our code are not actually the names that will be used in the resulting HTML. The actual names to use in HTML will be defined based on several factors described later; the important fact is that the Mimcss infrastructure ensures that they will be unique.
- The `import "./MyStyles.css"` statement in the CSS-based component file doesn't work on its own but only with the help of a plug in to our bundler (e.g. Webpack). In Mimcss code, there is no need in such a plug in - everything is just a pure TypeScript code.

For more information please check out this [Mimcss Guide](https://mmichlin66.github.io/mimcss/mimcssAbout.html)
