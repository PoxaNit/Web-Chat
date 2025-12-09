import ws from "../../../ws/ws.js";

 function loginUser (email, password) {

     const payload = {
       email: email,
       password: password
     }

     ws.send(JSON.stringify({
       event: "login_user",
       payload: payload
     }));

 }

 export default loginUser;
