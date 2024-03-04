/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import {
  ArrowDownTrayIcon,
  ArrowUpOnSquareStackIcon,
  DocumentArrowDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import Avatar from '../../../components/ui/Avatar';
import { IconButton, TertiaryButton } from '../../../components/ui/Button';
import { FilterRequest } from '../../../interfaces/filter-request.interface';
import useFilterData from '../../../hooks/useFetchData';
import {
  retrieveDay,
  retrieveMonth,
  retrieveYear,
} from '../../../utils/formatDate';
import Toast from '../../../components/ui/Toast';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/form/Input';
import Select from '../../../components/form/Select';
import useDeleteRecord from '../../../hooks/useDeleteRecord';
import Dialog from '../../../components/ui/Dialog';
import useUploadDocument from '../../../hooks/useUploadDocument';
import MultiSelect from '../../../components/form/MultiSelect';
import useCreateDocument from '../hooks/useCreateDocument';
import Badge from '../../../components/ui/Badge';
import API_BASE_URL from '../../../config';
import Checkbox from '../../../components/form/Checkbox';
import fetchDataByModel from '../../../utils/fetch';
import searchDocumentByName, { searchDocumentTypeByExtension } from '../services/search-document.service';

interface Props {
  modelName: string;
  recordId: any;
  recordTitle: string;
  parentFolders?: string[]
}

export default function DocumentPanel(props: Props) {
  const { modelName, recordId, recordTitle, parentFolders } = props;
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  // for document upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedUsers, setSelectedUsers] = useState(new Array(0));
  const [newDocument, setNewDocument] = useState({
    typeId: undefined,
    parentId: 0,
    name: '',
    extension: '',
    ownerId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
    modelName,
    recordId,
    users: {
      connect: [],
    },
  });
  const [showOnlyMine, setShowOnlyMine] = useState(false);

  const [users, setUsers] = useState(new Array(0));

  useEffect(() => {
    // get users
    fetchDataByModel('user', ['id', 'name', 'img']).then((result: any) => {
      setUsers(result?.records);
    });
  }, []);

  const filterData: FilterRequest = {
    modelName: 'Document',
    filters: [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'modelName',
            operator: 'equals',
            values: modelName,
          },
          {
            field: 'recordId',
            operator: 'equals',
            values: recordId,
          },
          {
            field: 'parentId',
            operator: 'not equals',
            values: null,
          },
          {
            field: 'typeId',
            operator: 'not equals',
            values: null,
          },
          {
            logicalOperator: 'OR',
            conditions: showOnlyMine
              ? [
                  {
                    field: 'ownerId',
                    operator: 'equals',
                    values: parseInt(
                      localStorage.getItem('loggedInUserId') || '',
                      10
                    ),
                  },
                  {
                    field: 'users.id',
                    operator: 'some',
                    values: parseInt(
                      localStorage.getItem('loggedInUserId') || '',
                      10
                    ),
                  },
                ]
              : [],
          },
        ],
      },
    ],
    selectFields: [
      'id',
      'name',
      'parentId',
      'path',
      'type',
      'createdDate',
      'owner',
      'users',
      'modelName',
      'recordId',
    ],
    sortField: 'createdDate',
    sortOrder: 'desc',
    page: 1,
    perPage: 1000,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  const { data, isLoading } = useFilterData(filterData);
  const queryKey = 'filterData';
  const { createRecord } = useCreateDocument(queryKey);
  const { deleteRecord } = useDeleteRecord(queryKey);

  const uploadDocument = useUploadDocument(queryKey); // Use the custom hook
  const handleUpload = async (id: number) => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        // Call the mutate function to upload the file
        await uploadDocument.mutateAsync({
          recordId: id, // Record ID
          file: formData,
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  const createFolder = async (folderName: string, parentId = undefined, modelName = '', recordId = undefined) => {
    const newFolder = await createRecord({
      name: folderName,
      parentId,
      modelName,
      recordId,
    });
    return newFolder;
  };
  
  const findFolderByName = async (folderName: string, parentId = null) => {
    return searchDocumentByName(folderName, parentId);
  };

  const getOrCreateFolder = async (folderName: string, parentId = undefined, modelName = '', recordId = undefined) => {
    const existingFolder = await findFolderByName(folderName, parentId);
    if (existingFolder.records.length > 0) {
      // If folder exists, return the first record
      return existingFolder.records[0];
    } else {
      // If folder doesn't exist, create it
      const newFolder = await createFolder(folderName, parentId, modelName, recordId);
      return newFolder;
    }
  };  

  const organizeDocuments = async () => {
    let parentFolderId;
    for (const folderName of parentFolders || []) {
      parentFolderId = (await getOrCreateFolder(folderName, parentFolderId)).id;
    }
    // set the folder parent to the new document to upload
    setNewDocument({
      ...newDocument,
      parentId: parentFolderId,
    });
    console.log('Document organized:', document);
  };

  const setupDocumentType = async () => {
    const documentType = await searchDocumentTypeByExtension(newDocument.extension);
    if (documentType.records.length > 0) {
      return documentType.records[0];
    }
  };

  const handleCreate = async () => {
    try {
      // fetch document type by extension and attach it to the new document
      const documentType = await setupDocumentType();
      console.log('----------------------> documentType');
      console.log(documentType);
      if(documentType) {
        await createRecord({
          ...newDocument,
          typeId: documentType.id,
        }).then((newRecord) => {
          handleUpload(newRecord.id);
          setSelectedUsers(new Array(0));
        });
        setOpenModal(!openModal);
        setNewDocument({
          ...newDocument,
          name: '',
          extension: '',
          users: {
            connect: [],
          },
        });
        setOpenToast(!openToast);
        // Handle toast success or further actions
        setToastData({
          title: 'A new document have been added successfully',
          type: 'success',
        });
      }
      else {
        setOpenToast(!openToast);
        // Handle toast success or further actions
        setToastData({
          title: 'Before uploading documents, go to setting to setup document types',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  const handleDelete = async (id: number) => {
    const record = {
      modelName: 'Document',
      id,
    };

    try {
      await deleteRecord(record);
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Document have been deleted successfully',
        type: 'success',
      });
    } catch (error) {
      // Handle error
    }
  };

  const handleDialogOpen = async (id: number) => {
    setSelectedId(id);
    setOpenDialog(!openDialog);
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewDocument({
      ...newDocument,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (selectedItems: any[], name: string) => {
    setNewDocument({
      ...newDocument,
      [name]: {
        connect: selectedItems.map((item) => ({ id: item.id })),
      }, // Assuming 'name' corresponds to the field name
    });
  };

  const handleFileChange = (e: {
    target: {
      files: any;
      name: any;
      value: any;
    };
  }) => {
    setSelectedFile(e.target.files[0]);
    const fileName = e.target.files[0].name;
    const fileExtension = fileName.split('.').pop();
    setNewDocument({
      ...newDocument,
      name: e.target.files[0].name,
      extension: fileExtension,
    });
  };

  const setOpenModalAndCheckParentFolder = async () => {
    // await getParentFolder().then(async () => {
    await organizeDocuments().then(async () => {
      setSelectedFile(null);
      setOpenModal(!openModal);
    });
  };

  return (
    <>
      {openToast && <Toast title={toastData.title} type={toastData.type} />}
      {openDialog && (
        <Dialog
          title="Confirmation"
          message="Are you really want to delete this document?"
          open={openDialog}
          discardButton="No"
          confirmButton="Yes"
          onDiscard={() => setOpenDialog(!openDialog)}
          onConfirm={() => handleDelete(selectedId)}
        />
      )}
      {openModal && (
        <Modal
          title="New Document"
          open={openModal}
          onDiscard={() => setOpenModal(!openModal)}
          onSave={handleCreate}
        >
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 bg-gray-50 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center space-y-4 text-gray-500">
                <ArrowUpOnSquareStackIcon width={32} height={32} />
                <div>
                  <p className="mb-2 text-sm text-center">
                    <span className="font-semibold">Click to upload file</span>
                  </p>
                  <p className="text-xs">
                    PDF, Excel, CSV, Docx, Power Point, PNG or JPG
                  </p>
                </div>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept=".pdf, .pptx, .xls, .xlsx, .doc, .docx, .csv, .png, .jpg"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {selectedFile && (
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <Input
                  label="Name"
                  name="name"
                  value={newDocument.name.split('.').slice(0, -1).toString()}
                  disabled
                  handleChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <MultiSelect
                  label="Share with"
                  items={users}
                  values={selectedUsers}
                  handleChange={() =>
                    handleMultiSelectChange(selectedUsers, 'users')
                  }
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Type"
                  name="extension"
                  value={newDocument.extension.toUpperCase()}
                  disabled
                  handleChange={() => null}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Upload Date"
                  name="createdDate"
                  value={new Date().toLocaleDateString()}
                  disabled
                  handleChange={() => null}
                />
              </div>
              <div className="col-span-1">
                <Select
                  label="Owner"
                  items={users}
                  value={
                    users.filter((item) => {
                      return item.id === newDocument.ownerId;
                    })[0]
                  }
                  disabled
                  handleChange={() => null}
                  hasAvatars
                />
              </div>
            </div>
          )}
        </Modal>
      )}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Checkbox
            id="my-documents"
            name="my-documents"
            label="My Documents"
            value={showOnlyMine}
            handleChange={() => setShowOnlyMine(!showOnlyMine)}
          />
          <TertiaryButton onClick={setOpenModalAndCheckParentFolder}>
            <DocumentArrowDownIcon width={16} height={16} />
            <span>Upload Document</span>
          </TertiaryButton>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.records?.map((document: any) => (
            <div className="-space-y-4 space-x-4 group" key={document.id}>
              <div className="p-4 space-y-2 text-xs bg-serene-50 rounded-md">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center justify-between space-x-1.5">
                    <p className="text-xs">
                      {document.name.split('.').slice(0, -1)}
                    </p>
                    <Badge
                      size="xs"
                      value={document.type?.name}
                      color={document.type?.color}
                    />
                  </div>
                  <div className="text-end flex items-center space-x-2 invisible group-hover:visible">
                    <IconButton customClass="text-serene-600">
                      <a
                        href={
                          document.path &&
                          `${API_BASE_URL}/uploads${document.path}/${document.name}`
                        }
                        download
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ArrowDownTrayIcon width={16} height={16} />
                      </a>
                    </IconButton>
                    <IconButton
                      customClass="text-serene-600"
                      onClick={() => handleDialogOpen(document.id)}
                    >
                      <XMarkIcon width={16} height={16} />
                    </IconButton>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar
                      key={document.owner.id}
                      size="sm"
                      icon={<div>{document.owner?.name[0]}</div>}
                      src={document.owner && API_BASE_URL + document.owner.img}
                      title={document.owner?.name}
                    />
                    {document.users?.map((user: any) => (
                      <Avatar
                        key={user.id}
                        size="sm"
                        icon={<div>{user?.name[0]}</div>}
                        src={user.img && API_BASE_URL + user.img}
                        title={user?.name}
                      />
                    ))}
                  </div>
                  <div className="text-end text-[10px] text-gray-400">
                    {retrieveDay(new Date(document.createdDate), '2-digit')}
                    &nbsp;
                    {retrieveMonth(new Date(document.createdDate), 'short')}
                    &nbsp;
                    {retrieveYear(new Date(document.createdDate), 'numeric')}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
