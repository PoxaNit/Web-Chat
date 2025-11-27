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

       // Getting all private conversations where user is in

         stmt = `
             SELECT * FROM conversations
             WHERE type = 'private' AND (user1_id = ? OR user2_id = ?);
         `;

         const conversations = await conn.query(stmt, [user_id, user_id]);

       // Getting group conversations where user is in

         stmt = `
             SELECT group_id FROM group_participants
             WHERE user_id = ?;
         `;

         const groups_user_belongs = await conn.query(stmt, [user_id]);

         let group_conversations = [];

         if (groups_user_belongs?.length) {

             for (const group of groups_user_belongs) {

              // Getting group by id
                 stmt = `
                     SELECT id FROM groups WHERE id = ?;
                 `;

                 const group_id = await conn.query(stmt, [group.group_id]);

              // Getting the conversations by group id

                 stmt = `
                     SELECT * FROM conversations
                     WHERE type = 'group' AND group_id = ?;
                 `;

                 const group_conversation = await conn.query(stmt, [group_id[0].id]);

                 group_conversations.push(group_conversation[0]);

             }

         }

       // If no conversations found, client take care about this

      // Merging private and group conversations

         let allConversations = [];

         if (conversations) {

             for (const conversation of conversations) {

                 allConversations.push(conversation);

             }

         }

         if (group_conversations) {

             for (const group_conversation of group_conversations) {

                 allConversations.push(group_conversation);

             }

         }

       // Creating the data to send

         for (const conversation of allConversations) {

           // Getting not read messages from THIS conversation

             stmt = `
                 SELECT
                 messages.id AS message_id,
                 messages.sender_id,
                 messages.conversation_id,
                 messages.content
                 FROM messages
                 LEFT JOIN message_status
                 ON messages.id = message_status.message_id
                 WHERE message_status.user_id = ?
                 AND messages.conversation_id = ?
                 AND message_status.status != 'read';
             `;

             const not_read_messages = await conn.query(stmt, [user_id, conversation.id]);


         // Getting the last message

             stmt = `
                 SELECT
                 messages.id AS message_id,
                 messages.conversation_id,
                 messages.sender_id,
                 messages.content
                 FROM messages
                 WHERE messages.conversation_id = ?
                 ORDER BY messages.created_at DESC
                 LIMIT 1;
             `;

             const last_message = await conn.query(stmt, [
               conversation.id
             ]);


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
