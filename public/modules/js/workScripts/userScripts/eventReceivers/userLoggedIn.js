import ws from "../../../ws/ws.js";
import objectCache from "../../../database/cache/objectCache.js";
import storageHandler from "../../../database/storageHandler/storageHandler.js";
import inicialScreen from "../../../interfaceScripts/layouts/inicialScreen.js";

 function userLoggedIn (message) {
console.log(`executing userLoggedIn`)
     if (!message.payload.success) return;

     const {
       user_id,
       created_at,
       updated_at,
       name,
       email
     } = message.payload.data;


     objectCache.states.authContext.this_user_is_logged = true;
     objectCache.states.authContext.this_user_name = name;

     objectCache.states.authContext.this_user_email = email;

     const userObj = {
       id: user_id,
       created_at: created_at,
       updated_at: updated_at,
       name: name,
       email: email
     }

     storageHandler.putData("users", userObj);
console.log(`login: ${objectCache.states.authContext.this_user_is_logged}`)

         inicialScreen();

 }

 export default userLoggedIn;
