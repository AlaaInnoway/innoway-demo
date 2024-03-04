/* eslint-disable no-param-reassign */
import { useState } from 'react';
import {
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { startOfToday } from 'date-fns';
import Container from '../../layout/Container';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Button';
import ControlPanel from '../../layout/ControlPanel';
import Breadcrumb from '../../components/ui/Breadcrumb';
import GanttChart from '../../components/chart/GanttChart';
import { ganttChartData } from '../../data/data';
import Timeline from '../../features/task/components/Timeline';
import useFilterData from '../../hooks/useFetchData';
import { FilterRequest } from '../../interfaces/filter-request.interface';
import Card from '../../components/ui/Card';
import ProgressBar from "../../components/ui/ProgressBar";
import Calendar from '@component/calendar/Calendar';
import meetings from '../../data/calendar/meetings';


export default function Reminders() {

  const breadcrumbs = [
    {
      name: 'Reminders',
      path: '/reminders',
    },
  ];

  const [selectedDay, setSelectedDay] = useState(startOfToday());

  const filterData: FilterRequest = {
    modelName: 'Task',
    filters: [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'userId',
            operator: 'equals',
            values: parseInt(
              localStorage.getItem('loggedInUserId') || '',
              10
            ),
          },
        ],
      },
    ],
    selectFields: [
      'id',
      'name',
      'type.name',
      'user',
      'dueDate',
      'priority',
      'stage',
      'modelName',
      'recordId',
    ],
    sortField: 'dueDate',
    sortOrder: 'desc',
    page: 1,
    perPage: 1000,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  const { data, isLoading } = useFilterData(filterData);
  return (
    <Container>
      <ControlPanel>
        <Breadcrumb items={breadcrumbs} />
        <div className="flex items-center space-x-4">
          <PrimaryButton>
            <ArrowPathIcon width={20} height={20} />
            <span>Synchronise</span>
          </PrimaryButton>
          <SecondaryButton>
            <ArrowDownOnSquareIcon width={20} height={20} />
          </SecondaryButton>
        </div>
      </ControlPanel>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <Calendar
              meetings={meetings}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          <GanttChart name="My Team Overview" isBookmarked={true} data={ganttChartData} />
        </div>
        <div className="col-span-1 space-y-4">
          <Card>
            <h1>My Tasks</h1>
            <ProgressBar value='In Progress' percent={30} reverse />
            <ProgressBar value='Done' percent={80} reverse />
            <ProgressBar value='Overdue' percent={21} reverse />
          </Card>
          <Card>
            <h1>My Timeline</h1>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <Timeline events={data?.records} markAsDone={() => null} handleDialogOpen={() => null} />
            )}
          </Card>
        </div>
        
      </div>
    </Container>
  );
}
