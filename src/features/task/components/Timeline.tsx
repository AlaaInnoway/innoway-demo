import API_BASE_URL from "../../../config";
import Avatar from "../../../components/ui/Avatar";
import Badge from "../../../components/ui/Badge";
import {IconButton} from "../../../components/ui/Button";
import {
  retrieveDay,
  retrieveMonth,
  retrieveYear,
} from '../../../utils/formatDate';
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface TimelineProps {
    events: any[];
    markAsDone: (id: number) => void;
    handleDialogOpen: (id: number) => void;
  }
  
function Timeline({ events, markAsDone, handleDialogOpen }: TimelineProps) {
  // group events by due date
  const groupEventsByDate = (events: any[]) => {
    const groupedEvents: any = {};
    events.forEach((event) => {
      const date = event.dueDate;
      if (groupedEvents[date]) {
        groupedEvents[date].push(event);
      } else {
        groupedEvents[date] = [event];
      }
    });
    return groupedEvents;
  };

  // fetch grouped dates
  const groupedEvents = groupEventsByDate(events);

  
  const stages: any = {
    'Not Started': 'purple',
    'In Progress': 'blue',
    'Overdue': 'pink',
    'Done': 'green',
  };

  return (
    <div>
      {Object.keys(groupedEvents).map((date) => (
        <div key={date} className="mt-4">
          <div className="ps-2 my-2">
            <h3 className="text-[10px] font-medium italic text-gray-700 dark:text-gray-400">
                {retrieveDay(new Date(date), '2-digit')}&nbsp;
                {retrieveMonth(new Date(date), 'short')}&nbsp;
                {retrieveYear(new Date(date), 'numeric')}
            </h3>
          </div>
          {groupedEvents[date].map((event: any, index: number) => (
            <div key={index}>
              <div className="group flex gap-x-2">
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
                  <div className="relative z-10 w-7 h-7 flex justify-center items-center">
                    <div className="w-2 h-2 rounded-full bg-serene-400 dark:bg-gray-600"></div>
                  </div>
                </div>
                <div className="grow pt-0.5 pb-4 space-y-2">
                  <h3 className="flex items-center gap-x-1.5 text-xs font-medium text-gray-700 dark:text-white">
                    {event.name}
                    <Badge size="xs" value={event.stage} color={stages[event.stage]} />
                    <div className="text-end flex items-center space-x-2 ml-auto invisible group-hover:visible">
                        {event.stage !== 'Done' && (
                        <IconButton
                            customClass="text-serene-600"
                            onClick={() => {
                                console.log("Mark as done clicked");
                                markAsDone(event.id);
                            }}
                        >
                            <CheckIcon width={16} height={16} title='Mark as done' />
                        </IconButton>
                        )}
                        <IconButton
                            customClass="text-serene-600"
                            onClick={() => {
                                console.log("Remove clicked");
                                handleDialogOpen(event.id);
                            }}
                        >
                        <XMarkIcon width={16} height={16} title='Remove' />
                        </IconButton>
                    </div>
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {event.type.name}
                  </p>
                  <button type="button" className="-ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    <Avatar 
                        title={event.user.name} 
                        icon={<div>{event.user.name[0]}</div>}
                        src={event.user.img && API_BASE_URL + event.user.img}
                        /* src={"https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg"} */
                        size="sm"
                        rounded
                    />
                    {event.user.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Timeline;
