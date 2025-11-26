import pool from "../database/database.js";
import error from "../error.js";

 async function logout (message) {

     const { user_id } = message.payload;

     let data = {
       user_id: user_id,
       is_logged: false
     };

     let response = {
       message: "User is now logged out!",
       success: true,
       data: data,
       code: 102
     };

     const conn = await pool.getConnection();

     try {

         // Verify if user not exists

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [user_id]);

         if (!result?.length) { // User not exists

             return error("User not found", 205);

         }


         // Verify if user is already logged out

         stmt = `
             SELECT is_logged FROM logins WHERE user_id = ?;
         `;

         result = await conn.query(stmt, [user_id]);

         if (!result?.length) {

             return error("User is already logged out!", 209);

         }

         stmt = `
             UPDATE logins SET is_logged = 0 WHERE user_id = ?;
         `;

         await conn.query(stmt, [user_id]);

         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

         return response;

     } finally {

         await conn.release();

     }

 }

 export default logout;
