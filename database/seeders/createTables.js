import { Low      } from "lowdb"           ;
import { JSONFile } from "lowdb/node"      ;

 const adapter = new JSONFile("../db.json");
 const db      = new Low(adapter, {})      ;
 await db.read()                           ;
 db.data     ||= db.data                   ;

 const tables = {
   users:    [],
   messages: [],
   groups:   []
 }


 // CREATE IF NOT EXISTS

 for (const table in tables) {

     if (!(db.data[table])) {

         db.data[table] = [];

         console.log(`Table Created: ${table}`)

     } else console.log(`Table already exists: ${table}`);

 }


 db.write();
