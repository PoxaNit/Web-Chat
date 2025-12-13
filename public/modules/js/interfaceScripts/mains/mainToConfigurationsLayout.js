import logoutUser from "../../workScripts/userScripts/eventSenders/logoutUser.js";
import deleteUser from "../../workScripts/userScripts/eventSenders/deleteUser.js";

 function mainToConfigurationsLayout () {

     const main = document.createElement("main");

     const logoutButton = document.createElement("button");

     const deleteAccountButton = document.createElement("button");


     main.id = "configuration_layout_main";

     logoutButton.id = "configuration_layout_main_logout_button";

     deleteAccountButton.id "configuration_layout_main_delete_account_button";


     logoutButton.textContent = "Logout";

     deleteAccountButton.textContent = "Delete Account";


     logoutButton.onclick = () => logoutUser();

     deleteAccountButton.onclick = () => deleteUser();


     main.appendChild(logoutButton);

     main.appendChild(deleteAccountButton);


     return main;

 }

 export default mainToConfigurationsLayout;
