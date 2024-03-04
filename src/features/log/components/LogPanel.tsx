
import Avatar from '../../../components/ui/Avatar';
import {
  formattedTime,
  retrieveDay,
  retrieveMonth,
  retrieveYear,
} from '../../../utils/formatDate';
import Badge from '../../../components/ui/Badge';
import { useState } from 'react';
import { FilterRequest } from '../../../interfaces/filter-request.interface';
import useFilterData from '../../../hooks/useFetchData';

interface Props {
  recordId: number;
  modelName: string;
}

export default function LogPanel(props: Props) {
  const { modelName, recordId } = props;
  const [showOnlyMine] = useState(false);

  const filterData: FilterRequest = {
    modelName: 'Log',
    filters: [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'modelName',
            operator: 'equals',
            values: modelName,
          },
          {
            field: 'recordId',
            operator: 'equals',
            values: recordId,
          },
          {
            logicalOperator: 'AND',
            conditions: showOnlyMine
              ? [
                  {
                    field: 'userId',
                    operator: 'equals',
                    values: parseInt(
                      localStorage.getItem('loggedInUserId') || '',
                      10
                    ),
                  },
                ]
              : [],
          },
        ],
      },
    ],
    selectFields: ['id', 'createdAt', 'content', 'stageFromValue', 'stageFromColor', 'stageToValue', 'stageToColor', 'user', 'modelName', 'recordId'],
    sortField: 'id',
    sortOrder: 'desc',
    page: 1,
    perPage: 1000,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  const { data, isLoading } = useFilterData(filterData);

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data?.records?.map((log: any) => (
          <div className="-space-y-4 space-x-4" key={log.id}>
            <div className="p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Avatar
                    size="sm"
                    icon={<div>{log.user?.name[0]}</div>}
                    /* src={log.user && API_BASE_URL + log.user.img} */
                    src={"https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg"}
                    title={log.user?.name}
                    rounded
                  />
                  <span className="text-[11px] font-medium">
                    {log.user?.name}
                  </span>
                </div>
              </div>
              {
                log.content ? (
                  <p className='flex items-center space-x-1 text-gray-700'>
                    <span>{log.content}</span>
                    <span className='text-gray-500 text-[10px] italic font-medium'>on {retrieveDay(new Date(log.createdAt), '2-digit')}&nbsp;
                      {retrieveMonth(new Date(log.createdAt), 'short')}&nbsp;
                      {retrieveYear(new Date(log.createdAt), 'numeric')} at {formattedTime(new Date(log.createdAt))}</span>
                  </p>
                ) : (
                  <p className='flex-wrap flex items-center space-x-1 text-gray-700'>
                    <span>Updated status from</span>
                    <Badge value={log.stageFromValue} color={log.stageFromColor} />
                    <span>to</span>
                    <Badge value={log.stageToValue} color={log.stageToColor} />
                    <span className='text-gray-500 text-[10px] italic font-medium'>on {retrieveDay(new Date(log.createdAt), '2-digit')}&nbsp;
                      {retrieveMonth(new Date(log.createdAt), 'short')}&nbsp;
                      {retrieveYear(new Date(log.createdAt), 'numeric')} at {formattedTime(new Date(log.createdAt))}</span>
                  </p>
                )
              }
            </div>
          </div>
        ))
      )}
    </div>
  );
}
