import { addData } from "../../database/storageHandler/storageHandler.js";

 function storeUser (message) {

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

     addData("users", userObject);

 }

 export default storeUser;
