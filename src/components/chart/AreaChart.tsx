import Chart from 'react-apexcharts';
import { useEffect, useMemo, useState } from 'react';
import Widget from '../ui/Widget';

interface Props {
  name: string;
  isBookmarked?: boolean;
  palette?: string[];
  data: any[];
  aggregationOptions?: string;
  measureField?: string;
}

export default function AreaChart(props: Props) {
  const {
    name,
    isBookmarked,
    palette,
    data,
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

  const areaChartOptions: any = {
    chart: {
      id: 'apexchart-example',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    colors: palette,
    xaxis: {
      categories: dataChart.labels,
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      floating: true,
      position: 'top',
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
          options={areaChartOptions}
          series={dataChart.series}
          type="area"
          height={300}
        />
      </Widget>
    </div>
  );
}
