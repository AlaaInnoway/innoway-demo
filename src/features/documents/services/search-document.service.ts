import API_BASE_URL from '../../../config';
import { FilterRequest } from '../../../interfaces/filter-request.interface';
import authService from '../../../features/authentification/services/auth.service';

const searchDocumentByName = async (name: string, parentId: any) => {
  const filterData: FilterRequest = {
    modelName: 'Document',
    filters: [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'name',
            operator: 'equals',
            values: name,
          },
          {
            field: 'parentId',
            operator: 'equals',
            values: parentId,
          },
          {
            field: 'typeId',
            operator: 'equals',
            values: undefined,
          },
        ],
      },
    ],
    selectFields: ['id', 'name', 'typeId'],
    sortField: 'id',
    sortOrder: 'asc',
    page: 1,
    perPage: 1000,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/filter`);
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(filterData),
  });

  if (!response.ok) {
    throw new Error('Failed to create document');
  }

  return response.json();
};

export const searchDocumentTypeByExtension = async (extension: string) => {
  const filterData: FilterRequest = {
    modelName: 'DocumentType',
    filters: [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'extension',
            operator: 'equals',
            values: extension,
          },
        ],
      },
    ],
    selectFields: ['id', 'name'],
    sortField: 'id',
    sortOrder: 'asc',
    page: 1,
    perPage: 1000,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/filter`);
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(filterData),
  });

  if (!response.ok) {
    throw new Error('Failed to create document');
  }

  return response.json();
};

export default searchDocumentByName;
