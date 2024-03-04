import archiveRecord from '../services/archive.service';
import { useMutation, useQueryClient } from 'react-query';

interface ArchiveRecordRequest {
  modelName: string;
  id: number;
}

const useArchiveRecord = (queryKey: string) => {
  const queryClient = useQueryClient();

  const archiveMutation = useMutation((recordData: ArchiveRecordRequest) =>
    archiveRecord(recordData)
  );

  const archiveRecordAndUpdateQueries = async (
    recordData: ArchiveRecordRequest
  ) => {
    await archiveMutation.mutateAsync(recordData);
    queryClient.invalidateQueries(queryKey);
  };

  return { archiveRecord: archiveRecordAndUpdateQueries, archiveMutation };
};

export default useArchiveRecord;
