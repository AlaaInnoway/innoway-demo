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
import TextArea from '../../components/form/TextArea';
import { departmentFields } from '../../features/employee/data/fields';

export default function DepartmentList() {
  const [open, setOpen] = useState(localStorage.getItem('open') === 'true');
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
      id: 'head',
      name: 'Head',
      sequence: 2,
    },
    {
      id: 'employees.id',
      name: 'Number of Employees',
      sequence: 4,
    },
  ]);
  const [optionalColumns, setOptionalColumns] = useState([
    {
      id: 'description',
      name: 'Description',
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
      name: 'Departments',
      path: '/employees/departments',
    },
  ];

  const sortedFieldItems = [
    { id: 'id', name: 'Recent' },
    { id: 'name', name: 'Name' },
    { id: 'head.name', name: 'Head' },
  ];

  const [sortedField, setSortedField] = useState({ id: 'id', name: 'Recent' });

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'Department',
    filters: [],
    selectFields: [
      'id',
      'name',
      'head.img',
      'head.name',
      'head.email',
      'description',
      'employees.id',
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
    description: '',
    head: {
      connect: {
        id: 0,
      },
    },
  });

  // delete
  const { deleteRecord } = useDeleteRecord(queryKey);

  const handleDelete = async (id: number) => {
    const record = {
      modelName: 'Department', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      // await updateTotalItems();
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Department have been deleted successfully',
        type: 'success',
      });
      // get dashboards by modelName & update them
      getAndUpdateDashboardItems('Department');
    } catch (error) {
      // Handle error
    }
  };

  const [heads, setHeads] = useState(new Array(0));

  useEffect(() => {
    // get heads
    fetchDataByModel('Employee').then((result) => {
      setHeads(result?.records);
    });
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setRecordData({
      ...recordData,
      [name]: value,
    });
  };

  const handleSelectChange = (item: any, name: string) => {
    setRecordData({
      ...recordData,
      [name]: {
        connect: {
          id: item.id,
        },
      },
    });
  };

  const handleCreate = async () => {
    try {
      // Check if all required fields are filled
      const requiredFields = Object.keys(departmentFields).filter(
        (fieldName) => departmentFields[fieldName].required
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

      let newRecordData: any = {
        ...recordData,
      };
      // reset head value if it's empty
      if (recordData.head.connect.id === 0)
        newRecordData = {
          ...newRecordData,
          head: undefined,
        };
      await createRecord({
        modelName: 'Department',
        data: newRecordData,
      }).then((newRecord: any) => {
        // update logs
        createRecord({
          modelName: 'Log',
          data: {
            content: "Department was created successfully",
            userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
            modelName: "Department",
            recordId: newRecord.id
          },
        });
      });
      setOpenModal(!openModal);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'A new department have been created successfully',
        type: 'success',
      });
      // reset the modal data
      setRecordData({
        name: '',
        description: '',
        head: {
          connect: {
            id: 0,
          },
        },
      });
      // get dashboards by modelName & update them
      getAndUpdateDashboardItems('Department');
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  const departmentActionMenus = [
    {
      id: 1,
      name: 'View',
      icon: <EyeIcon width={16} height={16} />,
      handleClick: (id: number) => navigate(`/employees/departments/${id}`),
    },
    {
      id: 2,
      name: 'Edit',
      icon: <PencilSquareIcon width={16} height={16} />,
      handleClick: (id: number) =>
        navigate(`/employees/departments/${id}?edit=true`),
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
    modelName: 'Department',
    filters: [],
    selectFields: ['id', 'name', 'head.name', 'description'],
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
              customClass="bg-white space-x-2"
              items={heads}
              value={{ id: 0, name: 'Head' }}
              handleChange={() => null}
              hasAvatars
            />
            <Select
              openMaxWidth
              customClass="bg-white space-x-2"
              items={[
                { id: 1, name: 'Name' },
                { id: 2, name: 'Description' },
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
            message="Are you really want to delete this department?"
            open={openDialog}
            discardButton="No"
            confirmButton="Yes"
            onDiscard={() => setOpenDialog(!openDialog)}
            onConfirm={() => handleDelete(selectedId)}
          />
        )}
        {openModal && (
          <Modal
            title="New Department"
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
                  handleChange={handleInputChange}
                  required={departmentFields.name.required}
                />
              </div>
              <div className="col-span-1">
                <Select
                  label="Head"
                  items={heads}
                  value={
                    heads.filter((item) => {
                      return item.id === recordData.head.connect.id;
                    })[0]
                  }
                  handleChange={(item: any) =>
                    handleSelectChange(item, 'head')
                  }
                  required={departmentFields.head.required}
                  hasAvatars
                />
              </div>
              <div className="col-span-3">
                <TextArea
                  label="Description"
                  name="description"
                  value={recordData.description}
                  handleChange={handleInputChange}
                  required={departmentFields.description.required}
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
              {data?.records?.map((department: any, index: number) => (
                <tr
                  className={`group hover:bg-serene-50 ${
                    index + 1 !== data?.records?.length &&
                    'border-b border-b-gray-200'
                  }`}
                  key={department.id}
                >
                  <td className="py-4 px-6">
                    {index + 1 + (currentPage - 1) * 5}
                  </td>
                  <td className="py-4 px-6">
                    <div>{department.name}</div>
                  </td>
                  <td className="flex items-center py-4 px-6 whitespace-nowrap">
                    <Avatar
                      icon={<div>{department.head?.name[0]}</div>}
                      src={
                        department.head?.img &&
                        API_BASE_URL + department.head.img
                      }
                    />
                    <div className="pl-3">
                      <div>{department.head?.name}</div>
                      <div className="text-gray-500 text-[11px]">
                        {department.head?.email}
                      </div>
                    </div>
                  </td>
                  {visibleColumns.includes('description') && (
                    <td className="py-4 px-6">
                      <div>{department.description}</div>
                    </td>
                  )}
                  <td className="py-4 px-6">
                    <div>{department.employees.length}</div>
                  </td>
                  <td>
                    <DropdownAction
                      actionMenu={departmentActionMenus}
                      recordId={department.id}
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
