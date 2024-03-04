interface Props {
  value?: string;
  percent: number;
  reverse?: boolean;
}

export default function ProgressBar(props: Props) {
  const { value, percent, reverse } = props;
  let progressColor = 'bg-gray-500';
  let barColor = 'bg-gray-50';

  function convertColorToClass(colorName?: string) {
    if (colorName === 'green') {
      progressColor = 'bg-emerald-500';
      barColor = 'bg-emerald-100';
    }
    if (colorName === 'orange') {
      progressColor = 'bg-amber-500';
      barColor = 'bg-amber-100';
    }
    if (colorName === 'red') {
      progressColor = 'bg-red-500';
      barColor = 'bg-red-100';
    }
    if (colorName === 'blue') {
      progressColor = 'bg-indigo-500';
      barColor = 'bg-indigo-100';
    }
    if (colorName === 'purple') {
      progressColor = 'bg-purple-500';
      barColor = 'bg-purple-100';
    }
    if (colorName === 'yellow') {
      progressColor = 'bg-yellow-500';
      barColor = 'bg-yellow-100';
    }
    if (colorName === 'pink') {
      progressColor = 'bg-pink-500';
      barColor = 'bg-pink-100';
    }
  }

  function convertValueToColor(percentValue: number) {
    if (percentValue === 0) {
      return convertColorToClass();
    }
    if (percentValue < 25) {
      return convertColorToClass('red');
    }
    if (percentValue < 50) {
      return convertColorToClass('orange');
    }
    if (percentValue < 75) {
      return convertColorToClass('purple');
    }
    if (percentValue < 100) {
      return convertColorToClass('blue');
    }
    return convertColorToClass('green');
  }
  convertValueToColor(percent);
  return (
    <div className="space-y-2">
      <div className={`flex items-center justify-between ${reverse && 'flex-row-reverse'}`}>
        <h3 className="text-[11px] text-gray-800">{percent}%</h3>
        <h3 className="text-[11px] text-gray-800">{value}</h3>
      </div>
      <div className={`h-1 w-full rounded-lg ${barColor}`}>
        <div
          className={`h-full rounded-lg ${progressColor}`}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}
