import { addData } from "../../../database/storageHandler/storageHandler.js";
import ws from "../../../ws/ws.js";

 function listMessages (conversation_ids = []) {

     for (const id of conversation_ids) {

         ws.send({
           event: "list_messages",
           payload: conversation_ids
         });

     }

 }

 export default listMessages;
