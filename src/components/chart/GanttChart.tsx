import ReactApexChart from 'react-apexcharts';
import { useEffect, useMemo, useState } from 'react';
import Widget from '../ui/Widget';

interface Props {
    name: string;
    isBookmarked?: boolean;
    palette?: string[];
    data: any[];
}

export default function GanttChart(props: Props) {
    const { name, isBookmarked, palette, data } = props;

    const retrieveData = useMemo(() => {
        return (chartData: any[]) => {
            const seriesData = chartData.map(item => ({
                name: item.name,
                data: item.data.map((dataItem: any) => ({
                    x: dataItem.x,
                    y: [new Date(dataItem.y[0]).getTime(), new Date(dataItem.y[1]).getTime()]
                }))
            }));
            return seriesData;
        };
    }, []);

    const [chartData, setChartData] = useState(retrieveData(data));

    useEffect(() => {
        setChartData(retrieveData(data));
    }, [data, retrieveData]);

    const chartOptions: any = {
        series: chartData,
        chart: {
            height: 450,
            type: 'rangeBar',
            toolbar: {
              show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '80%'
            }
        },
        xaxis: {
            type: 'datetime'
        },
        stroke: {
            width: 1
        },
        fill: {
            type: 'solid',
            opacity: 0.6,
        },
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
          position: 'top',
          horizontalAlign: 'center'
        },
    };

    return (
        <div className="col-span-2">
            <Widget name={name} isBookmarked={isBookmarked}>
                <ReactApexChart options={chartOptions} series={chartOptions.series} type="rangeBar" height={450} />
            </Widget>
        </div>
    );
}
