import { useNavigate } from 'react-router-dom';
import { userMenus } from '../data/menus';
import Dropdown from '../../../components/ui/Dropdown';

export default function UserMenu() {
  const navigate = useNavigate();
  return (
    <Dropdown
      items={userMenus}
      handleClick={(item: any) => navigate(item.url || '')}
      positionRight
    />
  );
}
