import {
  ArrowDownOnSquareStackIcon,
  EyeIcon,
  PencilSquareIcon,
  ShareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const filesMenus = [
  {
    id: 1,
    name: 'Preview',
    url: '/preview',
    icon: <EyeIcon width={16} height={16} />,
  },
  {
    id: 2,
    name: 'Edit',
    url: '/edit',
    icon: <PencilSquareIcon width={16} height={16} />,
  },
  {
    id: 3,
    name: 'Remove',
    url: '/remove',
    icon: <XMarkIcon width={16} height={16} />,
  },
];

export default filesMenus;

export const fileActionMenus = [
  {
    id: 1,
    name: 'Download',
    url: '/document/file',
    icon: <ArrowDownOnSquareStackIcon width={16} height={16} />,
  },
  {
    id: 2,
    name: 'Share',
    url: '/document/file',
    icon: <ShareIcon width={16} height={16} />,
  },
  {
    id: 4,
    name: 'Remove',
    url: '/document/file',
    icon: <XMarkIcon width={16} height={16} />,
  },
];

export const folderActionMenus = [
  {
    id: 1,
    name: 'Download',
    url: '/document/folder',
    icon: <ArrowDownOnSquareStackIcon width={16} height={16} />,
  },
  {
    id: 2,
    name: 'Share',
    url: '/document/folder',
    icon: <ShareIcon width={16} height={16} />,
  },
  {
    id: 4,
    name: 'Remove',
    url: '/document/folder',
    icon: <XMarkIcon width={16} height={16} />,
  },
];

