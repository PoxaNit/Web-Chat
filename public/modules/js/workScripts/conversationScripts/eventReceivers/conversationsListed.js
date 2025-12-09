import { addData } from "../../database/storageHandler/storageHandler.js";

 function storeConversations (message) {

     const { conversations } = JSON.parse(message).payload.data;

     for (const conversation of conversations) {

         const conversationObject = {
           id: conversation.conversation_id,
           user1_id: conversation.user1_id,
           user2_id: conversation.user2_id,
           group_id: conversation.group_id,
           type: conversation.type
         }

         addData("conversations", conversationObject);

         for (const message of conversation.not_read_messages) {

             const messageObject = {
               id: message.message_id,
               created_at: message.created_at,
               updated_at: message.updated_at,
               conversation_id: message.conversation_id,
               sender_id: message.sender_id,
               content: message.content
             }

             addData("messages", messageObject);

         }

     }

 }

 export default storeConversations;
