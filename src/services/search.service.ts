import { SearchRequest } from '../interfaces/search-request.interface';
import API_BASE_URL from '../config';
import authService from '../features/authentification/services/auth.service';

const fetchSearchData = async (searchData: SearchRequest) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/search`);
  url.searchParams.append('id', searchData.recordId.toString());
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(searchData),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export default fetchSearchData;
