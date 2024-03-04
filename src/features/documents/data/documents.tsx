const folders = [
  {
    id: 1,
    name: 'Organizations',
    parent: null,
    createdDate: '2022-12-15',
    modifiedDate: null,
  },
  {
    id: 2,
    name: 'Individuals',
    parent: null,
    createdDate: '2022-12-15',
    modifiedDate: null,
  },
  {
    id: 3,
    name: 'Leads',
    parent: null,
    createdDate: '2022-12-22',
    modifiedDate: null,
  },
  {
    id: 4,
    name: 'Opportunities',
    parent: null,
    createdDate: '2022-12-25',
    modifiedDate: null,
  },
  {
    id: 5,
    name: 'Maztech',
    parent: {
      id: 1,
      name: 'Organizations',
    },
    createdDate: '2022-06-10',
    modifiedDate: null,
  },
  {
    id: 6,
    name: 'Tucker',
    parent: {
      id: 2,
      name: 'Individuals',
    },
    model: {
      id: 2,
      name: 'Individual',
    },
    recordId: 6,
    createdDate: '2022-05-07',
    modifiedDate: null,
  },
  {
    id: 7,
    name: 'Katrina West',
    parent: {
      id: 2,
      name: 'Individuals',
    },
    createdDate: '2022-07-09',
    modifiedDate: null,
  },
  {
    id: 8,
    name: 'FlyCheck Marketing Collaboration',
    parent: {
      id: 3,
      name: 'Leads',
    },
    model: {
      id: 3,
      name: 'Lead',
    },
    recordId: 1,
    createdDate: '2022-10-04',
    modifiedDate: null,
  },
  {
    id: 9,
    name: 'Diversity Partnership Opportunity',
    parent: {
      id: 3,
      name: 'Leads',
    },
    createdDate: '2022-12-21',
    modifiedDate: null,
  },
  {
    id: 10,
    name: 'Maztech Service Request',
    parent: {
      id: 4,
      name: 'Opportunities',
    },
    createdDate: '2022-08-06',
    modifiedDate: null,
  },
  {
    id: 11,
    name: 'Contract Maztech',
    type: {
      id: 1,
      name: 'PDF',
      color: 'red',
    },
    parent: {
      id: 10,
      name: 'Maztech Service Request',
    },
    owner: {
      id: 1,
      name: 'Rebecca Jones',
      img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
    },
    createdDate: '2022-11-13',
    modifiedDate: null,
    users: [
      {
        id: 2,
        name: 'Henry Curtis',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
      },
    ],
    tags: [
      {
        id: 4,
        name: 'Opportunity',
      },
    ],
  },
  {
    id: 12,
    name: 'Performance Review',
    type: {
      id: 2,
      name: 'EXCEL',
      color: 'green',
    },
    parent: {
      id: 5,
      name: 'Maztech',
    },
    owner: {
      id: 1,
      name: 'Rebecca Jones',
      img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
    },
    createdDate: '2023-07-16',
    modifiedDate: null,
    users: [
      {
        id: 2,
        name: 'Henry Curtis',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
      },
    ],
    tags: [
      {
        id: 1,
        name: 'Organization',
      },
    ],
  },
  {
    id: 13,
    name: 'Sales Presentations',
    type: {
      id: 4,
      name: 'PPT',
      color: 'orange',
    },
    parent: {
      id: 8,
      name: 'FlyCheck Marketing Collaboration',
    },
    owner: {
      id: 2,
      name: 'Henry Curtis',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
    },
    createdDate: '2023-06-10',
    modifiedDate: null,
    users: [
      {
        id: 3,
        name: 'Raul Bradley',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
      },
    ],
    tags: [
      {
        id: 3,
        name: 'Lead',
      },
    ],
  },
  {
    id: 14,
    name: 'Service Level Agreement',
    type: {
      id: 3,
      name: 'DOC',
      color: 'blue',
    },
    parent: {
      id: 9,
      name: 'Diversity Partnership Opportunity',
    },
    owner: {
      id: 3,
      name: 'Raul Bradley',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
    },
    createdDate: '2023-07-16',
    modifiedDate: null,
    users: [
      {
        id: 1,
        name: 'Rebecca Jones',
        img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
      },
      {
        id: 2,
        name: 'Henry Curtis',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
      },
    ],
    tags: [
      {
        id: 4,
        name: 'Opportunity',
      },
    ],
  },
  {
    id: 15,
    name: 'Marketing Collateral',
    type: {
      id: 5,
      name: 'PNG',
      color: 'purple',
    },
    parent: {
      id: 7,
      name: 'Katrina West',
    },
    owner: {
      id: 3,
      name: 'Raul Bradley',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
    },
    createdDate: '2023-07-21',
    modifiedDate: null,
    users: [
      {
        id: 1,
        name: 'Rebecca Jones',
        img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
      },
      {
        id: 2,
        name: 'Henry Curtis',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
      },
    ],
    tags: [
      {
        id: 2,
        name: 'Individual',
      },
    ],
  },
  {
    id: 5,
    name: 'Diversity Invoice',
    type: {
      id: 5,
      name: 'JPG',
      color: 'pink',
    },
    parent: {
      id: 9,
      name: 'Diversity Partnership Opportunity',
    },
    owner: {
      id: 3,
      name: 'Raul Bradley',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
    },
    createdDate: '2023-28-14',
    modifiedDate: null,
    users: [
      {
        id: 1,
        name: 'Rebecca Jones',
        img: 'https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg',
      },
    ],
    tags: [
      {
        id: 4,
        name: 'Opportunity',
      },
    ],
  },
  {
    id: 6,
    name: 'Customer Correspondence',
    type: {
      id: 2,
      name: 'CSV',
      color: 'yellow',
    },
    parent: {
      id: 6,
      name: 'Tucker',
    },
    owner: {
      id: 2,
      name: 'Henry Curtis',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
    },
    createdDate: '2023-07-22',
    modifiedDate: null,
    users: [
      {
        id: 3,
        name: 'Raul Bradley',
        img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
      },
    ],
    tags: [
      {
        id: 1,
        name: 'Individual',
      },
    ],
  },
];
export default folders;
