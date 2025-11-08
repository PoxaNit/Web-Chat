import { JSONFile } from "lowdb/node";
import { Low      } from "lowdb"     ;

 const adapter = new JSONFile("../database/db.json");
 const db      = new Low(adapter, {})               ;


 async function logout (userId) {

     const arrayLogin = db.data.login;



     let data = null                 ;

     let response = { // Default value
       "message": "User is now logged out",
       "data"   : data,
       "success": true,
       "code"   : 200
     }                               ;


     let userExists                  ;

     for (const login of arrayLogin) {

         if (login.user_id === userId) {

             userExists = true;

             if (!login.is_logged) {

                 response.message = "User is not logged in";
                 response.success = false                  ;
                 response.code    = 400                    ;

             } else {

                 login.is_logged = false;
                 break                  ;

             }

         }

     }


     if (!userExists) {

         response.message = "User not found";
         response.success = false           ;
         response.code    = 400             ;

     }

     db.data.login = arrayLogin      ;

     await db.write()                ;

     return JSON.stringify(response);

 }

 export default logout                              ;
