import pool from "../../database/database.js";
import error from "../error.js";

 async function changeMessageStatus (
   messageId,
   userId,
   status // delivered | read
 ) {

     let data = null;

     let response = {
       message: "Message status updated!",
       success: true,
       data: data,
       code: 200
     }

     const conn = await pool.getConnection();

     try {

       // Verifying if message exists

         let stmt = `
             SELECT id FROM messages WHERE id = ?;
         `;

         let result = await conn.query(stmt, [messageId]);

         if (!result?.length) {

             response = error("Message not found", 404);

             throw new Error(response.message);

         }

       // Verifying if user exists

         stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         result = await conn.query(stmt, [userId]);

         if (!result?.length) {

             response = error("User not found", 404);

             throw new Error(response.message);

         }


      // Verifying if status is allowed
         if (!(status === "delivered" || status === "read")) {

             response = error("Status not allowed!", 400);

             throw new Error(response.message);

         }

      // Verifying if message status exists

         stmt = `
             SELECT id FROM message_status
             WHERE message_id = ? AND user_id = ?;
         `;

         result = await conn.query(stmt, [messageId, userId]);

         if (!result?.length) {

             response = error("Message status not found for update!", 404);

             throw new Error(response.message);

         }

         stmt = `
             UPDATE message_status
             SET status = ?
             WHERE message_id = ? AND user_id = ?;
         `;

         await conn.query(stmt, [status, messageId, userId]);

     } catch (err) {

         console.log("Error: ", err);

     } finally {

         await conn.release();

         return response;

     }

 }

 export default changeMessageStatus;
