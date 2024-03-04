import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../components/form/Input';
import MultiSelect from '../../../components/form/MultiSelect';
import Avatar from '../../../components/ui/Avatar';
import Modal from '../../../components/ui/Modal';
import Toast from '../../../components/ui/Toast';
import API_BASE_URL from '../../../config';
import useUpdateRecord from '../../../hooks/useUpdateRecord';
import useDeleteRecord from '../../../hooks/useDeleteRecord';
import useSearchData from '../../../hooks/useSearchData';
import { SearchRequest } from '../../../interfaces/search-request.interface';
import fetchDataByModel from '../../../utils/fetch';
import { IconButton, PrimaryButton, SecondaryButton } from '../../../components/ui/Button';
import { CheckCircleIcon, DocumentDuplicateIcon, EllipsisVerticalIcon, PencilSquareIcon, PlusCircleIcon, PrinterIcon, ShareIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Breadcrumb from './Breadcrumb';
import ControlPanel from '../../../layout/ControlPanel';
import Dropdown from '../../../components/ui/Dropdown';
import useDisableFocus from '../../../hooks/useDisableFocus';
import handleDownloadPdf from '../../../utils/download';
import Dialog from '../../../components/ui/Dialog';

interface Props {
  layoutEditable?: boolean;
  handleLayoutEditable?: any;
  handleOpenPanel?: any;
  printRef?: any;
}

export default function DashboardPanel(props : Props) {
  const {layoutEditable, handleLayoutEditable, handleOpenPanel, printRef} = props;
  const [openModal, setOpenModal] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  
  const [selectedUsers, setSelectedUsers] = useState(new Array(0));
  const [users, setUsers] = useState(new Array(0));
  const [editedDashboard, setEditedDashboard] = useState<any>({
    users: [],
  });
  const { id } = useParams();
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const actionMenuRef = useRef(null);
  useDisableFocus(actionMenuRef, setOpenActionMenu);

  function toggleActionMenu() {
    setOpenActionMenu(!openActionMenu);
  }

  const actionMenus = [
    {
      id: 1,
      name: 'Add Item',
      icon: <PlusCircleIcon width={16} height={16} />,
      handleClick: () => handleOpenPanel(),
    },
    {
      id: 2,
      name: 'Print',
      icon: <PrinterIcon width={16} height={16} />,
      handleClick: () => handleDownloadPdf(printRef, data?.name || 'Dashboard'),
    },
    {
      id: 3,
      name: 'Duplicate',
      icon: <DocumentDuplicateIcon width={16} height={16} />,
      handleClick: () => null,
    },
    {
      id: 4,
      name: 'Share',
      icon: <ShareIcon width={16} height={16} />,
      handleClick: () => setOpenModal(!openModal),
    },
    {
      id: 5,
      name: 'Remove',
      icon: <XMarkIcon width={16} height={16} />,
      handleClick: (id: number) => {
        setSelectedId(id);
        setOpenDialog(!openDialog);
      },
    },
  ];

  const dashboardRequest: SearchRequest = {
    modelName: 'Dashboard',
    recordId: id || '',
    selectFields: [
      'id',
      'name',
      'category',
      'owner.id',
      'owner.name',
      'users.id',
      'users.img',
      'users.name',
    ],
  };
  const { data } = useSearchData(dashboardRequest);

  useEffect(() => {
    setSelectedUsers(data?.users);
  }, [data]);

  const queryKey = 'filterData';
  const updateRecord = useUpdateRecord(queryKey); // Use the custom hook

  const handleMultiSelectChange = (selectedItems: any[], name: string) => {
    const connectedUsers: any[] = users;
    setEditedDashboard({
      ...editedDashboard,
      [name]: {
        disconnect : connectedUsers.map((item) => ({ id: item.id })),
        connect: selectedItems.map((item) => ({ id: item.id })),
      }, // Assuming 'name' corresponds to the field name
    });
  };

  const handleRemoveUser = async (user: any) => {
    setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser.id !== user.id));
    setEditedDashboard({
      ...editedDashboard,
      users: {
        disconnect : { id: user.id },
      }
    });
    await updateRecord.mutateAsync({
      modelName: 'Dashboard', // Model name
      recordId: id ? parseInt(id, 10) : 0, // Record ID
      updates: {
        users: {
          disconnect : { id: user.id },
        }
      },
    });
    setOpenToast(!openToast);
    // Handle toast success or further actions
    setToastData({
      title: `${user.name} has been removed from dashboard`,
      type: 'info',
    });
  };

  const handleUpdate = async () => {
    try {
      // Call the mutate function to update the record
      await updateRecord.mutateAsync({
        modelName: 'Dashboard', // Model name
        recordId: id ? parseInt(id, 10) : 0, // Record ID
        updates: editedDashboard, // Update data
      });
      setEditedDashboard({
        ...editedDashboard,
        users: [],
      });
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Dashboard has been shared with the selected users',
        type: 'info',
      });
      setOpenModal(!openModal);
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  // delete
  const { deleteRecord } = useDeleteRecord(queryKey);

  const handleDelete = async (id: number) => {
    const record = {
      modelName: 'Dashboard', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      // await updateTotalItems();
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Dashboard have been deleted successfully',
        type: 'success',
      });
      //navigate('/templates')
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    // get users
    const filterBodyRequest = [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'id',
            operator: 'not equals',
            values: data?.owner?.id ? parseInt(data?.owner?.id, 10) : null,
          },
        ],
      },
    ];
    fetchDataByModel('user', ['id', 'name', 'img'], filterBodyRequest).then((result) => {
      setUsers(result?.records);
    });
  }, [data]);

  return (
    <>
      <ControlPanel>
        <Breadcrumb data={data} />
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Avatar
              icon={<div>{data?.owner.name[0]}</div>}
              src={data?.owner.img && API_BASE_URL + data?.owner.img}
              title={data?.owner.name}
            />
            {selectedUsers?.map((item: any) => (
              <Avatar
                key={item.id}
                icon={<div>{item.name[0]}</div>}
                src={item.img && API_BASE_URL + item.img}
                /* src={"https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg"} */
                title={item.name}
                onRemove={() => handleRemoveUser(item)}
              />
            ))}
          </div>
          {!layoutEditable ? (
            <PrimaryButton
              onClick={handleLayoutEditable}
            >
              <PencilSquareIcon width={20} height={20} />
              <span>Edit Layout</span>
            </PrimaryButton>
          ) : (
            <>
              <SecondaryButton
                onClick={handleLayoutEditable}
              >
                <XCircleIcon width={20} height={20} />
                <span>Discard Layout</span>
              </SecondaryButton>
              <PrimaryButton
                onClick={handleLayoutEditable}
              >
                <CheckCircleIcon width={20} height={20} />
                <span>Save Layout</span>
              </PrimaryButton>
            </>
          )}
          <div ref={actionMenuRef} className="relative">
            <div>
              <IconButton onClick={() => toggleActionMenu()} disabled={layoutEditable}>
                <EllipsisVerticalIcon
                  width={20}
                  height={20}
                  className="hover:stroke-gray-900"
                />
              </IconButton>
            </div>
            {openActionMenu && (
              <Dropdown
                positionRight
                items={actionMenus}
                modelName='Dashboard'
                recordId={parseInt(id || '0')}
              />
            )}
          </div>
        </div>
      </ControlPanel>
      {openToast && <Toast title={toastData.title} type={toastData.type} />}
      {openDialog && (
        <Dialog
          title="Confirmation"
          message="Are you really want to delete this dashboard?"
          open={openDialog}
          discardButton="No"
          confirmButton="Yes"
          onDiscard={() => setOpenDialog(!openDialog)}
          onConfirm={() => handleDelete(selectedId)}
        />
      )}
      {openModal && (
        <Modal
          title="Dashboard"
          open={openModal}
          onDiscard={() => setOpenModal(!openModal)}
          onSave={handleUpdate}
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Input
                label="Name"
                name="name"
                value={data?.name}
                handleChange={() => null}
                disabled
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Category"
                name="category"
                value={data?.category}
                handleChange={() => null}
                disabled
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Owner"
                name="owner"
                value={data?.owner?.name}
                handleChange={() => null}
                disabled
              />
            </div>
            <div className="col-span-1">
              <MultiSelect
                label="Add users"
                items={users}
                values={selectedUsers}
                handleChange={() =>
                  handleMultiSelectChange(selectedUsers, 'users')
                }
                hideValues
              />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Share with
              </label>
              <div className="flex items-center space-x-2">
                {selectedUsers?.map((item: any) => (
                  <Avatar
                    key={item.id}
                    icon={<div>{item.name[0]}</div>}
                    src={item.img && API_BASE_URL + item.img}
                    title={item.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
