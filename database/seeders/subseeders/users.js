import { JSONFile } from "lowdb/node";
import { Low      } from "lowdb";
import { readFile } from "node:fs";

 async function main () {

     console.log("Inserting users...");

     const adapter = new JSONFile("../../db.json");
     const db      = new Low(adapter, {});

     await db.read();

     readFile("../data/users.json", "utf8", (error, data) => {

         if (error) throw error;

         db.data.users = data.toString();

         db.write();

     });


     console.log("DONE");

 }

 main();
