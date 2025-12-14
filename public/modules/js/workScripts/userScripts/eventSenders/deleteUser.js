import ws from "../../../ws/ws.js";
import objectCache from "../../../database/cache/objectCache.js";

 async function deleteUser () {

     const userId = objectCache.states.authContext.this_user_id;

     const payload = {
       user_id: userId
     }

     ws.send(JSON.stringify({
       event: "delete_user",
       payload: payload
     }));

 }

 export default deleteUser;
