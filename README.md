# Mimcss: Style Authoring in TypeScript

[![npm version](https://badge.fury.io/js/mimcss.svg)](https://badge.fury.io/js/mimcss)
[![GitHub version](https://badge.fury.io/gh/mmichlin66%2Fmimcss.svg)](https://badge.fury.io/gh/mmichlin66%2Fmimcss)

* [Quick Start](#quick-start)
* [Features](#features)
* [Examples](#examples)

Mimcss is a TypeScript library that allows authoring CSS styles without creating CSS files. Instead, the styles are created via TypeScript programming. You code your styling rules including CSS tags, classes, animations, media etc., by creating TypeScript classes. The Mimcss library processes these classes and creates the rules that are inserted into a `<style>` element in the `<head>` of you HTML document. As a result, your application or library bundle is self contained and doesn't require a separate CSS bundle.

## Quick Start
The goal of the Mimcss library is to support all CSS features in a type-safe and easy-to-use manner. Let's assume that we need to create several styles for a couple of classes and an ID. With Mimcss, you create a TypeScript class and then, in your component's TypeScript code, you refer to the CSS classes and IDs using the TypeScript class's properties:

```tsx
/* MyStyles.ts */
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    vbox = css.$class({
        display: "flex",
        flexDirection: "column",
    });

    importantElement = css.$id({
        color: 0xFFCC88,
        fontWeight: 700,
    });

    greeting = css.$class({
        padding: 8,
        border: [1, "solid", "blue"],
        boxShadow: { blur: 4, color: "cyan" },
        backgroundImage: css.conicGradient( 45, "center", Color.orange, Color.pink),
        ":hover": { opacity: 0.7 }
    });
}

/* MyComponent.tsx */
import {MyStyles} from "./MyStyles"
import * as React from "react"
import * as css from "mimcss"

let myStyles = css.$activate( MyStyles);

class MyComponent extends React.Component
{
    render()
    {
        return <div className={myStyles.vbox.name}>
            <p id={myStyles.importantElement.name}>Mimcss is easy to use.</p>
            <div className={myStyles.greeting.name}/>Hello!</div>
        </div>
    }
}
```

Coding CSS styles in TypeScript brings the following advantages:

- The autocomplete mechanism of our IDE will prompt us with the list of defined names. As soon as we type `myStyles.` the IDE will present the list of all the properties defined in our style definition class.
- If we change the name of or remove the property in the `MyStyles` class and forget to change it in our component's `render` method, the project will not build. Thus a compile time error will prevent a much-harder-to-find run-time error.
- Notice how we used numbers instead of strings when defining `color` and `fontWeight` properties. Notice also how we used array, object and function notations to specify complex style properties for the `shadow` class. Mimcss defines types for all style properties and provides numerous methods to set their values in a type-safe and easy-to-use way.
- The styles are not present in the browser's memory until the code that uses them calls the `$activate` function that inserts the styles into DOM. There are several activation strategies suitable for different scenarios - from styles that are shared by entire application to those that are used by only a single component. The developers are in full control of when the rules are activated. Moreover, since activating rules means writing to DOM, components can synchronize this process with other DOM-writing activities.
- The names we are using in our code are not actually the names that will be used in the resulting HTML. The actual names to use in HTML will be auto-generated by the Mimcss infrastructure, which ensures that they will be globally unique. In Debug mode the generated names reflect the names used in the code, while in Release mode, the names are created with minimal length.

## Features

- Compatible with and independent of any library: use with React, Angular, Vue etc.
- Co-exists with regular CSS files - doesn't require re-writing of all existing styles at once or at all. You can gradually introduce Mimcss into you project.
- Stylesheets are defined as TypeScript classes.
- Stylesheets can be dynamically activated (inserted into DOM) and deactivated (removed from DOM).
- Support for styled components where each component instance gets its individual set of CSS rules isolated from other instances.
- Names of classes, IDs, animations, custom CSS properties, counters, etc. are auto-generated, while developers use properties that return these names.
- All CSS rule types are supported including style rules and at-rules.
- Custom CSS properties are supported in a type safe manner by defining what standard CSS property type they represent.
- Style rules can be nested and can extend other style rules.
- All pseudo styles and pseudo elements are supported using convenient and compact notation.
- Stylesheet classes support inheritance - elegant way to implement theming.
- Type safety and autocomplete support for CSS property values to eliminate misspellings.
- Using numbers for default units of length, angle, percent and other CSS property types.
- Using numbers, tuples, arrays, objects and functions (in addition to strings) when specifying CSS property values to increase convenience and eliminate misspellings.
- Convenience functions for specifying complex property values (e.g. colors, calc(), var(), linerGradient(), etc.)
- Access to CSSRule-derived objects for direct style manipulation.

## Examples
The following short sections provide examples of Mimcss capabilities. This is really just scratching the surface - for more information please see [Mimcss Guide](https://mmichlin66.github.io/mimcss/mimcss-guide-introduction.html).

### Supported CSS Rules
Mimcss supports all types of CSS rules (except @charset):

```tsx
class MyStyles extends css.StyleDefinition
{
    // class
    redClass = css.$class({ color: "red" })

    // element ID
    redElm = css.$id({ color: "red" })

    // arbitrary selectors
    all = css.$style( "*", { boxSizing: "border-box" })
    h1 = css.$style( "h1", { fontSize: 24, fontWeight: 700 })
    li = css.$style( css.selector`article > ${this.redClass} > ul > li`, { color: "brown" })

    // custom CSS variables (with style-property-specific value types)
    defaultColor = css.$var( "color", "black")
    defaultPadding = css.$var( "padding", [4,6])

    // @font-face
    font = css.$fontface( {
        fontFamily: "Roboto",
        fontWeight: 400,
        src: [{ url: 'roboto.woff', format: 'woff' }]
    });

    // @import (with @media and @supports queries)
    external = css.$import( "external.css", { width: [200, 400] }, { justifySelf: "baseline" })

    // @keyframes
    move = css.$keyframes( [
        [ "from", { top: 0 } ],
        [ 50, { top: 150 } ],
        [ "to", { top: "100%" } ]
    ])

    // @page
    firstPage = css.$page( ":first", { margin: "auto" })

    // @namespace
    svgNamespcae = css.$namespace( css.WebNamespaces.SVG, "svg")

    // @media
    ifSmallDevice = css.$media( { maxWidth: 600 },
        class extends css.StyleDefinition<MyStyles>
        {
            h1 = css.$style( "h1", { fontSize: 20 });
        }
    )

    // @supports
    ifGridSupported = css.$supports( {display: "grid"},
        class extends css.StyleDefinition<MyStyles>
        {
            gridLayout =css.$class({ display: "grid" })
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
        css.$style( "*", { boxSizing: "border-box" }),
        css.$style( "h1", { fontSize: 24, fontWeight: 700 }),
        css.$style( css.selector`article > ${this.redClass} > ul > li`, { color: "brown" }),
        ...
]
}
```

### Extending Style Rules
The `"+"` property allows specifying one or more style rules you want your style rule to extend:

```tsx
class MyStyles extends css.StyleDefinition
{
    red = css.$class({ color: "red" })

    bold = css.$class({ fontWeight: 700 })

    // extending one style rule
    important = css.$class(
    {
        "+": this.red,
        fontSize: 16
    })

    // extending multiple style rules
    superImportant = css.$class(
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


### Pseudo Classes and Pseudo Elements
While pseudo classes and pseudo elements can be defined using regular style rules (via the `$style` function), there is an easier way to define them:

```tsx
class MyStyles extends css.StyleDefinition
{
    link = css.$class({
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

### Pseudo Classes with Parameters
Some pseudo classes require parameters, e.g. `:nth-child(2n+1)`. This is how it is expressed in Mimcss:

```tsx
class MyStyles extends css.StyleDefinition
{
    row = css.$style( "tr", {
        ":nth-child": [ [2,1], { backgroundColor: 0xF8F8F8 } ]
    })

    cell = css.$style( "p", {
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

### Complex Related Selectors
We often define a CSS class (or tag or ID) rule and then define related rules with complex selectors. You can use the `"&"` property to define such rules in Mimcss. Within the selectors, every occurrence of the `"&"` symbol will be replaced with the "parent" selector.

```tsx
class MyStyles extends css.StyleDefinition
{
    ul = css.$style( "ul", {
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

### Custom CSS Properties
Although custom CSS properties by themselves are not CSS rules, in Mimcss they are defined using the same notation as the rules.

```tsx
class MyStyles extends css.StyleDefinition
{
    // define custom properties at the root level
    defaultColor = css.$var( "color", "black")
    defaultBgColor = css.$var( "color", "white")

    // use the custom properties by referring to the previously defined objects
    div = css.$style( "div", {
        color: this.defaultColor,
        backgroundColor: this.defaultBgColor,
    })

    // overriding the values of the custom properties
    footer = css.$style( "footer", {
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
let myStyles = css.$activate(MyStyles);

// change the top-level value; that is, the value defined under the `:root` selector.
myStyles.defaultColor.setValue( "navy");

// change the value under the 'footer' element.
myStyles.footer.setCustomProp( myStyles.defaultColor, "darkgreen");

```

### Named Colors
In CSS, there is a list of pre-defined colors, which can be specified by names. In Mimcss, you can use these colors and you can also define your own named colors and refer to them by names.

```tsx
// Some TypeScript trickery to "extend" the INamedColors interface with your own name
declare module "mimcss/lib/styles/ColorTypes"
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
    anchor = css.$style( "a", { color: "myColor" })
}
```

### Working with Units
In CSS, values of many properties should be specified with units corresponding to the CSS type of the property. For example, the `<length>` type has units such as "px", "rem", "in", "cm", etc.; the `<angle>` type has units such as "deg", "rad", "turn", etc. For many properties, CSS also allows using percentages - "%".

Mimcss supports all these CSS types and, for the developer convenience, allows specifying values in three ways: as an integer number, as a floating point number and as a string. For each CSS type, Mimcss defines a default unit to use with the integer number and the default unit to use with the floating point number. For example, for the `<length>` CSS type, Mimcss will treat integer numbers as having the "px" unit and floating point numbers as having the "em" unit. For the `<angle>` type, the default is "deg" for integers and "turn" for floating point numbers.

Here are several examples:

```tsx
class MyStyles extends css.StyleDefinition
{
    // top and bottom padding will be set to 0.5em, while left and right - to 8px.
    cls1 = css.$class({ padding: [0.5, 8] })

    // width is 80%, min-width is 1.5em and max-width is 500px.
    cls2 = css.$class({
        width: "80%",
        minWidth: 1.5,
        maxWidth: 500
    })

    // initial angle for the conic gradient will be 45deg.
    cls3 = css.$class({
        backgroundImage: css.conicGradient( 45, "center", "red", "blue")
    })

    // initial angle for the conic gradient will be 0.25turn.
    cls4 = css.$class({
        backgroundImage: css.conicGradient( 0.25, "center", "red", "blue")
    })
}
```

> Note: in JavaScript `1.0` is not a floating point number but rather an integer.

## Conclusion
We hope you will find Mimcss useful. Please refer to [Mimcss Guide](https://mmichlin66.github.io/mimcss/guide/mimcss-guide-introduction.html) to find more information.




