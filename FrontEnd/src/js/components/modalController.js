import { deleteWork } from "../api.js";
import { projectsList } from "./projectsListController.js";
import { addPhotoForm } from "./modalFormController.js";

export const openModal = () => {
  const modalContainer = document.querySelector("#modal-container");

  modalContainer.style.opacity = "1";
  modalContainer.style.width = "100%";
  modalContainer.style.height = "100%";
  loadModalContent();
};

export const closeModal = () => {
  const modalContainer = document.querySelector("#modal-container");
  modalContainer.style.opacity = "0";
  setTimeout(() => {
    modalContainer.style.width = "0px";
    modalContainer.style.height = "0px";
  }, 300);
};

export const loadModalContent = async () => {
  const modalContent = document.querySelector("#modal-content");
  let html = `
    <div id="modal-header">
      <h2 id="modal-title">Galerie photo</h2>
      <button id="modal-close-button"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div id="item-list">
  `;

  window.works.forEach((work) => {
    html += itemList(work);
  });

  html += `
    </div>
    <hr>
    <button id="modal-add-work-button">Ajouter une photo</button>
  `;
  modalContent.innerHTML = html;
  listenCloseModal();
  listenDeleteWorkButton();
  listenAddWorkButton();
};

const itemList = (work) => {
  return `
    <div class="modal-work-item">
      <button class="modal-delete-work-item-button" data-id="${work.id}"><i class="fa-solid fa-trash-can"></i></button>
      <img src="${work.imageUrl}" alt="${work.title}">
    </div>
  `;
};

const deletePhoto = async (id) => {
  const response = await deleteWork(id);
  if (response.ok) {
    const numericId = parseInt(id);
    const updatedWorks = window.works.filter((work) => work.id !== numericId);
    window.works = updatedWorks;

    loadModalContent();
    projectsList();
    listenAddWorkButton();
  } else {
    alert("Une erreur est survenue !");
  }
};

export const listenCloseModal = () => {
  const modalCloseButton = document.querySelector("#modal-close-button");
  modalCloseButton.addEventListener("click", () => {
    closeModal();
  });
};

const listenDeleteWorkButton = () => {
  const deleteWorkButton = document.querySelectorAll(
    ".modal-delete-work-item-button"
  );
  deleteWorkButton.forEach((button) => {
    button.addEventListener("click", () => {
      deletePhoto(button.dataset.id);
    });
  });
};

export const listenAddWorkButton = () => {
  const addWorkButton = document.querySelector("#modal-add-work-button");
  addWorkButton.addEventListener("click", () => {
    addPhotoForm();
  });
};
