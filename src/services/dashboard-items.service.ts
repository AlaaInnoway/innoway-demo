import authService from "../features/authentification/services/auth.service";
import fetchFilterData from "../services/filter.service";
import API_BASE_URL from "../config";


const createDashboardItem = async (data: any) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/dashboard-items`);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create dashboard');
  }

  return response.json();
};

export const updateDashboardItem = async (recordId: number, data: any) => {
  const accessToken = authService.getAccessToken();
  const url = new URL(`${API_BASE_URL}/dashboard-items`);
  url.searchParams.append('id', recordId.toString());

  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update dashboard');
  }

  return response.json();
};

export const getDashboardItems = async (modelName: string) => {
  return fetchFilterData({
    modelName: 'DashboardItem',
    filters: [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'modelName',
            operator: 'equals',
            values: modelName,
          },
        ],
      },
    ],
    selectFields: [
      'id',
      'type',
      'title',
      'paletteColor',
      'isBookmarked',
      'aggregationOptions',
      'measureField',
      'isClickable',
      'data',
      'icon',
      'modelName',
      'groupByField',
      'subGroupByField',
      'sortOrder',
      'limit',
    ],
    sortField: 'id',
    sortOrder: 'asc',
    page: 1,
    perPage: 1000,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  });
};

export const getAndUpdateDashboardItems = (modelName: string) => {
  getDashboardItems(modelName).then((result) => {
    result?.records.forEach((item: any) => {
      const {
        type,
        title,
        paletteColor,
        isBookmarked,
        isClickable,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        modelName,
        aggregationOptions,
        groupByField,
        subGroupByField,
        measureField,
        sortOrder,
        limit,
        icon,
        sequence,
      } = item;
      const updates =
        type === 'tile'
          ? {
              type,
              title,
              paletteColor,
              isBookmarked,
              isClickable,
              modelName,
              filters: [],
              selectFields: [
                'id',
                aggregationOptions === 'count' ? groupByField : measureField,
              ],
              aggregationOptions,
              groupByField,
              subGroupByField,
              measureField,
              sortOrder,
              limit,
              data: '',
              icon,
              sequence,
            }
          : {
              type,
              title,
              paletteColor,
              isBookmarked,
              isClickable,
              modelName,
              filters: [],
              selectFields: [
                'id',
                groupByField,
                aggregationOptions === 'count' ? 'id' : groupByField,
              ],
              aggregationOptions,
              groupByField,
              subGroupByField,
              measureField,
              sortOrder,
              limit,
              data: '',
              icon,
              sequence,
            };
      updateDashboardItem(item.id, updates);
    });
  });
};

export default createDashboardItem;
