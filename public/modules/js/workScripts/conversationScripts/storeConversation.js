import openDb from "../../database/database.js";
import storeMessages from "../messageScripts/storeMessages.js";

 async function storeConversations (arrayOfConversationObjects) {

     const db = await openDb();

     const transaction = db.transaction("conversations", "readwrite");

     const conversations = transaction.objectStore("conversations");

     for (const conversation of arrayOfConversationObjects) {

         const {
           id,
           user1_id,
           user2_id,
           group_id,
           type,
           last_message
         } = conversation;

         const objectToAdd = {
           id,
           user1_id,
           user2_id,
           group_id,
           type,
           last_message
         };

         const request = conversations.add(objectToAdd);

         request.onerror = e => console.log(e.target.error);

         request.onsuccess = e => {

             storeMessages(conversations.not_read_messages);

         }

     }

     return new Promise((res, rej) => {

         transaction.onerror = e => rej(e.target.error);

         transaction.oncomplete = e => res();

     });

 }

 export default storeConversations;
