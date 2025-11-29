import conversationsList from "./lists/conversationsList.js";
import headerToInicialScreen from "../headers/headerToInicialScreen.js";

const root = document.getElementById("root");



 function inicialScreen () {


     const header = document.createElement("header");

     const main = document.createElement("main");

     const footer = document.createElement("footer");

     main.id = "inicial_screen_main";

     header.appendChild(headerToInicialScreen());

     main.appendChild(conversationsList());

     root.appendChild(header);

     root.appendChild(main);

     root.appendChild(footer);


 }

 export default inicialScreen;
