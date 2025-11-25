import pool from "../database/database.js";

 function error (message, code) {

     return {message: message, code: code, success: false, data: null};

 }

 async function putUserOutGroup (
   adminUserId, // Who take out the user from group
   userId, // User who was kicked from the group
   groupId
 ) {

     let data = null;

     let response = {
       message: "User is now out the group!",
       success: true,
       data: data,
       code: 200
     }

     const conn = await pool.getConnection();

     try {

       // Verifyibg if users exists

         let stmt = `
             SELECT id FROM users WHERE id = ? OR id = ?;
         `;

         let result = await conn.query(stmt, [adminUserId, userId]);

         if (result?.length !== 2) {

             response = error("User not found", 400);

             throw new Error(response.message);

         }

       // Verifyibg if group exists

         stmt = `
             SELECT id FROM groups WHERE id = ?;
         `;

         result = await conn.query(stmt, [groupId]);

         if (!result?.length) {

             response = error("Group not found", 400);

             throw new Error(response.message);

         }

       // Verifying if user is in the group

         stmt = `
             SELECT id FROM group_participants
             WHERE group_id = ? AND user_id = ? OR user_id = ?;
         `;

         result = await conn.query(stmt, [groupId, userId, adminUserId]);

         if (result?.length !== 2) {

             response = error("User is not in the group!", 400);

             throw new Error(response.message);

         }

        // Verifying if user admin is really admin

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ?
             AND user_id = ?
             AND role = 'admin';
         `;

         result = await conn.query(stmt, [groupId, adminUserId]);

         if (!result?.length) {

             response = error("User is not admin!", 400);

             throw new Error(response.message);

         }

         // Taking off the user from the group

         stmt = `
             DELETE FROM group_participants
             WHERE group_id = ? AND user_id = ?;
         `;

         await conn.query(stmt, [groupId, userId]);

     } catch (err) {

         console.log("Error: ", err);

     } finally {

         await conn.release();

         return response;

     }

 }

 export default putUserOutGroup;
