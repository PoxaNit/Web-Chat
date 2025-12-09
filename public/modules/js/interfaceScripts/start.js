import loginUserForm from "./layouts/forms/loginUserForm.js";
import inicialScreen from "./layouts/inicialScreen.js";
import objectCache from "../database/cache/objectCache.js";

 function start () {

     const {
       this_user_is_logged
     } = objectCache.states.authContext;

     if (this_user_is_logged) {

         inicialScreen();

     } else {

         loginUserForm();

     }
     console.log(`user logged: ${this_user_is_logged}`)
 }

 export default start;
