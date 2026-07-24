document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = window.location.href;
    const formData = new URLSearchParams(window.location.search);
    const resultsContainer = document.querySelector('#results');

    if (resultsContainer && formData.has('fname')) {
        const rawDate = formData.get('timestamp') || '';
        let formattedDate = rawDate;
        
        if (rawDate) {
            const parsedDate = new Date(rawDate);
            if (!isNaN(parsedDate)) {
                formattedDate = parsedDate.toLocaleString();
            }
        }

        resultsContainer.innerHTML = `
            <p><strong>First Name:</strong> ${formData.get('fname')}</p>
            <p><strong>Last Name:</strong> ${formData.get('lname')}</p>
            <p><strong>Email:</strong> ${formData.get('email')}</p>
            <p><strong>Mobile Phone:</strong> ${formData.get('phone')}</p>
            <p><strong>Business Name:</strong> ${formData.get('organization')}</p>
            <p><strong>Date/Time Submitted:</strong> ${formattedDate}</p>
        `;
    }
});