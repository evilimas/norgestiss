export const getAllToilets = async () => {
  try {
    const response = await fetch('http://167.71.2.41/api/toilets');
    return await response.json();
  } catch (error) {
    console.error('Error fetching toilets:', error);
    return [];
  }
};
