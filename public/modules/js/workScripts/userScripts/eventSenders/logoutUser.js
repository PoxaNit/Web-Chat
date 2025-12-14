import objectCache from "../../../database/cache/objectCache.js";
import ws from "../../../ws/ws.js";
import loginUserForm from "../../../interfaceScripts/layouts/forms/loginUserForm.js";

 function logoutUser () {

     const {
       this_user_id
     } = objectCache.states.authContext;
console.log(objectCache.states.authContext)
     const payload = {
       user_id: this_user_id
     }
console.log(payload)
     ws.send(JSON.stringify({
       event: "logout_user",
       payload: payload
     }));

 }

 export default logoutUser;
