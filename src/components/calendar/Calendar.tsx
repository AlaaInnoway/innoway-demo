import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import { useState } from 'react';
import Card from '../../components/ui/Card';
import setClassNames from '@util/setClassNames';
import colStartClasses from '../../data/calendar/constant';

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
  setSelectedDay: (day: Date) => void;
}

export default function Calendar(props: Props) {
  const { selectedDay, setSelectedDay, meetings } = props;
  const [currentMonth, setCurrentMonth] = useState(
    format(startOfToday(), 'MMM-yyyy')
  );
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  return (
    <div className="col-span-6">
      <Card>
        <div className="flex items-center">
          <h2 className="flex-auto text-sm font-medium text-gray-700">
            {format(firstDayCurrentMonth, 'MMMM yyyy')}
          </h2>
          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-7 pt-4 text-xs leading-6 text-center text-gray-600 font-medium">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day: Date, dayIdx: number) => (
            <div
              key={day.toString()}
              className={setClassNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                'py-2'
              )}
            >
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={setClassNames(
                  isEqual(day, selectedDay) && '',
                  !isEqual(day, selectedDay) &&
                    isToday(day) &&
                    'text-serene-600',
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    'text-gray-500',
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    'text-gray-400',
                  isEqual(day, selectedDay) &&
                    isToday(day) &&
                    'bg-serene-500 text-gray-50',
                  isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    'bg-serene-500 text-gray-50',
                  !isEqual(day, selectedDay) && 'hover:bg-gray-100',
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-md'
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
              </button>

              <div className="flex justify-center space-x-1 mt-1">
                {meetings.map((meeting: Activity) =>
                  isSameDay(parseISO(meeting.startDatetime), day) ? (
                    <div
                      key={meeting.id}
                      className={`w-1 h-1 rounded-md bg-${meeting.activityType.color}-500`}
                    />
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
