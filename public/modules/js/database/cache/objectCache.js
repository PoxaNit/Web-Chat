
// It serves to increase reading data performance. When
// the app need to get some data, get it from this object
// is faster than get from the database directly. Each
// time the database's data is updated, this object also
// must be updated with the same data, so it can reflect
// the database for synchronism of data.

// Note:
//
// This is indexed by the id field of objectStore.
// It means: when accessing data, the field's name must
// be the id of the data being stored. You access the
// data you want by passing the id of that data.
//
// objectCache.objectStores[objectStoreName][indexOfData] = id of stored data.
//

// This object is alive during all the application life and
// serves as cache while the application runs.

 let objectCache = {


     errorCodes: [
       0, // success
       1, // not found
       2, // not allowed operation
       3  // required function parameter not present
     ],


// add data in a specified place in memory where still don't have data
    addData (objectStoreName, indexOfData, data) {

       this.checkParametersNotNull("addData", objectStoreName, indexOfData, data);

       if (!this.objectStoreExists(objectStoreName)) {

           const errorMessage = `Trying to add data in object cache: object store "${objectStoreName}" not found`;

           return this.error(errorMessage, 1);

       }

       if (this.checkIfDataExists(objectStoreName, indexOfData)) {

           const errorMessage = `Trying to add data in object cache: object store "${objectStoreName}": index "${indexOfData}": already is present. If what you want is to overwrite it, use the 'updateData' function instead`;

           return this.error(errorMessage, 2);

       }


       this.objectStores[objectStoreName][indexOfData.toString()] = data;

       return this.response();

   },









// get data from a specified place in memory where has data
    getData (objectStoreName, indexOfData) {

       this.checkParametersNotNull("getData", objectStoreName, indexOfData);

       if (!this.objectStoreExists(objectStoreName) || !this.checkIfDataExists(objectStoreName, indexOfData)) {

           const errorMessage = `Trying to get data in object cache: object store "${objectStoreName}": index "${indexOfData}": not found`;

           return this.error(errorMessage, 1);

       }

       const dataToReturn = this.objectStores[objectStoreName][indexOfData.toString()];

       return this.response({data: dataToReturn});

   },









// updates already existing data in the specified place in memory
    updateData (objectStoreName, indexOfData, data) {

       this.checkParametersNotNull("updateData", objectStoreName, indexOfData, data);

       if (!this.objectStoreExists(objectStoreName)) {

           const errorMessage = `Trying to update data in object cache: object store "${objectStoreName}" not found`;

           return this.error(errorMessage, 1);

       }

       if (!this.checkIfDataExists(objectStoreName, indexOfData)) {

           const errorMessage = `Trying to update data in object cache: object store "${objectStoreName}": index "${indexOfData}": not found`;

           return this.error(errorMessage, 1);

       }

       this.objectStores[objectStoreName][indexOfData.toString()] = data;

       return this.response();

   },







// delete existing data from the specified place in memory
    deleteData (objectStoreName, indexOfData) {

       this.checkParametersNotNull("deleteData", objectStoreName, indexOfData);

       if (!this.objectStoreExists(objectStoreName)) {

           const errorMessage = `Trying to delete data in object cache: object store "${objectStoreName}" not found`;

           return this.error(errorMessage, 1);

       }

       if (!this.checkIfDataExists(objectStoreName, indexOfData)) {

           const errorMessage = `Trying to delete data in object cache: object store "${objectStoreName}": index "${indexOfData}": not found`;

           return this.error(errorMessage, 1);

       }

       delete this.objectStores[objectStoreName][indexOfData.toString()];

       return this.response();

   },







// It's a merge of addData and updateData functions, where
// if data not exists, create it, and if does, overwrite it.
// For reasons of security, you have to prioritize to use
// addData and updateData functions for most cases.
    putData (objectStoreName, indexOfData, data) {

       this.checkParametersNotNull("putData", objectStoreName, indexOfData, data);

       if (!this.objectStoreExists(objectStoreName)) {

           const errorMessage = `Trying to put data in object cache: object store "${objectStoreName}": not found`;

           return this.error(errorMessage, 1);

       }

       this.objectStores[objectStoreName][indexOfData.toString()] = data;

       return this.response();

   },









// return an array of all the object stores that this object
// cache is storing
    getObjectStoreNames () {

       return this.response({data: Object.keys(this.objectStores)});

    },






// Verify if object store ecists in this object's objectStores property
    objectStoreExists (objectStoreName) {

        if (Object.keys(this.objectStores).includes(objectStoreName)) {

            return true;

        } else {

            return false;

        }

    },






// If this object's objectStores not includes some objectStore field,
// make it to include
    addObjectStoreIfNotExists (objectStoreName) {

        if (!this.objectStoreExists(objectStoreName)) {

            this.objectStores[objectStoreName] = {}; // Initialize it

        }

    },







// Checks if this object's functions's passed parameters or present
// Only this object's functions may use this
    checkParametersNotNull (functionName, ...parameters) {

       for (const parameter of parameters) {

           if (parameter === null || parameter === undefined) {

               return this.error(`Required fields not passed at function ${functionName}`, 3);

           }

       }

       return true; // Success

   },












// Checks if the object store followed by the index of data exists as data stored here
// Only this object's functions may access this function
    checkIfDataExists (objectStoreName, indexOfData) {

       this.checkParametersNotNull("checkIfDataExists", objectStoreName, indexOfData);

       if (typeof this.objectStores?.[objectStoreName]?.[indexOfData.toString()] === "object") {

           return true; // Success

       } else return false;

   },












// Return error response
// Only this object's functions may use this function
    error (errorMessage, errorCode) {

       return this.response({error: true, errorMessage: errorMessage, errorCode: errorCode, data: null});

   },








 // Only this object's functions may use this function
    response ({
     data,
     error = false,
     errorMessage = null,
     errorCode = 0
   }) {

       return {
         data: data,
         error: error,
         errorMessage: errorMessage,
         errorCode: errorCode
       }

   },








// All the data stored in this object
   objectStores: {}

 }

/*

   Example of expected structure:

     objectCache.objectStores: {
       <objectStoreName>: {
 same -> <indexOfData>: {
 ^-------- id: <int>,
           // rest of data here...
         }
       },
       messages: {
         "12": {
           id: 12,
           sender_id: 56,
           conversation_id: 7,
           content: "Yes bro, I saw you at the beach yesterday!"
         },
         "13": {
           id: 13,
           sender_id: 44,
           conversation_id: 7,
           content: "Oh, really?!"
         }
       },
       conversations: {
         "7": {
           id: 7,
           user1_id: 56,
           user2_id: 44,
           group_id: null,
           type: "private"
         }
       }
       ... etc
     }

*/


/*

 How to use:

  Example of adding data:

    import objectCache from "somePath";

    const dataToStore = {
      id: 12,
      sender_id: 56,
      conversation_id: 7,
      content: "Yes bro, I saw you at the beach yesterday!"
    }

    const objectStoreName = "messages";

    const indexOfData = dataToStore.id; // 12

    objectCache.addData(objectStoreName, indexOfData, dataToStore);

  Example of get data:

    const data = objectCache.getData(objectStoreName, indexOfData)

    //
    // Output: {
    //  id: 12,
    //  sender_id: 56,
    //  conversation_id: 7,
    //  content: "Yes bro, I saw you at the beach yesterday!"
    // }
    //
    }



  Example of updating data:

    const dataToUpdate = {
      id: 12,
      sender_id: 56,
      conversation_id: 7,
      content "Hi friend! I upated my message!"
    }

    objectCache.updateData(objectStoreName, indexOfData, dataToUpdate);

    const updatedData = objectCache.getData(objectStoreName, indexOfData);

    console.log(updatedData);

    // Output:
    // {
    //   id: 12,
    //   sender_id: 56,
    //   conversation_id: 7,
    //   content "Hi friend! I upated my message!"
    // }
    //


  Example of deleting data:

    const deletedData = objectCache.getData(objectStoreName, indexOfData);

    console.log(deletedData);

  //
  // Output:
  // {
  //   data: null,
  //   error: true,
  //   errorMessage: 'Trying to get data in object cache: object store "messages": index "12":  not found'
  // }


*/

 export default objectCache;
