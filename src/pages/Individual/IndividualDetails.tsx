/* eslint-disable @typescript-eslint/no-shadow */
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
import MultiSelect from '../../components/form/MultiSelect';
import fetchDataByModel from '../../utils/fetch';
import NotePanel from '../../features/note/components/NotePanel';
import TaskPanel from '../../features/task/components/TaskPanel';
import DocumentPanel from '../../features/documents/components/DocumentPanel';
import LogPanel from '../../features/log/components/LogPanel';
import { individualFields } from '../../features/contact/data/fields';
import IndividualCard from '../../features/contact/components/IndividualCard';
import arraysEqual from '../../utils/array'
import { individualsDetails } from '../../sample/individuals';

export default function IndividualDetails() {
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
        name: 'Individuals',
        path: '/contact/individual',
      },
    ],
    []
  );
  const filterData: SearchRequest = {
    modelName: 'Individual',
    recordId: id || '',
    selectFields: [
      'id',
      'name',
      'img',
      'jobTitle',
      'organization.id',
      'organization.img',
      'organization.name',
      'email',
      'phone',
      'mobile',
      'street',
      'zipCode',
      'city',
      'province',
      'country',
      'source',
      'categories',
      'twitter',
      'linkedin',
      'facebook',
      'leads.id',
      'opportunities.id',
      'quotes.id',
    ],
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data, isLoading } = useSearchData(filterData);
  const data = individualsDetails.filter((item: any) => item.id === parseInt(id || '0'))[0];
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
        (value && individualFields[name].required) ||
        !individualFields[name].required
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
        (item.id && individualFields[name].required) ||
        !individualFields[name].required
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

  const handleUpdate = async () => {
    // Check if all required fields are filled
    const requiredFields = Object.keys(individualFields).filter(
      (fieldName) => individualFields[fieldName].required
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
        // Call the mutate function to update the record
        await updateRecord.mutateAsync({
          modelName: 'Individual', // Model name
          recordId: recordData.id, // Record ID
          updates: updatedFields, // Update data
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

  const [organizations, setOrganizations] = useState(new Array(0));
  const [countries, setCountries] = useState(new Array(0));
  const [sources, setSources] = useState(new Array(0));
  const [categories, setCategories] = useState(new Array(0));

  const [selectedCategories, setSelectedCategories] = useState(
    retrieveValues(categories, recordData?.categories)
  );

  const handleDataUpdate = () => {
    // get organizations
    fetchDataByModel('organization').then((result) => {
      setOrganizations(result?.records);
    });
    // get countries
    fetchDataByModel('country').then((result) => {
      setCountries(result?.records);
    });
    // get sources
    fetchDataByModel('source').then((result) => {
      setSources(result?.records);
    });
    // get categories
    fetchDataByModel('category').then((result) => {
      setCategories(result?.records);
      setSelectedCategories(retrieveValues(result?.records, data?.categories));
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
        path: `/contact/individual/${id}`,
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
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-4 col-span-1">
          <IndividualCard individual={data} editable={editable} />
          <Card>
            <Tab
              values={['Notes', 'Tasks', 'Documents', 'Logs']}
              activeIndex={activeIndex}
              handleClick={setActiveIndex}
            >
              <TabPanel activeIndex={activeIndex} index={0}>
                <NotePanel modelName="Individual" recordId={data.id} />
              </TabPanel>
              <TabPanel activeIndex={activeIndex} index={1}>
                <TaskPanel
                  modelName="Individual"
                  recordId={data.id}
                  recordName={data.name}
                />
              </TabPanel>
              <TabPanel activeIndex={activeIndex} index={2}>
                <DocumentPanel
                  modelName="Individual"
                  recordId={data.id}
                  recordTitle={data.name}
                  parentFolders={['Contacts', 'Individuals', data.name]}
                />
              </TabPanel>
              <TabPanel activeIndex={activeIndex} index={3}>
                <LogPanel modelName="Individual" recordId={data.id} />
              </TabPanel>
            </Tab>
          </Card>
        </div>
        <div className="col-span-2 space-y-4">
          <Card>
            <div className="space-y-4">
              <h1>Contact Information</h1>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Input
                    disabled={!editable}
                    label="Name"
                    name="name"
                    value={recordData?.name}
                    handleChange={handleInputChange}
                    required={individualFields.name.required}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    disabled={!editable}
                    label="Job Title"
                    name="jobTitle"
                    value={recordData?.jobTitle}
                    handleChange={handleInputChange}
                    required={individualFields.jobTitle.required}
                  />
                </div>
                <div className="col-span-1">
                  <Select
                    disabled={!editable}
                    label="Organization"
                    items={organizations}
                    value={
                      organizations.filter((item) => {
                        return item.id === recordData?.organization?.id;
                      })[0]
                    }
                    handleChange={(item: any) =>
                      handleSelectChange(item, 'organization')
                    }
                    required={individualFields.organization.required}
                    hasAvatars
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Input
                    disabled={!editable}
                    label="Email"
                    name="email"
                    value={recordData?.email}
                    handleChange={handleInputChange}
                    required={individualFields.email.required}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    disabled={!editable}
                    label="Phone"
                    name="phone"
                    value={recordData?.phone}
                    handleChange={handleInputChange}
                    required={individualFields.phone.required}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    disabled={!editable}
                    label="Mobile"
                    name="mobile"
                    value={recordData?.mobile}
                    handleChange={handleInputChange}
                    required={individualFields.mobile.required}
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
                    required={individualFields.street.required}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    disabled={!editable}
                    label="Zip Code"
                    name="zipCode"
                    value={recordData?.zipCode}
                    handleChange={handleInputChange}
                    required={individualFields.zipCode.required}
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
                    required={individualFields.city.required}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    disabled={!editable}
                    label="Province"
                    name="province"
                    value={recordData?.province}
                    handleChange={handleInputChange}
                    required={individualFields.province.required}
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
                    required={individualFields.country.required}
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
                    required={individualFields.source.required}
                  />
                </div>
                <div className="col-span-2">
                  <MultiSelect
                    disabled={!editable}
                    colorful
                    label="Categories"
                    items={categories}
                    values={selectedCategories}
                    handleChange={() =>
                      handleMultiSelectChange(
                        selectedCategories,
                        'categories'
                      )
                    }
                  />
                </div>
              </div>
              <h1>Social Media Information</h1>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Input
                    disabled={!editable}
                    label="Twitter"
                    name="twitter"
                    value={recordData?.twitter}
                    handleChange={handleInputChange}
                    required={individualFields.twitter.required}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    disabled={!editable}
                    label="Linkedin"
                    name="linkedin"
                    value={recordData?.linkedin}
                    handleChange={handleInputChange}
                    required={individualFields.linkedin.required}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    disabled={!editable}
                    label="Facebook"
                    name="facebook"
                    value={recordData?.facebook}
                    handleChange={handleInputChange}
                    required={individualFields.facebook.required}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
