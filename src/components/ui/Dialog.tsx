import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';

interface Props {
  title: string;
  message: string;
  open: boolean;
  discardButton: string;
  confirmButton: string;
  onDiscard: (open?: boolean) => void;
  onConfirm?: () => void;
}

export default function Dialog(props: Props) {
  const {
    title,
    message,
    open,
    discardButton,
    confirmButton,
    onDiscard,
    onConfirm,
  } = props;
  return (
    <Modal
      dialog
      title={title}
      open={open}
      discardButton={discardButton}
      confirmButton={confirmButton}
      onDiscard={onDiscard}
      onSave={onConfirm}
    >
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-700 p-2">
          <ExclamationTriangleIcon
            width={16}
            height={16}
            stroke="currentColor"
          />
        </div>
        <p className="text-sm text-gray-700">{message}</p>
      </div>
    </Modal>
  );
}
