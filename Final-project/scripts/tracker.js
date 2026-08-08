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
      link.classList.add("nook-active");
    } else {
      link.classList.remove("nook-active");
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

  const trackerForm = document.getElementById("tracker-form");
  const trackerList = document.getElementById("tracker-list");

  if (!trackerForm || !trackerList) return;

  function loadProgress() {
    const saved = localStorage.getItem("cozyNookTracker");
    const entries = saved ? JSON.parse(saved) : [];
    displayEntries(entries);
  }

  function displayEntries(entries) {
    trackerList.innerHTML = "";
    if (entries.length === 0) {
      trackerList.innerHTML = `<p class="empty-msg">No progress logged yet. Use the form above to record your reading milestones!</p>`;
      return;
    }

    entries.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "nook-card nook-book-card";

      const stars = "★".repeat(Number(item.rating) || 0) + "☆".repeat(5 - (Number(item.rating) || 0));

      card.innerHTML = `
        <h3>${item.bookTitle}</h3>
        <p><strong>Pages Completed:</strong> ${item.pagesRead}</p>
        <p><strong>Status:</strong> ${item.readingStatus}</p>
        <p><strong>Rating:</strong> ${stars}</p>
        <br>
        <button class="nook-btn nook-btn-secondary delete-btn" data-index="${index}">Remove</button>
      `;
      trackerList.appendChild(card);
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-index");
        removeEntry(idx);
      });
    });
  }

  function removeEntry(index) {
    const saved = localStorage.getItem("cozyNookTracker");
    if (!saved) return;
    let entries = JSON.parse(saved);
    entries.splice(index, 1);
    localStorage.setItem("cozyNookTracker", JSON.stringify(entries));
    displayEntries(entries);
  }

  trackerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const bookTitle = document.getElementById("book-title").value;
    const pagesRead = document.getElementById("pages-read").value;
    const readingStatus = document.getElementById("reading-status").value;
    const rating = document.getElementById("rating").value;

    const newEntry = { bookTitle, pagesRead, readingStatus, rating };

    const saved = localStorage.getItem("cozyNookTracker");
    const entries = saved ? JSON.parse(saved) : [];
    entries.push(newEntry);

    localStorage.setItem("cozyNookTracker", JSON.stringify(entries));
    trackerForm.reset();
    displayEntries(entries);
  });

  loadProgress();
});