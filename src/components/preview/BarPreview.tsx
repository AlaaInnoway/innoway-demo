import BarChart from '../chart/BarChart';

interface Props {
  title?: string;
  colors?: string[];
}

export default function BarPreview(props: Props) {
  const { title, colors } = props;

  return (
    <div className="grid grid-cols-2 gap-4">
      <BarChart
        name={title || 'Your title goes here'}
        palette={colors}
        data={[]}
      />
    </div>
  );
}
