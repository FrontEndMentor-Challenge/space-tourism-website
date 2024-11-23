const menuBtn = document.getElementById("menuBtn")
const sideMenu = document.getElementById("sideMenu")
const closeBtn = document.getElementById("closeBtn")
const overlay = document.getElementById("overlay")
let currentPage =''

menuBtn.addEventListener("click",() => {
  toggleMenu(true)
})
closeBtn.addEventListener("click",() => {
  toggleMenu(false)
})

overlay.addEventListener("click",() => {
  toggleMenu(false)
})

function toggleMenu(isActive){
  const action = isActive ? 'add':'remove'
  sideMenu.classList[action]('active')
  overlay.classList[action]('active')
}
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

function handleMenuItemClick(element, menuType) {
  const page = $(element).data("page");
  const currentSelector = (menuType === 'menu-mobile') ? ".menu-mobile a p" : ".nav a";
  document.querySelectorAll(currentSelector).forEach(val => val.classList.remove("active"))
  $(element).find("p").addClass("active");

  if( currentPage === page) {
    return
  }
  loadPage(page);
  if (menuType === 'menu-mobile') {
    toggleMenu(false); 
  }
}

function loadPage(page) {
    $("#bodyTarget").fadeOut(300, function () {
      changeBodyBackground(page)
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
};

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




