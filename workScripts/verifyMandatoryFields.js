import { JSONFile } from "lowdb/node"        ;
import { Low      } from "lowdb"             ;
import { exec     } from "node:child_process";

 const adapter = new JSONFile("../database/db.json");
 const db      = new Low(adapter, {})               ;
 await db.read()                                    ;


 async function verifyMandatoryFields (
   seeders_dir_path, // So this function can be called from anywhere
   makeFields = false, // In case of field is not present
   silent     = false // Let the caller to not deal with side effect output
 ) {

     const mandatoryFields = [
       "users",
       "login",
       "messages",
       "groups"
     ];

     let fieldsPresent = 0;

     for (const field of mandatoryFields) {

         let fieldIsPresent;

         for (const fieldInDb of Object.keys(db.data)) {

             if (field === fieldInDb) {

                 fieldIsPresent = true;
                 break                ;

             }

         }

         if (fieldIsPresent) {

             fieldsPresent++;

             continue       ;

         }

     }

     if (makeFields) {

         const command = `

           cd ${seeders_dir_path}
           node createTables.js

         `;

         exec(command, (error, stdout, stderr) => {

             if (error) throw error;

             if (!silent) {

                 console.log(stdout);

                 console.log(stderr);

             }


         });

         fieldsPresent = mandatoryFields.length;

     }

     if (fieldsPresent === mandatoryFields.length)
         return true;

     else
         return false;

 }

 export default verifyMandatoryFields;
