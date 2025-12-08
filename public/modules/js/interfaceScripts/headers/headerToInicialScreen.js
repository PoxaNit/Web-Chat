console.log("header executing...")
import storageHandler from "../../database/storageHandler/storageHandler.js";
import reRenderConversationsList from "../utils/reRenderConversationsList.js";
console.log("header executing...")
 function headerToInicialScreen () {

     const div = document.createElement("div");

     const button = document.createElement("button");

     const p = document.createElement("p");

     const input = document.createElement("input");




     button.id = "add_new_contact";

     button.textContent = "Add New Contact"

     p.textContent = "Search a contact:";

     input.id = "search_contact_input";


     input.onchange = e => reRenderConversationsList(e.target.value);


     div.appendChild(button);
     div.appendChild(p);
     div.appendChild(input);

     return div;

 }

 export default headerToInicialScreen;
