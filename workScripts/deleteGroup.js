import pool from "../database/database.js";

 function error (message, code) {

     return {message: message, code: code, success: false, data: null};

 }

 async function deleteGroup (adminUserId, groupId) {

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

         let result = await conn.query(stmt, [adminUserId]);

         if (!result?.length) {

              response = error("Admin user not found", 400);

              throw new Error(response.message);

         }

         // Verifying if group exists

         stmt = `
             SELECT id FROM groups WHERE id = ?;
         `;

         result = await conn.query(stmt, [groupId]);

         if (!result?.length) {

             response = error("Group not found", 400);

             throw new Error(response.message);

         }

         // Verifying if user is really admin

         stmt = `
             SELECT id FROM group_participants
             WHERE group_id = ? AND user_id = ?
             AND role = 'admin';
         `;

         result = await conn.query(stmt, [groupId, adminUserId]);

         if (!result?.length) {

             response = error("User is not admin", 400);

             throw new Error(response.message);

         }


        // Deleting group

         stmt = `
             DELETE FROM group_participants
             WHERE group_id = ?;
         `;

         await conn.query(stmt, [groupId]);


         stmt = `
             DELETE FROM groups WHERE id = ?;
         `;

         await conn.query(stmt, [groupId]);



     } catch (err) {

         console.log("Error: ", err);

     } finally {

         await conn.release();

         return response;

     }

 }

 export default deleteGroup;
