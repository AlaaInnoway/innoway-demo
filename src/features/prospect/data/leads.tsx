const leads = [
  {
    id: 1,
    name: 'Maztech Service Request',
    contact: {
      id: 5,
      name: 'MazTech',
      type: 'organization',
      img: 'https://img.freepik.com/premium-psd/white-wall-logo-mockup-template_528542-759.jpg?w=996',
      email: 'info@maztech.com',
      phone: '(01) 22 888 4444',
      industry: {
        id: 1,
        name: 'IT & Consulting',
      },
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
      name: 'Qualification',
      sequence: 2,
      color: 'green',
    },
    subStage: {
      id: 1,
      name: 'Needs Assessment',
      sequence: 1,
    },
    expectedConversion: '2023-09-12',
    potentialRevenue: '$100,000',
    assignee: {
      id: 2,
      name: 'Henry Curtis',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
    },
    priority: {
      id: 1,
      name: 'Low',
      sequence: 1,
    },
    score: '29',
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
    campaign: {
      id: 1,
      name: 'Summer Sale',
    },
    interests: [
      {
        id: 1,
        name: 'Custom software development',
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
    name: 'Flycheck Marketing Collaboration',
    contact: {
      id: 6,
      name: 'FlyCheck',
      type: 'organization',
      img: 'https://img.freepik.com/premium-vector/double-check-modern-logo-icon-business-technology-digital-company_8188-81.jpg?w=740',
      email: 'contact@fly-check.com',
      phone: '(381)-537-4436',
      industry: {
        id: 5,
        name: 'Energy',
      },
      street: 'Elmwood Avenue District',
      province: 'New York',
      country: {
        id: 5,
        name: 'United States',
      },
    },
    channel: {
      id: 2,
      name: 'Social Media',
    },
    stage: {
      id: 4,
      name: 'Conversion',
      sequence: 4,
      color: 'purple',
    },
    subStage: {
      id: 1,
      name: 'Converted to Opportunity',
      sequence: 1,
    },
    expectedConversion: '2023-11-03',
    potentialRevenue: '$500,000',
    assignee: {
      id: 3,
      name: 'Raul Bradley',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
    },
    priority: {
      id: 2,
      name: 'Medium',
      sequence: 2,
    },
    score: '45',
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
    campaign: {
      id: 6,
      name: 'Social Media Campaign',
    },
    interests: [
      {
        id: 2,
        name: 'Industry-specific solution',
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
    name: 'Diversity Partnership Opportunity',
    contact: {
      id: 3,
      name: 'Cultural Diversity',
      type: 'organization',
      img: 'https://img.freepik.com/free-vector/gradient-culture-logo-template_23-2149840309.jpg?w=740&t=st=1688749689~exp=1688750289~hmac=382461f57df3a4d8fc009f709bd8bf729e43413e061854028515d1d08ea9f103',
      email: 'contact@diversity.com',
      phone: '(052)-747-5542',
      industry: {
        id: 3,
        name: 'Education',
      },
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
      name: 'Engagement',
      sequence: 3,
      color: 'blue',
    },
    subStage: {
      id: 1,
      name: 'Ongoing Communication',
      sequence: 1,
    },
    expectedConversion: '2024-01-04',
    potentialRevenue: '$750,000',
    assignee: {
      id: 1,
      name: 'Rebecca Jones',
      img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
    },
    priority: {
      id: 3,
      name: 'High',
      sequence: 3,
    },
    score: '72',
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
    campaign: {
      id: 5,
      name: 'Email Newsletter',
    },
    interests: [
      {
        id: 1,
        name: 'Custom software development',
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
    name: 'Associates Marketing Collaboration',
    contact: {
      id: 2,
      name: 'Accounting & Associates',
      type: 'organization',
      img: 'https://img.freepik.com/free-vector/gradient-accounting-logo_23-2148843331.jpg?w=740&t=st=1688749990~exp=1688750590~hmac=0a69702b069a8abd5ec485e2a83bd18641c1981f731295b5d4bc22436a054447',
      email: 'info@associates.com',
      phone: '(350)-813-3861',
      industry: {
        id: 2,
        name: 'Accounting',
      },
      street: 'Avenida de Mayo',
      province: 'Salta',
      country: {
        id: 6,
        name: 'Argentina',
      },
    },
    channel: {
      id: 1,
      name: 'Website',
    },
    stage: {
      id: 1,
      name: 'Prospect',
      sequence: 1,
      color: 'red',
    },
    subStage: {
      id: 2,
      name: 'Initial Contact Made',
      sequence: 2,
    },
    expectedConversion: '2023-08-27',
    potentialRevenue: '$500,000',
    assignee: {
      id: 2,
      name: 'Henry Curtis',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
    },
    priority: {
      id: 4,
      name: 'Low',
      sequence: 1,
    },
    score: '17',
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
    campaign: {
      id: 3,
      name: 'New Product Launch',
    },
    interests: [
      {
        id: 1,
        name: 'Custom software development',
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
export default leads;
