import { JSONFile } from "lowdb/node";
import { Low      } from "lowdb"     ;



 /*

    NOTE:

      table    = property in first scope in the database's json onject

      register = property inside the array that belongs to table

      example:

        database:

          {
            "a":[
                  {...}, {...}, ...
                ]
          }

      "a"   -> "table",
      {...} -> "register"

      It's used for better understanding and recognition

 */


 const adapter = new JSONFile("../../database/db.json");
 const db      = new Low(adapter, {})                  ;

 await db.read()                                       ;


 function generateDatabaseId (databaseTable) {

     const table = db?.[databaseTable];


     if (!table) return null          ; // Table not found

     if (!(table.length > 0)) return 1; // If there's no registers in the table, return id 1 to the first register.


     let supportId = 0                ;





 /*
   If the current id is not the not the same as the previous id + 1,
   so returns the previous id + 1. It builds an numeric order in the
   database.
 */


     for (const row of table) {

         if (row.id === (supportId + 1)) {

             supportId++;

             continue   ;

         } else break;

     }

     return (supportId + 1)           ;


 }



 export default generateDatabaseId;
