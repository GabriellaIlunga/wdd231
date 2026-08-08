document.addEventListener("DOMContentLoaded", () => {
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("#primary-nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const primaryNav = document.getElementById("primary-nav");

  if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("open");
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (isOpen) {
        hamburgerBtn.innerHTML = "&times;";
      } else {
        hamburgerBtn.innerHTML = "&#9776;";
      }
    });
  }

  const logForm = document.getElementById("log-form");
  const logConfirmation = document.getElementById("log-confirmation");

  if (!logForm) return;

  logForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("reader-name").value;
    const email = document.getElementById("reader-email").value;
    const genre = document.getElementById("favorite-genre").value;
    const notes = document.getElementById("log-notes").value;

    const logEntry = {
      name,
      email,
      genre,
      notes,
      timestamp: new Date().toISOString()
    };

    const existingLogs = JSON.parse(localStorage.getItem("cozyNookUserLogs") || "[]");
    existingLogs.push(logEntry);
    localStorage.setItem("cozyNookUserLogs", JSON.stringify(existingLogs));

    logForm.reset();

    if (logConfirmation) {
      logConfirmation.style.display = "block";
      logConfirmation.textContent = `Thank you, ${name}! Your reading journal entry has been saved successfully.`;
    }
  });
});