import pool from "../database/database.js";
import error from "../error.js";

 async function giveAdmin (adminUserId, userId, groupId) {

     let data = null;

     let response = {
       message: "User now is admin!",
       success: true,
       data: data,
       code: 200
     }

     const conn = await pool.getConnection();

     try {

       // Verifying if admin and user exists

         let stmt = `
             SELECT id FROM users
             WHERE id = ? OR id = ?;
         `;

         let result = await conn.query(stmt, [adminUserId, userId]);

         if (!(result?.length === 2)) {

             response = error("Admin or user not found", 404);

             throw new Error(response.message);

         }

       // Verifying if group exists

         stmt = `
             SELECT id FROM groups
             WHERE id = ?;
         `;

         result = await conn.query(stmt, [groupId]);

         if (!result?.length) {

             response = error("Group not found", 404);

             throw new Error(response.message);

         }


       // Verifying if admin is really admin

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ? AND user_id = ?
             AND role = 'admin';
         `;

         result = await conn.query(stmt, [groupId, adminUserId]);

         if (!result?.length) {

             response = error("User is not admin!", 400);

             throw new Error(response.message);

         }


       // Verifying if user is already admin

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ?
             AND user_id = ? AND role = 'admin';
         `;

         result = await conn.query(stmt, [groupId, userId]);

         if (result?.length) {

             response = error("User is already admin!", 400);

             throw new Error(response.message);

         }

       // Verifying if admin and user are in the group

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ?
             AND (user_id = ? OR user_id = ?);
         `;

         result = await conn.query(stmt, [groupId, adminUserId, userId]);

         if (!(result?.length === 2)) {

             response = error("Admin or user is not in the group", 400);

             throw new Error(response.message);

         }

       // Giving admin role to user

         stmt = `
             UPDATE group_participants
             SET role = 'admin'
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

 export default giveAdmin;
