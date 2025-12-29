import ws from "../../../ws/ws.js";

 async function getUser (email) {

     return new Promise((res, rej) => {

         const payload = {
           email: email
         }

         ws.send(JSON.stringify({
           event: "get_user",
           payload: payload
         }));

         res(null);

     });

 }

 export default getUser;
