import pool from "../database/database.js";

 async function logout (userId) {

     let data = {
         user: null
     };

     let response = {
       message: "User is now logged out!",
       success: true,
       data: data,
       code: 200
     };

     const conn = await pool.getConnection();

     try {

         // Verify if user not exists

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [userId]);

         if (!result?.[0]?.id) { // User not exists

             response.message = "User not found";
             response.success = false;
             response.data = null;
             response.code = 400;

             throw new Error(response.message);

         }


         // Verify if user is already logged out

         stmt = `
             SELECT is_logged FROM logins WHERE user_id = ?;
         `;

         result = await conn.query(stmt, [userId]);

         if (!result?.[0]?.is_logged) {

             response.message = "User is already logged out!";
             response.success = false;
             response.data = null;
             response.code = 400;

             throw null; // Just stop the code execution

         }

         stmt = `
             UPDATE logins SET is_logged = 0 WHERE user_id = ?;
         `;

         await conn.query(stmt, [userId]);

     } catch (err) {

         throw err;

     } finally {

         await conn.release();

         return response;

     }

 }

 export default logout;
