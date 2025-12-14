import storageHandler from "../../database/storageHandler/storageHandler.js";
import getUser from "../../workScripts/userScripts/eventSenders/getUser.js";

 async function getUserByEmail (email) {

     const users = Object.values(getAllData("users").data);

     let correctUser = users.filter(u => u.email === email)[0] ?? null;

     if (!correctUser) { // Now try to get from server

         correctUser = await getUser(email);

         if (!correctUser) return null;

         return correctUser;

     }

 }

 export default getUserByEmail;
