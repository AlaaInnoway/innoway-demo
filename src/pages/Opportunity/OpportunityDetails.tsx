import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  PrinterIcon,
  StarIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useLocation, useParams } from 'react-router-dom';
import Container from '../../layout/Container';
import ControlPanel from '../../layout/ControlPanel';
import {
  IconButton,
  PrimaryButton,
  SecondaryButton,
} from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import { Tab, TabPanel } from '../../components/ui/Tab';
import IndividualCard from '../../features/contact/components/IndividualCard';
import Breadcrumb from '../../components/ui/Breadcrumb';
import useSearchData from '../../hooks/useSearchData';
import { SearchRequest } from '../../interfaces/search-request.interface';
import useUpdateRecord from '../../hooks/useUpdateRecord';
import MultiSelect from '../../components/form/MultiSelect';
import Toast from '../../components/ui/Toast';
import Dialog from '../../components/ui/Dialog';
import NotePanel from '../../features/note/components/NotePanel';
import TaskPanel from '../../features/task/components/TaskPanel';
import DocumentPanel from '../../features/documents/components/DocumentPanel';
import LogPanel from '../../features/log/components/LogPanel';
import { opportunityFields } from '../../features/prospect/data/fields';
import arraysEqual from '../../utils/array';
import fetchDataByModel from '../../utils/fetch';
import OrganizationCard from '../../features/contact/components/OrganizationCard';
import Stepper from '../../components/ui/Stepper';
import QuoteModal from '../../features/quote/components/QuoteModal';
import Paginator from '../../components/ui/Paginator';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import useCreateRecord from '../../hooks/useCreateRecord';

export default function OpportunityDetails() {
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  // Retrieve the 'edit' parameter and check its value
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const edit = queryParams.get('edit');
  const [editable, setEditable] = useState(edit === 'true');

  const [activeIndex, setActiveIndex] = useState(
    parseInt(queryParams.get('active_tab') || '0', 10)
  );
  const { id } = useParams();
  const breadcrumbs = useMemo(
    () => [
      {
        name: 'Opportunities',
        path: '/pipeline/opportunity',
      },
    ],
    []
  );

  const priorities = ['Low', 'Medium', 'High'];
  const filterData: SearchRequest = {
    modelName: 'Opportunity',
    recordId: id || '',
    selectFields: [
      'id',
      'name',
      'organization.id',
      'organization.img',
      'organization.name',
      'organization.type',
      'organization.email',
      'organization.phone',
      'organization.industry',
      'organization.street',
      'organization.city',
      'organization.province',
      'organization.country',
      'individual.id',
      'individual.img',
      'individual.name',
      'individual.type',
      'individual.jobTitle',
      'individual.organization',
      'individual.email',
      'individual.phone',
      'individual.street',
      'individual.city',
      'individual.province',
      'individual.country',
      'channel',
      'expectedClosing',
      'expectedRevenue',
      'probability',
      'priority',
      'user.id',
      'user.name',
      'user.salesTeam',
      'salesTeam',
      'source',
      'campaign',
      'budget',
      'decisionMaker',
      'interests',
      'stage',
      'subStage',
      'quotes.name',
      'quotes.totalAmount',
      'quotes.createdAt',
      'quotes.validityPeriod',
      'quotes.expiredAt',
      'quotes.stage',
    ],
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = useSearchData(filterData);
  const [initialData, setInitialData] = useState(data);
  const [recordData, setRecordData] = useState(initialData);
  const [updatedFields, setUpdatedFields] = useState({});

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setRecordData({
      ...recordData,
      [name]: value,
    });
    if (value !== initialData[name]) {
      // check if the input is filled and required or the field is not required, in this case update changes
      if (
        (value && opportunityFields[name].required) ||
        !opportunityFields[name].required
      ) {
        setUpdatedFields({
          ...updatedFields,
          [name]: value,
        });
      }
    }
  };

  const handleSelectChange = (item: any, name: string) => {
    setRecordData({
      ...recordData,
      [name]: { id: item.id },
    });
    if (item.id !== initialData[name]) {
      // check if the input is filled and required or the field is not required, in this case update changes
      if (
        (item.id && opportunityFields[name].required) ||
        !opportunityFields[name].required
      ) {
        setUpdatedFields({
          ...updatedFields,
          [name]: {
            connect: {
              id: item.id,
            },
          },
        });
      }
    }
  };

  const handlePriorityChange = (name: string, sequence: number) => {
    setRecordData({
      ...recordData,
      priority: priorities[sequence],
    });
    if (priorities[sequence] !== initialData[name]) {
      // check if the input is filled and required or the field is not required, in this case update changes
      if (
        (priorities[sequence] && opportunityFields[name].required) ||
        !opportunityFields[name].required
      ) {
        setUpdatedFields({
          ...updatedFields,
          [name]: priorities[sequence],
        });
      }
    }
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

  const retrieveValues = (array: any[], currentValues: any[] = []) => {
    const listIds = currentValues.map((item) => {
      return item.id;
    });
    return array.filter((item) => {
      return listIds.includes(item.id);
    });
  };

  const handleMultiSelectChange = (selectedItems: any[], name: string) => {
    // Create an array of IDs from the selected items
    const selectedIds = selectedItems.map((item) => item.id);

    setRecordData({
      ...recordData,
      [name]: selectedItems, // Assuming 'name' corresponds to the field name
    });

    // Check if the selected IDs are different from the initial data
    const initialIds = initialData[name].map((item: any) => item.id);

    if (!arraysEqual(selectedIds, initialIds)) {
      // Define a function to compare two arrays for equality
      // Create an array of objects to connect or disconnect based on the difference
      const toConnect = selectedIds.filter((id) => !initialIds.includes(id));
      const toDisconnect = initialIds.filter(
        (id: number) => !selectedIds.includes(id)
      );

      const updatedFieldsCopy: Record<string, any> = { ...updatedFields };

      updatedFieldsCopy[name] = {
        connect: toConnect.map((id) => ({ id })),
        disconnect: updatedFieldsCopy[name]
          ? updatedFieldsCopy[name].disconnect
          : [],
      };

      updatedFieldsCopy[name] = {
        connect: updatedFieldsCopy[name] ? updatedFieldsCopy[name].connect : [],
        disconnect: toDisconnect.map((id: number) => ({ id })),
      };
      setUpdatedFields(updatedFieldsCopy);
    }
  };
  const queryKey = 'searchData';
  const updateRecord = useUpdateRecord(queryKey); // Use the custom hook
  const { createRecord } = useCreateRecord(queryKey);

  const handleUpdate = async () => {
    // Check if all required fields are filled
    const requiredFields = Object.keys(opportunityFields).filter(
      (fieldName) => opportunityFields[fieldName].required
    );

    const areAllRequiredFieldsFilled = requiredFields.every(
      (fieldName) => recordData[fieldName]
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
    if (Object.keys(updatedFields).length !== 0) {
      try {
        const updatedFieldsCopy: Record<string, any> = { ...updatedFields };
        // pass sales team to updated data before saving
        if (updatedFieldsCopy.user) updatedFieldsCopy.salesTeam = salesTeam;
        if (updatedFieldsCopy.expectedRevenue)
          updatedFieldsCopy.expectedRevenue = parseFloat(
            recordData.expectedRevenue
          );
        console.log(updatedFieldsCopy);
        console.log('updatedFieldsCopy');
        setUpdatedFields(updatedFieldsCopy);
        // Call the mutate function to update the record
        await updateRecord.mutateAsync({
          modelName: 'Opportunity', // Model name
          recordId: recordData.id, // Record ID
          updates: updatedFieldsCopy, // Update data
        });
        setOpenToast(!openToast);
        // Handle toast success or further actions
        setToastData({
          title: 'Changes have been saved successfully',
          type: 'success',
        });
        setEditable(!editable);
        setUpdatedFields({});
        setInitialData(recordData);
      } catch (error) {
        console.error('Error updating record:', error);
      }
    } else {
      setEditable(!editable);
      setOpenToast(!openToast);
      // Handle toast info or further actions
      setToastData({
        title: 'No changes have been made that need to be saved',
        type: 'info',
      });
    }
  };

  const handleOpenDialog = () => {
    if (Object.keys(updatedFields).length !== 0) setOpenDialog(!openDialog);
    else setEditable(!editable);
  };

  const handleDiscard = () => {
    setRecordData(initialData);
    setEditable(!editable);
    setOpenDialog(!openDialog);
    setUpdatedFields({});
    setOpenToast(!openToast);
    // Handle toast info or further actions
    setToastData({
      title: 'Changes made have been discarded',
      type: 'info',
    });
  };

  const [contacts, setContacts] = useState(new Array(0));
  const [channels, setChannels] = useState(new Array(0));
  const [users, setUsers] = useState(new Array(0));
  const [probabilities, setProbabilities] = useState(new Array(0));
  const [stages, setStages] = useState(new Array(0));
  const [sources, setSources] = useState(new Array(0));
  const [campaigns, setCampaigns] = useState(new Array(0));
  const [budgets, setBudgets] = useState(new Array(0));
  const [interests, setInterests] = useState(new Array(0));

  const [selectedInterests, setSelectedInterests] = useState(
    retrieveValues(interests, recordData?.interests)
  );

  const [currentStage, setCurrenStage] = useState(stages[0]);
  const [currentSubStage, setCurrenSubStage] = useState(stages[0]);

  const handleDataUpdate = () => {
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
    // get sources
    fetchDataByModel('source').then((result) => {
      setSources(result?.records);
    });
    // get campaigns
    fetchDataByModel('campaign').then((result) => {
      setCampaigns(result?.records);
    });
    // get budgets
    fetchDataByModel('budget').then((result) => {
      setBudgets(result?.records);
    });
    // get stages
    fetchDataByModel(
      'stage',
      [
        'id',
        'name',
        'sequence',
        'description',
        'actionName',
        'actionTypeId',
        'color',
        'children',
      ],
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
      // order children by sequence
      result?.records.map((stage: any) => {
        if (stage.children) {
          stage.children.sort((a: any, b: any) => a.sequence - b.sequence);
        }
        return 0;
      });

      setStages(result?.records);
      if (data?.stage?.id) {
        // set current stage and substage
        const stageIndex = result?.records.findIndex(
          (stage: any) => stage.id === data?.stage?.id
        );
        setCurrenStage(result?.records[stageIndex]);
        setCurrenSubStage(
          result?.records[stageIndex]?.children
            ? result?.records[stageIndex].children[
                result?.records[stageIndex].children.findIndex(
                  (child: any) => child.id === data?.subStage?.id
                )
              ]
            : undefined
        );
      }
    });
    // get interests
    fetchDataByModel('interest').then((result) => {
      setInterests(result?.records);
      setSelectedInterests(retrieveValues(result?.records, data?.interests));
    });
    // fill contact with the appropriate model (organization or individual) before saving
    if (data?.organization) setSelectedContact(data?.organization);
    if (data?.individual) setSelectedContact(data?.individual);
    // fill sales team with the appropriate value
    if (data?.user) setSalesTeam(data?.user?.salesTeam?.name);
    // Check if data is valid and id is available
    if (data && id) {
      setInitialData(data);
      setRecordData(data);
    }
  };

  useEffect(() => {
    handleDataUpdate();
    // Update breadcrumb
    if (data?.name && breadcrumbs.length === 1) {
      breadcrumbs.push({
        name: data.name,
        path: `/pipeline/opportunity/${id}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id]);

  const handleCurrentStage = (offset: number) => {
    if (currentStage.children && currentSubStage) {
      if (currentSubStage?.sequence < currentStage.children?.length) {
        const updatedStage = currentStage.children[
          currentStage.children.findIndex(
            (stage: any) => stage.id === currentSubStage.id
          ) + offset
        ];
        setCurrenSubStage(updatedStage);
        // update logs
        createRecord({
          modelName: 'Log',
          data: {
            stageFromValue: currentSubStage?.name,
            stageFromColor: currentSubStage?.color,
            stageToValue: updatedStage?.name,
            stageToColor: updatedStage?.color,
            userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
            modelName: "Opportunity",
            recordId: parseInt(id || '0'),
          },
        });
      } else {
        const updatedStage =
          stages[
            stages.findIndex((stage) => stage.id === currentStage.id) + offset
          ];
        setCurrenStage(updatedStage);
        setCurrenSubStage(
          updatedStage.children ? updatedStage.children[0] : undefined
        );
        // update logs
        createRecord({
          modelName: 'Log',
          data: {
            stageFromValue: currentStage?.name,
            stageFromColor: currentStage?.color,
            stageToValue: updatedStage?.name,
            stageToColor: updatedStage?.color,
            userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
            modelName: "Opportunity",
            recordId: parseInt(id || '0'),
          },
        });
      }
    } else {
      const updatedStage = stages[stages.findIndex((stage) => stage.id === currentStage.id)+1];
      setCurrenStage(updatedStage);
      // update logs
      createRecord({
        modelName: 'Log',
        data: {
          stageFromValue: currentStage?.name,
          stageFromColor: currentStage?.color,
          stageToValue: updatedStage?.name,
          stageToColor: updatedStage?.color,
          userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
          modelName: "Opportunity",
          recordId: parseInt(id || '0'),
        },
      });
    }
  };

  const getUpdatedStage = (offset: number) => {
    if (currentStage.children && currentSubStage)
      if (currentSubStage?.sequence < currentStage.children?.length)
        return stages[
          stages.findIndex((stage) => stage.id === currentStage.id)
        ];
      else
        return stages[
          stages.findIndex((stage) => stage.id === currentStage.id) + offset
        ];
    return stages[
      stages.findIndex((stage) => stage.id === currentStage.id) + offset
    ];
  };

  const getUpdatedSubStage = (offset: number) => {
    if (currentSubStage?.sequence < currentStage.children?.length)
      return currentStage.children[
        currentStage.children.findIndex(
          (stage: any) => stage.id === currentSubStage.id
        ) + offset
      ];
    const updatedStage =
      stages[
        stages.findIndex((stage) => stage.id === currentStage.id) + offset
      ];
    return updatedStage.children ? updatedStage.children[0] : undefined;
  };

  const openQuoteGenerationModal = () => {
    // replace later by search for the actionType Name by id(actionTypeId)
    // if it's a Quote Generation then generate new quote
    if (
      currentSubStage?.actionTypeId === 1 ||
      currentStage?.actionTypeId === 1
    ) {
      setOpenModal(!openModal);
      return true;
    }
    return false;
  };
  const handleQuoteGeneration = async (offset: number) => {
    try {
      // Call the mutate function to update the record
      handleCurrentStage(offset);
      // retreive the new stage to use in the update function
      const newStage = getUpdatedStage(offset);
      const newSubStage = getUpdatedSubStage(offset);
      setCurrenStage(newStage);
      setCurrenSubStage(newSubStage);
      let updates = {};
      if (newStage)
        updates = {
          ...updates,
          stageId: newStage.id,
        };
      if (newSubStage) {
        updates = {
          ...updates,
          subStageId: newSubStage.id,
        };
        setToastData({
          title: `Opportunity is now at ${newSubStage?.name} stage`,
          type: 'info',
        });
      } else {
        updates = {
          ...updates,
          subStageId: null,
        };
        setToastData({
          title: `Opportunity is now at ${newStage?.name} stage`,
          type: 'info',
        });
      }
      await updateRecord.mutateAsync({
        modelName: 'Opportunity', // Model name
        recordId: recordData.id, // Record ID
        updates, // Update data
      });
      setOpenToast(!openToast);
      setInitialData(recordData);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleUpdateStage = async (offset: number) => {
    // verify if the action is Quote Generation
    if (openQuoteGenerationModal()) return true;
    try {
      // Call the mutate function to update the record
      handleCurrentStage(offset);
      // retreive the new stage to use in the update function
      const newStage = getUpdatedStage(offset);
      const newSubStage = getUpdatedSubStage(offset);
      setCurrenStage(newStage);
      setCurrenSubStage(newSubStage);
      let updates = {};
      if (newStage)
        updates = {
          ...updates,
          stageId: newStage.id,
        };
      if (newSubStage) {
        updates = {
          ...updates,
          subStageId: newSubStage.id,
        };
        setToastData({
          title: `Opportunity is now at ${newSubStage?.name} stage`,
          type: 'info',
        });
      } else {
        updates = {
          ...updates,
          subStageId: null,
        };
        setToastData({
          title: `Opportunity is now at ${newStage?.name} stage`,
          type: 'info',
        });
      }
      await updateRecord.mutateAsync({
        modelName: 'Opportunity', // Model name
        recordId: recordData.id, // Record ID
        updates, // Update data
      });
      setOpenToast(!openToast);
      setInitialData(recordData);
    } catch (error) {
      console.error('Error updating record:', error);
    }
    return true;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState<any[]>([
    {
      id: 'name',
      name: 'Name',
      sequence: 1,
    },
    {
      id: 'totalAmount',
      name: 'Total Amount',
      sequence: 2,
    },
    {
      id: 'createdAt',
      name: 'Created Date',
      sequence: 3,
    },
    {
      id: 'validityPeriod',
      name: 'Validity Period',
      sequence: 4,
    },
    {
      id: 'stage',
      name: 'Stage',
      sequence: 6,
    },
  ]);
  const [optionalColumns] = useState([
    {
      id: 'expiredAt',
      name: 'Expired Date',
      sequence: 5,
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

  return (
    <Container>
          <ControlPanel>
            <Breadcrumb items={breadcrumbs} />
            <div className="flex items-center space-x-4">
              {!editable && (
                <>
                  <PrimaryButton onClick={() => setEditable(!editable)}>
                    <PencilSquareIcon width={20} height={20} />
                    <span>Edit</span>
                  </PrimaryButton>
                  <SecondaryButton>
                    <PrinterIcon width={20} height={20} />
                  </SecondaryButton>
                </>
              )}
              {editable && (
                <>
                  <PrimaryButton onClick={() => handleUpdate()}>
                    <CheckCircleIcon width={20} height={20} />
                    <span>Save</span>
                  </PrimaryButton>
                  <SecondaryButton onClick={() => handleOpenDialog()}>
                    <XCircleIcon width={20} height={20} />
                    <span>Discard</span>
                  </SecondaryButton>
                </>
              )}
            </div>
          </ControlPanel>
          {stages.length && (
            <Card>
              <Stepper
                items={stages}
                currentStep={currentStage}
                currentSubStep={currentSubStage}
                next={handleUpdateStage}
                enabled={!editable}
              />
            </Card>
          )}
          {openToast && <Toast title={toastData.title} type={toastData.type} />}
          {openDialog && (
            <Dialog
              title="Confirmation"
              message="Are you sure you want to exit? There are unsaved changes that may be lost."
              open={openDialog}
              discardButton="No"
              confirmButton="Yes"
              onDiscard={() => setOpenDialog(!openDialog)}
              onConfirm={() => handleDiscard()}
            />
          )}
          {openModal && (
            <QuoteModal
              data={recordData}
              open={openModal}
              onSave={() => handleQuoteGeneration(1)}
            />
          )}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-4 col-span-1">
                {recordData?.individual && (
                  <IndividualCard individual={recordData?.individual} />
                )}
                {recordData?.organization && (
                  <OrganizationCard organization={recordData?.organization} />
                )}
                <Card>
                  <Tab
                    values={['Notes', 'Tasks', 'Documents', 'Logs']}
                    activeIndex={activeIndex}
                    handleClick={setActiveIndex}
                  >
                    <TabPanel activeIndex={activeIndex} index={0}>
                      <NotePanel modelName="Opportunity" recordId={data.id} />
                    </TabPanel>
                    <TabPanel activeIndex={activeIndex} index={1}>
                      <TaskPanel
                        modelName="Opportunity"
                        recordId={data.id}
                        recordName={data.name}
                      />
                    </TabPanel>
                    <TabPanel activeIndex={activeIndex} index={2}>
                      <DocumentPanel
                        modelName="Opportunity"
                        recordId={data.id}
                        recordTitle={data.name}
                        parentFolders={
                          [
                            'Contacts', 
                            selectedContact.type === 'individual' ? 'Individuals' : 'Organizations', 
                            selectedContact.name, 
                            'Opportunities', 
                            data.name
                          ]}
                      />
                    </TabPanel>
                    <TabPanel activeIndex={activeIndex} index={3}>
                      <LogPanel modelName="Opportunity" recordId={data.id} />
                    </TabPanel>
                  </Tab>
                </Card>
              </div>
              <div className="col-span-2 space-y-4">
                <Card>
                  <div className="space-y-4">
                    <h1>Opportunity Information</h1>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <Input
                          disabled={!editable}
                          label="Name"
                          name="name"
                          value={recordData?.name}
                          handleChange={handleInputChange}
                          required={opportunityFields.name.required}
                        />
                      </div>
                      <div className="col-span-1">
                        <Select
                          disabled={!editable}
                          label="Acquisition Channel"
                          items={channels}
                          value={
                            channels.filter((item) => {
                              return item.id === recordData?.channel?.id;
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
                          disabled
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
                            <IconButton
                              disabled={!editable}
                              customClass="opacity-100"
                              onClick={() =>
                                handlePriorityChange('priority', 0)
                              }
                            >
                              <StarIcon
                                width={16}
                                height={16}
                                className="stroke-yellow-300 fill-yellow-300"
                              />
                            </IconButton>
                            <IconButton
                              disabled={!editable}
                              customClass="opacity-100"
                              onClick={() =>
                                handlePriorityChange('priority', 1)
                              }
                            >
                              <StarIcon
                                width={16}
                                height={16}
                                className={`${
                                  priorities.indexOf(recordData?.priority) !== 0
                                    ? 'stroke-yellow-300 fill-yellow-300'
                                    : 'stroke-gray-500'
                                }`}
                              />
                            </IconButton>
                            <IconButton
                              disabled={!editable}
                              customClass="opacity-100"
                              onClick={() =>
                                handlePriorityChange('priority', 2)
                              }
                            >
                              <StarIcon
                                width={16}
                                height={16}
                                className={`${
                                  priorities.indexOf(recordData?.priority) === 2
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
                          disabled={!editable}
                          label="Salesperson"
                          items={users}
                          value={
                            users.filter((item) => {
                              return item.id === recordData?.user?.id;
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
                          handleChange={handleInputChange}
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          disabled={!editable}
                          label="Expected Closing"
                          name="expectedClosing"
                          value={recordData?.expectedClosing}
                          type="date"
                          handleChange={handleInputChange}
                          required={opportunityFields.expectedClosing.required}
                        />
                      </div>
                      <div className="col-span-1">
                        <Select
                          disabled={!editable}
                          label="Probability"
                          items={probabilities}
                          value={
                            probabilities.filter((item) => {
                              return item.id === recordData?.probability?.id;
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
                          disabled={!editable}
                          label="Expected Revenue"
                          name="expectedRevenue"
                          value={recordData?.expectedRevenue}
                          handleChange={handleInputChange}
                          required={opportunityFields.expectedRevenue.required}
                        />
                      </div>
                    </div>
                    <h1>Additionnal Information</h1>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <Select
                          disabled={!editable}
                          label="Referral Source"
                          items={sources}
                          value={
                            sources.filter((item) => {
                              return item.id === recordData?.source?.id;
                            })[0]
                          }
                          handleChange={(item: any) =>
                            handleSelectChange(item, 'source')
                          }
                          required={opportunityFields.source.required}
                        />
                      </div>
                      <div className="col-span-2">
                        <MultiSelect
                          disabled={!editable}
                          colorful
                          label="Interests"
                          items={interests}
                          values={selectedInterests}
                          handleChange={() =>
                            handleMultiSelectChange(
                              selectedInterests,
                              'interests'
                            )
                          }
                        />
                      </div>
                      <div className="col-span-1">
                        <Select
                          disabled={!editable}
                          label="Budget"
                          items={budgets}
                          value={
                            budgets.filter((item) => {
                              return item.id === recordData?.budget?.id;
                            })[0]
                          }
                          handleChange={(item: any) =>
                            handleSelectChange(item, 'budget')
                          }
                          required={opportunityFields.budget.required}
                        />
                      </div>
                      <div className="col-span-1">
                        <Select
                          disabled={!editable}
                          label="Campaign"
                          items={campaigns}
                          value={
                            campaigns.filter((item) => {
                              return item.id === recordData?.campaign?.id;
                            })[0]
                          }
                          handleChange={(item: any) =>
                            handleSelectChange(item, 'campaign')
                          }
                          required={opportunityFields.campaign.required}
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          disabled={!editable}
                          label="Decision Maker"
                          name="decisionMaker"
                          value={recordData?.decisionMaker}
                          handleChange={handleInputChange}
                          required={opportunityFields.decisionMaker.required}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="space-y-2">
                    <h1>Quotes</h1>
                    <Table
                      columns={columns}
                      optionalColumns={optionalColumns}
                      handleColumnChange={toggleColumnVisibility}
                    >
                      {data?.quotes?.map((quote: any, index: number) => (
                        <tr
                          className={`group hover:bg-serene-50 ${
                            index + 1 !== data?.quotes?.length &&
                            'border-b border-b-gray-200'
                          }`}
                          key={quote.id}
                        >
                          <td className="py-4 px-6">
                            {index + 1 + (currentPage - 1) * 5}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div>{quote.name}</div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div>$ {quote.totalAmount}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              {quote.createdAt &&
                                new Date(quote.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          {visibleColumns.includes('validityPeriod') && (
                            <td className="py-4 px-6">
                              <div>{quote.validityPeriod} days</div>
                            </td>
                          )}
                          {visibleColumns.includes('expiredAt') && (
                            <td className="py-4 px-6 whitespace-nowrap">
                              <div>
                                {quote.expiredAt &&
                                  new Date(
                                    quote.expiredAt
                                  ).toLocaleDateString()}
                              </div>
                            </td>
                          )}
                          <td className="py-4 px-6 whitespace-nowrap">
                            <Badge
                              value={quote.stage?.name}
                              color={quote.stage?.color}
                            />
                          </td>
                          <td />
                        </tr>
                      ))}
                    </Table>
                    <Paginator
                      itemsPerPage={5}
                      totalItems={data?.quotes?.length}
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </Card>
              </div>
            </div>
          )}
        </Container>
  );
}
