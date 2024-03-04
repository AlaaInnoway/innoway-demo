import {
  ArrowDownOnSquareIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export const paletteMenus = [
  {
    id: 1,
    name: 'Royal Lavender',
    theme: 'purple',
    url: '/purple',
    icon: <div className="bg-purple-400 w-2 h-2 rounded-lg" />,
    colors: ['#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea'],
    tileColors: ['#faf5ff', '#9333ea'],
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    theme: 'blue',
    url: '/blue',
    icon: <div className="bg-blue-400 w-2 h-2 rounded-lg" />,
    colors: ['#3783eb', '#d5e6ff', '#b4d3ff', '#2162bb', '#0b4799'],
    tileColors: ['#f0f9ff', '#1d4ed8'],
  },
  {
    id: 3,
    name: 'Emerald Dream',
    theme: 'green',
    url: '/green',
    icon: <div className="bg-emerald-400 w-2 h-2 rounded-lg" />,
    colors: ['#ccfbf1', '#5eead4', '#2dd4bf', '#0d9488', '#115e59'],
    tileColors: ['#ecfdf5', '#059669'],
  },
  {
    id: 4,
    name: 'Golden Harvest',
    theme: 'yellow',
    url: '/yellow',
    icon: <div className="bg-yellow-300 w-2 h-2 rounded-lg" />,
    colors: ['#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#d97706'],
    tileColors: ['#fef3c7', '#d97706'],
  },
  {
    id: 5,
    name: 'Fiery Blaze',
    theme: 'orange',
    url: '/orange',
    icon: <div className="bg-amber-400 w-2 h-2 rounded-lg" />,
    colors: ['#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#ea580c'],
    tileColors: ['#ffedd5', '#ea580c'],
  },
  {
    id: 6,
    name: 'Peony Perfection',
    theme: 'pink',
    url: '/pink',
    icon: <div className="bg-pink-400 w-2 h-2 rounded-lg" />,
    colors: ['#fce7f3', '#fbcfe8', '#f9a8d4', '#ec4899', '#db2777'],
    tileColors: ['#fce7f3', '#db2777'],
  },
  {
    id: 7,
    name: 'Scarlet Flame',
    theme: 'red',
    url: '/red',
    icon: <div className="bg-red-500 w-2 h-2 rounded-lg" />,
    colors: ['#fee2e2', '#fca5a5', '#f87171', '#ef4444', '#b91c1c'],
    tileColors: ['#fee2e2', '#b91c1c'],
  },
];

export const actionMenus = [
  {
    id: 1,
    name: 'Export',
    url: '/export',
    icon: <ArrowDownOnSquareIcon width={16} height={16} />,
  },
  {
    id: 2,
    name: 'Edit',
    url: '/edit',
    icon: <PencilSquareIcon width={16} height={16} />,
  },
  {
    id: 3,
    name: 'Duplicate',
    url: '/duplicate',
    icon: <DocumentDuplicateIcon width={16} height={16} />,
  },
  {
    id: 4,
    name: 'Remove',
    url: '/remove',
    icon: <XMarkIcon width={16} height={16} />,
  },
];

