---
layout: mimcss-guide
unit: 12
title: "Mimcss Guide: Constructable Stylesheets"
description: "Support for constructable stylesheets and custom Web elements."
rootpath: ".."
---

# Constructable Stylesheets

Constructable stylesheets is a new technology, which is currently only supported by Chrome ([see here](https://developers.google.com/web/updates/2019/02/constructable-stylesheets)). It allows programmatically creating a stylesheet (a `CSSStyleSheet` object) once and sharing it between multiple `ShadowRoot` elements. It is mostly useful for custom Web elements because globally defined styles don't apply to elements under the Shadow DOM. Without constructable stylesheets, a new `<style>` element would have to be created for every instance of a custom Web element, which is obviously wasteful. With constructable stylesheets, the `CSSStyleSheet` object is created once and then is set as a member of the array to the `adoptedStyleSheets` property, which is available on every `ShadowRoot` and `Document` elements. The latter allows sharing the same stylesheet between the document and the custom Web elements.

Mimcss supports constructable stylesheets by establishing an *adoption context* linked to a given `Document` or `ShadowRoot` object before the `activate` function call. The context is established using the `pushAdoptionContext` function and is removed using the `popAdoptionContext` function. If an adoption context is active when the `activate` function is called, Mimcss will create an instance of the style definition class, serialize it to a `CSSStyleSheet` instance and adopt it to the `Document` or `ShadowRoot` element whose adoption context is currently active. If the `activate` function is called again with the same style definition class but the adoption context for a different `root` parameter, Mimcss will adopt the existing `CSSStyleSheet` instance to the new root object.

In the browsers that don't support constructable stylesheets yet, Mimcss will instead create `<style>` elements under the given `Document.head` or `ShadowRoot` element so that developers don't need to worry whether the browsers support constructable stylesheets or not. Note that in order to do that, Mimcss creates some internal resources. These resources can only be cleaned up if the first call to `pushAdoptionContext` is done NOT in the constructor. The proper place to call it is in the `connectedCallback` method.

As an example, let's have a simple custom Web element:

```tsx
class MyCustomElementStyles extends css.StyleDefinition
{
    red = this.$class({ backgroundColor: "red" })
}

class MyCustomElement extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback()
    {
        // establish adoption context
        css.pushAdoptionContext( this.shadowRoot);
        this.styles = css.activate( MyCustomElementStyles);
        // remove adoption context
        css.popAdoptionContext( this.shadowRoot);

        // create some content
        let div = document.createElement( "div");
        this.shadowRoot.appendChild( div);
        div.className = this.styles.red.name;
        let text = document.createTextNode("Hello!");
        div.appendChild(text);
    }

    disconnectedCallback()
    {
        // establish adoption context
        css.pushAdoptionContext( this.shadowRoot);
        css.deactivate( this.styles);
        // remove adoption context
        css.popAdoptionContext( this.shadowRoot);
    }

    private styles: MyCustomElementStyles;
}

customElements.define( "my-custom-element", MyCustomElement);
```


