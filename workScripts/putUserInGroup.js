import pool from "../database/database.js";

 function error (message, code) {

     return {message: message, success: false, data: null, code: code};

 }

 async function putUserInGroup (user_id, group_id) {

     let data = null;

     let response = {
       message: "User is now in the group!",
       success: true,
       data: data,
       code: 200
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

             response = error("User not found", 400);

             throw new Error(response.message);

         }

         // Verifying if group exists

         stmt = `
             SELECT id FROM groups WHERE id = ?;
         `;

         result = await conn.query(stmt, [group_id]);

         if (!result?.length) {

             response = error("Group not found", 400);

             throw new Error(response.message);

         }


       // Verifying if user is already in the group

         stmt = `
             SELECT user_id FROM group_participants
             WHERE group_id = ? AND user_id = ?;
         `;

         result = await conn.query(stmt, [user_id, group_id]);

         if (result?.length) {

             response = error("User is already in the group");

             throw new Error(response.message);

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

     } catch (err) {

         console.log("Error: ", err);

     } finally {

          await conn.release();

          return response;

     }

 }

 export default putUserInGroup;
