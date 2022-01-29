---
layout: mimcss-guide
unit: 2
title: "Mimcss Guide: Defining selectors"
description: "Mimcss uses the full power of the TypeScript typing system to define style property values in a type-safe and convenient ways."
rootpath: ".."
---

# Defining selectors

* [CSS selectors](#css-selectors)
* [Using strings](#using-strings)
* [Using `sel` function](#using-sel-function)
* [Using arrays](#using-arrays)

## CSS selectors
CSS selectors range from very simple to rather complex, and Mimcss provides several means to define them.

In its simplest form a selector can be a single tag name or CSS class or element identifier. The more complicated selectors (called *compound selectors*) can define attributes and pseudo classes and elements (we collectively call them "pseudo entities" here). Some pseudo entities are simple keywords (e.g. `:hover`), while others take form of a function with parameters (e.g. `:nth-child(2n+1)`). Moreover, all these items can be chained together or specified as a list or use other selector combinators to indicate item relationship to each other (e.g. descendant or immediate child or general sibling or adjacent sibling).

Simple selectors are handled by the `StyleDefinition` methods `$tag()`, `$class()` and `$id()`. The `$tag` methods accepts either a single name or an array of names, which it treats as a list. That is, the following code

```typescript
class MyStyles extends css.StyleDefinition
{
    tags = this.$tag( ["p", "section", "article"], { padding: 2 })
}
```

will create the following CSS:

```css
p, section, article { padding: 2px; }
```

The more complicated selectors could take two major forms:

- Selectors which add items to a tag or class or ID, e.g.
    ```css
    a:hover
    ```
- Selectors that combine any number of tags, classes, IDs, attributes and pseudo entities with complex relationships, e.g.
    ```css
    section.major:not(#main) > section.minor .item:nth-of-type(odd)
    ```

Any type of selectors can be handled using the `$style()` method; however, the first type of selectors is more conveniently handled using the *dependent* styles, which are described in details in the section [Dependent Styles](defining-styles.html#dependent-styles) of the next unit. As a short example, the `a:hover` selector would be described by the following code:

```typescript
class MyStyles extends css.StyleDefinition
{
    a = this.$tag( "a", {
        ":hover": { textDecoration: "blue"}
    })
}
```

For the really complex selectors, the `$style()` method should be used, which accepts the `CssSelector` type as the first parameter. The `CssSelector` type can be created using the following methods:

- A regular string or template literal, e.g.
    ```typescript
    'input[type="text"]' or `input[type="${variable}"]`
    ```
- Invocation of the `sel` function with chained invocations of properties and methods, e.g.
    ```typescript
    css.sel("input").attr("type", "text").and(this.search).focus
    ```
- Array of items - each of the `CssSelector` type - e.g.
    ```typescript
    ['input[type="text"]', this.search, ':focus']
    ```

### Using strings
Using a regular string to define a selector is the simplest of all methods. If the selector doesn't use any classes or IDs defined within the `StyleDefinition` class, then using a string is perfectly legitimate. For example, if you want any text input element within an `<article>` element to show a blue outline when focused, you can do it the following way:

```typescript
class MyStyles extends css.StyleDefinition
{
    focusedInput = this.$style( 'article > input[type="text"]:focus', { outline: [2, "solid", "blue"] })
}
```

Template literals can be used to embed variable content into a selector string. This can be useful when the selector needs to refer to CSS classes or IDs previously defined in the style definition. For example:

```typescript
class MyStyles extends css.StyleDefinition
{
    special = this.$class({...})

    // The `cssName` property has the value of the CSS class name with
    // the proper prefix (`"."`)
    inputUnderArticle = this.$style(
        `article > input[type="text"]${this.special.cssName}`, { ... })

    // You can directly specify style properties as template parameters
    // when the properties were created using `$style()` or `$tag()` methods
    focusedInputUnderArticle = this.$style(
        `${this.inputUnderArticle}:focus`, { ... })
}
```

Template literals are quite powerful, but the major drawback is the lack of syntax checking; since it is just a string, any errors and misspellings go unnoticed by the compiler and will only be detected at run time.

### Using `sel()` Ffunction
If you do want the compiler to enforce syntax checking, then you should use the `sel()` function that returns an object, which has properties and methods for gradually building a compound selector. The following snippet demonstrates using the `sel()` function to build the selector from the previous section:

```typescript
class MyStyles extends css.StyleDefinition
{
    special = this.$class({...})
    focusedInputUnderArticle = this.$style( css.sel("article").child("input")
        .attr("type", "text").and(this.specialInput).focus, { ... })
}
```

The `sel()` function itself returns the `ISelectorBuilder`interface and every property and method of this interface also return it; therefore, any method or property invocation can be chained to the previous method or property invocation. The `sel()` function itself accepts zero or more selectors (of type `CssSelector`). If more than one selector is provided, they are simply concatenated with each other. The internal object that implements the `ISelectorBuilder` interface maintains a "current selector". This current selector is initialized with the selectors provided to the `sel()` function.

```typescript
// produces CSS: p.cls1.cls2
css.sel("p", this.cls1, this.cls2);
```

When the properties and methods are invoked, the corresponding items are added to the current selector. The properties and methods of the `ISelectorBuilder` interface can be divided into the following categories:

- Method `and()` receives zero or more selectors. If more than one selector is provided, they are simply concatenated to the current selector and to each other. If zero selectors are provided the call has no effect.
    ```typescript
    // produces CSS: p.cls1.cls2
    css.sel("p").and(this.cls1, this.cls2);
    ```
- Methods `or()`, `child()`, `desc()`, `sib()` and `adj()` receive zero or more selectors. If more than one selector is provided, they are concatenated to the current selector and to each other using the corresponding combinator. If zero selectors are provided, then only the corresponding combinator is added to the current selector.
    - The `or()` function uses the list combinator `","`.
    - The `child()` function uses the immediate child combinator `">"`.
    - The `desc()` function uses the descendant combinator `" "`.
    - The `sib()` function uses the general sibling combinator `"~"`.
    - The `adj()` function uses the adjacent sibling combinator `"+"`.

    ```typescript
    // produces CSS: p, .cls1, .cls2
    css.sel("p").or(this.cls1, this.cls2);

    // produces CSS: p, .cls1 + .cls2
    css.sel("p").or(this.cls1).adj(this.cls2);

    // produces CSS: p .cls1 > .cls2 > .cls3
    css.sel("p").desc(this.cls1).child(this.cls2, this.cls3);
    ```

- Method `attr()` is used to construct an attribute selector and concatenate it with the current selector. The method accepts the attribute name and, optionally, attribute value, comparison operation, case-sensitivity flag and attribute namespace.
    ```typescript
    // produces CSS: input[checked]
    css.sel("input").attr("checked");

    // produces CSS: audio[preload="metadata"]
    css.sel("audio").attr("preload", "metadata");

    // produces CSS: audio[href^="https"]
    css.sel("a").attr("href", "^=", "https");
    ```
- Properties for every property-like pseudo entity, such as `:hover`, `:focus`, `:enabled`, `::after` and so on. The property names correspond to the pseudo entity names in Camel form without the `:` or `::` prefix.
    ```typescript
    // produces CSS: a:first-child:visited:hover
    css.sel("a").firstChild.visited.hover;
    ```
- Methods for every function-like pseudo entity, such as `::dir()`, `:is()`, `:nth-child()`, `::slotted()` and so on. The method names correspond to the pseudo entity names in Camel form without the `:` or `::` prefix. Since CSS defines both property-like and method-like pseudo classes using the same name `:host`, Mimcss defines the method name `host$()` to distinguish it from the property `host`. The methods accept different parameters according to their definitions.
    ```typescript
    // produces CSS: :is("header", "footer") > :is(.cls1, .cls2)
    css.sel().is("header", "footer").child().is(this.cls1, this.cls2);

    // produces CSS: p.cls1:nth-of-type(2n+1)
    css.sel("p").and(this.cls1).nthOfType(2,1);
    ```

### Using arrays
A selector can be represented by an array where each item is a selector itself - that is, object of `CssSelector` type. This is a simple way of composing compound selectors by concatenating simpler selectors. If you want to insert any combinators between the selectors, you need to add the combinators as items in the array:

```typescript
// produces CSS: nav.cls1 > a
["nav", this.cls1, ">", "a"];
```

Since an array of selectors is a selector, arrays can be embedded in arrays with arbitrary levels of nesting. For example the array in the following example creates selector identical to that from the previous example:

```typescript
// produces CSS: nav.cls1 > a
["nav", [this.cls1, [">", "a"]]];
```
