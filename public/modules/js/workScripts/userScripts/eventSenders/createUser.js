import ws from "../../../ws/ws.js";

 function createUser (name, email, password) {

     const payload = {
       name: name,
       email: email,
       password: password
     }

     ws.send({
       event: "create_user",
       payload: payload
     });

 }

 export default createUser;
