interface WeatherInfo {
  emoji: string;
  label: string;
}

const WEATHER_CODES: Record<number, WeatherInfo> = {
  0: { emoji: '☀️', label: 'Sereno' },
  1: { emoji: '🌤️', label: 'Prevalentemente sereno' },
  2: { emoji: '⛅', label: 'Parzialmente nuvoloso' },
  3: { emoji: '☁️', label: 'Nuvoloso' },
  45: { emoji: '🌫️', label: 'Nebbia' },
  48: { emoji: '🌫️', label: 'Nebbia con brina' },
  51: { emoji: '🌦️', label: 'Pioviggine leggera' },
  53: { emoji: '🌦️', label: 'Pioviggine moderata' },
  55: { emoji: '🌦️', label: 'Pioviggine intensa' },
  61: { emoji: '🌧️', label: 'Pioggia leggera' },
  63: { emoji: '🌧️', label: 'Pioggia moderata' },
  65: { emoji: '🌧️', label: 'Pioggia intensa' },
  71: { emoji: '🌨️', label: 'Neve leggera' },
  73: { emoji: '🌨️', label: 'Neve moderata' },
  75: { emoji: '🌨️', label: 'Neve intensa' },
  80: { emoji: '🌦️', label: 'Rovesci leggeri' },
  81: { emoji: '🌧️', label: 'Rovesci moderati' },
  82: { emoji: '⛈️', label: 'Rovesci violenti' },
  95: { emoji: '⛈️', label: 'Temporale' },
  96: { emoji: '⛈️', label: 'Temporale con grandine' },
  99: { emoji: '⛈️', label: 'Temporale forte con grandine' },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return WEATHER_CODES[code] ?? { emoji: '❓', label: 'Sconosciuto' };
}