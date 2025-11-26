import { WebSocketServer } from "ws"                         ;
import   express           from "express"                    ;
import   fs                from "node:fs"                    ;
import   createUser        from "./workScripts/createUser.js";
import   dotenv            from "dotenv";
import   process           from "node:process";


 dotenv.config({path: "./.env"});



 // HTTP SERVER

 const app      = express();
 const httpPort = process.env.http_server_port;




 /* ------------------- ROUTES ------------------------------*/




 app.get("/", (req, res) => {

     fs.readFile("./static/index.html", (error, data) => {

         if (error) {

             console.log(error);

             return;

         }

         res.setHeader("Content-Type", "text/html");

         res.send(data);

     });


 });


 /* ------------------------ ROUTES - END ---------------------*/









 app.use(express.static("./static"));








 const wsPort = ws_server_port;

 const wss = new WebSocketServer({ port: wsPort });

 console.log(`WebSocket server listening on port ${wsPort}`);

 wss.on("connection", ws => {

     ws.on("error", console.error);

     ws.on("message", data => {


         const json = JSON.parse(data);

         const response = JSON.stringify({
           message: `Your name is: ${json.userName}`
         });

         wss.clients.forEach(client => {

             client.send(response);

         });

         console.log(json);

     })


 });

 app.listen(httpPort, () => console.log(`HTTP server listening on port ${httpPort}`));
