const filterContainer = document.querySelector(".items");
const galleryImages = document.querySelectorAll(".gallery .image");
const previewBox = document.querySelector(".preview-box");
const previewImage = previewBox.querySelector("img");
const categoryText = previewBox.querySelector(".title p");
const closeIcon = previewBox.querySelector(".icon");
const shadow = document.querySelector(".shadow");
const searchInput = document.getElementById("searchInput");
const downloadBtn = document.getElementById("downloadBtn");

const themeToggle = document.querySelector(".theme-toggle i");

const imageCountBox = document.createElement("div");
imageCountBox.className = "image-count";
document.querySelector(".wrapper").prepend(imageCountBox);

updateImageCount();

filterContainer.addEventListener("click", (event) => {
  const clickedItem = event.target;
  if (!clickedItem.classList.contains("item")) return;

  filterContainer.querySelector(".active").classList.remove("active");
  clickedItem.classList.add("active");

  filterImages();
});

searchInput.addEventListener("keyup", () => {
  filterImages();
});

function filterImages() {
  const selectedCategory =
    filterContainer.querySelector(".active").dataset.name;
  const searchText = searchInput.value.toLowerCase();

  let visibleCount = 0;

  galleryImages.forEach((image) => {
    const category = image.dataset.name;
    const altText = image.querySelector("img").alt.toLowerCase();

    const matchCategory =
      selectedCategory === "all" || selectedCategory === category;
    const matchSearch = altText.includes(searchText);

    if (matchCategory && matchSearch) {
      image.style.display = "block";
      visibleCount++;
    } else {
      image.style.display = "none";
    }
  });

  updateImageCount(visibleCount);
}

document.querySelectorAll(".like-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("liked");
  });
});

function hideHearts() {
  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.style.visibility = "hidden";
  });
}

function showHearts() {
  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.style.visibility = "visible";
  });
}

function showPreview(imageElement) {
  const imgSrc = imageElement.querySelector("img").src;
  const imgCategory = imageElement.dataset.name;

  previewImage.src = imgSrc;
  categoryText.textContent = imgCategory;

  downloadBtn.href = imgSrc;
  downloadBtn.setAttribute("download", imgCategory + ".jpg");

  hideHearts();

  previewBox.classList.add("show");
  shadow.classList.add("show");
  document.body.style.overflow = "hidden";
}

galleryImages.forEach((image) => {
  image.addEventListener("click", () => showPreview(image));
});

closeIcon.addEventListener("click", () => {
  previewBox.classList.remove("show");
  shadow.classList.remove("show");
  document.body.style.overflow = "auto";
  showHearts();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.classList.remove("fa-sun");
    themeToggle.classList.add("fa-moon");
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.classList.remove("fa-moon");
    themeToggle.classList.add("fa-sun");
    localStorage.setItem("theme", "light");
  }
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.classList.remove("fa-sun");
  themeToggle.classList.add("fa-moon");
}

function updateImageCount(visibleCount = null) {
  if (visibleCount === null) {
    visibleCount = galleryImages.length;
  }

  imageCountBox.textContent = `Images Found: ${visibleCount}`;
}
