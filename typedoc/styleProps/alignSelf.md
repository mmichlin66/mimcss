**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    cls1 = css.$class({
        alignSelf: "self-start"
    })

    cls2 = css.$class({
        alignSelf: "first baseline"
    })

    cls3 = css.$class({
        alignSelf: "safe center"
    })
}
```

**MDN**: https://developer.mozilla.org/en-US/docs/Web/CSS/align-self

