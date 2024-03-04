/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  StarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Container from '../../layout/Container';
import ControlPanel from '../../layout/ControlPanel';
import {
  IconButton,
  PrimaryButton,
  SecondaryButton,
} from '../../components/ui/Button';
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
import { opportunityFields } from '../../features/prospect/data/fields';
import Paginator from '../../components/ui/Paginator';
import { fetchCountData } from '../../services/filter.service';
import Table from '../../components/ui/Table';
import DropdownAction from '../../components/ui/DropdownAction';
import fetchDataByModel from '../../utils/fetch';
import useDisableFocus from '../../hooks/useDisableFocus';
import exportDataToFile from '../../utils/export';
import Dropdown from '../../components/ui/Dropdown';
import Badge from '../../components/ui/Badge';
import KanbanBoardOpportunity from '../../features/prospect/components/KanbanBoardOpportunity';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { ViewColumnsIcon } from '@heroicons/react/24/outline';

export default function OpportunityList() {
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  const [viewType, setViewType] = useState('card');
  const [openExportMenu, setOpenExportMenu] = useState(false);
  const exportMenuRef = useRef(null);
  useDisableFocus(exportMenuRef, setOpenExportMenu);

  const priorities = ['Low', 'Medium', 'High'];

  const [columns, setColumns] = useState<any[]>([
    {
      id: 'name',
      name: 'Name',
      sequence: 1,
    },
    {
      id: 'channel',
      name: 'Acquisition Channel',
      sequence: 2,
    },
    {
      id: 'contact',
      name: 'Contact',
      sequence: 3,
    },
    {
      id: 'expectedClosing',
      name: 'Expected Closing',
      sequence: 4,
    },
    {
      id: 'user',
      name: 'Salesperson',
      sequence: 5,
    },
    {
      id: 'salesTeam',
      name: 'Sales Team',
      sequence: 6,
    },
    {
      id: 'stage',
      name: 'Stage',
      sequence: 7,
    },
  ]);
  const [optionalColumns] = useState([
    {
      id: 'priority',
      name: 'Priority',
      sequence: 8,
    },
    {
      id: 'expectedRevenue',
      name: 'Expected Revenue',
      sequence: 9,
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
      name: 'Opportunities',
      path: '/pipeline/opportunity',
    },
  ];

  const sortedFieldItems = [
    { id: 'id', name: 'Recent' },
    { id: 'name', name: 'Name' },
    { id: 'channel.name', name: 'Acquisition Channel' },
    { id: 'salesTeam', name: 'Sales Team' },
    { id: 'priority', name: 'Priority' },
    { id: 'stage.sequence', name: 'Stage' },
  ];

  const [sortedField, setSortedField] = useState({ id: 'id', name: 'Recent' });

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'Opportunity',
    filters: [],
    selectFields: [
      'id',
      'name',
      'organization.img',
      'organization.name',
      'individual.img',
      'individual.name',
      'channel',
      'expectedClosing',
      'expectedRevenue',
      'priority',
      'user.img',
      'user.name',
      'salesTeam',
      'stage',
    ],
    sortField: sortedField.id,
    sortOrder: 'asc',
    page: currentPage,
    perPage: viewType === 'list' ? 5 : 50,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  const { data } = useFilterData(filterData);
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
    contact: {
      connect: {
        id: 0,
      },
    },
    channel: {
      connect: {
        id: 0,
      },
    },
    user: {
      connect: {
        id: 0,
      },
    },
    probability: {
      connect: {
        id: 0,
      },
    },
    stage: {
      connect: {
        id: 0,
      },
    },
    subStage: {
      connect: {
        id: 0,
      },
    },
    priority: 'Low',
    salesTeam: '',
    expectedClosing: '',
    expectedRevenue: '',
  });

  // delete
  const { deleteRecord } = useDeleteRecord(queryKey);

  const handleDelete = async (id: number) => {
    const record = {
      modelName: 'opportunity', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      // await updateTotalItems();
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Opportunity have been deleted successfully',
        type: 'success',
      });
    } catch (error) {
      // Handle error
    }
  };

  const [contacts, setContacts] = useState(new Array(0));
  const [channels, setChannels] = useState(new Array(0));
  const [users, setUsers] = useState(new Array(0));
  const [probabilities, setProbabilities] = useState(new Array(0));
  const [stages, setStages] = useState(new Array(0));

  useEffect(() => {
    // get organizations
    fetchDataByModel('organization', ['id', 'name', 'type']).then(
      (resultOrganizations) => {
        // get individuals
        fetchDataByModel('individual', ['id', 'name', 'type']).then(
          (resultIndividuals) => {
            setContacts([
              ...resultOrganizations.records,
              ...resultIndividuals.records,
            ]);
          }
        );
      }
    );
    // get channels
    fetchDataByModel('channel').then((result) => {
      setChannels(result?.records);
    });
    // get users
    fetchDataByModel('user', ['id', 'name', 'img', 'salesTeam']).then((result) => {
      setUsers(result?.records);
    });
    // get probabilities
    fetchDataByModel('probability').then((result) => {
      setProbabilities(result?.records);
    });
    // get stages
    fetchDataByModel(
      'stage',
      ['id', 'name', 'color', 'children'],
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
              values: 'Opportunity',
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

  const handlePriorityChange = (sequence: number) => {
    setRecordData({
      ...recordData,
      priority: priorities[sequence],
    });
  };
  const [selectedContact, setSelectedContact] = useState({
    id: 0,
    name: '',
    type: '',
  });

  const handleSelectContactChange = (item: any, name: string) => {
    setSelectedContact(item);
    handleSelectChange(item, name);
  };

  const [salesTeam, setSalesTeam] = useState('');

  const handleSelectSalespersonChange = (item: any, name: string) => {
    setSalesTeam(item.salesTeam?.name);
    handleSelectChange(item, name);
  };

  const handleCreate = async () => {
    try {
      // Check if all required fields are filled
      const requiredFields = Object.keys(opportunityFields).filter(
        (fieldName) => opportunityFields[fieldName].required
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
      // cast float fields, initiate sales team & stage before saving
      let newRecordData: any = {
        ...recordData,
        salesTeam,
        expectedRevenue: parseFloat(recordData.expectedRevenue),
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
      console.log('newRecordData');
      console.log(newRecordData);
      console.log(recordData.user);
      console.log(salesTeam);
      // fill contact with the appropriate model (organization or individual) before saving
      if (selectedContact.type === 'organization')
        newRecordData = {
          ...newRecordData,
          organization: {
            connect: {
              id: selectedContact.id,
            },
          },
        };
      if (selectedContact.type === 'individual')
        newRecordData = {
          ...newRecordData,
          individual: {
            connect: {
              id: selectedContact.id,
            },
          },
        };
      // remove the contact key before saving
      delete newRecordData.contact;
      await createRecord({
        modelName: 'Opportunity',
        data: newRecordData,
      }).then((newRecord: any) => {
        // update logs
        createRecord({
          modelName: 'Log',
          data: {
            content: "Opportunity was created successfully",
            userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
            modelName: "Opportunity",
            recordId: newRecord.id
          },
        });
      });
      setOpenModal(!openModal);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'A new opportunity have been created successfully',
        type: 'success',
      });
      // reset the modal data
      setSelectedContact({
        id: 0,
        name: '',
        type: '',
      });
      setSalesTeam('');
      setRecordData({
        name: '',
        contact: {
          connect: {
            id: 0,
          },
        },
        channel: {
          connect: {
            id: 0,
          },
        },
        user: {
          connect: {
            id: 0,
          },
        },
        probability: {
          connect: {
            id: 0,
          },
        },
        stage: {
          connect: {
            id: 0,
          },
        },
        subStage: {
          connect: {
            id: 0,
          },
        },
        priority: 'Low',
        salesTeam: '',
        expectedClosing: '',
        expectedRevenue: '',
      });
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  const opportunityActionMenus = [
    {
      id: 1,
      name: 'View',
      icon: <EyeIcon width={16} height={16} />,
      handleClick: (id: number) => navigate(`/pipeline/opportunity/${id}`),
    },
    {
      id: 2,
      name: 'Edit',
      icon: <PencilSquareIcon width={16} height={16} />,
      handleClick: (id: number) =>
        navigate(`/pipeline/opportunity/${id}?edit=true`),
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
    modelName: 'Opportunity',
    filters: [],
    selectFields: [
      'id',
      'name',
      'organization.name',
      'individual.name',
      'channel.name',
      'expectedClosing',
      'expectedRevenue',
      'priority',
      'user.name',
      'salesTeam',
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
            items={contacts}
            value={{ id: 0, name: 'Contact' }}
            handleChange={() => null}
            hasAvatars
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={channels}
            value={{ id: 0, name: 'Channel' }}
            handleChange={() => null}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={stages}
            value={{ id: 0, name: 'Stage' }}
            handleChange={() => null}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[
              { id: 1, name: 'Salesperson' },
              { id: 2, name: 'Sales Team' },
              { id: 3, name: 'Priority' },
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
          message="Are you really want to delete this opportunity?"
          open={openDialog}
          discardButton="No"
          confirmButton="Yes"
          onDiscard={() => setOpenDialog(!openDialog)}
          onConfirm={() => handleDelete(selectedId)}
        />
      )}
      {openModal && (
        <Modal
          title="New Opportunity"
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
                required={opportunityFields.name.required}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Acquisition Channel"
                items={channels}
                value={
                  channels.filter((item) => {
                    return item.id === recordData.channel.connect.id;
                  })[0]
                }
                handleChange={(item: any) =>
                  handleSelectChange(item, 'channel')
                }
                required={opportunityFields.channel.required}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Contact"
                items={contacts}
                value={
                  contacts.filter((item) => {
                    return item.id === selectedContact.id;
                  })[0]
                }
                handleChange={(item: any) =>
                  handleSelectContactChange(item, 'contact')
                }
                required={opportunityFields.contact.required}
                hasAvatars
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
                        priorities.indexOf(recordData.priority) !== 0
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
                        priorities.indexOf(recordData.priority) === 2
                          ? 'stroke-yellow-300 fill-yellow-300'
                          : 'stroke-gray-500'
                      }`}
                    />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <Select
                label="Salesperson"
                items={users}
                value={
                  users.filter((item) => {
                    return item.id === recordData.user.connect.id;
                  })[0]
                }
                handleChange={(item: any) =>
                  handleSelectSalespersonChange(item, 'user')
                }
                required={opportunityFields.user.required}
                hasAvatars
              />
            </div>
            <div className="col-span-1">
              <Input
                disabled
                label="Sales Team"
                name="salesTeam"
                value={salesTeam}
                handleChange={() => null}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Expected Closing"
                name="expectedClosing"
                value={recordData.expectedClosing}
                type="date"
                handleChange={handleInputChange}
                required={opportunityFields.expectedClosing.required}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Probability"
                items={probabilities}
                value={
                  probabilities.filter((item) => {
                    return item.id === recordData.probability.connect.id;
                  })[0]
                }
                handleChange={(item: any) =>
                  handleSelectChange(item, 'probability')
                }
                required={opportunityFields.probability.required}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Expected Revenue"
                name="expectedRevenue"
                value={recordData.expectedRevenue}
                handleChange={handleInputChange}
                required={opportunityFields.expectedRevenue.required}
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
              {data?.records?.map((opportunity: any, index: number) => (
                <tr
                  className={`group hover:bg-serene-50 ${
                    index + 1 !== data?.records?.length &&
                    'border-b border-b-gray-200'
                  }`}
                  key={opportunity.id}
                >
                  <td className="py-4 px-6">
                    {index + 1 + (currentPage - 1) * 5}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>{opportunity.name}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>{opportunity.channel?.name}</div>
                  </td>
                  {opportunity.organization && (
                    <td className="flex items-center py-4 px-6">
                      <Avatar
                        icon={
                          <BuildingOfficeIcon className="text-serene-600" />
                        }
                        src={
                          opportunity.organization.img &&
                          API_BASE_URL + opportunity.organization.img
                        }
                      />
                      <div className="pl-3">
                        {opportunity.organization?.name}
                      </div>
                    </td>
                  )}
                  {opportunity.individual && (
                    <td className="flex items-center py-4 px-6">
                      <Avatar
                        icon={<div>{opportunity.individual?.name[0]}</div>}
                        src={
                          opportunity.individual.img &&
                          API_BASE_URL + opportunity.individual.img
                        }
                      />
                      <div className="pl-3">
                        {opportunity.individual?.name}
                      </div>
                    </td>
                  )}
                  <td className="py-4 px-6">
                    <div>
                      {opportunity.expectedClosing &&
                        new Date(
                          opportunity.expectedClosing
                        ).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Avatar
                      icon={<div>{opportunity.user?.name[0]}</div>}
                      src={
                        opportunity.user.img &&
                        API_BASE_URL + opportunity.user.img
                      }
                      title={opportunity.user?.name}
                    />
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {opportunity.salesTeam}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <Badge
                      value={opportunity.stage?.name}
                      color={opportunity.stage?.color}
                    />
                  </td>
                  {visibleColumns.includes('priority') && (
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
                              priorities.indexOf(opportunity.priority) !== 0
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
                              priorities.indexOf(opportunity.priority) === 2
                                ? 'stroke-yellow-300 fill-yellow-300'
                                : 'stroke-gray-500'
                            }`}
                          />
                        </IconButton>
                      </div>
                    </td>
                  )}
                  {visibleColumns.includes('expectedRevenue') && (
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div>$ {opportunity.expectedRevenue}</div>
                    </td>
                  )}
                  <td>
                    <DropdownAction
                      actionMenu={opportunityActionMenus}
                      recordId={opportunity.id}
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
        data?.records && 
        stages.length && 
        <KanbanBoardOpportunity 
          modelName='Opportunity' 
          filterData={filterData} 
          stages={stages} 
          actionMenu={opportunityActionMenus}
        />
      )}
    </Container>
  );
}
