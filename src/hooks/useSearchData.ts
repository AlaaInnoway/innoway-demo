import { SearchRequest } from '../interfaces/search-request.interface';
import fetchSearchData from '../services/search.service';
import { useQuery } from 'react-query';

const useSearchData = (searchData: SearchRequest) => {
  return useQuery(['searchData', searchData], () =>
    fetchSearchData(searchData)
  );
};

export default useSearchData;
