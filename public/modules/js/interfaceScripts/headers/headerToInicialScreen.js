import storageHandler from "../../database/storageHandler/storageHandler.js";
import reRenderConversationsList from "../utils/reRenderConversationsList.js";
import configurationsLayout from "../layouts/configurationsLayout.js";
import searchUserLayout from "../layouts/searchUserLayout.js";

 function headerToInicialScreen () {

     const div = document.createElement("div");

     const button = document.createElement("button");

     const configButton = document.createElement("button");

     const p = document.createElement("p");

     const input = document.createElement("input");


     div.id = "inicial_screen_header_div";

     button.id = "inicial_screen_header_div_add_new_contact_button";

     configButton.id = "inicial_screen_header_div_config_button";

     p.id = "inicial_screen_header_div_p";

     input.id = "search_contact_input";


     button.textContent = "Add New Contact"

     configButton.textContent = "Configurations";

     p.textContent = "Search a contact:";


     button.onclick = () => searchUserLayout();

     configButton.onclick = () => configurationsLayout();

     input.onchange = e => reRenderConversationsList(e.target.value);


     div.appendChild(button);
     div.appendChild(configButton);
     div.appendChild(p);
     div.appendChild(input);

     return div;

 }

 export default headerToInicialScreen;
