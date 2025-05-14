import { projectsList } from "./js/components/projectsListController.js";
import { loginFormController } from "./js/components/loginFormController.js";
import { logoutController } from "./js/components/logoutController.js";
import { loggedInController } from "./js/components/loggedInController.js";
import { getWorks } from "./js/api.js";

const init = async () => {
  const works = await getWorks();
  window.works = works;

  logoutController();
  loggedInController();
  if (window.location.pathname === "/login.html") {
    loginFormController();
  } else {
    await projectsList();
  }
};

document.addEventListener("DOMContentLoaded", init);
