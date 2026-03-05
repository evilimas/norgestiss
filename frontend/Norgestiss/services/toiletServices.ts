const TOILETS_API_URL = 'http://167.71.2.41/api/toilets';

export type Toilet = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  adress: string;
  isFree: boolean;
  hasHandicapAccess: boolean;
  description: string;
};

export type CreateToiletPayload = Omit<Toilet, 'id'>;

export const getAllToilets = async () => {
  const response = await fetch(TOILETS_API_URL);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('API response is not an array');
  }

  return data as Toilet[];
};

export const createToilet = async (payload: CreateToiletPayload) => {
  const response = await fetch(TOILETS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as Toilet;
};
