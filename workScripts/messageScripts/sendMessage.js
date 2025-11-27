import pool from "../../database/database.js";
import error from "../error.js";

async function sendMessage(message) {

  const { conversation_id, sender_id, content } = message.payload;

  let response = {
    message: "Message sent!",
    success: true,
    data: null,
    code: 100
  };

  if (!content) {
    return error("No content in message!", 201);
  }

  const dateNow = Date.now();
  const conn = await pool.getConnection();

  try {

    // Verifying user exists
    let stmt = `SELECT id FROM users WHERE id = ?`;
    let result = await conn.query(stmt, [sender_id]);

    if (!result?.length) return error("User sender not found", 202);

    // Verifying conversation exists
    stmt = `
      SELECT id, user1_id, user2_id, group_id, type
      FROM conversations WHERE id = ?;
    `;
    const conversation = await conn.query(stmt, [conversation_id]);

    if (!conversation?.length) return error("Conversation not found", 205);

    // Verifying if sender_id belongs to conversation
    if (conversation[0].type === "private" && (conversation[0].user1_id !== sender_id && conversation[0].user2_id !== sender_id)) {

        return error("Sender doesn't belong to conversation", 209);

    }

    // Creating message
    stmt = `
      INSERT INTO messages (
        created_at, updated_at, conversation_id, sender_id, content
      ) VALUES (?, ?, ?, ?, ?) RETURNING id;
    `;
    const message_id = await conn.query(stmt, [
      dateNow, dateNow, conversation_id, sender_id, content
    ]);

    // Creating message status entries
    if (conversation[0].type === "group") {

      stmt = `SELECT id FROM groups WHERE id = ?`;
      result = await conn.query(stmt, [conversation[0].group_id]);
      if (!result?.length) return error("Group not found", 205);

      stmt = `SELECT user_id FROM group_participants WHERE group_id = ?`;
      const users = await conn.query(stmt, [conversation[0].group_id]);
      if (!users?.length) return error("No users in group", 205);

      for (const user of users) {
        stmt = `
          INSERT INTO message_status (
            created_at, updated_at, message_id, user_id, status
          ) VALUES (?, ?, ?, ?, ?)
        `;
        await conn.query(stmt, [
          dateNow, dateNow, message_id[0].id, user.user_id,
          user.user_id === sender_id ? "read" : "sent"
        ]);
      }

    } else {

      const receiver_id =
        sender_id === conversation[0].user1_id
          ? conversation[0].user2_id
          : conversation[0].user1_id;

      stmt = `
        INSERT INTO message_status (
          created_at, updated_at, message_id, user_id, status
        ) VALUES (?, ?, ?, ?, ?)
      `;
      await conn.query(stmt, [
        dateNow, dateNow, message_id[0].id, receiver_id, "sent"
      ]);

      await conn.query(stmt, [
        dateNow, dateNow, message_id[0].id, sender_id, "read"
      ]);
    }

    response.data = {
      message_id: message_id[0].id,
      sender_id: sender_id,
      conversation_id: conversation_id,
      content: content
    };

    return response;

  } catch (err) {
    console.log("Error:", err);
    return error("Internal server error", 301);

  } finally {
    await conn.release();
  }
}

export default sendMessage;
