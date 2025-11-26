import pool from "../database/database.js";
import error from "../error.js";


 async function putUserInGroup (user_id, group_id) {

     const { user_id, group_id } = message.payload;

     let data = null;

     let response = {
       message: "User is now in the group!",
       success: true,
       data: data,
       code: 107
     }

     const dateNow = Date.now();

     const conn = await pool.getConnection();

     try {

         // Verifying if user exists

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [user_id]);

         if (!result?.length) {

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


       // Verifying if user is already in the group

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ? AND user_id = ?;
         `;

         result = await conn.query(stmt, [user_id, group_id]);

         if (result?.length) {

             return error("User is already in the group", 209);

         }

         // Putting the user in the group

         stmt = `
             INSERT INTO group_participants (
               created_at,
	       updated_at,
	       group_id,
    	       user_id,
	       role
             ) VALUES (?, ?, ?, ?, ?);
         `;

         await conn.query(stmt, [
	   dateNow,
	   dateNow,
	   group_id,
	   user_id,
	   "user"
         ]);

          return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

          return response;

     } finally {

          await conn.release();

     }

 }

 export default putUserInGroup;
