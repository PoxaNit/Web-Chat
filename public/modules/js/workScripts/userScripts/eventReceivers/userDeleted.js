import objectCache from "../../../database/cache/objectCache.js";
import storageHandler from "../../../database/storageHandler/storageHandler.js";
import loginUserForm from "../../../interfaceScripts/layouts/forms/loginUserForm.js";

 async function userDeleted (message) {

     if (!message.payload.success) return;

     const { user_id } = message.payload.data;

     objectCache.states.authContext.this_user_id = null;
     objectCache.states.authContext.this_user_name = null;
     objectCache.states.authContext.this_user_email = null;
     objectCache.states.authContext.this_user_is_logged = null;

     const users = Object.values(storageHandler.getAllData("users").data);
console.log(typeof users, users)
     const thisUser = users.filter(u => u.id === user_id);

     await storageHandler.deleteData("users", user_id);

     loginUserForm();

 }

 export default userDeleted;
