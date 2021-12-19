# Mimcss: Style Authoring in TypeScript

[![npm version](https://badge.fury.io/js/mimcss.svg)](https://badge.fury.io/js/mimcss) [![Join the chat at https://gitter.im/mimcss/general](https://badges.gitter.im/mimcss/general.svg)](https://gitter.im/mimcss/general?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Mimcss is a CSS-in-JS library that allows authoring CSS styles without creating CSS files. You code your style rules including CSS tags, classes, animations, media etc. by creating TypeScript classes. The Mimcss library processes these classes and creates the rules that are inserted into `<style>` elements in the `<head>` of your HTML document. As a result, all advantages of dynamic JavaScript coding combined with type-safety and convenience of TypeScript coding apply to CSS authoring. In addition, your application or library bundle is self contained and doesn't require a separate CSS bundle.

* [Motivation](#motivation)
* [Features](#features)
* [Usage](#usage)
* [Quick Start](#quick-start)
* [Examples](#examples)

## Motivation
The goal of the Mimcss library is to support all CSS features in a type-safe and easy-to-use manner. There are several distinct areas that Mimcss addresses:

- Making names of CSS entities (classes, element IDs, animations, custom properties, counters, grid lines and areas) full TypeScript citizens so that when they are referred to from the JSX code, misspelled or undefined names cause compile time errors instead of being detected only at run time.
- Using the expressive power of TypeScript's typing system for setting values of style properties. While in the regular CSS as well as in several CSS-in-JS libraries, style property values can only be set as strings (and sometimes numbers), Mimcss defines a separate type for each style property making the process of setting property values more convenient and less error-prone.
- Avoiding the regular monolithic structure of CSS styles that are present in the browser's memory for the entirety of the application life-time. As with regular JavaScript objects, CSS styles created with Mimcss can be loaded on demand and stay in memory only while needed. Mimcss provides several style loading and unloading technics that developers can use depending on whether the styles are used throughout the application or only needed by certain components.
- Seeing CSS not as a static structure, but as data that can be changed programmatically in order to manipulate application visual styles and layouts. Depending on the content, it is sometimes more efficient to change the CSS style of a certain class than to assign a different class to a set of HTML elements. Mimcss also provides several scheduling mechanisms that allow coordination between DOM writing activities (including direct style changes) in order to avoid excessive style recalculations and layout thrashing.

## Features
- Compatible with and independent of any library: use with React, Angular, Vue etc.
- Co-exists with regular CSS files - doesn't require re-writing of all existing styles at once or at all. You can gradually introduce Mimcss into you project.
- Stylesheets are defined as TypeScript classes.
- Stylesheets are dynamically activated (inserted into DOM) and can be deactivated (removed from DOM) if desired.
- Styled components are supported where each component instance gets its individual set of CSS rules isolated from other instances.
- Names of CSS classes, IDs, animations, custom CSS properties, counters and grid lines and areas are auto-generated, while developers use properties that return these names. Auto-generation mechanism can be overridden if there is a need to use pre-defined names.
- Support for theming via style definition class inheritance.
- Support for server-side rendering.
- All CSS rule types are supported including style rules and at-rules.
- Automatic support for vendor prefixes.
- Custom CSS properties are supported in a type safe manner.
- Style rules can be nested and can extend other style rules.
- All pseudo styles and pseudo elements are supported using convenient and compact notation.
- Type safety and autocompletion support for CSS property values to eliminate errors.
- Using numbers for default units of length, angle, percent and other CSS property types.
- Using Booleans, numbers, tuples, arrays, objects and functions (in addition to strings) when specifying CSS property values to increase convenience and eliminate errors.
- Convenience functions for specifying complex property values for colors, images, filters, transforms, shapes, calc(), etc. in type-safe manner.
- Type-safe support for CSS filter, transform, shape, gradient, counter and other properties.
- Access to CSSRule-derived objects for direct rule and property manipulation.
- Several built-in mechanisms for scheduling DOM writing activities as well as the ability to write custom scheduling mechanisms.

## Usage
To install the Mimcss library for development use the following NPM command:

```shell
npm i mimcss
```

Mimcss library comes in two variants:

- `mimcss.js` - the minified build of the library, which should be used to build production versions of applications. This build creates very short but meaningless names for CSS classes and other named entities.
- `mimcss.dev.js` - the debug build of the library, which should be used during application development. This build creates names for CSS classes and other named entities, which are easily traceable to the source code. This build also prints helpful diagnostic messages.

Mimcss contains many exported types and functions; therefore, it is recommended to import the entire module under a single name:

```tsx
import * as css from "mimcss"
```

Mimcss provides [Guide](https://www.mimcss.com/guide/introduction.html) and [Reference](https://www.mimcss.com/reference.html) documents for developers. Both documents undergo constant improvements. Mimcss also provides a [Playground](https://www.mimcss.com/demo/mimcss/playground.html), where you can write TypeScript code using Mimcss features and immediately see the results.

## Quick Start
Let's assume that we need to create several styles for a couple of classes and an element ID. With Mimcss, you create a TypeScript class and then, in your component's TypeScript code, you refer to the CSS classes and IDs using the TypeScript class's properties:

```tsx
/* MyStyles.ts */
import * as css from "mimcss"

export class MyStyles extends css.StyleDefinition
{
    // define a CSS rule for a class
    vbox = this.$class({
        display: "flex",
        flexDirection: "column",
    });

    // define a CSS rule for an element identifier
    importantElement = this.$id({
        color: 0xFFCC88,
        fontWeight: 700,
    });

    // define a CSS rule for another class
    greeting = this.$class({
        padding: 8,
        border: [1, "solid", "blue"],
        boxShadow: { blur: 4, color: "cyan" },
        backgroundImage: css.conicGradient(Color.orange, Color.pink).from(45).at("center"),
        ":hover": { opacity: 0.7 }
    });
}

/* MyComponent.tsx */
import * as React from "react"
import * as css from "mimcss"
import {MyStyles} from "./MyStyles"

// Insert the style rules into the DOM
let myStyles = css.activate( MyStyles);

export class MyComponent extends React.Component
{
    render()
    {
        // use properties of the style definition class instance to refer to class
        // and identifier names
        return <div className={myStyles.vbox.name}>
            <p id={myStyles.importantElement.name}>Mimcss is easy to use.</p>
            <div className={myStyles.greeting.name}/>Hello!</div>
        </div>
    }
}
```

Coding CSS styles in TypeScript brings the following advantages:

- The autocomplete mechanism of the IDE will prompt with the list of defined names. As soon as we type `myStyles.` the IDE will present the list of all the properties defined in our style definition class.
- If we change the name of or remove the property in the `MyStyles` class and forget to change it in our component's `render` method, the project will not build. Thus a compile time error will prevent a much harder to find run time error.
- Notice how we used numbers instead of strings when defining `color` and `fontWeight` properties. Notice also how we used array, object and function notations to specify complex style properties for the `greeting` class. Mimcss defines types for all style properties and provides numerous methods to set their values in a type-safe and easy-to-use way.
- The styles are not present in the browser's memory until the code that uses them calls the `activate` function that inserts the styles into DOM. There are several activation strategies suitable for different scenarios - from styles that are shared by entire application to those that are used by only a single component. The developers are in full control of when the rules are activated. Moreover, since activating rules means writing to DOM, components can synchronize this process with other DOM-writing activities.
- The names we are using in our code are not actually the names that will be used in the resulting HTML. The actual names to use in HTML will be auto-generated by the Mimcss infrastructure, which ensures that they will be globally unique. In Debug mode the generated names reflect the names used in the code, while in Release mode, the names are created with minimal length.

## Examples
The following short sections provide examples of Mimcss capabilities. This is really just scratching the surface - for more information please see [Mimcss Guide](https://www.mimcss.com/guide/introduction.html).

### Supported CSS Rules
Mimcss supports all types of CSS rules (well, except @charset because we don't actually write any CSS files):

```tsx
class MyStyles extends css.StyleDefinition
{
    // class
    redClass = this.$class({ color: "red" })

    // element ID
    redElm = this.$id({ color: "red" })

    // arbitrary selectors
    all = this.$style( "*", { boxSizing: "border-box" })
    h1 = this.$tag( "h1", { fontSize: 24, fontWeight: 700 })
    li = this.$style( css.selector`article > ${this.redClass} > ul > li`, { color: "brown" })

    // custom CSS variables (with style-property-specific value types)
    defaultColor = this.$var( "color", "black")
    defaultPadding = this.$var( "padding", [4,6])

    // @font-face
    font = this.$fontface( {
        fontFamily: "Roboto",
        fontWeight: 400,
        src: [{ url: 'roboto.woff', format: 'woff' }]
    });

    // @import (with @media and @supports queries)
    external = this.$import( "external.css",
        { width: [200, 400] }, { justifySelf: "baseline" })

    // @keyframes
    move = this.$keyframes( [
        [ "from", { top: 0 } ],
        [ 50, { top: 150 } ],
        [ "to", { top: "100%" } ]
    ])

    // @page
    firstPage = this.$page( ":first", { margin: "auto" })

    // @namespace
    svgNamespcae = this.$namespace( css.WebNamespaces.SVG, "svg")

    // @media
    ifSmallDevice = this.$media( { maxWidth: 600 },
        class extends css.StyleDefinition<MyStyles>
        {
            h1 = this.$tag( "h1", { fontSize: 20 });
        }
    )

    // @supports
    ifGridSupported = this.$supports( {display: "grid"},
        class extends css.StyleDefinition<MyStyles>
        {
            gridLayout = this.$class({ display: "grid" })
        }
    )
}
```

It is essential to assign rules that produce names (classes, IDs, animations, custom variables) to properties because the code that needs these names will access them through these properties. Other rule types, however, don't have to be assigned to properties; instead, they can be put into an array, which is assigned to a single property:

```tsx
class MyStyles extends css.StyleDefinition
{
    unnamed =
    [
        this.$style( "*", { boxSizing: "border-box" }),
        this.$tag( "h1", { fontSize: 24, fontWeight: 700 }),
        this.$style( css.selector`article > ${this.redClass} > ul > li`, { color: "brown" }),
        ...
    ]
}
```

**See Also:** [Mimcss Guide: Defining Rules](https://www.mimcss.com/guide/defining-rules.html)

### Extending Style Rules
The `"+"` property allows specifying one or more style rules you want your style rule to extend:

```tsx
class MyStyles extends css.StyleDefinition
{
    red = this.$class({ color: "red" })

    bold = this.$class({ fontWeight: 700 })

    // extending one style rule
    important = this.$class(
    {
        "+": this.red,
        fontSize: 16
    })

    // extending multiple style rules
    superImportant = this.$class(
    {
        "+": [this.important, this.bold]
    })
}
```

This is equivalent to the following CSS:

```css
.red {
    color: red;
}

.bold {
    font-weight: 700;
}

.important {
    color: red;
    font-size: 16px;
}

.superImportant {
    color: red;
    font-size: 16px;
    font-weight: 700;
}
```

**See Also:** [Mimcss Guide: Reusing Styles](https://www.mimcss.com/guide/defining-styles.html#reusing-styles)

### Pseudo Classes and Pseudo Elements
While pseudo classes and pseudo elements can be defined using regular style rules (via the `$style` method), there is an easier way to define them:

```tsx
class MyStyles extends css.StyleDefinition
{
    link = this.$class({
        color: "blue",
        ":hover": { color: "navy" }
    })
}
```

This is equivalent to the following CSS:

```css
.link {
    color: blue;
}

.link:hover {
    color: navy;
}
```

**See Also:** [Mimcss Guide: Dependent Styles](https://www.mimcss.com/guide/defining-styles.html#dependent-styles)

### Pseudo Classes with Parameters
Some pseudo classes require parameters, e.g. `:nth-child(2n+1)`. This is how it is expressed in Mimcss:

```tsx
class MyStyles extends css.StyleDefinition
{
    row = this.$tag( "tr", {
        ":nth-child": [ [2,1], { backgroundColor: 0xF8F8F8 } ]
    })

    cell = this.$tag( "p", {
        ":nth-of-type": [ "odd", { backgroundColor: "cyan" } ]
    })
}
```

This is equivalent to the following CSS:

```css
tr:nth-child(2n+1) {
    background-color: #F8F8F8;
}

p:nth-of-type(odd) {
    background-color: cyan;
}
```

**See Also:** [Mimcss Guide: Dependent Styles](https://www.mimcss.com/guide/defining-styles.html#dependent-styles)

### Complex Related Selectors
We often define a CSS class (or tag or ID) rule and then define related rules with complex selectors. You can use the ampersand (`"&"`) property to define such rules in Mimcss. Within the selectors, every occurrence of the `"&"` symbol will be replaced with the "parent" selector.

```tsx
class MyStyles extends css.StyleDefinition
{
    ul = this.$tag( "ul", {
        color: "brown",
        "&": [
            [ "& > li:first-child, & > li > a", { color: "red" } ],
            [ "td > &:hover", { fontStyle: "italic" } ]
        ]
    })
}
```

This is equivalent to the following CSS:

```css
ul {
    color: brown;
}

ul > li:first-child, ul > li > a {
    color: red;
}

td > ul:hover {
    font-style: italic;
}
```

**See Also:** [Mimcss Guide: Dependent Styles](https://www.mimcss.com/guide/defining-styles.html#dependent-styles)

### Custom CSS Properties
Although custom CSS properties by themselves are not CSS rules, in Mimcss they are defined using the same notation as the rules.

```tsx
class MyStyles extends css.StyleDefinition
{
    // define custom properties at the root level
    defaultColor = this.$var( "color", "black")
    defaultBgColor = this.$var( "color", "white")

    // use the custom properties by referring to the previously defined objects
    div = this.$tag( "div", {
        color: this.defaultColor,
        backgroundColor: this.defaultBgColor,
    })

    // overriding the values of the custom properties
    footer = this.$tag( "footer", {
        "--": [
            [this.defaultColor, "yellow"],
            [this.defaultBgColor, "blue"]
        ]
    })
}
```

This is equivalent to the following CSS:

```css
:root {
    --defaultColor: black;
    --defaultBgColor: white;
}

div {
    color: var(--defaultColor);
    background-color: var(--defaultBgColor);
}

footer {
    --defaultColor: yellow;
    --defaultBgColor: blue;
}
```

Values of custom CSS properties can be changed programmatically:

```tsx
let myStyles = css.activate(MyStyles);

// change the top-level value; that is, the value defined under the `:root` selector.
myStyles.defaultColor.setValue( "navy");

// change the value under the 'footer' element.
myStyles.footer.setCustomProp( myStyles.defaultColor, "darkgreen");

```

**See Also:** [Mimcss Guide: Custom Properties](https://www.mimcss.com/guide/custom-properties.html)

### Named Colors
In CSS, there is a list of pre-defined colors, which can be specified by names. In Mimcss, you can use these colors and you can also define your own named colors and refer to them by names.

```tsx
// Some TypeScript trickery to "extend" the INamedColors interface with your own name
declare module "mimcss"
{
    interface INamedColors
    {
        myColor?: number;
    }
}

// Provide the value for your color - it must be a number in the form OxRRGGBB
css.Colors.myFavColor = 0x123456;

// Use it just as any other named color
class MyStyles extends css.StyleDefinition
{
    anchor = this.$tag( "a", { color: "myColor" })
}
```

**See Also:** [Mimcss Guide: Working with Colors](https://www.mimcss.com/guide/style-property-types.html#working-with-colors)

### Working with Units
In CSS, values of many properties should be specified with units corresponding to the CSS type of the property. For example, the `<length>` type has units such as "px", "rem", "in", "cm", etc.; the `<angle>` type has units such as "deg", "rad", "turn", etc. For many properties, CSS also allows using percents - "%".

Mimcss supports all these CSS types and, for the developer convenience, allows specifying values in three ways: as an integer number, as a floating point number and as a string. For each CSS type, Mimcss defines a default unit to use with the integer number and the default unit to use with the floating point number. For example, for the `<length>` CSS type, Mimcss will treat integer numbers as having the "px" unit and floating point numbers as having the "em" unit. For the `<angle>` type, the default is "deg" for integers and "turn" for floating point numbers.

> Note: in JavaScript, the literals such as `1.0` are not floating point number but rather integers.

Here are several examples:

```tsx
class MyStyles extends css.StyleDefinition
{
    // top and bottom padding will be set to 0.5em, while left and right - to 8px.
    cls1 = this.$class({ padding: [0.5, 8] })

    // width is 80%, min-width is 1.5em and max-width is 500px.
    cls2 = this.$class({
        width: css.percent(80),
        minWidth: 1.5,
        maxWidth: 500
    })

    // initial angle for the conic gradient will be 45deg.
    cls3 = this.$class({
        backgroundImage: css.conicGradient( "red", "blue").from(45)
    })

    // initial angle for the conic gradient will be 0.25turn.
    cls4 = this.$class({
        backgroundImage: css.conicGradient( "red", "blue").from(0.25)
    })
}
```

**See Also:** [Mimcss Guide: Numeric Types](https://www.mimcss.com/guide/style-property-types.html#numeric-types)

## Conclusion
We hope you will find Mimcss useful. Please refer to [Mimcss Guide](https://www.mimcss.com/guide/introduction.html) to find more information. Also check out the [Playground](https://www.mimcss.com/demo/mimcss/playground.html), where you can write TypeScript code using Mimcss features and immediately see the results.




