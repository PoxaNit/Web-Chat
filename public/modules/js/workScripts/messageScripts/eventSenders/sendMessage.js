import ws from "../../ws/ws.js";

 function sendMessage (sender_id, conversation_id, content) {

     ws.send({
       event: "send_message",
       payload: {
         sender_id: sender_id,
         conversation_id: conversation_id,
         content: content
       }
     });

 }

 export default sendMessage;
