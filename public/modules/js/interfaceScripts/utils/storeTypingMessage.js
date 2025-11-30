import { states } from "../../database/cache/objectCache.js";

 function storeTypingMessage (text) {

     states.conversationContext.message_user_is_typing = text;

 }

 export default storeTypingMessage;
