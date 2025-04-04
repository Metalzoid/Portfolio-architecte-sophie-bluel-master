export const createCategoryElement = (category) => {
  const categoryTemplate = document.getElementById("category-template");
  const categoryElement = categoryTemplate.content.cloneNode(true);
  categoryElement.querySelector("label").textContent = category.name;
  categoryElement.querySelector("label").dataset.categoryId = category.id;
  return categoryElement;
};

export const insertCategoriesInCategoryList = (categories) => {
  const categoryList = document.querySelector("#portfolio .categories");
  categories.forEach((category) => {
    const categoryElement = createCategoryElement(category);
    categoryList.appendChild(categoryElement);
  });
};
