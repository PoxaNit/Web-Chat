
 function renderNewMessage (content) {

     const conversation_message_list = document.getElementById("conversation_message_list");

     if (conversation_message_list) {

         const li = document.createElement("li");

         const p = document.createElement("p");

         p.textContent = content;

         li.appendChild(p);

         conversation_message_list.appendChild(li);

     }

 }

 export default renderNewMessage;
