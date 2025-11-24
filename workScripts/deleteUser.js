import pool from "../database/database.js";

 async function deleteUser (userId) {

     let data = null;

     let response = {
       message: "User deleted!",
       success: true,
       data: data,
       code: 200
     };

     const conn = await pool.getConnection();

     try {

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [userId]);

         if (!result?.[0]?.id) {

             response.message = "User not found";
             response.success = false;
             response.data = null;
             response.code = 400;

             throw null;

         }

         stmt = `
             DELETE FROM users WHERE id = ?;
         `;

         await conn.query(stmt, [userId]);

     } catch (err) {

         throw err;

     } finally {

         await conn.release();

         return response;

     }

 }

 export default deleteUser;
