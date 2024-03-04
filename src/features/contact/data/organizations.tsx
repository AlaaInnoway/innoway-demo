const organizations = [
  {
    id: 1,
    name: 'NEWAY Solutions',
    type: 'organization',
    img: 'data:image/jpeg;base64,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',
    email: 'contact@neway-solutions.com',
    phone: '(381)-627-2351',
    website: 'www.neway-solutions.com',
    industry: {
      id: 1,
      name: 'IT & Consulting',
    },
    size: {
      id: 3,
      name: '20-50 employees',
    },
    street: 'Golden Towers',
    zipCode: '1082',
    city: 'Urbain Nord',
    province: 'Tunis',
    country: {
      id: 4,
      name: 'Tunisia',
    },
    source: {
      id: 5,
      name: 'Partner Referral',
    },
    tags: [
      {
        id: 6,
        name: 'Partner',
      },
    ],
    twitter: 'twitter.com/neway_solutions',
    linkedin: 'linked.in/neway_solutions',
    facebook: 'facebook.com/neway_solutions',
    individuals: [
      {
        id: 7,
        name: 'Joe Perkins',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-14.jpg',
        jobTitle: 'Co-Founder',
        email: 'joe.perkins@neway-solutions.com',
        phone: '(381)-627-2351',
        mobile: '(381)-611-2095',
      },
    ],
    leads: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
      {
        id: 3,
        name: '',
      },
    ],
    opportunities: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
      {
        id: 3,
        name: '',
      },
      {
        id: 4,
        name: '',
      },
      {
        id: 5,
        name: '',
      },
    ],
    quotes: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
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
        name: 'Balance_Review_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract.docx',
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
    name: 'Accounting & Associates',
    type: 'organization',
    img: 'https://img.freepik.com/free-vector/gradient-accounting-logo_23-2148843331.jpg?w=740&t=st=1688749990~exp=1688750590~hmac=0a69702b069a8abd5ec485e2a83bd18641c1981f731295b5d4bc22436a054447',
    email: 'info@associates.com',
    phone: '(350)-813-3861',
    website: 'www.associates.com',
    industry: {
      id: 2,
      name: 'Accounting',
    },
    size: {
      id: 3,
      name: '20-50 employees',
    },
    street: 'Avenida de Mayo',
    zipCode: '1082',
    city: 'Salta',
    province: 'Salta',
    country: {
      id: 6,
      name: 'Argentina',
    },
    source: {
      id: 3,
      name: 'Industry Publication',
    },
    tags: [
      {
        id: 5,
        name: 'Customer',
      },
    ],
    twitter: 'twitter.com/associates',
    linkedin: 'linked.in/associates',
    facebook: 'facebook.com/associates',
    individuals: [
      {
        id: 3,
        name: 'Derrick Simmons',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-17.jpg',
        jobTitle: 'Account Manager',
        email: 'derrick.simmons@associates.com',
        phone: '(350)-813-3861',
        mobile: '(350)-181-3749',
      },
    ],
    leads: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
    ],
    opportunities: [
      {
        id: 1,
        name: '',
      },
    ],
    quotes: [
      {
        id: 1,
        name: '',
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
        name: 'Balance_Review_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract.docx',
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
    name: 'Cultural Diversity',
    type: 'organization',
    img: 'https://img.freepik.com/free-vector/gradient-culture-logo-template_23-2149840309.jpg?w=740&t=st=1688749689~exp=1688750289~hmac=382461f57df3a4d8fc009f709bd8bf729e43413e061854028515d1d08ea9f103',
    email: 'contact@diversity.com',
    phone: '(052)-747-5542',
    website: 'www.cultural-diversity.com',
    industry: {
      id: 3,
      name: 'Education',
    },
    size: {
      id: 2,
      name: '5-20 employees',
    },
    street: 'Saint-Laurent',
    zipCode: '3517',
    city: 'Montreal',
    province: 'Montreal',
    country: {
      id: 6,
      name: 'Canada',
    },
    source: {
      id: 5,
      name: 'Customer Referral',
    },
    tags: [
      {
        id: 5,
        name: 'Customer',
      },
    ],
    twitter: 'twitter.com/diversity',
    linkedin: 'linked.in/diversity',
    facebook: 'facebook.com/diversity',
    individuals: [
      {
        id: 2,
        name: 'Katrina West',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-11.jpg',
        jobTitle: 'HR Manager',
        email: 'katrina.west@diversity.com',
        phone: '(052)-747-5542',
        mobile: '(052)-682-2241',
      },
    ],
    leads: [
      {
        id: 1,
        name: '',
      },
    ],
    opportunities: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
    ],
    quotes: [],
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
        name: 'Balance_Review_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract.docx',
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
    name: 'Square',
    type: 'organization',
    img: 'https://img.freepik.com/free-vector/creative-square-logo-vector-template_460848-13897.jpg?w=826&t=st=1688750337~exp=1688750937~hmac=01867b9a933a2619eeff86dec457147ae6d510690b09eb081fd03804e1a93045',
    email: 'contact@square.com',
    phone: '(727)-810-3880',
    website: 'www.square.com',
    industry: {
      id: 4,
      name: 'Construction',
    },
    size: {
      id: 4,
      name: '50-250 employees',
    },
    street: 'Passeig De Gracia',
    zipCode: '30170',
    city: 'Barcelona',
    province: 'Barcelona',
    country: {
      id: 3,
      name: 'Spain',
    },
    source: {
      id: 4,
      name: 'Trade Association',
    },
    tags: [
      {
        id: 4,
        name: 'Prospect',
      },
      {
        id: 5,
        name: 'Customer',
      },
    ],
    twitter: 'twitter.com/square',
    linkedin: 'linked.in/square',
    facebook: 'facebook.com/square',
    individuals: [
      {
        id: 5,
        name: 'Samantha Shelton',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-7.jpg',
        jobTitle: 'Business Analyst',
        email: 'samantha.shelton@square.com',
        phone: '(727)-810-3880',
        mobile: '(727)-820-3750',
      },
    ],
    leads: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
    ],
    opportunities: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
      {
        id: 3,
        name: '',
      },
    ],
    quotes: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
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
        name: 'Balance_Review_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract.docx',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
  },
  {
    id: 5,
    name: 'MazTech',
    type: 'organization',
    img: 'https://img.freepik.com/premium-psd/white-wall-logo-mockup-template_528542-759.jpg?w=996',
    email: 'info@maztech.com',
    phone: '(01) 22 888 4444',
    website: 'www.maztech.com',
    industry: {
      id: 1,
      name: 'IT & Consulting',
    },
    size: {
      id: 1,
      name: 'Less than 5 employees',
    },
    street: 'Avinguda Gaudi',
    zipCode: '90255',
    city: 'Barcelona',
    province: 'Barcelona',
    country: {
      id: 3,
      name: 'Spain',
    },
    source: {
      id: 2,
      name: 'Online Search',
    },
    tags: [
      {
        id: 6,
        name: 'Partner',
      },
    ],
    twitter: 'twitter.com/maztech',
    linkedin: 'linked.in/maztech',
    facebook: 'facebook.com/maztech',
    individuals: [
      {
        id: 1,
        name: 'Neil Sims',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-20.jpg',
        jobTitle: 'Social Media Manager',
        email: 'neil.sims@maztech.com',
        phone: '(01) 22 888 4444',
        mobile: '(01) 25 748 3110',
      },
    ],
    leads: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
      {
        id: 3,
        name: '',
      },
      {
        id: 4,
        name: '',
      },
    ],
    opportunities: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
    ],
    quotes: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
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
        name: 'Balance_Review_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract.docx',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
  },
  {
    id: 6,
    name: 'FlyCheck',
    type: 'organization',
    img: 'https://img.freepik.com/premium-vector/double-check-modern-logo-icon-business-technology-digital-company_8188-81.jpg?w=740',
    email: 'contact@fly-check.com',
    phone: '(381)-537-4436',
    website: 'www.fly-check.com',
    industry: {
      id: 5,
      name: 'Energy',
    },
    size: {
      id: 5,
      name: 'More than 250 employees',
    },
    street: 'Elmwood Avenue District',
    zipCode: '30170',
    city: 'Buffalo',
    province: 'New York',
    country: {
      id: 5,
      name: 'United States',
    },
    source: {
      id: 1,
      name: 'Word of Mouth',
    },
    tags: [
      {
        id: 4,
        name: 'Prospect',
      },
    ],
    twitter: 'twitter.com/fly_check',
    linkedin: 'linked.in/fly_check',
    facebook: 'facebook.com/fly_check',
    individuals: [
      {
        id: 6,
        name: 'Raul Bradley',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-4.jpg',
        jobTitle: 'Customer Support',
        email: 'raul.brad@fly-check.com',
        phone: '(381)-537-4436',
        mobile: '(381)-491-2260',
      },
    ],
    leads: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
      {
        id: 3,
        name: '',
      },
      {
        id: 4,
        name: '',
      },
      {
        id: 5,
        name: '',
      },
    ],
    opportunities: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
    ],
    quotes: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
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
        name: 'Balance_Review_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract.docx',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
  },
  {
    id: 7,
    name: 'Abstract',
    type: 'organization',
    img: 'https://img.freepik.com/free-vector/branding-identity-corporate-logo-vector-design-template_460848-13994.jpg?w=740&t=st=1688750154~exp=1688750754~hmac=87a2914d000fe7961d08b324826d78ca489f0c9b14e2fed1a84d015c3ce54cd7',
    email: 'contact@abstract.com',
    phone: '(040)-129-7702',
    website: 'www.abstract.com',
    industry: {
      id: 6,
      name: 'Healthcare',
    },
    size: {
      id: 5,
      name: 'More than 250 employees',
    },
    street: 'Kungsportsavenyn',
    zipCode: '54720',
    city: 'Göteborg',
    province: 'Malmo',
    country: {
      id: 8,
      name: 'Sweden',
    },
    source: {
      id: 5,
      name: 'Customer Referral',
    },
    tags: [
      {
        id: 6,
        name: 'Partner',
      },
    ],
    twitter: 'twitter.com/abstract',
    linkedin: 'linked.in/abstract',
    facebook: 'facebook.com/abstract',
    individuals: [
      {
        id: 4,
        name: 'Lance Tucker',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-12.jpg',
        jobTitle: 'Business Manager',
        email: 'lance.tucker@abstract.com',
        phone: '(040)-129-7702',
        mobile: '(040)-123-6950',
      },
    ],
    leads: [
      {
        id: 1,
        name: '',
      },
    ],
    opportunities: [],
    quotes: [],
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
        name: 'Balance_Review_2022.pdf',
        user: {
          id: 1,
          name: 'Rebecca Jones',
          img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
        },
      },
      {
        id: 2,
        date: '23 July 2023',
        name: 'ID_Documents.zip',
        user: {
          id: 2,
          name: 'Henry Curtis',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
        },
      },
      {
        id: 3,
        date: '10 June 2023',
        name: 'Contract.docx',
        user: {
          id: 3,
          name: 'Raul Bradley',
          img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
        },
      },
    ],
  },
];
export default organizations;
