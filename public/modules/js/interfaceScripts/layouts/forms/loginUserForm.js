import storeTypedEmail from "../../utils/storeTypedEmail.js";
import createUserForm from "./createUserForm.js";
import loginUser from "../../../workScripts/userScripts/eventSenders/loginUser.js";


 function loginUserForm () {

     const root = document.getElementById("root");

     root.replaceChildren();

     const form = document.createElement("form");

     const emailSection = document.createElement("section");

     const passwordSection = document.createElement("section");

     const submitSection = document.createElement("section");

     const emailLabel = document.createElement("label");

     const passwordLabel = document.createElement("label");

     const emailInput = document.createElement("input");

     const passwordInput = document.createElement("input");

     const submitButton = document.createElement("button");

     const showCreateUserFormButton = document.createElement("button");

   // Ids

     form.id = "login_user_form";

     emailSection.id = "login_user_email_section";

     passwordSection.id = "login_user_password_section";

     emailLabel.id = "login_user_email_label";

     passwordLabel.id = "login_user_password_label";

     emailInput.id = "login_user_email_input";

     passwordInput.id = "login_user_password_input";

     submitButton.id = "login_user_submit_button";

     showCreateUserFormButton.id = "show_create_user_form_button";




   // onEvents

     form.onsubmit = e => e.preventDefault();
     emailInput.onchange = e => storeTypedEmail(e.target.value);
     submitButton.onclick = () => loginUser(emailInput.value, passwordInput.value);
     showCreateUserFormButton.onclick = () => createUserForm();


  // adding texts


     emailLabel.textContent = "Email:";

     passwordLabel.textContent = "Password:";

     showCreateUserFormButton.textContent =
     "Create new account";

     submitButton.textContent = "Login";

   // Types

     emailInput.type = "email";
     passwordInput.type = "password";
     submitButton.type = "submit";



   // Appending childs

     emailSection.appendChild(emailLabel);
     emailSection.appendChild(emailInput);

     passwordSection.appendChild(passwordLabel);
     passwordSection.appendChild(passwordInput);

     submitSection.appendChild(showCreateUserFormButton);
     submitSection.appendChild(submitButton);

     form.appendChild(emailSection);
     form.appendChild(passwordSection);
     form.appendChild(submitSection);

     root.appendChild(form);

 }

 export default loginUserForm;
