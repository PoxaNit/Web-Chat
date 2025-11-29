import { updateData, getData, getAllData } from "../../database/storageHandler/storageHandler.js";
import ws from "../../ws/ws.js";

// messages here is array of object message
 function updateMessageStatus (messages, status) {

     let message_ids = [];

     for (const message of messages) {

         const objectMessage = {
           id: message.message_id,
           created_at: message.created_at,
           updated_at: message.updated_at,
           conversation_id: message.conversation_id,
           sender_id: message.sender_id,
           content: message.content
         }

         const conversation = getData("conversations", message.conversation_id).data;

         const user_id = conversation.user1_id === message.sender_id ? conversation.user2_id : conversation.user1_id;

         const user = getData("users", user_id);

         const conversations = getAllData("conversations").data;

         let correctConversation;

         for (const conv in conversations) {

             if (conv.id === message.conversation_id) {

                 correctConversation = conv;

                 break;

             }

         }

         const objectToPush = {
           message_id: message.message_id,
           user_id: user_id,
           conversation_id: correctConversation.id
         }

     }

 }

 export default updateMessageStatus;
