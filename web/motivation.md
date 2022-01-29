---
layout: mimcss-guide
title: "Motivation for Mimcss"
description: "Describes the motivation behind the Mimcss project."
---

# Motivation for Mimcss

## Type Safety
We increasingly create our Web applications using TypeScript. As a typed language it offers significant benefits to developers in the following ways:

- Many errors that would only be detected at run-time when using JavaScript, are compile-time errors with TypeScript.
- IDEs provide significant help by prompting for appropriate types and values as developers write code.

We get the above benefits when laying out the HTML structure of our pages or components as TypeScript has a built-in type checking for JSX. We don't, however, get any help when we need to refer to CSS entities from our code. How many times did you chase a bug, which turned out to be a misspelled CSS class name? How frustrating is it, when you are writing a component and you know that there is a CSS class for a proper styling, that you just don't remember the class name and have to dig through piles of CSS files to find it? How do you scope your CSS rule names? Are you using BEM notation to create unique but unwieldy names? What about creating multiple CSS rules that are very similar to each other but differ in one property?

There are many attempts to address the above issues. Most of them use CSS pre-processors and are usually part of the build pipeline. The problem with the pre-processors is that they don't provide any help while you are writing your code. If you create a new class in a CSS file and then go to your code where you need to use it, without running the pre-processor, your IDE will not know that a new class has been created and will not prompt you with its name.

Mimcss takes a different approach by dispensing with CSS files altogether. You just don't write CSS files; instead you write TypeScript code, which becomes an integral part of your application or library bundle. You define your class, ID and animation names as members of a class and as soon as you do that, the magic of the TypeScript's powerful typing system makes these names available to your application code as named properties of your class.

## Usability
There is a second motivation aspect for creating Mimcss: making working with CSS style properties a little bit easier. The underlying CSS type for rulesets is CSSStyleDeclaration and it is essentially an object with a lot of properties that all have the `string` type. Thus no matter what the style property meaning is - whether it is a length, a color or a combination of keywords - developers set their values as strings. This is not only inconvenient but also error-prone (these two almost always come together).

Mimcss defines a Styleset type, which has the same properties as CSSStyleDeclaration, but with different types. Mimcss also defines multiple types that allow setting style properties with more convenience and type safety. A simple example would be the `display` property with type defined as a union of possible string values: `"none" | "block" | "flex" | ... | "grid"`. This way you cannot misspell the property value and then spent the next hour trying to find out why the page content is not being laid out properly. But this is just the beginning. Another example would be the properties `transform` and `filter`. For each of these properties, CSS defines several functions - e.g. `translate()` for `transform` and `opacity()` for `filter`. Mimcss defines property types and TypeScript functions to ensure that developers don't accidentally specify a wrong function for a wrong property.

We should notice that there are other projects that provide type information for CSS properties - notably *csstype*. The csstype project defines numerous types for the available style properties; however, there is a fundamental issue with it: it includes the `string` type as part of every property's type definition. As a result, there is nothing that prevents developers of using incorrect property values.

Mimcss takes a different approach: for those properties that have a lot of keyword values (e.g. `color` or `align-items`), string is not part of the type definition. Instead, Mimcss includes a *string proxy* object into every type definition. The string proxy object is a strongly typed object that is converted to a string when the property's value should be set to the DOM. Mimcss also provides numerous functions that allow developers to create complex values in an easy and type safe manner.

## Performance
When working with CSS, a common practice is to create a lot of small CSS stylesheet files and combine them into a single bundle at build time. The bundle is then referenced using the `<link>` element in the HTML file. Even if the bundle is divided into several chunks, the chunks are usually sizeable because they are responsible for significant parts of the application. Moreover, as soon as a chunk is downloaded, it is never removed.

The result is that all the styles ever used by the application are present in the browser's memory. Not only this takes up memory, but it also increases the chances of name collisions and other unexpected effects of style combination and cascading.

With Mimcss, stylesheets are defined as TypeScript classes and are combined into the application code bundle (which can be divided into multiple chunks). The code is downloaded as part of the bundle; however, this doesn't mean that all the styles are immediately added to the DOM. The styles will only be added (Mimcss's term for this is "activated") when the application decides to do it. Moreover, when the styles are not needed anymore, they can be deactivated - that is, removed from the DOM. The suggested practice is that a component defines its own styles, adds them upon mounting and removes them upon unmounting. There are also efficient ways to deal with styles that are shared between several components or maybe all of the application components.

## Anti-Motivation
There is one thing that Mimcss explicitly doesn't try to address: how to organize your styles in an efficient way. Mimcss provides the tools that make organizing easier and less error-prone; however, it doesn't have any say in how you use CSS entities and how you apply them to your HTML. If you want to assign styles based on element IDs instead of classes (probably a bad idea), Mimcss allows you to do that. Mimcss allows you to have CSS classes to "inherit" from other classes; however, it doesn't have any opinion on whether and when you should do it.

In short, Mimcss doesn't aim to change the CSS styling paradigm - it aims only at making it easier and less error-prone to use.

