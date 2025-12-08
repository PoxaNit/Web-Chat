import objectCache from "../../database/cache/objectCache.js";

 function storeTypingMessage (text) {

     objectCache.states.conversationContext.message_user_is_typing = text;

 }

 export default storeTypingMessage;
