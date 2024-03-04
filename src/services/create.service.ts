import authService from '../features/authentification/services/auth.service';
import API_BASE_URL from '../config';

export interface CreateRecordRequest {
  modelName: string;
  data: any; // Adjust this based on your API's UpdateRecordRequest type
}

const createRecord = async ({ modelName, data }: CreateRecordRequest) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/create`);
  url.searchParams.append('modelName', modelName);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create record');
  }

  return response.json();
};

export default createRecord;
