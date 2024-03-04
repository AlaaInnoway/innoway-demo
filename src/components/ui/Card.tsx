import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  fullHeight?: boolean;
}

export default function Card(props: Props) {
  const { children, fullHeight } = props;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', duration: 0.7 }}
        className={`relative w-full ${
          fullHeight && 'h-full'
        } bg-white rounded-lg border border-gray-200 p-4 space-y-6`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
