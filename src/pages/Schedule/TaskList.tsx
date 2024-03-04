import { useEffect, useRef, useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  DocumentArrowUpIcon,
  EnvelopeOpenIcon,
  EyeIcon,
  MicrophoneIcon,
  PhoneArrowUpRightIcon,
  StarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Container from '../../layout/Container';
import ControlPanel from '../../layout/ControlPanel';
import { IconButton, SecondaryButton } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Select from '../../components/form/Select';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { FilterRequest } from '../../interfaces/filter-request.interface';
import useDeleteRecord from '../../hooks/useDeleteRecord';
import Dialog from '../../components/ui/Dialog';
import Toast from '../../components/ui/Toast';
import useFilterData from '../../hooks/useFetchData';
import API_BASE_URL from '../../config';
import Paginator from '../../components/ui/Paginator';
import { fetchCountData } from '../../services/filter.service';
import Table from '../../components/ui/Table';
import DropdownAction from '../../components/ui/DropdownAction';
import fetchDataByModel from '../../utils/fetch';
import useDisableFocus from '../../hooks/useDisableFocus';
import exportDataToFile from '../../utils/export';
import Dropdown from '../../components/ui/Dropdown';
import Badge from '../../components/ui/Badge';

export default function TaskList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  const [openExportMenu, setOpenExportMenu] = useState(false);
  const exportMenuRef = useRef(null);
  useDisableFocus(exportMenuRef, setOpenExportMenu);

  const [users, setUsers] = useState(new Array(0));
  const priorities = ['Low', 'Medium', 'High'];
  const types: any = {
    'Phone Call': (
      <PhoneArrowUpRightIcon
        width={16}
        height={16}
        strokeWidth={2}
        className="text-green-600"
      />
    ),
    Email: (
      <EnvelopeOpenIcon
        width={16}
        height={16}
        strokeWidth={2}
        className="text-pink-600"
      />
    ),
    Meeting: (
      <MicrophoneIcon
        width={16}
        height={16}
        strokeWidth={2}
        className="text-purple-600"
      />
    ),
    'Upload Document': (
      <DocumentArrowUpIcon
        width={16}
        height={16}
        strokeWidth={2}
        className="text-blue-600"
      />
    ),
  };
  const stages: any = {
    'Not Started': 'purple',
    'In Progress': 'blue',
    Overdue: 'pink',
    Done: 'green',
  };

  const [columns, setColumns] = useState<any[]>([
    {
      id: 'name',
      name: 'Name',
      sequence: 1,
    },
    {
      id: 'type',
      name: 'Type',
      sequence: 2,
    },
    {
      id: 'recordName',
      name: 'Associated Entity',
      sequence: 3,
    },
    {
      id: 'user',
      name: 'Assignee',
      sequence: 5,
    },
    {
      id: 'dueDate',
      name: 'Due Date',
      sequence: 6,
    },
    {
      id: 'priority',
      name: 'Priority',
      sequence: 7,
    },
    {
      id: 'stage',
      name: 'Stage',
      sequence: 8,
    },
  ]);
  const [optionalColumns, setOptionalColumns] = useState([
    {
      id: 'modelName',
      name: 'Tag',
      sequence: 4,
    },
  ]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.id)
  );

  const toggleColumnVisibility = (column: any) => {
    if (columns.some((col) => col.id === column.id)) {
      // If the column is already visible, hide it
      setColumns(columns.filter((col) => col.id !== column.id));
    } else {
      // If the column is not visible, show it and maintain the sequence order
      const updatedVisibleColumns = [...columns];
      updatedVisibleColumns.splice(column.sequence - 1, 0, column);
      setColumns(updatedVisibleColumns);
    }
  };

  useEffect(() => {
    setVisibleColumns(columns.map((col) => col.id));
  }, [columns]);

  const navigate = useNavigate();

  const breadcrumbs = [
    {
      name: 'Tasks',
      path: '/activity/task',
    },
  ];

  const sortedFieldItems = [
    { id: 'id', name: 'Recent' },
    { id: 'name', name: 'Name' },
    { id: 'user.name', name: 'Assignee' },
    { id: 'priority', name: 'Priority' },
    { id: 'stage', name: 'Stage' },
  ];

  const [sortedField, setSortedField] = useState({ id: 'id', name: 'Recent' });

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'Task',
    filters: [],
    selectFields: [
      'id',
      'name',
      'type.name',
      'user.img',
      'user.name',
      'priority',
      'dueDate',
      'stage',
      'modelName',
      'recordName',
      'recordId',
    ],
    sortField: sortedField.id,
    sortOrder: 'asc',
    page: currentPage,
    perPage: 5,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  const { data, isLoading } = useFilterData(filterData);
  const [totalItems, setTotalItems] = useState(0);

  const handleUpdateCount = () => {
    fetchCountData(filterData).then((count: number) => {
      setTotalItems(count); // Update the totalItems state
    });
  };
  useEffect(() => {
    handleUpdateCount();
  });
  const queryKey = 'filterData';
  // delete
  const { deleteRecord } = useDeleteRecord(queryKey);

  const handleDelete = async (id: number) => {
    const record = {
      modelName: 'task', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      // await updateTotalItems();
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

  useEffect(() => {
    // get users
    fetchDataByModel('user', ['id', 'name', 'img']).then((result) => {
      setUsers(result?.records);
    });
  }, []);

  function convertToUrl(modelName: string, recordId: number): string {
    if (modelName === 'individual' || modelName === 'organization')
      return `/contact/${modelName}/${recordId}?active_tab=1`;
    if (modelName === 'lead' || modelName === 'opportunity')
      return `/pipeline/${modelName}/${recordId}?active_tab=1`;
    if (
      modelName === 'quote' ||
      modelName === 'order' ||
      modelName === 'invoice'
    )
      return `/sales/${modelName}/${recordId}?active_tab=1`;
    return '';
  }

  const taskActionMenus = [
    {
      id: 1,
      name: 'View',
      icon: <EyeIcon width={16} height={16} />,
      handleClick: (recordId: number, modelName: string) =>
        navigate(convertToUrl(modelName.toLowerCase(), recordId)),
    },
    {
      id: 3,
      name: 'Remove',
      icon: <XMarkIcon width={16} height={16} />,
      handleClick: (id: number) => {
        setSelectedId(id);
        setOpenDialog(!openDialog);
      },
    },
  ];

  const exportRequest: FilterRequest = {
    modelName: 'Task',
    filters: [],
    selectFields: [
      'id',
      'name',
      'type.name',
      'user.img',
      'user.name',
      'priority',
      'dueDate',
      'stage',
      'modelName',
      'recordName',
    ],
    sortField: sortedField.id,
    sortOrder: 'asc',
    page: 1,
    perPage: 1000000,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };

  const exportActionMenus = [
    {
      id: 1,
      name: 'Export to Excel',
      handleClick: () => exportDataToFile(exportRequest, 'xlsx'),
    },
    {
      id: 2,
      name: 'Export to CSV',
      handleClick: () => exportDataToFile(exportRequest, 'csv'),
    },
  ];

  return (
    <Container>
      <ControlPanel>
        <Breadcrumb items={breadcrumbs} />
        <div className="flex items-center space-x-4">
          <div ref={exportMenuRef} className="relative">
            <SecondaryButton
              onClick={() => setOpenExportMenu(!openExportMenu)}
            >
              <ArrowDownTrayIcon
                width={20}
                height={20}
                className="text-gray-600"
              />
              <span>Export</span>
              <ChevronDownIcon
                width={12}
                height={12}
                className={`text-current text-gray-600 cursor-pointer duration-700 ${
                  openExportMenu && 'rotate-180'
                }`}
              />
            </SecondaryButton>
            {openExportMenu && (
              <Dropdown items={exportActionMenus} positionRight fullWidth />
            )}
          </div>
        </div>
      </ControlPanel>
      <ControlPanel>
        <div className="flex items-center space-x-4">
          <Select
            openMaxWidth
            customClass="bg-serene-100 text-serene-700 font-medium border-0 space-x-2"
            items={users}
            value={{ id: 0, name: 'Asignee' }}
            handleChange={() => null}
            hasAvatars
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[
              { id: 1, name: 'Stage' },
              { id: 2, name: 'Due Date' },
              { id: 3, name: 'Priority' },
            ]}
            value={{ id: 0, name: 'More' }}
            handleChange={() => null}
            icon={<AdjustmentsVerticalIcon width={14} height={14} />}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-0">
            <div className="text-[10px] font-medium text-gray-500">
              Sort By :{' '}
            </div>
            <Select
              openMaxWidth
              openFromRight
              customClass="border-0 font-medium text-gray-700 space-x-2"
              items={sortedFieldItems}
              value={
                sortedFieldItems.filter((item) => {
                  return item.id === sortedField.id;
                })[0]
              }
              handleChange={(item: any) => setSortedField(item)}
            />
          </div>
        </div>
      </ControlPanel>
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
      <Card>
        <div className="space-y-2">
          <Table
            columns={columns}
            optionalColumns={optionalColumns}
            handleColumnChange={toggleColumnVisibility}
          >
            {data?.records?.map((task: any, index: number) => (
              <tr
                className={`group hover:bg-serene-50 ${
                  index + 1 !== data?.records?.length &&
                  'border-b border-b-gray-200'
                }`}
                key={task.id}
              >
                <td className="py-4 px-6">
                  {index + 1 + (currentPage - 1) * 5}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div>{task.name}</div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-gray-700">
                      {types[task.type?.name]}
                    </span>
                    <div>{task.type?.name}</div>
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div>{task.recordName}</div>
                </td>
                <td className="py-4 px-6">
                  <Avatar
                    icon={<div>{task.user?.name[0]}</div>}
                    src={task.user.img && API_BASE_URL + task.user.img}
                    title={task.user?.name}
                  />
                </td>
                <td className="py-4 px-6">
                  <div>
                    {task.dueDate &&
                      new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center space-x-1 pt-2">
                    <IconButton disabled customClass="opacity-100">
                      <StarIcon
                        width={16}
                        height={16}
                        className="stroke-yellow-300 fill-yellow-300"
                      />
                    </IconButton>
                    <IconButton disabled customClass="opacity-100">
                      <StarIcon
                        width={16}
                        height={16}
                        className={`${
                          priorities.indexOf(task.priority) !== 0
                            ? 'stroke-yellow-300 fill-yellow-300'
                            : 'stroke-gray-500'
                        }`}
                      />
                    </IconButton>
                    <IconButton disabled customClass="opacity-100">
                      <StarIcon
                        width={16}
                        height={16}
                        className={`${
                          priorities.indexOf(task.priority) === 2
                            ? 'stroke-yellow-300 fill-yellow-300'
                            : 'stroke-gray-500'
                        }`}
                      />
                    </IconButton>
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <Badge value={task.stage} color={stages[task.stage]} />
                </td>
                {visibleColumns.includes('modelName') && (
                  <td className="py-4 px-6 whitespace-nowrap">
                    <Badge value={task.modelName} />
                  </td>
                )}
                <td>
                  <DropdownAction
                    actionMenu={taskActionMenus}
                    recordId={task.recordId}
                    modelName={task.modelName}
                  />
                </td>
              </tr>
            ))}
          </Table>
          <Paginator
            itemsPerPage={5}
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>
    </Container>
  );
}
