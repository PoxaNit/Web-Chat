import ws from "../../../ws/ws.js";
import { states } from "../../../database/cache/objectCache.js";

 function sendMessage (content) {

     const {
       this_user_id,
       conversation_being_rendered_id
     } = states;

     ws.send({
       event: "send_message",
       payload: {
         sender_id: this_user_id,
         conversation_id: conversation_being_rendered_id,
         content: content
       }
     });

 }

 export default sendMessage;
