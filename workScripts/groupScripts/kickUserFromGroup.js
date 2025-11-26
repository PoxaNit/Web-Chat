import pool from "../database/database.js";
import error from "../error.js";


 async function kickUserFromGroup (message) {

     const { group_id, user_id, by_user_id } = message.payload;

     let data = null;

     let response = {
       message: "User is now out the group!",
       success: true,
       data: data,
       code: 107
     }

     const conn = await pool.getConnection();

     try {

       // Verifyibg if users exists

         let stmt = `
             SELECT id FROM users WHERE id = ? OR id = ?;
         `;

         let result = await conn.query(stmt, [by_user_id, user_id]);

         if (result?.length !== 2) {

             return error("User not found", 205);

         }

       // Verifying if group exists

         stmt = `
             SELECT id FROM groups WHERE id = ?;
         `;

         result = await conn.query(stmt, [group_id]);

         if (!result?.length) {

             return error("Group not found", 205);

         }

       // Verifying if user is in the group

         stmt = `
             SELECT id FROM group_participants
             WHERE group_id = ? AND (user_id = ? OR user_id = ?);
         `;

         result = await conn.query(stmt, [group_id, user_id, by_user_id]);

         if (result?.length !== 2) {

             return error("User is not in the group!", 209);

         }

        // Verifying if user admin is really admin

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ?
             AND user_id = ?
             AND role = 'admin';
         `;

         result = await conn.query(stmt, [group_id, by_user_id]);

         if (!result?.length) {

             return error("User is not admin!", 209);

         }

         // Taking off the user from the group

         stmt = `
             DELETE FROM group_participants
             WHERE group_id = ? AND user_id = ?;
         `;

         await conn.query(stmt, [group_id, user_id]);

         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

         return response;

     } finally {

         await conn.release();

     }

 }

 export default kickUserFromGroup;
