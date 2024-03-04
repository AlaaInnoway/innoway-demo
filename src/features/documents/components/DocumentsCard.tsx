import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import documents from '../data/documents';
import folderIcon from '../utils/folder.svg';
import { LinkButton } from '../../../components/ui/Link';
import Card from '../../../components/ui/Card';

export default function DocumentsCard() {
  const folders = documents
    .filter((item) => item.type?.name === 'folder')
    .slice(0, 5);
  return (
    <div className="max-h-full">
      <Card>
        <h2 className="flex-auto text-sm font-medium text-gray-700 flex items-center justify-between">
          <span>Folders</span>
          <LinkButton url="/document/all">
            <span>View all folders</span>
            <ArrowLongRightIcon width={20} height={20} />
          </LinkButton>
        </h2>
        <div className="flex flex-wrap gap-4 justify-around">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img src={folderIcon} alt="PNG icon" className="w-12 h-12" />
              <div className="flex-1">
                <div className="text-sm text-gray-700">{folder.name}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
