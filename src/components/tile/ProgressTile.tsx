import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import ProgressBar from '../ui/ProgressBar';
import Widget from '../ui/Widget';

interface Props {
  name: string;
  value: string;
  percent: number;
  palette: string[];
  clickable?: boolean;
}

export default function ProgressTile(props: Props) {
  const { name, value, percent, palette, clickable } = props;

  return (
    <div className="col-span-1">
      <Widget>
        <div className="py-2 space-y-3">
          <div className="flex">
            <h1 className="text-sm font-medium text-gray-700">{name}</h1>
            {clickable && (
              <sup className="cursor-pointer invisible group-hover:visible text-gray-400 hover:text-gray-700">
                <ArrowTopRightOnSquareIcon width={10} height={10} />
              </sup>
            )}
          </div>
          {/* <ProgressBar value={value} percent={percent} palette={palette} /> */}
        </div>
      </Widget>
    </div>
  );
}
