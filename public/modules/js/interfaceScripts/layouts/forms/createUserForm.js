import storeTypedName from "../../utils/storeTypedName.js";
import storeTypedEmail from "../../utils/storeTypedEmail.js";
import createUser from "../../../workScripts/userScripts/eventSenders/createUser.js";
import loginUserForm from "./loginUserForm.js";

const root = document.getElementById("root");

 function createUserForm () {

     root.replaceChildren();

     const form = document.createElement("form");

     const nameSection = document.createElement("section");
     const emailSection = document.createElement("section");
     const passwordSection = document.createElement("section");
     const submitSection = document.createElement("section");
     const showLoginFormButton = document.createElement("button");


     const nameLabel = document.createElement("label");
     const emailLabel = document.createElement("label");
     const passwordLabel = document.createElement("label");


     const nameInput = document.createElement("input");
     const emailInput = document.createElement("input");
     const passwordInput = document.createElement("input");


     const submitButton = document.createElement("button");



     form.id = "create_user_form";


     nameSection.id = "create_user_name_section";
     emailSection.id = "create_user_email_section";
     passwordSection.id = "create_user_password_section";
     submitSection.id = "create_user_submit_section";
     showLoginFormButton.id = "show_login_form_button";

     nameLabel.id = "create_user_name_label";
     emailLabel.id = "create_user_email_label";
     passwordLabel.id = "create_user_password_label";


     nameInput.id = "create_user_name_input";
     emailInput.id = "create_user_email_input";
     passwordInput.id = "create_user_password_input";


     nameLabel.textContent = "Name:";
     emailLabel.textContent = "Email:";
     passwordLabel.textContent = "Password:";
     submitButton.textContent = "send";
     showLoginFormButton.textContent = "Do you already have an account?";

     nameLabel.for = "create_user_name_input";
     emailLabel.for = "create_user_email_input";
     passwordLabel.for = "create_user_password_input";


     emailInput.type = "email";
     passwordInput.type = "password";
     submitButton.type = "submit";


     form.onsubmit = e => e.preventDefault();
     nameInput.onchange = e => storeTypedName(e.target.value);
     emailInput.onchange = e => storeTypedEmail(e.target.value);
     submitButton.onclick = () => {

         createUser(nameInput.value, emailInput.value, passwordInput.value);

     }
     showLoginFormButton.onclick = () => loginUserForm();


     nameSection.appendChild(nameLabel);
     nameSection.appendChild(nameInput);

     emailSection.appendChild(emailLabel);
     emailSection.appendChild(emailInput);

     passwordSection.appendChild(passwordLabel);
     passwordSection.appendChild(passwordInput);

     submitSection.appendChild(submitButton);
     submitSection.appendChild(showLoginFormButton);


     form.appendChild(nameSection);
     form.appendChild(emailSection);
     form.appendChild(passwordSection);
     form.appendChild(submitSection);

     root.appendChild(form);

 }

 export default createUserForm;
