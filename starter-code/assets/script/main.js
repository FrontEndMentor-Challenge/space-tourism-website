const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");
let currentPage = '';
let crewClick = 0;
let technologyClick = 0;
let destinationClick = 0;

menuBtn.addEventListener("click", () => {
  toggleMenu(true);
});

closeBtn.addEventListener("click", () => {
  toggleMenu(false);
});

overlay.addEventListener("click", () => {
  toggleMenu(false);
});

function toggleMenu(isActive) {
  const action = isActive ? 'add' : 'remove';
  sideMenu.classList[action]("active");
  overlay.classList[action]("active");
}

let debounceTimeout;

function debounce(func, delay) {
    return function (...args) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func.apply(this, args), delay);
    };
}
const debouncedLoadPage = debounce(loadPage, 300);

// Menghandle klik pada menu mobile
$(document).ready(function () {
  $(".menu-mobile a").on("click", function (e) {
    e.preventDefault();
    handleMenuItemClick(this, 'menu-mobile');
  });
  
  $(".nav a").on("click", function (e) {
    e.preventDefault();
    handleMenuItemClick(this, 'nav');
  });
});

// Fungsi untuk menangani klik item menu
function handleMenuItemClick(element, menuType) {
  const page = $(element).data("page");
  const currentSelector = (menuType === 'menu-mobile') ? ".menu-mobile a p" : ".nav a";

  // Menghapus kelas active dari semua item menu
  document.querySelectorAll(currentSelector).forEach(val => val.classList.remove("active"));
  $(element).find("p").addClass("active");

  if (currentPage === page) {
    return;
  }
  debouncedLoadPage(page);

  loadPage(page);
  if (menuType === 'menu-mobile') {
    toggleMenu(false); // Tutup menu jika dari menu mobile
  }
}

// Fungsi untuk memuat halaman baru
function loadPage(page) {
  $("#bodyTarget").fadeOut(300, function () {
    changeBodyBackground(page);
    $.ajax({
      url: `./page/${page}.html`, 
      method: "GET",
      success: function (data) {
        $("#bodyTarget").html(data);
        $("#bodyTarget").fadeIn(300);
        currentPage = page; 
      },
      error: function () {
        console.error("Gagal memuat halaman.");
      }
    });
  });
}

// Fungsi untuk mengubah latar belakang body berdasarkan halaman
function changeBodyBackground(page) {
  const body = document.body;
  const backgrounds = {
    destination: "destination-background",
    home: "main-background",
    crew: "crew-background",
    technology: "technology-background"
  };

  // Hapus semua kelas latar belakang
  Object.values(backgrounds).forEach(className => body.classList.remove(className));
  
  // Tambahkan kelas latar belakang yang sesuai
  body.classList.add(backgrounds[page] || "main-background");
}
