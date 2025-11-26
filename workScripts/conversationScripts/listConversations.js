import pool from "../../database/database.js";
import error from "../error.js";

 async function listConversations (message) {

     const { user_id } = message.payload;

     let data = {
       conversations: []
     }

     let response = {
       message: "OK",
       success: true,
       data: data,
       code: 100
     }

     const conn = await pool.getConnection();

     try {

       // Verifying if user exists

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [user_id]);

         if (!result?.length) {

             return error("User not found!", 205);

         }

       // Getting all conversations where user is in

         stmt = `
             SELECT * FROM conversations
             WHERE user1_id = ? OR user2_id = ?;
         `;

         const conversations = await conn.query(stmt, [user_id, user_id]);

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

             const not_read_messages = await conn.query(stmt, [user_id, conversation.id]);


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

             const last_message = await conn.query(stmt, [user_id, conversation.id]);


             let dataToPush = {
               ...conversation,
               not_read_messages: not_read_messages,
               last_message: last_message[0]
             }

             response.data.conversations.push(dataToPush);

         }

         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

         return response;

     } finally {

         await conn.release();

     }

 }

 export default listConversations
