
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

 });

 export default ws;
