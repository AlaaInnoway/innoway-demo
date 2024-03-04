interface Props {
  disabled?: boolean;
  customClass?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function PrimaryButton(props: Props) {
  const { disabled, customClass, children, onClick } = props;
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${
        disabled && `opacity-60 pointer-events-none`
      } flex items-center justify-center space-x-2 text-sm font-medium rounded-lg px-3 py-2.5 bg-serene-500 text-gray-50 hover:text-gray-200 ${customClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SecondaryButton(props: Props) {
  const { disabled, customClass, children, onClick } = props;
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${
        disabled && `opacity-60 pointer-events-none`
      } ${customClass} flex items-center space-x-2 text-sm bg-white text-gray-500 hover:text-gray-800 font-medium rounded-lg px-3 py-2.5`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function TertiaryButton(props: Props) {
  const { disabled, customClass, children, onClick } = props;
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${
        disabled && `opacity-60 pointer-events-none`
      } flex items-center space-x-2 whitespace-nowrap text-xs text-serene-500 hover:text-serene-600 font-medium rounded-lg ${customClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function IconButton(props: Props) {
  const { disabled, customClass, children, onClick } = props;
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${
        disabled && `opacity-60 pointer-events-none`
      } flex items-center space-x-1 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-800 ${customClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
