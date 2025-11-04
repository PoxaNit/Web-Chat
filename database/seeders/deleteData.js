import { JSONFile } from "lowdb/node";
import { Low      } from "lowdb"     ;


 async function main () {

     console.log("Deleting all data...")       ;

     const adapter = new JSONFile("../db.json");
     const db      = new Low(adapter, {})      ;
     await db.read()                           ;
     const tables = db.data                    ;

     let dataDeleted = false                   ;



     for (const table in tables) {

         dataDeleted = true;

         console.log(`Deleting data from table: ${table}`);

         db.data[table] = [];

     }

     db.write();

     if (dataDeleted) console.log("DONE");

     else console.log("No data found");

 }

 main();
