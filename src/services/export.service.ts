import { FilterRequest } from '../interfaces/filter-request.interface';
import API_BASE_URL from '../config';
import authService from '../features/authentification/services/auth.service';

const exportData = async (filterData: FilterRequest, exportType: string) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/export`);
  url.searchParams.append('type', exportType);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(filterData),
  });

  if (!response.ok) {
    throw new Error('Failed to export data');
  }

  return response.json();
};

export default exportData;
