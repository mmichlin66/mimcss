import {CssImage, IRawProxy, RawExtended, RawOneOrMany} from "./CoreTypes";
import {ICounterStyleRule} from "./RuleTypes";
import {ListStyleType_StyleType} from "./StyleTypes";



/**
 * Type for specifying counter {@link system} property.
 */
export type System_CounterType = "cyclic" | "numeric" | "alphabetic" | "symbolic" | "additive" | "fixed" |
    number | [ListStyleType_StyleType | IRawProxy];



/**
 * Type for specifying counter {@link negative} property.
 */
export type Negative_CounterType = string | [RawExtended<string>,  RawExtended<string>?];



/**
 * Type for specifying counter {@link prefix} and {@link suffix} properties.
 */
export type PrefixSuffix_CounterType = string | CssImage;



/**
 * Type for specifying counter {@link range} property.
 */
export type Range_CounterType = "auto" | RawOneOrMany<["infinite" | number, "infinite" | number]>;



/**
 * Type for specifying counter {@link pad} property.
 */
export type Pad_CounterType = [number, string];



/**
 * Type for specifying counter {@link ICounterStyleset.fallback} property.
 */
export type Fallback_CounterType = ListStyleType_StyleType;



/**
 * Type for specifying counter {@link symbols} property.
 */
export type Symbols_CounterType = RawOneOrMany<string>;



/**
 * Type for specifying counter {@link additiveSymbols} property.
 */
export type AdditiveSymbols_CounterType = RawOneOrMany<[string | CssImage, number] | [number, string | CssImage]>;



/**
 * Type for specifying counter {@link speakAs} property.
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
 * The ExtendedCounterStyleset type maps all `@counter-style` properties defined in the {@link ICounterStyleset}
 * interface to the "extended" versions of their types. These extended types are defined using the
 * {@link RawExtended} generic type, which adds {@link IRawProxy} to the type that is defined in the
 * ICounterStyleset interface.
 */
export type ExtendedCounterStyleset = { [K in keyof ICounterStyleset]: RawExtended<ICounterStyleset[K]> }



