import storageHandler from "../../database/storageHandler/storageHandler.js";
import getUser from "../../workScripts/userScripts/eventSenders/getUser.js";

 async function getUserByEmail (email) {

     let users = Object.values(storageHandler.getAllData("users").data);

     let correctUser = users.filter(u => u.email === email)[0] ?? null;
console.log("correctUser (first): ", correctUser)
     if (!correctUser) { // Load the user from server and get again
console.log("going to execute getUser")
         await getUser(email);
console.log("after execute getUser")
console.log("all users: ", storageHandler.getAllData("users"))

     users = storageHandler.getAllData("users").data;
console.log("users: ", users, Object.values(users), Object.entries(users))
console.log("property descriptor of users: ", Object.getOwnPropertyDescriptor(users, "107"))
     for (const user in users) {
console.log("user: ", user)

         if (user.email === email) {
             correctUser = user;

             break;

         }

     }


console.log("correctUser (second): ", correctUser)

     }

     return correctUser;

 }

 export default getUserByEmail;
