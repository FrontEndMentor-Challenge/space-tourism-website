let names = []
let descriptions = []
let desktopImage = []
let mobileImage = []
let currentIndex2 = 0;
let technologyData = [];
let buttonCircle =[]

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
function updateDOMReferencesTechnology() {
  names = document.querySelector('.content-technology h2');
  descriptions = document.querySelector('.content-technology p');
  desktopImage = document.querySelector('.image-right-content.desktop');
  mobileImage = document.querySelector('.image-right-content.mobile');
  // console.log("Referensi DOM diperbarui");
}
function updateButtonCircle() {
  buttonCircle = document.querySelectorAll(".button-circle");
  // console.log("Elemen button-circle diperbarui", buttonCircle);
}

function attachButtonCircleEventListeners() {
  buttonCircle.forEach((dot, index) => {
      dot.removeEventListener("click", handleDotClickTechnology); // Hindari duplikasi
      dot.addEventListener("click", handleDotClickTechnology.bind(null, index));
  });
}

function handleDotClickTechnology(index) {
  currentIndex = index; 
  updateTechnologyData(index);
}
async function updateTechnologyData(index) {
  updateDOMReferencesTechnology()
  updateButtonCircle()
  attachButtonCircleEventListeners()
  technologyData = await loadDataTechnology();

  
  addFadeClassestechnology();

  setTimeout(() => {
    const { name, images, description } = technologyData[index];

    updateContenttechnology(name, description, images);

    addFadeActiveClassesTechnology();

    setTimeout(removeFadeClassesTechnology, 500); 
  }, 500);

  updateButtonCircles(index);
}

function addFadeClassestechnology() {
  names.classList.add("fade");
  descriptions.classList.add("fade");
  desktopImage.classList.add("fade");
  mobileImage.classList.add("fade");
}

function updateContenttechnology(name, description, images) {
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
  buttonCircle.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === index);
  });
}

function startAutoChange() {
  setInterval(() => {
    currentIndex2 = (currentIndex2 + 1) % technologyData.length;
    updateTechnologyData(currentIndex2);
  }, 4000);
}
buttonCircle.forEach((dot, index) => {
  dot.addEventListener("click", async () => {
      currentIndex2 = index; 
      await updateTechnologyData(index); 
  });
});

updateTechnologyData(currentIndex2).then(startAutoChange);
