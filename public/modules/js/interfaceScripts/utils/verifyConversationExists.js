import storageHandler from "../../database/storageHandler/storageHandler.js";

 function verifyConversationExists (user1Id, user2Id) {

     const conversations = storageHandler.getAllData("conversations").data;

     for (const conv of conversations) {

         if (
           (conv.user1_id === user1Id && conv.user2_id === user2Id)
           ||
           (conv.user1_id === user2Id && conv.user2_id === user1Id)
         ) return true;

     }

 }

 export default verifyConversationExists;
