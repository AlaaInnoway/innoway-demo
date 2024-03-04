import {
  EyeIcon,
  PencilSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const activityMenus = [
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

export default activityMenus;