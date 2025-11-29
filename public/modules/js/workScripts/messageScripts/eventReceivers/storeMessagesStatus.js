import { addData } from "../../database/storageHandler/storageHandler.js";
import ws from "../../ws/ws.js";

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
