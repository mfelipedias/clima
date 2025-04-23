const API_KEY = '2a6f4684baf57c1fccf734b7dabaa6b9';
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        weatherInfo.innerHTML = '<p>Por favor, insira uma cidade.</p>';
    }
}

// Evento de clique no botão
searchButton.addEventListener('click', handleSearch);

// Evento de tecla Enter no campo de entrada
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error('Cidade não encontrada.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, weather, main } = data;
    const description = weather[0].description;
    const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>${capitalizedDescription}</p>
        <p>Temperatura: ${main.temp}°C</p>
        <p>Sensação térmica: ${main.feels_like}°C</p>
        <p>Humidade: ${main.humidity}%</p>
    `;
}