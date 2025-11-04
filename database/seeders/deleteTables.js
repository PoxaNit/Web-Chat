import { Low }      from "lowdb";
import { JSONFile } from "lowdb/node";

 /*
   This script has a main function so the program can easily stop by return command
 */

 async function main () {

     console.log("Deleting all tables...");

     const adapter = new JSONFile("../db.json");
     const db      = new Low(adapter, {});

     await db.read();

     const hasTables = Object.keys(db.data).length > 0;

     if (!hasTables) {

         console.log("No tables found");

         return;

     }

     for (const table in db.data) {

         console.log(`Deleting table: ${table}`);

     }

     db.data = {};

     db.write();

     console.log("DONE");

 }

 main();
