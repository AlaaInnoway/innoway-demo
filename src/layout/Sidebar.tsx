import { useState } from 'react';
import { ChevronLeftIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import toggle from '../features/navigation/services/toggle';
import LogoContainer from '../features/navigation/components/LogoContainer';
import AppMenu from '../features/navigation/components/AppMenu';
import logoERP from '../assets/logo.png'
import { useModuleContext } from '../context/ModuleContext';

import Home from '../assets/home.svg'
import Discuss from '../assets/discuss.svg'
import Dashboard from '../assets/dashboard.svg'
import Document from '../assets/document.svg'
import Hr from '../assets/hr.svg'
import lifecycle from '../assets/lifecycle.svg'
import timeoff from '../assets/time-off.svg'
import performance from '../assets/performance.svg'
import recruitment from '../assets/recruitment.svg'
import reward from '../assets/reward.svg'
import engagement from '../assets/engagement.svg'
import Crm from '../assets/crm.svg'
import sales from '../assets/sales.svg'
import purchase from '../assets/purchase.svg'
import Planning from '../assets/planning.svg'
import Inventory from '../assets/inventory.svg'
import Accounting from '../assets/accounting.svg'
import Invoicing from '../assets/invoicing.svg'
import Schedule from '../assets/schedule.svg'
import Administration from '../assets/administration.svg'
import Assistance from '../assets/assistance.svg'
import email from '../assets/email.svg'
import safety from '../assets/safety.svg'
import connector from '../assets/connector.svg'
import { motion } from "framer-motion";
import AppButton from '@feature/navigation/components/AppButton';
import Modal from '@component/ui/Modal';
import appMenus from '../data/sidebar';

const apps = [
  { module: 'home', title: 'Home', logo: Home },
  { module: 'dashboard', title: 'Dashboard', logo: Dashboard },
  { module: 'document', title: 'Document', logo: Document },
  { module: 'schedule', title: 'Schedule', logo: Schedule },
  { module: 'email', title: 'Email', logo: email },
  { module: 'discuss', title: 'Discuss', logo: Discuss },
  { module: 'crm', title: 'CRM', logo: Crm },
  { module: 'sales', title: 'Sales', logo: sales },
  { module: 'purchase', title: 'Purchase', logo: purchase },
  { module: 'invoicing', title: 'Invoicing', logo: Invoicing },
  { module: 'inventory', title: 'Inventory', logo: Inventory },
  { module: 'accounting', title: 'Accounting', logo: Accounting },
  { module: 'planning', title: 'Planning', logo: Planning },
  { module: 'hr', title: 'Employee', logo: Hr },
  { module: 'lifecycle', title: 'Lifecycle', logo: lifecycle },
  { module: 'time-off', title: 'Time Off', logo: timeoff },
  { module: 'performance', title: 'Performance', logo: performance },
  { module: 'recruitment', title: 'Recruitment', logo: recruitment },
  { module: 'reward', title: 'Reward', logo: reward },
  { module: 'engagement', title: 'Engagement', logo: engagement },
  { module: 'safety', title: 'Safety', logo: safety },
  { module: 'connector', title: 'Connector', logo: connector },
  { module: 'administration', title: 'Administration', logo: Administration },
  { module: 'assistance', title: 'Assistance', logo: Assistance },
];

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

interface Props {
  logo: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar(props: Props) {
  const { logo, title } = props;
  const [open, setOpen] = useState(true);
  function toggleSidebar() {
    toggle(!open);
    setOpen(!open);
  }

  
  const { selectedModule, setSelectedModule } = useModuleContext();
  const [menus, setMenus] = useState<any[]>(appMenus.home);

  const handleAppClick = (module: string) => {
    localStorage.setItem('module', module);
    setOpenModal(!openModal);
    setSelectedModule(module);
    if(module == 'home')
      setMenus(appMenus.home);
    
    else if(module == 'dashboard')
      setMenus(appMenus.dashboard);
  
    else if(module == 'document')
      setMenus(appMenus.document);
  
    else if(module == 'schedule')
      setMenus(appMenus.schedule);
  
    else if(module == 'email')
      setMenus(appMenus.email);
  
    else if(module == 'crm')
      setMenus(appMenus.crm);
  
    else if(module == 'sales')
      setMenus(appMenus.sales);
  
    else if(module == 'invoicing')
      setMenus(appMenus.invoicing);
  
    else if(module == 'hr')
      setMenus(appMenus.hr);

    else if(module == 'lifecycle')
      setMenus(appMenus.lifecycle);

    else if(module == 'time-off')
      setMenus(appMenus.timeOff);

    else
      setMenus(appMenus.home);

  };

  
  const [openModal, setOpenModal] = useState(false);

  const handleLogoClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <div
      className={`${
        open ? 'w-48 ' : 'w-20 '
      } px-3 bg-white border-r border-gray-200 h-screen overflow-hidden relative duration-500`}
    >
      <button
        type="button"
        className="invisible absolute bottom-4 -right-3 z-20 rounded-full w-6 h-6 text-serene-900 bg-gray-50 border border-serene-900"
        onClick={() => toggleSidebar()}
      >
        <ChevronLeftIcon
          width={20}
          height={16}
          className={`text-current cursor-pointer duration-500 ${
            !open && 'rotate-[180deg] ml-0.5'
          }`}
        />
      </button>
      <>
        <img src={logoERP} className='py-4 w-full'/>
        <div className="absolute left-3 right-3 bottom-4 h-16 flex items-center justify-between cursor-pointer" onClick={handleLogoClick}>
          <div className="flex items-center space-x-4 pl-2">
            <img src={logo} width={32} />
            <div className='text-gray-700 text-sm font-semibold'>{title}</div>
          </div>
          <ChevronUpDownIcon className="text-gray-500" width={20} height={20} />
        </div>
        {openModal && (
          <Modal
            title="Apps"
            open={openModal}
            onDiscard={() => setOpenModal(!openModal)}
            onSave={() => null}
            footerDisabled
          >
            <motion.ul
              className="grid grid-cols-6 gap-4 text-center"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {apps.map((app) => (
                <motion.li key={app.module} className="item" variants={item}>
                  <div className="col-span-1 mb-10" key={app.module}>
                    <AppButton
                      onClick={() => handleAppClick(app.module)}
                      logo={app.logo}
                      module={app.module}
                      title={app.title}
                      active={selectedModule === app.module}
                    />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </Modal>
        )}
    </>
      
      <AppMenu open={open} menus={menus} />
    </div>
  );
}
