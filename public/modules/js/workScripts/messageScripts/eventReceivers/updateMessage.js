import { updateData } from "../../database/storageHandler/storageHandler.js";

// message as parameter here is the message of server
// not the object message directly
 function updateMessage (message) {

     const {
       message_id,
       content
     } = message.payload.data;

     const messageObject = {
       id: message_id,
       content: content
     }

     updateData("messages", message);

 }

 export default updateMessage;
