import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Card from './Card';
import { PrimaryButton, SecondaryButton } from './Button';

interface Props {
  title: string;
  open: boolean;
  onDiscard: (open?: boolean) => void;
  onSave?: () => void;
  children: React.ReactNode;
  dialog?: boolean;
  discardButton?: string;
  confirmButton?: string;
  footerDisabled?: boolean;
}

export default function Modal(props: Props) {
  const {
    title,
    open,
    onDiscard,
    onSave,
    children,
    dialog,
    discardButton = 'Discard',
    confirmButton = 'Save',
    footerDisabled = false
  } = props;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'backInOut', duration: 1 }}
        className="fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
      >
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-10"
          onClick={() => onDiscard(open)}
        />
        <div
          className={`relative flex ${
            !dialog ? 'items-center w-1/2 h-full' : 'w-1/4'
          } max-w-3xl m-auto py-4`}
        >
          <Card>
            <div className="flex justify-between items-center pb-4">
              <h1 className="text-base font-medium text-gray-700">{title}</h1>
              <button
                type="button"
                className="text-gray-500 bg-transparent hover:text-gray-700"
                onClick={() => onDiscard(open)}
              >
                <XMarkIcon width={16} height={16} />
              </button>
            </div>
            {children}
            {!footerDisabled && (
              <div className="flex items-center justify-center space-x-4 pt-4">
                <SecondaryButton onClick={() => onDiscard(open)}>
                  <XCircleIcon width={20} height={20} />
                  <span>{discardButton}</span>
                </SecondaryButton>
                <PrimaryButton onClick={onSave}>
                  <CheckCircleIcon width={20} height={20} />
                  <span>{confirmButton}</span>
                </PrimaryButton>
              </div>
            )}
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
