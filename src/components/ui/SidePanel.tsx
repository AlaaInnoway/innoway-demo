/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Card from './Card';

interface Props {
  title: string;
  open: boolean;
  handleClick: (open?: boolean) => void;
  children: React.ReactNode;
}

export default function SidePanel(props: Props) {
  const { title, open, handleClick, children } = props;
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed z-50 w-full h-full duration-700">
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-10 transition-opacity"
        onClick={() => handleClick(open)}
      />
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ x: '-384px' }}
          transition={{ type: 'spring', duration: 0.7 }}
          className="fixed -right-96 top-16 flex justify-end items-center h-full min-w-[384px] w-1/4"
        >
          <Card fullHeight>
            <div className="flex justify-between items-center">
              <h1 className="text-base font-medium text-gray-700">{title}</h1>
              <button
                type="button"
                className="text-gray-500 bg-transparent hover:text-gray-700"
                onClick={() => handleClick(open)}
              >
                <XMarkIcon width={16} height={16} />
              </button>
            </div>
            {children}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
