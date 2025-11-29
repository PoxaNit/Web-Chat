import openDb from "../database.js";
import objectCache from "../cache/objectCache.js";


// In order to avoid write much code and also get the
// better performance that 'objectCache' provides by
// turning reading data faster than accessing it from
// IndexedDB each time, this interface provides a way
// to write just one code for database operations,
// and synchronize the database with the cache object.


// By convention to this application, all the data
// in any moment are identified by its id field.
// And also, the IndexedDB in this application
// uses the keyPath property, what means that
// when you want to update some data, you can just
// pass the data directly to this interface and
// it'll be updated by searching for the id of the
// provided data.


 let storageHandler = {

     getData (objectStoreName, indexOfData /*Or id of data*/) {

         return objectCache.getData(objectStoreName, indexOfData);

     },

     getAllData (objectStoreName) {

         return objectCache.getAllData(objectStoreName);

     },

     async addData (objectStoreName, data) {

         const db = await openDb();

         return new Promise((res, rej) => {

             const transaction = db.transaction(objectStoreName, "readwrite");

             const objectStore = transaction.objectStore(objectStoreName);

             const addRequest = objectStore.add(data);

             addRequest.onsuccess = () => {

                 res(objectCache.addData(objectStoreName, data.id, data));

             }

             addRequest.onerror = e => rej(e.target.error);

         });

     },




     async updateData (objectStoreName, data) {

         const db = await openDb();

         return new Promise((res, rej) => {

             const transaction = db.transaction(objectStoreName, "readwrite");

             const objectStore = transaction.objectStore(objectStoreName);

             const updateRequest = objectStore.put(data);

             updateRequest.onsuccess = () => {

                  res(objectCache.updateData(objectStoreName, data.id, data));

             }

             updateRequest.onerror = e => rej(e.target.error);

         });

     },




     async deleteData (objectStoreName, indexOfData /*Or id of data*/) {

         const db = await openDb();

         return new Promise((res, rej) => {

             const transaction = db.transaction(objectStoreName, "readwrite");

             const objectStore = transaction.objectStore(objectStoreName);

             const deleteRequest = objectStore.delete(indexOfData);

             deleteRequest.onsuccess = () => {

                 res(objectCache.deleteData(objectStoreName, indexOfData));

             }

             deleteRequest.onerror = e => rej(e.target.error);

         });


     },


     async putData (objectStoreName, data) {

         const db = await openDb();

         const transaction = db.transaction(objectStoreName, "readwrite");

         const objectStore = transaction.objectStore(objectStoreName);

         const putRequest = objectStore.put(objectStoreName, data);

         putRequest.onsuccess = e => {

             objectCache.putData(objectStoreName, data.id, data);

         }

     }

 }

 export default storageHandler;
