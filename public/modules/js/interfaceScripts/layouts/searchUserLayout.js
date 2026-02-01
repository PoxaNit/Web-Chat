import inicialScreen from "./inicialScreen.js";
import getUserByEmail from "../utils/getUserByEmail.js";
import objectCache from "../../database/cache/objectCache.js";
import userProfileLayout from "./userProfileLayout.js";

 async function searchUserLayout () {

     const root = document.getElementById("root");

     root.replaceChildren();

     const layout = document.createElement("div");

     const topSection = document.createElement("section");

     const bottomSection = document.createElement("section");

     const profileDiv = document.createElement("div");

     const goBackButton = document.createElement("button");

     const searchInput = document.createElement("input");

     const searchButton = document.createElement("button");

     const messageP = document.createElement("p");



  // IDs

     layout.id = "search_user_layout";
     topSection.id = "search_user_top_section";
     bottomSection.id = "search_user_bottom_section";
     goBackButton.id = "search_user_go_back_button";
     searchButton.id = "search_user_search_button";
     messageP.id = "search_user_message_p";


   // Text contents

     goBackButton.textContent = "back";
     searchButton.textContent = "search";


     goBackButton.onclick = () => {

         objectCache.states.variables_in_general.searchUser = null;

         inicialScreen();

     }

     searchButton.onclick = async () => {

         objectCache.states.variables_in_general.searchUser = {};
         objectCache.states.variables_in_general.searchUser.showUser = true;

         const user = await getUserByEmail(searchInput.value);

         if (user) {
console.log("user id got: ", user)
             objectCache.states.variables_in_general.searchUser.showUser = false;

             userProfileLayout(user);

         }

     }

     topSection.appendChild(goBackButton);

     topSection.appendChild(searchButton);

     topSection.appendChild(searchInput);

     layout.appendChild(topSection);

     layout.appendChild(messageP);


     root.appendChild(layout);

 }

 export default searchUserLayout;
