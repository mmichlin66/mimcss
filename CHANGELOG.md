# 0.11.9

1. Fix build issue by adding CounterTypes.d.ts to package.json


# 0.11.8

## Non-breaking changes

1. Add support for server-side rendering and hydration. Use `startSSR()/stopSSR()` functions during server-side rendering and `startHydration()/stopHydration()` during the first rendering of SSR-produced HTML page.
2. Use the `Scoped` name generation method in Debug builds (`mimcss.dev.js`) by default - instead of the `UniqueScoped` method in previous versions. This produces somewhat more user friendly and, most importantly, predictable class names, which can be used during tests. Note that if you have identically named style definition classes that have a chance to be activated at the same time, you need to set the `UniqueScoped` method using the `configNameGeneration()` function.
3. Upgrade TypeScript version used during Mimcss builds to 4.5.4, which brings some new DOM/CSSOM interfaces - notably, CSSCounterStyleRule. Since this interface is used in Mimcss declaration files, user must use TypeScript version 4.4 or more recent.


# 0.11.7

## Non-breaking changes

1. Allow named rules (e.g. $class()) to be created using arrays. Names are created by appending rule indexes.
2. Use ESNEXT instead of ES2017 in tsconfig.json.
3. Add support for @property at-rules.
4. Add support for paint() CSS function.


# 0.11.6

## Non-breaking changes

1. Remove `$attr()` method of the StyleDefinition class - its functionality is fully covered by the `$style()` method.
2. Add `sel()` function to define style rule selectors using chain calls.


# 0.11.5

## Bug fixes

1. `skew()` function doesn't work - incorrect name is used in CSS serialization.
2. `dropShadow()` function doesn't work - incorrect order of parameters in CSS serialization.


# 0.11.4
## Non-breaking changes

1. Update list of style properties and prefixed properties.
1. Add `color-mix()` and `color-contrast()` functions.
1. Improve `cross-fade()` function.
1. Add `image-set()` function.


# 0.11.3
## Non-breaking changes

1. Add `IRawProxy` interface.
1. `raw()` tag function returns `IRawProxy` instead of `IStringProxy` interface.
1. Add `CssString` type to represent the `<string>` type.
1. Add support for `content-visibility` style property.


## Bug fixes

1. Serialization of the `quotes` style property.
2. Allow only keywords for the `font-stretch` part of the shorthand `font` property.


# 0.11.2
## Non-breaking changes

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


