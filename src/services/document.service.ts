import authService from '../features/authentification/services/auth.service';
import API_BASE_URL from '../config';

const fetchRootDocuments = async () => {
  const accessToken = authService.getAccessToken();
  const response = await fetch(`${API_BASE_URL}/documents`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  // Check if the response body is empty
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return null; // or handle empty response as needed
  }

  console.log('----> response');
  console.log(response);

  return response.json();
};

export const downloadDocument = async (document: any) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/documents/download`);
  url.searchParams.append('id', document.id.toString());

  // Make a GET request
  const response: any = await fetch(url.toString(), {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  // Check the Content-Type to determine if it's a file or a zip archive
  const contentType = response.headers.get('Content-Type');
  const contentDisposition = response.headers.get('Content-Disposition');

  if (contentType && contentType.startsWith('application/zip')) {
    // If it's a zip archive, we can handle it differently
    // Extract the file name from the Content-Disposition header (if available)
    const fileName = contentDisposition
      ? contentDisposition.split('filename=')[1]
      : `${document.name}.zip`;

    // Create a Blob from the response content
    const blob = await response.blob();

    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob);

    return { url, fileName };
  }
  // If it's a regular file, handle it as you normally would
  // Here, you can return the response as is, and the calling code can handle the download
  return response;
};

export default fetchRootDocuments;
