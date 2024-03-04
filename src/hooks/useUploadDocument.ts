import UploadDocument from '../services/upload-document.service';
import { useMutation, useQueryClient } from 'react-query';

const useUploadDocument = (queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation(UploadDocument, {
    // This function is called on successful mutation
    onSettled: () => {
      // Invalidate the relevant query to refresh cached data
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useUploadDocument;
