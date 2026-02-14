const TOILETS_API_URL = 'http://167.71.2.41/api/toilets';

export const getAllToilets = async () => {
  const response = await fetch(TOILETS_API_URL);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('API response is not an array');
  }

  return data;
};
