import { states } from "../../database/cache/objectCache.js";

 function storeTypedName (text) {

     states.authContext.this_user_name = text;

 }

 export default storeTypedName;
