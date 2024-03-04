import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import { TertiaryButton } from './Button';

interface Step {
  number: number;
  name: string;
}
interface Props {
  items: Step[];
  currentStep: Step;
  back: (offset: number) => void;
  next: (offset: number) => void;
}

export default function StepperDashboard(props: Props) {
  const { items, currentStep, back, next } = props;

  return (
    <div className="flex items-center justify-between">
      <TertiaryButton
        onClick={() => back(-1)}
        disabled={currentStep.number === 1}
      >
        <ArrowLongLeftIcon width={16} height={16} />
        <span>Back</span>
      </TertiaryButton>
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center rounded-full h-10 w-10 bg-serene-50 text-serene-600 group relative">
          <BoltIcon width={16} height={16} />
        </div>
        <div>
          <h3 className="text-[10px] text-serene-500">
            Step {currentStep.number}
          </h3>
          <h6 className="text-xs font-medium text-gray-700">
            {currentStep.name}
          </h6>
        </div>
      </div>
      <TertiaryButton
        onClick={() => next(1)}
        disabled={currentStep.number === items.length}
      >
        <span>Next</span>
        <ArrowLongRightIcon width={16} height={16} />
      </TertiaryButton>
    </div>
  );
}
