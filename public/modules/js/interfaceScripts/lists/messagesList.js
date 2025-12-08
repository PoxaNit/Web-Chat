import storageHandler from "../../database/storageHandler/storageHandler.js";

 function messagesList (conversationId) {

    // Only messages of this conversation
     const messages =
     Object.values(getAllData("messages").data)
     .filter(m => m.conversation_id === conversationId);

     const messageStatus =
     Object.values(getAllData("message_status").data);

     const ul = document.createElement("ul");

     ul.id = "conversation_message_list";

     for (const msg of messages) {


         const li = document.createElement("li");

         const div = document.createElement("div");

         const contentSection = document.createElement("section");

         const statusSection = document.createElement("section");

         const pToMessageContent = document.createElement("p");

         const pToMessageStatus = document.createElement("p");


         div.className = "message_div";

         contentSection = "message_content_section";

         statusSection = "message_status_section";

         pToMessageContent.className = "p_to_message_content";

         pToMessageStatus.className = "p_to_message_status";

         pToMessageContent.textContent = msg.content;

         pToMessageStatus.textContent =
         messageStatus.filter(ms => ms.message_id === msg.id)[0];

         contentSection.appendChild(pToMessageContent);

         statusSection.appendChild(pToMessageStatus);

         div.appendChild(contentSection)

         div.appendChild(statusSection)

         li.appendChild(div);

         ul.appendChild(li);

     }

     return ul;

 }

 export default messagesList;
