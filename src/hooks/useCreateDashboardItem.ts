import { useMutation, useQueryClient } from 'react-query';
import createDashboardItem from '../services/dashboard-items.service';

const useCreateDashboardItem = (queryKey: string) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation((recordData: any) =>
    createDashboardItem(recordData)
  );

  const createRecordAndUpdateQueries = async (recordData: any) => {
    await createMutation.mutateAsync(recordData);
    queryClient.invalidateQueries(queryKey);
  };

  return { createDashboard: createRecordAndUpdateQueries, createMutation };
};

export default useCreateDashboardItem;
