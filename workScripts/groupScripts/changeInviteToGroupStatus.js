import pool from "../../database/database.js";
import error from "../error.js";

 async function changeInviteToGroupStatus (inviteToGroupId, status) {

     let data = null;

     let response = {
       message: "OK",
       success: true,
       data: data,
       code: 200
     }

     const dateNow = Date.now();

     const conn = await pool.getConnection();

     try {

       // Check if invite exists

         let stmt = `
             SELECT id FROM invites_to_group
             WHERE id = ?;
         `;

         let result = await conn.query(stmt, [inviteToGroupId]);

         if (!result?.length) {

             response = error("Invite not found", 404);

             throw new Error(response.message);

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
           inviteToGroupId
         ]);

     } catch (err) {

         console.log("Error: ", err);

     } finally {

         await conn.release();

         return response;

     }

 }

 export default changeInviteToGroupStatus;
