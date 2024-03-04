import LineChart from '../chart/LineChart';

interface Props {
  title?: string;
  colors?: string[];
}

export default function LinePreview(props: Props) {
  const { title, colors } = props;

  return (
    <div className="grid grid-cols-2 gap-4">
      <LineChart
        name={title || 'Your title goes here'}
        palette={colors}
        data={[]}
      />
    </div>
  );
}
