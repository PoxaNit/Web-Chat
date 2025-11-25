import pool from "../database/database.js";

 function error (message, code) {

     return {message: message, code: code, success: false, data: null};

 }

 async function leaveGroup (userId, groupId) {

     let data = null;

     let response = {
       message: "User now is out the group!",
       success: true,
       data: data,
       code: 200
     }

     const conn = await pool.getConnection();

     try {

       // Verifying if user exists

         let stmt = `
             SELECT id FROM users
             WHERE id = ?;
         `;

         let result = await conn.query(stmt, [userId]);

         if (!result?.length) {

             response = error("User not found", 400);

             throw new Error(response.message);

         }

       // Verifying if group exists

         stmt = `
             SELECT id FROM groups
             WHERE id = ?;
         `;

         result = await conn.query(stmt, [groupId]);

         if (!result?.length) {

             response = error("Group not found", 400);

             throw new Error(response.message);

         }

         // Verifying if user is in the group

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ? AND user_id = ?;
         `;

         result = await conn.query(stmt, [groupId, userId]);

         if (!result?.length) {

             response = error("User is not in the group!", 400);

             throw new Error(response.message);

         }

        // Verifying if there's more than one user in the group

         stmt = `
             SELECT user_id, created_at FROM group_participants
             WHERE group_id = ?;
         `;

         result = await conn.query(stmt, [groupId]);

         if (result?.length > 1) {

           // Verifying if user is admin

             stmt = `
                 SELECT user_id FROM group_participants
                 WHERE group_id = ? AND user_id = ?
                 AND role = 'admin';
             `;

             let result2 = await conn.query(stmt, [groupId, userId]);

             // Verifying if there's no more admin in the group

             stmt = `
                 SELECT user_id FROM group_participants
                 WHERE group_id = ? AND user_id != ?
                 AND role = 'admin';
             `;

             let result3 = await conn.query(stmt, [groupId, userId]);


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

                 await conn.query(stmt, [groupId, oldestUser.user_id]);

             }

         }

       // Taking user from group

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

 export default leaveGroup;
