import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  PrinterIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useLocation, useParams } from 'react-router-dom';
import Container from '../../layout/Container';
import ControlPanel from '../../layout/ControlPanel';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import { Tab, TabPanel } from '../../components/ui/Tab';
import Breadcrumb from '../../components/ui/Breadcrumb';
import useSearchData from '../../hooks/useSearchData';
import { SearchRequest } from '../../interfaces/search-request.interface';
import useUpdateRecord from '../../hooks/useUpdateRecord';
import Toast from '../../components/ui/Toast';
import Dialog from '../../components/ui/Dialog';
import fetchDataByModel from '../../utils/fetch';
import { getAndUpdateDashboardItems } from '../../services/dashboard-items.service';
import Stepper from '../../components/ui/Stepper';
import TextArea from '../../components/form/TextArea';
import NotePanel from '../../features/note/components/NotePanel';
import TaskPanel from '../../features/task/components/TaskPanel';
import DocumentPanel from '../../features/documents/components/DocumentPanel';
import LogPanel from '../../features/log/components/LogPanel';
import EmployeeCard from '../../features/employee/components/EmployeeCard';
import useCreateRecord from '../../hooks/useCreateRecord';
import { offboardingFields } from '../../data/lifecycle/fields';

export default function OffboardingDetails() {
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
        name: 'Offboarding',
        path: '/lifecycle/offboarding',
      },
    ],
    []
  );
  const filterData: SearchRequest = {
    modelName: 'Offboarding',
    recordId: id || '',
    selectFields: [
      'id',
      'name',
      'employee.id',
      'employee.img',
      'employee.name',
      'employee.email',
      'employee.phone',
      'employee.mobile',
      'employee.department.name',
      'employee.jobTitle.name',
      'employee.status.name',
      'employee.status.color',
      'department.id',
      'department.name',
      'jobTitle.id',
      'jobTitle.name',
      'startDate',
      'endDate',
      'description',
      'stage',
      'subStage',
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
        (value && offboardingFields[name].required) ||
        !offboardingFields[name].required
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
        (item.id && offboardingFields[name].required) ||
        !offboardingFields[name].required
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

  const queryKey = 'searchData';
  const updateRecord = useUpdateRecord(queryKey); // Use the custom hook
  const { createRecord } = useCreateRecord(queryKey);

  const handleUpdate = async () => {
    // Check if all required fields are filled
    const requiredFields = Object.keys(offboardingFields).filter(
      (fieldName) => offboardingFields[fieldName].required
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
        // cast dates & float fields before saving
        const updatedRecordData: any = {
          ...updatedFields,
          startDate: recordData.startDate
            ? new Date(recordData.startDate)
            : undefined,
          endDate: recordData.endDate
            ? new Date(recordData.endDate)
            : undefined,
          salaryAmount: recordData.salaryAmount
            ? parseFloat(recordData.salaryAmount)
            : undefined,
          bonuseAmount: recordData.bonuseAmount
            ? parseFloat(recordData.bonuseAmount)
            : undefined,
          deductionAmount: recordData.deductionAmount
            ? parseFloat(recordData.deductionAmount)
            : undefined,
        };
        // Call the mutate function to update the record
        await updateRecord.mutateAsync({
          modelName: 'Offboarding', // Model name
          recordId: recordData.id, // Record ID
          updates: updatedRecordData, // Update data
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
        // get dashboards by modelName & update them
        getAndUpdateDashboardItems('Offboarding');
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

  const [employees, setEmployees] = useState(new Array(0));
  const [jobTitles, setJobTitles] = useState(new Array(0));
  const [departments, setDepartments] = useState(new Array(0));
  const [stages, setStages] = useState(new Array(0));
  const [currentStage, setCurrenStage] = useState(stages[0]);
  const [currentSubStage, setCurrenSubStage] = useState(stages[0]);

  const handleDataUpdate = () => {
    // get employees
    fetchDataByModel('Employee', [
      'id',
      'name',
      'department.id',
      'jobTitle.id',
    ]).then((result) => {
      setEmployees(result?.records);
    });
    // get job titles
    fetchDataByModel('JobTitle').then((result) => {
      setJobTitles(result?.records);
    });
    // get departments
    fetchDataByModel('Department').then((result) => {
      setDepartments(result?.records);
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
              values: 'Offboarding',
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
        path: `/lifecycle/offboarding/${id}`,
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
            modelName: "Offboarding",
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
            modelName: "Offboarding",
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
          modelName: "Offboarding",
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

  const handleUpdateStage = async (offset: number) => {
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
          title: `Offboarding is now at ${newSubStage?.name} stage`,
          type: 'info',
        });
      } else {
        updates = {
          ...updates,
          subStageId: null,
        };
        setToastData({
          title: `Offboarding is now at ${newStage?.name} stage`,
          type: 'info',
        });
      }
      await updateRecord.mutateAsync({
        modelName: 'Offboarding', // Model name
        recordId: recordData.id, // Record ID
        updates, // Update data
      });
      setOpenToast(!openToast);
      setInitialData(recordData);
      // get dashboards by modelName & update them
      getAndUpdateDashboardItems('Offboarding');
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

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
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-4 col-span-1">
              <EmployeeCard employee={data?.employee} editable={false} />
              <Card>
                <Tab
                  values={['Notes', 'Tasks', 'Documents', 'Logs']}
                  activeIndex={activeIndex}
                  handleClick={setActiveIndex}
                >
                  <TabPanel activeIndex={activeIndex} index={0}>
                    <NotePanel modelName="Offboarding" recordId={data.id} />
                  </TabPanel>
                  <TabPanel activeIndex={activeIndex} index={1}>
                    <TaskPanel
                      modelName="Offboarding"
                      recordId={data.id}
                      recordName={data.name}
                    />
                  </TabPanel>
                  <TabPanel activeIndex={activeIndex} index={2}>
                    <DocumentPanel
                      modelName="Offboarding"
                      recordId={data.id}
                      recordTitle={data.name}
                    />
                  </TabPanel>
                  <TabPanel activeIndex={activeIndex} index={3}>
                    <LogPanel modelName="Offboarding" recordId={data.id} />
                  </TabPanel>
                </Tab>
              </Card>
            </div>
            <div className="col-span-2 space-y-4">
              <Card>
                <div className="space-y-4">
                  <h1>Process Informations</h1>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Input
                        disabled={!editable}
                        label="Name"
                        name="name"
                        value={recordData?.name}
                        handleChange={handleInputChange}
                        required={offboardingFields.name.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Select
                        disabled={!editable}
                        label="Employee"
                        items={employees}
                        value={
                          employees.filter((item) => {
                            return item.id === recordData?.employee?.id;
                          })[0]
                        }
                        handleChange={(item: any) =>
                          handleSelectChange(item, 'employee')
                        }
                        required={offboardingFields.employee.required}
                        hasAvatars
                      />
                    </div>
                    <div className="col-span-1">
                      <Select
                        disabled={!editable}
                        label="Job Title"
                        items={jobTitles}
                        value={
                          jobTitles.filter((item) => {
                            return item.id === recordData?.jobTitle?.id;
                          })[0]
                        }
                        handleChange={(item: any) =>
                          handleSelectChange(item, 'jobTitle')
                        }
                        required={offboardingFields.jobTitle.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Select
                        disabled={!editable}
                        label="Department"
                        items={departments}
                        value={
                          departments.filter((item) => {
                            return item.id === recordData?.department?.id;
                          })[0]
                        }
                        handleChange={(item: any) =>
                          handleSelectChange(item, 'department')
                        }
                        required={offboardingFields.department.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        type="date"
                        disabled={!editable}
                        label="Start Date"
                        name="startDate"
                        value={
                          recordData?.startDate &&
                          new Date(recordData?.startDate)
                            .toISOString()
                            .split('T')[0]
                        }
                        handleChange={handleInputChange}
                        required={offboardingFields.startDate.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        type="date"
                        disabled={!editable}
                        label="End Date"
                        name="endDate"
                        value={
                          recordData?.endDate &&
                          new Date(recordData?.endDate)
                            .toISOString()
                            .split('T')[0]
                        }
                        handleChange={handleInputChange}
                        required={offboardingFields.endDate.required}
                      />
                    </div>
                    <div className="col-span-3">
                      <TextArea
                        disabled={!editable}
                        label="Description"
                        name="description"
                        value={recordData?.description}
                        handleChange={handleInputChange}
                        required={offboardingFields.description.required}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Container>
  );
}
