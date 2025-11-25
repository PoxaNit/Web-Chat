import pool from "../database/database.js";
import error from "../error.js";

 async function takeAdmin (adminUserId, admin2UserId, groupId) {

     let data = null;

     let response = {
       message: "User now is not admin!",
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

         let result = await conn.query(stmt, [adminUserId, admin2UserId]);

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

       // Verifying if admins are really admins

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ? AND (user_id = ? OR user_id = ?)
             AND role = 'admin';
         `;

         result = await conn.query(stmt, [groupId, adminUserId, admin2UserId]);

         if (!result?.length) {

             response = error("Some user is not admin!", 400);

             throw new Error(response.message);

         }


       // Verifying if admins are in the group

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ?
             AND (user_id = ? OR user_id = ?);
         `;

         result = await conn.query(stmt, [groupId, adminUserId, admin2UserId]);

         if (!(result?.length === 2)) {

             response = error("Admin or user is not in the group", 400);

             throw new Error(response.message);

         }

       // Verifying if there's more than one user in the group

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ? AND role = 'admin';
         `;

         result = await conn.query(stmt, [groupId]);


         if (result?.length === 1) {

             response = error("Cannot remove admin: last admin in the group", 400)

             throw new Error(response.message);

         }

       // Taking admin role from user

         stmt = `
             UPDATE group_participants
             SET role = 'user'
             WHERE group_id = ? AND user_id = ?;
         `;

         await conn.query(stmt, [groupId, admin2UserId]);

     } catch (err) {

         console.log("Error: ", err);

     } finally {

         await conn.release();

         return response;

     }

 }

 export default takeAdmin;
