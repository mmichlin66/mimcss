---
layout: mimcss-guide
unit: 4
title: "Mimcss Guide: Custom properties"
description: "Mimcss provides full support for custom CSS properties and allows assigning types to them to ensure type-safety."
rootpath: ".."
---

# Custom properties

* [Custom properties in CSS files](#custom-properties-in-css-files)
* [Custom properties in Mimcss](#custom-properties-in-mimcss)
* [`@property` at-rule](#property-at-rule)
* [Programmatic access to custom properties](#programmatic-access-to-custom-properties)
* [Custom properties vs. constants](#custom-properties-vs-constants)

## Custom properties in CSS files
CSS custom properties are properties with arbitrary names beginning with two dashes. The properties are defined as having arbitrary values and they are used as values of the style properties. Here is an example:

```css
:root {
    --special-color: blue;
}

.special-container {
    --special-color: green;
}

.special {
    color: var(--special-color);
}
```

Custom properties are often defined at the root level and serve as named constants. This allows Web developers to create robust code that wouldn't require extensive changes when aspects of the application design change. The utility of custom properties, however, goes beyond just serving as named constants: they participate in the cascade and can be re-defined at any level - that is, under any CSS selector.

In the above example, an element having the `special` class will have the blue color unless it resides under the element with the  `special-container` class, in which case the element's color will be green.

One downside of custom properties is that no restrictions are put on their values, which means that there is no way for the tools to help developers avoid inevitable misspellings and other errors. Consider the following example:

```css
:root {
    --special-color: bluue; /* misspelled color value */
    --special-font-weight: 600;
}

.special-container {
    --special-color: bold; /* mixed up value */
    --special-font-weight: green; /* mixed up value */
}

.special {
    color: var(--special-color);
    font-weight: var(--special-color); /* incorrect property assignment - wrong type */
}
```

We purposefully made several errors here:
1. We put an extra 'u' in the value of the `--special-color` custom property.
1. We redefined both custom properties under the `.special-container` selector but mixed up their values.
1. We assigned to the `font-weight` style the value of the `--special-color` custom property instead of `--special-font-weight` property.

These errors will only manifest themselves at run time: since custom properties allow any values, the tools cannot recognize the errors at compile time (although, for example, the tools would warn the developer if the incorrect color value were assigned directly to the `color` property).

## Custom properties in Mimcss
Mimcss allows defining and using custom properties while helping developers avoid the above problems at compile time. First, here is an example demonstrating how the CSS from the previous section is modeled in Mimcss:

```tsx
class MyStyles extends css.StyleDefinition
{
    specialColor = this.$var( "color", "blue")

    specialContainer = this.$class({
         "--": [ [this.specialColor, "green"] ]
    })

    special = this.$class({ color: this.specialColor })
}
```

The `$var` method defines a custom property of the type determined by the first parameter, which is a name of a CSS style property (or one of special *syntax* strings that are described later). The second parameter is the value of the custom property and Mimcss enforces that it is of the type corresponding to the first parameter. In our example, the second parameter will only accept the correct color values.

The `specialContainer` property defines a CSS class, which re-defines the `specialColor` custom property using the `"--"` property of the `Styleset` class. The `"--"` property value is an array of two-element tuples. The first element is a reference to the custom property rule - in our case `specialColor` property. The second element is the property value. The first element informs us of two things: first, what custom property is being re-defined, and second, what types are valid for the second parameters. In our example, only valid color values will be accepted.

The `special` property defines a CSS class that uses the value of the `specialColor` custom property. Note that we simply referenced a custom property object. When the rule will be inserted into the DOM this will be represented by the CSS `var()` method. Note that Mimcss allows using custom property objects in lieu of values of any CSS property - but only if the type of the custom property is compatible with the type of the CSS property.

TypeScript's powerful typing system enforces the typing rules and helps with autocomplete. In the `specialColor` rule, the developer will be prompted with the possible color names. Misspelling a color name will result in a compile time error.

In the `specialContainer` rule, the developer will be similarly prompted with the correct color names because, the system understands what type is allowed in the second element of the tuple based on the custom property type in first element.

In the `special` rule, a compile time error will be generated if the developer incorrectly assigns a previously defined custom property to a Styleset property of a wrong type.

Thus, Mimcss solves the problems mentioned above so that instead of being run-time errors they become compile-time errors.

## `@property` at-rule
The *CSS Properties and Values API Level 1* specification defines, and a number of browsers already support, a new at-rule `@property`. This at-rule defines a custom property and allows specifying its syntax, initial value and the inheritance flag. The `syntax` descriptor represents one of the CSS types such as `<length>`, `<angle>` and others. In addition, it allows `+` and `#` multipliers and `|` combinator. The `@property` rule allows the browsers to enforce the type of the custom property.

Mimcss supports the `@property` rule via the `$property` method of the `StyleDefinition` class. Here is an example, which defines a custom property of type `<length>` with the initial value of `2px`:

```tsx
class MyStyles extends css.StyleDefinition
{
    // defines a custom property of type `<length>` with the initial value of `2px`
    defaultBorderWidth = this.$property( "<length>", 2)

    // defines a custom property of type `<length>+` with the initial value of `4px 2px`
    defaultPadding = this.$property( "<length>+", [4,2])
}
```

Mimcss provides syntax strings for all types specified in the specification and allows appending `+` and `#` multipliers to them. Since the syntax string allowed for the `@property` rule can be significantly more complex (e.g. using custom identifiers and the `|` combinator), Mimcss allows specifying syntax as an arbitrary string. If this is the case, the string must be passed as a single-element tuple. Note that in this case, Mimcss doesn't know what type the property values should be and allows any type. Here is an example:

```tsx
class MyStyles extends css.StyleDefinition
{
    // defines a custom property of type `<length>` with the initial value of `2px`
    defaultBorderWidth = this.$property( ["<length> | thin | thick", "thin");
}
```

From Mimcss perspective, the `$var()` and `$property()` methods are very similar. Moreover, Mimcss allows using the syntax strings as the first parameter of the `$var()` method. The objects created by the `$property()` method can be used in all the contexts where objects created by the `$var()` method can be used.

## Programmatic access to custom properties
Values of custom CSS properties can be changed programmatically and Mimcss provides an easy-to-use and type-safe way of doing it. The objects created using the `$var()` and `$property()` methods have the `setValue()` method. This method accepts the new value that can be only of the type allowed for the custom property according to its definition. The `setValue()` method sets the new value at the *root* level - that is, under the `:root` rule. In order to set the new value under a different style rule, you need to use the `setCustomProp()` method of the style rule objects created by `$tag()`, or `$class()` or `$id` or `$style` methods. Here is an example:

```tsx
class MyStyles extends css.StyleDefinition
{
    bgColor = this.$var( "color", "white");

    outer = this.$class({ backgroundColor: this.bgColor })

    inner = this.$class({ backgroundColor: this.bgColor })
}

....
let styles = css.activate(MyStyles);
...

// set new value under the :root rule
styles.bgColor.setValue( "beige");

// redefine with a different value under the "inner" element
styles.inner.setCustomProp( styles.bgColor, "cyan");
```

If there is a need to remove the definition of a custom variable, then the new value passed to either `setValue()` or `setCustomProp()` methods should be set to `null`.

## Custom properties vs. constants
As it has already been mentioned above, custom CSS properties provide richer functionality than just being named constants. If, however. all you need is to define a constant that can be used in the style rules, Mimcss, by virtue of being a TypeScript code, provides multiple ways to do so. You can use any means the language allows: enumerations, static class properties, simple variables, etc. In order to keep the things together, however, our recommendation is to use properties of style definition class.

Yes, style definition classes can contain properties that are not CSS rules. Since these classes are regular TypeScript classes, they can contain any type of properties and methods - static or instance. When Mimcss processes a style definition class (during a call to `$use` method or `activate` function), it creates an instance of the class and goes over its properties. All properties that don't represent CSS rules are simply ignored by Mimcss; however, their values can be used by any rules.

When creating constants you can use either static or instance properties; however, since in most cases there will be only single instance of each type definition class created, our recommendation is to use instance properties as they are easier to work with.

in addition, Mimcss provides the `$const` method that works very similarly to the `$var` method in that it allows specifying complex values compatible with the type of a given style property or syntax string. The difference is that the `$const` method doesn't create any CSS entity, but simply creates a value that can be used in other rules.

Here is an example of specifying constants in a style definition class:

```tsx
class MyStyles extends css.StyleDefinition
{
    // define constants
    defaultPadding = 8
    defaultColor = "black" as css.CssColor
    defaultBorder = this.$const( "border", [2, "dashed", "blue"])

    // define custom CSS prroperty
    defaultBgColor = this.$var( "color", "white")

    cls = this.$class({
        padding: this.defaultPadding,
        color: this.defaultColor,
        border: this.defaultBorder,
    })
}
```

> Note that we defined the type of the `defaultColor` property. We have to do it because otherwise, TypeScript will think that the type is `string`, which is not the type that is acceptable by the `color` style property.

Aside from participation in the cascade, another significant difference between custom properties and constants is that it is possible to change the value of a custom property, thus changing styles. Changing values of custom properties is sometimes used to make massive visual (or layout) changes without invoking a rendering code.

Note that it is possible to change the value of the named variable (unless it is not defined as readonly or private):

```tsx
styles.defaultColor = "blue"
```

Although the value of the instance property is indeed changed, this doesn't have any effect on the styling rules since the value of the property has already been used during first style definition activation and is not used any more.



