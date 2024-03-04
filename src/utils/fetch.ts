import fetchFilterData from "../services/filter.service";

export default function fetchDataByModel(
  modelName: string,
  selectFields?: string[],
  filters: any[] = [],
  sortField = 'id'
) {
  return fetchFilterData({
    modelName,
    filters,
    selectFields: selectFields || ['id', 'name'],
    sortField,
    sortOrder: 'asc',
    page: 1,
    perPage: 10,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  });
}
