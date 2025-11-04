import { JSONFile } from "lowdb/node"      ;
import { Low      } from "lowdb"           ;
import { readFile } from "node:fs/promises";
import { glob     } from "glob"            ;




 /*

    NOTE:

      If a table is not existent, this script create it
      automatically to insert the data.


 */




 async function main () {




     console.log("Inserting data in the database...")   ;
     const adapter    = new JSONFile("../db.json")      ;
     const db         = new Low(adapter, {})            ;
     const files      = await glob("./data/" + "*.json");
     await db.read()                                    ;






     let noDataFound = true; // Temporary


     for (const file of files) {

         const data = await readFile(file, "utf8")         ;
         const parsed = JSON.parse(data)                   ;

       // Each subseeder is the table name with .json extension
         const tableName = file.split("/")[1].split(".")[0]; // expected: ["tableName", "json"]

         if (parsed.length > 0) {

             noDataFound = false                          ;
             console.log(`Filling table: ${tableName}`)   ;
             db.data[tableName] = data.replace(/\s+/g, ""); // Avoid any spaces and line breaks
             db.write()                                   ;

         }

     }


     if (noDataFound) {

         console.log("No data found.");

         return;

     }

     console.log("DONE");

 }

 main();
