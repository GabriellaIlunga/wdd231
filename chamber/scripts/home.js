const apiKey = '96e2fbc680850e1e9fef62d0e1d36fe0'; 
const lat = '-26.2041';
const lon = '28.0473';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      console.error("Server response error:", await response.text());
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function displayWeather(data) {
  const current = data.list[0];
  const tempElement = document.getElementById('current-temp');
  const descElement = document.getElementById('weather-desc');
  const iconElement = document.getElementById('weather-icon');

  if (tempElement) tempElement.innerHTML = `${Math.round(current.main.temp)}`;
  if (descElement) descElement.textContent = current.weather[0].description;
  if (iconElement) {
    iconElement.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    iconElement.alt = current.weather[0].description;
  }

  const forecastContainer = document.getElementById('forecast-container');
  if (forecastContainer) {
    forecastContainer.innerHTML = '';

    const dailyForecasts = [data.list[8], data.list[16], data.list[24]];

    dailyForecasts.forEach(day => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temp = Math.round(day.main.temp);
      const icon = day.weather[0].icon;

      const forecastHTML = `
        <div class="forecast-day">
          <p class="day-name">${dayName}</p>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${day.weather[0].description}">
          <p class="day-temp">${temp}°C</p>
        </div>
      `;
      forecastContainer.innerHTML += forecastHTML;
    });
  }
}

const membersUrl = 'data/members.json';

async function fetchSpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (response.ok) {
      const members = await response.json();
      displaySpotlights(members);
    } else {
      console.error("Failed to load members JSON:", await response.text());
    }
  } catch (error) {
    console.error("Error fetching spotlight members:", error);
  }
}

function displaySpotlights(members) {
  const spotlightContainer = document.getElementById('spotlight-container');
  if (!spotlightContainer) return;

  const eligibleMembers = members.filter(member => member.membershipLevel === 3 || member.membershipLevel === 2);

  const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

  const selectedMembers = shuffled.slice(0, 3);

  spotlightContainer.innerHTML = '';

  selectedMembers.forEach(member => {
    const levelName = member.membershipLevel === 3 ? 'Gold' : 'Silver';
    const levelClass = member.membershipLevel === 3 ? 'level-3' : 'level-2';

    const cardHTML = `
      <div class="spotlight-card card">
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} Logo" class="spotlight-logo">
        <p class="tagline"><em>"${member.tagline || 'Proud Chamber Member'}"</em></p>
        <hr>
        <p><strong>Email:</strong> ${member.email}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p class="membership-badge">Level: <span class="badge ${levelClass}">${levelName}</span></p>
      </div>
    `;
    spotlightContainer.innerHTML += cardHTML;
  });
}

fetchWeather();
fetchSpotlights();