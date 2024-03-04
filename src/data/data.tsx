export const ganttChartData = [
    {
      name: 'Bob',
      data: [
        { x: 'Design', y: [new Date('2023-03-05').getTime(), new Date('2023-03-08').getTime()] },
        { x: 'Code', y: [new Date('2023-03-02').getTime(), new Date('2023-03-05').getTime()] },
        { x: 'Code', y: [new Date('2023-03-05').getTime(), new Date('2023-03-07').getTime()] },
        { x: 'Test', y: [new Date('2023-03-03').getTime(), new Date('2023-03-09').getTime()] },
        { x: 'Test', y: [new Date('2023-03-08').getTime(), new Date('2023-03-11').getTime()] },
        { x: 'Validation', y: [new Date('2023-03-11').getTime(), new Date('2023-03-16').getTime()] },
        { x: 'Design', y: [new Date('2023-03-01').getTime(), new Date('2023-03-03').getTime()] }
      ]
    },
    {
      name: 'Joe',
      data: [
        { x: 'Design', y: [new Date('2023-03-02').getTime(), new Date('2023-03-05').getTime()] },
        { x: 'Test', y: [new Date('2023-03-06').getTime(), new Date('2023-03-16').getTime()] },
        { x: 'Code', y: [new Date('2023-03-03').getTime(), new Date('2023-03-07').getTime()] },
        { x: 'Deployment', y: [new Date('2023-03-20').getTime(), new Date('2023-03-22').getTime()] },
        { x: 'Design', y: [new Date('2023-03-10').getTime(), new Date('2023-03-16').getTime()] }
      ]
    },
    {
      name: 'Dan',
      data: [
        { x: 'Code', y: [new Date('2023-03-10').getTime(), new Date('2023-03-17').getTime()] },
        { x: 'Validation', y: [new Date('2023-03-05').getTime(), new Date('2023-03-09').getTime()] }
      ]
    }
  ];