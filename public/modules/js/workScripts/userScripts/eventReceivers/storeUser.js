import storageHandler from "../../database/storageHandler/storageHandler.js";

 function storeUser (message) {

     const {
       user_id,
       created_at,
       updated_at,
       name,
       email
     } = JSON.parse(message).payload.data;

     const userObject = {
       id: user_id,
       created_at: created_at,
       updated_at: updated_at,
       name: name,
       email: email
     }

     storageHandler.addData("users", userObject);
console.log(`user in the local database and cache: ${storageHandler.getData(user_id)}`)
 }

 export default storeUser;
