import storageHandler from "../../database/storageHandler/storageHandler.js";
import getUser from "../../workScripts/userScripts/eventSenders/getUser.js";
import addInternalEvent from "../../internalEvents/addEvents/addInternalEvents/addInternalEvent.js";

 async function getUserByEmail (email) {

     let users = storageHandler.getAllData("users").data;

     let correctUser = Object.values(users).filter(u => u.email === email)[0] ?? null;
console.log("correctUser (first): ", correctUser)

     if (!correctUser) { // Load the user from server and get again
console.log("executing inside if stmt...")
         async function fn () {

             users = storageHandler.getAllData("users").data;
        const last_user = users[117]
        console.log("var last_user: " + last_user)
        console.log("user 117: " + users[117])
        console.log("users: ", users)
        console.log("property descriptors of last user: ", Object.getOwnPropertyDescriptor(users, "117"))
        console.log("property descriptors of users: ", Object.getOwnPropertyDescriptors(users))

            for (const user in users) {
        console.log("user: ", user)

                if (user.email === email) {

                  correctUser = user;

                  break;

                }

            }

             return true;

         }
console.log("after function fn declaration")
         console.log("event function added: ", addInternalEvent("afterUserGot", fn, true));

    console.log("going to execute getUser")
         await getUser(email);
    console.log("after execute getUser")



     }
console.log("correctUser at the end: ", correctUser)
     return correctUser;

 }

 export default getUserByEmail;
