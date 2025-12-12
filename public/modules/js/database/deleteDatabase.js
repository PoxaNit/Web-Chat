setTimeout(() => console.log("deleting database..."), 5000)

 function deleteDatabase (name) {

     return new Promise((res, rej) => {

         const DBDeleteRequest = window.indexedDB.deleteDatabase(name);

         DBDeleteRequest.onerror = (event) => {

             rej(event.target.error);

         };

         DBDeleteRequest.onsuccess = (event) => {

             res("Database deleted successfully");

         };

         DBDeleteRequest.onblocked = (event) => {

             rej("Database deletion blocked; please close all other tabs/windows using this database.");

         };

     })
 }

 export default deleteDatabase;
