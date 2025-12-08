import conversationsList from "../lists/conversationsList.js";
import headerToInicialScreen from "../headers/headerToInicialScreen.js";
import objectCache from "./conversationLayout.js";
console.log("executing inicialScreen")

//const root = document.getElementById("root");


 function inicialScreen () {
console.log("executing inicialScreen")
     root.replaceChildren();

     const header = document.createElement("header");

     const main = document.createElement("main");

     const footer = document.createElement("footer");

     header.id = "inicial_screen_header";
     main.id = "inicial_screen_main";
     footer.id = "inicial_screen_footer";

     header.appendChild(headerToInicialScreen());

     main.appendChild(conversationsList());

     root.appendChild(header);

     root.appendChild(main);

     root.appendChild(footer);


 }

 export default inicialScreen;
