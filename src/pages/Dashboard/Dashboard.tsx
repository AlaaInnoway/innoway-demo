import { useState, useRef, useMemo } from 'react';
import Container from '../../layout/Container';
import PieChart from '../../components/chart/PieChart';
import DonutChart from '../../components/chart/DonutChart';
import LineChart from '../../components/chart/LineChart';
import AreaChart from '../../components/chart/AreaChart';
import BarChart from '../../components/chart/BarChart';
import RadarChart from '../../components/chart/RadarChart';
import SimpleTile from '../../components/tile/SimpleTile';
import { paletteMenus } from '../../data/menus';
import { FilterRequest } from '../../interfaces/filter-request.interface';
import useFilterData from '../../hooks/useFetchData';
import icons from '../../data/icons';
import { useParams } from 'react-router-dom';
import DashboardPanel from '../../features/dashboard-edit/components/DashboardPanel';
import VisualizationCreation from '../../features/dashboard-creation/components/VisualizationCreation';

export default function Dashboard() {
  const [layoutEditable, setLayoutEditable] = useState(false);
  const [previewActivated, setPreviewActivated] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState(paletteMenus[0]);
  const printRef = useRef(null);
  const { id } = useParams();

  const handleLayoutEditable = () => {
    setLayoutEditable(!layoutEditable);
  };

  const filterData: FilterRequest = useMemo(() => ({
    modelName: 'DashboardItem',
    filters: [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'dashboard.id',
            operator: 'equals',
            values: id ? parseInt(id, 10) : null,
          },
        ],
      },
    ],
    selectFields: [
      'id',
      'sequence',
      'type',
      'title',
      'paletteColor',
      'isBookmarked',
      'aggregationOptions',
      'measureField',
      'isClickable',
      'data',
      'icon',
    ],
    sortField: 'sequence',
    sortOrder: 'asc',
    page: 1,
    perPage: 100,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  }), [id]);

  const { data, isLoading } = useFilterData(filterData);

  return (
    <Container>
        <DashboardPanel 
          layoutEditable={layoutEditable} 
          handleLayoutEditable={handleLayoutEditable}
          handleOpenPanel={() => setOpenPanel(!openPanel)}
          printRef={printRef}
        />
      {openPanel && (
        <VisualizationCreation 
          openPanel={openPanel} 
          setOpenPanel={setOpenPanel} 
          selectedPalette={selectedPalette} 
          setSelectedPalette={setSelectedPalette} 
          previewActivated={previewActivated} 
          setPreviewActivated={setPreviewActivated} 
        />
      )}
      {!previewActivated && (
        <div className="grid grid-cols-4 gap-4" ref={printRef}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
              data.records.map((item: any) => (
              <>
                {item.type === 'tile' && (
                  <SimpleTile
                    key={item.id}
                    name={item.title}
                    value={item.data}
                    palette={
                      paletteMenus.find(
                        (palette) => palette.theme === item.paletteColor
                      )?.tileColors
                    }
                    icon={
                      icons.find((icon) => icon.name === item.icon)?.preview
                    }
                    isBookmarked={item.isBookmarked}
                    rounded
                  />
                )}
                {item.type === 'pie' && (
                  <PieChart
                    key={item.id}
                    name={item.title}
                    isBookmarked={item.isBookmarked}
                    aggregationOptions={item.aggregationOptions}
                    measureField={item.measureField}
                    palette={
                      paletteMenus.find(
                        (palette) => palette.theme === item.paletteColor
                      )?.colors
                    }
                    data={Object.entries(item.data)}
                  />
                )}
                {item.type === 'donut' && (
                  <DonutChart
                    key={item.id}
                    name={item.title}
                    isBookmarked={item.isBookmarked}
                    aggregationOptions={item.aggregationOptions}
                    measureField={item.measureField}
                    palette={
                      paletteMenus.find(
                        (palette) => palette.theme === item.paletteColor
                      )?.colors
                    }
                    data={Object.entries(item.data)}
                  />
                )}
                {item.type === 'bar' && (
                  <BarChart
                    key={item.id}
                    name={item.title}
                    isBookmarked={item.isBookmarked}
                    aggregationOptions={item.aggregationOptions}
                    measureField={item.measureField}
                    palette={
                      paletteMenus.find(
                        (palette) => palette.theme === item.paletteColor
                      )?.colors
                    }
                    data={Object.entries(item.data)}
                  />
                )}
                {item.type === 'line' && (
                  <LineChart
                    key={item.id}
                    name={item.title}
                    isBookmarked={item.isBookmarked}
                    aggregationOptions={item.aggregationOptions}
                    measureField={item.measureField}
                    palette={
                      paletteMenus.find(
                        (palette) => palette.theme === item.paletteColor
                      )?.colors
                    }
                    data={Object.entries(item.data)}
                  />
                )}
                {item.type === 'area' && (
                  <AreaChart
                    key={item.id}
                    name={item.title}
                    isBookmarked={item.isBookmarked}
                    aggregationOptions={item.aggregationOptions}
                    measureField={item.measureField}
                    palette={
                      paletteMenus.find(
                        (palette) => palette.theme === item.paletteColor
                      )?.colors
                    }
                    data={Object.entries(item.data)}
                  />
                )}
                {item.type === 'radar' && (
                  <RadarChart
                    key={item.id}
                    name={item.title}
                    isBookmarked={item.isBookmarked}
                    aggregationOptions={item.aggregationOptions}
                    measureField={item.measureField}
                    palette={
                      paletteMenus.find(
                        (palette) => palette.theme === item.paletteColor
                      )?.colors
                    }
                    data={Object.entries(item.data)}
                  />
                )}
              </>
            ))
          )}
        </div>
      )}
    </Container>
  );
}
