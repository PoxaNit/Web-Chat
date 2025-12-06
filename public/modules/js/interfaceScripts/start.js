//import loginUserForm from "./layouts/forms/loginUserForm.js";
//import inicialScreen from "./layouts/inicialScreen.js";
//import { states } from "../database/cache/objectCache.js";
import objectCache from "../database/cache/objectCache.js";
 function start () {
/*
     const {
       this_user_is_logged
     } = states;

     if (this_user_is_logged) {

         inicialScreen();

     } else {

         loginUserForm();

     }*/
console.log("this_user_is_logged: ", objectCache.states.this_user_is_logged)
 }

 export default start;
