const opportunities = [
  {
    id: 1,
    name: 'Neil Sims Inquiry',
    contact: {
      id: 1,
      name: 'Neil Sims',
      type: 'individual',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-20.jpg',
      organization: {
        id: 5,
        name: 'MazTech',
      },
      jobTitle: 'Social Media Manager',
      email: 'neil.sims@maztech.com',
      phone: '(01) 22 888 4444',
      mobile: '(01) 25 748 3110',
      street: 'Avinguda Gaudi',
      province: 'Barcelona',
      country: {
        id: 3,
        name: 'Spain',
      },
    },
    channel: {
      id: 1,
      name: 'Website',
    },
    stage: {
      id: 2,
      name: 'Negotiation',
      sequence: 2,
      color: 'orange',
    },
    subStage: {
      id: 2,
      name: 'Risk Assessment',
      sequence: 2,
    },
    expectedClosing: '2023-09-12',
    expectedRevenue: '$100,000',
    salesPerson: {
      id: 2,
      name: 'Henry Curtis',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
      salesTeam: {
        id: 1,
        name: 'Africa',
      },
    },
    priority: {
      id: 1,
      name: 'Low',
      sequence: 1,
    },
    probability: {
      id: 3,
      name: '50%',
    },
    budget: {
      id: 1,
      name: 'Less than $10,000',
    },
    decisionMaker: 'CTO',
    source: {
      id: 1,
      name: 'Word of Mouth',
    },
    interests: [
      {
        id: 1,
        name: 'Custom software development',
      },
    ],
    quotes: [
      {
        id: 1,
        name: 'S00001',
        totalAmount: '$370,000',
        createdDate: '2023-06-10',
        validityPeriod: '30 Days',
        stage: {
          id: 1,
          name: 'Draft',
          sequence: 1,
          color: 'purple',
        },
      },
    ],
    notes: [
      {
        id: 1,
        date: '10 June 2023',
        content: `
          - Provided positive feedback about our customer service during the last interaction.
          - Recently changed jobs, update the contact's job title and company information.
        `,
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        content: `
          - Prefers communication via email, do not contact via phone.
          - Potential referral source for new clients, maintain a good relationship.
        `,
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '17 August 2023',
        content: `
          - Interested in purchasing Product X, follow up in two weeks.
          - Met at the industry conference, discussed potential partnership opportunities.
        `,
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
    activities: [
      {
        id: 1,
        date: '10 June 2023',
        name: 'Schedule a meeting with Jane Smith to discuss upcoming project requirements.',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'Follow up on a sales inquiry from John Doe regarding Product X.',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Conduct a phone call with David Lee to provide a product demonstration.',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
    documents: [
      {
        id: 1,
        date: '10 June 2023',
        name: 'Performance_Review_Neil_Sims_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents_Neil_Sims.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract_Neil_Sims.docx',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Perkins Service Request',
    contact: {
      id: 7,
      name: 'Joe Perkins',
      type: 'individual',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-14.jpg',
      organization: {
        id: 1,
        name: 'NEWAY Solutions',
      },
      jobTitle: 'Co-Founder',
      email: 'joe.perkins@neway-solutions.com',
      phone: '(381)-627-2351',
      mobile: '(381)-611-2095',
      street: 'Golden Towers',
      province: 'Tunis',
      country: {
        id: 4,
        name: 'Tunisia',
      },
    },
    channel: {
      id: 2,
      name: 'Social Media',
    },
    stage: {
      id: 4,
      name: 'Decision',
      sequence: 4,
      color: 'purple',
    },
    subStage: {
      id: 1,
      name: 'Customer Decision',
      sequence: 1,
    },
    expectedClosing: '2023-11-03',
    expectedRevenue: '$500,000',
    salesPerson: {
      id: 3,
      name: 'Raul Bradley',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
      salesTeam: {
        id: 2,
        name: 'Europe',
      },
    },
    priority: {
      id: 2,
      name: 'Medium',
      sequence: 2,
    },
    probability: {
      id: 3,
      name: '75%',
    },
    budget: {
      id: 1,
      name: '$100,000 - $500,000',
    },
    decisionMaker: 'Marketing Director',
    source: {
      id: 2,
      name: 'Industry Publication',
    },
    interests: [
      {
        id: 2,
        name: 'Industry-specific solution',
      },
    ],
    quotes: [
      {
        id: 2,
        name: 'S00002',
        totalAmount: '$340,000',
        createdDate: '2023-07-15',
        validityPeriod: '30 Days',
        stage: {
          id: 2,
          name: 'Sent',
          sequence: 2,
          color: 'blue',
        },
      },
    ],
    notes: [
      {
        id: 1,
        date: '10 June 2023',
        content: `
          - Provided positive feedback about our customer service during the last interaction.
          - Recently changed jobs, update the contact's job title and company information.
        `,
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        content: `
          - Prefers communication via email, do not contact via phone.
          - Potential referral source for new clients, maintain a good relationship.
        `,
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '17 August 2023',
        content: `
          - Interested in purchasing Product X, follow up in two weeks.
          - Met at the industry conference, discussed potential partnership opportunities.
        `,
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
    activities: [
      {
        id: 1,
        date: '10 June 2023',
        name: 'Schedule a meeting with Jane Smith to discuss upcoming project requirements.',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'Follow up on a sales inquiry from John Doe regarding Product X.',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Conduct a phone call with David Lee to provide a product demonstration.',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
    documents: [
      {
        id: 1,
        date: '10 June 2023',
        name: 'Performance_Review_Neil_Sims_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents_Neil_Sims.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract_Neil_Sims.docx',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
  },
  {
    id: 3,
    name: 'West Partnership',
    contact: {
      id: 2,
      name: 'Katrina West',
      type: 'individual',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-11.jpg',
      organization: {
        id: 3,
        name: 'Cultural Diversity',
      },
      jobTitle: 'HR Manager',
      email: 'katrina.west@diversity.com',
      phone: '(052)-747-5542',
      mobile: '(052)-682-2241',
      street: 'Saint-Laurent',
      province: 'Montreal',
      country: {
        id: 6,
        name: 'Canada',
      },
    },
    channel: {
      id: 7,
      name: 'Partner Program',
    },
    stage: {
      id: 3,
      name: 'Closing',
      sequence: 3,
      color: 'green',
    },
    subStage: {
      id: 1,
      name: 'Quote Generation',
      sequence: 1,
    },
    expectedClosing: '2024-01-04',
    expectedRevenue: '$750,000',
    salesPerson: {
      id: 1,
      name: 'Rebecca Jones',
      img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
      salesTeam: {
        id: 3,
        name: 'Asia',
      },
    },
    priority: {
      id: 3,
      name: 'High',
      sequence: 3,
    },
    probability: {
      id: 3,
      name: '100%',
    },
    budget: {
      id: 5,
      name: '$500,000+',
    },
    decisionMaker: 'Operations Manager',
    source: {
      id: 5,
      name: 'Partner Referral',
    },
    interests: [
      {
        id: 1,
        name: 'Custom software development',
      },
    ],
    quotes: [
      {
        id: 3,
        name: 'S00003',
        totalAmount: '$275,000',
        createdDate: '2023-08-05',
        validityPeriod: '30 Days',
        stage: {
          id: 3,
          name: 'Accepted',
          sequence: 3,
          color: 'green',
        },
      },
    ],
    notes: [
      {
        id: 1,
        date: '10 June 2023',
        content: `
          - Provided positive feedback about our customer service during the last interaction.
          - Recently changed jobs, update the contact's job title and company information.
        `,
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        content: `
          - Prefers communication via email, do not contact via phone.
          - Potential referral source for new clients, maintain a good relationship.
        `,
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '17 August 2023',
        content: `
          - Interested in purchasing Product X, follow up in two weeks.
          - Met at the industry conference, discussed potential partnership opportunities.
        `,
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
    activities: [
      {
        id: 1,
        date: '10 June 2023',
        name: 'Schedule a meeting with Jane Smith to discuss upcoming project requirements.',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'Follow up on a sales inquiry from John Doe regarding Product X.',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Conduct a phone call with David Lee to provide a product demonstration.',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
    documents: [
      {
        id: 1,
        date: '10 June 2023',
        name: 'Performance_Review_Neil_Sims_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents_Neil_Sims.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract_Neil_Sims.docx',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
  },
  {
    id: 4,
    name: 'Shelton Collaboration',
    contact: {
      id: 5,
      name: 'Samantha Shelton',
      type: 'individual',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-7.jpg',
      organization: {
        id: 4,
        name: 'Square',
      },
      jobTitle: 'Business Analyst',
      email: 'samantha.shelton@square.com',
      phone: '(727)-810-3880',
      mobile: '(727)-820-3750',
      street: 'Passeig De Gracia',
      province: 'Barcelona',
      country: {
        id: 3,
        name: 'Spain',
      },
    },
    channel: {
      id: 1,
      name: 'Website',
    },
    stage: {
      id: 1,
      name: 'Proposal',
      sequence: 1,
      color: 'pink',
    },
    subStage: {
      id: 1,
      name: 'Conceptual Proposal',
      sequence: 1,
    },
    expectedClosing: '2023-08-27',
    expectedRevenue: '$500,000',
    salesPerson: {
      id: 2,
      name: 'Henry Curtis',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
      salesTeam: {
        id: 1,
        name: 'Africa',
      },
    },
    priority: {
      id: 4,
      name: 'Low',
      sequence: 1,
    },
    probability: {
      id: 3,
      name: '25%',
    },
    budget: {
      id: 2,
      name: '$10,000 - $50,000',
    },
    decisionMaker: 'CFO',
    source: {
      id: 4,
      name: 'Trade Association',
    },
    interests: [
      {
        id: 1,
        name: 'Custom software development',
      },
    ],
    quotes: [
      {
        id: 4,
        name: 'S00004',
        totalAmount: '$320,000',
        createdDate: '2023-08-12',
        validityPeriod: '15 Days',
        stage: {
          id: 2,
          name: 'Pending Review',
          sequence: 1,
          color: 'orange',
        },
      },
    ],
    notes: [
      {
        id: 1,
        date: '10 June 2023',
        content: `
          - Provided positive feedback about our customer service during the last interaction.
          - Recently changed jobs, update the contact's job title and company information.
        `,
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        content: `
          - Prefers communication via email, do not contact via phone.
          - Potential referral source for new clients, maintain a good relationship.
        `,
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '17 August 2023',
        content: `
          - Interested in purchasing Product X, follow up in two weeks.
          - Met at the industry conference, discussed potential partnership opportunities.
        `,
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
    activities: [
      {
        id: 1,
        date: '10 June 2023',
        name: 'Schedule a meeting with Jane Smith to discuss upcoming project requirements.',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'Follow up on a sales inquiry from John Doe regarding Product X.',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Conduct a phone call with David Lee to provide a product demonstration.',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
    documents: [
      {
        id: 1,
        date: '10 June 2023',
        name: 'Performance_Review_Neil_Sims_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents_Neil_Sims.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract_Neil_Sims.docx',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
  },
];
export default opportunities;
