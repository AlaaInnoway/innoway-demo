import { FilterRequest } from '../interfaces/filter-request.interface';
import API_BASE_URL from '../config';
import authService from '../features/authentification/services/auth.service';

const fetchFilterData = async (filterData: FilterRequest) => {
  const accessToken = authService.getAccessToken();
  const response = await fetch(`${API_BASE_URL}/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(filterData),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const fetchCountData = async (filterData: FilterRequest) => {
  const accessToken = authService.getAccessToken();
  const response = await fetch(`${API_BASE_URL}/filter/count`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(filterData),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export default fetchFilterData;
