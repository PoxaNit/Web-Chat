import storeTypedEmail from "../../utils/storeTypedEmail.js";
import createUserForm from "./createUserForm.js";
import loginUser from "../../../workScripts/userScripts/eventSenders/loginUser.js";

const root = document.getElementById("root");

 function loginUserForm () {

     root.replaceChildren();

     const form = document.createElement("form");

     const emailSection = docuemnt.createElement("section");

     const passwordSection = docuemnt.createElement("section");

     const submitSection = docuemnt.createElement("section");

     const emailLabel = document.createElement("label");

     const passwordLabel = document.createElement("label");

     const emailInput = docuemnt.createElement("input");

     const passwordInput = docuemnt.createElement("input");

     const submitButton = document.createElement("button");

     const showCreateUserFormButton = document.createElement("button");

   // Ids

     form.id = "login_user_form";

     emailSection.id = "login_user_email_section";

     passwordSection.id = "login_user_password_section";

     emailLabel.id = "login_user_email_label";

     emailLabel.id = "login_user_email_label";

     emailInput.id = "login_user_email_input";

     emailInput.id = "login_user_email_input";

     submitButton.id = "login_user_submit_button";

     showCreateUserFormButton.id = "show_create_user_form_button";


   // onEvents

     form.onsubmit = e => e.preventDefault();
     emailInput.onchange = e => storeTypedEmail(e.target.value);
     submitButton.click = () => loginUser(emailInput.value, passwordInput.value);
     showCreateUserFormButton.onclick = () => createUserForm();


     showCreateUserFormButton.textContent =
     "Create new account";

   // Types

     emailInput.type = "email";
     passwordInput.type = "password";
     submitButton.type = "submit";



   // Appending childs

     emailSection.appendChild(emailLabel);
     emailSection.appendChild(emailInput);

     passwordSection.appendChild(passwordLabel);
     passwordSection.appendChild(passwordLabel);

     submitSection.appendChild(showCreateUserFormButton);
     submitSection.appendChild(submitButton);

     form.appendChild(emailSection);
     form.appendChild(passwordSection);
     form.appendChild(submitSection);

     root.appendChild(form);

 }

 export default loginUserForm;
