import pool from "../../database/database.js";
import error from "../error.js";

 async function listMessages (userId) {

     let data = {
       messages: []
     }

     let response = {
       message: "OK",
       success: true,
       data: data,
       code: 200
     }

     const conn = await pool.getConnection();

     try {

       // Verifying if user exists

        let stmt = `
            SELECT id FROM users WHERE id = ?;
        `;

        let result = await conn.query(stmt, [userId]);

        if (!result?.length) {

            response = error("User not found", 404);

            throw new Error(response.message);

        }

      // Getting all messages to user

        stmt = `
            SELECT *
            FROM messages
            INNER JOIN message_status
            ON messages.id = message_status.message_id
            WHERE message_status.user_id = ?;
        `;

        const messages = await conn.query(stmt, [userId]);

      // Including data to send

         response.data.messages = messages;

     } catch (err) {

         console.log("Error: ", err);

     } finally {

         await conn.release();

         return response;

     }

 }

 export default listMessages;
