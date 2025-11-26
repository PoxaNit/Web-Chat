import pool from "../../database/database.js";
import error from "../error.js";

async function changeMessageStatus(message) {

  const { message_id, user_id, status } = message.payload;

  let response = {
    message: "Message status updated!",
    success: true,
    data: { message_id: message_id, content: null},
    code: 100
  };

  const conn = await pool.getConnection();

  try {

    let stmt = `SELECT content FROM messages WHERE id = ?`;
    const message = await conn.query(stmt, [message_id]);
    if (!messages?.length) return error("Message not found", 202);

    stmt = `SELECT id FROM users WHERE id = ?`;
    let result = await conn.query(stmt, [user_id]);
    if (!result?.length) return error("User not found", 202);

    if (!(status === "delivered" || status === "read")) {
      return error("Status not allowed", 201);
    }

    stmt = `
      SELECT id FROM message_status
      WHERE message_id = ? AND user_id = ?
    `;
    result = await conn.query(stmt, [message_id, user_id]);
    if (!result?.length) return error("Message status not found", 202);

    stmt = `
      UPDATE message_status SET status = ?
      WHERE message_id = ? AND user_id = ?
    `;
    await conn.query(stmt, [status, message_id, user_id]);

    response.data.content = message[0].content;

    return response;

  } catch (err) {
    console.log("Error:", err);
    return error("Internal server error", 301);

  } finally {
    await conn.release();
  }
}

export default changeMessageStatus;
