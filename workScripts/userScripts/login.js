import pool from "../../database/database.js";
import error from "../error.js";

 async function login (message) {

     const { email, password } = message.payload;

     let data = {
       user_id: null,
       created_at: null,
       updated_at: null,
       name: null,
       email: email
     };

     let response = {
       message: "User is now logged in!",
       data: data,
       success: true,
       code: 102
     };

     const conn = await pool.getConnection();

     try {

       // Verify if user exists

         let stmt = `
             SELECT
             id, created_at, updated_at, name
             FROM users WHERE email = ?;
         `;

         let user = await conn.query(stmt, [email]);

         if (!user?.length) {

             return error("User not found", 205);

         }

        // Verifying if user is already logged in
         stmt = `
             SELECT is_logged FROM logins WHERE user_id = ?;
         `;

         let result = await conn.query(stmt, [user[0].id]);

         if (result?.[0]?.is_logged) {

             return error("User is already logged in!", 209);

         }

         stmt = `

             UPDATE logins SET is_logged = 1 WHERE user_id = ?;

         `;


         await conn.query(stmt, [user[0].id]);

         response.data.user_id = user[0].id;
         response.data.created_at = parseInt(user[0].created_at);
         response.data.updated_at = parseInt(user[0].updated_at);
         response.data.name = user[0].name;
console.log(response)
         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

         return response;

     } finally {

         await conn.release();

     }

 }

 export default login;
