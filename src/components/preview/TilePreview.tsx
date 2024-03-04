import { RectangleStackIcon } from '@heroicons/react/24/outline';
import SimpleTile from '../tile/SimpleTile';

interface Props {
  title?: string;
}

export default function TilePreview(props: Props) {
  const { title } = props;

  return (
    <div className="grid grid-cols-4 gap-4">
      <SimpleTile
        icon={<RectangleStackIcon width={32} height={32} />}
        name={title || 'Your title goes here'}
        value="320 780 500 EUR"
        palette={['#ecfdf5', '#059669']}
        rounded
      />
    </div>
  );
}
