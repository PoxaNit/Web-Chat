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





 async function createUser (dataObject) {


     verifyMandatoryFields(true); // Ensure all the necessary fields in the database are existent

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


     if (!newUserId) return                        ;

     const newLoginId = generateDatabaseId("login");

     if (!newLoginId) return                       ;


     const dateNow = Date().now()                  ;

     const hash = createHash("sha256")             ;

     hash.update(dataObject.password)              ;

     const passwordHash = hash.digest("hex")       ;

     /*Remeber to implement regex validation for email*/


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




     login.push(newLoginObject)                    ;


     users.push(newUser)                           ;

     await db.write()                              ;




     return response                               ; // Success for validation

 }






 export default createUser                          ;
