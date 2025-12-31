import objectCache from "../../../database/cache/objectCache.js";

 function addInternalEvent (event, func, once = false) {
console.log("addInternalEvent executing...")

     const eventObj = {
       func: func,
       once: once
     };


     if (Object.hasOwn(objectCache.internal_events, event)) {

         objectCache.internal_events[event].push(eventObj);
console.log("internal events: ", objectCache.internal_events)
console.log("event[0]: ", objectCache.internal_events[event][0])
         return true; // success

     }

     return false; // not success

 }

 export default addInternalEvent;

