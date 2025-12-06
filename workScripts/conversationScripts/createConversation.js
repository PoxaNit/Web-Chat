import pool from "../../database/database.js";
import error from "../error.js";
import serverError from "../serverError.js";

 async function createConversation (message) {

     const {
       user1_id,
       user2_id,
       group_id,
       type
     } = message.payload;

     let data = {
       conversation_id: null,
       user1_id: user1_id,
       user2_id: user2_id,
       group_id: group_id,
       type: type
     }

     let response = {
       message: "Conversation created!",
       success: true,
       data: data,
       code: 106
     }

     const dateNow = Date.now();

     const conn = await pool.getConnection();

     try {

         if (type === "private") {

           // Verifying if users exists

             let stmt = `
                 SELECT id FROM users
                 WHERE id = ? OR id = ?;
             `;

             let result = await conn.query(stmt, [user1_id, user2_id]);

             if (result?.length !== 2) {

                 return error("User not found", 205);

             }

           // Verifying if these users already have a conversation

             stmt = `
                 SELECT id FROM conversations
                 WHERE (user1_id = ? AND user2_id = ?)
                 OR (user1_id = ? AND user2_id = ?);
             `;

             result = await conn.query(stmt, [
               user1_id,
               user2_id,
               user2_id,
               user1_id
             ]);

             if (result?.length) {

                 return error("Conversation already exists between users!", 209);

             }

         } else if (type === "group") {

           // Verifying if group exists

             let stmt = `
                 SELECT id FROM groups WHERE id = ?;
             `;

             let result = await conn.query(stmt, [group_id]);

             if (!result?.length) {

                 return error("Group not found", 205);

             }

           // Verifying if group conversation already exists

             stmt = `
               SELECT id FROM conversations
               WHERE group_id = ?;
             `;

             result = await conn.query(stmt, [group_id]);

             if (result?.length) {

                 return error("Group conversation already exists!", 209);

             }

         } else {

             return error("Type of conversation not allowed", 209);

         }

       // Creating conversation between users

         let stmt = `
             INSERT INTO conversations (
               created_at,
               updated_at,
               user1_id,
               user2_id,
               group_id,
               type
             ) VALUES (?, ?, ?, ?, ?, ?) RETURNING id;
         `;

         const convId = await conn.query(stmt, [
           dateNow,
           dateNow,
           user1_id,
           user2_id,
           group_id,
           type
         ]);

         response.data.conversation_id = convId[0].id;

         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

         return serverError();

     } finally {

         await conn.release();

     }

 }

 export default createConversation;
