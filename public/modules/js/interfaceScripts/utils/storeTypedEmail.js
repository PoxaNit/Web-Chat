import objectCache from "../../database/cache/objectCache.js";

 function storeTypedEmail (text) {

     objectCache.states.authContext.this_user_email = text;

 }

 export default storeTypedEmail;
