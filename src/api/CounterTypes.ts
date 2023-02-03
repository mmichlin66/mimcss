import {CssImage, IRawProxy, RawExtended, RawOneOrMany} from "./CoreTypes";
import {ICounterStyleRule} from "./RuleTypes";
import {ListStyleType_StyleType} from "./StyleTypes";



/**
 * Type for specifying counter {@link ICounterStyleset.system} property.
 */
export type System_CounterType = "cyclic" | "numeric" | "alphabetic" | "symbolic" | "additive" | "fixed" |
    number | [ListStyleType_StyleType | IRawProxy];



/**
 * Type for specifying counter {@link ICounterStyleset.negative} property.
 */
export type Negative_CounterType = string | [RawExtended<string>,  RawExtended<string>?];



/**
 * Type for specifying counter {@link ICounterStyleset.prefix} and {@link ICounterStyleset.suffix} properties.
 */
export type PrefixSuffix_CounterType = string | CssImage;



/**
 * Type for specifying counter {@link ICounterStyleset.range} property.
 */
export type Range_CounterType = "auto" | RawOneOrMany<["infinite" | number, "infinite" | number]>;



/**
 * Type for specifying counter {@link ICounterStyleset.pad} property.
 */
export type Pad_CounterType = [number, string];



/**
 * Type for specifying counter {@link ICounterStyleset.fallback} property.
 */
export type Fallback_CounterType = ListStyleType_StyleType;



/**
 * Type for specifying counter {@link ICounterStyleset.symbols} property.
 */
export type Symbols_CounterType = RawOneOrMany<string>;



/**
 * Type for specifying counter {@link ICounterStyleset.additiveSymbols} property.
 */
export type AdditiveSymbols_CounterType = RawOneOrMany<[string | CssImage, number] | [number, string | CssImage]>;



/**
 * Type for specifying counter {@link ICounterStyleset.speakAs} property.
 */
export type SpeakAs_CounterType = "auto" | "bullets" | "numbers" | "words" | "spell-out" | ICounterStyleRule;



/**
 * Interface representing the properties of the `@counter-style` CSS rule.
 *
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style" target="mdn">MDN Page</a>
 */
export interface ICounterStyleset
{
    /**
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/system" target="mdn">MDN Page</a>
     */
    system?: System_CounterType;

    /**
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/negative" target="mdn">MDN Page</a>
     */
    negative?: Negative_CounterType;

    /**
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/prefix" target="mdn">MDN Page</a>
     */
    prefix?: PrefixSuffix_CounterType;

    /**
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/suffix" target="mdn">MDN Page</a>
     */
    suffix?: PrefixSuffix_CounterType;

    /**
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/range" target="mdn">MDN Page</a>
     */
    range?: Range_CounterType;

    /**
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/pad" target="mdn">MDN Page</a>
     */
    pad?: Pad_CounterType;

    /**
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/fallback" target="mdn">MDN Page</a>
     */
    fallback?: Fallback_CounterType;

    /**
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/symbols" target="mdn">MDN Page</a>
     */
    symbols?: Symbols_CounterType;

    /**
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/additive-symbols" target="mdn">MDN Page</a>
     */
    additiveSymbols?: AdditiveSymbols_CounterType;

    /**
     * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/speak-as" target="mdn">MDN Page</a>
     */
    speakAs?: SpeakAs_CounterType;
}



/**
 * The ExtendedCounterStyleset type maps all `@counter-style` properties defined in the {@link ICounterStyleset}
 * interface to the "extended" versions of their types. These extended types are defined using the
 * {@link CoreTypes!RawExtended} generic type, which adds {@link CoreTypes!IRawProxy} to the type that is defined in the
 * ICounterStyleset interface.
 */
export type ExtendedCounterStyleset = { [K in keyof ICounterStyleset]: RawExtended<ICounterStyleset[K]> }



