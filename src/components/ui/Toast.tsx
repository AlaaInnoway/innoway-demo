import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  title: string;
  type: string;
}
export default function Toast(props: Props) {
  const { title, type } = props;
  const [isOpen, setIsOpen] = useState(true);
  let backgroundColor;
  let textColor;
  let icon;
  if (type === 'success') {
    backgroundColor = 'bg-emerald-50';
    textColor = 'text-emerald-800';
    icon = <CheckCircleIcon width={16} height={16} stroke="currentColor" />;
  } else if (type === 'warning') {
    backgroundColor = 'bg-amber-50';
    textColor = 'text-amber-800';
    icon = (
      <ExclamationTriangleIcon width={16} height={16} stroke="currentColor" />
    );
  } else if (type === 'error') {
    backgroundColor = 'bg-red-50';
    textColor = 'text-red-800';
    icon = <XCircleIcon width={16} height={16} stroke="currentColor" />;
  } else if (type === 'info') {
    backgroundColor = 'bg-blue-50';
    textColor = 'text-blue-800';
    icon = (
      <InformationCircleIcon width={16} height={16} stroke="currentColor" />
    );
  }
  useEffect(() => {
    const timer1 = setTimeout(() => setIsOpen(false), 3000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          layout
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'backInOut', duration: 1 }}
          className={`fixed top-16 right-8 z-50 ${backgroundColor} shadow-lg rounded-md p-4 max-w-[400px]`}
        >
          <div
            className={`relative flex items-center justify-between space-x-8 ${textColor}`}
          >
            <div className="flex items-center space-x-2">
              {icon}
              <h1 className="text-xs">{title}</h1>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
