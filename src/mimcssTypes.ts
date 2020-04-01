// Type definitions for mimcss

export * from "./styles/UtilTypes";
export * from "./styles/ColorTypes";
export * from "./styles/StyleTypes";
export * from "./styles/MediaTypes";
export * from "./styles/FontFaceTypes";
export * from "./styles/SelectorTypes";
export * from "./styles/tsh";
export * from "./rules/RuleTypes";

export {
	$abstract, $tag, $class, $id, $style, $animation, $custom, $supports, $media,
	$import, $fontface
} from "./rules/RuleFuncs";
export {Num, Len, Angle, Time, Resolution, Frequency, Percent} from "./styles/UtilFuncs";
export {sh} from "./styles/SelectorFuncs";
export {useOptimizedStyleNames, $use, $activate, $deactivate} from "./rules/Stylesheet";
