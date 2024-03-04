import {
  Cog6ToothIcon,
  UserGroupIcon,
  Squares2X2Icon,
  ReceiptRefundIcon,
  EnvelopeOpenIcon,
  HeartIcon,
  BellAlertIcon,
  DocumentChartBarIcon,
  FolderOpenIcon,
  PuzzlePieceIcon,
  RectangleStackIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const homeMenus = [
  {
    name: 'Favorites',
    url: '/favorites',
    expanded: true,
    icon: <HeartIcon width={20} height={20} />,
  },
  {
    name: 'Reminders',
    url: '/reminders',
    expanded: false,
    icon: <BellAlertIcon width={20} height={20} />,
  },
  {
    name: 'Tasks',
    url: '/tasks',
    icon: <PuzzlePieceIcon width={20} height={20} />,
  },
  {
    name: 'Documents',
    url: '/documents',
    expanded: false,
    icon: <FolderOpenIcon width={20} height={20} />,
  },
  {
    name: 'Reporting',
    url: '/reporting',
    expanded: false,
    icon: <DocumentChartBarIcon width={20} height={20} />,
    children: [
      {
        name: 'Reporting 1',
        url: '/reporting/reporting-1',
      },
      {
        name: 'Reporting 2',
        url: '/reporting/reporting-2',
      },
    ],
  },
];

const dashboardMenus = [
  {
    name: 'Templates',
    url: '/templates',
    expanded: false,
    icon: <Squares2X2Icon width={20} height={20} />,
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    expanded: false,
    icon: <Squares2X2Icon width={20} height={20} />,
    children: [
      {
        name: 'HR Performance Management',
        url: '/dashboard/1',
      },
      {
        name: 'Project Management',
        url: '/dashboard/2',
      },
    ],
  },
  {
    name: 'Settings',
    url: '/dashboard-setting',
    expanded: true,
    icon: <Cog6ToothIcon width={20} height={20} />,
    children: [
      {
        name: 'Palette',
        url: '/dashboard-setting/palette',
      },
      {
        name: 'Chart Type',
        url: '/dashboard-setting/chart',
      },
      {
        name: 'Export Format',
        url: '/dashboard-setting/export-format',
      },
    ],
  },
];

const documentMenus = [
  {
    name: 'Explorer',
    url: '/document-explorer',
    icon: <RectangleStackIcon width={20} height={20} />,
  },
  {
    name: 'Files',
    url: '/document-file',
    icon: <DocumentTextIcon width={20} height={20} />,
  },
  {
    name: 'Settings',
    url: '/document-setting',
    expanded: false,
    icon: <Cog6ToothIcon width={20} height={20} />,
    children: [],
  },
];

const scheduleMenus = [
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

const emailMenus = [
  {
    name: 'Inbox',
    url: '/inbox',
    expanded: false,
    icon: <Squares2X2Icon width={20} height={20} />,
  },
  {
    name: 'Starred',
    url: '/starred',
    expanded: false,
    icon: <HeartIcon width={20} height={20} />,
  },
  {
    name: 'Sent',
    url: '/sent',
    expanded: false,
    icon: <ArrowPathIcon width={20} height={20} />,
  },
  {
    name: 'Drafts',
    url: '/drafts',
    expanded: false,
    icon: <ClockIcon width={20} height={20} />,
  },
  {
    name: 'Contacts',
    url: '/contacts',
    expanded: false,
    icon: <UserGroupIcon width={20} height={20} />,
  },
  {
    name: 'Documents',
    url: '/documents',
    expanded: false,
    icon: <FolderOpenIcon width={20} height={20} />,
  },
];

const crmMenus = [
  {
    name: 'Contacts',
    url: '/contact',
    expanded: false,
    icon: <UserGroupIcon width={20} height={20} />,
    children: [
      {
        name: 'Organizations',
        url: '/contact/organization',
      },
      {
        name: 'Individuals',
        url: '/contact/individual',
      },
    ],
  },
  {
    name: 'Pipeline',
    url: '/pipeline',
    expanded: false,
    icon: <ReceiptRefundIcon width={20} height={20} />,
    children: [
      {
        name: 'Leads',
        url: '/pipeline/lead',
      },
      {
        name: 'Opportunities',
        url: '/pipeline/opportunity',
      },
    ],
  },
  {
    name: 'Sales',
    url: '/sales',
    expanded: false,
    icon: <ReceiptRefundIcon width={20} height={20} />,
    children: [
      {
        name: 'Salesperson',
        url: '/sales/salesperson',
      },
      {
        name: 'Sales Teams',
        url: '/sales/sales-team',
      },
    ],
  },
  {
    name: 'Emails',
    url: '/emails',
    expanded: false,
    icon: <EnvelopeOpenIcon width={20} height={20} />,
  },
  {
    name: 'Setting',
    url: '/setting',
    expanded: false,
    icon: <Cog6ToothIcon width={20} height={20} />,
    children: [
      {
        name: 'Industries',
        url: '/setting/industries',
      },
      {
        name: 'Sources',
        url: '/setting/sources',
      },
      {
        name: 'Campaigns',
        url: '/setting/campaigns',
      },
    ],
  },
];

const salesMenus = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    expanded: false,
    icon: <Squares2X2Icon width={20} height={20} />,
  },
  {
    name: 'Customers',
    url: '/customers',
    expanded: false,
    icon: <UserGroupIcon width={20} height={20} />,
    children: [
      {
        name: 'Organizations',
        url: '/customers/organization',
      },
      {
        name: 'Individuals',
        url: '/customers/individual',
      },
    ],
  },
  {
    name: 'Orders',
    url: '/orders',
    expanded: false,
    icon: <DocumentTextIcon width={20} height={20} />,
    children: [
      {
        name: 'Quotes',
        url: '/orders/quote',
      },
      {
        name: 'Orders',
        url: '/orders/order',
      },
    ],
  },
  {
    name: 'Sales',
    url: '/sales',
    expanded: false,
    icon: <ReceiptRefundIcon width={20} height={20} />,
    children: [
      {
        name: 'Salesperson',
        url: '/sales/salesperson',
      },
      {
        name: 'Sales Teams',
        url: '/sales/sales-team',
      },
    ],
  },
  {
    name: 'Products',
    url: '/products',
    expanded: false,
    icon: <DocumentTextIcon width={20} height={20} />,
    children: [
      {
        name: 'Products',
        url: '/products/products',
      },
      {
        name: 'Variants',
        url: '/products/variants',
      },
    ],
  },
  {
    name: 'Setting',
    url: '/setting',
    expanded: false,
    icon: <Cog6ToothIcon width={20} height={20} />,
    children: [],
  },
];

const invoicingMenus = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    expanded: false,
    icon: <Squares2X2Icon width={20} height={20} />,
  },
  {
    name: 'Customers',
    url: '/customers',
    expanded: false,
    icon: <UserGroupIcon width={20} height={20} />,
    children: [
      {
        name: 'Organizations',
        url: '/customers/organization',
      },
      {
        name: 'Individuals',
        url: '/customers/individual',
      },
      {
        name: 'Invoices',
        url: '/customers/invoices',
      },
      {
        name: 'Payments',
        url: '/customers/payments',
      },
      {
        name: 'Products',
        url: '/customers/products',
      },
    ],
  },
  {
    name: 'Vendors',
    url: '/vendors',
    expanded: false,
    icon: <UserGroupIcon width={20} height={20} />,
    children: [
      {
        name: 'Organizations',
        url: '/vendors/organization',
      },
      {
        name: 'Individuals',
        url: '/vendors/individual',
      },
      {
        name: 'Invoices',
        url: '/vendors/invoices',
      },
      {
        name: 'Payments',
        url: '/vendors/payments',
      },
      {
        name: 'Products',
        url: '/vendors/products',
      },
    ],
  },
  {
    name: 'Setting',
    url: '/setting',
    expanded: false,
    icon: <Cog6ToothIcon width={20} height={20} />,
    children: [],
  },
];

const hrMenus = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    expanded: false,
    icon: <Squares2X2Icon width={20} height={20} />,
  },
  {
    name: 'Profiles',
    url: '/profiles',
    expanded: false,
    icon: <UserGroupIcon width={20} height={20} />,
  },
  {
    name: 'Departments',
    url: '/departments',
    expanded: false,
    icon: <ClipboardDocumentCheckIcon width={20} height={20} />,
  },
  {
    name: 'Contracts',
    url: '/contracts',
    expanded: false,
    icon: <DocumentMagnifyingGlassIcon width={20} height={20} />,
  },
  {
    name: 'Documents',
    url: '/documents',
    icon: <RectangleStackIcon width={20} height={20} />,
  },
  {
    name: 'Setting',
    url: '/setting',
    expanded: false,
    icon: <Cog6ToothIcon width={20} height={20} />,
    children: [
      {
        name: 'Job Titles',
        url: '/setting/job-title',
      },
    ],
  },
];

const lifecycleMenus = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    expanded: false,
    icon: <Squares2X2Icon width={20} height={20} />,
  },
  {
    name: 'Onboarding',
    url: '/onboarding',
    expanded: false,
    icon: <ArrowPathIcon width={20} height={20} />,
    children: [
      {
        name: 'Process',
        url: '/onboarding/process',
      },
      {
        name: 'Tasks',
        url: '/onboarding/tasks',
      },
    ],
  },
  {
    name: 'Offboarding',
    url: '/offboarding',
    expanded: false,
    icon: <ArrowPathIcon width={20} height={20} />,
    children: [
      {
        name: 'Process',
        url: '/offboarding/process',
      },
      {
        name: 'Tasks',
        url: '/offboarding/tasks',
      },
    ],
  },
  {
    name: 'Documents',
    url: '/documents',
    expanded: false,
    icon: <Squares2X2Icon width={20} height={20} />,
  },
  {
    name: 'Setting',
    url: '/setting',
    expanded: false,
    icon: <Cog6ToothIcon width={20} height={20} />,
    children: [],
  },
];

const timeOffMenus = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    expanded: false,
    icon: <Squares2X2Icon width={20} height={20} />,
  },
  {
    name: 'Leave',
    url: '/leaves',
    expanded: false,
    icon: <ClockIcon width={20} height={20} />,
  },
  {
    name: 'Remote Work',
    url: '/remote',
    expanded: false,
    icon: <ClockIcon width={20} height={20} />,
  },
  {
    name: 'Documents',
    url: '/documents',
    expanded: false,
    icon: <Squares2X2Icon width={20} height={20} />,
  },
  {
    name: 'Setting',
    url: '/setting',
    expanded: false,
    icon: <Cog6ToothIcon width={20} height={20} />,
    children: [],
  },
];

export default {
  'home': homeMenus,
  'dashboard': dashboardMenus,
  'document': documentMenus,
  'schedule': scheduleMenus,
  'email': emailMenus,
  'crm': crmMenus,
  'sales': salesMenus,
  'invoicing': invoicingMenus,
  'hr': hrMenus,
  'lifecycle': lifecycleMenus,
  'timeOff': timeOffMenus,
};
