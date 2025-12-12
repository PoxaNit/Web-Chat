import objectCache from "../../database/cache/objectCache.js";
import inicialScreen from "../layouts/inicialScreen.js";

 function headerToConfigurationLayout () {

     const root = document.getElementById("root");

     const header = document.createElement("header");

     const infoSection = document.createElement("section");
     const buttonSection = document.createElement("section");

     const goBackButton = document.createElement("button");

     const nameP = document.createElement("p");
     const nameStrong = document.createElement("strong");

     const emailP = document.createElement("p");
     const emailStrong = document.createElement("strong");

     const userName = objectCache.states.authContext.this_user_name;
     const userEmail = objectCache.states.authContext.this_user_email;


     header.id = "configuration_layout_header";

     goBackButton.id = "configuration_layout_header_go_back_button";

     nameP.id = "configuration_layout_header_name_p";
     nameStrong.id = "configuration_layout_header_name_strong";

     emailP.id = "configuration_layout_header_email_p";
     emailStrong.id = "configuration_layout_header_email_p";


     goBackButto.onclick = () => inicialScreen();


     goBackButton.textContent = "Back";

     nameP.textContent = "User name: ";
     nameStrong.textContent = userName;

     emailP.textContent = "User email: ";
     emailStrong.textContent = userEmail;


     nameP.appendChild(nameStrong);
     emailP.appendChild(emailStrong);

     buttonSection.appendChild(goBackButton);

     infoSection.appendChild(nameP);
     infoSection.appendChild(emailP);

     header.appendChild(buttonSection);
     header.appendChild(infoSection);

     return header;

 }

 export default headerToConfigurationLayout;
