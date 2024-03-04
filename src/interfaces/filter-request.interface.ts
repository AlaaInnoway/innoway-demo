export interface FilterRequest {
  modelName: string;
  filters: any[];
  selectFields?: string[];
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
  groupByField?: string;
  groupByAggregates?: any[];
  aggregates?: any[];
}
