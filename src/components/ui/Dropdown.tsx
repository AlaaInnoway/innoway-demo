import { AnimatePresence, motion } from 'framer-motion';

export interface Item {
  id: number | string;
  name: string;
  url?: string;
  icon?: React.ReactNode;
  handleClick?: (id: number, modelName: string) => void;
}
interface Props {
  items: Item[];
  children?: React.ReactNode;
  handleClick?: (item: Item) => void;
  fullWidth?: boolean;
  positionRight?: boolean;
  recordId?: number;
  modelName?: string;
}

export default function Dropdown(props: Props) {
  const {
    items,
    children,
    fullWidth,
    positionRight,
    recordId,
    modelName,
  } = props;
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`absolute right-0 z-30 mt-2 ${
          positionRight ? 'right-0' : 'left-0'
        } ${
          fullWidth ? 'w-full' : 'w-max'
        } min-w-[112px] origin-top-right rounded-lg bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="text-xs text-gray-600 whitespace-nowrap hover:bg-gray-100 hover:text-gray-900"
          >
            <button
              className="flex items-center w-full space-x-2 px-4 py-2"
              type="button"
              onClick={() =>
                item.handleClick &&
                item.handleClick(recordId || 0, modelName || '')
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          </li>
        ))}
        {children}
      </motion.ul>
    </AnimatePresence>
  );
}
