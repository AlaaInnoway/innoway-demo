import {
  DocumentTextIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { IconButton } from '../../../components/ui/Button';
import useDisableFocus from '../../../hooks/useDisableFocus';
import Dropdown from '../../../components/ui/Dropdown';
import Badge from '../../../components/ui/Badge';
import { fileActionMenus } from '../data/menus';

export default function FileCard(props: any) {
  const { file, enabled } = props;
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const actionMenuRef = useRef(null);
  useDisableFocus(actionMenuRef, setOpenActionMenu);

  function toggleActionMenu() {
    setOpenActionMenu(!openActionMenu);
  }
  return (
    <div className="relative w-full h-full p-4 group">
      {enabled && (
        <div
          ref={actionMenuRef}
          className="absolute right-4 z-20 invisible group-hover:visible"
        >
          <div>
            <IconButton onClick={() => toggleActionMenu()}>
              <EllipsisHorizontalIcon
                width={24}
                height={24}
                className="stroke-serene-500 hover:stroke-gray-900"
              />
            </IconButton>
          </div>
          {openActionMenu && (
            <Dropdown
              positionRight
              items={fileActionMenus}
              handleClick={(item: any) => navigate(`${item.url}/${file.id}`)}
            />
          )}
        </div>
      )}
      <div className="text-center">
        <div className={`grid space-y-4 ${enabled && '-mt-0'}`}>
          <div className="relative justify-self-center text-gray-400">
            <DocumentTextIcon
              height={96}
              width={96}
              strokeWidth={0.25}
              fill="#fff"
            />
            <div className="absolute bottom-0">
              <Badge value={file.type?.name} color={file.type?.color} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500 text-[10px]">
              {new Date(file.createdDate).toLocaleDateString()}
            </p>
            <h1 className="text-xs">{file.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
