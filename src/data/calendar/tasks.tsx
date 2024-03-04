const tasks = [
  {
    id: 1,
    name: 'Phone Call with Lance Tucker',
    type: {
      id: 1,
      name: 'Phone Call',
    },
    stage: {
      id: 1,
      name: 'Not Started',
      sequence: 1,
      color: 'orange',
    },
    dueDate: '2023-09-12',
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
    associatedEntity: 'Lance Tucker',
    tag: {
      id: 1,
      name: 'Individual',
    },
  },
  {
    id: 2,
    name: 'Send Email about Maztech Service Request',
    type: {
      id: 2,
      name: 'Email',
    },
    stage: {
      id: 2,
      name: 'In Progress',
      sequence: 2,
      color: 'purple',
    },
    dueDate: '2023-11-17',
    assignee: {
      id: 2,
      name: 'Henry Curtis',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-1.jpg',
    },
    priority: {
      id: 2,
      name: 'Medium',
      sequence: 2,
    },
    associatedEntity: 'Maztech Service Request',
    tag: {
      id: 3,
      name: 'Lead',
    },
  },
  {
    id: 3,
    name: 'Upload FlyCheck Contract',
    type: {
      id: 4,
      name: 'Upload Document',
    },
    stage: {
      id: 3,
      name: 'Completed',
      sequence: 3,
      color: 'green',
    },
    dueDate: '2023-04-27',
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
    associatedEntity: 'FlyCheck',
    tag: {
      id: 2,
      name: 'Organization',
    },
  },
  {
    id: 4,
    name: 'Meeting with Samantha',
    type: {
      id: 3,
      name: 'Meeting',
    },
    stage: {
      id: 4,
      name: 'Overdue',
      sequence: 4,
      color: 'red',
    },
    dueDate: '2023-01-04',
    assignee: {
      id: 3,
      name: 'Raul Bradley',
      img: 'https://lineone.piniastudio.com/images/avatar/avatar-5.jpg',
    },
    priority: {
      id: 1,
      name: 'Low',
      sequence: 1,
    },
    associatedEntity: 'Samantha Shelton',
    tag: {
      id: 1,
      name: 'Individual',
    },
  },
];

export default tasks;
