import dotenv from "dotenv";
import process from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import mariadb from "mariadb";

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

 dotenv.config({path: });

 const pool = mariadb.createPool({
   host: "localhost",
   user: "root",
   connectionLimit: 5,
   database: "webchat",
   port: 3000
 });

 export default pool;
