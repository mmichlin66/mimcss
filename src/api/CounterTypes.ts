import {IStringProxy, OneOrMany, OneOrPair} from "./CoreTypes";
import {ICounterStyleRule} from "./RuleTypes";
import {CssImage} from "./ShapeTypes";
import {ListStyleType_StyleType} from "./StyleTypes";



/**
 * Type that extends the given type with the IStringProxy interface that allows specifying raw string value.
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
export type Fallback_CounterType = ListStyleType_StyleType | IStringProxy;



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
export type SpeakAs_CounterType = "auto" | "bullets" | "numbers" | "words" | "spell-out" | ICounterStyleRule | IStringProxy;



/**
 * Interface representing the properties of the @font-face CSS rule.
 */
export interface IBaseCounterStyleset
{
    system?: System_CounterType;
    negative?: Negative_CounterType;
    prefix?: PrefixSuffix_CounterType;
    suffix?: PrefixSuffix_CounterType;
    range?: Range_CounterType;
    pad?: Pad_CounterType;
    fallback?: Fallback_CounterType;
    symbols?: Symbols_CounterType;
    additiveSymbols?: AdditiveSymbols_CounterType;
    speakAs?: SpeakAs_CounterType;
}



/**
 * The ExtendedCounterStyleset type maps all @font-face properties defined in the [[IBaseCounterStyleset]]
 * interface to the "extended" versions of their types. These extended types are defined using the
 * [[CounterExtended]] generic type, which adds [[IStringProxy]] to the type that is defined in the
 * IBaseCounterStyleset interface.
 */
export type ExtendedCounterStyleset = { [K in keyof IBaseCounterStyleset]: CounterExtended<IBaseCounterStyleset[K]> }



