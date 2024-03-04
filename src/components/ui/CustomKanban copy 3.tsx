import {
    Dispatch,
    SetStateAction,
    useState,
    DragEvent,
  } from "react";
  import { motion } from "framer-motion";
import { ClockIcon, FireIcon, StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import Card from "./Card";
import Avatar from "./Avatar";
import Badge from "./Badge";
import { IconButton } from "./Button";
  
  const CustomKanban = () => {
    return (
      <div className="h-screen w-full">
        <Board />
      </div>
    );
  };

  export default CustomKanban;
  
  const Board = () => {
    const [cards, setCards] = useState(DEFAULT_CARDS);
  
    return (
      <div className="flex h-full w-full gap-4">
        <Column
          name="Backlog"
          stage="backlog"
          headingColor="text-purple-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          name="TODO"
          stage="todo"
          headingColor="text-orange-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          name="In progress"
          stage="doing"
          headingColor="text-blue-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          name="Complete"
          stage="done"
          headingColor="text-emerald-500"
          cards={cards}
          setCards={setCards}
        />
        <BurnBarrel setCards={setCards} />
      </div>
    );
  };
  
  type ColumnProps = {
    name: string;
    headingColor: string;
    cards: CardType[];
    stage: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
  };
  
  const Column = ({
    name,
    headingColor,
    cards,
    stage,
    setCards,
  }: ColumnProps) => {
    const [active, setActive] = useState(false);
  
    const handleDragStart = (e: DragEvent, card: CardType) => {
      e.dataTransfer.setData("cardId", card.id);
    };
  
    const handleDragEnd = (e: DragEvent) => {
      const cardId = e.dataTransfer.getData("cardId");
  
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
  
        setCards(copy);
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
          `[data-column="${stage}"]`
        ) as unknown as HTMLElement[]
      );
    };
  
    const handleDragLeave = () => {
      clearHighlights();
      setActive(false);
    };
  
    const filteredCards = cards.filter((c) => c.stage === stage);
  
    return (
      <div className="w-56 shrink-0">
        <div className="mb-3 flex items-center justify-between">
          <h3 className={`font-medium ${headingColor}`}>{name}</h3>
          <span className="rounded text-sm text-gray-500">
            {filteredCards.length}
          </span>
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
            return <CardColumn key={c.id} {...c} handleDragStart={handleDragStart} />;
          })}
          <DropIndicator beforeId={null} stage={stage} />
        </div>
      </div>
    );
  };
  
  type CardProps = CardType & {
    handleDragStart: Function;
  };
  
  const CardColumn = ({ name, id, stage, handleDragStart }: CardProps) => {
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
            <div className="space-y-2">
              <div className="flex items-center space-x-1 text-xs font-medium text-gray-500">
                <Avatar 
                  src="http://localhost:3000/images\Accounting & Associates.avif" 
                  size="sm" 
                />
                <span>Accounting & Associates</span>
              </div>
              <div className="text-sm font-medium text-gray-600">{name}</div>
              <div className="flex items-center flex-wrap gap-2">
                <Badge value="Product 1" color="blue" size="xs" />
                <Badge value="Product 2" color="pink" size="xs" />
              </div>
              <div className="flex items-center space-x-1">
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
                    className='stroke-yellow-300 fill-yellow-300'
                  />
                </IconButton>
                <IconButton disabled customClass="opacity-100">
                  <StarIcon
                    width={16}
                    height={16}
                    className='stroke-gray-500'
                  />
                </IconButton>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge icon={<ClockIcon width={12} height={12} />} value="Mar 29" color="gray" size="xs" />
              <Avatar 
                src="https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg" 
                size="sm" 
                title="Alaa Maaoui"
              />
            </div>
          </Card>
        </motion.div>
      </>
    );
  };
  
  type DropIndicatorProps = {
    beforeId: string | null;
    stage: string;
  };
  
  const DropIndicator = ({ beforeId, stage }: DropIndicatorProps) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={stage}
        className="my-0.5 h-0.5 w-full bg-serene-500 opacity-0"
      />
    );
  };
  
  const BurnBarrel = ({
    setCards,
  }: {
    setCards: Dispatch<SetStateAction<CardType[]>>;
  }) => {
    const [active, setActive] = useState(false);
  
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setActive(true);
    };
  
    const handleDragLeave = () => {
      setActive(false);
    };
  
    const handleDragEnd = (e: DragEvent) => {
      const cardId = e.dataTransfer.getData("cardId");
  
      setCards((pv) => pv.filter((c) => c.id !== cardId));
  
      setActive(false);
    };
  
    return (
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
          active
            ? "border-red-800 bg-red-800/20 text-red-500"
            : "border-gray-300 bg-white text-gray-600"
        }`}
      >
        {active ? <FireIcon width={24} height={24} className="animate-bounce" /> : <TrashIcon width={24} height={24} />}
      </div>
    );
  };
  
  type ColumnType = "backlog" | "todo" | "doing" | "done";
  
  type CardType = {
    name: string;
    id: string;
    stage: ColumnType;
  };
  
  const DEFAULT_CARDS: CardType[] = [
    // BACKLOG
    { name: "Look into render bug in dashboard", id: "1", stage: "backlog" },
    { name: "SOX compliance checklist", id: "2", stage: "backlog" },
    { name: "[SPIKE] Migrate to Azure", id: "3", stage: "backlog" },
    { name: "Document Notifications service", id: "4", stage: "backlog" },
    // TODO
    {
      name: "Research DB options for new microservice",
      id: "5",
      stage: "todo",
    },
    { name: "Postmortem for outage", id: "6", stage: "todo" },
    { name: "Sync with product on Q3 roadmap", id: "7", stage: "todo" },
  
    // DOING
    {
      name: "Refactor context providers to use Zustand",
      id: "8",
      stage: "doing",
    },
    { name: "Add logging to daily CRON", id: "9", stage: "doing" },
    // DONE
    {
      name: "Set up DD dashboards for Lambda listener",
      id: "10",
      stage: "done",
    },
  ];