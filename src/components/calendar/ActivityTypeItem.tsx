import { useState } from 'react';
import Checkbox from '../../components/form/Checkbox';

interface ActivityType {
  id: number;
  name: string;
  color?: string;
  updateIds: (id: number, checked: boolean) => void;
}

export default function ActivityTypeItem(props: ActivityType) {
  const { id, name, color, updateIds } = props;
  const [checked, setChecked] = useState(true);
  const handleChecked = () => {
    setChecked(!checked);
    updateIds(id, !checked);
  };

  return (
    <li className="list-none py-2">
      <Checkbox
        id={`${id}`}
        name={`${id}`}
        label={name}
        value={checked}
        color={color}
        handleChange={handleChecked}
      />
    </li>
  );
}
