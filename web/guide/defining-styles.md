---
layout: mimcss-guide
unit: 3
title: "Mimcss Guide: Defining styles"
description: "Mimcss uses the full power of the TypeScript typing system to define style property values in a type-safe and convenient ways."
rootpath: ".."
---

# Defining styles

* [Styleset](#styleset)
* [Combined styleset](#combined-styleset)
* [Reusing styles](#reusing-styles)
* [Reusing classes](#reusing-classes)
* [Dependent styles](#dependent-styles)
* [Pseudo classes and elements](#pseudo-classes-and-elements)
* [Complex dependent selectors](#complex-dependent-selectors)
* [Selector combinators](#selector-combinators)

## Styleset
Styles are defined using style rules, which usually accept some kind of selector and an object that gives values to a set of standard CSS style properties - such as `color`, `margin`, etc. This object is called a *styleset* and is defined by Mimcss using the `Styleset` type.

The `Styleset` type contains every short-hand and long-hand style property defined by the CSS standard and, if there are omissions or the Mimcss library hasn't caught up with the latest standard yet, there is a way to add the missing properties using the TypeScript's module augmentation technique.

The `Styleset` type might look similar to the built-in `CSSStyleDeclaration` type; however, while in `CSSStyleDeclaration` all properties have the `string` type, in `Styleset`, each property has its own type. This provides to the developers an easier and more powerful way to specify values for the properties. Moreover, specifying invalid values will be detected as a compile-time error. Let's see several examples:

1. The `color` property. Mimcss provides names of all the built-in colors in the `Colors` type. You can either use its properties, e.g. `Colors.dodgerblue`, or directly type `"dodgerblue"`. When you start typing color names as strings, the autocomplete feature of your IDE will prompt you with the suitable names. If you misspell the color name, it will be immediately detected. You can add new named colors using the module augmentation technique. You can also specify colors as numbers, e.g. 0xFF0000 for red, which is similar to the CSS notation `"#FF0000"` but allows you to calculate the color value programmatically without the need to convert it to string. There are also special color functions such as `rgb()` or `alpha()` that allow manipulating color values. All of these methods are of course applicable not only to the `color` property but to any property that uses color.

1. The `padding` property. CSS allows specifying 1 to 4 values for the `padding` property where each of the values must specify dimension units (except for 0). In Mimcss,  the `padding` property value can be specified as a number or an array of numbers with 2, 3, or 4 elements. Integer numbers will be considered as `px` units, while floating point numbers will be considered as `em` units. In addition, Mimcss provides functions for every CSS unit and these functions can be used in lieu of the numbers.

1. The `border` property. CSS defines the `border` property as a sequence of 1 to 3 values: width, style and color. In Mimcss you can specify the value as either a number or a Color value or as a tuple of 2 or 3 elements. Moreover, Mimcss provides all possible values for the style element, so that you cannot misspell it.

1. The `transform` property. CSS defines several functions that can be used in the `transform` property such as `translate()` or `skew()`. Mimcss defines a TypeScript function for every CSS function. These functions accept parameters of appropriate types, so that you cannot accidentally specify wrong parameters.

Here are a few examples of how such styles are used for defining style rules:

```tsx
class MyStyles extends css.StyleDefinition
{
    button1 = this.$class({
        backgroundColor: css.Colors.blue,   // built-in color property
        padding: 4,                         // 4px for all sides
        border: 2,                          // 2px width with default style and color
        transform: css.translate(20, 30),   // translate(20px, 30px)
    })

    button2 = this.$class({
        backgroundColor: "yellow",          // built-in color constant
        padding: [4, 0.3],                  // 4px top and bottom, 0.3em left and right
        border: ["solid", "brown"],         // defined as a two-element tuple
        transform: css.skew(20, 0.25),      // skew(20deg, 0.25turn)
    })

    button3 = this.$class({
        backgroundColor: 0xFF00,            // green
        padding: [4, css.inch(0.1)],        // 4px top and bottom, 0.1in left and right
        border: [1, "solid", "brown"],      // defined as a three element tuple
        transform: css.rotate(30),          // rotate(30deg)
    })
}
```

Mimcss strives to avoid defining `string` as property type, especially for those properties that have a lot of keyword values such as `justify-items`, `cursor`, `list-style-type`, `border-style`, etc. If `string` is among the possible property types, then first, the autocomplete feature doesn't work, and second, misspellings are not detected at compile time. Ultimately, the decision whether or not to have `string` for a property type is a trade-off between the above considerations and the developer's convenience.

## Custom CSS properties
The `Styleset` type has a special `"--"` property for specifying custom CSS properties. This allows defining or re-defining the custom CSS properties under the specific rule. The `"--"` property takes an array of tuples where the first parameter refers to a custom CSS property previously defined using the `$var()` method. The second element of the tuple provides the value for the custom property.

```tsx
class MyStyles extends css.StyleDefinition
{
    // Define custom CSS property on the global level (under `:root`)
    specialColor = this.$var( "color", "blue")

    // Define CSS class and re-define the custom CSS property under it
    // with a new value
    specialContainer = this.$class({
         "--": [ [this.specialColor, "green"] ]
    })

    // Use the custom CSS property to define style property value. The actual
    // color value will be different depending whether the element with the
    // `special` class is outside or inside an element with the `specialContainer`
    // CSS class
    special = this.$class({ color: this.specialColor })
}
```

Custom CSS properties will be explained in more details in the [Custom Properties](custom-properties.html) unit.


## Specifying !important flag
CSS allows adding the `!important` flag to any style property to increase its specificity. For many style properties, Mimcss doesn't include the `string` type; however, for every property, Mimcss allows specifying an object with a single property `"!"`, which contains the property value.

```tsx
class MyClass extends css.StyleDefinition
{
    // .isNotImportant { min-width: 20px; }
    isNotImportant = this.$class({ minWidth: 20 })

    // .isImportant { min-width: 20px !important }
    isImportant = this.$class({ minWidth: { "!": 20 } })
}
```

## Specifying multiple property values
CSS allows the same property multiple times in a single ruleset, so that the latest valid value wins. It is usually used when there are features that are not yet supported across all browsers. In this case, you would specify the property with the widely supported value first and the less supported value last.For example:

```css
.bg
{
    background: "beige";
    background: cross-fade( url(yellow.png) 35%, url(green.png) 65%);
}
```

In Mimcss, rulesets are modeled by plain JavaScript objects and it is not possible to specify the same property multiple times. To overcome this restriction, Mimcss allows specifying an object with a single property `"[]"`, which allows specifying multiple values. So the previous CSS would be modeled as the following in Mimcss:

```tsx
class MyClass extends css.StyleDefinition
{
    // .isNotImportant { min-width: 20px; }
    bg = this.$class({
        background: {"[]":[
            beige",
            css.crossFade( [css.url("yellow.png"), 35], [css.url("green.png"), 65])
        ]}
    })
}
```

Alternatively, Mimcss allows specifying an array of stylesets wherever a single styleset is accepted. So the alternative way to have more than one value for a CSS property would be as follows:

```tsx
class MyClass extends css.StyleDefinition
{
    // .isNotImportant { min-width: 20px; }
    bg = this.$class([
        {background: "beige"},
        {background: css.crossFade( [css.url("yellow.png"), 35], [css.url("green.png"), 65])}
    ]})
}
```

## Combined styleset
The functions that create style rules - such as `$style`, `$class` and `$id` - accept not just the `Styleset` type described above, but an extended variant of it called `CombinedStyleset`. The `CombinedStyleset` type adds a number of properties to the `Styleset` type, which allow for the following features:

- Combined styleset can specify that it *extends* (*composites*, *inherits*, *derives from*) one or more stylesets defined by other style rules.
- Combined styleset can have *dependent* (a.k.a. *nested*) stylesets for pseudo classes, pseudo elements and other kinds of selectors related to the CSS entity for which the style rule is defined.

These features are discussed in details in the following sections.

## Reusing styles
With CSS pre-processors, the idea of a style rule re-using other rules (a.k.a. style extending/composing/inheriting) became very popular. Mimcss also has this capability and it uses the TypeScript's type-safety features to eliminate errors. Here is an example:

```tsx
class MyStyles extends css.StyleDefinition
{
    vbox = this.$class({
        display: "flex",
        flexDirection: "column"
    })

    // extend the vbox class
    sidebar = this.$class({
        "+": this.vbox,
        position: "absolute",
        width: css.em(15),
        height: css.em(50)
    })

    standout = this.$abstract({
        boxShadow: { x: 0, y: 0, blur: 4, color: "red" }
    })

    // extend two clases: sidebar and standout
    rightbar = this.$id({
        "+": [this.sidebar, this.standout],
        width: css.em(10),
        left: css.em(1)
    })
}
```

The special property `"+"` of the `CombinedStyleset` type allows specifying one or more style rules whose styles will be re-used. The `"sidebar"`class extends the `"vbox"` class, while the `"rightbar"` ID extends two rules: `"sidebar"` class rule and `"standout"` abstract rule. Note how we reuse the previously defined rules by referring to them via the property names (e.g. `this.vbox`). These are not just strings, but strongly typed objects, which prevents misspelling errors.

The above code is equivalent to the following CSS (except that actual names would be auto-generated by Mimcss):

```css
.vbox {
    display: flex;
    flex-direction: column;
}

.sidebar {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 15em;
    height: 50em;
}

#rightbar {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 10em;
    height: 50em;
    box-shadow: 0 0 4px red;
    left: 1em;
}
```

The `"+"` property allows any style rule to extend any other style rule. For example, an animation styleset used in a `$keyframes` rule can extend an `$id` rule. Extending another style rule via the `"+"` property simply means that Mimcss copies all style properties from the rules being extended and then applies our own style properties. Notice how the `width` property from the `rightbar` class overrode the value of this property defined in the `sidebar` class.

## Reusing classes
When a class rule extends other class rules, there is a different method that provides more efficient extension mechanism. A special property `"++"` can specify one or more class rules. In this case, there is no copying of style properties; instead, the name generated for the extending class will contain the names of the extended classes. Consider the following example:

```tsx
class MyStyles extends css.StyleDefinition
{
    redFG = this.$class({ color: "red" })
    whiteBG = this.$class({ backgroundColor: "white" })

    emphasized = this.$class({
        "++": [this.redFG, this.whiteBG],
        fontWeight: 700
    })
}
```

This will translate to the following CSS (in reality, class names are auto-generated):

```css
.redFG { color: red; }
.whiteBG { backgroundColor: white; }
.emphasized.redFG.whiteBG { fontWeight: 700; }
```

When the `MyStyles` class is activated and the `emphasized` property is applied to an HTML element, the class name will be not just "emphasized", but "emphasized redFG whiteBG". That is, the following rendering function

```tsx
let styles = css.activate(MyStyles);
render()
{
    return <div className={styles.emphasized.name}>Important stuff</div>
}
```

will generate the following HTML:

```html
<div class="emphasized redFG whiteBG">Important stuff</div>
```

> Note that since using the double plus property changes the name generation mechanism, caution must be exercised when using it for classes whose name should be consistent when used in different style definition classes; in particular, when defining media rules and when using style definition class inheritance for theming (which will be discussed later in this guide).

## Dependent styles

In CSS, we often define styles for a class and then define additional styles (or override styles) for this class in combination with a pseudo class or a pseudo element. Also quite often we reuse an already defined class in a complex selector specifying child, descendant or sibling relationships to other classes or tags. For example:

```css
.myspan {
    padding: 4px;
}

.mydiv {
    background-color: white;
    padding: 4px;
}

.mydiv:hover {
    background-color: pink;
}

td > .mydiv, li > .mydiv {
    padding: 0;
}

.mydiv#solid {
    border: solid;
}

.mydiv > .myspan {
    border: dashed;
}
```

Mimcss supports such dependent and related rules via an easy-to-use construct using special properties of the `CombinedStyleset` type. First let's see how pseudo styles and pseudo elements are specified.


## Pseudo classes and elements
Mimcss allows names of all pseudo entities as properties in the `CombinedStyleset`. The value of these properties is another `CombinedStyleset`, so that the process of defining dependent rules is recursive. Here is how the `:hover` pseudo class from the example above is defined:

```tsx
class MyStyles extends css.StyleDefinition
{
    mydiv = this.$class({
        backgroundColor: "white",
        padding: 4,
        ":hover": { backgroundColor: "pink" }
    })
}
```

The `CombinedStyleset` type allows creating hierarchical structures with unlimited nesting levels so that expressing the following CSS is quite easy:

```css
a { color: blue; }
a:first-child { color: green; }
a:first-child:visited { color: pink; }
a:first-child:visited:hover { color: maroon; }
```

Here is the Mimcss code:

```tsx
class MyClass extends css.StyleDefinition
{
    anchor = this.$style( "a", { color: "blue",
        ":first-child": { color: "green",
            ":visited": { color: "pink",
                ":hover": { color: "maroon" }
            }
        }
    })
}
```

## Complex dependent selectors
To support complex selectors, Mimcss uses a special property `"&"`, which specifies an array of two-element tuples, where the first element is a selector and the second element is a styleset assigned to this selector. Every occurrence of the ampersand symbol in the selector string will be replaced with the selector one level above - a.k.a. parent selector.

The selector in the first element of each tuple can be of several types: all of them are used to produce a selector string within which any occurrence of the ampersand symbol will be replaced with the parent selector.

- String - allows composing selectors from many components using a template string with embedded parameters.
- Class rule object. The selector string is obtained by taking the class name and prefixing it with the dot symbol.
- ID rule object. The selector string is obtained by taking the ID name and prefixing it with the pound sign.
- Style rule object. The selector string is the rule's selector.
- Array of the above. The selector string is obtained by getting selector strings of the array items and concatenating them.

Here is how the second part of our CSS example above is expressed in Mimcss:
```tsx
class MyStyles extends css.StyleDefinition
{
    myspan = this.$class({ padding: 4 })
    solid = this.$id();

    mydiv = this.$class({
        backgroundColor: "white",
        padding: 4,
        "&": [
            [ "tr > &, li > &", { padding: 0 }],
            [ this.solid, { border: "solid" }],
            [ `& > ${this.myspan.cssName}`, { border: "dashed" }]
        ]
    })
}
```

The second tuple specifies the ID rule object. The selector string obtained for this object is `"#solid` and it doesn't specify any ampersand symbols. In this case, this string is simply appended to the parent selector.

The third tuple uses the template literal to create a selector that combines two classes. As in the first tuple, the ampersand symbol stands for the class name behind the `mydiv` property. With template literals, it is possible to create arbitrary complex selectors that involve multiple classes, IDs, tags, pseudo classes and pseudo elements.

## Selector combinators
Template literals allow building very complex selectors; however, it is quite verbose. For simpler cases, the `CombinedStyleset` type provides several *combinator* properties that make it easy to combine a parent selector with another selector. These combinator properties are named using the ampersand symbol prefixed or followed by one of the CSS selector combinator symbols:

- `"& "` and `" &"` for descendants
- `"&>"` and `">&"` for immediate children
- `"&+"` and `"+&"` for adjacent siblings
- `"&~"` and `"~&"` for general siblings
- `"&,"` and `",&"` for selector lists

With these properties, it is easy to specify selectors that combine the parent selector with a single class or element ID:

```tsx
class MyStyles extends css.StyleDefinition
{
    cls1 = this.$class({})

    cls2 = this.$class({
        // will produce selector .cls2.cls1
        "&": [[ this.cls1, { color: "red" } ]]

        // will produce selector .cls2 > .cls1
        "&>": [[ this.cls1, { color: "green" } ]]

        // will produce selector .cls1 + .cls2
        "+&": [[ this.cls1, { color: "blue" } ]]
    })
}
```


