import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useDisableFocus from '../../hooks/useDisableFocus';
import Badge from '../../components/ui/Badge';

interface Item {
  id: number | string;
  name: string;
  icon?: React.ReactNode;
}

interface Props {
  items: Item[];
  label?: string;
  id?: string;
  values: Item[];
  disabled?: boolean;
  customClass?: string;
  icon?: React.ReactNode;
  handleChange: () => void;
  children?: React.ReactNode;
  openMaxWidth?: boolean;
  openFromRight?: boolean;
  colorful?: boolean;
  hideValues?: boolean;
}

export default function MultiSelect(props: Props) {
  const {
    label,
    id,
    items,
    values,
    disabled,
    customClass,
    icon,
    handleChange,
    children,
    openMaxWidth,
    openFromRight,
    colorful,
    hideValues
  } = props;
  const fixedInputClass =
    'text-xs rounded-md group relative flex items-center justify-between w-full px-3 space-x-2 focus:outline-none first-line:disabled:pointer-events-none border border-gray-300 hover:border-gray-400 placeholder-gray-400 text-gray-600 focus:outline-none focus:ring-serene-500 focus:border-serene-300 focus:z-10 disabled:border-0 disabled:px-0';
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const actionMenuRef = useRef(null);
  useDisableFocus(actionMenuRef, setOpenActionMenu);

  const colors = ['purple', 'pink', 'blue', 'orange', 'green', 'red', 'yellow'];

  function toggleActionMenu() {
    setOpenActionMenu(!openActionMenu);
  }

  const handleClick = (item: Item) => {
    // setOpenActionMenu(!openActionMenu);
    const existedValue = values.filter((i) => i.id === item.id);
    if (!existedValue.length) values.push(item);
    else {
      const index = values.findIndex((object) => {
        return object.id === item.id;
      });
      values.splice(index, 1);
    }
    handleChange();
  };
  const selectedIds = values?.reduce((prev: any, curr: any) => {
    return [...prev, curr.id];
  }, []);

  return (
    <div ref={actionMenuRef} className={`relative ${label && 'space-y-1'}`}>
      <label htmlFor={id} className="block text-xs font-medium text-gray-600">
        {label}
      </label>
      <button
        type="button"
        className={`${fixedInputClass} ${
          !hideValues && values.length ? 'py-1' : 'py-2'
        } ${customClass}`}
        disabled={disabled}
        onClick={() => toggleActionMenu()}
      >
        <div className="flex items-center space-x-2">
          {!hideValues ? values?.map((value, index) => (
            <Badge
              size="xs"
              color={colorful ? colors[index % 7] : ''}
              icon={value?.icon}
              value={value?.name}
              key={value?.id}
            />
          )) : <div/>}
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
                  {item.icon}
                  <span>{item.name}</span>
                  {values && selectedIds.includes(item.id) && (
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
