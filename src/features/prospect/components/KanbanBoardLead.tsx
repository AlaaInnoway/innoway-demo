import {
    useState,
    DragEvent,
    useEffect,
  } from "react";
  import { motion } from "framer-motion";
import { BuildingOfficeIcon, ClockIcon, StarIcon } from "@heroicons/react/24/outline";
import Card from "../../../components/ui/Card";
import Avatar from "../../../components/ui/Avatar";
import Badge from "../../../components/ui/Badge";
import { IconButton } from "../../../components/ui/Button";
import useUpdateRecord from "../../../hooks/useUpdateRecord";
import useFilterData from "../../../hooks/useFetchData";
import API_BASE_URL from "../../../config";
import {
  retrieveDay,
  retrieveMonth,
  retrieveYear,
} from '../../../utils/formatDate';
import { UseMutationResult } from "react-query";
import ProgressBar from "../../../components/ui/ProgressBar";
import DropdownAction from "../../../components/ui/DropdownAction";

type Stage = {
  id: number;
  name: string;
  color: string | undefined;
  children: any[];
};

type ActionMenu = any[];

type KanbanBoardProps = {
  modelName: string;
  filterData: any;
  stages: Stage[];
  actionMenu: ActionMenu;
};

const KanbanBoardLead = <T,>({ modelName, filterData, stages, actionMenu }: KanbanBoardProps) => {
  const [cards, setCards] = useState<T[]>([]);
  const { data, isLoading, refetch } = useFilterData(filterData);
  const updateRecord = useUpdateRecord(modelName);

  useEffect(() => {
    setCards(data?.records);
  }, [data?.records]);

  useEffect(() => {
    if (updateRecord.isSuccess) {
      refetch();
    }
  }, [updateRecord.isSuccess, refetch]);

  return (
    <div className="grid grid-cols-5 h-full w-full gap-4">
      {!isLoading && stages.map((stage:any) => (
        <Column
          modelName={modelName}
          stage={stage}
          cards={cards}
          updateRecord={updateRecord}
          actionMenu={actionMenu}
        />
      ))}
    </div>
  );
};

export default KanbanBoardLead;
  
  type ColumnProps = {
    modelName: string;
    cards: any[];
    stage: {
      color: string | undefined;
      children: any[];id: number, name: string
    };
    actionMenu: any[];
    updateRecord: UseMutationResult<any, unknown, { modelName: string; recordId: number; updates: { stageId: number; subStageId: number | null; } }, unknown>;
  };
  
  const Column = ({
    modelName,
    cards,
    stage,
    updateRecord,
    actionMenu
  }: ColumnProps) => {
    const [active, setActive] = useState(false);
  
    const handleDragStart = (e: DragEvent, card: any) => {
      e.dataTransfer.setData("cardId", card.id);
    };
  
    const handleDragEnd = async(e: DragEvent) => {
      const cardId = e.dataTransfer.getData("cardId");

      // update stage & substage (if exist)
      await updateRecord.mutateAsync({
        modelName,
        recordId: parseInt(cardId, 10),
        updates: {
          stageId : stage.id,
          subStageId : stage.children.length ? stage.children[0].id : null,
        },
      });
  
      setActive(false);
      clearHighlights();
  
      const indicators = getIndicators();
      const { element } = getNearestIndicator(e, indicators);
  
      const before = element.dataset.before || "-1";
  
      if (before !== cardId) {
        let copy = [...cards];
  
        let cardToTransfer = copy.find((c) => c.id === cardId);
        if (!cardToTransfer) return;
        cardToTransfer = { ...cardToTransfer, stage };
  
        copy = copy.filter((c) => c.id !== cardId);
  
        const moveToBack = before === "-1";
  
        if (moveToBack) {
          copy.push(cardToTransfer);
        } else {
          const insertAtIndex = copy.findIndex((el) => el.id === before);
          if (insertAtIndex === undefined) return;
  
          copy.splice(insertAtIndex, 0, cardToTransfer);
        }
      }
    };
  
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      highlightIndicator(e);
  
      setActive(true);
    };
  
    const clearHighlights = (els?: HTMLElement[]) => {
      const indicators = els || getIndicators();
  
      indicators.forEach((i) => {
        i.style.opacity = "0";
      });
    };
  
    const highlightIndicator = (e: DragEvent) => {
      const indicators = getIndicators();
  
      clearHighlights(indicators);
  
      const el = getNearestIndicator(e, indicators);
  
      el.element.style.opacity = "1";
    };
  
    const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
      const DISTANCE_OFFSET = 50;
  
      const el = indicators.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
  
          const offset = e.clientY - (box.top + DISTANCE_OFFSET);
  
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        {
          offset: Number.NEGATIVE_INFINITY,
          element: indicators[indicators.length - 1],
        }
      );
  
      return el;
    };
  
    const getIndicators = () => {
      return Array.from(
        document.querySelectorAll(
          `[data-column="${stage.id}"]`
        ) as unknown as HTMLElement[]
      );
    };
  
    const handleDragLeave = () => {
      clearHighlights();
      setActive(false);
    };
  
    const filteredCards = cards.filter((c) => c.stage.id === stage.id);
  
    return (
      <div className="grid-cols-1 shrink-0">
        <div className="mb-3 flex items-center justify-between bg-white px-4 py-2 rounded-md">
          <h3 className="font-medium text-sm">{stage.name}</h3>
          <Badge value={filteredCards.length} color={stage.color} size="lg"/>
        </div>
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-full w-full transition-colors space-y-2 ${
            active ? "bg-gray-100" : "bg-transparent"
          }`}
        >
          {filteredCards.map((c) => {
            return <CardColumn key={c.id} data={c} {...c} handleDragStart={handleDragStart} actionMenu={actionMenu} />;
          })}
          <DropIndicator beforeId={null} stage={stage} />
        </div>
      </div>
    );
  };
  
  type CardProps = any & {
    // eslint-disable-next-line @typescript-eslint/ban-types
    handleDragStart: Function;
  };
  
  const CardColumn = ({ name, id, stage, data, actionMenu, handleDragStart }: CardProps) => {
    const priorities = ['Low', 'Medium', 'High'];
    return (
      <>
        <DropIndicator beforeId={id} stage={stage} />
        <motion.div
          layout
          layoutId={id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { name, id, stage })}
          className="cursor-grab active:cursor-grabbing"
        >
          <Card>
            <div className="group space-y-2">
              <div className="absolute right-4 z-20 invisible group-hover:visible">
                <DropdownAction actionMenu={actionMenu} recordId={data.id} />
              </div>
              <div className="space-y-2">
                {data.organization && (
                  <div className="flex items-center space-x-1 text-xs font-medium text-gray-500">
                      <Avatar
                        icon={
                          <BuildingOfficeIcon className="text-serene-600" />
                        }
                        src={
                          data.organization.img &&
                          API_BASE_URL + data.organization.img
                        }
                      />
                      <span>{data.organization?.name}</span>
                  </div>
                )}
                {data.individual && (
                  <div className="flex items-center space-x-1 text-xs font-medium text-gray-500">
                      <Avatar
                        icon={<div>{data.individual?.name[0]}</div>}
                        src={
                          data.individual.img &&
                          API_BASE_URL + data.individual.img
                        }
                      />
                      <span>{data.individual?.name}</span>
                  </div>
                )}
                <div className="text-sm font-medium text-gray-600">{data.name}</div>
                <div className="-space-y-2">
                  <div className="flex items-center space-x-1 pt-2">
                    <IconButton disabled customClass="opacity-100">
                      <StarIcon
                        width={16}
                        height={16}
                        className="stroke-yellow-300 fill-yellow-300"
                      />
                    </IconButton>
                    <IconButton disabled customClass="opacity-100">
                      <StarIcon
                        width={16}
                        height={16}
                        className={`${
                          priorities.indexOf(data.priority) !== 0
                            ? 'stroke-yellow-300 fill-yellow-300'
                            : 'stroke-gray-500'
                        }`}
                      />
                    </IconButton>
                    <IconButton disabled customClass="opacity-100">
                      <StarIcon
                        width={16}
                        height={16}
                        className={`${
                          priorities.indexOf(data.priority) === 2
                            ? 'stroke-yellow-300 fill-yellow-300'
                            : 'stroke-gray-500'
                        }`}
                      />
                    </IconButton>
                  </div>
                  <ProgressBar percent={data.score} reverse />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Badge 
                  icon={<ClockIcon width={16} height={16} />} 
                  value={
                    data.expectedConversion ? (
                      retrieveDay(new Date(data.expectedConversion), '2-digit')+' '+
                      retrieveMonth(new Date(data.expectedConversion), 'short')+' '+
                      retrieveYear(new Date(data.expectedConversion), 'numeric')
                    ) : 'No date'
                  }
                />
                <Avatar
                  icon={<div>{data.user?.name[0]}</div>}
                  src={data.user.img && API_BASE_URL + data.user.img}
                  title={data.user?.name}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </>
    );
  };
  
  type DropIndicatorProps = {
    beforeId: string | null;
    stage: {id: number, name: string};
  };
  
  const DropIndicator = ({ beforeId, stage }: DropIndicatorProps) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={stage.id}
        className="my-0.5 h-0.5 w-full bg-serene-500 opacity-0"
      />
    );
  };
