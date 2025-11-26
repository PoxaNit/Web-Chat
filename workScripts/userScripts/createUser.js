import pool from "../../database/database.js";
import error from "../error.js";

 const {
   createHash
 } = await import("node:crypto")                                   ;



 async function createUser (message) {

     const { name, email, password } = message.payload;

     let data = {
       user: {
         name: name,
         email: email,
         id: null
       }
     }

     let response = {
       "message": "User created!",
       "success": true,
       "data"   : data,
       "code"   : 106
     }

     const conn = await pool.getConnection();



     const dateNow = Date.now()                    ;

     const hash = createHash("sha256")             ;

     hash.update("" + password);

     const passwordHash = hash.digest("hex")       ;

     const regex = /^[a-zA-Z0-9.]+@[a-z]+\.com$/;




     if (!regex.exec(email)) {

         return error("Invalid email!", 202);

     }


     try {


         let stmt = `
             SELECT id FROM users WHERE email = ?;
         `;

         let result = await conn.query(stmt, [email]);

         if (result?.length) {

             return error("User already exists", 209);

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

         await conn.query(stmt, [dateNow, dateNow, name, email, passwordHash]);


         stmt = `

             INSERT INTO logins (
               created_at,
               updated_at,
               user_id,
               is_logged
             ) VALUES (?, ?, ?, ?);

         `;

         await conn.query(stmt, [dateNow, dateNow, result[0].id, 0]);

         response.data.user.id = result[0].id;

         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

         return response;

     } finally {

         await conn.release();

     }

 }

 export default createUser;
