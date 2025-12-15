import objectCache from "../../../database/cache/objectCache.js";
import ws from "../../../ws/ws.js";

 function createConversation (user_id, type) {

     const payload = {
       user1_id: objectCache.states.authContext.this_user_id,
       user2_id: user_id,
       type: type
     }

     ws.send(JSON.stringify({
       event: "create_conversation",
       payload: payload
     }));

 }

 export default createConversation;
