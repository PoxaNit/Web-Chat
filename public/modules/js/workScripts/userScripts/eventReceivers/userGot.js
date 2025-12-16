import storageHandler from "../../../database/storageHandler/storageHandler.js";

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

console.log("all data: ", storageHandler.getAllData("users"))
         res(userObject);
console.log("userObject: ", userObject)
     });

 }

 export default userGot;
