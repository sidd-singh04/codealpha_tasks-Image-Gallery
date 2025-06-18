const filterContainer = document.querySelector(".items");
const galleryImages = document.querySelectorAll(".gallery .image");
const previewBox = document.querySelector(".preview-box");
const previewImage = previewBox.querySelector("img");
const categoryText = previewBox.querySelector(".title p");
const closeIcon = previewBox.querySelector(".icon");
const shadow = document.querySelector(".shadow");

window.onload = () => {
  filterContainer.addEventListener("click", (event) => {
    const clickedItem = event.target;
    if (clickedItem.classList.contains("item")) {
      filterContainer.querySelector(".active").classList.remove("active");
      clickedItem.classList.add("active");
      const selectedCategory = clickedItem.getAttribute("data-name");

      galleryImages.forEach(image => {
        const imageCategory = image.getAttribute("data-name");
        if (selectedCategory === "all" || selectedCategory === imageCategory) {
          image.classList.remove("hide");
          image.classList.add("show");
        } else {
          image.classList.remove("show");
          image.classList.add("hide");
        }
      });
    }
  });

  galleryImages.forEach(image => {
    image.addEventListener("click", () => showPreview(image));
  });
};

function showPreview(imageElement) {
  const imgSrc = imageElement.querySelector("img").src;
  const imgCategory = imageElement.getAttribute("data-name");
  previewImage.src = imgSrc;
  categoryText.textContent = imgCategory;
  previewBox.classList.add("show");
  shadow.classList.add("show");
  document.body.style.overflow = "hidden";
}

closeIcon.addEventListener("click", () => {
  previewBox.classList.remove("show");
  shadow.classList.remove("show");
  document.body.style.overflow = "auto";
});
