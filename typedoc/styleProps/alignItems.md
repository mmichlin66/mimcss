**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    cls1 = css.$class({
        alignItems: "flex-start"
    })

    cls2 = css.$class({
        alignItems: "first baseline"
    })

    cls3 = css.$class({
        alignItems: "safe center"
    })
}
```

**MDN**: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items

