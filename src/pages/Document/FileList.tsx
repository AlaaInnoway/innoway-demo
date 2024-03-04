/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  ArrowUpOnSquareIcon,
  ArrowUpOnSquareStackIcon,
  ShareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Container from '../../layout/Container';
import ControlPanel from '../../layout/ControlPanel';
import { PrimaryButton } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Select from '../../components/form/Select';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import { FilterRequest } from '../../interfaces/filter-request.interface';
import useFilterData from '../../hooks/useFetchData';
import API_BASE_URL from '../../config';
import { fetchCountData } from '../../services/filter.service';
import DropdownAction from '../../components/ui/DropdownAction';
import Paginator from '../../components/ui/Paginator';
import Table from '../../components/ui/Table';
import Toast from '../../components/ui/Toast';
import Dialog from '../../components/ui/Dialog';
import useDeleteRecord from '../../hooks/useDeleteRecord';
import fetchDataByModel from '../../utils/fetch';
import folderIcon from '../../assets/folder.svg';

export default function FileList() {
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
      name: 'Files',
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

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'Document',
    filters: [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'typeId',
            operator: 'not equals',
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
    handleUpdateCount();
  });
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

  function downloadFile(id: number) {
    const file = data?.records.filter((item: any) => item.id === id)[0];
    const link = document.createElement('a');
    link.setAttribute(
      'href',
      `${API_BASE_URL}/uploads${file.path}/${file.name}`
    );
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noreferrer');
    link.click();
  }

  const fileActionMenus = [
    {
      id: 1,
      name: 'Download',
      icon: <ArrowDownTrayIcon width={16} height={16} />,
      handleClick: (id: number) => downloadFile(id),
    },
    {
      id: 2,
      name: 'Share',
      icon: <ShareIcon width={16} height={16} />,
      handleClick: (id: number) => setOpenModal(true),
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
      <Card>
        <div className="space-y-2">
          <Table
            columns={columns}
            optionalColumns={optionalColumns}
            handleColumnChange={toggleColumnVisibility}
          >
            {data?.records?.map((file: any, index: number) => (
              <tr
                className={`group hover:bg-serene-50 ${
                  index + 1 !== data?.records?.length &&
                  'border-b border-b-gray-200'
                }`}
                key={file.id}
              >
                <td className="py-4 px-6">
                  {index + 1 + (currentPage - 1) * 5}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div>{file.name}</div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <Badge value={file.type?.name} color={file.type?.color} />
                </td>
                <td className="py-4 px-6">
                  {new Date(file.createdDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <img
                      src={folderIcon}
                      alt="Folder"
                      width={24}
                      height={24}
                    />
                    <div>{file.parent?.name}</div>
                  </div>
                </td>
                <td className="flex items-center py-4 px-6 whitespace-nowrap">
                  <Avatar
                    size="sm"
                    icon={<div>{file.owner?.name[0]}</div>}
                    src={file.owner && API_BASE_URL + file.owner.img}
                    title={file.owner?.name}
                  />
                  <div className="pl-3">{file.owner?.name}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center -space-x-2">
                    {file.users?.map((user: any) => (
                      <Avatar
                        key={user.id}
                        size="sm"
                        icon={<div>{user.name[0]}</div>}
                        src={user && API_BASE_URL + user.img}
                        title={user.name}
                      />
                    ))}
                  </div>
                </td>
                {visibleColumns.includes('modelName') && (
                  <td className="py-4 px-6 whitespace-nowrap">
                    <Badge value={file.modelName} />
                  </td>
                )}
                <td>
                  <DropdownAction
                    actionMenu={fileActionMenus}
                    recordId={file.id}
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
    </Container>
  );
}
