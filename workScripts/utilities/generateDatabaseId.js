import { JSONFile              } from "lowdb/node"                 ;
import { Low                   } from "lowdb"                      ;
import { fileURLToPath         } from "node:url"                   ;
import   path                    from "node:path"                  ;



 const __filename = fileURLToPath(import.meta.url)                ;
 const __dirname  = path.dirname(__filename)                      ;
 const dbPath     = path.join(__dirname, "../../database/db.json");

 const adapter = new JSONFile(dbPath);
 const db      = new Low(adapter, {})                  ;

 await db.read()                                       ;


 async function generateDatabaseId (databaseField) {


     const field = db.data?.[databaseField];

     if (!field) return "field not found"          ; // Table not found

     if (!(field.length > 0)) return 1; // If there's no registers in the table, return id 1 to the first register.


     let supportId = 0                ;





 /*
   If the current id is not the not the same as the previous id + 1,
   so returns the previous id + 1. It builds an numeric order in the
   database.
 */


     for (const row of field) {

         if (row.id === (supportId + 1)) {

             supportId++;

             continue   ;

         } else break;

     }
console.log("function generateDatabaseId executed")
     return (supportId + 1)           ;


 }



 export default generateDatabaseId;
