import authService from '../features/authentification/services/auth.service';
import API_BASE_URL from '../config';

interface DeleteRecordRequest {
  modelName: string;
  id: number;
}

const deleteRecord = async ({ modelName, id }: DeleteRecordRequest) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/delete`);
  url.searchParams.append('modelName', modelName);
  url.searchParams.append('id', id.toString());

  const response = await fetch(url.toString(), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete record');
  }
};

export default deleteRecord;
