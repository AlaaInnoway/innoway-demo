interface Props {
  handleChange: () => void;
  value?: boolean;
  label?: string;
  id?: string;
  name?: string;
}

export default function Switch(props: Props) {
  const { handleChange, value, label, id, name } = props;
  return (
    <button
      type="button"
      className="flex items-center space-x-2"
      onClick={handleChange}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={value}
        className={`relative appearance-none w-8 h-5 rounded-full duration-700 bg-gray-200 checked:bg-serene-500
            before:absolute before:w-3 before:h-3 before:mt-1 before:ml-1 before:rounded-full before:top-0 before:left-0 before:bg-white before:scale-110 before:shadow-md before:duration-500
            checked:before:left-3
        `}
      />
      {label && (
        <label htmlFor={name} className="text-xs font-medium text-gray-600">
          {label}
        </label>
      )}
    </button>
  );
}
