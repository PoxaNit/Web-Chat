import { readFile }      from "node:fs/promises";
import { glob     }      from "glob"            ;
import { fileURLToPath } from "node:url"        ;
import   path            from "node:path"       ;
import   pool            from "../database.js"  ;


 const __filename = fileURLToPath(import.meta.url)            ;
 const __dirname  = path.dirname(__filename)                  ;
 const filesPath  = path.join(__dirname, "./data")




 /*

    NOTE:

      If a table is not existent, this script create it
      automatically to insert the data.


 */




 async function insertData () {


     console.log("Inserting data in the database...")  ;

     const files = await glob(filesPath + "/" + "*.json");

     const conn = await pool.getConnection();



     for (const file of files) {

         const data = await readFile(file, "utf8");
         const parsed = JSON.parse(data)          ;


         const tableName = file.split(".")[0]; // Following the convention to seeder names


         for (const dataToInsert of parsed) {
             try {

                 const fields = Object.keys(dataToInsert);

                 const values = Object.values(dataToInsert):

                 const command = `

                     INSERT INTO ${tableName} (${fields})
                     VALUES (${values})

                 `;

                 conn.query(command);

             } catch (e) {

                 if (e.code === "ER_NO_SUCH_")

             }

         }

     }



     console.log("DONE");

 }

 main();
