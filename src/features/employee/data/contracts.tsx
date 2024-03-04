const contracts = [
  {
    id: 1,
    name: 'Employment Contract - Katrina West',
    type: {
      id: 1,
      name: 'Full-time',
    },
    stage: {
      id: 3,
      name: 'Active',
      sequence: 3,
      color: 'green',
    },
    startDate: '2023-08-15',
    endDate: '2025-08-15',
    duration: '2 Years',
    employee: {
      id: 2,
      name: 'Katrina West',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-11.jpg',
      department: {
        id: 1,
        name: 'Human Resources',
      },
      jobTitle: {
        id: 1,
        name: 'HR Manager',
      },
      email: 'katrina.west@diversity.com',
      phone: '(052)-747-5542',
      mobile: '(052)-682-2241',
      status: {
        id: 1,
        name: 'Active',
        color: 'green',
      },
    },
    baseSalary: '$80,000 per year',
    bonuses: '$5,000 per year',
    deductions: '$2,000 per year',
    terms: [
      {
        id: 1,
        name: 'Working hours: 40 hours per week',
      },
      {
        id: 2,
        name: 'Probation period: 3 months',
      },
      {
        id: 3,
        name: 'Confidentiality agreement: Yes',
      },
    ],
    benefits: [
      {
        id: 1,
        name: 'Health insurance coverage',
      },
      {
        id: 2,
        name: 'Retirement savings plan',
      },
      {
        id: 3,
        name: 'Paid time off (PTO)',
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 2,
    name: 'Employment Contract - Derrick Simmons',
    type: {
      id: 2,
      name: 'Part-time',
    },
    stage: {
      id: 4,
      name: 'Terminated',
      sequence: 4,
      color: 'pink',
    },
    startDate: '2022-02-15',
    endDate: '2023-02-15',
    duration: '1 Year',
    employee: {
      id: 3,
      name: 'Derrick Simmons',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-17.jpg',
      department: {
        id: 4,
        name: 'Sales',
      },
      jobTitle: {
        id: 2,
        name: 'Account Manager',
      },
      email: 'derrick.simmons@associates.com',
      phone: '(350)-813-3861',
      mobile: '(350)-181-3749',
      status: {
        id: 3,
        name: 'Terminated',
        color: 'pink',
      },
    },
    baseSalary: '$80,000 per year',
    bonuses: '$5,000 per year',
    deductions: '$2,000 per year',
    terms: [
      {
        id: 1,
        name: 'Working hours: 40 hours per week',
      },
      {
        id: 2,
        name: 'Probation period: 3 months',
      },
      {
        id: 3,
        name: 'Confidentiality agreement: Yes',
      },
    ],
    benefits: [
      {
        id: 1,
        name: 'Health insurance coverage',
      },
      {
        id: 2,
        name: 'Retirement savings plan',
      },
      {
        id: 3,
        name: 'Paid time off (PTO)',
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 3,
    name: 'Employment Contract - Simon Helberg',
    type: {
      id: 3,
      name: 'Contract',
    },
    stage: {
      id: 3,
      name: 'Active',
      sequence: 3,
      color: 'green',
    },
    startDate: '2021-09-04',
    endDate: '2024-09-04',
    duration: '3 Years',
    employee: {
      id: 8,
      name: 'Simon Helberg',
      img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
      department: {
        id: 6,
        name: 'Operations',
      },
      jobTitle: {
        id: 8,
        name: 'Operation Manager',
      },
      email: 'simon.helberg@neway-solutions.com',
      phone: '(381)-627-2351',
      mobile: '(381)-611-2095',
      status: {
        id: 1,
        name: 'Active',
        color: 'green',
      },
    },
    baseSalary: '$80,000 per year',
    bonuses: '$5,000 per year',
    deductions: '$2,000 per year',
    terms: [
      {
        id: 1,
        name: 'Working hours: 40 hours per week',
      },
      {
        id: 2,
        name: 'Probation period: 3 months',
      },
      {
        id: 3,
        name: 'Confidentiality agreement: Yes',
      },
    ],
    benefits: [
      {
        id: 1,
        name: 'Health insurance coverage',
      },
      {
        id: 2,
        name: 'Retirement savings plan',
      },
      {
        id: 3,
        name: 'Paid time off (PTO)',
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 4,
    name: 'Employment Contract - Joe Perkins',
    type: {
      id: 3,
      name: 'Contract',
    },
    stage: {
      id: 2,
      name: 'Pending Approval',
      sequence: 2,
      color: 'purple',
    },
    startDate: '2019-07-01',
    endDate: '2023-07-01',
    duration: '4 Years',
    employee: {
      id: 7,
      name: 'Joe Perkins',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-14.jpg',
      department: {
        id: 2,
        name: 'Finance',
      },
      jobTitle: {
        id: 6,
        name: 'Financial Manager',
      },
      email: 'joe.perkins@neway-solutions.com',
      phone: '(381)-627-2351',
      mobile: '(381)-611-2095',
      status: {
        id: 2,
        name: 'On Leave',
        color: 'orange',
      },
    },
    baseSalary: '$80,000 per year',
    bonuses: '$5,000 per year',
    deductions: '$2,000 per year',
    terms: [
      {
        id: 1,
        name: 'Working hours: 40 hours per week',
      },
      {
        id: 2,
        name: 'Probation period: 3 months',
      },
      {
        id: 3,
        name: 'Confidentiality agreement: Yes',
      },
    ],
    benefits: [
      {
        id: 1,
        name: 'Health insurance coverage',
      },
      {
        id: 2,
        name: 'Retirement savings plan',
      },
      {
        id: 3,
        name: 'Paid time off (PTO)',
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 5,
    name: 'Employment Contract - Lance Tucker',
    type: {
      id: 3,
      name: 'Contract',
    },
    stage: {
      id: 3,
      name: 'Active',
      sequence: 3,
      color: 'green',
    },
    startDate: '2017-05-18',
    endDate: '2024-05-18',
    duration: '7 Years',
    employee: {
      id: 4,
      name: 'Lance Tucker',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-12.jpg',
      department: {
        id: 6,
        name: 'Operations',
      },
      jobTitle: {
        id: 3,
        name: 'Buiness Manager',
      },
      email: 'lance.tucker@abstract.com',
      phone: '(040)-129-7702',
      mobile: '(040)-123-6950',
      status: {
        id: 1,
        name: 'Active',
        color: 'green',
      },
    },
    baseSalary: '$80,000 per year',
    bonuses: '$5,000 per year',
    deductions: '$2,000 per year',
    terms: [
      {
        id: 1,
        name: 'Working hours: 40 hours per week',
      },
      {
        id: 2,
        name: 'Probation period: 3 months',
      },
      {
        id: 3,
        name: 'Confidentiality agreement: Yes',
      },
    ],
    benefits: [
      {
        id: 1,
        name: 'Health insurance coverage',
      },
      {
        id: 2,
        name: 'Retirement savings plan',
      },
      {
        id: 3,
        name: 'Paid time off (PTO)',
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 6,
    name: 'Employment Contract - Samantha Shelton',
    type: {
      id: 2,
      name: 'Part-time',
    },
    stage: {
      id: 1,
      name: 'Draft',
      sequence: 1,
      color: 'yellow',
    },
    startDate: '2020-07-01',
    endDate: '2023-07-01',
    duration: '3 Years',
    employee: {
      id: 5,
      name: 'Samantha Shelton',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-7.jpg',
      department: {
        id: 9,
        name: 'Research and Development',
      },
      jobTitle: {
        id: 5,
        name: 'Buiness Analyst',
      },
      email: 'samantha.shelton@square.com',
      phone: '(727)-810-3880',
      mobile: '(727)-820-3750',
      status: {
        id: 2,
        name: 'On Leave',
        color: 'orange',
      },
    },
    baseSalary: '$80,000 per year',
    bonuses: '$5,000 per year',
    deductions: '$2,000 per year',
    terms: [
      {
        id: 1,
        name: 'Working hours: 40 hours per week',
      },
      {
        id: 2,
        name: 'Probation period: 3 months',
      },
      {
        id: 3,
        name: 'Confidentiality agreement: Yes',
      },
    ],
    benefits: [
      {
        id: 1,
        name: 'Health insurance coverage',
      },
      {
        id: 2,
        name: 'Retirement savings plan',
      },
      {
        id: 3,
        name: 'Paid time off (PTO)',
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 7,
    name: 'Employment Contract - Raul Bradley',
    type: {
      id: 1,
      name: 'Full-time',
    },
    stage: {
      id: 4,
      name: 'Terminated',
      sequence: 4,
      color: 'pink',
    },
    startDate: '2023-08-16',
    endDate: '2025-08-16',
    duration: '2 Years',
    employee: {
      id: 6,
      name: 'Raul Bradley',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-4.jpg',
      department: {
        id: 7,
        name: 'Customer Service',
      },
      jobTitle: {
        id: 4,
        name: 'Customer Support',
      },
      email: 'raul.brad@fly-check.com',
      phone: '(381)-537-4436',
      mobile: '(381)-491-2260',
      status: {
        id: 3,
        name: 'Terminated',
        color: 'pink',
      },
    },
    baseSalary: '$80,000 per year',
    bonuses: '$5,000 per year',
    deductions: '$2,000 per year',
    terms: [
      {
        id: 1,
        name: 'Working hours: 40 hours per week',
      },
      {
        id: 2,
        name: 'Probation period: 3 months',
      },
      {
        id: 3,
        name: 'Confidentiality agreement: Yes',
      },
    ],
    benefits: [
      {
        id: 1,
        name: 'Health insurance coverage',
      },
      {
        id: 2,
        name: 'Retirement savings plan',
      },
      {
        id: 3,
        name: 'Paid time off (PTO)',
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
];

export default contracts;
