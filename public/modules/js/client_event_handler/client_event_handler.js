import userLoggedIn from "../workScripts/userScripts/eventReceivers/userLoggedIn.js";
import userLoggedOut from "../workScripts/userScripts/eventReceivers/userLoggedOut.js";
import userDeleted from "../workScripts/userScripts/eventReceivers/userDeleted.js";

 async function client_event_handler (message) {

     switch (message.event) {

         case "user_logged_in":

             await userLoggedIn(message);
             break;

         case "user_logged_out":

             await userLoggedOut(message);
             break;

         case "user_deleted":

             await userDeleted(message);
             break;

     }

 }

 export default client_event_handler;
