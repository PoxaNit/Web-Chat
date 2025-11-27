import pool from "../../database/database.js";
import error from "../error.js";
import serverError from "../serverError.js";

async function changeMessagesStatus(message) {

 const messages = message.payload;

 let data = [

 ]

 let response = {
  message: "Messages status updated!",
  success: true,
  code: 100,
  data: data
 };

 const conn = await pool.getConnection();

 try {

  for (const item of messages) {

   const { message_id, user_id, status } = item;

   // Verifying if message exists

   let stmt = `SELECT conversation_id FROM messages WHERE id = ?`;
   const resultMsg = await conn.query(stmt, [message_id]);

   if (!resultMsg?.length) return error("Message not found", 202);


   // Verifying if user exists

   stmt = `SELECT id FROM users WHERE id = ?`;
   const resultUser = await conn.query(stmt, [user_id]);

   if (!resultUser?.length) return error("User not found", 202);

   // Validating message status

   if (!(status === "delivered" || status === "read")) {
    return error("Status not allowed", 201);
   }


   // Verifying if message status exists

   stmt = `
        SELECT id FROM message_status
        WHERE message_id = ? AND user_id = ?
      `;

   const resultStatus = await conn.query(stmt, [message_id, user_id]);

   if (!resultStatus?.length) return error("Message status not found", 202);


   // Changing the status

   stmt = `
        UPDATE message_status SET status = ?
        WHERE message_id = ? AND user_id = ?
      `;

   await conn.query(stmt, [status, message_id, user_id]);


   response.data.push({
    message_id: message_id,
    conversation_id: resultMsg[0].conversation_id,
    status: status
   });

  }

  return response;

 } catch (err) {

     console.log("Error: ", err);

  return serverError();

 } finally {

  await conn.release();
 }
}

export default changeMessagesStatus;
