import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Props {
  open: boolean;
  menus: any[];
}

export default function AppMenu(props: Props) {
  const { open, menus } = props;
  const location = useLocation();

  function toggleMenu(menu: any) {
    menu.expanded = !menu.expanded;
    if(!menu.children) {
      handleMenuClick(menu.url);
    } 
  }

  const handleMenuClick = (url: string) => {
    localStorage.setItem('app-url', url);
  };

  return (
    <ul className="space-y-3 mt-4">
      {menus?.map((menu) => (
        <li
          key={menu.name}
          className={`${!open && 'z-0'} cursor-pointer text-xs`}
        >
          <Link
            to={!menu.children ? menu.url : null}
            onClick={() => toggleMenu(menu)}
            className={`${
              menu.url.split('/')[1] === location.pathname.split('/')[1]
                ? 'bg-serene-50 text-serene-800 font-semibold'
                : 'text-gray-500'
            } flex items-center justify-between px-3 py-2 rounded-md`}
          >
            <div className="flex items-center space-x-3">
              {menu.icon}
              <span
                className={`${!open && 'invisible'} origin-left duration-200`}
              >
                {menu.name}
              </span>
            </div>
            {menu.children && (
              <ChevronDownIcon
                width={12}
                height={12}
                className={`duration-700 ${menu.expanded && 'rotate-180'}`}
              />
            )}
          </Link>
          <ul
            className={`${
              !menu.children || !menu.expanded ? 'h-0' : 'my-3'
            } relative duration-500 overflow-auto ml-5 pl-3 space-y-4 border-l border-l-gray-300`}
          >
            {menu.children &&
              menu.children.map((childMenu: any) => (
                <li key={childMenu.name} className="">
                  <Link
                    to={childMenu.url}
                    onClick={() => handleMenuClick(childMenu.url)}
                    className={`${
                      childMenu.url.split('/')[2] ===
                      location.pathname.split('/')[2]
                        ? 'text-serene-800 font-semibold before:bg-serene-800'
                        : 'text-gray-500 before:bg-gray-300'
                    } block px-3 before:absolute before:left-0 before:w-2 before:h-px before:mt-2`}
                  >
                    <span>{childMenu.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
