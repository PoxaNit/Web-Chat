import objectCache from "../../../../database/cache/objectCache.js";

 async function afterUserGot () {
console.log("afterUserGot function executing...")
     for (const event in objectCache.internal_events) {
console.log("afterUserGot function: event: ", objectCache.internal_events[event])
console.log("Length of event array: test"/*, objectCache.internal_events[event].length*/)
         for (let i = 0; i < objectCache.internal_events[event].length; i++) {
console.log("afterUserGot function: event[i]: ", objectCache.internal_events[event][i])
console.log("afterUserGot function: event[i].func: ", objectCache.internal_events[event][i].func)

             const t = await objectCache.internal_events[event][i].func();
console.log("after exec function: ", t)
console.log("testing func: ", objectCache.internal_events[event]);

             if (objectCache.internal_events[event][i].once) {

                 objectCache.internal_events[event].splice(i, 1);

             }

         }

     }

     return true;

 }

 export default afterUserGot;
