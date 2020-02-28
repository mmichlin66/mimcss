# Mimcss: Style Authoring in TypeScript

Mimcss is a TypeScript library that allows authoring CSS styles without creating CSS files. Instead, the styles are created via TypeScript programming. You code your styling rules including CSS classes, selectors, animations (keyframes), media etc., by creating TypeScript classes. The Mimcss library processes these classes and creates the rules that are inserted into a `<style>` element in the `<head>` of you HTML document. As a result, your application or library bundle is self contained and doesn't require a separate CSS bundle. There are more benefits to this way of creating styles, but first let's talk about the motivation for creating Mimcss.

## Motivation
We increasingly create our Web applications using TypeScript. As a typed language it offers significant benefits to developers in the following ways:

- Many errors that would be only detected at run-time when using JavaScript, are compile-time errors with TypeScript.
- IDEs provide significant help by prompting for appropriate types and values as developers write code.

We get the above benefits when laying out the HTML structure of our pages or components as TypeScript has a built-in type checking for JSX. We don't, however, get any help when we need to refer to CSS entities from our code. How many times did you chase a bug, which turned out to be a misspelled CSS class name? How frustrating is it, when you are writing a component and you know that there is a CSS class for a proper styling, that you just don't remember the class name and have to dig through piles of CSS files to find it? Another common issue is with scoping CSS rule names: are you using BEM notation to create the unique but unwieldy names? What about creating CSS rules that are very similar to each other but are still slightly different?

There are many attempts to address the above issues. Most of them use CSS pre-processors and are usually part of the build pipeline. The problem with the pre-processors is that they don't provide any help while you are writing your code. If you create a new class in a CSS file and then go to your code where you need to use it, without running the pre-processor, your IDE will not know that a new class has been created and will not prompt you with its name.

Mimcss takes a different approach by dispensing with CSS files altogether. You just don't write CSS files; instead you write TypeScript code, which becomes an integral part of your application or library bundle. You define you class, ID and animation names as members of a class and as soon as you do that the magic of the TypeScript's powerful typing system makes these names available to your application code as named properties of your class.

#### Example 1
Assume we need to create several simple styles for a couple of classes and an ID. With CSS you would create a CSS file and then, in your component's TypeScript code, you would refer to the CSS classes using their names as string literals:

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

```typescript
/* MyStyles.ts */
import {$class, $id, $scope} from "mimcss"

export let MyStyles = $scope( class MyStyles
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
});
```

```tsx
/* MyComponent.tsx */
import {MyStyles} from "./MyStyles"

render()
{
    return <div className={MyStyles.classNames.vbox}>
        <p id={MyStyles.idNames.importantElement}>Hello!</p>
        <div className={MyStyles.classNames.hbox}/>Hello!</div>
   </div>
}
```

The TypeScript variant is obviously more verbose; however, let's see what we get in return. As we define our classes and IDs as properties of the MyStyles class, they automatically become properties of the `MyStyles.classNames` and `MyStyles.idNames` objects. This immediately brings us the following advantages:

- The intellisense mechanism of our IDE will prompt us with the list of defined names. As soon as we type `MyStyles.classNames` the IDE will present the list of all the classes defined in our style definition object. Note that Mimcss puts names of classes and IDs (as well as animations and custom properties) into different objects, so that the chances that you use an ID name instead of a class name are lower.
- If we change the name of or remove the property in the MyStylesDefinition class and forget to change it in our component's `render` method, the project will not build. Thus a compile time error will prevent a much-harder-to-find run-time error.
- The names we are using in our code are not actually the names that will be used in the resulting HTML. The actual names to use in HTML will be defined based on several factors described later; the important fact is that the Mimcss infrastructure ensures that they will be unique.
- Don't know if you noticed but there was a misspelling of the identifier name in the CSS-based `render` method above: we "accidentally" used the underscore instead of the dash. Such errors will only manifest themselves at run-time and they are notoriously difficult to find. In Mimcss-based code, such run-time errors are simply not possible because they will be detected at compile time.
- The `import "./MyStyles.css"` statement in the CSS-based component file doesn't work on its own but only with the help of a plug in to our bundler (e.g. Webpack). In Mimcss code, there is no need in such a plug in - everything is just a pure TypeScript code.

### Names in Mimcss
We already mentioned that the names you use for referring to your classes, IDs, animations and custom properties are not the names that are actually used in HTML. Different classes can define properties with identical names and they will be unique when applied to HTML.

Consider the following example, where we have two classes (that might be coming from different libraries):

```tsx
/* MyStyles.ts */
export let MyStyles = $scope( class MyStyles
{
    emphasized = $class({ color: "red", fontWeight: "700" });
});

/* OtherStyles.ts */
export let OtherStyles = $scope( class OtherStyles
{
    emphasized = $class({ color: "orange", fontStyle: "italic" });
});

/* MyComponent.tsx */
import {MyStyles} from "./MyStyles"
import {OtherStyles} from "./OtherStyles"

render()
{
    return <div>
        <p className={MyStyles.classNames.emphasized}>Hello!</p>
        <p className={OtherStyles.classNames.emphasized}>Hello!</p>
   </div>
```
Mimcss has two modes of assigning names and both ensure that they are unique within your application.

The first mode is called "Scoped" and it creates names that combine the name of the class that defined the property and the name of the property itself, thus creating a two-level scoping. In the above example, the string value of the `MyStyles.classNames.emphasized` property will be `".MyStyles_emphasized"`, while the string value of the `OtherStyles.classNames.emphasized` property will be `".OtherStyles_emphasized"`. These names clearly refer to the place where the class was defined and, therefore, this method should be used during development.

The second method of assigning names is called "Unique" and it produces names by appending an incrementally increasing number to a prefix. The default prefix is `"n"` but it can be changed programmatically. In the example above, the string values of the two classes might be generated as `"n34"` and `"n73"`. This method produces short names without a real possibility to relate back to the place in the code where they were defined; therefore, this method should be used for release builds.

The default mode is Scoped. In order to switch to the Unique mode, the application should call the Mimcss's `useUniqueMode` function. This function accepts an optional `prefix` parameter that can specify the prefix to be used for generating unique names. The `useUniqueMode` function must be called very early in the application life because the mode must be set before any style definition classes are processed.

### Reusing Styles
With CSS pre-processors, the idea of a style rule re-using (a.k.a. extending) other rules became very popular. Mimcss also has this capability and it uses the TypeScript's type-safety features to eliminate errors. Here is an example:

```typescript
export let MyStyles = $scope( class MyStyles
{
    vbox = $class({ display: "flex", flexDirection: "column", });

    sidebar = $class({
        $extends: this.vbox,
        position: "absolute",
        width: "15em",
        height: "50em"
    });

    standout = $class({ boxShadow: "10px 5px 5px red;", });

    rightbar = $class({
        $extends: [this.sidebar, this.standout],
        left: "1em",
    });
});
```
The `"sidebar"`class extends the `"vbox"` class, while the `"rightbar"` class extends two other classes: `"sidebar"` and `"standout"`. Note how we reuse the previously defined classes by referring to them via the property names (e.g. `this.vbox`). These are not just strings, but strongly types objects, which prevents misspelling errors.

Mimcss leverages the trick learned from CSS-Modules, where the class that extends other classes doesn't repeat their styling properties; instead, the class name that is applied in HTML consists of multiple class names. In the above example, the string value for the `MyStyles.classNames.sidebar` property will be `"MyStyles_sidebar MyStyles_vbox"` and the string value for the `MyStyles.classNames.rightbar` property will be `"MyStyles_rightbar MyStyles_sidebar MyStyles_vbox MyStyles_standout"`. (Non-class rules (e.g. ID or selector-based) can derive from class rules and vice versa; however, this can only be implemented via styles repetition.)

It is possible to derive from classes defined in different scopes - whether from the same project or from a different (e.g. 3rd-party) library. We can reconstruct the above example using two style scopes:

```typescript
/* LibStyles.ts */
export let LibStyles = $scope( class LibStyles
{
    vbox = $class({ display: "flex", flexDirection: "column", });

    standout = $class({ boxShadow: "10px 5px 5px red;", });

});

/* MyStyles.ts */
import {LibStyles} from "./LibStyles"

export let MyStyles = $scope( class MyStyles
{
    sidebar = $class({
        $extends: LibStyles.classRules.vbox,
        position: "absolute",
        width: "15em",
        height: "50em"
    });

    rightbar = $class({
        $extends: [this.sidebar, LibStyles.classRules.standout],
        left: "1em",
    });
});
```

The `classStyle` property (in our example, of the `LibStyles` object) contains class rules defined in that scope. Note, again, that these are not strings, but strongly types objects.

### Types of Rules
So far we have been playing with mostly class and ID styling rules. CSS has many different types of rules in addition to classes and IDs: tag-based, selector-based, custom properties, animations (@keyframes), @media, @support, etc.

Mimcss supports these types with a syntax similar to that of classes. There are two distinct kinds of rules that Mimcss recognizes: those that produce names and those that don't. Rules that produce names are: classes, IDs, animations and custom properties. The names that these rules produce are accessed as properties under the `classNames`, `idNames`, `animationNames` and `varNames` objects respectively. In order to properly produce a name, the rules should be used as an assignment to a class member:

```typescript
export let MyStyles = $scope( class MyStyles
{
    vbox = $class({ display: "flex", flexDirection: "column", });

    standout = $id({ boxShadow: "10px 5px 5px red;", });

    defaultColor = $custom({ color: "black", });

});
```

The other kind of rules are those that don't produce names. For example, a selector based rule doesn't produce a name of its own (although it usually uses names (e.g. of classes) produced by other rules). Such rules can be created in two different ways:

```typescript
export let MyStyles = $scope( class MyStyles
{
    hr = $rule( "hr", { width: "100%" });
    firstRowInTable = $rule( "table row:first-of-type" , { color: "blue", });
});

// OR

export let MyStyles = $scope( class MyStyles
{
    constrcutor( options: StyleScopeDefinitionOptions)
    {
        options.unnamedRules = [
            $rule( "hr", { width: "100%" }),
            $rule( "table row:first-of-type" , { color: "blue", }),
        ]
    }
});

```

The first form creates a property in the style definition class and makes the rule object accessible via this property in the `allRules` object (e.g. `MyStyles.namedRules.firstRowInTable`). This allows manipulating the rule programmatically - we will see how later. The second form doesn't create any property and doesn't make the rule available for programmatic manipulation and is suitable for rules that remain unchanged forever.





