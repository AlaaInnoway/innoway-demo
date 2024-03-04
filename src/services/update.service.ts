import authService from '../features/authentification/services/auth.service';
import API_BASE_URL from '../config';

interface UpdateRecordRequest {
  modelName: string;
  recordId: number;
  updates: any; // Adjust this based on your API's UpdateRecordRequest type
}

const updateRecord = async ({
  modelName,
  recordId,
  updates,
}: UpdateRecordRequest) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/update`);
  url.searchParams.append('modelName', modelName);
  url.searchParams.append('id', recordId.toString());

  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update record');
  }

  return response.json();
};

export default updateRecord;
