import objectCache from "../../../database/cache/objectCache.js";
setTimeout(() => console.log("addInternalEvent.js executing..."), 5000)

 function addInternalEvent (event, func, once = false) {

     const eventObj = {
       func: func,
       once: once
     };


     if (Object.hasOwn(objectCache.internal_events, event)) {

         objectCache.internal_events[event].push(eventObj);

         return true; // success

     }

     return false; // not success

 }

 export default addInternalEvent;

