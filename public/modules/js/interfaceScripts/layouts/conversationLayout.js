import messagesList from "../lists/messagesList.js";

const root = document.getElementById("root");

 function conversationLayout (conversationId) {

     const header = document.createElement("header");

     const main = document.createElement("main");

     const footer = document.createElement("footer");


     header.className = "conversation_header";

     main.className = "conversation_main";

     footer.className = "conversation_footer";


     

     main.appendChild(messagesList(conversationId));

 }

 export default conversationLayout;
