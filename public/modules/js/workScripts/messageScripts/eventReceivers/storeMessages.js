import { putData } from "../../../database/storageHandler/storageHandler.js";

// Note that this module serves to store multiple messages
// of multiple conversations. It's useful for example
// when the client database (IndexedDB) loss the data
// and the user want to restore the conversations and messages


// message as parameter here is the message from server
// event
 function storeMessages (message) {

     const {
       messages
     } = message.payload.data;

     for (const m of messages) {

       // Set the correct id field, following the convention
         const messageObject = {
           id: m.message_id,
           created_at: m.created_at,
           updated_at: m.updated_at,
           conversation_id: m.conversation_id,
           sender_id: m.sender_id,
           content: m.content
         }

         putData("messages", messageObject);

     }

 }

 export default storeMessages;
