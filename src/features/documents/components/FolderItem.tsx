import { ChevronDownIcon } from '@heroicons/react/24/outline';
import folderIcon from '../assets/folder.svg';

function getFolderContents(folder: any) {
  return folder.children?.filter((document: any) => !document.type);
}

function FolderItem({ folder, toggleFolder, updateFolderContent }: any) {
  return (
    <li key={folder.name} className="cursor-pointer text-xs">
      <button
        type="button"
        onClick={() =>
          getFolderContents(folder).length > 0
            ? toggleFolder(folder)
            : updateFolderContent(folder)
        }
        className={`${
          false && 'font-medium'
        } flex items-center justify-between py-1 text-gray-500`}
      >
        <div className="flex items-center space-x-2">
          <ChevronDownIcon
            width={12}
            height={12}
            className={`duration-700 ${folder.expanded && 'rotate-180'} ${
              !getFolderContents(folder).length && 'invisible'
            }`}
          />
          <img src={folderIcon} alt="Folder" width={24} height={24} />
          <span className="origin-left duration-200">{folder.name}</span>
        </div>
      </button>
      <ul
        className={`${
          !getFolderContents(folder).length || !folder.expanded ? 'h-0' : 'my-3'
        } relative duration-500 overflow-auto pl-5 space-y-4`}
      >
        {getFolderContents(folder) &&
          getFolderContents(folder).map((childFolder: any) => (
            <FolderItem
              key={childFolder.name}
              folder={childFolder}
              toggleFolder={toggleFolder}
              updateFolderContent={updateFolderContent}
            />
          ))}
      </ul>
    </li>
  );
}

export default FolderItem;
