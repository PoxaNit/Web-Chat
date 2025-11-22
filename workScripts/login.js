import pool from "../database/database.js";

 async function login (userId) {

     let data = {
       login: null,
       user: null
     };

     let response = {
       message: "User is now logged in!",
       data: data,
       success: true,
       code: 200
     };

     const conn = await pool.getConnection();

     try {

       // Verify if user exists

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [userId]);

         if (!result?.[0]?.id) {

             response.message = "User not found!";
             response.success = false;
             response.code = 400;
             response.data = null;

             throw null; // Stop the code execution

         }

        // Verifying if user is already logged in
         stmt = `
             SELECT is_logged FROM logins WHERE user_id = ?;
         `;

         result = await conn.query(stmt, [userId]);

         if (result?.[0]?.is_logged) {

             response.message = "User is already logged in!";
             response.success = false;
             response.code = 400;
             response.data = null;

             throw null; // Stop the code execution

         }

         stmt = `

             UPDATE logins SET is_logged = 1 WHERE user_id = ?;

         `;


         await conn.query(stmt, [userId]);

     } catch (err) {

         throw err;

     } finally {

         await conn.release();

         return response;

     }

 }

 export default login;
