import { fileURLToPath         } from "node:url"                         ;
import   path                    from "node:path"                        ;
import { readFile              } from "node:fs/promises";
import   pool                    from "../database/database.js";


 const {
   createHash
 } = await import("node:crypto")                                   ;


 // I've discovered late that LowDB sucks with multiple files
 // handling the same db


 const __filename = fileURLToPath(import.meta.url)  ;
 const __dirname  = path.dirname(__filename)        ;
 const dbPath     = path.resolve(__dirname, "../database/database.sqlite");




 async function createUser (dataObject) {

     const conn = await pool.getConnection();



  // Default values

     let data = {
       user: dataObject
     }

     let response = {
       "message": "User created!",
       "success": true,
       "data"   : data,
       "code"   : 201
     }




     const dateNow = Date.now()                    ;

     const hash = createHash("sha256")             ;

     hash.update("" + dataObject.password)         ;

     const passwordHash = hash.digest("hex")       ;

     const regex = /^[a-zA-Z0-9.]+@[a-z]+\.com$/;




     if (!regex.exec(dataObject.email)) {

         response.message = "Invalid email!";
         response.success = false           ;
         response.data    = null            ;
         response.code    = 400             ;


         return response                    ;

     }


     try {


         let stmt = `
             SELECT id FROM users WHERE email = ?;
         `;

         let result = await conn.query(stmt, [dataObject.email]);

         if (result?.length) {

             response.message = "User already exists!";
             response.success = false;
             response.code = 400;
             response.data =  null;

             throw null;

         }

         stmt = `

             INSERT INTO users
             (
               created_at,
               updated_at,
               name,
               email,
               password
             )
             VALUES (?, ?, ?, ?, ?);

         `;

         await conn.query(stmt, [dateNow, dateNow, dataObject.name, dataObject.email, passwordHash]);

         // Get the id of just created user

         stmt = `
             SELECT id FROM users WHERE email = ?;
         `;

         result = await conn.query(stmt, [dataObject.email]);

         stmt = `

             INSERT INTO logins (
               created_at,
               updated_at,
               user_id,
               is_logged
             ) VALUES (?, ?, ?, ?);

         `;

         await conn.query(stmt, [dateNow, dateNow, result[0].id, 0]);

     } catch (err) {

         if (err?.code === "ER_NO_SUCH_TABLE") {

             console.log(err.sqlMessage);

         }

         response.message = "Something worked wrong.";
         response.code = 500;
         response.data = null;
         response.succes = false;

     } finally {

         await conn.release();

         return response;

     }

 }

 export default createUser;
