import { WebSocketServer } from "ws"                         ;
import   express           from "express"                    ;
import   fs                from "node:fs"                    ;
import   dotenv            from "dotenv";
import   process           from "node:process";
import   event_handler     from "./event_handler.js";

 dotenv.config({path: "./.env"});



 // HTTP SERVER

 const app      = express();
 const httpPort = process.env.http_server_port;





 app.use(express.static("./public"));








 const wsPort = process.env.ws_server_port;

 const wss = new WebSocketServer({ port: wsPort });

 console.log(`WebSocket server listening on port ${wsPort}`);

 wss.on("connection", ws => {

     ws.on("error", console.error);

     ws.on("message", async message => {

         const parsed_message = JSON.parse(message);
console.log(parsed_message)

         const response = await event_handler(parsed_message);

         ws.send(JSON.stringify(response));

     })


 });

 app.listen(httpPort, () => console.log(`HTTP server listening on port ${httpPort}`));
