import updateRecord from '../services/update.service';
import { useMutation, useQueryClient } from 'react-query';

const useUpdateRecord = (queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation(updateRecord, {
    // This function is called on successful mutation
    onSettled: () => {
      // Invalidate the relevant query to refresh cached data
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useUpdateRecord;
