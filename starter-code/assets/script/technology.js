async function loadDataTechnology() {
  try {
    const response = await fetch("./assets/data/data.json");
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    return data["technology"];
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

let names = document.querySelector('.content-technology h2');
let descriptions = document.querySelector('.content-technology p');
let desktopImage = document.querySelector('.image-right-content.desktop');
let mobileImage = document.querySelector('.image-right-content.mobile');
let currentIndex2 = 0;
let technologyData = [];

async function updateTechnologyData(index) {
  technologyData = await loadDataTechnology();

  // Menambahkan kelas fade untuk transisi
  addFadeClassesTechnology();

  setTimeout(() => {
    const { name, images, description } = technologyData[index];

    // Update konten
    updateContentTechnology(name, description, images);

    // Menambahkan kelas fade-active untuk transisi elemen
    addFadeActiveClassesTechnology();

    // Menghapus kelas fade dan fade-active setelah transisi selesai
    setTimeout(removeFadeClassesTechnology, 500); // Durasi yang sama dengan transisi
  }, 500);

  // Update status button-circle
  updateButtonCircles(index);
}

function addFadeClassesTechnology() {
  names.classList.add("fade");
  descriptions.classList.add("fade");
  desktopImage.classList.add("fade");
  mobileImage.classList.add("fade");
}

function updateContentTechnology(name, description, images) {
  names.textContent = name.toUpperCase();
  descriptions.textContent = description;
  desktopImage.src = images['portrait'];
  mobileImage.src = images['landscape'];
}

function addFadeActiveClassesTechnology() {
  names.classList.add("fade-active");
  descriptions.classList.add("fade-active");
  desktopImage.classList.add("fade-active");
  mobileImage.classList.add("fade-active");
}

function removeFadeClassesTechnology() {
  names.classList.remove("fade", "fade-active");
  descriptions.classList.remove("fade", "fade-active");
  desktopImage.classList.remove("fade", "fade-active");
  mobileImage.classList.remove("fade", "fade-active");
}

function updateButtonCircles(index) {
  document.querySelectorAll(".button-circle").forEach((dot, idx) => {
    dot.classList.toggle("active", idx === index);
  });
}

function startAutoChangeTechnology() {
  setInterval(() => {
    currentIndex2 = (currentIndex2 + 1) % technologyData.length;
    console.log(currentIndex2);
    updateTechnologyData(currentIndex2);
  }, 4000);
}

updateTechnologyData(currentIndex2).then(startAutoChangeTechnology);
