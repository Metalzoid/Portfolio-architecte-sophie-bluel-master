import { getCategories, postWork, getWorks } from "../api.js";
import { projectsList } from "./projectsListController.js";
import {
  loadModalContent,
  listenCloseModal,
  listenAddWorkButton,
} from "./modalController.js";

export const addPhotoForm = async () => {
  const modalContent = document.querySelector("#modal-content");
  let html = `
    <div id="modal-header">
      <h2 id="modal-title">Ajout photo</h2>
      <button id="modal-close-button"><i class="fa-solid fa-xmark"></i></button>
      <button id="modal-return-work-button"><i class="fa-solid fa-arrow-left"></i></button>
    </div>
    <form id="modal-form">
      <div id="image-preview-container">
        <div id="image-placeholder">
          <i class="fa-regular fa-image"></i>
          <label for="modal-file-input" class="custom-file-upload">+ Ajouter photo</label>
          <input type="file" id="modal-file-input" accept="image/*" name="image">
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
      <button type="submit" id="modal-submit-button" disabled>Valider</button>
    </form>
    `;
  modalContent.innerHTML = html;
  listenCloseModal();
  listenReturnModal();
  listenFileInput();
  listenAllFields();
  listenFormSubmit();
};

const insertCategoriesInCategoriesOptions = async () => {
  const categories = await getCategories();
  let html = "<option value='' selected disabled></option>";
  categories.forEach((category) => {
    html += `
    <option value="${category.id}">${category.name}</option>
    `;
  });
  return html;
};

export const submitPhoto = async (e) => {
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
  newFormData.append("category", parseInt(category));

  try {
    const newWork = await postWork(newFormData);
    if (newWork.error) {
      alert("Une erreur est survenue lors de l'ajout de la photo !");
      submitButton.disabled = false;
      submitButton.textContent = "Valider";
    } else {
      const works = await getWorks();
      window.works = works;

      loadModalContent(works);
      projectsList(works);
      listenAddWorkButton(works);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire:", error);
    alert("Une erreur est survenue lors de l'ajout de la photo !");
    submitButton.disabled = false;
    submitButton.textContent = "Valider";
  }
};

export const previewImage = (event) => {
  const imagePreview = document.getElementById("image-preview");
  const placeholder = document.getElementById("image-placeholder");
  const previewImg = document.getElementById("preview-img");

  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImg.src = e.target.result;
      placeholder.style.display = "none";
      imagePreview.style.display = "flex";
    };

    reader.readAsDataURL(event.target.files[0]);
  }
};

export const validateForm = () => {
  const title = document.getElementById("modal-title-input").value;
  const category = document.getElementById("modal-category-input").value;
  const image = document.getElementById("modal-file-input").value;
  const submitButton = document.getElementById("modal-submit-button");

  submitButton.disabled = !(title && category && image);
};

const listenFileInput = () => {
  const fileInput = document.querySelector("#modal-file-input");
  fileInput.addEventListener("change", (e) => {
    previewImage(e);
  });
};

const listenAllFields = () => {
  const title = document.getElementById("modal-title-input");
  const category = document.getElementById("modal-category-input");
  const image = document.getElementById("modal-file-input");
  title.addEventListener("input", validateForm);
  category.addEventListener("input", validateForm);
  image.addEventListener("input", validateForm);
};

const listenFormSubmit = () => {
  const form = document.querySelector("#modal-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitPhoto(e);
  });
};

const listenReturnModal = () => {
  const returnButton = document.querySelector("#modal-return-work-button");
  returnButton.addEventListener("click", () => {
    loadModalContent();
  });
};
