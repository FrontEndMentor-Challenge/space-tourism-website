document.querySelectorAll(".nav-destination a").forEach((link,index) => {
    link.addEventListener('click', async() => {
      const loadData = await loadDataDestinations(index)
      const title = loadData['name']
      const description = loadData['description']
      const distance = loadData['distance']
      const time = loadData['travel']
      const image = link.dataset.image
      const desktopImage = document.querySelector('.image-right-content.desktop');
      const mobileImage = document.querySelector('.image-right-content.mobile');

      
      document.querySelector(".left-content img").src = image
      document.querySelector(".title-nav").textContent = title.toUpperCase()
      document.querySelector(".description-nav p").textContent = description
      document.querySelector(".statistic .distance h2").textContent = distance.toUpperCase()
      document.querySelector(".statistic .time h2").textContent = time.toUpperCase()
      document.querySelectorAll('.nav-destination a').forEach(nav => nav.classList.remove('active'));
      link.classList.add("active")
    })
})

async function loadDataDestinations(index) {
    try {
      const response = await fetch("./assets/data/data.json")
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      return data["destinations"][index]
    } catch (error) {
      console.error('Error loading data:', error);
    }
}

