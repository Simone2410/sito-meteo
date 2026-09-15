import type { WeatherData } from '../types/weather';

const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getForecast(latitude: number, longitude: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '6', // oggi + 5 giorni
  });

  const response = await fetch(`${FORECAST_BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Errore nel caricamento delle previsioni (status ${response.status})`);
  }

  return response.json();
}