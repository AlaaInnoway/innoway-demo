import {
  BoltIcon,
  CheckCircleIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { format, parseISO } from 'date-fns';
import { useRef, useState } from 'react';
import useDisableFocus from '../../hooks/useDisableFocus';
import {
  IconButton,
  PrimaryButton,
  SecondaryButton,
} from '../../components/ui/Button';
import Dropdown from '../../components/ui/Dropdown';
import Modal from '../../components/ui/Modal';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import activityMenus from '../../data/calendar/menus';
import activityTypes from '../../data/calendar/types';

interface Item {
  id: number;
  name: string;
  url?: string;
  icon?: React.ReactNode;
}
interface ActivityType {
  id: number;
  name: string;
  color?: string;
}
interface Activity {
  id: number;
  name: string;
  activityType: ActivityType;
  startDatetime: string;
  endDatetime: string;
  updateMeeting: (
    id: number,
    name: string,
    startDatetime: string,
    endDatetime: string,
    activityType: ActivityType
  ) => void;
  deleteMeeting: (id: number) => void;
}

export default function ActivityItem(props: Activity) {
  const {
    id,
    name,
    startDatetime,
    endDatetime,
    activityType,
    updateMeeting,
    deleteMeeting,
  } = props;
  const startDateTime = parseISO(startDatetime);
  const endDateTime = parseISO(endDatetime);
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(activityType);
  const [nameUpdated, setNameUpdated] = useState(name);
  const [startDatetimeUpdated, setStartDatetimeUpdated] =
    useState(startDatetime);
  const [endDatetimeUpdated, setEndDatetimeUpdated] = useState(endDatetime);
  const actionMenuRef = useRef(null);
  useDisableFocus(actionMenuRef, setOpenActionMenu);

  function toggleActionMenu() {
    setOpenActionMenu(!openActionMenu);
  }

  return (
    <li className="flex items-center space-x-4">
      {new Date() >= new Date(startDateTime) &&
      new Date() <= new Date(endDateTime) ? (
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-amber-100 text-amber-600">
          <BoltIcon width={16} height={16} />
        </div>
      ) : new Date() < new Date(startDateTime) ? (
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-100 text-red-600">
          <XMarkIcon width={16} height={16} />
        </div>
      ) : (
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-100 text-emerald-600">
          <CheckIcon width={16} height={16} />
        </div>
      )}

      <div className="flex-auto space-y-1">
        <div className="flex items-center space-x-2">
          <p className="text-xs text-gray-700">{name}</p>
          <div className={`w-1 h-1 rounded-md bg-${activityType.color}-500`} />
        </div>
        <p className="text-xs text-gray-500">
          <time dateTime={startDatetime}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          - <time dateTime={endDatetime}>{format(endDateTime, 'h:mm a')}</time>
        </p>
      </div>

      <div ref={actionMenuRef} className="relative">
        <div>
          <IconButton onClick={() => toggleActionMenu()}>
            <EllipsisVerticalIcon
              width={20}
              height={20}
              className="hover:stroke-gray-900"
            />
          </IconButton>
        </div>
        {openActionMenu && (
          <Dropdown
            items={activityMenus}
            handleClick={(item: any) => {
              if (item.url === '/remove') {
                deleteMeeting(id);
              } else if (item.url === '/preview') {
                setOpenModal(!openModal);
              } else if (item.url === '/edit') {
                setOpenModalEdit(!openModalEdit);
                setOpenModal(!openModal);
              }
            }}
          />
        )}
        {openModal && (
          <Modal
            title="Event"
            open={openModal}
            onDiscard={() => {
              setOpenModal(!openModal);
              setOpenModalEdit(false);
            }}
          >
            <Input
              label="Title"
              id="name"
              value={nameUpdated}
              type="text"
              disabled={!openModalEdit}
              handleChange={(e) => setNameUpdated(e.target.value)}
            />
            <Select
              label="Activity Type"
              items={activityTypes}
              value={selectedItem}
              handleChange={(item: any) => setSelectedItem(item)}
              disabled={!openModalEdit}
            />
            <Input
              label="Start Date"
              id="startDatetime"
              value={startDatetimeUpdated}
              type="datetime-local"
              disabled={!openModalEdit}
              handleChange={(e) => setStartDatetimeUpdated(e.target.value)}
            />
            <Input
              label="End Date"
              id="endDatetime"
              value={endDatetimeUpdated}
              type="datetime-local"
              disabled={!openModalEdit}
              handleChange={(e) => setEndDatetimeUpdated(e.target.value)}
            />
            {openModalEdit && (
              <div className="flex gap-x-5">
                <PrimaryButton
                  onClick={() => {
                    updateMeeting(
                      id,
                      nameUpdated,
                      startDatetimeUpdated,
                      endDatetimeUpdated,
                      selectedItem
                    );
                    setOpenModal(!openModal);
                    setOpenModalEdit(false);
                  }}
                >
                  <CheckCircleIcon width={20} height={20} />
                  <span>Save</span>
                </PrimaryButton>
                <SecondaryButton onClick={() => setOpenModal(!openModal)}>
                  <XCircleIcon width={20} height={20} />
                  <span>Cancel</span>
                </SecondaryButton>
              </div>
            )}
          </Modal>
        )}
      </div>
    </li>
  );
}
