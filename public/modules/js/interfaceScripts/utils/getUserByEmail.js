import { getAllData } from "../../database/storageHandler/storageHandler.js";

 function getUserByEmail (email) {

      const users = getAllData("users").data;

      for (const user of users) {

          if (user.email === email) {

              return user;

          }

      }

 }

 export default getUserByEmail;
