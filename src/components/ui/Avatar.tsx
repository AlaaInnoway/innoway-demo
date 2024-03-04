import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  src?: string;
  title?: string;
  size?: string;
  rounded?: boolean;
  icon?: React.ReactNode;
  active? : boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export default function Avatar(props: Props) {
  const { src, title, size, rounded, icon, active, onClick, onRemove } = props;
  let avatarClass = 'h-8 w-8 p-2 text-base';
  let imageClass = 'h-8 w-8';
  if (size === 'lg') {
    avatarClass = 'h-24 w-24 p-6 text-6xl';
    imageClass = 'h-24 w-24';
  } else if (size === 'md') {
    avatarClass = 'h-16 w-16 p-4 text-3xl';
    imageClass = 'h-16 w-16';
  } else if (size === 'sm') {
    avatarClass = 'h-6 w-6 p-2 text-xs';
    imageClass = 'h-6 w-6';
  } else if (size === 'xs') {
    avatarClass = 'h-4 w-4 p-2 text-[11px]';
    imageClass = 'h-4 w-4';
  }

  if (src)
    return (
      <div className="group relative cursor-pointer">
        <img
          className={`${imageClass} z-10 p-0 object-contain border-2 border-white ${
            rounded ? 'rounded-full' : 'rounded-md'
          }`}
          src={src}
          alt={title}
          title={title}
        />
        {onRemove && (
          <button className="absolute -top-1 -right-1 cursor-pointer bg-gray-500 rounded-full" onClick={onRemove}>
            <XMarkIcon width={10} height={10} className="text-white font-bold" />
          </button>
        )}
        
      </div>
    );

  return (
    <div
      className={`${avatarClass} z-10 ${active ? 'bg-serene-500 text-white' : 'bg-gray-100 text-serene-700'} group relative flex items-center justify-center ${
        rounded ? 'rounded-full' : 'rounded-md'
      }`}
      title={title}
      onClick={onClick}
    >
      {onRemove && (
        <button className="absolute -top-1 -right-1 cursor-pointer bg-gray-500 rounded-full" onClick={onRemove}>
          <XMarkIcon width={10} height={10} className="text-white font-bold" />
        </button>
      )}
      {icon}
    </div>
  );
}
