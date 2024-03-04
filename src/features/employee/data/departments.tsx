const departments = [
  {
    id: 1,
    name: 'Human Resources',
    head: {
      id: 2,
      name: 'Katrina West',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-11.jpg',
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
    description:
      "Responsible for managing employee recruitment, onboarding, benefits, performance management, and employee relations. HR ensures the organization's workforce is well-supported and aligned with business objectives.",
    employees: [
      {
        id: 2,
        name: 'Katrina West',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-11.jpg',
        supervisor: {
          id: 8,
          name: 'Simon Helberg',
          img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
        },
        jobTitle: {
          id: 1,
          name: 'HR Manager',
        },
        email: 'katrina.west@diversity.com',
        phone: '(052)-747-5542',
        status: {
          id: 1,
          name: 'Active',
          color: 'green',
        },
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 2,
    name: 'Finance',
    head: {
      id: 7,
      name: 'Joe Perkins',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-14.jpg',
      jobTitle: {
        id: 6,
        name: 'Financial Manager',
      },
      email: 'joe.perkins@neway-solutions.com',
      phone: '(381)-627-2351',
      mobile: '(381)-611-2095',
    },
    description:
      "Manages the company's financial activities, including budgeting, accounting, financial analysis, and financial reporting. Finance plays a crucial role in tracking and optimizing the organization's financial health.",
    employees: [
      {
        id: 7,
        name: 'Joe Perkins',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-14.jpg',
        supervisor: {
          id: 8,
          name: 'Simon Helberg',
          img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
        },
        jobTitle: {
          id: 6,
          name: 'Financial Manager',
        },
        email: 'joe.perkins@neway-solutions.com',
        phone: '(381)-627-2351',
        status: {
          id: 2,
          name: 'On Leave',
          color: 'orange',
        },
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 3,
    name: 'Information Technology',
    head: null,
    description:
      "Handles the organization's technology infrastructure, network administration, software development, technical support, and cybersecurity. IT ensures smooth functioning and security of technology systems.",
    employees: [],
  },
  {
    id: 4,
    name: 'Sales',
    head: {
      id: 3,
      name: 'Derrick Simmons',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-17.jpg',
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
    description:
      'Focuses on generating revenue through selling products or services to clients or customers. Sales teams are crucial in driving business growth and building strong customer relationships.',
    employees: [
      {
        id: 3,
        name: 'Derrick Simmons',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-17.jpg',
        supervisor: {
          id: 8,
          name: 'Simon Helberg',
          img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
        },
        jobTitle: {
          id: 2,
          name: 'Account Manager',
        },
        email: 'derrick.simmons@associates.com',
        phone: '(350)-813-3861',
        status: {
          id: 3,
          name: 'Terminated',
          color: 'pink',
        },
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 5,
    name: 'Marketing',
    head: {
      id: 8,
      name: 'Simon Helberg',
      img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
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
    description:
      "Plans and executes marketing strategies to promote the organization's products or services and attract new customers. Marketing drives brand awareness and customer engagement.",
    employees: [
      {
        id: 8,
        name: 'Simon Helberg',
        img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
        supervisor: null,
        jobTitle: {
          id: 8,
          name: 'Operation Manager',
        },
        email: 'simon.helberg@neway-solutions.com',
        phone: '(381)-627-2351',
        status: {
          id: 1,
          name: 'Active',
          color: 'green',
        },
      },
      {
        id: 1,
        name: 'Neil Sims',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-20.jpg',
        supervisor: {
          id: 8,
          name: 'Simon Helberg',
          img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
        },
        jobTitle: {
          id: 7,
          name: 'Social Media Manager',
        },
        email: 'neil.sims@maztech.com',
        phone: '(01) 22 888 4444',
        status: {
          id: 1,
          name: 'Active',
          color: 'green',
        },
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 6,
    name: 'Operations',
    head: {
      id: 4,
      name: 'Lance Tucker',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-12.jpg',
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
    description:
      'Oversee the day-to-day operations of the business, ensuring smooth processes and efficient production or service delivery. Operations play a vital role in streamlining business activities.',
    employees: [
      {
        id: 4,
        name: 'Lance Tucker',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-12.jpg',
        supervisor: {
          id: 8,
          name: 'Simon Helberg',
          img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
        },
        jobTitle: {
          id: 3,
          name: 'Buiness Manager',
        },
        email: 'lance.tucker@abstract.com',
        phone: '(040)-129-7702',
        status: {
          id: 1,
          name: 'Active',
          color: 'green',
        },
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 7,
    name: 'Customer Service',
    head: {
      id: 6,
      name: 'Raul Bradley',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-4.jpg',
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
    description:
      'Provides support and assistance to customers, addressing inquiries, resolving issues, and ensuring customer satisfaction. Customer service teams are essential in maintaining positive customer experiences.',
    employees: [
      {
        id: 6,
        name: 'Raul Bradley',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-4.jpg',
        supervisor: {
          id: 8,
          name: 'Simon Helberg',
          img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
        },
        jobTitle: {
          id: 4,
          name: 'Customer Support',
        },
        email: 'raul.brad@fly-check.com',
        phone: '(381)-537-4436',
        status: {
          id: 1,
          name: 'Active',
          color: 'green',
        },
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
  {
    id: 8,
    name: 'Administration',
    head: null,
    description:
      'Handles administrative tasks, including office management, record-keeping, and general support for other departments. Administration ensures smooth functioning of various organizational processes.',
    employees: [],
  },
  {
    id: 9,
    name: 'Research and Development',
    head: {
      id: 5,
      name: 'Samantha Shelton',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-7.jpg',
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
    description:
      'Focuses on innovation and creating new products, services, or technologies for the organization. R&D is crucial for staying competitive and driving continuous improvement.',
    employees: [
      {
        id: 5,
        name: 'Samantha Shelton',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-7.jpg',
        supervisor: {
          id: 8,
          name: 'Simon Helberg',
          img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
        },
        jobTitle: {
          id: 5,
          name: 'Buiness Analyst',
        },
        email: 'samantha.shelton@square.com',
        phone: '(727)-810-3880',
        status: {
          id: 2,
          name: 'On Leave',
          color: 'orange',
        },
      },
    ],
    notes: [],
    activities: [],
    documents: [],
  },
];
export default departments;
