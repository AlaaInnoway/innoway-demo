import {
  DocumentMagnifyingGlassIcon,
  UserGroupIcon,
  RectangleStackIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

const icons = [
  {
    id: 1,
    name: 'document',
    icon: <DocumentMagnifyingGlassIcon width={16} height={16} />,
    preview: <DocumentMagnifyingGlassIcon width={32} height={32} />,
  },
  {
    id: 2,
    name: 'user',
    icon: <UserGroupIcon width={16} height={16} />,
    preview: <UserGroupIcon width={32} height={32} />,
  },
  {
    id: 3,
    name: 'folders',
    icon: <RectangleStackIcon width={16} height={16} />,
    preview: <RectangleStackIcon width={32} height={32} />,
  },
  {
    id: 4,
    name: 'shopping',
    icon: <ShoppingCartIcon width={16} height={16} />,
    preview: <ShoppingCartIcon width={32} height={32} />,
  },
];
export default icons;
