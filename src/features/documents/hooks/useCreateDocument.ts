import { useMutation, useQueryClient } from 'react-query';
import createDocument from '../services/create-document.service';

const useCreateDocument = (queryKey: string) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation((recordData: any) =>
    createDocument(recordData)
  );

  const createRecordAndUpdateQueries = async (recordData: any) => {
    const response = await createMutation.mutateAsync(recordData);
    queryClient.invalidateQueries(queryKey);
    return response;
  };

  return { createRecord: createRecordAndUpdateQueries, createMutation };
};

export default useCreateDocument;
