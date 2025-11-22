import mariadb from "mariadb";

 const pool = mariadb.createPool({
   host: "localhost",
   user: "root",
   connectionLimit: 5,
   database: "webchat",
   port: 3000
 });

 export default pool;
