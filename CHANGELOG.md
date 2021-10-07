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


