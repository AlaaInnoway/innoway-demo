import RadarChart from '../chart/RadarChart';

interface Props {
  title?: string;
  colors?: string[];
}

export default function RadarPreview(props: Props) {
  const { title, colors } = props;

  return (
    <div className="grid grid-cols-2 gap-4">
      <RadarChart
        name={title || 'Your title goes here'}
        palette={colors}
        data={[]}
      />
    </div>
  );
}
