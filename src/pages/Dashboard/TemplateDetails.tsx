import { useState, useEffect, useMemo } from 'react';
import {
  EyeDropperIcon,
} from '@heroicons/react/24/outline';
import Container from '../../layout/Container';
import { PrimaryButton } from '../../components/ui/Button';
import PieChart from '../../components/chart/PieChart';
import DonutChart from '../../components/chart/DonutChart';
import LineChart from '../../components/chart/LineChart';
import AreaChart from '../../components/chart/AreaChart';
import BarChart from '../../components/chart/BarChart';
import RadarChart from '../../components/chart/RadarChart';
import SimpleTile from '../../components/tile/SimpleTile';
import ControlPanel from '../../layout/ControlPanel';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Dialog from '../../components/ui/Dialog';
import Toast from '../../components/ui/Toast';
import useCreateRecord from '../../hooks/useCreateRecord';
import { paletteMenus } from '../../data/menus';
import icons from '../../data/icons';
import templates from '../../data/templates';
import { useNavigate, useParams } from 'react-router-dom';
import useCreateDashboardItem from '../../hooks/useCreateDashboardItem';

export default function TemplateDetails() {
  const [currentTemplate, setCurrentTemplate]: any = useState(null);
  const [newDashboard, setNewDashboard] = useState({
    id: undefined,
    name: '',
    category: '',
    ownerId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  const navigate = useNavigate();
  const { id } = useParams();
  const breadcrumbs = useMemo(
    () => [
      {
        name: 'Template',
        path: '/templates',
      },
    ],
    []
  );

  useEffect(() => {
    const template: any = templates.filter((item:any) => item.id == id)[0];
    console.log(template)
    setCurrentTemplate(template);
    setNewDashboard({
      ...newDashboard,
      name: template?.title,
      category: template?.category?.id,
    });
    // Update breadcrumb
    if (breadcrumbs.length === 1)
      breadcrumbs.push({
        name: template?.title,
        path: `/templates/${id}`,
      });
  }, [breadcrumbs, currentTemplate, id]);
  const queryKey = 'filterData';
  const { createDashboard } = useCreateDashboardItem(queryKey);
  const { createRecord } = useCreateRecord(queryKey);
  const handleCreateDashboardItem = async (item: any, dashboardId: number) => {
    const recordData =
      item.type === 'tile'
        ? {
            dashboardId,
            type: item.type,
            title: item.title,
            paletteColor: item.paletteColor,
            isBookmarked: item.isBookmarked,
            isClickable: item.isClickable,
            modelName: item.modelName,
            filters: [],
            selectFields: ['id', item.measureField],
            aggregationOptions: item.aggregationOptions,
            groupByField: null,
            subGroupByField: null,
            measureField: item.measureField,
            sortOrder: 'asc',
            limit: 100,
            data: '',
            icon: item.icon,
            sequence: item.sequence,
          }
        : {
            dashboardId,
            type: item.type,
            title: item.title,
            paletteColor: item.paletteColor,
            isBookmarked: item.isBookmarked,
            isClickable: item.isClickable,
            modelName: item.modelName,
            filters: [],
            selectFields: [
              'id',
              item.groupByField,
              item.aggregationOptions === 'count'
                ? 'id'
                : item.measureField,
            ],
            aggregationOptions: item.aggregationOptions,
            groupByField: item.groupByField,
            subGroupByField: null,
            measureField:
              item.aggregationOptions === 'count'
                ? 'id'
                : item.measureField,
            sortOrder: 'asc',
            limit: 100,
            data: '',
            icon: '',
            sequence: item.sequence,
          };
    try {
      await createDashboard(recordData);
      // Handle success or further actions
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };
  

  const handlePinToDashboard = async () => {
    try {
      await createRecord({
        modelName: 'Dashboard',
        data: newDashboard,
      }).then((newRecord: any) => {
        currentTemplate.data.forEach((item: any) => handleCreateDashboardItem(item, newRecord.id));
        setNewDashboard({
          ...newDashboard,
          id: newRecord.id,
        })
      });
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'The template "' + newDashboard.name + '" has been added successfully',
        type: 'info',
      });
      
      setOpenDialog(!openDialog);
      
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  return (
    <Container>
      <ControlPanel>
        <Breadcrumb items={breadcrumbs} />
        <div className="flex items-center">
          <PrimaryButton
            onClick={handlePinToDashboard}
          >
            <EyeDropperIcon width={20} height={20} />
            <span>Use Template</span>
          </PrimaryButton>
        </div>
      </ControlPanel>
      {openToast && <Toast title={toastData.title} type={toastData.type} />}
      {openDialog && (
        <Dialog
          title="Select your next action"
          message="The template is now added to your dashboards section. Please select your next action :"
          open={openDialog}
          discardButton="Browse Templates"
          confirmButton="My Dashboard"
          onDiscard={() => navigate('/templates')}
          onConfirm={() => navigate(`/dashboard/${newDashboard.id}`)}
        />
      )}
      <div className="grid grid-cols-4 gap-4">
          {currentTemplate?.data?.map((item: any) => (
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
            ))}
        </div>
    </Container>
  );
}
