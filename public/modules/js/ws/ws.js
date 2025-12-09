import client_event_handler from "../client_event_handler/client_event_handler.js";
alert("executing ws")
 const ws = new WebSocket("http://localhost:8081");

 ws.addEventListener("open", event => {

     alert("Open Connection!");

 });

 ws.addEventListener("error", event => {

     alert(`Error: ${event}`);

 });

 ws.addEventListener("close", event => {

     alert("Connection Closed!");

 });

 ws.addEventListener("message", event => {

     alert(`Message received: ${event.data}`);

     client_event_handler(JSON.parse(event.data));

 });

 export default ws;
