import { addData } from "../../database/storageHandler/storageHandler.js";
import ws from "../../ws/ws.js";

// This module doesn't handle event directly, but it's a util to other script
 function storeMessagesStatus (messageStatus = []) {

     for (const mt of messageStatus) {

         const objectMessageStatus = {
           id: mt.message_status_id,
           created_at: mt.created_at,
           updated_at: mt.updated_at,
           user_id: mt.user_id,
           message_id: mt.message_id,
           status: mt.status
         }

         addData("message_status", objectMessageStatus);

     }

 }

 export default storeMessagesStatus;
