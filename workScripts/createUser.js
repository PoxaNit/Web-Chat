import   generateDatabaseId       from "./utilities/generateDatabaseId.js";
import { JSONFile              }  from "lowdb/node"                       ;
import { Low                   }  from "lowdb"                            ;
import   verifyMandatoryFields    from "./verifyMandatoryFields.js"       ;

 const {
   createHash
 } = await import("node:crypto")                                   ;




 const adapter = new JSONFile("../database/db.json");
 const db      = new Low(adapter, {})               ;
 await db.read()                                    ;


// Ensure all the necessary fields in the database are existent
 verifyMandatoryFields("../database/seeders", true, true) ;



 async function createUser (dataObject) {

  // Default values

     let data = {
       user: dataObject
     }

     let response = {
       "message": "User created!",
       "success": true,
       "data"   : data,
       "code"   : 201
     }






     const users = db.data?.users                  ;


     const logins = db.data?.login                 ;


     const newUserId = generateDatabaseId("users") ;


     const newLoginId = generateDatabaseId("login");

     if (!newLoginId) {


         return newLoginId

     }


     const dateNow = Date.now()                    ;

     const hash = createHash("sha256")             ;

     hash.update("" + dataObject.password)         ;

     const passwordHash = hash.digest("hex")       ;

     const regex = new RegExp("[a-zA-Z0-9.]+@[a-z]\.com");


return "test"

     if (!regex.exec(dataObject.email)) {

         response.message = "Invalid email!";
         response.success = false           ;
         response.data    = null            ;
         response.code    = 400             ;
return "test"

         return response                    ;

     }



     let newUser = {
       id        : newUserId,
       created_at: dateNow,
       updated_at: dateNow,
       name      : dataObject.name,
       email     : dataObject.email,
       password  : passwordHash
     }                                             ;

     const newLoginObject = {
       id        : newLoginId,
       created_at: dateNow,
       updates_at: dateNow,
       user_id   : newUserId,
       is_logged : false
     }




     logins.push(newLoginObject)                   ;


     users.push(newUser)                           ;

     await db.write()                              ;


return "test"

     return response                               ; // Success for validation

 }






 export default createUser                          ;
