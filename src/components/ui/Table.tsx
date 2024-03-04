/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useDisableFocus from '../../hooks/useDisableFocus';
import { IconButton } from './Button';
import Checkbox from '../form/Checkbox';

export interface Column {
  id: string;
  name: string;
  optional?: boolean;
}

interface TableProps {
  columns: Column[];
  optionalColumns: Column[];
  children: React.ReactNode;
  handleColumnChange: (column: Column) => void;
}

export default function Table(props: TableProps) {
  const { columns, optionalColumns, children, handleColumnChange } = props;
  const [openColumnMenu, setOpenColumnMenu] = useState(false);
  const columnMenuRef = useRef(null);
  useDisableFocus(columnMenuRef, setOpenColumnMenu);

  function toggleColumnMenu() {
    setOpenColumnMenu(!openColumnMenu);
  }

  return (
    <div className="space-y-2">
      <table className="w-full text-left text-xs text-gray-800">
        <thead className="bg-serene-50 sticky top-0 z-10">
          <tr>
            <th scope="col" className="py-4 px-6">
              #
            </th>
            {columns.map((column) => (
              <th key={column.id} scope="col" className="py-4 px-6">
                {column.name}
              </th>
            ))}
            <th scope="col" className="py-4 w-2">
              {optionalColumns.length > 0 && (
                <div ref={columnMenuRef} className="relative">
                  <div>
                    <IconButton onClick={() => toggleColumnMenu()}>
                      <SquaresPlusIcon
                        width={16}
                        height={16}
                        className="hover:stroke-gray-900"
                      />
                    </IconButton>
                  </div>
                  {openColumnMenu && (
                    <AnimatePresence mode="wait">
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-0 z-30 mt-2 w-max min-w-[112px] origin-top-right rounded-lg bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        {optionalColumns.map((column) => (
                          <li
                            key={column.id}
                            className="px-2 py-2 text-[11px] text-gray-500 whitespace-nowrap hover:bg-gray-100 hover:text-gray-700"
                          >
                            <Checkbox
                              id={column.id}
                              name={column.id}
                              label={column.name}
                              value={columns.includes(column)}
                              handleChange={() => handleColumnChange(column)}
                            />
                          </li>
                        ))}
                      </motion.ul>
                    </AnimatePresence>
                  )}
                </div>
              )}
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
