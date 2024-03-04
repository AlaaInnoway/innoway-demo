/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import {
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { IconButton, TertiaryButton } from '../../../components/ui/Button';
import { FilterRequest } from '../../../interfaces/filter-request.interface';
import useFilterData from '../../../hooks/useFetchData';
import useCreateRecord from '../../../hooks/useCreateRecord';
import {
  retrieveDay,
  retrieveMonth,
  retrieveYear,
} from '../../../utils/formatDate';
import Toast from '../../../components/ui/Toast';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/form/Input';
import Select from '../../../components/form/Select';
import useDeleteRecord from '../../../hooks/useDeleteRecord';
import Dialog from '../../../components/ui/Dialog';
import Checkbox from '../../../components/form/Checkbox';
import fetchDataByModel from '../../../utils/fetch';
import useUpdateRecord from '../../../hooks/useUpdateRecord';
import Timeline from './Timeline';

interface Props {
  modelName: string;
  recordId: number;
  recordName: string;
}

export default function TaskPanel(props: Props) {
  const { modelName, recordId, recordName } = props;
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  const [newTask, setNewTask] = useState({
    name: '',
    type: {
      connect: {
        id: null,
      },
    },
    user: {
      connect: {
        id: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
      },
    },
    dueDate: `${retrieveDay(new Date(), '2-digit')} ${retrieveMonth(
      new Date(),
      'short'
    )} ${retrieveYear(new Date(), 'numeric')}`,
    priority: 'Low',
    stage: 'Not Started',
    modelName,
    recordId,
    recordName,
  });
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const priorities = ['Low', 'Medium', 'High'];

  const filterData: FilterRequest = {
    modelName: 'Task',
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
  const queryKey = 'filterData';
  const { createRecord } = useCreateRecord(queryKey);
  const { deleteRecord } = useDeleteRecord(queryKey);

  const handleCreate = async () => {
    try {
      await createRecord({
        modelName: 'Task',
        data: newTask,
      });
      setOpenModal(!openModal);
      setNewTask({
        ...newTask,
        name: '',
        type: {
          connect: {
            id: null,
          },
        },
        dueDate: '',
        priority: 'Low',
        stage: 'Not Started',
      });
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'A new task have been added successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  const updateRecord = useUpdateRecord(queryKey);
  const markAsDone = async (id: number) => {
    await updateRecord.mutateAsync({
      modelName: 'Task',
      recordId: id,
      updates: {
        stage: 'Done',
      },
    });
  }

  const handleDelete = async (id: number) => {
    const record = {
      modelName: 'Task', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Task have been deleted successfully',
        type: 'success',
      });
    } catch (error) {
      // Handle error
    }
  };

  const handleDialogOpen = async (id: number) => {
    setSelectedId(id);
    setOpenDialog(!openDialog);
  };

  const handlePriorityChange = (sequence: number) => {
    setNewTask({
      ...newTask,
      priority: priorities[sequence],
    });
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleDateChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    const currentDate = `${retrieveYear(new Date(), 'numeric')}-${retrieveMonth(
      new Date(),
      '2-digit'
    )}-${retrieveDay(new Date(), '2-digit')}`;
    let stage = 'Not Started';
    if (value === currentDate) stage = 'In Progress';
    else if (value < currentDate) stage = 'Overdue';
    setNewTask({
      ...newTask,
      [name]: value,
      stage,
    });
  };

  const handleSelectChange = (item: any, name: string) => {
    setNewTask({
      ...newTask,
      [name]: {
        connect: {
          id: item.id,
        },
      },
    });
  };

  const [typeItems, setTypes] = useState(new Array(0));
  const [assignees, setAssignees] = useState(new Array(0));

  useEffect(() => {
    // get types
    fetchDataByModel('TaskType').then((result: any) => {
      setTypes(result?.records);
    });
    // get users
    fetchDataByModel('user', ['id', 'name', 'img']).then((result: any) => {
      setAssignees(result?.records);
    });
  }, []);

  return (
    <>
      {openToast && <Toast title={toastData.title} type={toastData.type} />}
      {openDialog && (
        <Dialog
          title="Confirmation"
          message="Are you really want to delete this task?"
          open={openDialog}
          discardButton="No"
          confirmButton="Yes"
          onDiscard={() => setOpenDialog(!openDialog)}
          onConfirm={() => handleDelete(selectedId)}
        />
      )}
      {openModal && (
        <Modal
          title="New Task"
          open={openModal}
          onDiscard={() => setOpenModal(!openModal)}
          onSave={handleCreate}
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Input
                label="Name"
                name="name"
                value={newTask.name}
                handleChange={handleInputChange}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Type"
                items={typeItems}
                value={
                  typeItems.filter((item) => {
                    return item.id === newTask.type.connect.id;
                  })[0]
                }
                handleChange={(item: any) => handleSelectChange(item, 'type')}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Assignee"
                items={assignees}
                value={
                  assignees.filter((item) => {
                    return item.id === newTask.user.connect.id;
                  })[0]
                }
                handleChange={(item: any) => handleSelectChange(item, 'user')}
                hasAvatars
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Due Date"
                name="dueDate"
                value={newTask.dueDate}
                type="date"
                handleChange={handleDateChange}
              />
            </div>
            <div className="col-span-1">
              <div className="space-y-1 relative">
                <label
                  htmlFor="test"
                  className="block text-xs font-medium text-gray-600"
                >
                  Priority
                </label>
                <div className="flex items-center space-x-1 pt-2">
                  <IconButton onClick={() => handlePriorityChange(0)}>
                    <StarIcon
                      width={16}
                      height={16}
                      className="stroke-yellow-300 fill-yellow-300"
                    />
                  </IconButton>
                  <IconButton onClick={() => handlePriorityChange(1)}>
                    <StarIcon
                      width={16}
                      height={16}
                      className={`${
                        priorities.indexOf(newTask.priority) !== 0
                          ? 'stroke-yellow-300 fill-yellow-300'
                          : 'stroke-gray-500'
                      }`}
                    />
                  </IconButton>
                  <IconButton onClick={() => handlePriorityChange(2)}>
                    <StarIcon
                      width={16}
                      height={16}
                      className={`${
                        priorities.indexOf(newTask.priority) === 2
                          ? 'stroke-yellow-300 fill-yellow-300'
                          : 'stroke-gray-500'
                      }`}
                    />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <Input
                label="Stage"
                value={newTask.stage}
                disabled
                handleChange={() => null}
              />
            </div>
          </div>
        </Modal>
      )}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Checkbox
            id="my-tasks"
            name="my-tasks"
            label="My Tasks"
            value={showOnlyMine}
            handleChange={() => setShowOnlyMine(!showOnlyMine)}
          />
          <TertiaryButton onClick={() => setOpenModal(!openModal)}>
            <ClockIcon width={16} height={16} />
            <span>Schedule Task</span>
          </TertiaryButton>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Timeline events={data?.records} markAsDone={markAsDone} handleDialogOpen={handleDialogOpen} />
        )}
      </div>
    </>
  );
}
