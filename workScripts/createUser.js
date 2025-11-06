import   generateDatabaseId   from "./utilities/generateDatabaseId";
import { JSONFile           } from "lowdb/node"                    ;
import { Low                } from "lowdb"                         ;




 const adapter = new JSONFile("../database/db.json");
 const db      = new Low(adapter, {})               ;
 await db.read()                                    ;





 async function createUser (dataObject) {

     const users = db?.users                  ;


     if (!users) return                       ;


     const newId = generateDatabaseId("users");


     if (!newId) return                       ;


     let newUser = {id: newId}                ;





     for (const property in dataObject) {

         newUser[property] = dataObject[property];

     }





     users.push(newUser)                      ;

     await db.write()                         ;

     return true                              ; // Success for validation

 }






 export default createUser                          ;
