import start from "../modules/js/interfaceScripts/start.js";
import deleteDatabase from "../modules/js/database/deleteDatabase.js";

deleteDatabase("webchat");
setTimeout(() => {
start();
}, 8000)

