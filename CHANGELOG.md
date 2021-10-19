# 0.11.3
## Non-breaking changes

1. Add `IRawProxy` interface.
1. `raw()` tag function returns `IRawProxy` instead of `IStringProxy` interface.
1. Add `CssString` type.


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


