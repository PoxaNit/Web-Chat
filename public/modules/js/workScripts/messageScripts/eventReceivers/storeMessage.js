import { addData } from "../../database/storageHandler/storageHandler.js";
import ws from "../../../ws/ws.js";

 async function storeMessage (message) {

     const {
       message_id,
       created_at,
       updated_at,
       sender_id,
       conversation_id,
       content
     } = message.payload.data;

     const messageObject = {
       id: message_id,
       created_at: created_at,
       updated_at: updated_at,
       sender_id: sender_id,
       conversation_id: conversation_id,
       content: content
     }

     addData("messages", messageObject);

     ws.send({
       event: "message_"
     });

 }

 export default storeMessage;
