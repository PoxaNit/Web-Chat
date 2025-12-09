import { getData, addData } from "../../database/storageHandler/storageHandler.js";
import ws from "../../../ws/ws.js";
import storeMessagesStatus from "./storeMessagesStatus.js";
import renderNewMessage from "../../../utils/renderNewMessage.js";
import { states } from "../../../../../database/cache/objectCache.js";

// Store the message and message status when a message arrives
 async function storeMessage (message) {
console.log(message)
     const {
       message_id,
       created_at,
       updated_at,
       sender_id,
       conversation_id,
       content
     } = JSON.parse(message).payload.data.message;

     const {
       message_status_id,
       created_at,
       updated_at,
       message_id,
       user_id,
       status
     } = message.payload.data.message_status

     const messageObject = {
       id: message_id,
       created_at: created_at,
       updated_at: updated_at,
       sender_id: sender_id,
       conversation_id: conversation_id,
       content: content
     }

     const messageStatusObject = {
       id: message_status_id,
       created_at: created_at,
       updated_at: updated_at,
       message_id: message_id,
       user_id: user_id,
       status: "delivered"
     }

     addData("messages", messageObject);

     storeMessagesStatus([messageStatusObject]);



  // if user is in a conversation, it already show the new message
     if (states.conversationContext.conversation_being_rendered_id === conversation_id) {

         renderNewMessage(content);

     }




     ws.send({
       event: "message_received",
       payload: {
         message_id: message_id,
         user_id: user_id
       }
     });

 }

 export default storeMessage;
