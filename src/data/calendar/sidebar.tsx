import {
  Cog6ToothIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';

const appMenus = [
  {
    name: 'Calendar',
    url: '/calendar',
    icon: <RectangleStackIcon width={20} height={20} />,
  },
  {
    name: 'Reminders',
    url: '/reminders',
    icon: <DocumentTextIcon width={20} height={20} />,
  },
  {
    name: 'Tasks',
    url: '/tasks',
    icon: <PuzzlePieceIcon width={20} height={20} />,
  },
  {
    name: 'Settings',
    url: '/schedule-setting',
    expanded: false,
    icon: <Cog6ToothIcon width={20} height={20} />,
    children: [],
  },
];

export default appMenus;
