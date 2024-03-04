interface Props {
  value?: string | number;
  icon?: React.ReactNode;
  color?: string;
  size?: string;
}

function convertSizeToClass(size?: string) {
  if (size === 'lg') {
    return ' text-sm';
  }
  if (size === 'md') {
    return ' text-xs';
  }
  if (size === 'xs') {
    return 'text-[10px]';
  }
  return 'text-[11px]';
}

function convertColorToClass(color?: string) {
  if (color === 'green') {
    return ' bg-teal-50 text-teal-500';
  }
  if (color === 'orange') {
    return ' bg-orange-50 text-orange-500';
  }
  if (color === 'red') {
    return 'bg-red-50 text-red-500';
  }
  if (color === 'blue') {
    return 'bg-sky-50 text-sky-500';
  }
  if (color === 'purple') {
    return 'bg-purple-50 text-purple-500';
  }
  if (color === 'yellow') {
    return 'bg-amber-50 text-amber-500';
  }
  if (color === 'pink') {
    return 'bg-pink-50 text-pink-500';
  }
  return 'bg-gray-50 text-gray-500';
}

export default function Badge(props: Props) {
  const { value, icon, color, size } = props;
  return (
    <div
      className={`w-fit flex items-center space-x-1 ${convertSizeToClass(
        size
      )} font-medium px-2 py-1 rounded-md ${convertColorToClass(color)}`}
    >
      {icon}
      <span>{value}</span>
    </div>
  );
}
