import authService from '../features/authentification/services/auth.service';
import API_BASE_URL from '../config';

interface UploadImageRequest {
  modelName: string;
  recordId: number;
  file: FormData; // Adjust this based on your API's UploadImageRequest type
}

const uploadImage = async ({
  modelName,
  recordId,
  file,
}: UploadImageRequest) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/image-upload`);
  url.searchParams.append('modelName', modelName);
  url.searchParams.append('id', recordId.toString());

  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return response.json();
};

export default uploadImage;
