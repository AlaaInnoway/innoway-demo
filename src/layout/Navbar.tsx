import Input from '../components/form/Input';
import Avatar from '../components/ui/Avatar';
import UserMenu from '../features/navigation/components/UserMenu';
import {
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import useDisableFocus from '../hooks/useDisableFocus';
import { useRef, useState } from 'react';
import Chatbot from '../features/ai-chat/components/Chatbot';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const userMenuRef = useRef(null);
  useDisableFocus(userMenuRef, setOpen);

  function toggleUserMenu() {
    setOpen(!open);
  }

  return (
    <nav className="border-b border-gray-200">
      <div className="mx-auto px-4">
        <div className="relative h-16 flex py-3 items-center justify-between">
          <div className="w-96">
            <Input
              customClass="bg-gray-200"
              placeholder="Search for contact, lead, opportunity, quote, task, document, ..."
              icon={<MagnifyingGlassIcon width={16} height={24} />}
              handleChange={() => null}
            />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center space-x-6 sm:static">
            <Chatbot />
            <button
              type="button"
              className="relative inline-flex items-center text-gray-600 hover:text-gray-700 focus:outline-none"
            >
              <BellIcon width={24} height={24} strokeWidth={1.5} />
              <div className="absolute w-3.5 h-3.5 text-[9px] font-medium text-gray-100 bg-serene-500 rounded-full -top-1.5 -right-1">
                2
              </div>
            </button>
            <div ref={userMenuRef} className="relative">
              <div>
                <button
                  type="button"
                  className="flex text-sm focus:outline-none"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => toggleUserMenu()}
                >
                  <div className="flex items-center">
                    <div className="relative w-8 h-8 rounded-full after:absolute after:w-2 after:h-2 after:bg-green-500 after:rounded-full after:right-0 after:bottom-0 after:ring-1 after:ring-white">
                      <Avatar
                        rounded
                        title="Rebecca Jones"
                        src="https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg"
                      />
                    </div>
                    <div className="flex flex-col pl-2">
                      <ChevronDownIcon
                        width={12}
                        height={12}
                        className={`text-current cursor-pointer duration-700 ${
                          open && 'rotate-180'
                        }`}
                      />
                    </div>
                  </div>
                </button>
              </div>
              {open && <UserMenu />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
