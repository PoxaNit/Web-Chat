import objectCache from "../../../../database/cache/objectCache.js";

 function afterUserGot () {

     for (const event in objectCache.internal_events) {

         for (let i = 0; i < event.length; i++) {

             event[i].func();

             if (event[i].once) {

                 event.splice(i, 1);

             }

         }

     }

 }

 export default afterUserGot;
