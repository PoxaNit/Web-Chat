import { addData } from "../../database/storageHandler/storageHandler.js";

 function storeUser (message) {

     const {
       user_id,
       name,
       email
     } = message.payload.data;

     const userObject = {
       id: user_id,
       name: name,
       email: email
     }

     addData("users", userObject);

 }

 export default storeUser;
