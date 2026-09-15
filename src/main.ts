import './style.css';
import { searchCity } from './services/geocoding.service';
import { getForecast } from './services/weather.service';
import { renderWeatherResult } from './components/weatherResult';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="app-layout">
    <div class="weather-card">
      <h1 class="weather-title">Horizon</h1>
      <p class="weather-subtitle">Cerca una città e scopri le previsioni</p>

      <form id="search-form" class="search-form">
        <input
          type="text"
          id="city-input"
          class="search-input"
          placeholder="Es. Busto Arsizio"
          autocomplete="off"
          required
        />
        <button type="submit" class="search-button">Cerca</button>
      </form>
    </div>
    <div id="result-container"></div>
  </div>
`;

app.classList.add('centered'); // 👈 qui, fuori dalle backtick

const form = document.querySelector<HTMLFormElement>('#search-form')!;
const input = document.querySelector<HTMLInputElement>('#city-input')!;
const resultContainer = document.querySelector<HTMLDivElement>('#result-container')!;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const cityName = input.value.trim();
  if (!cityName) return;

  resultContainer.innerHTML = '<p class="result-message">Ricerca in corso...</p>';

  try {
    const results = await searchCity(cityName);

    if (results.length === 0) {
      resultContainer.innerHTML = `<p class="result-message error">Nessuna città trovata per "${cityName}".</p>`;
      app.classList.add('centered');
      return;
    }

    const location = results[0];
    const weather = await getForecast(location.latitude, location.longitude);

    resultContainer.innerHTML = renderWeatherResult(location, weather);
    app.classList.remove('centered');
  } catch (error) {
    console.error(error);
    resultContainer.innerHTML = '<p class="result-message error">⚠️ Errore nel caricamento del meteo. Riprova.</p>';
    app.classList.add('centered');
  }
});