import { getWorks, deleteWork } from "../api.js";
import { projectsList } from "./projectsListController.js";
import { addPhotoForm } from "./modalFormController.js";

export const openModal = () => {
  const modalContainer = document.querySelector("#modal-container");
  const modalContent = document.querySelector("#modal-content");

  modalContainer.style.opacity = "1";
  modalContainer.style.width = "100%";
  modalContainer.style.height = "100%";
  loadModalContent(modalContent);
};

export const closeModal = () => {
  const modalContainer = document.querySelector("#modal-container");
  modalContainer.style.opacity = "0";
  setTimeout(() => {
    modalContainer.style.width = "0px";
    modalContainer.style.height = "0px";
  }, 300);
};

export const loadModalContent = async (modalContent) => {
  const works = await getWorks();

  let html = `
    <div id="modal-header">
      <h2 id="modal-title">Galerie photo</h2>
      <button id="modal-close-button" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div id="item-list">
  `;

  works.forEach((work) => {
    html += itemList(work);
  });

  html += `
    </div>
    <hr>
    <button id="modal-add-work-button" onclick="addPhotoForm()">Ajouter une photo</button>
  `;
  modalContent.innerHTML = html;
};

const itemList = (work) => {
  return `
    <div class="modal-work-item" data-id="${work.id}">
      <button class="modal-delete-work-item-button" onclick="deletePhoto(${work.id})"><i class="fa-solid fa-trash-can"></i></button>
      <img src="${work.imageUrl}" alt="${work.title}">
    </div>
  `;
};

const deletePhoto = async (id) => {
  const response = await deleteWork(id);
  if (response.ok) {
    const modalContent = document.querySelector("#modal-content");
    loadModalContent(modalContent);
    projectsList();
  } else {
    alert("Une erreur est survenue !");
    window.location.reload();
  }
};

window.closeModal = closeModal;
window.addPhotoForm = addPhotoForm;
window.deletePhoto = deletePhoto;
