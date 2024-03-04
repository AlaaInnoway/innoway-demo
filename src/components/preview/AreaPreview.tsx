import AreaChart from '../chart/AreaChart';

interface Props {
  title?: string;
  colors?: string[];
}

export default function AreaPreview(props: Props) {
  const { title, colors } = props;

  return (
    <div className="grid grid-cols-2 gap-4">
      <AreaChart
        name={title || 'Your title goes here'}
        palette={colors}
        data={[]}
      />
    </div>
  );
}
