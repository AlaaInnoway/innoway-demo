interface Props {
  handleChange: (e: any) => void;
  value?: string;
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  customClass?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export default function TextArea(props: Props) {
  const {
    handleChange,
    value,
    label,
    id,
    name,
    placeholder,
    customClass,
    required,
    disabled,
    rows,
  } = props;
  const fixedInputClass =
    'bg-white text-xs rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 hover:border-gray-400 placeholder-gray-400 text-gray-600 focus:outline-none focus:ring-serene-500 focus:border-serene-300 focus:z-10 disabled:border-transparent disabled:px-0 ';
  return (
    <div className="space-y-1 relative">
      <label htmlFor={id} className="block text-xs font-medium text-gray-600">
        {label}
      </label>
      <textarea
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}
