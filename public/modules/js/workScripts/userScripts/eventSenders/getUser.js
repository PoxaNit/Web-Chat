import ws from "../../../ws/ws.js";

 async function getUser (email) {
console.log("getUser executing...")
     const payload = {
       email: email
     }

     ws.send(JSON.stringify({
       event: "get_user",
       payload: payload
     }));
console.log("getUser executed")
 }

 export default getUser;
