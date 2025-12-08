import objectCache from "../../database/cache/objectCache.js";

 function storeTypedName (text) {

     objectCache.states.authContext.this_user_name = text;

 }

 export default storeTypedName;
