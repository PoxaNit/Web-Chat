import { states } from "../../../database/cache/objectCache.js";
import ws from "../../../ws/ws.js";
import loginUserForm from "../../../interfaceScripts/layouts/forms/loginUserForm.js";

 function logoutUser () {

     const {
       this_user_id
     } = states.authContext;

     states.authContext.this_user_is_logged = false;

     const payload = {
       user_id: this_user_id
     }

     ws.send(JSON.stringify({
       event: "logout_user",
       payload: payload
     }));

     loginUserForm();

 }

 export default logoutUser;
