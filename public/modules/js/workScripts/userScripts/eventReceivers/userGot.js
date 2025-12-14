import storageHandler from "../../../database/storageHandler/storageHandler.js";

 async function userGot (message) {

     if (!message.payload.succes) {

         return;

     }

     const {
       user_id,
       created_at,
       updated_at,
       name,
       email
     } = message.payload.data;

     const userObject = {
       id: user_id,
       created_at: created_at,
       updated_at: updated_at,
       name: name,
       email: email
     }

     storageHandler.addData("users", userObject);

     return userObject;

 }

 export default userGot;
