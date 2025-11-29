import { getAllData } from "../../database/storageHandler/storageHandler";
import conversationsList from "../lists/conversationsList.js";

const main = document.getElementById("inicial_screen_main");
document.getElementById("conversations_list").remove();

 function reRenderConversationsList (userName) {

     main.appendChild(conversationsList(userName));

 }

 export default reRenderConversationsList;
