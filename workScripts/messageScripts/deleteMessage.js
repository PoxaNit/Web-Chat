import pool from "../../database/database.js";
import error from "../error.js";

async function deleteMessage(messageIds = []) {

    let response = {
      message: "Message(s) deleted!",
      success: true,
      data: null,
      code: 200
    };

    if (!Array.isArray(messageIds) || !messageIds.length) {
      return error("No message IDs provided", 400);
    }

    const conn = await pool.getConnection();

    try {
        // Check messages exist
        let stmt = `
            SELECT id FROM messages
            WHERE id IN (?)
        `;

        let result = await conn.query(stmt, [messageIds]);

        if (result.length !== messageIds.length) {
            response = error("One or more messages not found", 404);
            throw new Error(response.message);
        }

        // Delete message statuses
        stmt = `DELETE FROM message_status WHERE message_id IN (?)`;
        await conn.query(stmt, [messageIds]);

        // Delete messages
        stmt = `DELETE FROM messages WHERE id IN (?)`;
        await conn.query(stmt, [messageIds]);

    } catch (err) {
        console.log("Error:", err);

    } finally {
        await conn.release();
        return response;
    }
}

export default deleteMessage;
