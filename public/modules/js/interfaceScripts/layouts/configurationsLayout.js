import headerToConfigurationsLayout from "../headers/headerToConfigurationsLayout.js";
import mainToConfigurationsLayout from "../mains/mainToConfigurationsLayout.js";

 function configurationLayout () {

     const root = document.getElementById("root");

     root.replaceChildren();

     root.appendChild(headerToConfigurationsLayout());

     root.appendChild(mainToConfigurationsLayout())

 }

 export default configurationLayout;
