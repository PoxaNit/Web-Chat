import objectCache from "../../database/cache/objectCache.js";
import conversationLayout from "../layouts/conversationLayout.js";

 function conversationsList (userName) {

     const ul = document.createElement("ul");

     const conversations = objectCache.getAllData("conversations").data;

     const users = objectCache.getAllData("users").data;

     const messages = objectCache.getAllData("messages").data;


     for (const conv in conversations) {

         const correctUser = Object.values(users)
           .filter(u => u.id === conv.user1_id || u.id === conv.user2_id)[0];

         const name = correctUser.name;

         if (!name.includes(userName)) continue;

         const li = document.createElement("li");

         const strong = document.createElement("strong");

         const p = document.createElement("p");

         const last_message = Math.max(...Object.values(messages).filter(m => m.id === conv.id));

         p.textContent = last_message.content;

         strong.textContent = name;

         li.appendChild(strong);

         li.appendChild(p);

         li.onclick = conversationLayout(conv.id);

         ul.appendChild(li);

     }

     ul.id = "conversations_list";

     return ul;

 }

 export default conversationsList;
