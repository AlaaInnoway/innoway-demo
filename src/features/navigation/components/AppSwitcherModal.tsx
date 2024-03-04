import { useModuleContext } from '../../../context/ModuleContext';
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
import AppButton from './AppButton';
import { motion } from "framer-motion";

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

const AppSwitcherModal = () => {
  const { selectedModule, setSelectedModule } = useModuleContext();

  const handleAppClick = (module: string) => {
    localStorage.setItem('module', module);
    setSelectedModule(module);
  };

  return (
    <>
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
    </>
  );
};

export default AppSwitcherModal;

