import objectCache from "../../database/cache/objectCache.js";
import messagesList from "../lists/messagesList.js";
import inicialScreen from "./inicialScreen.js";
import conversationOptionsLayot from "./conversationOptionsLayout.js";
import storeTypingMessage from "../utils/storeTypingMessage.js";
console.log("executing conversation layout...")

const root = document.getElementById("root");
console.log("executing conversation layout...")

 function conversationLayout (conversationId) {
console.log("executing conversation layout...")
   // Clear the root element
     root.replaceChildren();

   // Storing the current conversation id in a state,
   // so other parts of the application can use it
     objectCache.states.conversationContext.conversation_being_rendered_id = conversationId;


     const header = document.createElement("header");

     const main = document.createElement("main");

     const footer = document.createElement("footer");

     const div = document.createElement("div");

     const button1 = document.createElement("button");

     const button2 = document.createElement("button");

     const button3 = document.createElement("button");

     const input = document.createElement("input");


     header.id = "conversation_header";

     main.id = "conversation_main";

     footer.id = "conversation_footer";

     button1.id = "close_conversation_button";

     button2.id = "conversation_options_button";

     button1.id = "send_message_button";

     input.id = "conversation_message_input";


     button1.textContent = "back";

     button2.textContent = "options";

     button3.textContent = "send";

     input.placeholder = "Type something...";


     button1.onclick = () => {

         objectCache.states.conversationContext.conversation_being_rendered_id = null;

         inicialScreen();

     }

     button2.onclick = () => conversationOptionsLayout();



     input.onchange = e => storeTypingMessage(e.target.value);


     header.appendChild(button1);

     header.appendChild(button2);

     main.appendChild(messagesList(conversationId));

     div.appendChild(input);

     div.appendChild(button3);

     footer.appendChild(div);


     root.appendChild(header);

     root.appendChild(main);

     root.appendChild(footer);

 }

 export default conversationLayout;
