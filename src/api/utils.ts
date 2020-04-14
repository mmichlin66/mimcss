import * as UtilTypes from "../styles/UtilTypes"
import * as UtilFuncs from "../styles/UtilFuncs"



/**
 * The Num object contains static methods that implement CSS mathematic functions on the <number>
 * CSS type. When arguments for these functions are of the number JavaScript type they are
 * converted to strings without appending any units to them.
 */
export let Num: UtilTypes.INumberMath = new UtilFuncs.NumMath();



/**
 * The Len object contains static methods that implement CSS mathematic functions on the <length>
 * CSS type by appending a length unit suffix.
 * Integer numbers use "px"; floating point numbers use "em".
 */
export let Len: UtilTypes.INumberMath = new UtilFuncs.LengthMath();



/**
 * The Angle object contains static methods that implement CSS mathematic functions on the <angle>
 * CSS type by appending an angle unit suffix.
 * Integer numbers use "deg"; floating point numbers use "rad".
 */
export let Angle: UtilTypes.INumberMath = new UtilFuncs.AngleMath();



/**
 * The Time object contains static methods that implement CSS mathematic functions on the <time>
 * CSS type by appending a time unit suffix.
 * Integer numbers use "ms"; floating point numbers use "s".
 */
export let Time: UtilTypes.INumberMath = new UtilFuncs.TimeMath();



/**
 * The Resolution object contains static methods that implement CSS mathematic functions on the
 * <resolution> CSS type by appending a resolution unit suffix.
 * Integer numbers use "dpi"; floating point numbers use "dpcm".
 */
export let Resolution: UtilTypes.INumberMath = new UtilFuncs.ResolutionMath();



/**
 * The Frequency object contains static methods that implement CSS mathematic functions on the
 * <frequency> CSS type by appending a frequency unit suffix.
 * Integer numbers use "Hz"; floating point numbers use "kHz".
 */
export let Frequency: UtilTypes.INumberMath = new UtilFuncs.FrequencyMath();



/**
 * The Fraction object contains static methods that implement CSS mathematic functions on the
 * <fraction> CSS type by appending a fraction unit suffix.
 * Integer numbers use "fr"; floating point numbers use "%".
 */
export let Fraction: UtilTypes.IFractionMath = new UtilFuncs.FractionMath();



/**
 * The Percent object contains static methods that implement CSS mathematic functions on the
 * <percentage> CSS type by appending a "%" unit suffix.
 */
export let Percent: UtilTypes.INumberMath = new UtilFuncs.PercentMath();



