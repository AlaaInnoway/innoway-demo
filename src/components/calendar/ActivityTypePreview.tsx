import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import ActivityTypeItem from './ActivityTypeItem';

interface ActivityType {
  id: number;
  name: string;
  color?: string;
}

interface Props {
  types: ActivityType[];
  filterMeetings: (id: number[]) => void;
}

export default function ActivityTypePreview(props: Props) {
  const { types, filterMeetings } = props;
  const tab: number[] = [];
  const [ids, setIds] = useState(tab);
  useEffect(() => {
    filterMeetings(ids);
  }, [filterMeetings, ids]);
  const updateIds = (id: number, checked: boolean) => {
    if (checked) {
      setIds([...ids, id]);
    } else {
      setIds(
        ids.filter((row) => {
          return row !== id;
        })
      );
    }
  };
  return (
    <div className="col-span-2">
      <Card fullHeight>
        <section className="">
          <h2 className="text-sm font-medium text-gray-700">Activity Types</h2>
          <ol className="mt-8 space-y-2 text-sm leading-6 text-gray-500 list-decimal">
            {types.length > 0 ? (
              types.map((type: ActivityType) => (
                <ActivityTypeItem
                  key={type.id}
                  id={type.id}
                  name={type.name}
                  color={type.color}
                  updateIds={() => updateIds}
                />
              ))
            ) : (
              <p>No activities typees.</p>
            )}
          </ol>
        </section>
      </Card>
    </div>
  );
}
