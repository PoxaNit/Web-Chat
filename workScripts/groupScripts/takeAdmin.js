import pool from "../../database/database.js";
import error from "../error.js";

 async function takeAdmin (message) {

     const { group_id, user_id } = message.payload;

     let data = null;

     let response = {
       message: "User now is not admin!",
       success: true,
       data: data,
       code: 107
     }

     const conn = await pool.getConnection();

     try {

       // Verifying if user admin exists

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
             WHERE group_id = ?
             AND user_id = ?;
         `;

         result = await conn.query(stmt, [group_id, user_id]);

         if (!(result?.length === 2)) {

             return error("User is not in the group", 209);

         }

       // Verifying if user is really admin

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ? AND user_id = ?
             AND role = 'admin';
         `;

         result = await conn.query(stmt, [group_id, user_id]);

         if (!result?.length) {

             return error("User is not admin!", 209);

         }



       // Verifying if there's more than one user in the group

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ? AND role = 'admin';
         `;

         result = await conn.query(stmt, [group_id]);


         if (result?.length === 1) {

             return error("Cannot remove role admin from user: last admin in the group", 209)

         }

       // Taking admin role from user

         stmt = `
             UPDATE group_participants
             SET role = 'user'
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

 export default takeAdmin;
