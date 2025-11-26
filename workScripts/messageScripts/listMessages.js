import pool from "../../database/database.js";
import error from "../error.js";

async function listMessages(message) {

  const { conversation_id } = message.payload;

  let response = {
    message: "OK",
    success: true,
    data: { messages: [] },
    code: 100
  };

  const conn = await pool.getConnection();

  try {
    let stmt = `
      SELECT * FROM messages
      WHERE conversation_id = ?
    `;
    const messages = await conn.query(stmt, [conversation_id]);

    response.data.messages = messages;
    return response;

  } catch (err) {
    console.log("Error:", err);
    return error("Internal server error", 301);

  } finally {
    await conn.release();
  }
}

export default listMessages;
