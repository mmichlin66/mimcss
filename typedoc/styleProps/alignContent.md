**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    cls1 = css.$class({
        alignContent: "stretch"
    })

    cls2 = css.$class({
        alignContent: "first baseline"
    })

    cls3 = css.$class({
        alignContent: "safe center"
    })
}
```

**MDN**: https://developer.mozilla.org/en-US/docs/Web/CSS/align-content

