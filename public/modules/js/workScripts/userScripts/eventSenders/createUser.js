import ws from "../../../ws/ws.js";

 function createUser (name, email, password) {
console.log("createUser executing...", `name: ${name}, email: ${email}, password: ${password}`)
     const payload = {
       name: name,
       email: email,
       password: password
     }

     ws.send(JSON.stringify({
       event: "create_user",
       payload: payload
     }));

 }

 export default createUser;
