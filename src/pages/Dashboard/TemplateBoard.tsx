import {
  EyeDropperIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import Container from '../../layout/Container';
import { IconButton, PrimaryButton, SecondaryButton } from '../../components/ui/Button';
import ControlPanel from '../../layout/ControlPanel';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Card from '../../components/ui/Card';
import { Square3Stack3DIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import templates from '../../data/templates';
import Badge from '../../components/ui/Badge';
import Select from '../../components/form/Select';
import Toast from '../../components/ui/Toast';
import Dialog from '../../components/ui/Dialog';
import useCreateDashboardItem from '../../hooks/useCreateDashboardItem';
import useCreateRecord from '../../hooks/useCreateRecord';

export default function TemplateBoard() {
  const breadcrumbs = [
    {
      name: 'Templates',
      path: '/templates',
    },
  ];
  
  const navigate = useNavigate();
  const handleOpenTemplate = (id: number) => navigate(`/templates/${id}`);

  const [newDashboard, setNewDashboard] = useState({
    id: undefined,
    name: '',
    category: '',
    ownerId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
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

  const handlePinToDashboard = async (currentTemplate: any) => {
    try {
      const dashboardPayload = {
        id: undefined,
        name: currentTemplate?.title,
        category: currentTemplate?.category?.id,
        ownerId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
      }
      await createRecord({
        modelName: 'Dashboard',
        data: dashboardPayload,
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
        title: 'The template "' + currentTemplate?.title + '" has been added successfully',
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
        <PrimaryButton onClick={() => () => null}>
          <PlusCircleIcon width={20} height={20} />
          <span>New Dashboard</span>
        </PrimaryButton>
      </ControlPanel>
      <ControlPanel>
        <div className="flex items-center space-x-4">
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[]}
            value={{ id: 0, name: 'Name' }}
            handleChange={() => null}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[]}
            value={{ id: 0, name: 'Category' }}
            handleChange={() => null}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-0">
            <div className="text-[10px] font-medium text-gray-500">
              Sort By :{''}
            </div>
            <Select
              openMaxWidth
              openFromRight
              customClass="border-0 font-medium text-gray-700 space-x-2"
              items={[{id: '', name: 'Recent'}]}
              value={{id: '', name: 'Recent'}}
              handleChange={() => null}
            />
          </div>
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
          onDiscard={() => setOpenDialog(!openDialog)}
          onConfirm={() => navigate(`/dashboard/${newDashboard.id}`)}
        />
      )}
      <div className="grid grid-cols-4 gap-4">
          {
            templates.map((template: any) => (
              <div className="space-y-2 mb-2">
                <Card>
                  <div className='group relative cursor-pointer'>
                    <img src={template.src} className='rounded-md'/>
                    <div className='absolute inset-0 bg-gray-800 bg-opacity-50 rounded-md invisible group-hover:visible flex items-center justify-center space-x-4'>
                      <SecondaryButton onClick={() => handleOpenTemplate(template.id)}>
                        <EyeIcon
                          width={16}
                          height={16}
                        />
                      </SecondaryButton>
                      <SecondaryButton onClick={() => handlePinToDashboard(template)}>
                        <EyeDropperIcon
                          width={16}
                          height={16}
                        />
                      </SecondaryButton>
                    </div>
                  </div>  
                </Card>
                <div className='flex items-center justify-between px-4'>
                  <div className='flex items-center space-x-1'>
                    <h1 className='text-sm font-medium'>{template.title}</h1>
                    <Badge value={template.category?.name} color={template.category?.color}/>
                  </div>
                  <IconButton>
                    <Square3Stack3DIcon
                      width={14}
                      height={14}
                    />
                    <span className='text-xs'>{template.used}</span>
                  </IconButton>
                </div>
              </div>
            ))
          }
        </div>
    </Container>
  );
}
