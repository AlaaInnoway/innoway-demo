import API_BASE_URL from '../../../config';
import authService from '../../../features/authentification/services/auth.service';

const createDocument = async (data: any) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/documents`);
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create document');
  }

  return response.json();
};

export default createDocument;
