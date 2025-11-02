
 const inputArea    = document.getElementById("inputArea");
 const messageInput = document.getElementById("messageInput");
 const submitButton = document.getElementById("submitButton");

 const ws = new WebSocket("ws://localhost:8081");

 ws.onopen = event => {

     alert("Connection established!");

 }

 ws.onmessage = event => {

     console.log(`Server says: ${event.data}`);

     const p = document.createElement("");

     p.textContent = event.data;

     inputArea.appendChild(p);

 }

 ws.onerror = event => console.error("Something works wrong.");

 ws.onclose = event => alert("Connection closed.");


 submitButton.onclick = () => {

     if (!messageInput.value) return;

     const msg = messageInput.value;

     const jsonToSend = JSON.stringify({
       "userId": 1,
       "userName": "Júliooo",
       "message": messageInput.value
     });

     ws.send(jsonToSend);

 }
