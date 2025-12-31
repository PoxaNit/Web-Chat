import objectCache from "../../../../database/cache/objectCache.js";

 function afterUserGot () {
console.log("afterUserGot function executing...")
     for (const event in objectCache.internal_events) {
console.log("afterUserGot function: event: ", objectCache.internal_events[event])
         for (let i = 0; i < event.length; i++) {
console.log("afterUserGot function: event[i]: ", objectCache.internal_events[event][i])
console.log("afterUserGot function: event[i].func: ", objectCache.internal_events[event][i].func)

             console.log("testing func: ", objectCache.internal_events[event]);

             if (objectCache.internal_events[event][i].once) {

                 objectCache.internal_events[event].splice(i, 1);

             }

         }

     }

 }

 export default afterUserGot;
