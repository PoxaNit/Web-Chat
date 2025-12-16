import inicialScreen from "./inicialScreen.js";
import userProfileLayout from "./userProfileLayout.js";
import getUserByEmail from "../utils/getUserByEmail.js";


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


     goBackButton.onclick = () => inicialScreen();
     searchButton.onclick = async () => {

         const result = await getUserByEmail(searchInput.value);
console.log(`user by email: ${result}`)
         if (result) {

             userProfileLayout(result.id);

         } else {

             messageP.textContent = "User not found";

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
