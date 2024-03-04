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
import TextArea from '../../components/form/TextArea';
import { departmentFields } from '../../features/employee/data/fields';
import EmployeeCard from '../../features/employee/components/EmployeeCard';
import NotePanel from '../../features/note/components/NotePanel';
import TaskPanel from '../../features/task/components/TaskPanel';
import DocumentPanel from '../../features/documents/components/DocumentPanel';
import EmployeeList from '../../features/employee/components/EmployeeList';
import LogPanel from '../../features/log/components/LogPanel';

export default function DepartmentDetails() {
  const [open, setOpen] = useState(localStorage.getItem('open') === 'true');
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
        name: 'Departments',
        path: '/employees/departments',
      },
    ],
    []
  );
  const filterData: SearchRequest = {
    modelName: 'Department',
    recordId: id || '',
    selectFields: [
      'id',
      'name',
      'description',
      'head.id',
      'head.img',
      'head.name',
      'head.email',
      'head.phone',
      'head.mobile',
      'head.jobTitle',
      'head.status',
      'employees.id',
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
        (value && departmentFields[name].required) ||
        !departmentFields[name].required
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
        (item.id && departmentFields[name].required) ||
        !departmentFields[name].required
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

  const handleUpdate = async () => {
    // Check if all required fields are filled
    const requiredFields = Object.keys(departmentFields).filter(
      (fieldName) => departmentFields[fieldName].required
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
    let updatedRecordData: any = {
      ...updatedFields,
    };
    if (Object.keys(updatedFields).length !== 0) {
      // convert birthdate to datetime
      if (updatedRecordData.birthdate)
        updatedRecordData = {
          ...updatedFields,
          birthdate: new Date(recordData.birthdate),
        };
      // convert joiningDate to datetime
      if (updatedRecordData.joiningDate)
        updatedRecordData = {
          ...updatedFields,
          joiningDate: new Date(recordData.joiningDate),
        };
      try {
        // Call the mutate function to update the record
        await updateRecord.mutateAsync({
          modelName: 'Department', // Model name
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
        getAndUpdateDashboardItems('Department');
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

  const [heads, setHeads] = useState(new Array(0));

  const handleDataUpdate = () => {
    // get heads
    fetchDataByModel('Employee').then((result) => {
      setHeads(result?.records);
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
        path: `/employees/departments/${id}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id]);

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
              {data?.head && (
                <EmployeeCard employee={data.head} editable={false} />
              )}
              <Card>
                <Tab
                  values={['Notes', 'Tasks', 'Documents', 'Logs']}
                  activeIndex={activeIndex}
                  handleClick={setActiveIndex}
                >
                  <TabPanel activeIndex={activeIndex} index={0}>
                    <NotePanel modelName="Department" recordId={data.id} />
                  </TabPanel>
                  <TabPanel activeIndex={activeIndex} index={1}>
                    <TaskPanel
                      modelName="Department"
                      recordId={data.id}
                      recordName={data.name}
                    />
                  </TabPanel>
                  <TabPanel activeIndex={activeIndex} index={2}>
                    <DocumentPanel
                      modelName="Department"
                      recordId={data.id}
                      recordTitle={data.name}
                    />
                  </TabPanel>
                  <TabPanel activeIndex={activeIndex} index={3}>
                    <LogPanel modelName="Department" recordId={data.id} />
                  </TabPanel>
                </Tab>
              </Card>
            </div>
            <div className="col-span-2 space-y-4">
              <Card>
                <div className="space-y-4">
                  <h1>Department Informations</h1>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Input
                        disabled={!editable}
                        label="Name"
                        name="name"
                        value={recordData?.name}
                        handleChange={handleInputChange}
                        required={departmentFields.name.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Select
                        disabled={!editable}
                        label="Head"
                        items={heads}
                        value={
                          heads.filter((item) => {
                            return item.id === recordData?.head?.id;
                          })[0]
                        }
                        handleChange={(item: any) =>
                          handleSelectChange(item, 'head')
                        }
                        required={departmentFields.head.required}
                        hasAvatars
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        disabled
                        label="Number of Employees"
                        value={recordData?.employees.length}
                        handleChange={() => null}
                      />
                    </div>
                    <div className="col-span-3">
                      <TextArea
                        disabled={!editable}
                        label="Description"
                        name="description"
                        value={recordData?.description}
                        handleChange={handleInputChange}
                        required={departmentFields.description.required}
                      />
                    </div>
                  </div>
                </div>
              </Card>
              {recordData && (
                <Card>
                  <EmployeeList departmentId={recordData.id} />
                </Card>
              )}
            </div>
          </div>
        )}
      </Container>
  );
}
