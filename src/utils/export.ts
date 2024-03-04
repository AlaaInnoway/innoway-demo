import { FilterRequest } from '../interfaces/filter-request.interface';
import API_BASE_URL from '../config';
import exportData from '../services/export.service';

const exportDataToFile = async (
  exportRequest: FilterRequest,
  exportType: string
) => {
  await exportData(exportRequest, exportType).then((result) => {
    const a = document.createElement('a');
    a.href = API_BASE_URL + result.path;
    a.click();
  });
};

export default exportDataToFile;
