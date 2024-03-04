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
import { employeeFields } from '../../features/employee/data/fields';
import EmployeeCard from '../../features/employee/components/EmployeeCard';
import NotePanel from '../../features/note/components/NotePanel';
import TaskPanel from '../../features/task/components/TaskPanel';
import DocumentPanel from '../../features/documents/components/DocumentPanel';
import { ContractTypes } from '../../constants/setting-constants';
import QualificationList from '../../features/employee/components/QualificationList';
import ExperienceList from '../../features/employee/components/ExperienceList';
import EmergencyList from '../../features/employee/components/EmergencyList';
import LogPanel from '../../features/log/components/LogPanel';

export default function EmployeeDetails() {
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
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { id } = useParams();
  const breadcrumbs = useMemo(
    () => [
      {
        name: 'Employees',
        path: '/employees/profiles',
      },
    ],
    []
  );
  const filterData: SearchRequest = {
    modelName: 'Employee',
    recordId: id || '',
    selectFields: [
      'id',
      'name',
      'img',
      'birthdate',
      'employmentType',
      'joiningDate',
      'email',
      'phone',
      'mobile',
      'street',
      'zipCode',
      'city',
      'province',
      'country',
      'gender.id',
      'gender.name',
      'jobTitle.id',
      'jobTitle.name',
      'department.id',
      'department.name',
      'parent.id',
      'parent.img',
      'parent.name',
      'status',
      'leaves.id',
      'reviewsOfEmployee.id',
      'contracts.id',
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
        (value && employeeFields[name].required) ||
        !employeeFields[name].required
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
        (item.id && employeeFields[name].required) ||
        !employeeFields[name].required
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

  const handleSelectEnumChange = (item: any, name: string) => {
    setRecordData({
      ...recordData,
      [name]: item.id,
    });
    if (item.id !== initialData[name]) {
      // check if the input is filled and required or the field is not required, in this case update changes
      if (
        (item.id && employeeFields[name].required) ||
        !employeeFields[name].required
      ) {
        setUpdatedFields({
          ...updatedFields,
          [name]: item.id,
        });
      }
    }
  };

  const queryKey = 'searchData';
  const updateRecord = useUpdateRecord(queryKey); // Use the custom hook

  const handleUpdate = async () => {
    // Check if all required fields are filled
    const requiredFields = Object.keys(employeeFields).filter(
      (fieldName) => employeeFields[fieldName].required
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
          modelName: 'Employee', // Model name
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
        getAndUpdateDashboardItems('Employee');
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

  const [genders, setGenders] = useState(new Array(0));
  const [jobTitles, setJobTitles] = useState(new Array(0));
  const [departments, setDepartments] = useState(new Array(0));
  const [supervisors, setSupervisors] = useState(new Array(0));
  const [countries, setCountries] = useState(new Array(0));

  const handleDataUpdate = () => {
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
    // get countries
    fetchDataByModel('Country').then((result) => {
      setCountries(result?.records);
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
        path: `/employees/profiles/${id}`,
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
              <EmployeeCard employee={data} editable={editable} />
              <Card>
                <Tab
                  values={['Notes', 'Tasks', 'Documents', 'Logs']}
                  activeIndex={activeIndex}
                  handleClick={setActiveIndex}
                >
                  <TabPanel activeIndex={activeIndex} index={0}>
                    <NotePanel modelName="Employee" recordId={data.id} />
                  </TabPanel>
                  <TabPanel activeIndex={activeIndex} index={1}>
                    <TaskPanel
                      modelName="Employee"
                      recordId={data.id}
                      recordName={data.name}
                    />
                  </TabPanel>
                  <TabPanel activeIndex={activeIndex} index={2}>
                    <DocumentPanel
                      modelName="Employee"
                      recordId={data.id}
                      recordTitle={data.name}
                    />
                  </TabPanel>
                  <TabPanel activeIndex={activeIndex} index={3}>
                    <LogPanel modelName="Employee" recordId={data.id} />
                  </TabPanel>
                </Tab>
              </Card>
            </div>
            <div className="col-span-2 space-y-4">
              <Card>
                <div className="space-y-4">
                  <h1>Personal Details</h1>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Input
                        disabled={!editable}
                        label="Name"
                        name="name"
                        value={recordData?.name}
                        handleChange={handleInputChange}
                        required={employeeFields.name.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        type="date"
                        disabled={!editable}
                        label="Date of Birth"
                        name="birthdate"
                        value={
                          recordData?.birthdate &&
                          new Date(recordData?.birthdate)
                            .toISOString()
                            .split('T')[0]
                        }
                        handleChange={handleInputChange}
                        required={employeeFields.birthdate.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Select
                        disabled={!editable}
                        label="Gender"
                        items={genders}
                        value={
                          genders.filter((item) => {
                            return item.id === recordData?.gender?.id;
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
                        disabled={!editable}
                        label="Email"
                        name="email"
                        value={recordData?.email}
                        handleChange={handleInputChange}
                        required={employeeFields.email.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        disabled={!editable}
                        label="Phone"
                        name="phone"
                        value={recordData?.phone}
                        handleChange={handleInputChange}
                        required={employeeFields.phone.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        disabled={!editable}
                        label="Mobile"
                        name="mobile"
                        value={recordData?.mobile}
                        handleChange={handleInputChange}
                        required={employeeFields.mobile.required}
                      />
                    </div>
                  </div>
                  <h1>Employment Details</h1>
                  <div className="grid grid-cols-3 gap-4">
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
                        required={employeeFields.jobTitle.required}
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
                        required={employeeFields.department.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Select
                        disabled={!editable}
                        label="Supervisor"
                        items={supervisors}
                        value={
                          supervisors.filter((item) => {
                            return item.id === recordData?.parent?.id;
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
                        disabled={!editable}
                        label="Type"
                        items={ContractTypes}
                        value={
                          ContractTypes.filter((item) => {
                            return item.id === recordData?.employmentType;
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
                        type="date"
                        disabled={!editable}
                        label="Joining Date"
                        name="joiningDate"
                        value={
                          recordData?.joiningDate &&
                          new Date(recordData?.joiningDate)
                            .toISOString()
                            .split('T')[0]
                        }
                        handleChange={handleInputChange}
                        required={employeeFields.joiningDate.required}
                      />
                    </div>
                  </div>
                  <h1>Address Information</h1>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Input
                        disabled={!editable}
                        label="Street"
                        name="street"
                        value={recordData?.street}
                        handleChange={handleInputChange}
                        required={employeeFields.street.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        disabled={!editable}
                        label="Zip Code"
                        name="zipCode"
                        value={recordData?.zipCode}
                        handleChange={handleInputChange}
                        required={employeeFields.zipCode.required}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Input
                        disabled={!editable}
                        label="City"
                        name="city"
                        value={recordData?.city}
                        handleChange={handleInputChange}
                        required={employeeFields.city.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        disabled={!editable}
                        label="Province"
                        name="province"
                        value={recordData?.province}
                        handleChange={handleInputChange}
                        required={employeeFields.province.required}
                      />
                    </div>
                    <div className="col-span-1">
                      <Select
                        disabled={!editable}
                        label="Country"
                        items={countries}
                        value={
                          countries.filter((item) => {
                            return item.id === recordData?.country?.id;
                          })[0]
                        }
                        handleChange={(item: any) =>
                          handleSelectChange(item, 'country')
                        }
                        required={employeeFields.country.required}
                      />
                    </div>
                  </div>
                </div>
              </Card>
              {recordData && (
                <Card>
                  <Tab
                    values={[
                      'Qualifications',
                      'Experiences',
                      'Emergency Contacts',
                    ]}
                    activeIndex={activeTabIndex}
                    handleClick={setActiveTabIndex}
                  >
                    <TabPanel activeIndex={activeTabIndex} index={0}>
                      <QualificationList
                        employeeId={recordData.id}
                        editable={editable}
                      />
                    </TabPanel>
                    <TabPanel activeIndex={activeTabIndex} index={1}>
                      <ExperienceList
                        employeeId={recordData.id}
                        editable={editable}
                        config={{ jobTitles }}
                      />
                    </TabPanel>
                    <TabPanel activeIndex={activeTabIndex} index={2}>
                      <EmergencyList
                        employeeId={recordData.id}
                        editable={editable}
                      />
                    </TabPanel>
                  </Tab>
                </Card>
              )}
            </div>
          </div>
        )}
      </Container>
  );
}
