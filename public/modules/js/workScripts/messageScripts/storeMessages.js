import openDb from "../../database.js";

 async function storeMessages (arrayOfMessageObjects) {

     const db = await openDb();

     const transaction = db.transaction("messages", "readwrite");

     const messages = transaction.objectStore("messages");

     for (const message of arrayOfMessageObjects) {

         const request = messages.add(message);

     }

     return new Promise((res, rej) => {

         transaction.onerror = e => rej(e.target.error);

         transaction.oncomplete = e => res();

     });

 }

 export default storeMessages;
