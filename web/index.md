---
layout: mimcss-guide
title: Mimcss Home
rootpath: "."
---

**Mimcss** is a CSS-in-JS library that allows authoring CSS styles without writing CSS files. Instead, the styles are created via TypeScript programming. You code your styling rules including CSS classes, animations, media etc. by creating TypeScript classes. At runtime, the rules are inserted into `<style>` elements in the `<head>` of your HTML document. As a result, your application or library bundle is self contained and doesn't require a separate CSS bundle.

## Motivation
The goal of the Mimcss library is to support all CSS features in a type-safe and easy-to-use manner. There are several distinct areas that Mimcss addresses:

- Making names of CSS entities (classes, element IDs, animations, custom properties, counters, grid lines and areas) full TypeScript citizens so that when they are referred to from the JSX code, misspelled or undefined names cause compile time errors instead of being detected only at run time.
- Using the expressive power of TypeScript's typing system for setting values of style properties. While in the regular CSS as well as in several CSS-in-JS libraries, style property values can only be set as strings (and sometimes numbers), Mimcss defines a separate type for each style property making the process of setting property values more convenient and less error-prone.
- Avoiding the regular monolithic structure of CSS styles that are present in the browser's memory for the entirety of the application life-time. As with regular JavaScript objects, CSS styles created with Mimcss can be loaded on demand and stay in memory only while needed. Mimcss provides several style loading and unloading technics that developers can use depending on whether the styles are used throughout the application or only needed by certain components.
- Seeing CSS not as a static structure, but as data that can be changed programmatically in order to manipulate application visual styles and layouts. Depending on the content, it is sometimes more efficient to change the CSS style of a certain class than to assign a different class to a set of HTML elements. Mimcss also provides several scheduling mechanisms that allow coordination between DOM writing activities (including direct style changes) in order to avoid excessive style recalculations and layout thrashing.

### Features
- Compatible with and independent of any library: use with React, Angular, Vue etc.
- Co-exists with regular CSS files - doesn't require re-writing of all existing styles at once or at all. You can gradually introduce Mimcss into you project.
- Stylesheets are defined as TypeScript classes.
- Stylesheets are dynamically activated (inserted into DOM) and can be deactivated (removed from DOM) if desired.
- Styled components are supported where each component instance gets its individual set of CSS rules isolated from other instances.
- Names of CSS classes, IDs, animations, custom CSS properties, counters and grid lines and areas are auto-generated, while developers use properties that return these names. Auto-generation mechanism can be overridden if there is a need to use pre-defined names.
- Support for theming via style definition class inheritance.
- Support for server-side rendering.
- All CSS rule types are supported including style rules and at-rules.
- Automatic support for vendor prefixes.
- Custom CSS properties are supported in a type safe manner.
- Style rules can be nested and can extend other style rules.
- All pseudo styles and pseudo elements are supported using convenient and compact notation.
- Type safety and autocompletion support for CSS property values to eliminate errors.
- Using numbers for default units of length, angle, percent and other CSS property types.
- Using Booleans, numbers, tuples, arrays, objects and functions (in addition to strings) when specifying CSS property values to increase convenience and eliminate errors.
- Convenience functions for specifying complex property values for colors, images, filters, transforms, shapes, calc(), etc. in type-safe manner.
- Type-safe support for CSS filter, transform, shape, gradient, counter and other properties.
- Access to CSSRule-derived objects for direct rule and property manipulation.
- Several built-in mechanisms for scheduling DOM writing activities as well as the ability to write custom scheduling mechanisms.

### Explore Mimcss
- Learn how to use Mimcss by reading the [Documentation](guide/introduction.html)
- Explore the detailed Mimcss [Reference](typedoc.html)
- Lookup Mimcss syntax and usage examples for [Style properties](typedoc.html?path=interfaces/Stylesets.IStyleset.html)
- See Mimcss live examples and try your own code in the [Playground](demo/playground.html)

### Articles

- CSS-Tricks: [Defining and Applying UI Themes Using the Mimcss CSS-in-JS Library](https://css-tricks.com/defining-and-applying-ui-themes-using-the-mimcss-css-in-js-library/)

### Contact
**Mimcss** was created by Michael Michlin. You can contact me directly at <a href="mailto:mmulya@outlook.com" rel="nofollow">mmulya@outlook.com</a>.
