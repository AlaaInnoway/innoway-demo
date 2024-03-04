/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ArrowUpOnSquareIcon,
  ArrowUpOnSquareStackIcon,
} from '@heroicons/react/24/outline';
import Container from '../../layout/Container';
import ControlPanel from '../../layout/ControlPanel';
import { PrimaryButton } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Select from '../../components/form/Select';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Modal from '../../components/ui/Modal';
import { FilterRequest } from '../../interfaces/filter-request.interface';
import useFilterData from '../../hooks/useFetchData';
import { fetchCountData } from '../../services/filter.service';
import Toast from '../../components/ui/Toast';
import Dialog from '../../components/ui/Dialog';
import useDeleteRecord from '../../hooks/useDeleteRecord';
import fetchDataByModel from '../../utils/fetch';
import FolderItem from '../../features/documents/components/FolderItem';
import fetchRootDocuments from '../../services/document.service';
import DocumentItem from '../../features/documents/components/DocumentItem';

export default function DocumentExplorer() {
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  const [users, setUsers] = useState(new Array(0));
  const [types, setTypes] = useState(new Array(0));

  const [columns, setColumns] = useState<any[]>([
    {
      id: 'name',
      name: 'Name',
      sequence: 1,
    },
    {
      id: 'type',
      name: 'Type',
      sequence: 2,
    },
    {
      id: 'createdDate',
      name: 'Upload Date',
      sequence: 3,
    },
    {
      id: 'parent',
      name: 'Folder',
      sequence: 4,
    },
    {
      id: 'owner',
      name: 'Owner',
      sequence: 5,
    },
    {
      id: 'users',
      name: 'Shared With',
      sequence: 6,
    },
  ]);
  const [optionalColumns, setOptionalColumns] = useState([
    {
      id: 'modelName',
      name: 'Tag',
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

  const breadcrumbs = [
    {
      name: 'Documents',
      path: '/document/file',
    },
  ];

  const sortedFieldItems = [
    { id: 'id', name: 'Recent' },
    { id: 'name', name: 'Name' },
    { id: 'type.name', name: 'Type' },
    { id: 'parent.name', name: 'Folder' },
    { id: 'owner.name', name: 'Owner' },
    { id: 'modelName', name: 'Tag' },
  ];

  const [sortedField, setSortedField] = useState({ id: 'id', name: 'Recent' });

  const retrieveFolders = async () => {
    return fetchRootDocuments();
  };

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'Document',
    filters: [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'parentId',
            operator: 'equals',
            values: null,
          },
        ],
      },
    ],
    selectFields: [
      'id',
      'name',
      'parent',
      'path',
      'type',
      'createdDate',
      'owner.id',
      'owner.name',
      'owner.img',
      'users.id',
      'users.name',
      'users.img',
      'modelName',
      'recordId',
      'children',
    ],
    sortField: sortedField.id,
    sortOrder: 'desc',
    page: currentPage,
    perPage: 5,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  const { data, isLoading } = useFilterData(filterData);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({ children: [] });
  const [totalItems, setTotalItems] = useState(0);

  const handleUpdateCount = () => {
    fetchCountData(filterData).then((count: number) => {
      setTotalItems(count); // Update the totalItems state
    });
  };
  useEffect(() => {
    handleUpdateCount();
  });
  useEffect(() => {
    // This useEffect runs once after the component mounts
    retrieveFolders().then(async (items) => {
      console.log('---> items');
      console.log(items);
      setFolders(items?.children);
      setSelectedFolder(items);
    });
    // Make sure to handle any necessary clean-up if needed
    return () => {
      // Cleanup code here if required
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const queryKey = 'filterData';
  // delete
  const { deleteRecord } = useDeleteRecord(queryKey);

  const handleDelete = async (id: number) => {
    const record = {
      modelName: 'document', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      // await updateTotalItems();
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'File have been deleted successfully',
        type: 'success',
      });
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    // get users
    fetchDataByModel('user', ['id', 'name', 'img']).then((result) => {
      setUsers(result?.records);
    });
    // get types
    fetchDataByModel('DocumentType').then((result) => {
      setTypes(result?.records);
    });
  }, []);

  function toggleFolderRecursively(folderItems: any, targetFolder: any) {
    return folderItems.map((folder: any) => {
      if (folder === targetFolder) {
        return { ...folder, expanded: !folder.expanded };
      }
      if (folder.children) {
        const updatedChildren = toggleFolderRecursively(
          [...folder.children],
          targetFolder
        );
        return { ...folder, children: updatedChildren };
      }
      return folder;
    });
  }

  function updateFolderContent(folder: any) {
    setSelectedFolder(folder);
  }

  function toggleFolder(folder: any) {
    const updatedFolders = toggleFolderRecursively([...folders], folder);
    setFolders(updatedFolders);
    updateFolderContent(folder);
  }

  return (
    <Container>
      <ControlPanel>
        <Breadcrumb items={breadcrumbs} />
        <div className="flex items-center space-x-4">
          <PrimaryButton onClick={() => setOpenModal(!openModal)}>
            <ArrowUpOnSquareIcon width={20} height={20} />
            <span>Upload</span>
          </PrimaryButton>
        </div>
      </ControlPanel>
      <ControlPanel>
        <div className="flex items-center space-x-4">
          <Select
            openMaxWidth
            customClass="bg-serene-100 text-serene-700 font-medium border-0 space-x-2"
            items={users}
            value={{ id: 0, name: 'Owner' }}
            handleChange={() => null}
            hasAvatars
          />
          <Select
            openMaxWidth
            customClass="bg-serene-100 text-serene-700 font-medium border-0 space-x-2"
            items={types}
            value={{ id: 0, name: 'Type' }}
            handleChange={() => null}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[
              { id: 1, name: 'Upload Date' },
              { id: 2, name: 'Folder' },
              { id: 3, name: 'Tag' },
            ]}
            value={{ id: 0, name: 'More' }}
            handleChange={() => null}
            icon={<AdjustmentsVerticalIcon width={14} height={14} />}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-0">
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
        </div>
      </ControlPanel>
      {openToast && <Toast title={toastData.title} type={toastData.type} />}
      {openDialog && (
        <Dialog
          title="Confirmation"
          message="Are you really want to delete this file?"
          open={openDialog}
          discardButton="No"
          confirmButton="Yes"
          onDiscard={() => setOpenDialog(!openDialog)}
          onConfirm={() => handleDelete(selectedId)}
        />
      )}
      {openModal && (
        <Modal
          title="New File"
          open={openModal}
          onDiscard={() => setOpenModal(!openModal)}
        >
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center space-y-4 text-gray-500">
                <ArrowUpOnSquareStackIcon width={32} height={32} />
                <div>
                  <p className="mb-2 text-sm text-center">
                    <span className="font-semibold">Click to upload</span>{' '}
                    or drag and drop
                  </p>
                  <p className="text-xs">
                    PDF, Excel, CSV, DOCX, Power Point, PNG or JPG
                  </p>
                </div>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </Modal>
      )}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-4 col-span-1 h-full">
          <Card fullHeight>
            <ul className="space-y-3 mt-4">
              {folders.map((folder: any) => (
                <FolderItem
                  key={folder.name}
                  folder={folder}
                  toggleFolder={toggleFolder}
                  updateFolderContent={updateFolderContent}
                />
              ))}
            </ul>
          </Card>
        </div>
        <div className="col-span-2 h-full">
          <Card fullHeight>
            <div className="grid grid-cols-4 gap-8 py-4">
              {selectedFolder?.children?.map((file: any) => (
                <DocumentItem key={file.id} document={file} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
