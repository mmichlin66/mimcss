---
layout: mimcss-guide
unit: 11
title: "Mimcss Guide: Server side rendering"
description: "Supporting server-side rendering and client-side hydration."
rootpath: ".."
---

# Server side rendering

Server side rendering (SSR) is a technique to render an initial state of a client application on the server to speed up page rendering in the browser. The component rendering code is invoked on the server and the result is captured to an HTML string. The string is then written to the server's output stream and becomes part of the static HTML delivered from the server to the client. The *hydration* process is the client counterpart of server side rendering, in which the component rendering, instead of producing HTML elements, finds the existing elements and links them to the appropriate components. After the hydration process is finished the application continues to work normally and rendering components causes HTML elements to be added, removed or changed.

With Mimcss, components activate and use style definitions, which results in `<style>` elements being created in the HTML's `<head>` element. To support server side rendering, Mimcss provides functions, which are called on the server before and after the component rendering is invoked. This allows capturing the content, which is normally written to the `<head>` element, to a string. This string is manually added before the end of the `<head>` element in the output HTML stream. For the hydration on the client, Mimcss provides functions that are called before and after the first rendering phase, which ensures that necessary style definitions are created and "linked" to the appropriate `<style>` elements.

As an example, let's have an application page consisting of one simple component that uses a simple style definition class. Here is the style definition and component code (we are using pseudo-React code):

```tsx
// MyComponent.tsx
import * as css from 'mimcss'

class MyStyles extends css.StyleDefinition
{
    hello = this.$class({
        padding: 4
        border: [1, "solid", "blue"],
        borderRadius: 8,
        textAlign: "center"
    })
}

class MyComponent
{
    styles: MyStyles;

    willMount() { this.styles = css.activate(MyStyles); }
    willUnmount() { css.deactivate(this.styles); }

    render()
    {
        return <div className={this.styles.hello.name}>
            Hello World!
        </div>
    }
}
```

The following sections discuss the server side rendering and client side hydration processes.

## Server side implementation

On the server side, the Mimcss `startSSR()` and `stopSSR()` functions should be called respectively before and after the component rendering code is invoked. The `startSSR()` function sets the stage for server side rendering by creating an internal buffer where all calls to activate style definitions are captured. The `stopSSR()` function serializes all the activated style definitions into a string and returns it. The server code then should write the string into the HTML output. Here is the code:

```tsx
// Pseudo-imports for illustration only
import {renderComponentToString} from 'ssr-impl'
import {writeHTML} from 'http-server-impl'

import * as css from 'mimcss'
import {MyComponent} from './MyComponent';

// Render component within Mimcss SSR context
css.startSSR();
let compString = renderComponentToString( <MyComponent/>);
let stylesString = css.stopSSR();

// Add the string with styles before the end of the `<head>` element and
// the string with component rendering as the `<body>` element's content.
writeHTML(`<html>
    <head>${stylesString}</head>
    <body>
        <div id="root">${compString}</div>
    </body>
    <script src="bundle.js"></script>
</html>`)
```

## Client side implementation

On the client side, the Mimcss `startHydration()` and `stopHydration()` functions should be called respectively before and after the component rendering code is invoked. The `startHydration()` function sets the stage for hydration rendering by using the calls to activate style definitions to link them to the existing `<style>` elements. The `stopHydration()` function reverts to the normal Mimcss functionality where calls to activate style definitions create new `<style>` elements. Here is the code:

```tsx
// Pseudo-import for illustration only
import {hydrateComponent} from 'hydration-impl'

import * as css from 'mimcss'
import {MyComponent} from './MyComponent';

// Render component within Mimcss hydration context
css.startHydration();
let compString = hydrateComponent( <MyComponent/>, document.getElementById('root'));
css.stopHydration();
```

The above code should be part of the application bundle, which is referenced from the HTML file rendered from the server (see the reference to the `bundle.js` script in the section above).

## SSR limitations
In order for the SSR to work, the styles rendered on the server must be exactly the same as those rendered on the client during hydration. If this condition is not fulfilled, the results are unpredictable as Mimcss will not be able to link the style definition objects with existing `<style>` elements and rule objects with CSSOM rules.

Both `startSSR()` and `startHydration()` functions set the default activation mode to be *synchronous*. The component rendering code MUST NOT change the activation mode using the `setDefaultScheduler()` function. The `stopSSR()` and `stopHydration()` functions revert the activation mode to what it was before the calls to `startSSR()` and `startHydration()` respectively. After calling the `stopHydration()` function, the application can set the default activation mode to any value it prefers - including custom schedulers.

