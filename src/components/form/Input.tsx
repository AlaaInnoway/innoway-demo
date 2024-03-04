interface Props {
  handleChange: (e: any) => void;
  value?: string;
  label?: string;
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  customClass?: string;
  icon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export default function Input(props: Props) {
  const {
    handleChange,
    value,
    label,
    id,
    type,
    name,
    placeholder,
    customClass,
    icon,
    required,
    disabled,
  } = props;
  const fixedInputClass =
    'bg-white text-xs rounded-md appearance-none relative block w-full px-3 py-2 border placeholder-gray-400 text-gray-600 focus:outline-none focus:ring-serene-500 focus:z-10 disabled:bg-transparent disabled:border-transparent disabled:px-0 ';
  return (
    <div className="space-y-1 relative">
      <label
        htmlFor={id}
        className="flex items-center justify-between text-xs font-medium text-gray-600"
      >
        {label}
        {required && !value && !disabled && (
          <span className="text-[9px] font-normal text-purple-500">
            Required
          </span>
        )}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        disabled={disabled}
        className={
          fixedInputClass +
          customClass +
          (required && !value && !disabled
            ? ' border-purple-300'
            : ' border-gray-300 hover:border-gray-400 focus:border-serene-300')
        }
        placeholder={placeholder}
      />
      <div className="absolute top-1 right-2 z-20 text-gray-500">{icon}</div>
    </div>
  );
}
