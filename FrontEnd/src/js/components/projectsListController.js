import { getCategories } from "../api.js";
import { insertWorksInGallery } from "./workElements.js";
import { insertCategoriesInCategoryList } from "./categoryElements.js";
import { listenToCategoryLabels } from "./eventHandlers.js";

export const projectsList = async () => {
  const categories = await getCategories();

  insertWorksInGallery(window.works);
  insertCategoriesInCategoryList(categories);
  listenToCategoryLabels(window.works);
};
