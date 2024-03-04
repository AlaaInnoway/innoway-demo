import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useDisableFocus from '../../hooks/useDisableFocus';
import Avatar from '../ui/Avatar';
import API_BASE_URL from '../../config';

interface Item {
  id: number | string;
  name: string;
  img?: string;
}

interface Props {
  items: Item[];
  label?: string;
  id?: string;
  value?: Item;
  required?: boolean;
  disabled?: boolean;
  customClass?: string;
  icon?: React.ReactNode;
  handleChange: (item: Item) => void;
  children?: React.ReactNode;
  openMaxWidth?: boolean;
  openFromRight?: boolean;
  hasAvatars?: boolean;
}

export default function Select(props: Props) {
  const {
    label,
    id,
    items,
    value,
    required,
    disabled,
    customClass,
    icon,
    handleChange,
    children,
    openMaxWidth,
    openFromRight,
    hasAvatars,
  } = props;
  const fixedInputClass =
    'text-xs rounded-md group relative flex items-center justify-between w-full px-3 py-2 space-x-2 focus:outline-none first-line:disabled:pointer-events-none border placeholder-gray-400 text-gray-600 focus:outline-none focus:ring-serene-500 focus:z-10 disabled:border-0 disabled:px-0';
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const actionMenuRef = useRef(null);
  useDisableFocus(actionMenuRef, setOpenActionMenu);

  function toggleActionMenu() {
    setOpenActionMenu(!openActionMenu);
  }

  const handleClick = (item: Item) => {
    setOpenActionMenu(!openActionMenu);
    handleChange(item);
  };

  return (
    <div ref={actionMenuRef} className={`relative ${label && 'space-y-1'}`}>
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
      <button
        type="button"
        className={`${fixedInputClass} ${customClass} ${
          required && !value && !disabled
            ? ' border-purple-300'
            : ' border-gray-300 hover:border-gray-400 focus:border-serene-300'
        }`}
        disabled={disabled}
        onClick={() => toggleActionMenu()}
      >
        <div className="flex items-center space-x-2">
          {hasAvatars && value && value.id !== 0 &&
            <Avatar
              key={value.id}
              icon={<div>{value.name[0]}</div>}
              src={value.img && API_BASE_URL + value.img}
              size='xs'
            />
          }
          <span>{value?.name}</span>
        </div>
        {!disabled &&
          (icon || (
            <ChevronUpDownIcon
              width={16}
              height={16}
              className="group-focus-within:text-serene-600"
            />
          ))}
      </button>
      {openActionMenu && (
        <AnimatePresence mode="wait">
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute right-0 z-30 mt-2 ${
              openFromRight ? 'right-0' : 'left-0'
            } ${
              !openMaxWidth ? 'w-full' : 'w-max'
            } min-w-[112px] origin-top-right rounded-lg bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            {items.map((item) => (
              <li
                key={item.id}
                className="text-xs text-gray-600 whitespace-nowrap hover:bg-gray-100 hover:text-gray-900"
              >
                <button
                  className="flex items-center w-full space-x-2 px-4 py-2 relative"
                  type="button"
                  onClick={() => handleClick(item)}
                >
                  {hasAvatars && 
                    <Avatar
                      key={item.id}
                      icon={<div>{item.name[0]}</div>}
                      src={item.img && API_BASE_URL + item.img}
                      size='xs'
                    />
                  }
                  <span>{item.name}</span>
                  {value && value.name === item.name && (
                    <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </li>
            ))}
            {children}
          </motion.ul>
        </AnimatePresence>
      )}
    </div>
  );
}
