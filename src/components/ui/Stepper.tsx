import {
  ArrowUturnRightIcon,
  BoltIcon,
  CheckIcon,
  InformationCircleIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline';
import { PrimaryButton } from './Button';
import Badge from './Badge';

interface Step {
  id: number;
  sequence: number;
  name: string;
  description?: string;
  actionName?: string;
  children?: Step[];
}
interface Props {
  items: Step[];
  currentStep: Step;
  currentSubStep?: Step;
  next: (offset: number) => void;
  enabled?: boolean;
}

export default function Stepper(props: Props) {
  const { items, currentStep, currentSubStep, next, enabled } = props;

  return (
    <div className="flex items-center justify-between">
      {items.map((item: Step, index: number) => (
        <div key={item.id}>
          {index < (currentStep?.sequence || 0) - 1 ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center rounded-full h-8 w-8 bg-emerald-50 text-emerald-600 group relative">
                <CheckIcon width={16} height={16} strokeWidth={2} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-[10px] font-medium text-emerald-600">
                  Stage {item.sequence}
                </h3>
                <h6 className="text-xs text-gray-700">{item.name}</h6>
              </div>
            </div>
          ) : index > (currentStep?.sequence || 0) - 1 ? (
            <div className="flex items-center space-x-2 opacity-70">
              <div className="flex items-center justify-center rounded-full h-8 w-8 bg-gray-50 text-gray-600 group relative">
                <NoSymbolIcon width={16} height={16} strokeWidth={2} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-[10px] text-gray-500">
                  Stage {item.sequence}
                </h3>
                <h6 className="text-xs text-gray-700">{item.name}</h6>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center rounded-full h-8 w-8 bg-serene-50 text-serene-600 group relative">
                <BoltIcon width={16} height={16} />
              </div>
              <div className="space-y-0.5">
                <div
                  className={`flex items-center ${
                    item.children && 'space-x-3'
                  }`}
                >
                  <h3 className="text-[10px] font-medium text-serene-600">
                    {currentSubStep?.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {item.children ? (
                      item.children.map((child: Step) => (
                        <div
                          className="flex items-center"
                          key={child.id}
                          title={child.name}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full -mt-0.5 ${
                              child.id === currentSubStep?.id
                                ? 'bg-serene-600'
                                : 'bg-gray-300'
                            }`}
                          />
                        </div>
                      ))
                    ) : (
                      <h3 className="text-[10px] text-serene-600">
                        Stage {currentStep?.sequence}
                      </h3>
                    )}
                  </div>
                </div>
                <h6 className="text-xs font-medium text-gray-700 flex items-center space-x-1">
                  <div>{item.name}</div>
                  {(currentSubStep?.description ||
                    currentStep?.description) && (
                    <InformationCircleIcon
                      width={12}
                      height={12}
                      title={
                        currentSubStep?.description || currentStep?.description
                      }
                      strokeWidth={2}
                    />
                  )}
                </h6>
              </div>
            </div>
          )}
        </div>
      ))}
      {currentStep?.sequence === items.length &&
      (currentSubStep?.sequence || 0) ===
        (currentStep?.children?.length || 0) ? (
        <Badge
          value={currentSubStep?.name || currentStep?.name}
          icon={<CheckIcon width={12} height={12} strokeWidth={2} />}
          color="purple"
        />
      ) : (
        <PrimaryButton
          onClick={() => next(1)}
          disabled={
            ((currentStep?.sequence || 0) === items.length &&
              currentSubStep?.sequence === currentStep?.children?.length) ||
            !enabled
          }
        >
          <ArrowUturnRightIcon width={12} height={12} strokeWidth={2} />
          <span>{currentSubStep?.actionName || currentStep?.actionName}</span>
        </PrimaryButton>
      )}
    </div>
  );
}
