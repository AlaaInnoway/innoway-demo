import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { IconButton } from '../../../components/ui/Button';
import useDisableFocus from '../../../hooks/useDisableFocus';
import Dropdown from '../../../components/ui/Dropdown';
import folderIcon from '../assets/folder.svg';
import { folderActionMenus } from '../data/menus';

export default function FolderCard(props: any) {
  const { folder, enabled, handleClick } = props;
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
              items={folderActionMenus}
              handleClick={(item: any) => navigate(`${item.url}/${folder.id}`)}
            />
          )}
        </div>
      )}
      <button type="button" className="text-center" onClick={handleClick}>
        <div className={`grid -space-y-2 ${enabled && '-mt-0'}`}>
          <div className="relative justify-self-center text-gray-400">
            <img src={folderIcon} alt="" height={96} width={96} />
          </div>
          <div className="space-y-1">
            <p className="text-gray-500 text-[10px]">
              {new Date(folder.createdDate).toLocaleDateString()}
            </p>
            <h1 className="text-xs">{folder.name}</h1>
          </div>
        </div>
      </button>
    </div>
  );
}
