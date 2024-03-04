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

export default function DonutChart(props: Props) {
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
      const series: number[] = [];

      dashboardData.forEach((item) => {
        labels.push(item[0]);
        series.push(
          item[1].aggregations[`${aggregationOptions}_${measureField}`]
        );
      });

      return { labels, series };
    };
  }, []);

  const [dataChart, setDataChart] = useState(retrieveData(data));

  useEffect(() => {
    setDataChart(retrieveData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const donutChartOptions: any = {
    stroke: {
      width: 1,
    },
    plotOptions: {
      pie: {
        customScale: 1,
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
    labels: dataChart.labels,
    colors: palette,
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

  return (
    <div className="col-span-2">
      <Widget name={name} isBookmarked={isBookmarked}>
        <Chart
          options={donutChartOptions}
          series={dataChart.series}
          type="donut"
          height={300}
        />
      </Widget>
    </div>
  );
}
