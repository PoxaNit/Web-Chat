import pool from "../../database/database.js";
import error from "../error.js";

 async function getUser (message) {

     const {
       email
     } = message.payload;


     const data = {
       user: null
     }

     let response = {
       message: "OK",
       success: true,
       data: data,
       code: 100
     }

     const conn = await pool.getConnection();


     try {

         let stmt = `

             SELECT
             id AS user_id, created_at, updated_at, name, email
             FROM users
             WHERE email = ?;

         `;

         let result = await conn.query(stmt, [email]);

         if (!result?.length) {

             return error("User not found", 205);

         }

         response.data.user = result[0];

         response.data.user.created_at = parseInt(response.data.user.created_at);

         response.data.user.updated_at = parseInt(response.data.user.updated_at);

         return response;

     } catch (err) {

         console.log("Internal Server Error: ", err);

         return response;

     } finally {

         await conn.release();

     }

 }

 export default getUser;
