import uploadImage from '../services/upload-image.service';
import { useMutation, useQueryClient } from 'react-query';

const useUploadImage = (queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation(uploadImage, {
    // This function is called on successful mutation
    onSettled: () => {
      // Invalidate the relevant query to refresh cached data
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useUploadImage;
