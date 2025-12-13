import ws from "../../../ws/ws.js";
import objectCache from "../../../database/cache/objectCache.js";
import loginUserForm from "../../../interfaceScripts/layouts/forms/loginUserForm.js";

 async function userLoggedOut (message) {

     objectCache.states.authContext.this_user_is_logged = false;

     loginUserForm();

 }

 export default userLoggedOut;
