let currentIndex = 0;
let crewData = [];
let rankElement = document.querySelector(".rank-crew h1");
let nameElement = document.querySelector(".name-crew h2");
let descElement = document.querySelector(".description-crew p");
let imageElement = document.querySelector(".main-content-crew .right-content img");

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

async function updateCrewData(index) {
    crewData = await loadDataCrew();

    // Menambahkan kelas fade untuk transisi
    addFadeClassesCrew();

    setTimeout(() => {
        const { role, name, bio, images } = crewData[index];

        // Update konten
        updateContentCrew(role, name, bio, images);

        // Menambahkan kelas fade-active untuk transisi elemen
        addFadeActiveClassesCrew();

        // Menghapus kelas fade dan fade-active setelah transisi selesai
        setTimeout(removeFadeClassesCrew, 500); // Durasi yang sama dengan transisi
    }, 500);

    // Update status dot pada pagination
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
    imageElement.src = images.webp;
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
    document.querySelectorAll(".pagination .dot").forEach((dot, idx) => {
        dot.classList.toggle("inactive", idx !== index);
    });
}

function startAutoChangeCrew() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % crewData.length; // Pergantian indeks, kembali ke awal jika melebihi panjang array
        console.log(currentIndex);
        updateCrewData(currentIndex); // Update konten berdasarkan indeks baru
    }, 4000); // Ganti setiap detik
}

document.querySelectorAll(".pagination .dot").forEach((dot, index) => {
    dot.addEventListener("click", async () => {
        currentIndex = index; // Update indeks ke indeks yang dipilih
        await updateCrewData(index); // Perbarui konten
    });
});

updateCrewData(currentIndex).then(startAutoChangeCrew);
