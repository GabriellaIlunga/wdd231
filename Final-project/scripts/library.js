document.addEventListener("DOMContentLoaded", () => {
  const bookContainer = document.getElementById("book-container");
  const searchInput = document.getElementById("search-input");
  const genreFilter = document.getElementById("genre-filter");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const primaryNav = document.getElementById("primary-nav");

  
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

  
  if (!bookContainer) return;

  let allBooks = [];

  async function fetchBooks() {
    try {
      const response = await fetch("books.json");
      if (!response.ok) throw new Error("Network response was not ok");
      allBooks = await response.json();
      displayBooks(allBooks);
      checkUrlParams();
    } catch (error) {
      console.error("Error fetching books:", error);
      bookContainer.innerHTML = `<p class="error">Unable to load library catalog.</p>`;
    }
  }

  function displayBooks(books) {
    bookContainer.innerHTML = "";

    if (!books || books.length === 0) {
      bookContainer.innerHTML = `<p>No books match your search.</p>`;
      return;
    }

    books.forEach((book) => {
      const card = document.createElement("div");
      card.className = "card";

      
      const stars = "★".repeat(book.rating || 0) + "☆".repeat(5 - (book.rating || 0));

      card.innerHTML = `
        ${book.image ? `<img src="${book.image}" alt="${book.title} cover" class="book-cover" onerror="this.style.display='none'">` : ""}
        <h3>${book.title || "Untitled"}</h3>
        <p class="author">By ${book.author || "Unknown"}</p>
        <p class="genre"><strong>Genre:</strong> ${book.genreLabel || book.genre || "General"}</p>
        <p class="rating"><strong>Rating:</strong> ${stars}</p>
        <p class="summary">${book.summary || "No summary available."}</p>
        <p class="pages"><strong>Pages:</strong> ${book.pages || "N/A"}</p>
      `;

      bookContainer.appendChild(card);
    });
  }

  function filterBooks() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedGenre = genreFilter ? genreFilter.value.toLowerCase().trim() : "all";

    const filtered = allBooks.filter((book) => {
      const titleMatch = book.title ? book.title.toLowerCase().includes(searchTerm) : false;
      const authorMatch = book.author ? book.author.toLowerCase().includes(searchTerm) : false;
      const matchesSearch = titleMatch || authorMatch;

      const genreKey = book.genre ? book.genre.toLowerCase() : "";
      const matchesGenre = selectedGenre === "all" || genreKey === selectedGenre;

      return matchesSearch && matchesGenre;
    });

    displayBooks(filtered);
  }

  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const genreParam = params.get("genre");
    if (genreParam && genreFilter) {
      genreFilter.value = genreParam.toLowerCase();
      filterBooks();
    }
  }

  if (searchInput) searchInput.addEventListener("input", filterBooks);
  if (genreFilter) genreFilter.addEventListener("change", filterBooks);

  fetchBooks();
});