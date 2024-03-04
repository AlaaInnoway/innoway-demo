import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import Dropdown, { Item } from './Dropdown';
import useDisableFocus from '../../hooks/useDisableFocus';
import { IconButton } from './Button';

interface DropdownActionProps {
  actionMenu: Item[];
  recordId: number;
  modelName?: string;
}

export default function DropdownAction(props: DropdownActionProps) {
  const { actionMenu, recordId, modelName } = props;

  const [openActionMenu, setOpenActionMenu] = useState(false);
  const actionMenuRef = useRef(null);
  useDisableFocus(actionMenuRef, setOpenActionMenu);
  function toggleActionMenu() {
    setOpenActionMenu(!openActionMenu);
  }
  return (
    <div ref={actionMenuRef} className="relative invisible group-hover:visible">
      <div>
        <IconButton onClick={() => toggleActionMenu()}>
          <EllipsisVerticalIcon
            width={24}
            height={24}
            className="stroke-serene-500 hover:stroke-gray-900"
          />
        </IconButton>
      </div>
      {openActionMenu && (
        <Dropdown
          positionRight
          items={actionMenu}
          recordId={recordId}
          modelName={modelName}
        />
      )}
    </div>
  );
}
