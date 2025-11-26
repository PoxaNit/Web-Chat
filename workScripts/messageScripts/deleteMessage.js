import pool from "../../database/database.js";
import error from "../error.js";

async function deleteMessage(message) {

  const { message_ids } = message.payload;

  if (!Array.isArray(message_ids) || !message_ids.length) {
    return error("No message IDs provided", 201);
  }

  let response = {
    message: "Message(s) deleted!",
    success: true,
    data: null,
    code: 100
  };

  const conn = await pool.getConnection();

  try {
    let stmt = `SELECT id FROM messages WHERE id IN (?)`;
    let result = await conn.query(stmt, [message_ids]);

    if (result.length !== message_ids.length) {
      return error("One or more messages not found", 202);
    }

    stmt = `DELETE FROM message_status WHERE message_id IN (?)`;
    await conn.query(stmt, [message_ids]);

    stmt = `DELETE FROM messages WHERE id IN (?)`;
    await conn.query(stmt, [message_ids]);
    return response;

  } catch (err) {
    console.log("Error:", err);
    return error("Internal server error", 301);

  } finally {
    await conn.release();
  }
}

export default deleteMessage;
