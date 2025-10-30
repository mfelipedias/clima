const API_KEY = '2a6f4684baf57c1fccf734b7dabaa6b9';

const elements = {
  button: document.getElementById('search-button'),
  input: document.getElementById('city-input'),
  info: document.getElementById('weather-info'),
  loading: document.getElementById('loading'),
};

elements.button.addEventListener('click', searchCity);
elements.input.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchCity();
});

function searchCity() {
  const city = elements.input.value.trim();
  if (!city) {
    updateInfo('Por favor, insira uma cidade.');
    return;
  }
  fetchWeather(city);
}

async function fetchWeather(city) {
  elements.loading.style.display = 'block';
  elements.info.innerHTML = '';
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=pt_br&appid=${API_KEY}`);
    if (!res.ok) throw new Error('Cidade não encontrada.');
    const data = await res.json();
    showWeather(data);
  } catch (err) {
    updateInfo(err.message);
  } finally {
    elements.loading.style.display = 'none';
  }
}

function showWeather({ name, weather, main }) {
  const description = capitalize(weather[0].description);
  const condition = weather[0].main.toLowerCase();
  let bgClass = '';
  if (condition.includes('clear')) bgClass = 'sunny';
  else if (condition.includes('cloud')) bgClass = 'cloudy';
  else if (condition.includes('rain') || condition.includes('drizzle')) bgClass = 'rainy';
  else if (condition.includes('snow')) bgClass = 'snowy';
  document.body.className = bgClass;
  elements.info.innerHTML = `
    <h2><i class="fas fa-map-marker-alt"></i> ${name}</h2>
    <p><i class="fas fa-cloud"></i> ${description}</p>
    <div class="weather-details">
      <div class="detail"><i class="fas fa-thermometer-half"></i> Temperatura: ${main.temp}°C</div>
      <div class="detail"><i class="fas fa-temperature-high"></i> Sensação térmica: ${main.feels_like}°C</div>
      <div class="detail"><i class="fas fa-tint"></i> Umidade: ${main.humidity}%</div>
    </div>
  `;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function updateInfo(message) {
  elements.info.innerHTML = `<p><i class="fas fa-exclamation-triangle"></i> ${message}</p>`;
}