import { FilterRequest } from '../interfaces/filter-request.interface';
import fetchFilterData from '../services/filter.service';
import { useQuery } from 'react-query';

const useFilterData = (filterData: FilterRequest) => {
  return useQuery(['filterData', filterData], () =>
    fetchFilterData(filterData)
  );
};

export default useFilterData;
