export const createWorkElement = (work) => {
  const workTemplate = document.getElementById("work-template");
  const workElement = workTemplate.content.cloneNode(true);
  workElement.querySelector("img").src = work.imageUrl;
  workElement.querySelector("figcaption").textContent = work.title;
  return workElement;
};

export const filterWorksByCategory = (works, categoryId) => {
  return works.filter((work) => work.categoryId === parseInt(categoryId));
};

export const insertWorksInGallery = (works) => {
  const gallery = document.querySelector("#portfolio .gallery");
  gallery.innerHTML = "";
  works.forEach((work) => {
    const workElement = createWorkElement(work);
    gallery.appendChild(workElement);
  });
};
