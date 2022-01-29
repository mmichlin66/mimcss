---
layout: mimcss-guide
unit: 6
title: "Mimcss Guide: Activation strategies"
description: "Styles can be activated and optionally deactivated depending on whether the presence of style rules is necessary throughout the application lifetime or only during certain moments."
rootpath: ".."
---

# Activation strategies

* [Immediate activation](#immediate-activation)
* [Explicit activation](#explicit-activation)
* [Just-in-time activation](#just-in-time-activation)
* [Styled components](#styled-components)
* [DOM writing](#dom-writing)

In the previous sections, we saw that rules are defined using rule definition classes and that the `activate` function is called to insert the CSS rules into the DOM. The `deactivate` function can be called at a later moment to remove the rules from the DOM. The question arises when we should call these functions. There is no single answer that is good for all situations and this unit lists several of these situations and suggest an activation strategy for them.

We should consider the following factors of the activation process:
- Rules inserted into DOM occupy memory, increase style layout calculation time and increase the possibility of style conflicts. The less rules in the DOM, the leaner, faster and less error-prone your application.
- Inserting and removing rules into/from the DOM is a time consuming process - not only because the insertion/removal functions take time but mostly because of layout calculations that the browser must perform to account for the new or removed styles.

These two factors are contradictory: the first factor calls for having only those styles in the DOM that are relevant for the current content, while the second factor calls for inserting all the possible styles into the DOM once and leaving them there for the lifetime of the application.

The general approach is, as usual, a trade off: the styles that are used throughout your application should be inserted once and never removed, while the styles that are only used by a certain component should be inserted only when the component is mounted and removed when the component is unmounted.

## Immediate activation
The first approach is probably the simplest and is as close to the behavior of the CSS files as possible. In this approach, the activation is performed as soon as the style definition class is written:

```tsx
export class CommonStyles extends css.StyleDefinition
{
    vbox = this.$class({ display: "flex", flexDirection: "column" })
}

export let commonStyles = css.activate( CommonStyles);
```

The rules are activated as soon as the code is loaded. This is similar in behavior to loading CSS files using the `<link>` element in HTML - the rules are loaded and activated by the browser at the application start up.

This approach is suitable for the shared styles that are used throughout the application. These can include definitions of custom CSS properties with application-wide defaults and most common layout and styling rules. Although the stylesheet can be deactivated, this is usually not needed.

Note that if the application consists of multiple chunks, the JavaScript module containing the above code may not be included in the first chunk. The code of the module will only run when the appropriate chunk is loaded, which means that the styles will only be available after that chunk is loaded. This allows for a separation of styles between the chunks of the application.

## Explicit activation
In this approach, the `activate` function is called only at certain points in the application - usually when the user navigates to a relevant part of the application. Depending on the application needs styles can be deactivated when navigating to the part of the application that doesn't need them.

Imagine an application that allows users to enter data into forms and also see reports and charts. It is conceivable that styles for input controls would be rather different from the styles needed to format tables and from the styles needed for charts.

This approach is also suitable for applications that employ themes. Switching themes becomes as easy as deactivating one set of rules and activating another.

## Just-in-time activation
In this approach, the style rules are activated only when needed and deactivated as soon as they become not needed. This approach is suitable for large components that present complex UI structure, occupy the entire or a significant part of the page and stay on the screen for a while. This approach is NOT suitable for components that represent widgets.

In the just-in-time approach, the style definition class becomes an essential part of the component. It is activated when the component is mounted and deactivated when the component is unmounted. It is reasonable to put style definitions used by a component into the same module that defines the component.

## Styled components
In all the other methods discussed so far we pass the style definition class to the `activate` function and Mimcss creates a single instance of this class regardless of how many times the `activate` function is called. With styled components, we create an instance of the style definition class by ourselves and pass this instance to the `activate` function. We can create and activate as many instances of the style definition class as we want and for each instance a separate set of CSS rules is created and inserted into the DOM, while Mimcss ensures that the names of classes, IDs and other named CSS entities used by these rules are unique.

Styled components approach is suitable for complex but reusable widgets, which may leverage direct style manipulation to change their layout or visual effects.

Styled components provide reach and flexible functionality and they are discussed in details in the [Styled Components](styled-components.html) unit.

# DOM Wwriting
Activating and deactivating style definitions is a DOM writing activity. Without the proper care writing to the DOM can have adverse effects such as layout thrashing. Mimcss provides several methods of *activation scheduling*. The `activate` and `deactivate` functions have an optional parameter `schedulerType` that can be used to specify what scheduling/activation method to use. Alternatively (and preferably) a default scheduling method can be set using the [setDefaultScheduler](/mimcss/reference/modules/schedulingapi.html#setdefaultscheduler) function.

Mimcss supports several built-in scheduler types and allows the library users to create their own schedulers. For more information see the [Activation Scheduling](activation-scheduling.html) unit.





