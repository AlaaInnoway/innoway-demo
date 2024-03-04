import Checkbox from "../../../components/form/Checkbox";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import Switch from "../../../components/form/Switch";
import { PrimaryButton } from "../../../components/ui/Button";
import SidePanel from "../../../components/ui/SidePanel";
import Toast from "../../../components/ui/Toast";
import { fetchAvailableModels, fetchFieldsForModel } from "../../../services/model.service";
import { useEffect, useState } from "react";
import StepperDashboard from "../../../components/ui/StepperDashboard";
import icons from "../../../data/icons";
import { paletteMenus } from "../../../data/menus";
import steps from "../../../data/steps";
import useCreateDashboardItem from "../../../hooks/useCreateDashboardItem";
import { EyeDropperIcon } from "@heroicons/react/24/outline";
import WidgetPreview from "../../../components/preview/WidgetPreview";
import { useParams } from "react-router-dom";
import fetchFilterData from "../../../services/filter.service";

const VisualizationCreation = (
    { 
        openPanel, setOpenPanel,
        selectedPalette, setSelectedPalette, 
        previewActivated, setPreviewActivated 
    }: any) => {

    const [visualizationTitle, setVisualizationTitle] = useState(''); 
    const [bookmarked, setBookmarked] = useState(false);
    const [clickable, setClickable] = useState(false);
    const [currentStep, setCurrenStep] = useState(steps[0]);

    const [models, setModels] = useState<{
        id: string; name: string; fields: { id: string; name: string }[] }[]
    >([]);
    const [selectedModel, setSelectedModel] = useState<{
    id: string;
    name: string;
    }>();
    const [selectedAggregation, setSelectedAggregation] = useState<{
    id: string;
    name: string;
    }>();
    const [selectedAggregationBy, setSelectedAggregationBy] = useState<{
    id: string;
    name: string;
    }>();
    const [selectedGroupBy, setSelectedGroupBy] = useState<{
    id: string;
    name: string;
    }>();
    const [selectedIcon, setSelectedIcon] = useState<{
    id: string;
    name: string;
    }>();
    const [fields, setFields] = useState<{ id: string; name: string }[]>([]);
    const [visualizationType, setVisualizationType] = useState('tile');
    const [openToast, setOpenToast] = useState(false);
    const [toastData, setToastData] = useState({ title: '', type: '' });
    const { id } = useParams();

  const handleBookmarked = () => {
    setBookmarked(!bookmarked);
  };

  const handleClickable = () => {
    setClickable(!clickable);
  };

  const handleCurrentStep = (offset: number) => {
    setCurrenStep(
      steps[steps.findIndex((step) => step === currentStep) + offset]
    );
  };

  const handleTitleChange = (e: any) => {
    setVisualizationTitle(e.target.value);
  };

  useEffect(() => {
    fetchAvailableModels()
      .then((data) => setModels(data))
      .catch((error) => console.error('Error fetching models:', error));
  }, []);

  const handleModelChange = (selectedItem: any) => {
    setSelectedModel(selectedItem);

    if (selectedItem) {
      fetchFieldsForModel(selectedItem.name)
        .then((data) => setFields(data))
        .catch((error) => console.error('Error fetching fields:', error));
    } else {
      setFields([]);
    }
  };

  const handleAggregationChange = (selectedItem: any) => {
    setSelectedAggregation(selectedItem);
    // set aggregation by field to empty when the aggregation is count
    if (selectedItem.id === 'count') setSelectedAggregationBy(undefined);
  };

  const aggregationOptions = [
    {
      id: 'count',
      name: 'Count',
    },
    {
      id: 'sum',
      name: 'Sum',
    },
    {
      id: 'average',
      name: 'Average',
    },
  ];

  const retrieveLastDashboardItem = async () => {
    return fetchFilterData({
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
      selectFields: ['id', 'sequence'],
      sortField: 'sequence',
      sortOrder: 'desc',
      page: 1,
      perPage: 1,
      groupByField: undefined,
      groupByAggregates: [],
      aggregates: [],
    });
  };
      

  const queryKey = 'filterData';
  const { createDashboard } = useCreateDashboardItem(queryKey);
  const handleCreate = async () => {
    
    try {
      retrieveLastDashboardItem().then(async (items: any) => {
        console.log('items');
        console.log(items);
        const sequence = (items?.records[0]?.sequence || 0) + 1;
        const recordData =
        visualizationType === 'tile'
        ? {
            dashboardId: parseInt(id || ''),
            type: visualizationType,
            title: visualizationTitle,
            paletteColor: selectedPalette.theme,
            isBookmarked: bookmarked,
            isClickable: clickable,
            modelName: selectedModel?.id,
            filters: [],
            selectFields: ['id', selectedAggregationBy?.id],
            aggregationOptions: selectedAggregation?.id,
            groupByField: null,
            subGroupByField: null,
            measureField: selectedAggregationBy?.id,
            sortOrder: 'asc',
            limit: 100,
            data: '',
            icon: selectedIcon?.name,
            sequence,
          }
        : {
            dashboardId: parseInt(id || ''),
            type: visualizationType,
            title: visualizationTitle,
            paletteColor: selectedPalette.theme,
            isBookmarked: bookmarked,
            isClickable: clickable,
            modelName: selectedModel?.id,
            filters: [],
            selectFields: [
              'id',
              selectedGroupBy?.id,
              selectedAggregation?.id === 'count'
                ? 'id'
                : selectedAggregationBy?.id,
            ],
            aggregationOptions: selectedAggregation?.id,
            groupByField: selectedGroupBy?.id,
            subGroupByField: null,
            measureField:
              selectedAggregation?.id === 'count'
                ? 'id'
                : selectedAggregationBy?.id,
            sortOrder: 'asc',
            limit: 100,
            data: '',
            icon: '',
            sequence,
        };
        await createDashboard(recordData);
        setOpenPanel(!openPanel);
        setOpenToast(!openToast);
        // Handle toast success or further actions
        setToastData({
            title: 'Dashboard has been added successfully',
            type: 'success',
        });
      });
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  const handlePinToDashboard = () => {
    handleCreate();
  };

  return (
    <>
        {previewActivated && (
            <WidgetPreview type={visualizationType} title={visualizationTitle} colors={selectedPalette.colors} />
        )}
        {openToast && <Toast title={toastData.title} type={toastData.type} />}
        <SidePanel
        title="New visualization"
        open={openPanel}
        handleClick={() => setOpenPanel(!openPanel)}
        >
        {/* Stepper Component */}
        <StepperDashboard
            items={steps}
            currentStep={currentStep}
            back={handleCurrentStep}
            next={handleCurrentStep}
        />
        {/* Step 1: Type and Title */}
        {currentStep.number === 1 && (
            <div className="space-y-6 pt-6">
                <div className="space-y-2">
                    <label
                    htmlFor="chart-type"
                    className="block text-sm font-medium text-gray-600"
                    >
                    Type
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                    <div>
                        <input
                        type="radio"
                        name="option"
                        id="1"
                        className="peer hidden"
                        checked={visualizationType === 'tile'}
                        onChange={() => setVisualizationType('tile')}
                        />
                        <label
                        title="Tile"
                        htmlFor="1"
                        className="block w-14 h-14 cursor-pointer select-none rounded-lg p-2 space-y-2 text-center border border-gray-300 text-gray-500 peer-checked:border-serene-500 peer-checked:text-serene-500"
                        >
                        <div className="flex justify-center">
                            <svg
                            viewBox="64 64 896 896"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            >
                            <path d="M264 230h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H264c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm496 424c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H264c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496zm144 140H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-424H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
                            </svg>
                        </div>
                        <div className="text-[11px] text-current text-center">
                            Tile
                        </div>
                        </label>
                    </div>
                    <div>
                        <input
                        type="radio"
                        name="option"
                        id="2"
                        className="peer hidden"
                        checked={visualizationType === 'pie'}
                        onChange={() => setVisualizationType('pie')}
                        />
                        <label
                        title="Pie Chart"
                        htmlFor="2"
                        className="block w-14 h-14 cursor-pointer select-none rounded-lg p-2 space-y-2 text-center border border-gray-300 text-gray-500 peer-checked:border-serene-500 peer-checked:text-serene-500"
                        >
                        <div className="flex justify-center">
                            <svg
                            viewBox="64 64 896 896"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            >
                            <path d="M864 518H506V160c0-4.4-3.6-8-8-8h-26a398.46 398.46 0 00-282.8 117.1 398.19 398.19 0 00-85.7 127.1A397.61 397.61 0 0072 552a398.46 398.46 0 00117.1 282.8c36.7 36.7 79.5 65.6 127.1 85.7A397.61 397.61 0 00472 952a398.46 398.46 0 00282.8-117.1c36.7-36.7 65.6-79.5 85.7-127.1A397.61 397.61 0 00872 552v-26c0-4.4-3.6-8-8-8zM705.7 787.8A331.59 331.59 0 01470.4 884c-88.1-.4-170.9-34.9-233.2-97.2C174.5 724.1 140 640.7 140 552c0-88.7 34.5-172.1 97.2-234.8 54.6-54.6 124.9-87.9 200.8-95.5V586h364.3c-7.7 76.3-41.3 147-96.6 201.8zM952 462.4l-2.6-28.2c-8.5-92.1-49.4-179-115.2-244.6A399.4 399.4 0 00589 74.6L560.7 72c-4.7-.4-8.7 3.2-8.7 7.9V464c0 4.4 3.6 8 8 8l384-1c4.7 0 8.4-4 8-8.6zm-332.2-58.2V147.6a332.24 332.24 0 01166.4 89.8c45.7 45.6 77 103.6 90 166.1l-256.4.7z" />
                            </svg>
                        </div>
                        <div className="text-[11px] text-current text-center">
                            Pie
                        </div>
                        </label>
                    </div>
                    <div>
                        <input
                        type="radio"
                        name="option"
                        id="3"
                        className="peer hidden"
                        checked={visualizationType === 'bar'}
                        onChange={() => setVisualizationType('bar')}
                        />
                        <label
                        title="Bar Chart"
                        htmlFor="3"
                        className="block w-14 h-14 cursor-pointer select-none rounded-lg p-2 space-y-2 text-center border border-gray-300 text-gray-500 peer-checked:border-serene-500 peer-checked:text-serene-500"
                        >
                        <div className="flex justify-center">
                            <svg
                            viewBox="64 64 896 896"
                            width="1rem"
                            height="1em"
                            fill="currentColor"
                            >
                            <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-600-80h56c4.4 0 8-3.6 8-8V560c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V384c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v320c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V462c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v242c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v400c0 4.4 3.6 8 8 8z" />
                            </svg>
                        </div>
                        <div className="text-[11px] text-current text-center">
                            Bar
                        </div>
                        </label>
                    </div>
                    <div>
                        <input
                        type="radio"
                        name="option"
                        id="4"
                        className="peer hidden"
                        checked={visualizationType === 'bubble'}
                        onChange={() => setVisualizationType('bubble')}
                        />
                        <label
                        title="Bubble Chart"
                        htmlFor="4"
                        className="block w-14 h-14 cursor-pointer select-none rounded-lg p-2 space-y-2 text-center border border-gray-300 text-gray-500 peer-checked:border-serene-500 peer-checked:text-serene-500"
                        >
                        <div className="flex justify-center">
                            <svg
                            viewBox="64 64 896 896"
                            width="1rem"
                            height="1em"
                            fill="currentColor"
                            >
                            <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM288 604a64 64 0 10128 0 64 64 0 10-128 0zm118-224a48 48 0 1096 0 48 48 0 10-96 0zm158 228a96 96 0 10192 0 96 96 0 10-192 0zm148-314a56 56 0 10112 0 56 56 0 10-112 0z" />
                            </svg>
                        </div>
                        <div className="text-[11px] text-current text-center">
                            Bubble
                        </div>
                        </label>
                    </div>
                    <div>
                        <input
                        type="radio"
                        name="option"
                        id="5"
                        className="peer hidden"
                        checked={visualizationType === 'line'}
                        onChange={() => setVisualizationType('line')}
                        />
                        <label
                        title="Line Chart"
                        htmlFor="5"
                        className="block w-14 h-14 cursor-pointer select-none rounded-lg p-2 space-y-2 text-center border border-gray-300 text-gray-500 peer-checked:border-serene-500 peer-checked:text-serene-500"
                        >
                        <div className="flex justify-center">
                            <svg
                            viewBox="64 64 896 896"
                            width="1rem"
                            height="1em"
                            fill="currentColor"
                            >
                            <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 00-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 00-11.3 0L266.3 586.7a8.03 8.03 0 000 11.3l39.5 39.7z" />
                            </svg>
                        </div>
                        <div className="text-[11px] text-current text-center">
                            Line
                        </div>
                        </label>
                    </div>
                    <div>
                        <input
                        type="radio"
                        name="option"
                        id="6"
                        className="peer hidden"
                        checked={visualizationType === 'area'}
                        onChange={() => setVisualizationType('area')}
                        />
                        <label
                        title="Area Chart"
                        htmlFor="6"
                        className="block w-14 h-14 cursor-pointer select-none rounded-lg p-2 space-y-2 text-center border border-gray-300 text-gray-500 peer-checked:border-serene-500 peer-checked:text-serene-500"
                        >
                        <div className="flex justify-center">
                            <svg
                            viewBox="64 64 896 896"
                            width="1rem"
                            height="1em"
                            fill="currentColor"
                            >
                            <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-616-64h536c4.4 0 8-3.6 8-8V284c0-7.2-8.7-10.7-13.7-5.7L592 488.6l-125.4-124a8.03 8.03 0 00-11.3 0l-189 189.6a7.87 7.87 0 00-2.3 5.6V720c0 4.4 3.6 8 8 8z" />
                            </svg>
                        </div>
                        <div className="text-[11px] text-current text-center">
                            Area
                        </div>
                        </label>
                    </div>
                    <div>
                        <input
                        type="radio"
                        name="option"
                        id="7"
                        className="peer hidden"
                        checked={visualizationType === 'radar'}
                        onChange={() => setVisualizationType('radar')}
                        />
                        <label
                        title="Radar Chart"
                        htmlFor="7"
                        className="block w-14 h-14 cursor-pointer select-none rounded-lg p-2 space-y-2 text-center border border-gray-300 text-gray-500 peer-checked:border-serene-500 peer-checked:text-serene-500"
                        >
                        <div className="flex justify-center">
                            <svg
                            viewBox="64 64 896 896"
                            width="1rem"
                            height="1em"
                            fill="currentColor"
                            >
                            <path d="M926.8 397.1l-396-288a31.81 31.81 0 00-37.6 0l-396 288a31.99 31.99 0 00-11.6 35.8l151.3 466a32 32 0 0030.4 22.1h489.5c13.9 0 26.1-8.9 30.4-22.1l151.3-466c4.2-13.2-.5-27.6-11.7-35.8zM838.6 417l-98.5 32-200-144.7V199.9L838.6 417zM466 567.2l-89.1 122.3-55.2-169.2L466 567.2zm-116.3-96.8L484 373.3v140.8l-134.3-43.7zM512 599.2l93.9 128.9H418.1L512 599.2zm28.1-225.9l134.2 97.1L540.1 514V373.3zM558 567.2l144.3-46.9-55.2 169.2L558 567.2zm-74-367.3v104.4L283.9 449l-98.5-32L484 199.9zM169.3 470.8l86.5 28.1 80.4 246.4-53.8 73.9-113.1-348.4zM327.1 853l50.3-69h269.3l50.3 69H327.1zm414.5-33.8l-53.8-73.9 80.4-246.4 86.5-28.1-113.1 348.4z" />
                            </svg>
                        </div>
                        <div className="text-[11px] text-current text-center">
                            Radar
                        </div>
                        </label>
                    </div>
                    <div>
                        <input
                        type="radio"
                        name="option"
                        id="8"
                        className="peer hidden"
                        checked={visualizationType === 'gauge'}
                        onChange={() => setVisualizationType('gauge')}
                        />
                        <label
                        title="Gauge Chart"
                        htmlFor="8"
                        className="block w-14 h-14 cursor-pointer select-none rounded-lg p-2 space-y-2 text-center border border-gray-300 text-gray-500 peer-checked:border-serene-500 peer-checked:text-serene-500"
                        >
                        <div className="flex justify-center">
                            <svg
                            viewBox="64 64 896 896"
                            width="1rem"
                            height="1em"
                            fill="currentColor"
                            >
                            <path d="M924.8 385.6a446.7 446.7 0 00-96-142.4 446.7 446.7 0 00-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 00-142.4 96 446.7 446.7 0 00-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM761.4 836H262.6A371.12 371.12 0 01140 560c0-99.4 38.7-192.8 109-263 70.3-70.3 163.7-109 263-109 99.4 0 192.8 38.7 263 109 70.3 70.3 109 163.7 109 263 0 105.6-44.5 205.5-122.6 276zM623.5 421.5a8.03 8.03 0 00-11.3 0L527.7 506c-18.7-5-39.4-.2-54.1 14.5a55.95 55.95 0 000 79.2 55.95 55.95 0 0079.2 0 55.87 55.87 0 0014.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3l-28.3-28.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8zm260 218v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8zm12.7-197.2l-31.1-31.1a8.03 8.03 0 00-11.3 0l-56.6 56.6a8.03 8.03 0 000 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3zm-458.6-31.1a8.03 8.03 0 00-11.3 0l-31.1 31.1a8.03 8.03 0 000 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8z" />
                            </svg>
                        </div>
                        <div className="text-[11px] text-current text-center">
                            Gauge
                        </div>
                        </label>
                    </div>
                    </div>
                </div>
                <Input
                    label="Title"
                    placeholder="Enter a descriptive title for your visualization"
                    value={visualizationTitle}
                    handleChange={handleTitleChange}
                />
                </div>
            )}
            {/* Step 2: Model, Group By, Aggregation */}
            {currentStep.number === 2 && (
                <div className="space-y-6 pt-6">
                <Select
                    label="Model"
                    items={models}
                    value={selectedModel}
                    handleChange={(item: any) => handleModelChange(item)}
                />
                {visualizationType !== 'tile' && (
                    <Select
                    label="Group By"
                    items={fields}
                    value={selectedGroupBy}
                    handleChange={(item: any) => setSelectedGroupBy(item)}
                    />
                )}
                <Select
                    label="Aggregation Measure"
                    items={aggregationOptions}
                    value={selectedAggregation}
                    handleChange={(item: any) => handleAggregationChange(item)}
                />
                {selectedAggregation?.id !== 'count' && (
                    <Select
                    label="Aggregation By"
                    items={fields}
                    value={selectedAggregationBy}
                    handleChange={(item: any) => setSelectedAggregationBy(item)}
                    />
                )}
                </div>
            )}
            {/* Step 3: Palette, Options */}
            {currentStep.number === 3 && (
                <div className="space-y-6 pt-6">
                <Select
                    label="Palette"
                    items={paletteMenus}
                    value={selectedPalette}
                    handleChange={(item: any) => setSelectedPalette(item)}
                />
                {visualizationType === 'tile' && (
                    <>
                        <Select
                            label="Icon"
                            items={icons}
                            value={selectedIcon}
                            handleChange={(item: any) => setSelectedIcon(item)}
                        />
                        <Checkbox
                            id="rounded-chart"
                            name="rounded-chart"
                            label="Rounded"
                            value={clickable}
                            handleChange={handleClickable}
                        />
                        <Checkbox
                            id="inverse-chart"
                            name="inverse-chart"
                            label="Inverse"
                            value={clickable}
                            handleChange={handleClickable}
                        />
                    </>
                )}
                <Checkbox
                    id="clickable-chart"
                    name="clickable-chart"
                    label="Clickable"
                    value={clickable}
                    handleChange={handleClickable}
                />
                {visualizationType === 'bar' && (
                    <>
                        <Checkbox
                            id="stacked-chart"
                            name="stacked-chart"
                            label="Stacked"
                            value={bookmarked}
                            handleChange={handleBookmarked}
                        />
                        <Checkbox
                            id="horizontal-chart"
                            name="horizontal-chart"
                            label="Horizontal"
                            value={bookmarked}
                            handleChange={handleBookmarked}
                        />
                    </>
                )}
                <Checkbox
                    id="save-bookmark"
                    name="save-bookmark"
                    label="Bookmarked"
                    value={bookmarked}
                    handleChange={handleBookmarked}
                />
                </div>
            )}
            {/* Preview and Pin */}
            <div className="space-y-6 pt-6">
                <Switch
                    label="Preview in dashboard"
                    value={previewActivated}
                    handleChange={setPreviewActivated}
                />
                <div className="flex items-center justify-center space-x-2">
                    {currentStep.number === steps.length && (
                        <PrimaryButton onClick={handlePinToDashboard}>
                            <EyeDropperIcon width={16} height={16} />
                            <span>Pin to dashboard</span>
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </SidePanel>
    </>
  );
};

export default VisualizationCreation;
