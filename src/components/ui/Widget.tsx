import {
  StarIcon,
  PaintBrushIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { IconButton } from './Button';
import useDisableFocus from '../../hooks/useDisableFocus';
import Dropdown from './Dropdown';
import { paletteMenus, actionMenus } from '../../data/menus';

interface Props {
  name?: string;
  isBookmarked?: boolean;
  children: React.ReactNode;
}

export default function Widget(props: Props) {
  const { name, isBookmarked, children } = props;
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(isBookmarked);
  const [openPaletteMenu, setOpenPaletteMenu] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const paletteMenuRef = useRef(null);
  const actionMenuRef = useRef(null);
  useDisableFocus(paletteMenuRef, setOpenPaletteMenu);
  useDisableFocus(actionMenuRef, setOpenActionMenu);

  function togglePaletteMenu() {
    setOpenPaletteMenu(!openPaletteMenu);
  }

  function toggleActionMenu() {
    setOpenActionMenu(!openActionMenu);
  }

  return (
    <Card>
      <div className={`group ${name ? 'space-y-6' : '-space-y-3'}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-medium text-gray-700">{name}</h1>
          <div className="flex items-center space-x-3 invisible group-hover:visible">
            <IconButton onClick={() => setIsFavorite(!isFavorite)}>
              <StarIcon
                width={16}
                height={16}
                className={`${
                  isFavorite
                    ? 'stroke-yellow-300 fill-yellow-300'
                    : 'hover:stroke-gray-900'
                }`}
              />
            </IconButton>
            <div ref={paletteMenuRef} className="relative">
              <div>
                <IconButton onClick={() => togglePaletteMenu()}>
                  <PaintBrushIcon
                    width={16}
                    height={16}
                    className="hover:stroke-gray-900"
                  />
                </IconButton>
              </div>
              {openPaletteMenu && (
                <Dropdown
                  positionRight
                  items={paletteMenus}
                  handleClick={(item: any) => navigate(item.url || '/')}
                />
              )}
            </div>
            <div ref={actionMenuRef} className="relative">
              <div>
                <IconButton onClick={() => toggleActionMenu()}>
                  <EllipsisVerticalIcon
                    width={16}
                    height={16}
                    className="hover:stroke-gray-900"
                  />
                </IconButton>
              </div>
              {openActionMenu && (
                <Dropdown
                  positionRight
                  items={actionMenus}
                  handleClick={(item: any) => navigate(item.url || '/')}
                />
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </Card>
  );
}
