import AreaPreview from './AreaPreview';
import BarPreview from './BarPreview';
import LinePreview from './LinePreview';
import PiePreview from './PiePreview';
import RadarPreview from './RadarPreview';
import TilePreview from './TilePreview';

interface Props {
  title?: string;
  type?: string;
  colors?: string[];
}

export default function WidgetPreview(props: Props) {
  const { title, type, colors } = props;

  return (
    <>
      {type === 'tile' && (
        <TilePreview title={title} />
      )}
      {type === 'pie' && (
        <PiePreview title={title} colors={colors} />
      )}
      {type === 'bar' && (
        <BarPreview title={title} colors={colors} />
      )}
      {type === 'radar' && (
        <RadarPreview title={title} colors={colors} />
      )}
      {type === 'line' && (
        <LinePreview title={title} colors={colors} />
      )}
      {type === 'area' && (
        <AreaPreview title={title} colors={colors} />
      )}
    </>
  );
}
