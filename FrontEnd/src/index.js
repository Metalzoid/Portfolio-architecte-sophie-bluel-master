import { projectsList } from "./js/components/projectsListController.js";
import { loginFormController } from "./js/components/loginFormController.js";
import { logoutController } from "./js/components/logoutController.js";

const init = async () => {
  logoutController();

  if (window.location.pathname === "/login.html") {
    loginFormController();
  } else {
    await projectsList();
  }
};

document.addEventListener("DOMContentLoaded", init);
