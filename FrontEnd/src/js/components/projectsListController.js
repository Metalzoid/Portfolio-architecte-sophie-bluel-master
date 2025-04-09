import { getWorks, getCategories } from "../api.js";
import { insertWorksInGallery } from "./workElements.js";
import { insertCategoriesInCategoryList } from "./categoryElements.js";
import { listenToCategoryLabels } from "./eventHandlers.js";

export const projectsList = async () => {
  const works = await getWorks();
  const categories = await getCategories();

  insertWorksInGallery(works);
  insertCategoriesInCategoryList(categories);
  listenToCategoryLabels(works);

};
