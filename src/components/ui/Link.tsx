import { Link } from 'react-router-dom';

interface Props {
  disabled?: boolean;
  customClass?: string;
  url?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function LinkButton(props: Props) {
  const { disabled, customClass, url, children, onClick } = props;
  return url ? (
    <Link
      to={url}
      className={`${
        disabled
          ? `text-serene-400 pointer-events-none`
          : `text-serene-500 hover:text-serene-600`
      } flex items-center space-x-2 text-xs font-medium rounded-lg ${customClass}`}
      onClick={onClick}
    >
      {children}
    </Link>
  ) : (
    <button
      type="button"
      className={`${
        disabled ? `text-serene-400` : `text-serene-500 hover:text-serene-600`
      } flex items-center space-x-2 text-xs font-medium rounded-lg ${customClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function LinkHref(props: Props) {
  const { disabled, customClass, url, children } = props;
  return (
    <a
      href={url}
      className={`${
        disabled ? `text-serene-400` : `text-serene-500 hover:text-serene-600`
      } flex items-center space-x-2 text-sm font-medium rounded-lg ${customClass}`}
    >
      {children}
    </a>
  );
}
