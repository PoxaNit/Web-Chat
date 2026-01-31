import storageHandler from "../../../database/storageHandler/storageHandler.js";
import afterUserGot from "../../../internalEvents/afterEvents/afterEventReceivers/afterUserGot/afterUserGot.js";
import objectCache from "../../../database/cache/objectCache.js";

 async function userGot (message) {

     return new Promise(async (res, rej) => {

         if (!message.payload.success) {

             rej(null);

         }

         const {
           user_id,
           created_at,
           updated_at,
           name,
           email
         } = message.payload.data.user;

         const userObject = {
           id: user_id,
           created_at: created_at,
           updated_at: updated_at,
           name: name,
           email: email
         }

         await storageHandler.addData("users", userObject);

         afterUserGot(); // Trigger all the necessary events

         res(null);

     });

 }

 export default userGot;
