import dotenv from "dotenv";
import process from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import mariadb from "mariadb";

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

 dotenv.config({path: __dirname + "/../.env"});

 const pool = mariadb.createPool({
   host: process.env.db_host,
   user: process.env.db_user,
   database: process.env.db_name,
   port: process.env.db_port
 });

 export default pool;
