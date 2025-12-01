import inicialScreen from "./inicialScreen.js";
import userProfileLayout from "./userProfileLayout.js";
import getUserByEmail from "../utils/getUserByEmail.js";

const root = document.getElementById("root");

 function searchUserLayout () {

     root.replaceChildren();

     const layout = document.createElement("div");

     const goBackButton = document.createElement("button");

     const searchInput = document.createElement("input");

     const searchButton = document.createElement("button");

     const messageP = document.createElement("p");



  // IDs

     layout.id = "search_user_layout";
     goBackButton.id = "search_user_go_back_button";
     searchButton.id = "search_user_search_button";
     message.id = "search_user_message_p";


   // Text contents

     goBackButton.textContent = "back";
     searchButton.textContent = "search";

     goBackButton.onclick = () => inicialScreen();
     searchButton.onclick = () => () => userProfileLayout();

 }

 export default searchUserLayout;
