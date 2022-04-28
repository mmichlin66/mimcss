---
layout: mimcss-guide
unit: 9
title: "Mimcss Guide: Styled Components"
description: "Styled components define and manipulate styles as though the styles are defined locally per component instance and not globally."
rootpath: ".."
---

# Styled Components

* [Global vs. local styles](#global-vs-local-styles)
* [Style definition instance](#style-definition-instance)
* [Example](#example)
* [Dynamic styles](#dynamic-styles)
* [Referencing external style definitions](#referencing-external-style-definitions)
* [Grouping rules](#grouping-rules)
* [When to use](#when-to-use)

## Global vs. local styles
CSS rules are by definition global. As long as a rule exists as part of a document, it applies to any element that matches the rule's selector - no matter what code created the rule and the element. This is both a blessing and a curse: blessing, because a relatively small number of rules can provide styles for a huge number of elements; and curse, because rules can come into conflict with one another.

There are many attempts to try to minimize the possibility of conflicts between CSS rules and they all revolve around creating unique names for those CSS entities that have names - mostly classes, but also IDs, animations, custom CSS properties and some others. That's the idea behind styled components: each instance of the component comes with rules whose names are auto-generated and thus cannot stomp on each other. This is especially important for components that create their styles based on parameters passed on to them from outside - e.g. React properties. Such styles are called "local" - because only a single instance of the component has access to the names used in these style rules.

So far in this guide we have only seen global styles in Mimcss. A style definition class was instantiated only once - no matter how many times the `activate()` function or `$use()` method was called for it. This unit describes how you can create "local" styles and thus support styled components in Mimcss.

## Style definition instance
A style definition class is a regular TypeScript class and can have multiple instances. When we call the `activate()` function or `$use()` method and pass the class to it, Mimcss first looks whether there is already an instance associated with this class. If no, the instance is created and associated with the class; if yes, the existing instance is used. The names for the classes, IDs and other named entities are generated when the instance is created - that is, when the `activate()` function or `$use()` method is called for the first time for the style definition class. The instance remains associated with the class even after we call the `deactivate()` function and the rules are removed from the DOM.

Let's now look at the definition of the `activate()` function:

```tsx
activate<T extends StyleDefinition>( instOrClass: T | IStyleDefinitionClass<T>, <other parameters omitted for clarity>): T | null
```

We see that the function parameter can be not only a style definition class (that's what we have been using so far) but also an instance of a style definition class. That means we can create an instance of the style definition class by ourselves and pass it on to the `activate()` function. When Mimcss gets a newly created instance of a style definition class it will create completely new CSS rules with new auto-generated names for its named entities. That's the key for creating styled components.

A styled component in Mimcss terminology is a component that creates its own instance of a style definition class. This instance is usually activated when the component is mounted and deactivated when the component is unmounted. Two instances of the same component use the same style definition class; however, they create two different instances of this class and have their style rules completely isolated from each other.

There is a caveat, however: if the style definition class defines a style rule whose selector doesn't include a class or an ID, then, although two separate CSS rules will be created, they will apply to the same elements. That's why styled components should avoid creating such rules - all their rules should involve classes or IDs.

## Example
Let's make a simple styled component that renders a box with a background color that is specified as a property (we are using pseudo-React notation):

```tsx
import * as css from "mimcss"

// Style definition class
class ColorBoxStyles extends css.StyleDefinition
{
    // box size and border are hard-coded
    box = this.$class({ width: 200, height: 200, border: [1, "solid", "black"] })

    // background color is passed
    constructor( bgColor: css.CssColor)
    {
        super();

        // set the background-color property of the style rule
        this.box.setProp( "backgroundColor", bgColor);
    }
}

export interface ColorBoxProps
{
    bgColor: css.CssColor;
}

export class ColorBox extends Component
{
    // declare style definition instance
    private styles: ColorBoxStyles;

    constructor( props: ColorBoxProps)
    {
        super(props);

        // create style definition instance with the color from the props and activate it
        this.styles = css.activate( new ColorBoxStyles( this.props.bgColor));
    }

    componentWillUnmount()
    {
        // deactivate the style definition instance
        css.deactivate(this.styles);
    }

    render()
    {
        // use the class name
        return <div className={this.styles.box.name} />;
    }
}

// Somewhere else...
render()
{
    return <div>
        <ColorBox bgColor="blue" />
        <ColorBox bgColor="white" />
    </div>
}
```

When we use the `ColorBox` component in two different places on our page, two instances of the `ColorBoxStyle` class will be created and two CSS rules will be inserted into the DOM.

Note how we defined the `box` class without the `backgroundColor` property and added it in the constructor using the `setProp` method. We had to do it this way because the code inside the constructor executes only **after** the initializations of the instance properties are done. We could have done it differently though:


```tsx
class ColorBoxStyles extends css.StyleDefinition
{
    // box size and border are hard-coded
    box = this.$class({
        width: 200,
        height: 200,
        border: [1, "solid", "black"],
        backgroundColor: this.bgColor
    })

    // background color is passed
    constructor( private bgColor: css.CssColor)
    {
        super();
    }
}
```

We added the keyword `private` to the constructor's parameter, which does two things for us:

1. An instance property `bgColor` with private access is created.
2. The `bgColor` property is assigned a value passed in the constructor **before** initializations of the instance properties.

Now we can use `this.bgColor` in our rule definition.

## Dynamic styles
In the previous section's example, we used the property passed to our component in the constructor to initialize the instance-specific styles. We didn't have any code, however, that would handle changes in that property value. Indeed, the code that uses our component can pass a different value for the `bgColor` property at any time and our component should react by rendering the box in the appropriated color.

Since our component doesn't use the `bgColor` property directly in the rendering code, we have to change the value of the `background-color` property in our style rule. This can be accomplished with the help of the same `setProp` method we already used in our example. When the `setProp` method is called on the rule that has already been inserted into the DOM, it will change the CSS rule object itself and the browser will react by recalculating and applying the styles.

```tsx
export class ColorBox extends Component
{
    shouldComponentUpdate( nextProps: ColorBoxProps): boolean
    {
        this.box.setProp( "backgroundColor", nextProps.bgColor);
        return false;
    }
}
```

We don't actually need to perform any rendering because we are not changing any HTML structure - that's why we return `false`. For complex components, this can be an efficient way to handle style changes - changing the styles directly instead of re-rendering with different style rules. Using the styles this way makes then "dynamic" - the feature that all browsers support but which is rarely used in the standard CSS approach where the style rules are seen as static.

There is a caveat in the above code though: setting a style property isn't different from other DOM-writing operations and without the proper care it can have adverse effects such as layout thrashing. Mimcss provides several methods of *activation scheduling* that work for both style activation and style property setting. The `setProp` method has an optional parameter `schedulerType` that can be used to specify what scheduling/activation method to use. Alternatively (and preferably) a default scheduling method can be set using the [setDefaultScheduler](../typedoc.html?path=modules/SchedulingAPI.html#setDefaultScheduler) function.

Mimcss supports several built-in scheduler types and allows the library users to create their own schedulers. For more information see the [Activation Scheduling](activation-scheduling.html) unit.

## Referencing external style definitions
We have seen in this guide how we can reference rules defined in a different style definition class using the `$use` method:

```tsx
class CommonStyles extends css.StyleDefinition
{
    red = this.$class({ color: "red" })
}

class MyStyles extends css.StyleDefinition
{
    common = this.$use( CommonStyles)

    superRed = this.$class({ "+": this.common.red, fontWeight: "bold" })
}
```

This syntax is also possible if `MyStyles` is used by a styled component. When a styled component creates an instance of the `MyStyles` class, the `$use` method will be called for the `CommonStyles` class and the rule `red` will be inserted into the DOM. If a second instance of the same styled component creates a second instance of the `MyStyles` class, the `$use` method will be called again for the `CommonStyles` class - but this time Mimcss will find an existing instance of the `CommonStyles` class and will NOT insert the new rules into the DOM.

This is quite logical if you want to re-use some common rules that are the same for every instance of the styled component. But what if you have two different style definition classes and you want both of them to create separate instances for separate instances of the styled component? The solution is easy - just create an instance of the second style definition class by yourself and directly assign it to the property:

```tsx
class Style1 extends css.StyleDefinition
{
    red = this.$class({ color: "red" })
}

class Style2 extends css.StyleDefinition
{
    style1 = new Style1()

    superRed = this.$class({ "+": this.style1.red, fontWeight: "bold" })
}
```

Whenever a new instance of the `Style2` class is created, the new instance of the `Style1` class will be created along with it.

## Grouping rules
Grouping rules like @media and @supports are another place where we use style definition classes. If we want to use grouping rules with styled components, we again need to use instances instead of classes. Here is an example using the @media rule:

```tsx
class ColorBoxStyles extends css.StyleDefinition
{
    // box size and border are hard-coded
    box = this.$class({
        width: 200,
        height: 200,
        border: [1, "solid", "black"],
        backgroundColor: this.bgColor
    })

    ifSmallDevice = this.$media( { maxWidth: 600 },
        new class extends css.StyleDefinition<ColorBoxStyles>
        {
            box = this.$class({
                "+": this.$parent.box,
                width: 100,
                height: 100,
            })
    }(this)

    // background color is passed
    constructor( private bgColor: css.CssColor)
    {
        super();
    }
}
```

We still use anonymous class; however, we directly create an instance of it. Note that we pass `this` to its constructor. In this context, `this` is the reference to the instance of the `ColorBoxStyles` class. The value passed to the constructor of the grouping definition class becomes the value of the `$parent` property whose type is defined by the generic parameter. This allows us to refer to properties of the top-level class like `this.$parent.box`.

## When to use
Styled components is a powerful tool in the developers' arsenal; however, as any tool, it is suitable more to some tasks than to others. The main differentiator of the style components functionality is twofold:

1. The ability to define styles based on externally provided parameters such as component properties, and
1. The ability to change visual representation of HTML content by changing styles instead of changing HTML structure.

This is most useful for complex components like trees, grids, charts, accordions and the like where changing styles directly is more efficient than re-rendering with a different set of styles. Note that although re-rendering can be expensive, the browser will have to work hard upon direct style changes too. It will have to recalculate styles and, in many cases, to recalculate layout - the latter is usually a really expensive task.

Performance is not the only reason to use styled components. They provide very flexible way to control their visual aspects through styles. If you are developing an application it is rather common to have a dozen or so different buttons, which can be easily controlled via a dozen or so CSS classes. If you are developing a library of complex components, however, the number of possible permutations of colors, fonts and other visual aspects cannot be expressed in a reasonable number of classes. In this case, the ability of styled components to define styles on the fly makes it the tool of choice.


