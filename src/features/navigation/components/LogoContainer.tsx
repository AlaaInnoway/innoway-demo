import React, { useState } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import AppSwitcherModal from './AppSwitcherModal';
import Modal from '../../../components/ui/Modal';
import logoERP from '../../../assets/logo.png'

interface Props {
  logo: string;
  title: string;
}

const LogoContainer: React.FC<Props> = ({ logo, title }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleLogoClick = () => {
    setOpenModal(!openModal);
  };

  return (
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
            <AppSwitcherModal />
          </Modal>
        )}
    </>
  );
};

export default LogoContainer;
