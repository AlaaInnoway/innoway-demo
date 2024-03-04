import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Widget from '../ui/Widget';
import prettyDecimal from '../../utils/cast'

interface Props {
  icon?: React.ReactNode;
  name: string;
  value: string;
  isBookmarked?: boolean;
  palette?: string[];
  clickable?: boolean;
  inverse?: boolean;
  rounded?: boolean;
}

export default function SimpleTile(props: Props) {
  const {
    icon,
    name,
    value,
    isBookmarked,
    palette,
    clickable,
    inverse,
    rounded,
  } = props;

  return (
    <div className="col-span-1">
      <Widget isBookmarked={isBookmarked}>
        <div className="flex items-center py-2 space-x-4">
          <div
            className={`flex items-center justify-center w-16 h-16 ${
              rounded ? 'rounded-full' : 'rounded-lg'
            }`}
            style={palette && { background: palette[0], color: palette[1] }}
          >
            {icon}
          </div>
          {inverse ? (
            <div className="space-y-2">
              <h3 className="text-sm" style={palette && { color: palette[1] }}>
                {prettyDecimal(value)}
              </h3>
              <div className="flex">
                <h1 className="text-xs font-medium text-gray-700">{name}</h1>
                {clickable && (
                  <sup className="cursor-pointer invisible group-hover:visible text-gray-400 hover:text-gray-700">
                    <ArrowTopRightOnSquareIcon width={10} height={10} />
                  </sup>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex">
                <h1 className="text-sm font-medium text-gray-700">{name}</h1>
                {clickable && (
                  <sup className="cursor-pointer invisible group-hover:visible text-gray-400 hover:text-gray-700">
                    <ArrowTopRightOnSquareIcon width={10} height={10} />
                  </sup>
                )}
              </div>
              <h3 className="text-xs" style={palette && { color: palette[1] }}>
                {prettyDecimal(value)}
              </h3>
            </div>
          )}
        </div>
      </Widget>
    </div>
  );
}
