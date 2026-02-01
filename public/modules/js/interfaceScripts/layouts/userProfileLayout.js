import storageHandler from "../../database/storageHandler/storageHandler.js";
import verifyConversationExists from "../utils/verifyConversationExists.js";
import objectCache from "../../database/cache/objectCache.js";
import conversationLayout from "./conversationLayout.js";
import createConversation from "../../workScripts/conversationScripts/eventSenders/createConversation.js";


 function userProfileLayout (userId) {
console.log("userProfileLayout executing...")
     const root = document.getElementById("root");

     root.replaceChildren();

     const layout = document.createElement("div");

     const buttonSection = document.createElement("button");

     const nameSection = document.createElement("section");

     const emailSection = document.createElement("section");

     const nameStrong = document.createElement("strong");

     const nameP = document.createElement("p");

     const emailStrong = document.createElement("strong");

     const emailP = document.createElement("p");

     const user = storageHandler.getData(userId);


     layout.id = "user_profile_layout";

     buttonSection.id = "user_profile_button_section";

     nameSection.id = "user_profile_name_section";
     nameStrong.id = "user_profile_name_strong";
     nameP.id = "user_profile_name_p";

     emailSection.id = "user_profile_email_section";
     emailStrong.id = "user_profile_email_strong";
     emailP.id = "user_profile_email_p";


     nameStrong.textContent = "Name:";
     nameP.textContent = user.name;

     emailStrong.textContent = "Email:";
     emailP.textContent = user.email;


     nameSection.appendChild(nameStrong);
     nameSection.appendChild(nameP);

     emailSection.appendChild(emailStrong);
     emailSection.appendChild(emailP);

     layout.appendChild(nameSection);
     layout.appendChild(emailSection);

     if (!verifyConversationExists(userId, objectCache.states.authContext.this_user_id)) {

         const startConversationSection = document.createElement("section");

         const startConversationButton = document.createElement("button");


         startConversationSection.id = "user_profile_start_conversation_section";

         startConversationButton.id = "user_profile_start_conversation_button";


         startConversationButton.textContent = "start conversation";


         startConversationSection.onclick = () => {

             createConversation(userId, "private");

         }

         startConversationSection.appendChild(startConversationButton);

         layout.appendChild(startConversationSection);

     }

     root.appendChild(layout);

 }

 export default userProfileLayout;
