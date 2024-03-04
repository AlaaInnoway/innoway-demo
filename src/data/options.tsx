export const pieChartOptions = {
  stroke: {
    // colors: ["transparent"],
    width: 1,
  },
  plotOptions: {
    pie: {
      // customScale: 1,
      expandOnClick: false,
    },
  },
  chart: {
    id: 'apexchart-example',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  labels: ['serie 1'],
  colors: [
    '#faf5ff',
    '#e9d5ff',
    '#c084fc',
    '#9333ea',
    '#6b21a8',

    '#f3e8ff',
    '#d8b4fe',
    '#a855f7',
    '#7e22ce',
    '#581c87',
  ],
  legend: {
    show: true,
    showForSingleSeries: false,
    floating: false,
    fontSize: '10px',
    itemMargin: {
      horizontal: 8,
      vertical: 4,
    },
    markers: {
      width: 16,
      height: 8,
      radius: 12,
    },
  },
};

export const donutChartOptions = {
  stroke: {
    // colors: ["transparent"],
    width: 1,
  },
  plotOptions: {
    pie: {
      // customScale: 1,
      expandOnClick: false,
    },
  },
  chart: {
    id: 'apexchart-example',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#00E0C0', '#523B7E', '#0467B1', '#0093CF', '#00BBD2'],
  legend: {
    show: true,
    showForSingleSeries: false,
    floating: false,
    position: 'top',
    horizontalAlign: 'center',
    fontSize: '10px',
    itemMargin: {
      horizontal: 8,
      vertical: 4,
    },
    markers: {
      width: 16,
      height: 8,
      radius: 12,
    },
  },
};
