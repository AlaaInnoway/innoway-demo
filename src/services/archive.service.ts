import authService from '@feature/authentification/services/auth.service';
import API_BASE_URL from '../config';

interface ArchiveRecordRequest {
  modelName: string;
  id: number;
}

const archiveRecord = async ({ modelName, id }: ArchiveRecordRequest) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/archive`);
  url.searchParams.append('modelName', modelName);
  url.searchParams.append('id', id.toString());

  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to archive record');
  }
};

export default archiveRecord;
