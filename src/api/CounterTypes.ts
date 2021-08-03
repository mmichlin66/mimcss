﻿import {IStringProxy, OneOrMany, OneOrPair} from "./CoreTypes";
import {ICounterStyleRule} from "./RuleTypes";
import {CssImage} from "./ShapeTypes";
import {ListStyleType_StyleType} from "./StyleTypes";



/**
 * Type that extends the given type with the [[IStringProxy]] interface that allows specifying raw string value.
 */
export type CounterExtended<T> = T | IStringProxy;



/**
 * Type for specfying counter [[system]] property.
 */
export type System_CounterType = "cyclic" | "numeric" | "alphabetic" | "symbolic" | "additive" | "fixed" |
    number | [ListStyleType_StyleType | IStringProxy];



/**
 * Type for specfying counter[[negative]] property.
 */
export type Negative_CounterType = OneOrPair<CounterExtended<string>>;



/**
 * Type for specfying counter [[prefix]] and [[suffix]] properties.
 */
export type PrefixSuffix_CounterType = string | CssImage;



/**
 * Type for specfying counter [[range]] property.
 */
export type Range_CounterType = "auto" | OneOrMany<CounterExtended<["infinite" | number, "infinite" | number]>>;



/**
 * Type for specfying counter [[pad]] property.
 */
export type Pad_CounterType = [number, string];



/**
 * Type for specfying counter [[fallback]] property.
 */
export type Fallback_CounterType = ListStyleType_StyleType;



/**
 * Type for specfying counter [[symbols]] property.
 */
export type Symbols_CounterType = OneOrMany<CounterExtended<string>>;



/**
 * Type for specfying counter [[additiveSymbols]] property.
 */
export type AdditiveSymbols_CounterType = OneOrMany<CounterExtended<[string | CssImage, number] | [number, string | CssImage]>>;



/**
 * Type for specfying counter [[speakAs]] property.
 */
export type SpeakAs_CounterType = "auto" | "bullets" | "numbers" | "words" | "spell-out" | ICounterStyleRule;



/**
 * Interface representing the properties of the `@counter-style` CSS rule.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style
 */
export interface ICounterStyleset
{
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/system
     */
    system?: System_CounterType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/negative
     */
    negative?: Negative_CounterType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/prefix
     */
    prefix?: PrefixSuffix_CounterType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/suffix
     */
    suffix?: PrefixSuffix_CounterType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/range
     */
    range?: Range_CounterType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/pad
     */
    pad?: Pad_CounterType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/fallback
     */
    fallback?: Fallback_CounterType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/symbols
     */
    symbols?: Symbols_CounterType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/additive-symbols
     */
    additiveSymbols?: AdditiveSymbols_CounterType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/speak-as
     */
    speakAs?: SpeakAs_CounterType;
}



/**
 * The ExtendedCounterStyleset type maps all `@counter-style` properties defined in the [[ICounterStyleset]]
 * interface to the "extended" versions of their types. These extended types are defined using the
 * [[CounterExtended]] generic type, which adds [[IStringProxy]] to the type that is defined in the
 * IBaseCounterStyleset interface.
 */
export type ExtendedCounterStyleset = { [K in keyof ICounterStyleset]: CounterExtended<ICounterStyleset[K]> }



