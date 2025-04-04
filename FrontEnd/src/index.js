import { projectsList } from "./js/components/projects_list.js";

const init = async () => {
  await projectsList();
};



document.addEventListener("DOMContentLoaded", init);
