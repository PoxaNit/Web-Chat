import pool from "../../database/database.js";
import error from "../error.js";

 async function listConversations (userId) {

   // It returns all co versations that user is in

     let data = {
       conversations: []
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

             response = error("User not found!", 404);

             throw new Error(response.message);

         }

       // Getting all conversations user is in

         stmt = `
             SELECT * FROM conversations
             WHERE user1_id = ? OR user2_id = ?;
         `;

         const conversations = await conn.query(stmt, [userId]);

       // If no conversations found, client take care about this


       // Creating the data to send

         for (const conversation of conversations) {

           // Getting not read messages from THIS conversation

             stmt = `
                 SELECT * FROM messages
                 INNER JOIN message_status
                 ON messages.id = message_status.message_id
                 WHERE message_status.user_id = ?
                 AND message.conversation_id = ?
                 AND message_status.status != 'read';
             `;

             const not_read_messages = await conn.query(stmt, [userId, conversation.id]);


         // Getting the last message

             stmt = `
                 SELECT * FROM messages
                 INNER JOIN message_status
                 ON messages.id = message_status.message_id
                 WHERE message_status.user_id = ?
                 AND message.conversation_id = ?
                 AND message_status.status != 'read'
                 ORDER BY message.created_at DESC
                 LIMIT 1;
             `;

             const last_message = await conn.query(stmt, [userId, conversation.id]);


             let dataToPush = {
               ...conversation,
               not_read_messages: not_read_messages,
               last_message: last_message[0]
             }

             response.data.conversations.push(dataToPush);

         }

     } catch (err) {

         console.log("Error: ", err);

     } finally {

         await conn.release();

         return response;

     }

 }

 export default listConversations
