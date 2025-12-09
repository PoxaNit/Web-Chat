import { updateData } from "../../../database/storageHandler/storageHandler.js";
import ws from "../../../ws/ws.js";

// Paremeter message here is the object directly
// with data to delete
 function updateMessage (message) {

     const {
       message_id,
       content
     } = JSON.parse(message);

     const messageObject = {
       id: message_id,
       content: content
     }

     updateData("messages", message);

     ws.send(JSON.stringify({
       event: "update_message",
       payload: message
     }));

 }
