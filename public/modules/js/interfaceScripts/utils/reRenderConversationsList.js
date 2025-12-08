import storageHandler from "../../database/storageHandler/storageHandler.js";
import conversationsList from "../lists/conversationsList.js";

console.log("executing reRender conversation...")


 function reRenderConversationsList (userName) {

     const main = document.getElementById("inicial_screen_main");
     document.getElementById("conversations_list").remove();

     main.appendChild(conversationsList(userName));

 }

 export default reRenderConversationsList;
