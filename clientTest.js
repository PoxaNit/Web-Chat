import WebSocket from "ws";

 const ws = new WebSocket("ws://localhost:8081");

 ws.on("error", console.error);

 ws.on("open", () => {

     ws.send(JSON.stringify({userId: 1, userName: "Júlio", message: "Hi there!"}));

 });

 ws.on("message", data => console.log(JSON.parse(data).message));
