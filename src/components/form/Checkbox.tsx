import { CheckIcon } from '@heroicons/react/24/outline';

interface Props {
  handleChange: () => void;
  value?: boolean;
  label?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  color?: string;
}

export default function Checkbox(props: Props) {
  const { handleChange, value, label, id, name, disabled, color } = props;
  const fixedInputClass = `duration-700 appearance-none h-5 w-5 rounded-md border border-gray-300 ${
    color
      ? `checked:bg-${color}-500 checked:border-${color}-500`
      : 'checked:bg-serene-500 checked:border-serene-500'
  } hover:border-gray-400 disabled:checked:bg-serene-400 disabled:border-gray-200`;
  return (
    <div className="flex items-center space-x-2">
      <div
        className="checked:bg-amber-500 checked:border-amber-500 checked:bg-red-500 checked:border-red-500 
      checked:bg-emerald-500 checked:border-emerald-500 bg-amber-500 bg-red-500 bg-emerald-500
      bg-amber-100 text-amber-500  bg-red-100 text-red-500  bg-emerald-100 text-emerald-500"
      />
      <div className="relative flex items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={value}
          disabled={disabled}
          className={fixedInputClass}
          onChange={handleChange}
        />
        {value && (
          <CheckIcon
            width={16}
            height={16}
            className="absolute ml-0 top-0.5 left-0.5 text-gray-100 duration-700"
          />
        )}
      </div>
      {label && (
        <label
          htmlFor={name}
          className={`text-xs font-medium ${
            disabled ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
