import { login } from "../api.js";

export const loginFormController = () => {
  const loginForm = document.querySelector("#login form");
  const formErrorContainer = document.querySelector("#login form small");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const response = await login(email, password);
    if (response.error) {
      handleFormError(loginForm, formErrorContainer);
    } else {
      handleFormSuccess(loginForm, formErrorContainer, response.token);
      window.location.href = "/";
    }
  });
};

const handleFormError = (loginForm, formErrorContainer) => {
  formErrorContainer.classList.add("error");
  formErrorContainer.textContent = "Email ou mot de passe incorrect";
  loginForm.email.classList.add("error");
  loginForm.password.classList.add("error");
  loginForm.password.value = "";
};

const handleFormSuccess = (loginForm, formErrorContainer, token) => {
  formErrorContainer.classList.remove("error");
  formErrorContainer.textContent = "";
  loginForm.email.classList.remove("error");
  loginForm.password.classList.remove("error");
  localStorage.setItem("token", token);
};
