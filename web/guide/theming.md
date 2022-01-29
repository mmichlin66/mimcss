---
layout: mimcss-guide
unit: 8
title: "Mimcss Guide: Theming"
description: "Style definition classes can use inheritance to allow changing visual aspects of the application without changing its HTML code."
rootpath: ".."
---

# Theming

* [Style definition inheritance](#style-definition-inheritance)
* [Theme declaration and implementation](#theme-declaration-and-implementation)
* [Referencing themes](#referencing-themes)
* [Multiple themes on one page](#multiple-themes-on-one-page)

Style definition classes are regular TypeScript classes and thus support inheritance. Mimcss uses the inheritance mechanism to implement theming, which allows changing entire style theme with very little code.

## Style definition inheritance
Let's look at a simple example and see what Mimcss does in the presence of inheritance of style definition classes:

```tsx
class Base extends css.StyleDefinition
{
    textInput = this.$class({ padding: 4 })
}

class Derived extends Base
{
    button = this.$class({ padding: 8 })
}

let derived = css.activate(Base);
```

Nothing surprising will happen when we activate the `Derived` class: the `derived` variable will provide access to both the `textInput` and the `button` CSS classes. For each of these properties Mimcss will generate a unique CSS class name. If you use the **Scoped** mode for name generation, the names of the classes will be `Base_textInput` and `Derived_button`.

Interesting things start happening when the derived class overrides a property from the base class:

```tsx
class Base extends css.StyleDefinition
{
    textInput = this.$class({ padding: 4 })
}

class Derived extends Base
{
    textInput = this.$class({ padding: 8 })
}

let derived = css.activate(Derived);
```

There will be a single name generated for the `derived.textInput.name` variable. The name will be `Base_textInput`; however, the style will be `{ padding: 8 }`. That is, the name is generated using the name of the base class, while the style is taken from the derived class.

Let's now have another style definition class that derives from the same `Base` class:

```tsx
class AnotherDerived extends Base
{
    textInput = this.$class({ padding: 16 })
}

let anotherDerived = css.activate(AnotherDerived);
```

As expected, the `anotherDerived.textInput.name` will have the name `Base_textInput` and the style `{ padding: 16 }`. Thus no matter how many different derived classes we may have, they will all use the same name for the inherited properties but different styles assigned to them. This is actually in full conformance with object-oriented programming paradigm and this allows us to implement theming via style virtualization.

## Theme declaration and implementation
The main idea of theming in Mimcss is to have a *theme declaration* class that declares several CSS rules, and to have multiple *theme implementation* classes that are derived from the declaration while overriding these rules by providing actual styles values. When we need CSS class names, as well as other named CSS entities in our code, we can use the properties from the theme declaration class. Then we can activate either this or that implementation class and, voilà, we can completely change the styling of our application with very little code.

Let’s consider a very simple example that nicely demonstrates the overall approach to theming in Mimcss: a theme that defines shape and style of an element’s border.

First, we need to create the theme declaration class. Theme declarations are classes that derive from the `ThemeDefinition` class, which itself derives from the `StyleDefinition` class

```tsx
class BorderTheme extends css.ThemeDefinition
{
    borderShape = this.$class()
}
```

The `BorderTheme` class defines a single CSS class, `borderShape`. Note that we haven’t specified any styles for it. We are using this class only to define the `borderShape` property type, and let Mimcss create a unique name for it. In a sense, it is a lot like a method declaration in an interface - it declares its signature, which should be implemented by the derived classes.

Now let’s define two actual themes using `SquareBorderTheme` and `RoundBorderTheme` classes that derive from the `BorderTheme` class and override the `borderShape` property by specifying different style parameters.

```tsx
class SquareBorderTheme extends BorderTheme
{
    borderShape = this.$class({
        border: ["thin", "solid", "green"],
        borderInlineStartWidth: "thick"
    })
}

class RoundBorderTheme extends BorderTheme
{
    borderShape = this.$class({
        border: ["medium", "solid", "blue"],
        borderRadius: 8 // Mimcss will convert 8 to 8px
    })
}
```

TypeScript ensures that the derived classes can only override a property using the same type that was declared in the base class which, in our case, is an internal Mimcss type used for defining CSS classes. That means that developers cannot use the `borderShape` property to mistakenly declare a different CSS rule because it leads to a compilation error.

We can now activate one of the themes as the default theme:

```tsx
let theme: BorderTheme = css.activate(SquareBorderTheme);
```

When Mimcss first activates a style definition class, it generates unique names for all of CSS entities defined in the class. As we have seen before, the name generated for the `borderShape` property is generated once and will be reused when other classes deriving from the `BorderTheme` class are activated.

The `activate()` function returns an instance of the activated class, which we store in the theme variable of type `BorderTheme`. Having this variable tells the TypeScript compiler that it has access to all the properties from the `BorderTheme`. This allows us to write the following rendering code for a fictional component:

```tsx
render()
{
    return <div>
        <input type="text" className={theme.borderShape.name} />
    </div>
}
```

All that is left to write is the code that allows the user to choose one of the two themes and activate it.

```tsx
onToggleTheme()
{
    if (theme instanceof SquareBorderTheme)
        theme = css.activate(RoundBorderTheme);
    else
        theme = css.activate(SquareBorderTheme);
}
```

Note that we didn’t have to deactivate the old theme. One of the features of the ThemeDefinition class (as opposed to the `StyleDefintion` class) is that for every theme declaration class, it allows only a single theme to be active at the same time. That is, in our case, either `RoundBorderTheme` or `SquareBorderTheme` can be active, but never both. Of course, for multiple theme hierarchies, multiple themes can be simultaneously active. That is, if we have another hierarchy with the `ColorTheme` declaration class and the derived `DarkTheme` and `LightTheme` classes, a single `ColorTheme`-derived class can be co-active with a single `BorderTheme`-derived class. However, `DarkTheme` and `LightTheme` cannot be active at the same time.

## Referencing themes
In the example we just looked at, we used a theme object directly, but themes frequently define tokens like colors, sizes, and fonts that can be referenced by other style definitions. This is especially useful for separating the code that defines themes from the code that defines styles for a component that only wants to use the elements defined by the currently active theme.

CSS custom properties are perfect for declaring tokens from which styles can be built. So, let’s define two custom properties in our themes: one for the foreground color, and one for the background color. We can also create a simple component and define a separate style definition class for it. Here is how we define the theme declaration class:

```tsx
class ColorTheme extends css.ThemeDefinition
{
  bgColor = this.$var( "color")
  frColor = this.$var( "color")
}
```

The `$var()` method defines a CSS custom property. The first parameter specifies the name of the CSS style property, which determines acceptable property values. Note that we don’t specify the actual values here; in the declaration class, we only want Mimcss to create unique names for the custom CSS properties (e.g. `--n13`) while the values are specified in the theme implementation classes, which we do next.

```tsx
class LightTheme extends ColorTheme
{
  bgColor = this.$var( "color", "white")
  frColor = this.$var( "color", "black")
}

class DarkTheme extendsBorderTheme
{
  bgColor = this.$var( "color", "black")
  frColor = this.$var( "color", "white")
}
```

Thanks to the Mimcss (and of course TypeScript’s) typing system, developers cannot mistakenly reuse, say, the `bgColor` property with a different type; nor they can specify values that are not acceptable for a color type. Doing so would immediately produce a compilation error, which may save developers quite a few cycles (one of the declared goals of Mimcss).

Let’s define styles for our component by referencing the theme’s custom CSS properties:

```tsx
class MyStyles extends css.StyleDefinition
{
  theme = this.$use(ColorTheme)

  container = this.$class({
    color: this.theme.fgColor,
    backgroundColor: this.theme.bgColor,
  })
}
```

The `MyStyles` class references the `ColorTheme` class by calling the Mimcss `$use()` method. This returns an instance of the `ColorTheme` class through which all its properties can be accessed and used to assign values to CSS properties.

We don’t need to write the `var()` function invocation because it’s already done by Mimcss when the `$var()`-created property is referenced. In effect, the CSS class for the `container` property creates the following CSS rule (with uniquely generated names, of course):

```css
.container {
  color: var(--fgColor);
  backgroundColor: var(--bgColor);
}
```

Now we can define our component (in pseudo-React style):

```tsx
class MyComponent extends Component
{
  private styles = css.activate(MyStyles);

  componentWillUnmount()
  {
    css.deactivate(this.styles);
  }

  render()
  {
    return <div className={this.styles.container.name}>
      This area will change colors depending on a selected theme.
    </div>
  }
}
```

Note one important thing in the above code: our component is completely decoupled from the classes that implement actual themes. The only class our component needs to know about is the theme declaration class `ColorTheme`. This opens a door to easily “externalize” creation of themes—they can be created by third-party vendors and delivered as regular JavaScript packages. As long as they derive from the `ColorTheme` class, they can be activated and our component reflects their values.

Imagine creating a theme declaration class for, say, Material Design styles along with multiple theme classes that derive from this class. The only caveat is that since we are using an existing system, the actual names of the CSS properties cannot be generated by Mimcss—they must be the exact names that the Material Design system uses (e.g. `--mdc-theme--primary`). Thankfully, for all named CSS entities, Mimcss provides a way to override its internal name generation mechanism and use an explicitly provided name. Here is how it can be done with Material Design CSS properties:

```tsx
class MaterialDesignThemeBase extends css.ThemeDefinition
{
  primary = this.$var( "color", undefined, "mdc-theme--primary")
  onPrimary = this.$var( "color", undefined, "mdc-theme--on-primary")
  // ...
}
```

The third parameter in the `$var()` call is the name, which is given to the CSS custom property. The second parameter is set to `undefined` meaning we aren’t providing any value for the property since this is a theme declaration, and not a concrete theme implementation.

The implementation classes do not need to worry about specifying the correct names because all name assignments are based on the theme declaration class:

```tsx
class MyMaterialDesignTheme extends MaterialDesignThemeBase
{
  primary = this.$var( "color", "lightslategray")
  onPrimary = this.$var( "color", "navy")
  // ...
}
```

## Multiple themes on one page
As mentioned earlier, only a single theme implementation can be active from among the themes derived from the same theme declaration class. The reason is that different theme implementations define different values for the CSS rules with the same names. Thus, if multiple theme implementations were allowed to be active at the same time, we would have multiple definitions of identically-named CSS rules. This is, of course, a recipe for disaster.

Normally, having a single theme active at a time is not a problem at all—it is likely what we want in most cases. Themes usually define the overall look and feel of the entire page and there is no need to have different page sections to use different themes. What if, however, we are in that rare situation where we do need to apply different themes to different parts of our page? For example, what if before a user chooses a light or dark theme, we want to allow them to compare the two modes side-by-side?

The solution is based on the fact that custom CSS properties can be redefined under CSS rules. Since theme definition classes usually contain a lot of custom CSS properties, Mimcss provides an easy way to use their values from different themes under different CSS rules.

Let’s consider an example where we need to display two elements using two different themes on the same page. The idea is to create a style definition class for our component so that we could write the following rendering code:

```tsx
public render()
{
  return <div>
    <div className={this.styles.top.name}>
      This should be black text on white background
    </div>
    <div className={this.styles.bottom.name}>
      This should be white text on black background
    </div>
  </div>
}
```

We need to define the CSS top and bottom classes so that we redefine the custom properties under each of them taking values from different themes. We essentially want to have the following CSS:

```css
.block {
  backgroundColor: var(--bgColor);
  color: var(--fgColor);
}

.block.top {
  --bgColor: while;
  --fgColor: black;
}

.block.bottom {
  --bgColor: black;
  --fgColor: white;
}
```

> We use the block class for optimization purposes and to showcase how Mimcss handles inheriting CSS styles, but it is optional.

Here is how this is done in Mimcss:

```tsx
class MyStyles extends css.StyleDefinition
{
  theme = this.$use(ColorTheme)

  block = this.$class({
    backgroundColor: this.theme.bgColor,
    color: this.theme.fgColor
  })

  top = this.$class({
    "++": this.block,
    "--": [LightTheme],
  })

  bottom = this.$class({
    "++": this.block,
    "--": [DarkTheme],
  })
}
```

Just as we did previously, we reference our `ColorTheme` declaration class. Then we define a helper `block` CSS class, which sets the foreground and background colors using the custom CSS properties from the theme. Then we define the top and bottom classes and use the `"++"` property to indicate that they inherit from the block class. Mimcss supports several methods of style inheritance; the `"++"` property simply appends the name of the referenced class to our class name. That is, the value returned by the styles.top.name is `"top block"` where we’re combining the two CSS classes (the actual names are randomly generated, so it would be something like `"n153 n459"`).

Then we use the `"--"` property to set values of the custom CSS variables. Mimcss supports several methods of redefining custom CSS properties in a ruleset; in our case, we just reference a corresponding theme definition class. This causes Mimcss to redefine all custom CSS properties found in the theme class with their corresponding values.

