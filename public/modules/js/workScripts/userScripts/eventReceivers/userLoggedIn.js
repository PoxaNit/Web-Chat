import ws from "../../../ws/ws.js";
import { states } from "../../../database/cache/objectCache.js";
import { putData } from "../../../database/storageHandler/storageHandler.js";
import inicialScreen from "../../../interfaceScripts/inicialScreen.js";

 function userLoggedIn (message) {

     const {
       user_id,
       created_at,
       updated_at,
       name,
       email
     } = message.payload.data;


     states.authContext.this_user_is_logged = true;
     states.authContext.this_user_name = name;

     states.authContext.this_user_email = email;

     const userObj = {
       id: user_id,
       created_at: created_at,
       updated_at: updated_at,
       name: name,
       email: email
     }

     putData("users", userObj);

     inicialScreen();

 }

 export default userLoggedIn;
