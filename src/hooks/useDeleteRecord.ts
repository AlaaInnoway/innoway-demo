import deleteRecord from '../services/delete.service';
import { useMutation, useQueryClient } from 'react-query';

interface DeleteRecordRequest {
  modelName: string;
  id: number;
}

const useDeleteRecord = (queryKey: string) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation((recordData: DeleteRecordRequest) =>
    deleteRecord(recordData)
  );

  const deleteRecordAndUpdateQueries = async (
    recordData: DeleteRecordRequest
  ) => {
    await deleteMutation.mutateAsync(recordData);
    queryClient.invalidateQueries(queryKey);
  };

  return { deleteRecord: deleteRecordAndUpdateQueries, deleteMutation };
};

export default useDeleteRecord;
