document.addEventListener("DOMContentLoaded", () => {
  
  const menuButton = document.getElementById("menu-button");
  const navMenu = document.querySelector(".nav-menu");

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      menuButton.classList.toggle("open");
    });
  }
  
  const visitDisplay = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("chamberLastVisit");
  const currentVisit = Date.now();
  const msInDay = 86400000;

  if (visitDisplay) {
    if (!lastVisit) {
      visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const timeDiff = currentVisit - parseInt(lastVisit, 10);
      const daysBetween = Math.floor(timeDiff / msInDay);

      if (timeDiff < msInDay) {
        visitDisplay.textContent = "Back so soon! Awesome!";
      } else if (daysBetween === 1) {
        visitDisplay.textContent = "You last visited 1 day ago.";
      } else {
        visitDisplay.textContent = `You last visited ${daysBetween} days ago.`;
      }
    }
  }

  localStorage.setItem("chamberLastVisit", currentVisit.toString());

  async function loadDiscoverCards() {
    const gridContainer = document.getElementById("discover-grid");
    if (!gridContainer) return;

    try {
      const response = await fetch("data/items.json");
      if (!response.ok) throw new Error("Network response was not ok");

      let items = await response.json();

      items.sort((a, b) => a.title.localeCompare(b.title));

      items.forEach((item, index) => {
        const card = document.createElement("section");
        card.classList.add("discover-card", `card-${index + 1}`);

        
        const isFirst = index === 0;
        const loadingAttr = isFirst ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';

        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure>
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              width="300" 
              height="200" 
              ${loadingAttr}
              decoding="async"
            >
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button type="button" class="learn-btn">Learn More</button>
        `;

        gridContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching items.json:", error);
    }
  }

  loadDiscoverCards();
});