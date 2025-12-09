alert("executing event handler")
import userLoggedIn from "../workScripts/userScripts/eventReceivers/userLoggedIn.js";

 async function client_event_handler (message) {

     switch (message.event) {

         case "user_logged_in":

             await userLoggedIn(message);
             break;

     }

 }

 export default client_event_handler;
