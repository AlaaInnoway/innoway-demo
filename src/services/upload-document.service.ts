import authService from '../features/authentification/services/auth.service';
import API_BASE_URL from '../config';

interface UploadDocumentRequest {
  recordId: number;
  file: FormData; // Adjust this based on your API's UploadDocumentRequest type
}

const UploadDocument = async ({ recordId, file }: UploadDocumentRequest) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/documents/upload`);
  url.searchParams.append('id', recordId.toString());

  const response = await fetch(url.toString(), {
    method: 'POST',
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

export default UploadDocument;
