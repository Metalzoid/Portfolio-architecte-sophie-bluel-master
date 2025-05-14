import { openModal } from "./modalController.js";

export const loggedInController = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    logoutTextButton();
    appendEditWorksButton();
    hideCategories();
    listenEditWorksButton();
    topEditHeader();
  }
};

const logoutTextButton = () => {
  const loginLink = document.querySelector("#login-link");
  loginLink.textContent = "logout";
};

const appendEditWorksButton = () => {
  const myWorksContainer = document.querySelector("#my-works-container");
  const editWorksButton = '<div id="edit-works-button"><i class="fa-regular fa-pen-to-square"></i>modifier</div>';
  myWorksContainer.insertAdjacentHTML("beforeend", editWorksButton);
};

const hideCategories = () => {
  const categories = document.querySelector(".categories");
  categories.style.visibility = "hidden";
};

const listenEditWorksButton = () => {
  const editWorksButton = document.querySelector("#edit-works-button");
  editWorksButton.addEventListener("click", () => {
    openModal();
  });
};

const topEditHeader = () => {
  const html = `
    <div id="top-edit-header">
      <i class="fa-regular fa-pen-to-square"></i>
      <p>Mode édition</p>
    </div>
  `;
  const topEditHeader = document.querySelector("header");
  topEditHeader.insertAdjacentHTML("afterbegin", html);
  const body = document.querySelector("body");
  body.style.marginTop = "60px";
};
