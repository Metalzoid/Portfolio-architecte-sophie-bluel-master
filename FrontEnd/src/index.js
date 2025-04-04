import { projectsList } from "./js/components/projectsListController.js";

const init = async () => {
  await projectsList();
};

document.addEventListener("DOMContentLoaded", init);
