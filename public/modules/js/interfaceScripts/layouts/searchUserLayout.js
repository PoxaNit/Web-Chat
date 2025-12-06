import inicialScreen from "./inicialScreen.js";
import userProfileLayout from "./userProfileLayout.js";
import getUserByEmail from "../utils/getUserByEmail.js";

const root = document.getElementById("root");

 function searchUserLayout () {

     root.replaceChildren();

     const layout = document.createElement("div");

     const topSection = document.createElement("section");

     const profileDiv = document.createElement("div");

     const goBackButton = document.createElement("button");

     const searchInput = document.createElement("input");

     const searchButton = document.createElement("button");

     const messageP = document.createElement("p");



  // IDs

     layout.id = "search_user_layout";
     topSection.id = "search_user_top_section";
     goBackButton.id = "search_user_go_back_button";
     searchButton.id = "search_user_search_button";
     messageP.id = "search_user_message_p";


   // Text contents

     goBackButton.textContent = "back";
     searchButton.textContent = "search";
     messageP.textContent = "User not found";

     messageP.style.display = "none";

     goBackButton.onclick = () => inicialScreen();
     searchButton.onclick = () => {

         const result = getUserByEmail(searchInput.value);

         if (result) {

             userProfileLayout(result.id);

         } else {

             messageP.style.display = "inline";

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
