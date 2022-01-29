import { CssImage, IRawProxy } from "./CoreTypes";
import { ICounterStyleRule } from "./RuleTypes";
import { ListStyleType_StyleType } from "./StyleTypes";
/**
 * Type that extends the given type with the [[IRawProxy]] interface that allows specifying a raw
 * string value.
 */
export declare type CounterExtended<T> = T | IRawProxy;
/**
 * Type that allows specifying either the given type or an array with elements of the extended
 * variant of this type.
 */
export declare type CounterOneOrMany<T> = T | CounterExtended<T>[];
/**
 * Type for specifying counter [[system]] property.
 */
export declare type System_CounterType = "cyclic" | "numeric" | "alphabetic" | "symbolic" | "additive" | "fixed" | number | [ListStyleType_StyleType | IRawProxy];
/**
 * Type for specifying counter[[negative]] property.
 */
export declare type Negative_CounterType = string | [CounterExtended<string>, CounterExtended<string>?];
/**
 * Type for specifying counter [[prefix]] and [[suffix]] properties.
 */
export declare type PrefixSuffix_CounterType = string | CssImage;
/**
 * Type for specifying counter [[range]] property.
 */
export declare type Range_CounterType = "auto" | CounterOneOrMany<["infinite" | number, "infinite" | number]>;
/**
 * Type for specifying counter [[pad]] property.
 */
export declare type Pad_CounterType = [number, string];
/**
 * Type for specifying counter [[fallback]] property.
 */
export declare type Fallback_CounterType = ListStyleType_StyleType;
/**
 * Type for specifying counter [[symbols]] property.
 */
export declare type Symbols_CounterType = CounterOneOrMany<string>;
/**
 * Type for specifying counter [[additiveSymbols]] property.
 */
export declare type AdditiveSymbols_CounterType = CounterOneOrMany<[string | CssImage, number] | [number, string | CssImage]>;
/**
 * Type for specifying counter [[speakAs]] property.
 */
export declare type SpeakAs_CounterType = "auto" | "bullets" | "numbers" | "words" | "spell-out" | ICounterStyleRule;
/**
 * Interface representing the properties of the `@counter-style` CSS rule.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style
 */
export interface ICounterStyleset {
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
 * [[CounterExtended]] generic type, which adds [[IRawProxy]] to the type that is defined in the
 * IBaseCounterStyleset interface.
 */
export declare type ExtendedCounterStyleset = {
    [K in keyof ICounterStyleset]: CounterExtended<ICounterStyleset[K]>;
};
//# sourceMappingURL=CounterTypes.d.ts.map