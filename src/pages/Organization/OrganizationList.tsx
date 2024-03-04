/* eslint-disable no-return-assign */
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
import OrganizationCard from '../../features/contact/components/OrganizationCard';
import { organizationFields } from '../../features/contact/data/fields';
import { organizationsList } from '../../sample/organizations';

export default function OrganizationList() {
  // Initialize the filters state with default values
  const [filters, setFilters] = useState({
    industryId: { id: 0, name: 'Industry' },
    sizeId: { id: 0, name: 'Size' },
    // Add more filter types as needed
  });

  // Function to handle filter changes
  const handleFilterChange = (filterType: string, selectedValue: any) => {
    // Update the filters object with the selected value
    setFilters({
      ...filters,
      [filterType]: selectedValue,
    });

    // Here, you can apply additional logic if needed
    // For example, trigger a data fetch with the selected filters.
    // You can construct your filterData object based on the filters object.
  };
  // Function to construct the filters object based on selected filter values
  const constructFilters = () => {
    const filterConditions = Object.entries(filters)
      .filter(([_, value]) => value !== null && value.id !== 0) // Exclude filters with id 0
      .map(([field, value]) => {
        // Convert the selected value to match your filter data structure
        const selectedValue = Array.isArray(value)
          ? value.map((item) => item.id)
          : value.id;
        return {
          field,
          operator: 'equals', // You can customize this operator as needed
          values: selectedValue,
        };
      });

    // Add conditions for other filters as needed

    return {
      logicalOperator: 'AND', // You can customize the logicalOperator as needed
      conditions: filterConditions,
    };
  };
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
      id: 'industry',
      name: 'Industry',
      sequence: 3,
    },
    {
      id: 'size',
      name: 'Size',
      sequence: 4,
    },
    {
      id: 'country',
      name: 'Country',
      sequence: 5,
    },
  ]);
  const [optionalColumns] = useState([
    {
      id: 'source',
      name: 'Source',
      sequence: 6,
    },
    {
      id: 'website',
      name: 'Website',
      sequence: 7,
    },
    {
      id: 'individuals',
      name: 'Individuals',
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
      name: 'Organizations',
      path: '/contact/organization',
    },
  ];

  const sortedFieldItems = [
    { id: 'id', name: 'Recent' },
    { id: 'name', name: 'Name' },
    { id: 'industry.name', name: 'Industry' },
    { id: 'size.id', name: 'Size' },
    { id: 'country.name', name: 'Country' },
    { id: 'source.name', name: 'Source' },
  ];

  const [sortedField, setSortedField] = useState({ id: 'id', name: 'Recent' });

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'Organization',
    filters: [constructFilters()],
    selectFields: [
      'id',
      'name',
      'img',
      'email',
      'phone',
      'street',
      'city',
      'province',
      'industry',
      'size',
      'country',
      'source',
      'website',
      'individuals',
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
  const data = organizationsList;
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
    type: 'organization',
    img: '',
    email: '',
    phone: '',
    website: '',
    industry: {
      connect: {
        id: 0,
      },
    },
    size: {
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
          modelName: 'Organization', // Model name
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
      modelName: 'organization', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      // await updateTotalItems();
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Organization have been deleted successfully',
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

  const [industries, setIndustries] = useState(new Array(0));
  const [sizes, setSizes] = useState(new Array(0));
  const [countries, setCountries] = useState(new Array(0));

  useEffect(() => {
    // get industries
    fetchDataByModel('industry').then((result) => {
      setIndustries(result?.records);
    });
    // get sizes
    fetchDataByModel('size').then((result) => {
      setSizes(result?.records);
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
      const requiredFields = Object.keys(organizationFields).filter(
        (fieldName) => organizationFields[fieldName].required
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
        modelName: 'Organization',
        data: recordData,
      }).then((newRecord: any) => {
        handleUpload(newRecord.id);
        // update logs
        createRecord({
          modelName: 'Log',
          data: {
            content: "Organization was created successfully",
            userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
            modelName: "Organization",
            recordId: newRecord.id
          },
        });
      });
      setOpenModal(!openModal);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'A new organization have been created successfully',
        type: 'success',
      });
      // reset the modal data
      setRecordData({
        name: '',
        type: 'organization',
        img: '',
        email: '',
        phone: '',
        website: '',
        industry: {
          connect: {
            id: 0,
          },
        },
        size: {
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

  const organizationActionMenus = [
    {
      id: 1,
      name: 'View',
      icon: <EyeIcon width={16} height={16} />,
      handleClick: (id: number) => navigate(`/contact/organization/${id}`),
    },
    {
      id: 2,
      name: 'Edit',
      icon: <PencilSquareIcon width={16} height={16} />,
      handleClick: (id: number) =>
        navigate(`/contact/organization/${id}?edit=true`),
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
    modelName: 'Organization',
    filters: [constructFilters()],
    selectFields: [
      'id',
      'name',
      'email',
      'phone',
      'street',
      'city',
      'province',
      'industry',
      'size',
      'country',
      'source',
      'website',
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
      handleClick: () => {
        console.log('filters');
        console.log(filters);
        console.log(constructFilters());
        exportDataToFile(exportRequest, 'xlsx');
      },
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
            items={industries}
            value={filters.industryId}
            handleChange={(value) =>
              handleFilterChange('industryId', value)
            }
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={sizes}
            value={filters.sizeId}
            handleChange={(value) => handleFilterChange('sizeId', value)}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[
              { id: 1, name: 'Category' },
              { id: 2, name: 'Source' },
              { id: 3, name: 'Province' },
              { id: 4, name: 'Country' },
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
          message="Are you really want to delete this organization?"
          open={openDialog}
          discardButton="No"
          confirmButton="Yes"
          onDiscard={() => setOpenDialog(!openDialog)}
          onConfirm={() => handleDelete(selectedId)}
        />
      )}
      {openModal && (
        <Modal
          title="New Organization"
          open={openModal}
          onDiscard={() => setOpenModal(!openModal)}
          onSave={handleCreate}
        >
          <div className="flex justify-center">
            <div className="relative">
              <Avatar
                size="md"
                icon={<BuildingOfficeIcon className="text-serene-600" />}
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
                required={organizationFields.name.required}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Industry"
                items={industries}
                value={
                  industries.filter((item) => {
                    return item.id === recordData.industry.connect.id;
                  })[0]
                }
                handleChange={(item: any) =>
                  handleSelectChange(item, 'industry')
                }
                required={organizationFields.industry.required}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Size"
                items={sizes}
                value={
                  sizes.filter((item) => {
                    return item.id === recordData.size.connect.id;
                  })[0]
                }
                handleChange={(item: any) =>
                  handleSelectChange(item, 'size')
                }
                required={organizationFields.size.required}
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
                required={organizationFields.email.required}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Phone"
                name="phone"
                value={recordData.phone}
                handleChange={handleInputChange}
                required={organizationFields.phone.required}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Website"
                name="website"
                value={recordData.website}
                handleChange={handleInputChange}
                required={organizationFields.website.required}
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
                required={organizationFields.street.required}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Zip Code"
                name="zipCode"
                value={recordData.zipCode}
                handleChange={handleInputChange}
                required={organizationFields.zipCode.required}
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
                required={organizationFields.city.required}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Province"
                name="province"
                value={recordData.province}
                handleChange={handleInputChange}
                required={organizationFields.province.required}
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
                required={organizationFields.country.required}
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
              {data?.map((organization: any, index: number) => (
                <tr
                  className={`group hover:bg-serene-50 ${
                    index + 1 !== data?.length &&
                    'border-b border-b-gray-200'
                  }`}
                  key={organization.id}
                >
                  <td className="py-4 px-6">
                    {index + 1 + (currentPage - 1) * 5}
                  </td>
                  <td className="flex items-center py-4 px-6 whitespace-nowrap">
                    <Avatar
                      icon={
                        <BuildingOfficeIcon className="text-serene-600" />
                      }
                      src={
                        organization.img && API_BASE_URL + organization.img
                      }
                    />
                    <div className="pl-3">
                      <div>{organization.name}</div>
                      <div className="text-gray-500 text-[11px]">
                        {organization.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>{organization.phone}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>{organization.industry?.name}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>{organization.size?.name}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>{organization.country?.name}</div>
                  </td>
                  {visibleColumns.includes('source') && (
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div>{organization.source?.name}</div>
                    </td>
                  )}
                  {visibleColumns.includes('website') && (
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div>{organization.website}</div>
                    </td>
                  )}
                  {visibleColumns.includes('individuals') && (
                    <td className="py-4 px-6 space-y-1 whitespace-nowrap">
                      <div className="flex items-center -space-x-2">
                        {organization.individuals?.map((item: any) => (
                          <Avatar
                            key={item.id}
                            icon={
                              <BuildingOfficeIcon className="text-serene-600" />
                            }
                            src={item.img && API_BASE_URL + item.img}
                            title={item.name}
                          />
                        ))}
                      </div>
                    </td>
                  )}
                  <td>
                    <DropdownAction
                      actionMenu={organizationActionMenus}
                      recordId={organization.id}
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
            {data?.map((organization: any) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
                enabled
                actionMenu={organizationActionMenus}
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
