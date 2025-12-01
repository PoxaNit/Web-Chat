import { getData } from "../database/storageHandler/storageHandler.js";

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

     nameStrong.textContent = "Email:";
     emailP.textContent = user.email;


     nameSection.appendChild(nameStrong);
     nameSection.appendChild(nameP);

     emailSection.appendChild(emailStrong);
     emailSection.appendChild(nameP);

     layout.appendChild(nameSection);
     layout.appendChild(emailSection);

     root.appendChild(layout);

 }

 export default userProfileLayout;
