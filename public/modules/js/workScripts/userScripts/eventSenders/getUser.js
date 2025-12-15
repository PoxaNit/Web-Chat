import ws from "../../../ws/ws.js";

 async function getUser (email) {

     const payload = {
       email: email
     }

     ws.send(JSON.stringify({
       event: "get_user",
       payload: payload
     }));

 }

 export default getUser;
