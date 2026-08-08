document.addEventListener("DOMContentLoaded", () => {
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
  }

  const hamburgerToggle = document.getElementById("hamburger-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (hamburgerToggle && primaryNav) {
    hamburgerToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("open");
      hamburgerToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      hamburgerToggle.textContent = isOpen ? "❌" : "☰";
    });
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

  const forumForm = document.getElementById("forum-form");
  if (forumForm) {
    forumForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const userName = document.getElementById("forum-name").value;
      const topic = document.getElementById("forum-book").value;

      forumForm.innerHTML = `
        <div class="form-alert">
          📖 <strong>Thank you, ${userName}!</strong><br>
          Your contribution to the discussion on <em>"${topic}"</em> has been posted to the forum. Welcome to the group!
        </div>
      `;
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const contactName = document.getElementById("contact-name").value;

      contactForm.innerHTML = `
        <div class="form-alert">
          💌 <strong>Thank you for reaching out, ${contactName}!</strong><br>
          We have received your message and book suggestions. Our team will get back to you shortly!
        </div>
      `;
    });
  }
});