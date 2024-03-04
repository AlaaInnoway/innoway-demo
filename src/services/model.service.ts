import API_BASE_URL from '../config';

export async function fetchAvailableModels() {
  const response = await fetch(`${API_BASE_URL}/dashboard/models`);
  const data = await response.json();
  return data;
}

export async function fetchFieldsForModel(modelName: string) {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/fields?modelName=${modelName}`
  );
  const data = await response.json();
  return data;
}
