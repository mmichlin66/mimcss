---
layout: mimcss-guide
unit: 7
title: "Mimcss Guide: Style Property Types"
description: "Describes the category of style properties and what TypeScript types are used to specify their values."
rootpath: ".."
---

# Style property types

* [Style property categories](#style-property-categories)
* [General approach](#general-approach)
* [Numeric types](#numeric-types)
* [Mathematical functions](#mathematical-functions)
* [Working with colors](#working-with-colors)
* [Custom named colors](#custom-named-colors)
* [Complex property types](#complex-property-types)

As we already mentioned earlier, the `Styleset` type, which is used to specify style property values in Mimcss, resembles the `CSSStyleDeclaration` type in that it has properties with the same names: the camel-cased names of all CSS shorthand and longhand properties. The difference is that while the `CSSStyleDeclaration` type defines all the properties to have the type `string`, the `Styleset` type defines a different type for each property with the goal of making it easier and less error-prone for developers to assign values to them. This unit describes the different types of the properties in the `Styleset` type.

## Style property categories
We can divide all the style properties into the following broad categories based on the values they accept:

- Keyword-based properties. These properties use keywords to define their values. An example is the `visibility` property, whose allowed values are `visible` or `hidden` or `collapse`.
- Number-based properties. These properties accept numbers usually (but not always) accompanied by a unit specification. An example is the `top` property with accepted values such as `4px` or `1.5em` or `10%`.
- Color properties. These properties accept named colors as well as color values specified in the hexadecimal form and as `rgb` and `hsl` functions.
- Complex value properties. These properties accept a list of values usually of different types and often in an arbitrary order. Shorthand properties usually belong to this category; for example, the `border` property. There are, however, longhand properties with complex values too, for example the `clip-path` property.
- Multi-value properties. These properties accept one or many values of either a simple or a complex type. For some properties, such as `animation`, the multiple values are separated by commas while for others, such as `padding`, the values are separated by spaces.

When deciding what type to use for each individual style property, in addition to the category Mimcss considered the following factors:

- There are many properties that do not belong strictly to one category. For example, the `vertical-align` property can be defined using a number of keyword values but it also accepts a numeric `<length>` value.
- All properties accept the standard keyword values `initial`, `unset`, `inherit` and `revert`.
- All properties can accept the value of a custom CSS property using the `var()` CSS function.
- Number-based properties must support the numeric functions, such as `min()` and `calc()`.

## General approach
The goal of Mimcss is to boost the developers' productivity by increasing convenience and decreasing the number of errors. These two requirements are somewhat contradictory: the fastest and most convenient way to specify property values is to use strings but it is the most error-prone way too. The least error-prone way is to use the strictest types possible, but this is often inconvenient. Mimcss has to make a certain trade off balancing between the convenience and type strictness and here is the general approach that Mimcss has settled on:

- For keyword-based properties, the property type is defined as a union of string literals. The `string` type is not part of type definition. For example, the type for the `visibility` property is defined as:

    ```tsx
    export type Visibility_StyleType = "visible" | "hidden" | "collapse";
    ```

- For number-based types (such as `<length>`, `<angle>`, etc.) the type is defined as a `number` and a callable interface that is implemented by "unit functions" such as `css.percent(100)` or `css.inch(0.5)`. In addition, Mimcss allows a few string literals for such frequently used values as `"100%"` and `"1fr"`. For every numeric type, Mimcss defines a default unit to be used with integer numbers and another unit to be used with floating point numbers. For example, Mimcss defines the `CssLength` type for values of the CSS `<length>` type. When integer numbers are used for the `CssLength` values, they are interpreted as pixels; that is, having the unit suffix of `"px"`. For floating point numbers of the `CssLength` type, the suffix is `"em"`.

- For color properties, the `CssColor` type includes string literals for all the named colors. It also allows specifying colors as numbers and provides `css.rgb()` and `css.hsl()` functions. The `string` type is not part of the `CssColor` type definition.

- For complex properties Mimcss uses arrays, tuples, functions and objects to provide the type-safe and convenient way to specify values. For most complex short-hand properties such as `background`, `animation`, etc. object type with fields corresponding to the long-hand properties is allowed. Most fields in such object types are optional and thus can be omitted.

- The string literals `initial`, `reset`, `inherit` and `revert` are part of any property type definition.

- All properties accept a custom CSS property if it is defined for a compatible type; for example:

    ```tsx
    class MyStyles extends css.StyleDefinition
    {
        defaultColor = this.$var( "color", "red");

        cls = this.$class({
            // this will work because "backgroundColor" property is of the same type as "color"
            backgroundColor: this.defaultColor,

            // this will NOT compile because "width" property is of different type than "color"
            width: this.defaultColor
        })
    }
    ```

- All properties accept the result of the `css.raw()` function, which serves as an escape hatch when there is a need to specify a string value for a property that normally doesn't accept the `string` type. Note that the `raw()` function is a *tag* function and must be invoked with the template string without parentheses.

## Numeric types
CSS defines the `<number>` type for unitless numbers and several numeric types which require unit specification, e.g. `<length>`, `<angle>`, `<percent>`, etc. For each of these types, Mimcss defines a TypeScript type, which serves dual purpose:

1. To allow for convenient numeric operations, and
1. To distinguish between different types so that `<angle>` values would not be assigned to `<length>` properties by accident.

Mimcss supports the following types:

- `CssNumber`. This type corresponds to the CSS `<number>` type. This type doesn't allow specifying values as strings - only as numbers. An example of a property that uses this type is `windows`.
- `CssPercent`. This type corresponds to the CSS `<percent>` type. This type allow specifying values as strings or as numbers. An example of a property that uses this type is `zoom`.
- `CssLength`. This type corresponds to the CSS `<length> | <percent>` type. This type allow specifying values as strings or as numbers. Integer numbers will be considered as specifying the `px` units; floating numbers - the `em` units. An example of a property that uses this type is `left`. There are many properties that use this type as part of their definition. For example, the `margin` property can be specified either as one `CssLength` value or as an array of two to four `CssLength` values.
- `CssAngle`. This type corresponds to the CSS `<angle> | <percent>` type. This type allow specifying values as strings or as numbers. Integer numbers will be considered as specifying the `deg` units; floating numbers - the `turn` units. An example of a property that uses this type is `font-style`. `CssAngle` can also be used as a parameter to several transform, filter and image functions.
- `CssTime`. This type corresponds to the CSS `<time>` type. This type allow specifying values as strings or as numbers. Integer numbers will be considered as specifying the `ms` units; floating numbers - the `s` units. An example of a property that uses this type is `transition-duration`.
- `CssResolution`. This type corresponds to the CSS `<resolution>` type. This type allow specifying values as strings or as numbers. Integer numbers will be considered as specifying the `dpi` units; floating numbers - the `x` units. An example of a property that uses this type is `resolution` property of a media query.
- `CssFrequency`. This type corresponds to the CSS `<frequency>` type. This type allow specifying values as strings or as numbers. Integer numbers will be considered as specifying the `Hz` units; floating numbers - the `kHz` units.

For each of the above numeric types, Mimcss also provides an object that implements "mathematical" functions `min()`, `max()`, `clamp()` and `calc()`. These objects are:

- `Num` for working with the `CssNumber` type.
- `Len` for working with the `CssLength` type.
- `Angle` for working with the `CssAngle` type.
- `Time` for working with the `CssTime` type.
- `Resolution` for working with the `CssResolution` type.
- `Frequency` for working with the `CssFrequency` type.

Mimcss also implements functions named after every unit allowed for the above CSS types. For example, the functions `rem()`, `inch()` and `cm()` work with the `<length>` CSS type. Similarly, the functions `deg()` and `rad()` work with the `<angle>` CSS type. The types returned from these functions make it impossible to assign a value of the wrong type to a property.

```tsx
class MyStyles extends css.StyleDefinition
{
    // This will work because the 'cm()' function returns type compatible with the 'left' property
    cls1 = this.$class({ left: css.cm(1.5) })

    // This will NOT compile because the 'rad()' function returns type incompatible with the 'left' property
    cls2 = this.$class({ left: css.rad(1) })
}
```

## Mathematical functions
CSS specifies functions `min()`, `max()`, `clamp()` and `calc()` for working with numeric values. The type-specific objects listed above implement these functions in a type safe manner.

The `min()` and `max()` functions accept a variable number of parameters of the corresponding numeric type. The return value can only be assigned to the property of the compatible type.

```tsx
class MyStyles extends css.StyleDefinition
{
    // This will work because the 'Len.min()' function returns type compatible with the 'left' property
    cls1 = this.$class({ left: css.Len.min( 100, 10.5, css.inch(1.5), css.percent(50)) })

    // This will NOT compile because the 'Angle.min()' function returns type incompatible with the 'left' property
    cls2 = this.$class({ left: css.Angle.min( 45, 0.25, css.rad(1)) })
}
```

The `clamp()` function accepts three parameters of the corresponding numeric type. The return value can only be assigned to the property of the compatible type.

```tsx
class MyStyles extends css.StyleDefinition
{
    // This will work because the 'Len.clamp()' function returns type compatible with the 'left' property
    cls1 = this.$class({ left: css.Len.clamp( 100,  css.inch(1.5), css.percent(50)) })

    // This will NOT compile because the 'Angle.min()' function returns type incompatible with the 'left' property
    cls2 = this.$class({ left: css.Angle.clamp( 45, 0.25, css.rad(1)) })
}
```

The `calc()` function is a tag function accepting a template string with embedded parameters of the corresponding numeric type. The return value can only be assigned to the property of the compatible type.

```tsx
class MyStyles extends css.StyleDefinition
{
    // This will work because the 'Len.calc()' function returns type compatible with the 'left' property
    cls1 = this.$class({ left: css.Len.calc`(100% - ${100} - ${css.Len.cm(2)}) / 2` })

    // This will NOT work because the type of the second parameter is not compatible with the 'Len.calc()'
    // function parameter type
    cls2 = this.$class({ left: css.Len.calc`(100% - ${100} - ${css.Angle.deg(30)}) / 2` })

    // This will NOT compile because the 'Angle.calc()' function returns type incompatible with the 'left' property
    cls3 = this.$class({ left: css.Angle.calc`(100% - ${100} - ${css.Angle.deg(30)}) / 2` })
}
```

## Working with colors
Mimcss provides the `CssColor` type for using with properties that accept colors either as their values or as parameters in arrays, objects and functions used to set their values. The `CssColor` type is defined as a union of all named colors (keys of the `INamedColors` interface), the built-in keyword values of `transparent` and `currentcolor`, and a `number` type. Notably, the `CssColor` value cannot be defined as an arbitrary string.

The `number` type allows specifying color values using hexadecimal numbers, which resembles the CSS hexadecimal color notation. If in regular CSS, a color can be specified as `#A1B2C3`, in Mimcss, the same value will be expressed as a number `0xA1B2C3`. The alpha channel value can be included just as in regular CSS: `#A1B2C380` in CSS and `0xA1B2C380` in Mimcss. Note that Mimcss does not support the CSS 3-digit hexadecimal notation such as `#CCC` - all numeric values are treated as having two hexadecimal digits per color separation.

Mimcss provides the `Colors` object, which has properties named after every built-in color. The values of these properties are the numeric values of the corresponding colors; thus, using a color name such as `red` is the same as using the `Colors.red` property.

Mimcss implements the `rgb()` and `hsl()` functions, which have the same functionality that their CSS counterparts. These two functions accept the three separation values and an optional alpha channel percentage. In addition, the `alpha()` function allows applying an alpha channel percentage to any color value including the named colors.

As a last resort - just as with any other style property - the `raw()` function can be used if there is a need to specify the color value as a regular CSS string.

Here are the examples of using different ways of assigning color values:

```tsx
class MyStyles extends css.StyleDefinition
{
    // Named color
    cls1 = this.$class({ color: "red" })

    // Property of the Colors object
    cls2 = this.$class({ color: css.Colors.red })

    // Numeric value
    cls3 = this.$class({ color: 0xFF0000 })

    // rgb() function with alpha channel
    cls4 = this.$class({ color: css.rgb( 255, 0, 0, 0.5) })

    // alpha() function with named color
    cls5 = this.$class({ color: css.alpha( "red", 0.5) })

    // raw`` function
    cls6 = this.$class({ color: css.raw`#CCC` })
}
```

## Custom named colors
Mimcss allows assigning names to your own color values and using them just as you use the built in color names. This can be useful for defining colors that are widely used in your application. The technique involves the TypeScript module augmentation mechanism and the Mimcss-provided `Colors` object.

Let's assume that you have a color value `#A1B2C3` and you want to assign the name `myFavColor` to it. The first step is to add this name to the `INamedColors` interface as a property of the `number` type:

```tsx
declare module "mimcss"
{
    interface INamedColors
    {
        myFavColor?: number;
    }
}
```

The above code makes the TypeScript compiler believe that every object implementing the `INamedColors` interface has the `myFavColor` (optional) property; therefore, the compiler will allow us to write the following code:

```tsx
class MyStyles extends css.StyleDefinition
{
    cls = this.$class({ color: "myFavColor" })
}
```

The next step is to add the `myFavColor` property to the `Colors` object with the appropriate value:

```tsx
css.Colors.myFavColor = 0xA1B2C3;
```

Now we can use the string `"myFavColor"` (or its `css.Colors.myFavColor` counterpart) in any place where color values are accepted.

## Complex property types
There are quite a few CSS properties with complex property types, whose values involve multiple parts of different types. Mimcss strives to make assigning values to these properties as easy and type-safe as possible and employs all types available in TypeScript including tuples, arrays, objects and functions.

> Note: we distinguish tuples from arrays in that tuple has a pre-defined number of elements, which can be of different types. TypeScript doesn't have a special type for tuples, although it is possible to define a type as an array with a finite number of elements with different types. TypeScript will enforce element types for such arrays.

Mimcss defines a separate type for each complex property. With these property types, developers can leverage the full power of the TypeScript language as well as Mimcss features such as custom CSS properties, constants, etc.

The following list gives a brief description of the complex properties:

- Properties like `padding` and `margin` that allow specifying one or more values of the `<length> | <percentage>` CSS type. Mimcss defines the type of such properties as `OneOrBox<CssLength>`. This allows specifying either a single `CssLength` value or a tuple of two to four `CssLength` values:

    ```tsx
    class MyStyles extends css.StyleDefinition
    {
        // single raw string
        cls1 = this.$class({ margin: css.raw`4px 8px` })

        // single number (all four sides wil be set to 8px)
        cls2 = this.$class({ margin: 8 })

        // tuple with two elements - number
        cls3 = this.$class({ margin: [4, 1.2] })

        // a single castom variable (4px for top, 0.5em for left and right, "auto" for bottom)
        defaultMargin = this.$var( "margin", [4, 0.5, "auto"])
        cls4 = this.$class({ margin: this.defaultMargin })

        // tuple with four elements mixing numbers, strings and custom variables
        defaultTopMargin = this.$var( "<length>", 8)
        cls5 = this.$class({ margin: [this.defaultTopMargin, "auto", 0.5, 4] })
    }
    ```

- Properties like `animation`, `background`, `box-shadow`, `font`, `text-decoration`, `text-shadow`, `transition`. These are shorthand properties, with multiple elements of different types. For the majority of these properties, the `string` type is allowed. Mimcss also defines object types where the object's fields correspond to the different parts of the CSS property value. For example, the `animation` property has the object type as part of its type definition that defines fields `name`, `duration`, `func`, `delay`, `count`, `direction`, `mode` and `state`. All these fields are declared as optional; therefore, developers can only specify those that they need to.

    In CSS, in most cases, the order of the elements in the shorthand properties is not important; however, sometimes it is and that can create confusion and errors. For example, in the string for the `animation` property, the first time value is always the duration and the second is the delay. In Mimcss, with the object notation, there is no confusion because the field names unambiguously convey the meaning of the parameters.

    Object notation for the shorthand properties is in some sense similar to using longhand properties; however, it is different in two aspects:

    1. It results in a shorthand property being used in the CSS rule, which resets the unspecified longhand properties.
    1. It is less verbose and thus more convenient.

    Note that for every field in the object notation, developers can use not just constants, but any allowed method that results in the proper type including custom variables and references to other Mimcss objects. For example, for the `animation` property, the name of the animation is usually given as a reference to the previously defined `@keyframes` rule:

    ```tsx
    class MyStyles extends css.StyleDefinition
    {
        move = this.$keyframes( [
            [ "from", { top: 0 } ],
            [ 50, { top: 150 } ],
            [ "to", { top: "100%" } ]
        ])

        defaultDuration = this.$var( "<time>", 1200)

        cls = this.$class({
            animation: { name: this.move, duration: this.defaultDuration }
        })
    }
    ```

- For properties using images such as `background-image`, `list-style-image`, `cursor`, etc., Mimcss provides implementations of the functions listed under the `<image>` CSS type. This includes `url()`, `linearGradient()`, `imageSet()` and others.

- For the `transform` property, Mimcss provides implementations of the functions listed under the `<transform-function>` CSS type. This includes `matrix()`, `perspective()` `rotate()`, `scale()`, `skew()`, `translate()` and their variants.

- For the `filter` and `backdrop-filter` properties, Mimcss provides implementations of the functions listed under the `<filter-function>` CSS type. This includes `blur()`, `brightness()` `contrast()`, `dropShadow()`, `grayscale()`, `hueRotate()`, `invert()`, `opacity()`, `saturate()` and `sepia()`.

- For the `clip-path`, `shape-outside` and `offset-path` properties, Mimcss provides implementations of the functions listed under the `<basic-shape>` CSS type. This includes `inset()`, `circle()` `ellipse()`, `polygon()` and `path()`.

