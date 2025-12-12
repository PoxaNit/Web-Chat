
 function createObjectStores (db) {
console.log("createObjectStores executing...")
    // [objectStore, keyPath]
    // Explicit, so it can change more easily in the future
     const objectStoresToCreate = [
       ["conversations", "id"],
       ["groups", "id"],
       ["messages", "id"],
       ["users", "id"],
       ["message_status", "id"],
       ["logins", "id"]
     ];

     for (const objectStore of objectStoresToCreate) {

         if (!db.objectStoreNames.contains(objectStore[0])) {

             db.createObjectStore(objectStore[0], {keyPath: objectStore[1]});

         }

     }

 }

 export default createObjectStores;
