import type { GeocodingResult } from '../types/geocoding';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function searchCity(name: string): Promise<GeocodingResult[]> {
  const url = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(name)}&count=1&language=it&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Errore nella ricerca della città (status ${response.status})`);
  }

  const data = await response.json();
  return data.results ?? [];
}