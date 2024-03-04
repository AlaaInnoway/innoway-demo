import Chart from 'react-apexcharts';
import { useEffect, useMemo, useState } from 'react';
import Widget from '../ui/Widget';

interface Props {
  name: string;
  isBookmarked?: boolean;
  palette?: string[];
  data: any[];
  horizontal?: boolean;
  stacked?: boolean;
  aggregationOptions?: string;
  measureField?: string;
}

export default function BarChart(props: Props) {
  const {
    name,
    isBookmarked,
    palette,
    data,
    horizontal,
    stacked,
    aggregationOptions,
    measureField,
  } = props;

  const retrieveData = useMemo(() => {
    return (dashboardData: any[]) => {
      const labels: string[] = [];
      const series: any[] = [
        {
          name: '',
          data: [],
        },
      ];

      dashboardData.forEach((item) => {
        labels.push(item[0]);
        series[0].data.push(
          item[1].aggregations[`${aggregationOptions}_${measureField}`]
        );
      });

      console.log('dashboardData');
      console.log(dashboardData);

      console.log('labels');
      console.log(labels);

      console.log('series');
      console.log(series);

      return { labels, series };
    };
  }, []);

  const [dataChart, setDataChart] = useState(retrieveData(data));

  useEffect(() => {
    setDataChart(retrieveData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barChartOptions: any = {
    stroke: {
      colors: ['transparent'],
      width: 2,
    },
    chart: {
      id: 'apexchart-example',
      toolbar: {
        show: false,
      },
      stacked,
    },
    dataLabels: {
      enabled: false,
    },
    colors: palette,
    xaxis: {
      categories: dataChart.labels,
    },
    plotOptions: {
      bar: {
        horizontal,
        barHeight: '100%',
        borderRadius: 12,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        borderRadiusOnAllStackedSeries: true,
        columnWidth: stacked ? `${60 / dataChart.series.length}%` : `${60}%`,
        distributed: true, // one color for each bar
      },
    },
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

  return (
    <div className="col-span-2">
      <Widget name={name} isBookmarked={isBookmarked}>
        <Chart
          options={barChartOptions}
          series={dataChart.series}
          type="bar"
          height={300}
        />
      </Widget>
    </div>
  );
}
