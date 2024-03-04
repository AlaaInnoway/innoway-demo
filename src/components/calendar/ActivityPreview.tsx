import { format, isSameDay, parseISO } from 'date-fns';
import {
  PlusCircleIcon,
  PlusIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import ActivityItem from './ActivityItem';
import Card from '../../components/ui/Card';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import activityTypes from '../../data/calendar/types';

interface ActivityType {
  id: number;
  name: string;
  color?: string;
}
interface Activity {
  id: number;
  name: string;
  startDatetime: string;
  endDatetime: string;
  activityType: ActivityType;
}

interface Props {
  meetings: Activity[];
  selectedDay: Date;
  addEvent: (
    name: string,
    activityType: ActivityType,
    startDatetime: string,
    endDatetime: string
  ) => void;
  updateMeeting: (
    id: number,
    name: string,
    startDatetime: string,
    endDatetime: string,
    activityType: ActivityType
  ) => void;
  deleteMeeting: (id: number) => void;
}

export default function ActivityPreview(props: Props) {
  const { selectedDay, meetings, addEvent, updateMeeting, deleteMeeting } =
    props;
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [startDatetime, setStartDatetime] = useState(
    `${selectedDay.toISOString().split('T')[0]}T08:00`
  );
  const [endDatetime, setEndDatetime] = useState(
    `${selectedDay.toISOString().split('T')[0]}T09:00`
  );
  const [activityType, setActivityType] = useState({
    id: -1,
    name: '',
  });
  const selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );
  return (
    <div className="col-span-4">
      <Card fullHeight>
        <section className="">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-700">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <button
              type="button"
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              <PlusIcon width={20} height={20} />
            </button>
          </div>
          <ol className="mt-8 space-y-6 text-sm leading-6 text-gray-500">
            {selectedDayMeetings.length > 0 ? (
              selectedDayMeetings.map((meeting: Activity) => (
                <ActivityItem
                  key={meeting.id}
                  id={meeting.id}
                  name={meeting.name}
                  activityType={meeting.activityType}
                  startDatetime={meeting.startDatetime}
                  endDatetime={meeting.endDatetime}
                  deleteMeeting={deleteMeeting}
                  updateMeeting={updateMeeting}
                />
              ))
            ) : (
              <p>No activities for today.</p>
            )}
          </ol>
        </section>
      </Card>
      {openModal && (
        <Modal
          title="Event"
          open={openModal}
          onDiscard={() => {
            setOpenModal(!openModal);
          }}
        >
          <Input
            id="name"
            name="name"
            value={name}
            label="Title"
            type="text"
            handleChange={(e) => setName(e.target.value)}
          />
          <Select
            label="Activity Type"
            items={activityTypes}
            value={activityType}
            handleChange={(item: any) => setActivityType(item)}
          />
          <Input
            id="startDatetime"
            name="startDatetime"
            value={startDatetime}
            label="Start Date"
            type="datetime-local"
            handleChange={(e) => setStartDatetime(e.target.value)}
          />
          <Input
            id="endDatetime"
            name="endDatetime"
            value={endDatetime}
            label="End Date"
            type="datetime-local"
            handleChange={(e) => setEndDatetime(e.target.value)}
          />
          <div className="flex gap-x-5">
            <PrimaryButton
              onClick={() => {
                setOpenModal(!openModal);
                addEvent(name, activityType, startDatetime, endDatetime);
              }}
            >
              <PlusCircleIcon width={20} height={20} />
              <span>Add</span>
            </PrimaryButton>
            <SecondaryButton onClick={() => setOpenModal(!openModal)}>
              <XCircleIcon width={20} height={20} />
              <span>Cancel</span>
            </SecondaryButton>
          </div>
        </Modal>
      )}
    </div>
  );
}
