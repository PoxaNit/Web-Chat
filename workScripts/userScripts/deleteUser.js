import pool from "../../database/database.js";
import error from "../error.js";

 async function deleteUser (message) {

     const { user_id } = message.payload;

     let data = null;

     let response = {
       message: "User deleted!",
       success: true,
       data: data,
       code: 108
     };

     const conn = await pool.getConnection();

     try {

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [user_id]);

         if (!result?.length) {

             return error("User not found", 205);

         }

         stmt = `
             DELETE FROM users WHERE id = ?;
         `;

         await conn.query(stmt, [userId]);

         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

         return response;

     } finally {

         await conn.release();

     }

 }

 export default deleteUser;
