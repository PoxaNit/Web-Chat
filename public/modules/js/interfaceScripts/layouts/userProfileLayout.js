import { getData } from "../database/storageHandler/storageHandler.js";
import verifyConversationExists from "../utils/verifyConversationExists.js";
import { states } from "../../database/cache/objectCache.js";
import conversationLayout from "./conversationLayout";
import createConversation from "../../workScripts/conversationScripts/eventSenders/createConversation.js";

const root = document.getElementById("root");

 function userProfileLayout (userId) {

     root.replaceChildren();

     const layout = document.createElement("div");

     const nameSection = document.createElement("section");

     const emailSection = document.createElement("section");

     const nameStrong = document.createElement("strong");

     const nameP = document.createElement("p");

     const emailStrong = document.createElement("strong");

     const emailP = document.createElement("p");

     const user = getData(userId);


     layout.id = "user_profile_layout";

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

     if (!verifyConversationExists(userId, states.authContext.this_user_id)) {

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
