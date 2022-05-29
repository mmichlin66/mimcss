# 0.11.16

1. Implement `@scroll-timeline` at-rule and `animation-timeline` style property.


# 0.11.15

1. Fix problems with using `ESNext` as a target (in `tsconfig.json`).
1. Use zeros as default values for `x` and `y` coordinates in the `BoxShadow` and `TextShadow` style property types.


# 0.11.14

1. Do not activate *theme declarations* (classes that directly derive from `ThemeDefinition`) including when they are referenced from other style declaration classes via the `$use()` method. Theme declarations should not be activated on their own as all the rules they contain are inserted into the DOM when *theme implementations* (classes that derive from theme declarations) are activated.

1. Allow using plain JavaScript objects in style definitions.
    ```typescript
    import * as css from "mimcss"

    class MyStyles extend css.StyleDefinition
    {
        types = {
            active: this.$class({ color: "red" }),
            selected: this.$class({ color: "blue" }),
            disabled: this.$class({ color: "gray" })
        }
    }
    ```

1. Implement `mergeStylesheets()` function for merging style definitions including recursive merges of plain JavaScript objects.
    ```typescript
    import * as css from "mimcss"

    class MyStyles extend css.StyleDefinition
    {
        types = {
            active: this.$class({ color: "red" }),
            selected: this.$class({ color: "blue" }),
            disabled: this.$class({ color: "gray" })
        }
    }

    class OtherStyles extend css.StyleDefinition
    {
        types = {
            active: this.$class({ color: "pink" }),
            selected: null,
        }
    }

    let myStyles = css.activate(MyStyles);
    let otherStyles = css.activate(OtherStyles);
    let mergedStyles = css.mergeStylesheets(null, myStyles, otherStyles);

    // the mergedStyles object will have the following structure
    {
        types = {
            active: this.$class({ color: "pink" }),     // rule changed
            selected: null,                             // rule removed
            disabled: this.$class({ color: "gray" })    // rule unchanged
        }
    }

    ```

1. Allow string literals for numeric CSS types such as `<length>`, `<angle>` and others. This allows using strings containing a number followed by a corresponding unit; for example, `"1em", "3deg"`. If a wrong unit is specified, a compiler error will occur.
    ```typescript
    import * as css from "mimcss"

    class MyStyles extend css.StyleDefinition
    {
        cls = this.$class({
            padding: "0.3cm",
            margin: "12deg" // !!! will not compile as "deg" is not valid for <length> type
        })
    }
    ```



# 0.11.13

1. Support for `color()` function and `@color-profile` at-rule.
1. Improve support of the `@page` at-rule including named pages and margin boxes.
1. Implement `@layer` at-rule.
1. Support 'layer' in `@import` at-rule.


# 0.11.12

1. Add support for `hwb()` color function.
1. The `stylesetToString()` function returns string without curly braces, so that it can be directly used in a `style` HTML property.
1. Add typedoc comments for style properties of color, background, size and width types.


# 0.11.11

1. Add support for constructable style sheets and adoption of them by Document and ShadowRoot objects.


# 0.11.10

1. IClassRule and IIDRule interfaces now extend the IPrefixedNamedEntity interface.
1. Add `size` property to `@page` at-rule.


# 0.11.9

1. Fix build issue by adding CounterTypes.d.ts to package.json


# 0.11.8

1. Add support for server-side rendering and hydration. Use `startSSR()/stopSSR()` functions during server-side rendering and `startHydration()/stopHydration()` during the first rendering of SSR-produced HTML page.
1. Use the `Scoped` name generation method in Debug builds (`mimcss.dev.js`) by default - instead of the `UniqueScoped` method in previous versions. This produces somewhat more user friendly and, most importantly, predictable class names, which can be used during tests. Note that if you have identically named style definition classes that have a chance to be activated at the same time, you need to set the `UniqueScoped` method using the `configNameGeneration()` function.
1. Upgrade TypeScript version used during Mimcss builds to 4.5.4, which brings some new DOM/CSSOM interfaces - notably, CSSCounterStyleRule. Since this interface is used in Mimcss declaration files, user must use TypeScript version 4.4 or more recent.


# 0.11.7

1. Allow named rules (e.g. $class()) to be created using arrays. Names are created by appending rule indexes.
2. Use ESNEXT instead of ES2017 in tsconfig.json.
3. Add support for @property at-rules.
4. Add support for paint() CSS function.


# 0.11.6

1. Remove `$attr()` method of the StyleDefinition class - its functionality is fully covered by the `$style()` method.
1. Add `sel()` function to define style rule selectors using chain calls.


# 0.11.5

## Bug fixes

1. `skew()` function doesn't work - incorrect name is used in CSS serialization.
2. `dropShadow()` function doesn't work - incorrect order of parameters in CSS serialization.


# 0.11.4

1. Update list of style properties and prefixed properties.
1. Add `color-mix()` and `color-contrast()` functions.
1. Improve `cross-fade()` function.
1. Add `image-set()` function.


# 0.11.3

1. Add `IRawProxy` interface.
1. `raw()` tag function returns `IRawProxy` instead of `IStringProxy` interface.
1. Add `CssString` type to represent the `<string>` type.
1. Add support for `content-visibility` style property.


## Bug fixes

1. Serialization of the `quotes` style property.
2. Allow only keywords for the `font-stretch` part of the shorthand `font` property.


# 0.11.2

1. Allow referencing theme definition classes under the `"--"` styleset property.
1. Add `$attr` method to the `StyleDefinition` class to create attribute selectors.


# 0.11.1
## Breaking changes

1. Instead of global `$...` functions (e.g. `$class`) use methods of the `StyleDefinition` class.

    0.10.2:
    ```typescript
    import * as css from "mimcss"

    class MyStyles extend css.StyleDefinition
    {
      red = css.$class({ color: "red" })
    }
    ```

    0.11.1:
    ```typescript
    import * as css from "mimcss"

    class MyStyles extend css.StyleDefinition
    {
      red = this.$class({ color: "red" })
    }
    ```

1. Remove the `$owner` property from the `StyleDefinition` class.


