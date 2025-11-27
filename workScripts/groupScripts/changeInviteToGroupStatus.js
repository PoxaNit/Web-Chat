import pool from "../../database/database.js";
import error from "../error.js";

 async function changeInviteToGroupStatus (message) {

     const { invite_to_group_id, status } = message.payload;

     let data = null;

     let response = {
       message: "UPDATED!",
       success: true,
       data: data,
       code: 107
     }

     const dateNow = Date.now();

     const conn = await pool.getConnection();

     try {

       // Check if invite exists

         let stmt = `
             SELECT id FROM invites_to_group
             WHERE id = ?;
         `;

         let result = await conn.query(stmt, [invite_to_group_id]);

         if (!result?.length) {

             return error("Invite not found", 205);

         }

       // Updating invite status

         stmt = `
             UPDATE invites_to_group
             SET updated_at = ?, status = ?
             WHERE id = ?;
         `;

         await conn.query(stmt, [
           dateNow,
           status,
           invite_to_group_id
         ]);

         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

         return response;

     } finally {

         await conn.release();

     }

 }

 export default changeInviteToGroupStatus;
