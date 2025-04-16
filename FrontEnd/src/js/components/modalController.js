import { getWorks, postWork, deleteWork } from "../api.js";
import { projectsList } from "./projectsListController.js";
import { getCategories } from "../api.js";

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

const loadModalContent = async (modalContent) => {
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

const addPhotoForm = async () => {
  const modalContent = document.querySelector("#modal-content");
  let html = `
    <div id="modal-header">
      <h2 id="modal-title">Ajout photo</h2>
      <button id="modal-close-button" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <form id="modal-form" onsubmit="submitPhoto(event)">
      <div id="image-preview-container">
        <div id="image-placeholder">
          <i class="fa-regular fa-image"></i>
          <label for="modal-file-input" class="custom-file-upload">+ Ajouter photo</label>
          <input type="file" id="modal-file-input" accept="image/*" name="image" onchange="previewImage(event)">
          <p class="file-format">jpg, png : 4mo max</p>
        </div>
        <div id="image-preview" style="display: none;">
          <img id="preview-img" src="" alt="Aperçu de l'image">
        </div>
      </div>
      <div class="form-group">
        <label for="modal-title-input">Titre</label>
        <input type="text" id="modal-title-input" name="title">
      </div>
      <div class="form-group">
        <label for="modal-category-input">Catégorie</label>
        <select id="modal-category-input" name="category">
  `;
  html += await insertCategoriesInCategoriesOptions();
  html += `
        </select>
      </div>
      <hr>
      <button type="submit" id="modal-submit-button">Valider</button>
    </form>
    `;
  modalContent.innerHTML = html;
};

const insertCategoriesInCategoriesOptions = async () => {
  const categories = await getCategories();
  let html = "";
  categories.forEach((category) => {
    html += `
    <option value="${category.id}">${category.name}</option>
    `;
  });
  return html;
};

const submitPhoto = async (e) => {
  e.preventDefault();
  const submitButton = document.getElementById("modal-submit-button");
  submitButton.disabled = true;
  submitButton.textContent = "Chargement...";

  const formData = new FormData(e.target);
  const title = formData.get("title");
  const image = formData.get("image");
  const category = formData.get("category");

  if (!title || !image || !category) {
    alert("Veuillez remplir tous les champs");
    submitButton.disabled = false;
    submitButton.textContent = "Valider";
    return;
  }

  const newFormData = new FormData();
  newFormData.append("title", title);
  newFormData.append("image", image);
  newFormData.append("category", category);

  try {
    const response = await postWork(newFormData);
    if (response.error) {
      alert("Une erreur est survenue lors de l'ajout de la photo !");
      submitButton.disabled = false;
      submitButton.textContent = "Valider";
    } else {
      const modalContent = document.querySelector("#modal-content");
      loadModalContent(modalContent);
      projectsList();
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire:", error);
    alert("Une erreur est survenue lors de l'ajout de la photo !");
    submitButton.disabled = false;
    submitButton.textContent = "Valider";
  }
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

const previewImage = (event) => {
  const imagePreview = document.getElementById("image-preview");
  const placeholder = document.getElementById("image-placeholder");
  const previewImg = document.getElementById("preview-img");

  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImg.src = e.target.result;
      placeholder.style.display = "none";
      imagePreview.style.display = "block";
    };

    reader.readAsDataURL(event.target.files[0]);
  }
};

window.closeModal = closeModal;
window.addPhotoForm = addPhotoForm;
window.submitPhoto = submitPhoto;
window.deletePhoto = deletePhoto;
window.previewImage = previewImage;
