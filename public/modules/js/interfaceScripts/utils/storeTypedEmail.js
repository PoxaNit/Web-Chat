import { states } from "../../database/cache/objectCache.js";

 function storeTypedEmail (text) {

     states.authContext.this_user_email = text;

 }

 export default storeTypedEmail;
