import { useEffect, useRef, useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChevronDownIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  Squares2X2Icon,
  UserIcon,
  ViewColumnsIcon,
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
import useUploadImage from '../../hooks/useUploadImage';
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
import { employeeFields } from '../../features/employee/data/fields';
import { ContractTypes } from '../../constants/setting-constants';
import EmployeeCard from '../../features/employee/components/EmployeeCard';

export default function EmployeeList() {
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
      id: 'phone',
      name: 'Phone',
      sequence: 2,
    },
    {
      id: 'jobTitle',
      name: 'Job Title',
      sequence: 4,
    },
    {
      id: 'department',
      name: 'Department',
      sequence: 5,
    },
    {
      id: 'parent',
      name: 'Supervisor',
      sequence: 6,
    },
    {
      id: 'joiningDate',
      name: 'Joining Date',
      sequence: 7,
    },
    {
      id: 'status',
      name: 'Status',
      sequence: 9,
    },
  ]);
  const [optionalColumns, setOptionalColumns] = useState([
    {
      id: 'mobile',
      name: 'Mobile',
      sequence: 3,
    },
    {
      id: 'birthdate',
      name: 'Date of Birth',
      sequence: 8,
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

  const [viewType, setViewType] = useState('card');
  const navigate = useNavigate();

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // for image upload
  const [selectedFile, setSelectedFile] = useState(null);

  const breadcrumbs = [
    {
      name: 'Profiles',
      path: '/employees/profiles',
    },
  ];

  const sortedFieldItems = [
    { id: 'id', name: 'Recent' },
    { id: 'name', name: 'Name' },
    { id: 'department.name', name: 'Department' },
    { id: 'jobTitle.name', name: 'Job Title' },
    { id: 'joiningDate', name: 'Joining Date' },
  ];

  const [sortedField, setSortedField] = useState({ id: 'id', name: 'Recent' });

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'Employee',
    filters: [],
    selectFields: [
      'id',
      'img',
      'name',
      'email',
      'phone',
      'mobile',
      'jobTitle.name',
      'department.name',
      'status',
      'parent.img',
      'parent.name',
      'employmentType',
      'joiningDate',
      'birthdate',
      'leaves.id',
      'reviewsOfEmployee.id',
      'contracts.id',
    ],
    sortField: sortedField.id,
    sortOrder: 'asc',
    page: currentPage,
    perPage: viewType === 'list' ? 5 : 6,
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
    img: '',
    name: '',
    birthdate: '',
    gender: {
      connect: {
        id: 0,
      },
    },
    email: '',
    phone: '',
    mobile: '',
    employmentType: 'FULL_TIME',
    status: 'ACTIVE',
    jobTitle: {
      connect: {
        id: 0,
      },
    },
    department: {
      connect: {
        id: 0,
      },
    },
    parent: {
      connect: {
        id: 0,
      },
    },
    joiningDate: '',
  });

  const uploadImage = useUploadImage(queryKey); // Use the custom hook
  const handleUpload = async (id: number) => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        // Call the mutate function to update the record
        await uploadImage.mutateAsync({
          modelName: 'Employee', // Model name
          recordId: id, // Record ID
          file: formData,
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // delete
  const { deleteRecord } = useDeleteRecord(queryKey);

  const handleDelete = async (id: number) => {
    const record = {
      modelName: 'Employee', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      // await updateTotalItems();
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Employee have been deleted successfully',
        type: 'success',
      });
      // get dashboards by modelName & update them
      getAndUpdateDashboardItems('Employee');
    } catch (error) {
      // Handle error
    }
  };

  const handleImageChange = (e: {
    target: {
      files: any;
      name: any;
      value: any;
    };
  }) => {
    console.log('e.target');
    console.log(e.target);
    setSelectedFile(e.target.files[0]);
    setRecordData({
      ...recordData,
      img: URL.createObjectURL(e.target.files[0]),
    });
  };

  const [genders, setGenders] = useState(new Array(0));
  const [jobTitles, setJobTitles] = useState(new Array(0));
  const [departments, setDepartments] = useState(new Array(0));
  const [supervisors, setSupervisors] = useState(new Array(0));

  useEffect(() => {
    // get genders
    fetchDataByModel('Gender').then((result) => {
      setGenders(result?.records);
    });
    // get job titles
    fetchDataByModel('JobTitle').then((result) => {
      setJobTitles(result?.records);
    });
    // get departments
    fetchDataByModel('Department').then((result) => {
      setDepartments(result?.records);
    });
    // get supervisors
    fetchDataByModel('Employee').then((result) => {
      setSupervisors(result?.records);
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
    console.log('item');
    console.log(item);
    console.log(name);
    setRecordData({
      ...recordData,
      [name]: {
        connect: {
          id: item.id,
        },
      },
    });
  };

  const handleSelectEnumChange = (item: any, name: string) => {
    setRecordData({
      ...recordData,
      [name]: item.id,
    });
  };

  const handleCreate = async () => {
    try {
      // Check if all required fields are filled
      const requiredFields = Object.keys(employeeFields).filter(
        (fieldName) => employeeFields[fieldName].required
      );

      const areAllRequiredFieldsFilled = requiredFields.every((fieldName) =>
        recordData[fieldName]?.connect?.id != null
          ? Boolean(recordData[fieldName]?.connect?.id)
          : Boolean(recordData[fieldName])
      );

      console.log('areAllRequiredFieldsFilled');
      console.log(areAllRequiredFieldsFilled);

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
      // reset parent value if it's empty
      if (recordData.parent.connect.id === 0)
        newRecordData = {
          ...newRecordData,
          parent: undefined,
        };
      // convert birthdate to datetime
      if (recordData.birthdate)
        newRecordData = {
          ...newRecordData,
          birthdate: new Date(recordData.birthdate),
        };
      // convert joiningDate to datetime
      if (recordData.joiningDate)
        newRecordData = {
          ...newRecordData,
          joiningDate: new Date(recordData.joiningDate),
        };
      await createRecord({
        modelName: 'Employee',
        data: newRecordData,
      }).then((newRecord: any) => {
        handleUpload(newRecord.id);
        // update logs
        createRecord({
          modelName: 'Log',
          data: {
            content: "Employee was created successfully",
            userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
            modelName: "Employee",
            recordId: newRecord.id
          },
        });
      });
      setOpenModal(!openModal);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'A new employee have been created successfully',
        type: 'success',
      });
      // reset the modal data
      setRecordData({
        img: '',
        name: '',
        birthdate: '',
        gender: {
          connect: {
            id: 0,
          },
        },
        email: '',
        phone: '',
        mobile: '',
        employmentType: 'FULL_TIME',
        status: 'ACTIVE',
        jobTitle: {
          connect: {
            id: 0,
          },
        },
        department: {
          connect: {
            id: 0,
          },
        },
        parent: {
          connect: {
            id: 0,
          },
        },
        joiningDate: '',
      });
      // get dashboards by modelName & update them
      getAndUpdateDashboardItems('Employee');
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  const employeeActionMenus = [
    {
      id: 1,
      name: 'View',
      icon: <EyeIcon width={16} height={16} />,
      handleClick: (id: number) => navigate(`/employees/profiles/${id}`),
    },
    {
      id: 2,
      name: 'Edit',
      icon: <PencilSquareIcon width={16} height={16} />,
      handleClick: (id: number) =>
        navigate(`/employees/profiles/${id}?edit=true`),
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
    modelName: 'Employee',
    filters: [],
    selectFields: [
      'id',
      'name',
      'email',
      'phone',
      'mobile',
      'jobTitle.name',
      'department.name',
      'parent.name',
      'employmentType',
      'joiningDate',
      'birthdate',
      'status',
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

  const convertEnumText = (enumText: string): string => {
    const words = enumText.toLowerCase().split('_');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  };

  const handleStatusBadgeColor = (status: string) => {
    let color = '';
    switch (status) {
      case 'ACTIVE':
        color = 'green';
        break;
      case 'ON_LEAVE':
        color = 'orange';
        break;
      case 'TERMINATED':
        color = 'red';
        break;
      default:
        break;
    }
    return color;
  };

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
              items={genders}
              value={{ id: 0, name: 'Gender' }}
              handleChange={() => null}
            />
            <Select
              openMaxWidth
              customClass="bg-serene-100 text-serene-700 font-medium border-0 space-x-2"
              items={departments}
              value={{ id: 0, name: 'Department' }}
              handleChange={() => null}
            />
            <Select
              openMaxWidth
              customClass="bg-serene-100 text-serene-700 font-medium border-0 space-x-2"
              items={supervisors}
              value={{ id: 0, name: 'Supervisor' }}
              handleChange={() => null}
              hasAvatars
            />
            <Select
              openMaxWidth
              customClass="bg-white space-x-2"
              items={[
                { id: 1, name: 'Job Title' },
                { id: 2, name: 'Category' },
                { id: 3, name: 'Source' },
              ]}
              value={{ id: 0, name: 'More' }}
              handleChange={() => null}
              icon={<AdjustmentsVerticalIcon width={14} height={14} />}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-0 border-r border-gray-300">
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
            <div className="flex items-center space-x-4">
              <button
                type="button"
                title="Card View"
                className={`flex items-center justify-center cursor-pointer ${
                  viewType === 'card' ? 'text-serene-600' : ' text-serene-300'
                }`}
                onClick={() => setViewType('card')}
              >
                <Squares2X2Icon width={20} height={20} className="stroke-2" />
              </button>
              <button
                type="button"
                title="List View"
                className={`flex items-center justify-center cursor-pointer ${
                  viewType === 'list' ? 'text-serene-600' : ' text-serene-300'
                }`}
                onClick={() => setViewType('list')}
              >
                <ViewColumnsIcon
                  width={20}
                  height={20}
                  className="stroke-2"
                />
              </button>
            </div>
          </div>
        </ControlPanel>
        {openToast && <Toast title={toastData.title} type={toastData.type} />}
        {openDialog && (
          <Dialog
            title="Confirmation"
            message="Are you really want to delete this employee?"
            open={openDialog}
            discardButton="No"
            confirmButton="Yes"
            onDiscard={() => setOpenDialog(!openDialog)}
            onConfirm={() => handleDelete(selectedId)}
          />
        )}
        {openModal && (
          <Modal
            title="New Employee"
            open={openModal}
            onDiscard={() => setOpenModal(!openModal)}
            onSave={handleCreate}
          >
            <div className="flex justify-center">
              <div className="relative">
                <Avatar
                  size="md"
                  icon={<UserIcon className="text-serene-600" />}
                  src={recordData.img}
                />
                <ArrowUpTrayIcon
                  width={24}
                  height={24}
                  className="absolute z-10 -right-1.5 -top-1.5 bg-gray-50 text-serene-600 p-1 rounded-md shadow-md cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                />
                <input
                  type="file"
                  id="imageInput"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }} // Hide the input field
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <h1>Personal Details</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <Input
                  label="Name"
                  name="name"
                  value={recordData.name}
                  handleChange={handleInputChange}
                  required={employeeFields.name.required}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Date of Birth"
                  name="birthdate"
                  value={recordData.birthdate}
                  type="date"
                  handleChange={handleInputChange}
                  required={employeeFields.birthdate.required}
                />
              </div>
              <div className="col-span-1">
                <Select
                  label="Gender"
                  items={genders}
                  value={
                    genders.filter((item) => {
                      return item.id === recordData.gender.connect.id;
                    })[0]
                  }
                  handleChange={(item: any) =>
                    handleSelectChange(item, 'gender')
                  }
                  required={employeeFields.gender.required}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Email"
                  name="email"
                  value={recordData.email}
                  handleChange={handleInputChange}
                  required={employeeFields.email.required}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Phone"
                  name="phone"
                  value={recordData.phone}
                  handleChange={handleInputChange}
                  required={employeeFields.phone.required}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Mobile"
                  name="mobile"
                  value={recordData.mobile}
                  handleChange={handleInputChange}
                  required={employeeFields.mobile.required}
                />
              </div>
            </div>
            <h1>Employment Details</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <Select
                  label="Job Title"
                  items={jobTitles}
                  value={
                    jobTitles.filter((item) => {
                      return item.id === recordData.jobTitle.connect.id;
                    })[0]
                  }
                  handleChange={(item: any) =>
                    handleSelectChange(item, 'jobTitle')
                  }
                  required={employeeFields.jobTitle.required}
                />
              </div>
              <div className="col-span-1">
                <Select
                  label="Department"
                  items={departments}
                  value={
                    departments.filter((item) => {
                      return item.id === recordData.department.connect.id;
                    })[0]
                  }
                  handleChange={(item: any) =>
                    handleSelectChange(item, 'department')
                  }
                  required={employeeFields.department.required}
                />
              </div>
              <div className="col-span-1">
                <Select
                  label="Supervisor"
                  items={supervisors}
                  value={
                    supervisors.filter((item) => {
                      return item.id === recordData.parent.connect.id;
                    })[0]
                  }
                  handleChange={(item: any) =>
                    handleSelectChange(item, 'parent')
                  }
                  required={employeeFields.parent.required}
                  hasAvatars
                />
              </div>
              <div className="col-span-1">
                <Select
                  label="Type"
                  items={ContractTypes}
                  value={
                    ContractTypes.filter((item) => {
                      return item.id === recordData.employmentType;
                    })[0]
                  }
                  handleChange={(item: any) =>
                    handleSelectEnumChange(item, 'employmentType')
                  }
                  required={employeeFields.employmentType.required}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Joining Date"
                  name="joiningDate"
                  value={recordData.joiningDate}
                  type="date"
                  handleChange={handleInputChange}
                  required={employeeFields.joiningDate.required}
                />
              </div>
            </div>
          </Modal>
        )}
        {viewType === 'list' ? (
          <Card>
            <div className="space-y-2">
              <Table
                columns={columns}
                optionalColumns={optionalColumns}
                handleColumnChange={toggleColumnVisibility}
              >
                {data?.records?.map((employee: any, index: number) => (
                  <tr
                    className={`group hover:bg-serene-50 ${
                      index + 1 !== data?.records?.length &&
                      'border-b border-b-gray-200'
                    }`}
                    key={employee.id}
                  >
                    <td className="py-4 px-6">
                      {index + 1 + (currentPage - 1) * 5}
                    </td>
                    <td className="flex items-center py-4 px-6 whitespace-nowrap">
                      <Avatar
                        icon={<div>{employee.name[0]}</div>}
                        src={employee.img && API_BASE_URL + employee.img}
                      />
                      <div className="pl-3">
                        <div>{employee.name}</div>
                        <div className="text-gray-500 text-[11px]">
                          {employee.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div>{employee.phone}</div>
                    </td>
                    {visibleColumns.includes('mobile') && (
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div>{employee.mobile}</div>
                      </td>
                    )}
                    <td className="py-4 px-6">
                      <div>{employee.jobTitle?.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div>{employee.department?.name}</div>
                    </td>
                    <td className="flex items-center py-4 px-6 whitespace-nowrap">
                      {employee.parent && (
                        <Avatar
                          icon={<div>{employee.parent.name[0]}</div>}
                          src={
                            employee.parent.img &&
                            API_BASE_URL + employee.parent.img
                          }
                        />
                      )}
                      <div className="pl-3">
                        <div>{employee.parent?.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <td className="py-4 px-6">
                        {employee.joiningDate && (
                          <div>
                            {new Date(
                              employee.joiningDate
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                    </td>
                    {visibleColumns.includes('birthdate') && (
                      <td className="py-4 px-6">
                        {employee.birthdate && (
                          <div>
                            {new Date(
                              employee.birthdate
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                    )}
                    <td className="py-4 px-6">
                      <Badge
                        value={convertEnumText(employee.status)}
                        color={handleStatusBadgeColor(employee.status)}
                      />
                    </td>
                    <td>
                      <DropdownAction
                        actionMenu={employeeActionMenus}
                        recordId={employee.id}
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
        ) : (
          <div className="overflow-hidden space-y-2">
            <div className="grid grid-cols-3 gap-4">
              {data?.records?.map((employee: any) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  enabled
                  actionMenu={employeeActionMenus}
                />
              ))}
            </div>
            <Paginator
              itemsPerPage={6}
              totalItems={totalItems}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Container>
  );
}
