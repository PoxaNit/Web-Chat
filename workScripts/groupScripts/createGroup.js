import pool from "../database/database.js";

 function error (message, code) {

     return {message: message, success: false, data: null, code: code};

 }

 async function createGroup (creatorUserId, groupName) {

     let data = null;

     let response = {
       message: "Group created!",
       data: data,
       success: true,
       code: 200
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

             response = error("User not found", 400);

             throw new Error(response.message);

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
           groupName,
           creatorUserId
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
	   creatorUserId,
	   "admin"
	 ]);

     } catch (err) {

         console.log("Error: ", err)

     } finally {

         await conn.release();

         return response;

     }

 }

 export default createGroup;
