import ws from "../../../ws/ws.js";
import objectCache from "../../../database/cache/objectCache.js";
import storageHandler from "../../../database/storageHandler/storageHandler.js";
import inicialScreen from "../../../interfaceScripts/layouts/inicialScreen.js";

 function userLoggedIn (message) {
console.log(`executing userLoggedIn`, message)
     if (!message.payload.success) return;

     const {
       user_id,
       created_at,
       updated_at,
       name,
       email
     } = message.payload.data;


     objectCache.states.authContext.this_user_id = user_id;
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
console.log("user Object: ", userObj)
     storageHandler.putData("users", userObj);
console.log(storageHandler.getAllData("users"))
     inicialScreen();

 }

 export default userLoggedIn;
