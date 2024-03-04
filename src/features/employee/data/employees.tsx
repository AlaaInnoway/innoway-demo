const employees = [
  {
    id: 1,
    name: 'Neil Sims',
    img: 'https://lineone.piniastudio.com/images/avatar/avatar-20.jpg',
    birthDate: '1990-10-05',
    gender: {
      id: 1,
      name: 'Male',
    },
    type: {
      id: 1,
      name: 'Full-time',
    },
    joiningDate: '2021-01-19',
    supervisor: {
      id: 8,
      name: 'Simon Helberg',
      img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
    },
    department: {
      id: 5,
      name: 'Marketing',
    },
    jobTitle: {
      id: 7,
      name: 'Social Media Manager',
    },
    email: 'neil.sims@maztech.com',
    phone: '(01) 22 888 4444',
    mobile: '(01) 25 748 3110',
    street: 'Avinguda Gaudi',
    zipCode: '90255',
    city: 'Barcelona',
    province: 'Barcelona',
    country: {
      id: 3,
      name: 'Spain',
    },
    status: {
      id: 1,
      name: 'Active',
      color: 'green',
    },
    emergencies: [
      {
        id: 1,
        name: 'Joey Batey',
        phone: '(01) 24 851 1427',
        relationship: 'Friend',
      },
    ],
    qualifications: [
      {
        id: 1,
        name: 'Computer Science Degree',
        institution: 'Stanford University',
        obtainedDate: '2016-05-01',
      },
      {
        id: 2,
        name: 'Bachelor of Science',
        institution: 'Lincoln Memorial University',
        obtainedDate: '2013-06-06',
      },
    ],
    experiences: [
      {
        id: 1,
        company: 'McKesson',
        jobTitle: 'Social Media Internship',
        startDate: '2016-01-02',
        endDate: '2016-05-01',
      },
    ],
    leaves: [
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
    reviewsOfEmployee: [
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
    contracts: [
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
    name: 'Katrina West',
    img: 'https://lineone.piniastudio.com/images/avatar/avatar-11.jpg',
    birthDate: '1992-08-12',
    gender: {
      id: 2,
      name: 'Female',
    },
    type: {
      id: 1,
      name: 'Full-time',
    },
    joiningDate: '2021-10-14',
    supervisor: {
      id: 8,
      name: 'Simon Helberg',
      img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
    },
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
    street: 'Saint-Laurent',
    zipCode: '80441',
    city: 'Montreal',
    province: 'Montreal',
    country: {
      id: 6,
      name: 'Canada',
    },
    status: {
      id: 1,
      name: 'Active',
      color: 'green',
    },
    emergencies: [
      {
        id: 1,
        name: 'Joey Batey',
        phone: '(01) 24 851 1427',
        relationship: 'Friend',
      },
    ],
    qualifications: [
      {
        id: 1,
        name: 'Computer Science Degree',
        institution: 'Stanford University',
        obtainedDate: '2016-05-01',
      },
      {
        id: 2,
        name: 'Bachelor of Science',
        institution: 'Lincoln Memorial University',
        obtainedDate: '2013-06-06',
      },
    ],
    experiences: [
      {
        id: 1,
        company: 'McKesson',
        jobTitle: 'Social Media Internship',
        startDate: '2016-01-02',
        endDate: '2016-05-01',
      },
    ],
    leaves: [
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
    reviewsOfEmployee: [
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
    contracts: [
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
    name: 'Derrick Simmons',
    img: 'https://lineone.piniastudio.com/images/avatar/avatar-17.jpg',
    birthDate: '1994-07-27',
    gender: {
      id: 1,
      name: 'Male',
    },
    type: {
      id: 2,
      name: 'Part-time',
    },
    joiningDate: '2018-02-03',
    supervisor: {
      id: 8,
      name: 'Simon Helberg',
      img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
    },
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
    street: 'Avenida Mayo',
    zipCode: '60410',
    city: 'Salta',
    province: 'Salta',
    country: {
      id: 6,
      name: 'Argentina',
    },
    status: {
      id: 3,
      name: 'Terminated',
      color: 'pink',
    },
    emergencies: [
      {
        id: 1,
        name: 'Joey Batey',
        phone: '(01) 24 851 1427',
        relationship: 'Friend',
      },
    ],
    qualifications: [
      {
        id: 1,
        name: 'Computer Science Degree',
        institution: 'Stanford University',
        obtainedDate: '2016-05-01',
      },
      {
        id: 2,
        name: 'Bachelor of Science',
        institution: 'Lincoln Memorial University',
        obtainedDate: '2013-06-06',
      },
    ],
    experiences: [
      {
        id: 1,
        company: 'McKesson',
        jobTitle: 'Social Media Internship',
        startDate: '2016-01-02',
        endDate: '2016-05-01',
      },
    ],
    leaves: [
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
    reviewsOfEmployee: [
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
    contracts: [
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
    name: 'Lance Tucker',
    img: 'https://lineone.piniastudio.com/images/avatar/avatar-12.jpg',
    birthDate: '1975-04-17',
    gender: {
      id: 1,
      name: 'Male',
    },
    type: {
      id: 3,
      name: 'Contract',
    },
    joiningDate: '2017-05-18',
    supervisor: {
      id: 8,
      name: 'Simon Helberg',
      img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
    },
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
    street: 'Kungsportsavenyn',
    zipCode: '54720',
    city: 'Göteborg',
    province: 'Malmo',
    country: {
      id: 8,
      name: 'Sweden',
    },
    status: {
      id: 1,
      name: 'Active',
      color: 'green',
    },
    emergencies: [
      {
        id: 1,
        name: 'Joey Batey',
        phone: '(01) 24 851 1427',
        relationship: 'Friend',
      },
    ],
    qualifications: [
      {
        id: 1,
        name: 'Computer Science Degree',
        institution: 'Stanford University',
        obtainedDate: '2016-05-01',
      },
      {
        id: 2,
        name: 'Bachelor of Science',
        institution: 'Lincoln Memorial University',
        obtainedDate: '2013-06-06',
      },
    ],
    experiences: [
      {
        id: 1,
        company: 'McKesson',
        jobTitle: 'Social Media Internship',
        startDate: '2016-01-02',
        endDate: '2016-05-01',
      },
    ],
    leaves: [
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
    reviewsOfEmployee: [
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
    contracts: [
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
    id: 5,
    name: 'Samantha Shelton',
    img: 'https://lineone.piniastudio.com/images/avatar/avatar-7.jpg',
    birthDate: '1997-11-13',
    gender: {
      id: 2,
      name: 'Female',
    },
    type: {
      id: 2,
      name: 'Part-time',
    },
    joiningDate: '2020-07-01',
    supervisor: {
      id: 8,
      name: 'Simon Helberg',
      img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
    },
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
    street: 'Passeig De Gracia',
    zipCode: '30170',
    city: 'Barcelona',
    province: 'Barcelona',
    country: {
      id: 3,
      name: 'Spain',
    },
    status: {
      id: 2,
      name: 'On Leave',
      color: 'orange',
    },
    emergencies: [
      {
        id: 1,
        name: 'Joey Batey',
        phone: '(01) 24 851 1427',
        relationship: 'Friend',
      },
    ],
    qualifications: [
      {
        id: 1,
        name: 'Computer Science Degree',
        institution: 'Stanford University',
        obtainedDate: '2016-05-01',
      },
      {
        id: 2,
        name: 'Bachelor of Science',
        institution: 'Lincoln Memorial University',
        obtainedDate: '2013-06-06',
      },
    ],
    experiences: [
      {
        id: 1,
        company: 'McKesson',
        jobTitle: 'Social Media Internship',
        startDate: '2016-01-02',
        endDate: '2016-05-01',
      },
    ],
    leaves: [
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
    reviewsOfEmployee: [
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
    contracts: [
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
    id: 6,
    name: 'Raul Bradley',
    img: 'https://lineone.piniastudio.com/images/avatar/avatar-4.jpg',
    birthDate: '1987-11-09',
    gender: {
      id: 1,
      name: 'Male',
    },
    type: {
      id: 1,
      name: 'Full-time',
    },
    joiningDate: '2023-08-16',
    supervisor: {
      id: 8,
      name: 'Simon Helberg',
      img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
    },
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
    street: 'Elmwood Avenue District',
    zipCode: '30170',
    city: 'Buffalo',
    province: 'New York',
    country: {
      id: 5,
      name: 'United States',
    },
    status: {
      id: 3,
      name: 'Terminated',
      color: 'pink',
    },
    emergencies: [
      {
        id: 1,
        name: 'Joey Batey',
        phone: '(01) 24 851 1427',
        relationship: 'Friend',
      },
    ],
    qualifications: [
      {
        id: 1,
        name: 'Computer Science Degree',
        institution: 'Stanford University',
        obtainedDate: '2016-05-01',
      },
      {
        id: 2,
        name: 'Bachelor of Science',
        institution: 'Lincoln Memorial University',
        obtainedDate: '2013-06-06',
      },
    ],
    experiences: [
      {
        id: 1,
        company: 'McKesson',
        jobTitle: 'Social Media Internship',
        startDate: '2016-01-02',
        endDate: '2016-05-01',
      },
    ],
    leaves: [
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
    reviewsOfEmployee: [
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
    contracts: [
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
    id: 7,
    name: 'Joe Perkins',
    img: 'https://lineone.piniastudio.com/images/avatar/avatar-14.jpg',
    birthDate: '1995-04-21',
    gender: {
      id: 1,
      name: 'Male',
    },
    type: {
      id: 3,
      name: 'Contract',
    },
    joiningDate: '2019-07-01',
    supervisor: {
      id: 8,
      name: 'Simon Helberg',
      img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
    },
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
    street: 'Golden Towers',
    zipCode: '1082',
    city: 'Urbain Nord',
    province: 'Tunis',
    country: {
      id: 4,
      name: 'Tunisia',
    },
    status: {
      id: 2,
      name: 'On Leave',
      color: 'orange',
    },
    emergencies: [
      {
        id: 1,
        name: 'Joey Batey',
        phone: '(01) 24 851 1427',
        relationship: 'Friend',
      },
    ],
    qualifications: [
      {
        id: 1,
        name: 'Computer Science Degree',
        institution: 'Stanford University',
        obtainedDate: '2016-05-01',
      },
      {
        id: 2,
        name: 'Bachelor of Science',
        institution: 'Lincoln Memorial University',
        obtainedDate: '2013-06-06',
      },
    ],
    experiences: [
      {
        id: 1,
        company: 'McKesson',
        jobTitle: 'Social Media Internship',
        startDate: '2016-01-02',
        endDate: '2016-05-01',
      },
    ],
    leaves: [
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
    reviewsOfEmployee: [
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
    contracts: [
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
    id: 8,
    name: 'Simon Helberg',
    img: 'https://img.freepik.com/free-photo/elegant-businessman-office_155003-9641.jpg?w=996&t=st=1690035065~exp=1690035665~hmac=9213501bc663da65c25609acecd466066fcc96050757cebeef2eaa89c19ef27e',
    birthDate: '1963-02-10',
    gender: {
      id: 1,
      name: 'Male',
    },
    type: {
      id: 3,
      name: 'Contract',
    },
    joiningDate: '2021-03-01',
    supervisor: null,
    department: {
      id: 5,
      name: 'Marketing',
    },
    jobTitle: {
      id: 8,
      name: 'Operation Manager',
    },
    email: 'simon.helberg@neway-solutions.com',
    phone: '(381)-627-2351',
    mobile: '(381)-611-2095',
    street: 'Golden Towers',
    zipCode: '1082',
    city: 'Urbain Nord',
    province: 'Tunis',
    country: {
      id: 4,
      name: 'Tunisia',
    },
    status: {
      id: 1,
      name: 'Active',
      color: 'green',
    },
    emergencies: [
      {
        id: 1,
        name: 'Joey Batey',
        phone: '(01) 24 851 1427',
        relationship: 'Friend',
      },
    ],
    qualifications: [
      {
        id: 1,
        name: 'Computer Science Degree',
        institution: 'Stanford University',
        obtainedDate: '2016-05-01',
      },
      {
        id: 2,
        name: 'Bachelor of Science',
        institution: 'Lincoln Memorial University',
        obtainedDate: '2013-06-06',
      },
    ],
    experiences: [
      {
        id: 1,
        company: 'McKesson',
        jobTitle: 'Social Media Internship',
        startDate: '2016-01-02',
        endDate: '2016-05-01',
      },
    ],
    leaves: [
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
    reviewsOfEmployee: [
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
    contracts: [
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
export default employees;
