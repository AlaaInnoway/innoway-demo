import createRecord, { CreateRecordRequest } from '../services/create.service';
import { useMutation, useQueryClient } from 'react-query';

const useCreateRecord = (queryKey: string) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation((recordData: CreateRecordRequest) =>
    createRecord(recordData)
  );

  const createRecordAndUpdateQueries = async (
    recordData: CreateRecordRequest
  ) => {
    const response = await createMutation.mutateAsync(recordData);
    queryClient.invalidateQueries(queryKey);
    return response;
  };

  return { createRecord: createRecordAndUpdateQueries, createMutation };
};

export default useCreateRecord;
