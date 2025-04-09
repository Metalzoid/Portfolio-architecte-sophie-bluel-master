import { getWorks } from "../api.js";

export const openModal = () => {
  const modalContainer = document.querySelector("#modal-container");
  const modalContent = document.querySelector("#modal-content");

  modalContainer.style.opacity = "1";
  modalContainer.style.width = "100%";
  modalContainer.style.height = "100%";
  loadModalContent(modalContent);
  // addCloseButtonListener(modalContent);
};

export const closeModal = (modalContent) => {
  const modalContainer = document.querySelector("#modal-container");
  modalContainer.style.opacity = "0";
  setTimeout(() => {
    modalContainer.style.width = "0px";
    modalContainer.style.height = "0px";
    modalContent.innerHTML = "";
  }, 300);
};

const loadModalContent = async (modalContent) => {
  const works = await getWorks();
  console.log(works);

  let html = `
    <div id="modal-header">
      <h2 id="modal-title">Galerie photo</h2>
      <button id="modal-close-button"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div id="item-list">
  `;
  works.forEach((work) => {
    html += itemList(work);
  });
  html += `
    </div>
  `;
  modalContent.innerHTML = html;
};

const addCloseButtonListener = (modalContent) => {
  const closeButton = modalContent.querySelector("#modal-close-button");
  closeButton.addEventListener("click", () => {
    closeModal(modalContent);
  });
};

const itemList = (work) => {
  const html = `
    <div class="modal-work-item" data-id="${work.id}">
      <img src="${work.imageUrl}" alt="${work.title}">
    </div>
  `;
  return html;
};
