document.addEventListener("DOMContentLoaded", () => {

  const menuButton = document.getElementById("menu-button");
  const navMenu = document.querySelector(".nav-menu");

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      menuButton.classList.toggle("open");
    });
  }

  const jsonURL = "data/members.json";
  const container = document.getElementById("directory-container");
  const gridBtn = document.getElementById("grid-view-btn");
  const listBtn = document.getElementById("list-view-btn");

  async function fetchMembers() {
    try {
      const response = await fetch(jsonURL);
      const data = await response.json();
      displayMembers(data);
    } catch (error) {
      console.error("Error loading chamber member directory database:", error);
    }
  }

  function displayMembers(members) {
    if (!container) return;
    container.innerHTML = "";

    members.forEach((member) => {
      const card = document.createElement("section");
      card.className = "directory-card";

      const levels = { 1: "Member", 2: "Silver Partner", 3: "Gold Partner" };

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" decoding="async">
        <h3>${member.name}</h3>
        <p class="tagline"><em>"${member.tagline}"</em></p>
        <p class="address">📍 ${member.address}</p>
        <p class="phone">📞 ${member.phone}</p>
        <p class="url"><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website Links</a></p>
        <span class="badge level-${member.membershipLevel}">${levels[member.membershipLevel]}</span>
      `;
      container.appendChild(card);
    });
  }

  if (gridBtn && listBtn && container) {
    gridBtn.addEventListener("click", () => {
      container.className = "grid-layout";
      gridBtn.classList.add("active");
      listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
      container.className = "list-layout";
      listBtn.classList.add("active");
      gridBtn.classList.remove("active");
    });
  }

  fetchMembers();
});