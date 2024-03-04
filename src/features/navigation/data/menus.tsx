import {
  UserIcon,
  QuestionMarkCircleIcon,
  ArrowLeftEndOnRectangleIcon,
} from '@heroicons/react/24/outline';

export const userMenus = [
  {
    id: 1,
    name: 'Profile',
    url: '/profile',
    icon: <UserIcon width={16} height={16} />,
  },
  {
    id: 2,
    name: 'Help',
    url: '/help',
    icon: <QuestionMarkCircleIcon width={16} height={16} />,
  },
  {
    id: 3,
    name: 'Sign out',
    url: '/login',
    icon: <ArrowLeftEndOnRectangleIcon width={16} height={16} />,
  },
];
