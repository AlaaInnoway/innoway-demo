import {
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import Dropdown from '../../../components/ui/Dropdown';
import useDisableFocus from '../../../hooks/useDisableFocus';
import filesMenus from '../data/menus';
import csvIcon from '../assets/csv.svg';
import docIcon from '../assets/doc.svg';
import jpgIcon from '../assets/jpg.svg';
import pdfIcon from '../assets/pdf.svg';
import pngIcon from '../assets/png.svg';
import pptIcon from '../assets/ppt.svg';
import xlsIcon from '../assets/xls.svg';

interface File {
  id: number;
  name: string;
  parentId?: number;
  updatedDate?: string;
  fileType?: string;
  key?: number;
  users: any;
}

export default function FileTabLine({
  fileType,
  id,
  name,
  parentId,
  updatedDate,
  key,
  users,
}: File) {
  const [openActionMenu, setOpenActionMenu] = useState(false);

  const actionMenuRef = useRef(null);
  useDisableFocus(actionMenuRef, setOpenActionMenu);

  const getIcon = (type: string): string => {
    switch (type) {
      case 'csv':
        return csvIcon;
      case 'doc':
        return docIcon;
      case 'jpg':
        return jpgIcon;
      case 'pdf':
        return pdfIcon;
      case 'png':
        return pngIcon;
      case 'ppt':
        return pptIcon;
      case 'xls':
        return xlsIcon;
      default:
        return '';
    }
  };
  return (
    <tr key={key}>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center">
          <img
            alt="file icon"
            className="w-12 h-12"
            src={getIcon(fileType || '')}
          />
          <div className="text-sm text-gray-700 ml-4">{name}</div>
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700">
          {parentId ? `Folder ${parentId}` : '-'}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700">{updatedDate || '-'}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700 relative">
          {users.map((user: any, index: number) => (
            <div
              key={user.id}
              className="inline-block rounded-full h-8 w-8 mr-2"
              style={{ position: 'absolute', left: `${index * -10}px` }}
            >
              <img
                className="rounded-full h-8 w-8"
                src={`https://i.pravatar.cc/50?u=${user.email}`}
                alt={`Avatar for ${user.name}`}
              />
            </div>
          ))}
        </div>
      </td>

      <td>
        <div ref={actionMenuRef} className="relative">
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => setOpenActionMenu(!openActionMenu)}
          >
            <EllipsisVerticalIcon width={24} height={24} />
          </button>
          {openActionMenu && (
            <Dropdown items={filesMenus} handleClick={() => null} />
          )}
        </div>
      </td>
    </tr>
  );
}
