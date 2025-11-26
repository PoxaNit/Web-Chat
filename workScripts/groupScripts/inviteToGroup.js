import pool from "../../database/database.js";
import error from "../error.js";

 async function inviteToGroup (message) {

     const { inviter_id, invited_id, group_id } = message.payload;

     let data = null;

     let response = {
       message: "Invite sent!",
       success: true,
       data: data,
       code: 103
     }

     const dateNow = Date.now();

     const conn = await pool.getConnection();

     try {

       // Vrifying if users exists

         let stmt = `
             SELECT id FROM users
             WHERE id = ? OR id = ?;
         `;

         let result = await conn.query(stmt, [inviter_id, invited_id]);

         if (result?.length !== 2) {

             return error("Some user not found", 205);

         }

       // Vrifying if group exists

         let stmt = `
             SELECT id FROM group
             WHERE id = ?;
         `;

         let result = await conn.query(stmt, [group_id]);

         if (!result?.length) {

             return error("Group not found", 205);

         }

       // Creating the invite in the database

         stmt = `
             INSERT INTO invites_to_group (
               created_at,
               updated_at,
	       group_id,
	       inviter_id,
	       invited_id,
	       status
             ) VALUES (?, ?, ?, ?, ?, ?);
         `;

         await conn.query(stmt, [
           dateNow,
           dateNow,
           group_id,
           inviter_id,
           invited_id,
           "sent"
         ]);

         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

         return response;

     } finally {

         await conn.release();

     }

 }
