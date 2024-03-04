const quotes = [
  {
    id: 1,
    name: 'S00001',
    opportunity: {
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
      salesPerson: {
        id: 2,
        name: 'Henry Curtis',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        salesTeam: {
          id: 1,
          name: 'Africa',
        },
      },
    },
    totalAmount: '$370,000',
    createdDate: '2023-06-10',
    validityPeriod: '30 Days',
    expiredDate: '2023-07-10',
    stage: {
      id: 1,
      name: 'Draft',
      sequence: 1,
      color: 'purple',
    },
    items: [
      {
        id: 1,
        name: 'Shipping',
        description: 'Standard shipping',
        quantity: '2.0',
        price: '$90,000',
        subTotal: '$180.000',
      },
      {
        id: 1,
        name: 'Customization',
        description: 'Custom software development',
        quantity: '5.0',
        price: '$38,000',
        subTotal: '$190.000',
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
    name: 'S00002',
    opportunity: {
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
      salesPerson: {
        id: 3,
        name: 'Raul Bradley',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        salesTeam: {
          id: 2,
          name: 'Europe',
        },
      },
    },
    totalAmount: '$340,000',
    createdDate: '2023-07-15',
    validityPeriod: '30 Days',
    expiredDate: '2023-08-15',
    stage: {
      id: 2,
      name: 'Sent',
      sequence: 2,
      color: 'blue',
    },
    items: [
      {
        id: 1,
        name: 'Shipping',
        description: 'Standard shipping',
        quantity: '2.0',
        price: '$90,000',
        subTotal: '$180.000',
      },
      {
        id: 1,
        name: 'Customization',
        description: 'Custom software development',
        quantity: '5.0',
        price: '$38,000',
        subTotal: '$190.000',
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
    name: 'S00003',
    opportunity: {
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
      salesPerson: {
        id: 1,
        name: 'Rebecca Jones',
        img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        salesTeam: {
          id: 3,
          name: 'Asia',
        },
      },
    },
    totalAmount: '$275,000',
    createdDate: '2023-08-05',
    validityPeriod: '30 Days',
    expiredDate: '2023-09-05',
    stage: {
      id: 3,
      name: 'Accepted',
      sequence: 3,
      color: 'green',
    },
    items: [
      {
        id: 1,
        name: 'Shipping',
        description: 'Standard shipping',
        quantity: '2.0',
        price: '$90,000',
        subTotal: '$180.000',
      },
      {
        id: 1,
        name: 'Customization',
        description: 'Custom software development',
        quantity: '5.0',
        price: '$38,000',
        subTotal: '$190.000',
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
    name: 'S00004',
    opportunity: {
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
      salesPerson: {
        id: 2,
        name: 'Henry Curtis',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        salesTeam: {
          id: 1,
          name: 'Africa',
        },
      },
    },
    totalAmount: '$320,000',
    createdDate: '2023-08-12',
    validityPeriod: '15 Days',
    expiredDate: '2023-08-27',
    stage: {
      id: 2,
      name: 'Pending Review',
      sequence: 1,
      color: 'orange',
    },
    items: [
      {
        id: 1,
        name: 'Shipping',
        description: 'Standard shipping',
        quantity: '2.0',
        price: '$90,000',
        subTotal: '$180.000',
      },
      {
        id: 1,
        name: 'Customization',
        description: 'Custom software development',
        quantity: '5.0',
        price: '$38,000',
        subTotal: '$190.000',
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

export default quotes;
