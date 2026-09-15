export interface CurrentWeather {
  isDay: number;               // 1 = giorno, 0 = notte
  temperature: number;
  apparentTemperature: number;
  windSpeed: number;
  weatherCode: number;
  relativeHumidity: number;
  precipitation: number;
}

export interface DailyForecast {
  time: Date[];
  temperatureMax: number[];
  temperatureMin: number[];
  weatherCode: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast;
}