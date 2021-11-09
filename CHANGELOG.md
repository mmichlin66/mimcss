# 0.11.7

## Non-breaking changes

1. Allow named rules (e.g. $class()) to be created using arrays.


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


