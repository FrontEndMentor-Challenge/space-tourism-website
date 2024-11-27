
var crewData = [];
let currentIndex = 0;

let rankElement = []
let nameElement = []
let descElement = []
let imageElement = []
let dotElements = []; 

function updateDotElementsCrew() {
    dotElements = document.querySelectorAll(".pagination .dot");
    // console.log("Elemen .dot diperbarui", dotElements);
}
function attachDotEventListenersCrew() {
    dotElements.forEach((dot, index) => {
        dot.removeEventListener("click", handleDotClickCrew); // Hindari duplikasi
        dot.addEventListener("click", handleDotClickCrew.bind(null, index));
    });
}
function handleDotClickCrew(index) {
    currentIndex = index; 
    updateCrewData(index);
}
async function loadDataCrew() {
    try {
        const response = await fetch("./assets/data/data.json");
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        return data["crew"];
    } catch (error) {
        console.error('Error loading data:', error);
    }
}
function updateDOMReferencesCrew() {
    rankElement = document.querySelector(".rank-crew h1");
    nameElement = document.querySelector(".name-crew h2");
    descElement = document.querySelector(".description-crew p");
    imageElement = document.querySelector(".main-content-crew .right-content img");
    // console.log("Referensi DOM diperbarui");
}

async function updateCrewData(index) {
    updateDOMReferencesCrew()
    updateDotElementsCrew()
    attachDotEventListenersCrew()
    crewData = await loadDataCrew();

    addFadeClassesCrew();

    setTimeout(() => {
        const { role, name, bio, images } = crewData[index];

        updateContentCrew(role, name, bio, images);
        
        addFadeActiveClassesCrew();
        
        setTimeout(removeFadeClassesCrew, 500); 
    }, 500);

    updatePaginationDots(index);
}

function addFadeClassesCrew() {
    rankElement.classList.add("fade");
    nameElement.classList.add("fade");
    descElement.classList.add("fade");
    imageElement.classList.add("fade");
}

function updateContentCrew(role, name, bio, images) {
    rankElement.textContent = role.toUpperCase();
    nameElement.textContent = name.toUpperCase();
    descElement.textContent = bio;
    imageElement.src = images['webp'];
}

function addFadeActiveClassesCrew() {
    rankElement.classList.add("fade-active");
    nameElement.classList.add("fade-active");
    descElement.classList.add("fade-active");
    imageElement.classList.add("fade-active");
}

function removeFadeClassesCrew() {
    rankElement.classList.remove("fade", "fade-active");
    nameElement.classList.remove("fade", "fade-active");
    descElement.classList.remove("fade", "fade-active");
    imageElement.classList.remove("fade", "fade-active");
}

function updatePaginationDots(index) {
    dotElements.forEach((dot, idx) => {
        dot.classList.toggle("inactive", idx !== index);
    });
}

function startAutoChange() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % crewData.length;
        updateCrewData(currentIndex); 
    }, 4000); 
}

dotElements.forEach((dot, index) => {
    dot.addEventListener("click", async () => {
        currentIndex = index; 
        await updateCrewData(index); 
    });
});

updateCrewData(currentIndex).then(startAutoChange);
