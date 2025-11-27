import pool from "../../database/database.js";
import error from "../error.js";


 async function leaveGroup (message) {

     const { user_id, group_id } = message.payload;

     let data = null;

     let response = {
       message: "User now is out the group!",
       success: true,
       data: data,
       code: 107
     }

     const conn = await pool.getConnection();

     try {

       // Verifying if user exists

         let stmt = `
             SELECT id FROM users
             WHERE id = ?;
         `;

         let result = await conn.query(stmt, [user_id]);

         if (!result?.length) {

             return error("User not found", 205);

         }

       // Verifying if group exists

         stmt = `
             SELECT id FROM groups
             WHERE id = ?;
         `;

         result = await conn.query(stmt, [group_id]);

         if (!result?.length) {

             return error("Group not found", 205);

         }

         // Verifying if user is in the group

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ? AND user_id = ?;
         `;

         result = await conn.query(stmt, [group_id, user_id]);

         if (!result?.length) {

             return error("User is not in the group!", 209);

         }

        // Verifying if there's more than one user in the group

         stmt = `
             SELECT user_id, created_at FROM group_participants
             WHERE group_id = ?;
         `;

         result = await conn.query(stmt, [group_id]);

         if (result?.length > 1) {

           // Verifying if user is admin

             stmt = `
                 SELECT user_id FROM group_participants
                 WHERE group_id = ? AND user_id = ?
                 AND role = 'admin';
             `;

             let result2 = await conn.query(stmt, [group_id, user_id]);

             // Verifying if there's no more admin in the group

             stmt = `
                 SELECT user_id FROM group_participants
                 WHERE group_id = ? AND user_id != ?
                 AND role = 'admin';
             `;

             let result3 = await conn.query(stmt, [group_id, user_id]);


           // If there's more than one user in the group and there's no more admin, pass admin role to the next oldest user
             if (result2?.length && !result3?.length) {

                 let oldestUser = {user_id: 0, created_at: Number.MAX_VALUE}; // Support object

                 for (const user of result) { //result here is the same as when it verified if there's more than one user in the group

                   // Don't count the leaving (this) user
                     if (user.user_id === userId) continue;


                   // User now is older than oldestUser variable
                     if (user.created_at < oldestUser.created_at) {

                         oldestUser = user;

                     }

                 }

                 stmt = `
                     UPDATE group_participants
                     SET role = 'admin'
                     WHERE group_id = ? AND user_id = ?;
                 `;

                 await conn.query(stmt, [group_id, oldestUser.user_id]);

             }

         }

       // Taking user from group

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

 export default leaveGroup;
