import { useQuery } from 'react-query';
import searchDocumentByName from '../services/search-document.service';

const useSearchDocument = (name: string, parentId: any) => {
  return useQuery(['filterData', name], () => searchDocumentByName(name, parentId)).data;
};

export default useSearchDocument;
