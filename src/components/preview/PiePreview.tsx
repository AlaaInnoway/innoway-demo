import PieChart from '../chart/PieChart';

interface Props {
  title?: string;
  colors?: string[];
}

export default function PiePreview(props: Props) {
  const { title, colors } = props;

  return (
    <div className="grid grid-cols-2 gap-4">
      <PieChart
        name={title || 'Your title goes here'}
        palette={colors}
        data={[]}
      />
    </div>
  );
}
