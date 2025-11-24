import pool from "../database/database.js";

 async function sendMessage (data) {

     const {
       user_id,
       recipient_user_id = null,
       recipient_group_id = null,
       content
     } = data;

     if (!user_id || !content || !(recipient_user_id || recipient_group_id)) {

         throw new Error("Required fields are missing.");

     }

     let data = null;

     let response = {
       message: "Message sent!",
       success: true,
       data: data,
       code: 200
     }

     const dateNow = Date.now();

     const conn = await pool.getConnection();

     try {

         let canInsertRecords = true;

         // Verifying if user_id is valid

         let stmt = `
             SELECT id FROM users WHERE id = ?;
         `;

         let result = await conn.query(stmt, [user_id]);

         if (!result?.length) {

             canInsertRecords = false;

             response.message = "User sender not found";
             response.success = false;
             response.code = 400;
             response.data = null;

         }

         if (recipient_user_id) {

             // Verifying if recipient_user_id is valid

             stmt = `
                 SELECT id FROM users WHERE id = ?;
             `;

             result = await conn.query(stmt, [recipient_user_id]);

             if (!result?.length) {

                 canInsertRecords = false;

                 response.message = "Receiver user not found";
                 response.success = false;
                 response.code = 400;
                 response.data = null;

             }

         }

         if (recipient_group_id) {

             // Verifying if recipient_group_id is valid

             stmt = `
                 SELECT id FROM users WHERE id = ?;
             `;

             result = await conn.query(stmt, [recipient_group_id]);

             if (!result?.length) {

                 canInsertRecords = false;

                 response.message = "Group not found";
                 response.success = false;
                 response.code = 400;
                 response.data = null;

             }

         }



         if (canInsertRecords) {

             // Creating records

             stmt = `
                 INSERT INTO messages (
                   created_at,
		   updated_at,
		   user_id,
                   recipient_user_id,
                   recipient_group_id,
		   content
                 ) VALUES (?, ?, ?, ?) RETURNING id;
             `;

             const message_id = await conn.query(stmt, [
               dateNow,
	       dateNow,
	       user_id,
               recipient_user_id,
               recipient_group_id,
	       content
             ]);


	     if (recipient_user_id) {

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
		   message_id,
		   recipient_user_id,
		   "sent"
		 ]);

             } else if (recipient_group_id) {

	         stmt = `
		     SELECT user_id FROM group_participants WHERE group_id = ?;
		 `;

		 const group_user_ids = await conn.query(stmt, [recipient_group_id]);

		 for (const userId of group_user_ids) {

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
		       message_id,
		       userId,
		       "sent"
		     ]);

		 }

	     }

         }

     } catch (err) {

         console.log("Error: ", err)

     } finally {

         await conn.release();

         return response;

     }

 }

 export default sendMessage;
