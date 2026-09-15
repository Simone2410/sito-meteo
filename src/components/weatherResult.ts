import type { GeocodingResult } from '../types/geocoding';
import type { WeatherData } from '../types/weather';
import { getWeatherInfo } from '../utils/weatherCodes';

function formatDayLabel(date: Date, index: number): string {
  if (index === 0) return 'Oggi';
  const label = date.toLocaleDateString('it-IT', { weekday: 'short' });
  return label.charAt(0).toUpperCase() + label.slice(1).replace('.', '');
}

function renderForecastDay(date: Date, code: number, max: number, min: number, index: number): string {
  const { emoji } = getWeatherInfo(code);
  return `
    <div class="forecast-day">
      <span class="forecast-day-label">${formatDayLabel(date, index)}</span>
      <span class="forecast-day-icon">${emoji}</span>
      <span class="forecast-day-temps">${Math.round(max)}° / ${Math.round(min)}°</span>
    </div>
  `;
}

export function renderWeatherResult(location: GeocodingResult, weather: WeatherData): string {
  const { current, daily } = weather;
  const { emoji, label } = getWeatherInfo(current.weatherCode);

  const locationLabel = location.admin1
    ? `${location.name}, ${location.admin1}`
    : `${location.name}, ${location.country}`;

  const forecastDays = daily.time
    .map((date, i) => renderForecastDay(date, daily.weatherCode[i], daily.temperatureMax[i], daily.temperatureMin[i], i))
    .join('');

  return `
    <div class="weather-result">
      <h2 class="result-location">${locationLabel}</h2>

      <div class="result-current">
        <span class="result-icon">${emoji}</span>
        <span class="result-temp">${Math.round(current.temperature)}°</span>
      </div>
      <p class="result-condition">${label}</p>

      <div class="result-stats">
        <div class="stat">
          <span class="stat-value">${Math.round(current.apparentTemperature)}°</span>
          <span class="stat-label">Percepita</span>
        </div>
        <div class="stat">
          <span class="stat-value">${current.relativeHumidity}%</span>
          <span class="stat-label">Umidità</span>
        </div>
        <div class="stat">
          <span class="stat-value">${Math.round(current.windSpeed)} km/h</span>
          <span class="stat-label">Vento</span>
        </div>
      </div>

      <div class="forecast-divider"></div>

      <div class="forecast-grid">
        ${forecastDays}
      </div>
    </div>
  `;
}