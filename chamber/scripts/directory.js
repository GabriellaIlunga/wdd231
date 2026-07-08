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
    container.innerHTML = "";
    
    members.forEach(member => {
        const card = document.createElement("section");
        card.className = "directory-card";
        
        // Define membership labels
        const levels = { 1: "Member", 2: "Silver Partner", 3: "Gold Partner" };
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="tagline"><em>"${member.tagline}"</em></p>
            <p class="address">📍 ${member.address}</p>
            <p class="phone">📞 ${member.phone}</p>
            <p class="url"><a href="${member.website}" target="_blank">Visit Website Links</a></p>
            <span class="badge level-${member.membershipLevel}">${levels[member.membershipLevel]}</span>
        `;
        container.appendChild(card);
    });
}

// Layout Switcher Functions
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

fetchMembers();