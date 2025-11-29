import { addData } from "../../database/storageHandler/storageHandler.js";

 function storeGroup (message) {

     const {
       group_id,
       name,
       creator_user_id
     }

     const groupObject = {
       id: group_id,
       name: name,
       creator_user_id: creator_user_id
     }

     addData("groups", groupObject);

 }

 export default storeGroup;
