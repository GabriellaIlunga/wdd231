document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Navigation Toggle Logic
  // ==========================================
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (hamburgerToggle && primaryNav) {
    hamburgerToggle.addEventListener('click', () => {
      primaryNav.classList.toggle('open');
      const isOpen = primaryNav.classList.contains('open');
      hamburgerToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // ==========================================
  // 2. Reading Tracker Logic (localStorage)
  // ==========================================
  const trackerForm = document.getElementById('tracker-form');
  const trackerList = document.getElementById('tracker-list');

  // Load existing activities from localStorage on page load
  displayLoggedActivities();

  if (trackerForm) {
    trackerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const titleInput = document.getElementById('book-title');
      const pagesInput = document.getElementById('pages-read');
      const statusInput = document.getElementById('reading-status');
      const ratingInput = document.getElementById('rating');

      const newEntry = {
        id: Date.now(),
        title: titleInput.value.trim(),
        pages: pagesInput.value,
        status: statusInput.value,
        rating: ratingInput.value,
        date: new Date().toLocaleDateString()
      };

      saveEntryToStorage(newEntry);
      displayLoggedActivities();

      // Reset form fields
      trackerForm.reset();
    });
  }

  function getStoredEntries() {
    return JSON.parse(localStorage.getItem('cozyNookTracker')) || [];
  }

  function saveEntryToStorage(entry) {
    const entries = getStoredEntries();
    entries.unshift(entry); // Add latest activity to the top
    localStorage.setItem('cozyNookTracker', JSON.stringify(entries));
  }

  function displayLoggedActivities() {
    if (!trackerList) return;

    const entries = getStoredEntries();

    if (entries.length === 0) {
      trackerList.innerHTML = `
        <p class="empty-msg">No progress logged yet. Use the form above to record your reading milestones!</p>
      `;
      return;
    }

    trackerList.innerHTML = entries.map(entry => `
      <article class="nook-card">
        <h3>${escapeHtml(entry.title)}</h3>
        <p><strong>Pages Completed:</strong> ${entry.pages}</p>
        <p><strong>Status:</strong> ${entry.status}</p>
        <p><strong>Rating:</strong> ${'&#9733;'.repeat(entry.rating)}${'&#9734;'.repeat(5 - entry.rating)}</p>
        <p><small>Logged on ${entry.date}</small></p>
      </article>
    `).join('');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ==========================================
  // 3. Footer Last Modified Date
  // ==========================================
  const lastModifiedSpan = document.getElementById('lastModified');
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
  }
});