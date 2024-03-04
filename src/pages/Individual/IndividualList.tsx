/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  BuildingOfficeIcon,
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
import useDisableFocus from '../../hooks/useDisableFocus';
import exportDataToFile from '../../utils/export';
import Dropdown from '../../components/ui/Dropdown';
import IndividualCard from '../../features/contact/components/IndividualCard';
import { individualFields } from '../../features/contact/data/fields';
import { individualsList } from '../../sample/individuals';

export default function IndividualList() {
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
      id: 'organization',
      name: 'Organization',
      sequence: 4,
    },
    {
      id: 'jobTitle',
      name: 'JobTitle',
      sequence: 5,
    },
    {
      id: 'country',
      name: 'Country',
      sequence: 6,
    },
  ]);
  const [optionalColumns] = useState([
    {
      id: 'mobile',
      name: 'Mobile',
      sequence: 3,
    },
    {
      id: 'source',
      name: 'Source',
      sequence: 7,
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
      name: 'Individuals',
      path: '/contact/individual',
    },
  ];

  const sortedFieldItems = [
    { id: 'id', name: 'Recent' },
    { id: 'name', name: 'Name' },
    { id: 'organization.name', name: 'Organization' },
    { id: 'jobTitle', name: 'Job Title' },
    { id: 'country.name', name: 'Country' },
    { id: 'source.name', name: 'Source' },
  ];

  const [sortedField, setSortedField] = useState({ id: 'id', name: 'Recent' });

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'Individual',
    filters: [],
    selectFields: [
      'id',
      'name',
      'img',
      'jobTitle',
      'organization.img',
      'organization.name',
      'email',
      'phone',
      'mobile',
      'street',
      'city',
      'province',
      'country',
      'source',
      'leads.id',
      'opportunities.id',
      'quotes.id',
    ],
    sortField: sortedField.id,
    sortOrder: 'asc',
    page: currentPage,
    perPage: viewType === 'list' ? 5 : 6,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  //const { data } = useFilterData(filterData);
  const data = individualsList;
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
    type: 'individual',
    img: '',
    jobTitle: '',
    email: '',
    phone: '',
    mobile: '',
    organization: {
      connect: {
        id: 0,
      },
    },
    street: '',
    zipCode: '',
    city: '',
    province: '',
    country: {
      connect: {
        id: 0,
      },
    },
  });

  const uploadImage = useUploadImage(queryKey); // Use the custom hook
  const handleUpload = async (id: number) => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        // Call the mutate function to update the record
        await uploadImage.mutateAsync({
          modelName: 'Individual', // Model name
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
      modelName: 'individual', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      // await updateTotalItems();
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Individual have been deleted successfully',
        type: 'success',
      });
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

  const [organizations, setOrganizations] = useState(new Array(0));
  const [countries, setCountries] = useState(new Array(0));

  useEffect(() => {
    // get organizations
    fetchDataByModel('organization').then((result) => {
      setOrganizations(result?.records);
    });
    // get countries
    fetchDataByModel('country').then((result) => {
      setCountries(result?.records);
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

  const handleCreate = async () => {
    try {
      // Check if all required fields are filled
      const requiredFields = Object.keys(individualFields).filter(
        (fieldName) => individualFields[fieldName].required
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
      await createRecord({
        modelName: 'Individual',
        data: recordData,
      }).then((newRecord: any) => {
        handleUpload(newRecord.id);
        // update logs
        createRecord({
          modelName: 'Log',
          data: {
            content: "Individual was created successfully",
            userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
            modelName: "Individual",
            recordId: newRecord.id
          },
        });
      });
      setOpenModal(!openModal);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'A new individual have been created successfully',
        type: 'success',
      });
      // reset the modal data
      setRecordData({
        name: '',
        type: 'individual',
        img: '',
        jobTitle: '',
        email: '',
        phone: '',
        mobile: '',
        organization: {
          connect: {
            id: 0,
          },
        },
        street: '',
        zipCode: '',
        city: '',
        province: '',
        country: {
          connect: {
            id: 0,
          },
        },
      });
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  const individualActionMenus = [
    {
      id: 1,
      name: 'View',
      icon: <EyeIcon width={16} height={16} />,
      handleClick: (id: number) => navigate(`/contact/individual/${id}`),
    },
    {
      id: 2,
      name: 'Edit',
      icon: <PencilSquareIcon width={16} height={16} />,
      handleClick: (id: number) =>
        navigate(`/contact/individual/${id}?edit=true`),
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
    modelName: 'Individual',
    filters: [],
    selectFields: [
      'id',
      'name',
      'jobTitle',
      'email',
      'phone',
      'mobile',
      'street',
      'city',
      'organization.name',
      'country',
      'source',
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
            items={organizations}
            value={{ id: 0, name: 'Organization' }}
            handleChange={() => null}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={countries}
            value={{ id: 0, name: 'Country' }}
            handleChange={() => null}
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
          message="Are you really want to delete this individual?"
          open={openDialog}
          discardButton="No"
          confirmButton="Yes"
          onDiscard={() => setOpenDialog(!openDialog)}
          onConfirm={() => handleDelete(selectedId)}
        />
      )}
      {openModal && (
        <Modal
          title="New Individual"
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
          <h1>Contact Information</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Input
                label="Name"
                name="name"
                value={recordData.name}
                handleChange={handleInputChange}
                required={individualFields.name.required}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Job Title"
                name="jobTitle"
                value={recordData.jobTitle}
                handleChange={handleInputChange}
                required={individualFields.jobTitle.required}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Organization"
                items={organizations}
                value={
                  organizations.filter((item) => {
                    return item.id === recordData.organization.connect.id;
                  })[0]
                }
                handleChange={(item: any) =>
                  handleSelectChange(item, 'organization')
                }
                required={individualFields.organization.required}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Input
                label="Email"
                name="email"
                value={recordData.email}
                handleChange={handleInputChange}
                required={individualFields.email.required}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Phone"
                name="phone"
                value={recordData.phone}
                handleChange={handleInputChange}
                required={individualFields.phone.required}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Mobile"
                name="mobile"
                value={recordData.mobile}
                handleChange={handleInputChange}
                required={individualFields.mobile.required}
              />
            </div>
          </div>
          <h1>Address Information</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Input
                label="Street"
                name="street"
                value={recordData.street}
                handleChange={handleInputChange}
                required={individualFields.street.required}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Zip Code"
                name="zipCode"
                value={recordData.zipCode}
                handleChange={handleInputChange}
                required={individualFields.zipCode.required}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Input
                label="City"
                name="city"
                value={recordData.city}
                handleChange={handleInputChange}
                required={individualFields.city.required}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Province"
                name="province"
                value={recordData.province}
                handleChange={handleInputChange}
                required={individualFields.province.required}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Country"
                items={countries}
                value={
                  countries.filter((item) => {
                    return item.id === recordData.country.connect.id;
                  })[0]
                }
                handleChange={(item: any) =>
                  handleSelectChange(item, 'country')
                }
                required={individualFields.country.required}
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
              {data?.map((individual: any, index: number) => (
                <tr
                  className={`group hover:bg-serene-50 ${
                    index + 1 !== data?.length &&
                    'border-b border-b-gray-200'
                  }`}
                  key={individual.id}
                >
                  <td className="py-4 px-6">
                    {index + 1 + (currentPage - 1) * 5}
                  </td>
                  <td className="flex items-center py-4 px-6 whitespace-nowrap">
                    <Avatar
                      icon={<div>{individual.name[0]}</div>}
                      src={individual.img && API_BASE_URL + individual.img}
                    />
                    <div className="pl-3">
                      <div>{individual.name}</div>
                      <div className="text-gray-500 text-[11px]">
                        {individual.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>{individual.phone}</div>
                  </td>
                  {visibleColumns.includes('mobile') && (
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div>{individual.mobile}</div>
                    </td>
                  )}
                  <td className="flex items-center py-4 px-6">
                    <Avatar
                      icon={
                        <BuildingOfficeIcon className="text-serene-600" />
                      }
                      src={
                        individual.organization.img &&
                        API_BASE_URL + individual.organization.img
                      }
                    />
                    <div className="pl-3">
                      {individual.organization?.name}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>{individual.jobTitle}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>{individual.country?.name}</div>
                  </td>
                  {visibleColumns.includes('source') && (
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div>{individual.source?.name}</div>
                    </td>
                  )}
                  <td>
                    <DropdownAction
                      actionMenu={individualActionMenus}
                      recordId={individual.id}
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
            {data?.map((individual: any) => (
              <IndividualCard
                key={individual.id}
                individual={individual}
                enabled
                actionMenu={individualActionMenus}
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
