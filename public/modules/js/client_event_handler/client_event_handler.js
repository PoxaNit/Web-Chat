import userLoggedIn from "../workScripts/userScripts/eventReceivers/userLoggedIn.js";
import userLoggedOut from "../workScripts/userScripts/eventReceivers/userLoggedOut.js";
import userDeleted from "../workScripts/userScripts/eventReceivers/userDeleted.js";
import userGot from "../workScripts/userScripts/eventReceivers/userGot.js";

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

         case "user_got":

             await userGot(message);
             break;

     }

 }

 export default client_event_handler;
