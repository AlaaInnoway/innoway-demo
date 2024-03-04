import { useEffect, useRef, useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Container from '../../layout/Container';
import ControlPanel from '../../layout/ControlPanel';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import Modal from '../../components/ui/Modal';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { FilterRequest } from '../../interfaces/filter-request.interface';
import useCreateRecord from '../../hooks/useCreateRecord';
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
import { getAndUpdateDashboardItems } from '../../services/dashboard-items.service';
import useDisableFocus from '../../hooks/useDisableFocus';
import exportDataToFile from '../../utils/export';
import Dropdown from '../../components/ui/Dropdown';
import Badge from '../../components/ui/Badge';
import TextArea from '../../components/form/TextArea';
import { calculateDuration } from '../../utils/formatDate';
import { remoteFields } from '../../data/time-off/fields';

export default function RemoteList() {
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  const [openExportMenu, setOpenExportMenu] = useState(false);
  const exportMenuRef = useRef(null);
  useDisableFocus(exportMenuRef, setOpenExportMenu);

  const [columns, setColumns] = useState<any[]>([
    {
      id: 'name',
      name: 'Name',
      sequence: 1,
    },
    {
      id: 'employee',
      name: 'Employee',
      sequence: 2,
    },
    {
      id: 'startDate',
      name: 'Start Date',
      sequence: 4,
    },
    {
      id: 'endDate',
      name: 'End Date',
      sequence: 5,
    },
    {
      id: 'duration',
      name: 'Duration',
      sequence: 6,
    },
    {
      id: 'stage',
      name: 'Status',
      sequence: 7,
    },
  ]);
  const [optionalColumns, setOptionalColumns] = useState([
    {
      id: 'reason',
      name: 'Reason',
      sequence: 3,
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
      name: 'Remote Work',
      path: '/timeoff/remote',
    },
  ];

  const sortedFieldItems = [
    { id: 'id', name: 'Recent' },
    { id: 'employee.name', name: 'Employee' },
    { id: 'startDate', name: 'Start Date' },
    { id: 'endDate', name: 'End Date' },
    { id: 'duration', name: 'Duration' },
    { id: 'stage', name: 'Status' },
  ];

  const [sortedField, setSortedField] = useState({ id: 'id', name: 'Recent' });

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'Remote',
    filters: [],
    selectFields: [
      'id',
      'name',
      'employee.img',
      'employee.name',
      'employee.remoteBalance',
      'reason',
      'startDate',
      'endDate',
      'duration',
      'stage.name',
      'stage.color',
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
  const { createRecord } = useCreateRecord(queryKey);

  const [recordData, setRecordData] = useState<{
    [key: string]: any; // This allows any string key with any value type
  }>({
    name: '',
    reason: '',
    startDate: '',
    endDate: '',
    duration: 0,
    stage: undefined,
    employee: {
      connect: {
        id: 0,
      },
    },
  });

  // delete
  const { deleteRecord } = useDeleteRecord(queryKey);

  const handleDelete = async (id: number) => {
    const record = {
      modelName: 'Remote', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      // await updateTotalItems();
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Remote work request have been deleted successfully',
        type: 'success',
      });
      // get dashboards by modelName & update them
      getAndUpdateDashboardItems('Remote');
    } catch (error) {
      // Handle error
    }
  };

  const [employees, setEmployees] = useState(new Array(0));
  const [stages, setStages] = useState(new Array(0));
  const [remoteBalance, setRemoteBalance] = useState(0);

  useEffect(() => {
    // get employees
    fetchDataByModel('Employee', ['id', 'name', 'remoteBalance']).then(
      (result) => {
        setEmployees(result?.records);
      }
    );
    // get stages
    fetchDataByModel(
      'stage',
      ['id', 'name', 'children'],
      [
        {
          logicalOperator: 'AND',
          conditions: [
            {
              field: 'parentId',
              operator: 'equals',
              values: null,
            },
            {
              field: 'workflow.modelName',
              operator: 'equals',
              values: 'Remote',
            },
          ],
        },
      ]
    ).then((result) => {
      setStages(result?.records);
    });
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setRecordData({
      ...recordData,
      [name]: value,
    });
    if (name === 'startDate') {
      setRecordData({
        ...recordData,
        [name]: value,
        duration: calculateDuration(value, recordData.endDate),
      });
    }
    if (name === 'endDate') {
      setRecordData({
        ...recordData,
        [name]: value,
        duration: calculateDuration(recordData.startDate, value),
      });
    }
  };

  const handleSelectEmployeeChange = (item: any, name: string) => {
    setRecordData({
      ...recordData,
      name: `Remote Work Request - ${item.name}`,
      [name]: {
        connect: {
          id: item.id,
        },
      },
    });
    setRemoteBalance(item.remoteBalance);
  };

  const handleCreate = async () => {
    try {
      // Check if all required fields are filled
      const requiredFields = Object.keys(remoteFields).filter(
        (fieldName) => remoteFields[fieldName].required
      );

      const areAllRequiredFieldsFilled = requiredFields.every((fieldName) =>
        recordData[fieldName]?.connect?.id != null
          ? Boolean(recordData[fieldName]?.connect?.id)
          : Boolean(recordData[fieldName])
      );

      if (!areAllRequiredFieldsFilled) {
        // Display an error message or handle the case where required fields are not filled
        setOpenToast(!openToast);
        setToastData({
          title: 'Please fill in all required fields',
          type: 'warning',
        });
        return;
      }
      // cast float fields, initiate  stage before saving
      let newRecordData: any = {
        ...recordData,
        stage: {
          connect: {
            id: stages[0].id,
          },
        },
        subStage: {
          connect: {
            id: stages[0].children.length
              ? stages[0].children.sort(
                  (a: any, b: any) => a.sequence - b.sequence
                )[0].id
              : stages[0].id,
          },
        },
      };
      // convert startDate & endDate to datetime
      newRecordData = {
        ...newRecordData,
        startDate: recordData.startDate
          ? new Date(recordData.startDate)
          : undefined,
        endDate: recordData.endDate ? new Date(recordData.endDate) : undefined,
      };
      await createRecord({
        modelName: 'Remote',
        data: newRecordData,
      }).then((newRecord: any) => {
        // update logs
        createRecord({
          modelName: 'Log',
          data: {
            content: "Remote request was created successfully",
            userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
            modelName: "Remote",
            recordId: newRecord.id
          },
        });
      });
      setOpenModal(!openModal);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'A new remote work request have been created successfully',
        type: 'success',
      });
      // reset the modal data
      setRecordData({
        name: '',
        reason: '',
        startDate: '',
        endDate: '',
        duration: 0,
        stage: undefined,
        employee: {
          connect: {
            id: 0,
          },
        },
      });
      // get dashboards by modelName & update them
      getAndUpdateDashboardItems('Remote');
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  const requestActionMenus = [
    {
      id: 1,
      name: 'View',
      icon: <EyeIcon width={16} height={16} />,
      handleClick: (id: number) => navigate(`/timeoff/remote/${id}`),
    },
    {
      id: 2,
      name: 'Edit',
      icon: <PencilSquareIcon width={16} height={16} />,
      handleClick: (id: number) => navigate(`/timeoff/remote/${id}?edit=true`),
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
    modelName: 'Remote',
    filters: [],
    selectFields: [
      'id',
      'name',
      'employee.name',
      'reason',
      'startDate',
      'endDate',
      'duration',
      'stage.name',
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
            <PrimaryButton onClick={() => setOpenModal(!openModal)}>
              <PlusCircleIcon width={20} height={20} />
              <span>Add</span>
            </PrimaryButton>
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
              items={employees}
              value={{ id: 0, name: 'Employee' }}
              handleChange={() => null}
              hasAvatars
            />
            <Select
              openMaxWidth
              customClass="bg-white space-x-2"
              items={[
                { id: 1, name: 'Start Date' },
                { id: 2, name: 'End Date' },
                { id: 3, name: 'Status' },
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
            message="Are you really want to delete this remote work request?"
            open={openDialog}
            discardButton="No"
            confirmButton="Yes"
            onDiscard={() => setOpenDialog(!openDialog)}
            onConfirm={() => handleDelete(selectedId)}
          />
        )}
        {openModal && (
          <Modal
            title="New Remote Work Request"
            open={openModal}
            onDiscard={() => setOpenModal(!openModal)}
            onSave={handleCreate}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <Input
                  label="Name"
                  name="name"
                  value={recordData.name}
                  handleChange={() => null}
                  disabled
                />
              </div>
              <div className="col-span-1">
                <Select
                  label="Employee"
                  items={employees}
                  value={
                    employees.filter((item) => {
                      return item.id === recordData.employee.connect.id;
                    })[0]
                  }
                  handleChange={(item: any) =>
                    handleSelectEmployeeChange(item, 'employee')
                  }
                  required={remoteFields.employee.required}
                  hasAvatars
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Remote Balance"
                  name="remoteBalance"
                  value={`${remoteBalance} Days`}
                  handleChange={() => null}
                  disabled
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Start Date"
                  name="startDate"
                  value={recordData.startDate}
                  type="date"
                  handleChange={handleInputChange}
                  required={remoteFields.startDate.required}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="End Date"
                  name="endDate"
                  value={recordData.endDate}
                  type="date"
                  handleChange={handleInputChange}
                  required={remoteFields.endDate.required}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Duration"
                  name="duration"
                  value={`${recordData.duration} Days`}
                  handleChange={() => null}
                  disabled
                />
              </div>
              <div className="col-span-3">
                <TextArea
                  label="Reason"
                  name="reason"
                  value={recordData.reason}
                  handleChange={handleInputChange}
                  required={remoteFields.reason.required}
                />
              </div>
            </div>
          </Modal>
        )}
        <Card>
          <div className="space-y-2">
            <Table
              columns={columns}
              optionalColumns={optionalColumns}
              handleColumnChange={toggleColumnVisibility}
            >
              {data?.records?.map((request: any, index: number) => (
                <tr
                  className={`group hover:bg-serene-50 ${
                    index + 1 !== data?.records?.length &&
                    'border-b border-b-gray-200'
                  }`}
                  key={request.id}
                >
                  <td className="py-4 px-6">
                    {index + 1 + (currentPage - 1) * 5}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>{request.name}</div>
                  </td>
                  <td className="flex items-center py-4 px-6 whitespace-nowrap">
                    <Avatar
                      icon={<div>{request.employee.name[0]}</div>}
                      src={
                        request.employee.img &&
                        API_BASE_URL + request.employee.img
                      }
                    />
                    <div className="pl-3">{request.employee.name}</div>
                  </td>
                  {visibleColumns.includes('reason') && (
                    <td className="py-4 px-6">
                      <div>{request.reason}</div>
                    </td>
                  )}
                  <td className="py-4 px-6">
                    {request.startDate && (
                      <div>
                        {new Date(request.startDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {request.endDate && (
                      <div>
                        {new Date(request.endDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div>{request.duration} Days</div>
                  </td>
                  <td className="py-4 px-6">
                    {request.stage && (
                      <Badge
                        value={request.stage.name}
                        color={request.stage.color}
                      />
                    )}
                  </td>
                  <td>
                    <DropdownAction
                      actionMenu={requestActionMenus}
                      recordId={request.id}
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
