import { deleteData } from "../../../database/storageHandler/storageHandler.js";
import ws from "../../../ws/";

// Differently of most client work scripts,
// this module doesn't receive message from server,
// but delete the messages in the client and sends the
// event 'delete_messages' to server
 function deleteMessages (message_ids = []) {

     for (const id of message_ids) {

         deleteData("messages", id);

     }

     ws.send(JSON.stringify({
       event: "delete_messages",
       payload: message_ids
     }));

 }
