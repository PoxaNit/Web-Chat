import loginUserForm from "./layouts/forms/loginUserForm.js";
import inicialScreen from "./layouts/inicialScreen.js";
import { states } from "../database/cache/objectCache.js";

 function start () {

     const {
       this_user_is_logged
     }

     if (this_user_is_logged) {

         inicialScreen();

     } else {

         loginUserForm();

     }

 }

 export default start;
