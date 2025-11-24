import pool from "../database/database.js";

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

             repsonse.message = "User not found";
             response.success = false;
             response.data = null;
             response.code = 400;

             throw null;

         }

       // Verify if group already exists

         stmt = `
             SELECT id FROM groups WHERE id = ?;
         `;

         result = await conn.query(stmt, [groupId]);

         if (!result?.length) {

             repsonse.message = "User not found";
             response.success = false;
             response.data = null;
             response.code = 400;

             throw null;

         }

         stmt = `
           INSERT INTO groups (
             created_at,
             updated_at,
             name,
             creator_user_id
           ) VALUES (?, ?, ?, ?);
         `;

         await conn.query(stmt, [
           dateNow,
           dateNow,
           groupName,
           creatorUserId
         ]);

     } catch (err) {

         if (err?.code === "ER_NO_SUCH_TABLE") console.log(err.sqlMessage);

     } finally {

         await conn.release();

         return response;

     }

 }

 export default createGroup;
