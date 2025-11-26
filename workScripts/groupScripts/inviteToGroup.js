import pool from "../../database/database.js";
import error from "../error.js";

 async function inviteToGroup (inviterId, invitedId, groupId) {

     let data = null;

     let response = {
       message: "Invite sent!",
       success: true,
       data: data,
       code: 200
     }

     const dateNow = Date.now();

     const conn = await pool.getConnection();

     try {

       // Vrifying if users exists

         let stmt = `
             SELECT id FROM users
             WHERE id = ? OR id = ?;
         `;

         let result = await conn.query(stmt, [inviterId, invitedId]);

         if (result?.length !== 2) {

             response = error("Some user not found", 404);

             throw new Error(response.message);

         }

       // Vrifying if group exists

         let stmt = `
             SELECT id FROM group
             WHERE id = ?;
         `;

         let result = await conn.query(stmt, [groupId]);

         if (!result?.length) {

             response = error("Group not found", 404);

             throw new Error(response.message);

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
           groupId,
           inviterId,
           invitedId,
           "sent"
         ]);

     } catch (err) {

         console.log("Error: ", err);

     } finally {

         await conn.release();

         return response;

     }

 }
