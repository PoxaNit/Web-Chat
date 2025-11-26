import pool from "../../database/database.js";
import error from "../error.js";

 async function sendMessage (
   conversationId,
   senderId,
   content
 ) {

     let data = null;

     let response = {
       message: "Messwge sent!",
       success: true,
       data: data,
       code: 200
     }

     if (!content) {

         response = error("No content in message!", 400);

         throw new Error(response.message);
     }

     const dateNow = Date.now();

     const conn = await pool.getConnection();

     try {

       // Verifying if user sender exists

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [senderId]);

         if (!result?.length) {

             response = error("User sender not found", 404);

             throw new Error(response.message);

         }

       // Verifying if conversation exists

         stmt = `
             SELECT id, user1_id, user2_id, group_id, type FROM conversations
             WHERE id = ?;
         `;

         const conversation = await conn.query(stmt, [conversationId]);

         if (!conversation?.length) {

             response = error("Conversation not found!", 404);

             throw new Error(response.message);

         }

       // Creating the message

         stmt = `
             INSERT INTO messages (
               created_at,
               updated_at,
               conversation_id,
               sender_id,
               content
             ) VALUES (?, ?, ?, ?, ?) RETURNING id;
         `;

         const message_id = await conn.query(stmt, [
           dateNow,
           dateNow,
           conversationId,
           senderId,
           content
         ]);


       // Creating message status for users

         if (conversation[0].type === "group") {

           // Verifying if group exists

             stmt = `
                 SELECT id FROM groups WHERE id = ?;
             `;

             result = await conn.query(stmt, [conversation[0]?.group_id]);

             if (!result?.length) {

                 response = error("Group not found", 404);

                 throw new Error(response.message);

             }


           // Getting all users from group

             stmt = `
                 SELECT user_id FROM group_participants
                 WHERE group_id = ?
             `;

             const users_from_group = await conn.query(stmt, [conversation[0].group_id]);

             if (!users_from_group?.length) {

                 response = error("No users found in group!", 404);

                 throw new Error(response.message);

             }


           // Creating message status for each user in group

             for (const user of users_from_group) {

                  stmt = `
                      INSERT INTO message_status (
                        created_at,
                        updated_at,
                        message_id,
                        user_id,
                        status
                      ) VALUES (?, ?, ?, ?, ?);
                  `;

                  await conn.query(stmt, [
                    dateNow,
                    dateNow,
                    message_id[0].id,
                    user.user_id,
                    user.user_id === senderId ? "read" : "sent"
                  ]);

             }

         } else if (conversation[0].type === "private") {

           // Getting the user receiver of message

             const receiver_id = senderId === conversation[0].user1_id ? conversation[0].user2_id : conversation[0].user1_id;

           // Creating message status to user receiver

             stmt = `
                 INSERT INTO message_status (
                   created_at,
                   updated_at,
                   message_id,
                   user_id,
                   status
                 ) VALUES (?, ?, ?, ?, ?);
             `;

             await conn.query(stmt, [
               dateNow,
               dateNow,
               message_id[0].id,
               receiver_id,
               "sent"
             ]);

           // Creating message status to user sender

             stmt = `
                 INSERT INTO message_status (
                   created_at,
                   updated_at,
                   message_id,
                   user_id,
                   status
                 ) VALUES (?, ?, ?, ?, ?);
             `;

             await conn.query(stmt, [
               dateNow,
               dateNow,
               message_id[0].id,
               senderId,
               "read"
             ]);

         }

     } catch (err) {

         console.log("Error: ", err);

     } finally {

         await conn.release();

         return response;

     }

 }
