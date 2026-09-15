import { fetchWeatherApi } from 'openmeteo';
import type { WeatherData } from '../types/weather';

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getForecast(latitude: number, longitude: number): Promise<WeatherData> {
  const params = {
    latitude: [latitude],
    longitude: [longitude],
    current: [
      'is_day',
      'temperature_2m',
      'apparent_temperature',
      'wind_speed_10m',
      'weather_code',
      'relative_humidity_2m',
      'precipitation',
    ],
    daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code'],
    timezone: 'auto',
  };

  const responses = await fetchWeatherApi(FORECAST_URL, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const daily = response.daily()!;

  // Ricostruisce le date dei giorni a partire da timestamp Unix
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  return {
    current: {
      isDay: current.variables(0)!.value(),
      temperature: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value(),
      windSpeed: current.variables(3)!.value(),
      weatherCode: current.variables(4)!.value(),
      relativeHumidity: current.variables(5)!.value(),
      precipitation: current.variables(6)!.value(),
    },
    daily: {
      time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperatureMax: Array.from(daily.variables(0)!.valuesArray()!),
      temperatureMin: Array.from(daily.variables(1)!.valuesArray()!),
      weatherCode: Array.from(daily.variables(2)!.valuesArray()!),
    },
  };
}