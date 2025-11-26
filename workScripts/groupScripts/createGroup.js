import pool from "../database/database.js";
import error from "../error.js";

 async function createGroup (message) {

     const { creator_user_id, group_name } = message.payload;

     let data = null;

     let response = {
       message: "Group created!",
       data: data,
       success: true,
       code: 106
     }

     const dateNow = Date.now();

     const conn = await pool.getConnection();

     try {

       // Verify if user exists

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [creatorUserId]);

         if (!result?.length) {

             return error("User not found", 205);

         }


     // Creating group

         stmt = `
           INSERT INTO groups (
             created_at,
             updated_at,
             name,
             creator_user_id
           ) VALUES (?, ?, ?, ?) RETURNING id;
         `;

         const group_id = await conn.query(stmt, [
           dateNow,
           dateNow,
           group_name,
           creator_user_id
         ]);

    // Creating record in group_participants

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
	   group_id[0].id,
	   creator_user_id,
	   "admin"
	 ]);

         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err)

         return response;

     } finally {

         await conn.release();

     }

 }

 export default createGroup;
