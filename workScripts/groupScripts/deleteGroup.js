import pool from "../database/database.js";
import error from "../error.js";


 async function deleteGroup (message) {

     const { admin_user_id, group_id } = message.payload;

     let data = null;

     let response = {
       message: "Group deleted!",
       success: true,
       data: data,
       code: 200
     }

     const conn = await pool.getConnection();

     try {

         // Verifying if admin exists

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [admin_user_id]);

         if (!result?.length) {

              return error("Admin user not found", 205);

         }

         // Verifying if group exists

         stmt = `
             SELECT id FROM groups WHERE id = ?;
         `;

         result = await conn.query(stmt, [group_id]);

         if (!result?.length) {

             return error("Group not found", 205);

         }

         // Verifying if user is really admin

         stmt = `
             SELECT id FROM group_participants
             WHERE group_id = ? AND user_id = ?
             AND role = 'admin';
         `;

         result = await conn.query(stmt, [group_id, admin_user_id]);

         if (!result?.length) {

             return error("User is not admin", 209);

         }


        // Deleting group

         stmt = `
             DELETE FROM group_participants
             WHERE group_id = ?;
         `;

         await conn.query(stmt, [group_id]);


         stmt = `
             DELETE FROM groups WHERE id = ?;
         `;

         await conn.query(stmt, [group_id]);

         return response;

     } catch (err) {

         console.log("Error: ", err);

         return response;

     } finally {

         await conn.release();

     }

 }

 export default deleteGroup;
