import createObjectStores from "./createObjectStores.js";

 function runSeeders (db) {
console.log("running seeders...")
     createObjectStores(db);

 }

 export default runSeeders;
