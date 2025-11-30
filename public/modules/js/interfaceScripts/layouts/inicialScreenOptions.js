import logoutUser from "../../../workScripts/userScripts/eventSenders/logoutUser.js";
import inicialScreen from "./inicialScreen.js";

const root = document.getElementById("root");

 function inicialScreenOptions () {

     root.replaceChildren();

     const div = document.createElement("div");

     const goBackButton = document.createElement("button");

     const logoutButton = document.createElement("button");


     div.id = "inicial_screen_options_div";

     goBackButton.id = "inicial_screen_options_go_back_button";

     logoutButton.id = "logout_button";


     goBackButton.onclick = inicialScreen();
     logoutButton.onclick = () => logoutUser();

 }

 export default inicialScreenOptions;
