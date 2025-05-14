import { insertWorksInGallery, filterWorksByCategory } from "./workElements.js";

export const handleCategoryClick = (label) => {
  const categoryId = label.dataset.categoryId;
  if (categoryId === "0") {
    insertWorksInGallery(window.works);
  } else {
    const filteredWorks = filterWorksByCategory(window.works, categoryId);
    insertWorksInGallery(filteredWorks);
  }
  categoryLabelStyle(label);
};

export const listenToCategoryLabels = () => {
  const categoryLabels = document.querySelectorAll(
    "#portfolio .category-label"
  );
  categoryLabels.forEach((label) => {
    label.addEventListener("click", () => handleCategoryClick(label));
  });
};

const categoryLabelStyle = (label) => {
  const otherLabels = document.querySelectorAll("#portfolio .category-label");
  otherLabels.forEach((otherLabel) => {
    if (otherLabel !== label) {
      otherLabel.classList.remove("active");
    }
  });
  label.classList.add("active");
};
