import { addData } from "../../../database/storageHandler/storageHandler.js";
import conversationLayout from "../../../interfaceScripts/layouts/conversationLayout.js";

 function conversationCreated (message) {

     const {
       conversation_id,
       user1_id,
       user2_id,
       group_id,
       type
     } = message.payload.data;

     const conv = {
       id: conversation_id,
       user1_id: user1_id,
       user2_id: user2_id,
       group_id: group_id,
       type: type
     }

     addData("conversations", conv);

     conversationLayout(conversation_id);

 }

 export default conversationCreated;
