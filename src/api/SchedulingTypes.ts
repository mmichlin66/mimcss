/**
 * @module
 */

import { IStyleDefinitionClass, StyleDefinition } from "./RuleTypes";



/**
 * The SchedulerType enumeration provides values used to define how the calls to the
 * activate and deactivate functions schedule the writing of style changes to the DOM.
 */
 export const enum SchedulerType
 {
     /**
      * Synchronous activation - style definitions are written to the DOM upon the activate
      * and deactivate calls.
      */
     Sync = 1,

     /**
      * Calls to activate and deactivate functions are accumulated until the next animation
      * frame and then executed alltogether.
      */
     AnimationFrame,

     /**
      * Calls to activate and deactivate functions are accumulated until the call to the
      * forceDOMUpdate function and then executed alltogether.
      */
     Manual,
 }



 /**
  * The IScheduler interface should be implemented by custom schedulers. Its methods are invoked
  * by the activation infrastructure.
  */
 export interface IScheduler
 {
     /**
      * Initializes the scheduler object and provides the callback that should be invoked when the
      * scheduler decides to make changes to the DOM.
      */
     init( doDOMUpdate: () => void): void;

     /**
      * Is invoked when the scheduler needs to schedule its callback or event.
      */
     scheduleDOMUpdate(): void;

     /**
      * Is invoked when the scheduler needs to cancel its scheduled callback or event.
      */
     cancelDOMUpdate(): void;
 }



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Serialization.
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The ICssSerializer interface allows adding style definition classes and objects
 * and serializing them to a single string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
 export interface ICssSerializer
 {
     /**
      * Adds style definition class or instance.
      */
     add( instOrClass: StyleDefinition | IStyleDefinitionClass): void;

     /**
      * Returns concatenated string representation of all CSS rules added to the context.
      */
     serialize(): string;
 }



