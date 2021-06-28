import {MediaQuery} from "./MediaTypes";
import {s_mediaQueryToString} from "../impl/MediaFuncs";



/**
 * Converts the given media query value to the CSS media query string. This function should be used
 * by libraries that allow specifying the [[MediaQuery]] type for the `media` attribute of elements
 * such as `<link>`, `<style>` and `<source>`
 */
export function mediaQueryToString( query: MediaQuery): string
{
    return s_mediaQueryToString( query);
}



