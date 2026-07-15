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

fetchWeather();