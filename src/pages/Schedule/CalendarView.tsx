/* eslint-disable no-param-reassign */
import { useState } from 'react';
import {
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { startOfToday } from 'date-fns';
import Container from '../../layout/Container';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Button';
import ControlPanel from '../../layout/ControlPanel';
import Breadcrumb from '../../components/ui/Breadcrumb';
import meetings from '../../data/calendar/meetings';
import activityTypes from '../../data/calendar/types';
import ActivityTypePreview from '@component/calendar/ActivityTypePreview';
import Calendar from '@component/calendar/Calendar';
import ActivityPreview from '@component/calendar/ActivityPreview';

interface ActivityType {
  id: number;
  name: string;
  color?: string;
}

export default function CalendarView() {
  const [meetingsVar, setMeetingsVar] = useState<any[]>(meetings);
  const [meetingsUnfiltered, setMeetingsUnfiltered] = useState<any[]>(meetings);

  const breadcrumbs = [
    {
      name: 'Calendar',
      path: '/calendar',
    },
  ];
  const deleteMeeting = (id: number) => {
    setMeetingsVar(
      meetingsUnfiltered.filter((row) => {
        return row.id !== id;
      })
    );
    setMeetingsUnfiltered(
      meetingsUnfiltered.filter((row) => {
        return row.id !== id;
      })
    );
  };
  const addEvent = (
    name: string,
    activityType: {
      id: number;
      name: string;
    },
    startDatetime: string,
    endDatetime: string
  ) => {
    const obj = {
      id: meetingsVar.length + 1,
      name: String(name),
      activityType,
      startDatetime: String(startDatetime),
      endDatetime: String(endDatetime),
    };
    setMeetingsVar([...meetingsVar, obj]);
    setMeetingsUnfiltered([...meetingsUnfiltered, obj]);
  };
  const updateMeeting = (
    id: number,
    name: string,
    startDateTime: string,
    endDateTime: string,
    activityType: ActivityType
  ) => {
    const meets = meetingsVar.map((row) => {
      if (row.id === id) {
        row.name = name;
        row.startDatetime = startDateTime;
        row.endDatetime = endDateTime;
        row.activityType = activityType;
      }
      return row;
    });
    setMeetingsVar(meets);
    const meetsUnfiltered = meetingsUnfiltered.map((row) => {
      if (row.id === id) {
        row.name = name;
        row.startDatetime = startDateTime;
        row.endDatetime = endDateTime;
        row.activityType = activityType;
      }
      return row;
    });
    setMeetingsUnfiltered(meetsUnfiltered);
  };

  const filterMeetings = (ids: number[]) => {
    if (ids.length > 0) {
      setMeetingsVar(
        meetingsUnfiltered.filter((row) => {
          return ids.includes(row.activityType.id);
        })
      );
    } else {
      setMeetingsVar(meetingsUnfiltered);
    }
  };

  const [selectedDay, setSelectedDay] = useState(startOfToday());
  return (
    <Container>
      <ControlPanel>
        <Breadcrumb items={breadcrumbs} />
        <div className="flex items-center space-x-4">
          <PrimaryButton>
            <ArrowPathIcon width={20} height={20} />
            <span>Synchronise</span>
          </PrimaryButton>
          <SecondaryButton>
            <ArrowDownOnSquareIcon width={20} height={20} />
          </SecondaryButton>
        </div>
      </ControlPanel>
      <div className="md:grid md:grid-cols-12 gap-4">
        <ActivityTypePreview
          types={activityTypes}
          filterMeetings={() => filterMeetings}
        />
        <Calendar
          meetings={meetingsVar}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <ActivityPreview
          meetings={meetingsVar}
          selectedDay={selectedDay}
          deleteMeeting={deleteMeeting}
          updateMeeting={updateMeeting}
          addEvent={addEvent}
        />
      </div>
    </Container>
  );
}
