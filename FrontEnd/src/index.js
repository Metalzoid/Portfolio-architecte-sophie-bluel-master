import { projectsList } from "./js/components/projectsListController.js";
import { loginFormController } from "./js/components/loginFormController.js";

const init = async () => {
  

  if (window.location.pathname === "/login.html") {
    loginFormController();
  } else {
    await projectsList();
  }
};

document.addEventListener("DOMContentLoaded", init);
